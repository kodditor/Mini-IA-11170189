import mongoose from "mongoose";

export async function connectDB(){
    await mongoose.connect('mongodb://localhost:27017/UGMC')
}

export function getModel(collection='patients'){ // Which specific collection to call from // UGMC created on local/cloud DB
    
    const EContact = new mongoose.Schema({
        name: String,
        phoneNumber: String,
        email: String,
        relationship: String,
    })

    const vitals = new mongoose.Schema({
        temperature: Number,
        bloodPressure: Number,
        pulse: Number,
        SPO2: Number,
    })
    const patients = new mongoose.Schema({
        patientID: String,
        surname : String,
        otherNames: String,
        gender: String,
        phoneNumber: String,
        resAddress: String,
        createdAt: Date,
        emergencyContact: EContact,
        vitals: vitals
    })

    const visitation = new mongoose.Schema({
        id: String,
        patientID: String,
        type: String,
        createdAt: Date
    })

    switch (collection) {
        case 'patients':
            try {
                return mongoose.model('patients', patients)
            } catch (error) {
                return mongoose.model('patients')
            }
            break;
        case 'visitation': 
            try {
                return mongoose.model('visitations', visitation)
            } catch (error) {
                return mongoose.model('visitations')
            }
        default:
            break;
    }

}