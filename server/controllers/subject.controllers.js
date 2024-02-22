import Subject from "../models/subject.model.js";
import errorHanlder from "../utils/error.js";

export const getSubjectData = async (req, res, next) => {
  try {
    const semNumber = req.params.number;

    const semInfo = await Subject.find({ semesterNumber: semNumber });

    res.json(semInfo);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getAllSubject = async (req, res, next) => {
  try {
    const allSubjects = await Subject.find();

    res.status(200).json(allSubjects);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const addMaterial = async (req, res, next) => {
  try {
    const newMaterialInfo = req.body;

    const id = req.params.id;

    const findSubject = await Subject.findById(id);

    findSubject.materials.push(newMaterialInfo);

    const updatedSubject = await findSubject.save();

    res.status(200).json(updatedSubject);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteMaterial = async (req, res, next) => {
  try {
    const title = req.params.title;

    const subject = await Subject.findOne({ "materials.materialTitle": title });

    if (!subject) {
      return next(errorHanlder(404, "subject not found"));
    }

    const materialIndex = subject.materials.findIndex(
      (material) => material.title === title
    );

    if (!materialIndex) {
      return next(errorHanlder(404, "material not found"));
    }

    subject.materials.splice(materialIndex, 1);

    await subject.save();

    return res.status(200).json("material deleted");
  } catch (error) {
    console.log(error);
    next();
  }
};

export const createSubject = async (req, res, next) => {
  try {
    const subjectData = req.body;

    const newSubject = await Subject.create(subjectData);

    res.status(200).json(newSubject);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Subject.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    console.log(error);
    next();
  }
};
