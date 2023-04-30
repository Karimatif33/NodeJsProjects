const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware
app.use(express.json())
app.use(morgan('tiny'))

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number,
})

const Product = mongoose.model('Product', productSchema)

require('dotenv/config')

const api = process.env.API_URL

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        image: 'Karim',
        countInStock: 'Url',
    }
    res.send(product)
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    })
    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })
})

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Connected to the database successfully...')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('server is running http://localhost:3000')
})
