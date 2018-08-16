const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {user:0, __v:0})
  response.json(users.map(User.format))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id)
    .populate('blogs', {user:0, __v:0})
  response.json(User.format(user))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.password.length < 3) {
      return response.status(400).send({ error: 'password too short' })
    }

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    if (body.adult === undefined) {
      body.adult = true
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash,
      name: body.name,
      adult: body.adult
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter