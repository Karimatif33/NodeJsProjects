const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')
const api = process.env.API_URL

const productsRouter = require('./routers/product')
// Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Routers
app.use(`${api}/products`, productsRouter)

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
