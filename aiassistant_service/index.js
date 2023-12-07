const express = require('express')
const { generateDescription, imageFromDescription } = require('./controllers/openai')

// app setup
const app = express()
app.listen(4000, () => console.log('listening to requests on port 4000'))

// middleware
app.use(express.json())

// routes
app.post('/aiassistant/description', generateDescription)
app.post('/aiassistant/image', imageFromDescription)