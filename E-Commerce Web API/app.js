const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello My First Project')
})


app.listen(port, () => {
    console.log('server is running http://localhost:3000')
})
   
console.log()