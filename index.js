const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require("morgan")

const Blog = mongoose.model('Blog', {
	title: String,
	author: String,
	url: String,
	likes: Number
})

module.exports = Blog

morgan.token("body", (req, res) => {
	return JSON.stringify(req.body)
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(":method :url :body :status :res[content-length] - :response-time ms"))

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI

mongoose
	.connect(mongoUrl)
	.then(() => {
		console.log('connected to database', process.env.MONGODB_URI)
	})
	.catch(err => {
		console.log(err)
	})

app.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
})

const PORT =  process.env.PORT || 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})