const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const initialUsers = require('./test_users')

describe('when the db is not empty', async () => {
  beforeAll(async () => {
    await User.remove({})

    const userObjects = initialUsers.map(b => new User(b))
    const promiseArray = userObjects.map(b => b.save())
    await Promise.all(promiseArray)
  })

  test('a user with valid fields is created correctly', async () => {
    const validUser = {
      username: 'valid',
      password: 'secret',
      name: 'real guy',
      adult: true
    }

    const usersBeforePost = await helper.usersInDb()

    const createdUser = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()

    expect(usersAfterPost.length).toBe(usersBeforePost.length + 1)
    expect(usersAfterPost.map(u => u.id.toString())).toContain(createdUser.body._id)
  })

  test('a user with too short password is not created', async () => {
    const shortUser = {
      username: 'valid',
      password: 'se',
      name: 'real guy',
      adult: true
    }

    const usersBeforePost = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(shortUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()

    expect(usersAfterPost.length).toBe(usersBeforePost.length)
    expect(result.body).toEqual({error: 'password too short'})
  })

  test('a user with not unique username is not created', async () => {
    const notUnique = {
      username: 'ChosenOne',
      password: 'sevrets',
      name: 'real guy',
      adult: true
    }

    const usersBeforePost = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(notUnique)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()

    expect(usersAfterPost.length).toBe(usersBeforePost.length)
    expect(result.body).toEqual({error: 'username must be unique'})
  })

  test('a user with unspecified field adult defaults to true', async () => {
    const notUnique = {
      username: 'secretive',
      password: 'sevrets',
      name: 'somone else'
    }

    const usersBeforePost = await helper.usersInDb()

    const createdUser = await api
      .post('/api/users')
      .send(notUnique)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()

    expect(usersAfterPost.length).toBe(usersBeforePost.length + 1)
    expect(usersAfterPost.map(u => u.id.toString())).toContain(createdUser.body._id)
    expect(createdUser.body.adult).toBeTruthy()
  })
})

afterAll(() => {
  server.close()
})