const express = require('express')
const app = express()
const port = 8080
const mysql = require('mysql')

app.get('/', (req,res) => {
    res.send('New York, New York')
})
app.listen(port, () => {
    console.log(`'I call thee from ${port}'`)
})