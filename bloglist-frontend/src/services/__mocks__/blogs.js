const blogs = [
  {
    "_id": "5b6edf05913a4e423017f913",
    "title": "First Blog",
    "author": "Me",
    "url": "www.url.com",
    "likes": 21,
    "user": {
      "_id": "5b6d624a58e05b2c48885829",
      "username": "ChosenOne",
      "name": "First User"
    },
    "__v": 0
  },
  {
    "_id": "5b6edf14913a4e423017f914",
    "title": "Second Blog",
    "author": "Not me",
    "url": "www.rrr.com",
    "likes": 20,
    "user": {
      "_id": "5b6d624a58e05b2c48885829",
      "username": "ChosenOne",
      "name": "First User"
    },
    "__v": 0
  },
  {
    "_id": "5b6f18e88ee9aa5ff483e0b2",
    "title": "Ekas",
    "author": "asdf",
    "url": "dfsag",
    "likes": 3,
    "user": {
      "_id": "5b6d624d58e05b2c4888582a",
      "username": "Jedi",
      "name": "Eka Vekara"
    },
    "__v": 0
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }