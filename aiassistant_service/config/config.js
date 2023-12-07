const { OpenAI } = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAIAPI_KEY,
});

module.exports = openai