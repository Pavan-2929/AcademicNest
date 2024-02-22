import Subject from "../models/subject.model.js";

export const getSubjectData = async (req, res, next) => {
  try {
    const semNumber = req.params.number;

    const semInfo = await Subject.find({ semesterNumber: semNumber });

    res.json(semInfo);
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubject = async (req, res, next) => {
  try {
    const allSubjects = await Subject.find();

    res.status(200).json(allSubjects);
  } catch (error) {
    console.log(error);
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
  }
};

export const deleteMaterial = async (req, res, next) => {
  try {
    const title = req.params.title;

    const subject = await Subject.findOne({ "materials.materialTitle": title });

    if (!subject) {
      return res.status(404).json("material not found");
    }

    const materialIndex = subject.materials.findIndex(
      (material) => material.title === title
    );

    if (!materialIndex) {
      return res.status(404).json("material-index not found");
    }

    subject.materials.splice(materialIndex, 1);

    await subject.save();

    return res.status(200).json("material deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};


export const createSubject = async (req, res, next) => {
  try {
    const subjectData = req.body;

    const newSubject = await Subject.create(subjectData);

    res.status(200).json(newSubject)
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubject = async (req, res, next) => {
    try {
        const id = req.params.id

        const deletedSubject = await Subject.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        console.log(error);
    }
}
