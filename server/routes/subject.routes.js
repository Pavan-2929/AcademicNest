import express from 'express'
import { addMaterial, getAllSubject, getSubjectData } from '../controllers/subject.controllers.js'

const router = express.Router()

router.get('/get/:number', getSubjectData)
router.get('/get', getAllSubject)
router.post('/material/add/:id', addMaterial)

export default router