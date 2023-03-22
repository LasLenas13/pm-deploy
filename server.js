const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


// app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pmdeploy.html')
})

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/page.css')
})

app.get('/js', (req, res) => {
    res.sendFile(__dirname + '/server.js')
})

app.listen(4000, () => {
    console.log('app is up on 4000')
})