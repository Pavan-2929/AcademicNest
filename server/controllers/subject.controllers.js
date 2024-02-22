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