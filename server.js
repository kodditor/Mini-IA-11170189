import express from 'express'
import { connectDB, getModel } from './db.js'

const app  = express()
const PORT = 5000
connectDB()

app.get('/', (req, res) => {
    res.status(200).send('Ping!\nThis is the Electronic Medical Record System for UGMC')
})

app.get('/patients', async (req,res) => {
    const model = getModel()
    const allPatients = await model.find()
    res.status(200).send(allPatients)
})

app.listen(PORT, ()=>{
    console.log(`Started server at http://localhost:${PORT}`)
})