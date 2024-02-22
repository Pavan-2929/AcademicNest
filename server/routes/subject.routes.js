import express from 'express'
import { addMaterial, deleteMaterial, getAllSubject, getSubjectData } from '../controllers/subject.controllers.js'

const router = express.Router()

router.get('/get/:number', getSubjectData)
router.get('/get', getAllSubject)
router.post('/material/add/:id', addMaterial)
router.delete('/material/delete/:title', deleteMaterial)

export default router