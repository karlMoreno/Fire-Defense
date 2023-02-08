const express = require('express')
const app = express()
const port = 8080
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'MYSQL_DATABASE'
})

conn.connect()

function readDB (callback) {
    conn.connect(function err(){
        if (err) {
            console.log(err.message);
            throw err;
        }
        conn.query("SELECT * FROM MYSQL_DATABASE.FireDefenseDB", function(err,result,fields){
            if (err) throw err
            callback(result)
        })
    })
}



app.use('/', express.static('public'))

app.get('/init', (req,res) => {
    conn.query("SELECT * FROM MYSQL_DATABASE.FireDefenseDB", function(err,result,fields){
        if (err) throw err
        // callback(result)
        res.send({success : true, data: result})
    })
// readDB(function callback(var1){
    //     res.end(JSON.stringify(var1))
    // })
})

app.get('/test', (req,res) => {
    res.send()
})

app.get('/', (req,res) => {
    res.send('New York, New York')
})
app.listen(port, () => {
    console.log(`'I call thee from ${port}'`)
})