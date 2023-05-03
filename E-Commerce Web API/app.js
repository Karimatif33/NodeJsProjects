const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/handeling-error')

app.use(cors())
app.options('*', cors()) 

// Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(errorHandler)


// Routers
const categoriesRouter = require('./routers/categories')
const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const orderRouter = require('./routers/orders')

const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, orderRouter)

// Database conniction

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
