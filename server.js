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

app.get('/patient/:patientID', async (req, res) => {
    const patientID = req.params.patientID
    const model = getModel()
    const patient = await model.find({'patientID': patientID})
    if(patient) {
        res.status(200).json(patient)
    } else {
        res.status(404).send(`Error: Could not find patient with id: ${patientID}`)
    }

})


app.post('/patient', async (req, res) => {
    const patientObject = req.body
    patientObject.vitals = {
        temperature: 0,
        bloodPressure: 0,
        pulse: 0,
        SPO2: 0,
    }
    
    patientObject.createdAt = new Date()

    const model = getModel()
    const newPatient = await model.insertMany(patientObject)
    
    if(newPatient){
        res.status(200).json(newPatient)
    }
    else {
        res.status(500).send('Error: Could not create new patient object')
    }
})

app.post('/patient/:patientID/vitals', async (req, res) =>{
    const patientID = req.params.patientID
    const vitals = req.body
    const model = getModel()
    const updatedPatient = await model.updateOne({'patientID': patientID}, { $set: {
        vitals: vitals
    }})

    if(updatedPatient) {
        res.status(200).json(updatedPatient)
    } else {
        res.status(500).send(`Error: Could not update patient with id: ${patientID}`)
    }
})


app.listen(PORT, ()=>{
    console.log(`Started server at http://localhost:${PORT}`)
})