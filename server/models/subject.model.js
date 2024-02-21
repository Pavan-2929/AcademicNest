import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    materials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materail"
    }]
})

const Subject = new mongoose.model("Subject", subjectSchema)

export default Subject