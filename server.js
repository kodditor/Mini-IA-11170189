import express from 'express'

const app  = express()
const PORT = 5000

app.get('/', (req, res) => {
    res.status(200).send('Ping!\nThis is the Electronic Medical Record System for UGMC')
})

app.listen(PORT, ()=>{
    console.log(`Started server at http://localhost:${PORT}`)
})