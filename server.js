import express from 'express'
import { connectDB, getModel } from './db.js'

const app  = express()
const PORT = 5000
connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Ping!\nThis is the Electronic Medical Record System for UGMC')
})

app.get('/patients', async (req,res) => {
    const model = getModel()
    const allPatients = await model.find()
    res.status(200).send(allPatients)
})

app.post('/patient', async (req, res) => {
    const patientObject = req.body
    const model = getModel()
    const newPatient = await model.insertMany(patientObject)
    if(newPatient){
        res.status(200).json(newPatient)
    }
    else {
        res.status(500).send('Error: Could not create new patient object')
    }
})


app.listen(PORT, ()=>{
    console.log(`Started server at http://localhost:${PORT}`)
})