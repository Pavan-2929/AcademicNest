import Subject from "../models/subject.model.js"

export const getSubjectData = async (req, res, next) => {
    try {
        const semNumber = req.params.number

        const semInfo = await Subject.find({semesterNumber: semNumber})

        res.json(semInfo)
    } catch (error) {
        console.log(error);
    }
}

export const getAllSubject = async (req, res, next) => {
    try {
        const allSubjects = await Subject.find()

        res.status(200).json(allSubjects)
    } catch (error) {
        console.log(error);
    }
}

export const addMaterial = async (req, res, next) => {
    try {
        const newMaterialInfo = req.body;

        const id = req.params.id

        const findSubject = await Subject.findById(id)

        findSubject.materials.push(newMaterialInfo)

        const updatedSubject = await findSubject.save();

        res.status(200).json(updatedSubject);
    } catch (error) {
        console.log(error);
    }
}