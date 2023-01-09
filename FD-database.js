const express = require('express')
const { read } = require('fs')
const app = express()
const port = 8080
const mysql = require('mysql')
const { createConnection } = require('net')
const { callbackify } = require('util')

function readDB (callback) {
    const conn = createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'students',
        database: 'MYSQL_DATABASE'
    })

    conn.connect(function err(){
        if (err) throw err
        conn.query("SELECT * FireDefenseDB", function(err,result,fields){
            if (err) throw err
            callback(result)
        })
    })
}

app.get('/init', (req,res) => {
    readDB(function callback(var1){
        res.end(JSON.stringify(var1))
    })
})

app.use('/', express.static('public'))

app.get('/', (req,res) => {
    res.send('New York, New York')
})
app.listen(port, () => {
    console.log(`'I call thee from ${port}'`)
})