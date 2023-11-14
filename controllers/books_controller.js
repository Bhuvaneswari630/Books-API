const express = require('express')
const books = express.Router()
const Books = require('../models/books')

books.get('/seed', (req, res) => {
    Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

books.get('/', async (req, res) => {
    try {
        let books = await Books.find()
        res.json({
            message: "This is CORS enabled for all origin",
            books
        })
    } catch (e) {
        res.render('Err', e)
    }
})


books.post('/', async (req, res) => {
    let book = req.body
    try {
        await Books.create(book)
        let books = await Books.find()
        res.json(books)
    } catch (e) {
        res.render('Err', e)
    }
})


books.put('/:id', async (req, res) => {
    try {
        let index = req.params.id
        await Books.findByIdAndUpdate(index, req.body, { new: true })
        let books = await Books.find()
        res.json(books)
    } catch (e) {
        res.render('Err', e)
    }
})

books.delete('/:id', async (req, res) => {
    try {
        let index = req.params.id
        await Books.findByIdAndDelete(index)
        let books = await Books.find()
        res.json(books)
    } catch (e) {
        res.render('Err', e)
    }
})

books.get('/:id', async (req, res) => {
    try {
        let index = req.params.id
        let book = await Books.findById(index)
        res.json(book)
    } catch (e) {
        res.render('Err', e)
    }
})


module.exports = books

