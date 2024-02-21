import mongoose from "mongoose";

const semesterSchema = mongoose.Schema({
  semesterNumber: {
    type: String,
    required: true,
    unique: true,
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }]
});

const Semester = new mongoose.model("Semester", semesterSchema)

export default Semester
