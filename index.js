require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
// Constants
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI;


// MIDDLEWARE
app.use(express.static('public'))
// DEPENDENCIES
// const methodOverride = require('method-override')

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// app.use(methodOverride('_method'))

app.use('/books', require('./controllers/books_controller'))

app.get('/', (req, res) => {
    res.json('Welcome to Books')
})

const db = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDb');
    } catch (e) {
        console.log('Not connected to MongoDb', e);
    }
}
db()

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})