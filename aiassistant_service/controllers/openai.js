const openai = require('../config/config')
const generateDescription = async (req, res) => {
    const { title } = req.body
    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
        {
            role: 'user',
            content: `Come up with an item description called ${title}, to be listed in an auction.`
        }
        ],
        max_tokens: 100
    })

    console.log(description.choices[0].message)
    
    res.status(200).json({
        description: description.choices[0].message,
    })
}

const imageFromDescription = async (req, res) => {
    const { prompt } = req.body
    const image_from_desccription = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    })

    image_obj = image_from_desccription

    res.status(200).json({
        image_obj,
    })
}

module.exports = { generateDescription, imageFromDescription }