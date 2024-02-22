import Semester from "../models/semester.model.js"

export const getSemInfo = async (req, res, next) => {
    try {
        const semesterData = await Semester.find();
        console.log(semesterData);

        res.json(semesterData)
    } catch (error) {
        console.log(error);
    }
}
