import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: String,
  semesterNumber: Number, 
  materials: [
    {
      materialTitle: String,
      description: String,
      fileURL: String,
    },
  ],
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
