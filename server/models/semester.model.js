import mongoose from "mongoose";

const semesterSchema = mongoose.Schema({
  semesterName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    default: [],
  },
});

const Semester = new mongoose.model("Semester", semesterSchema)

export default Semester
