import express from 'express'
import { addMaterial, createSubject, deleteMaterial, deleteSubject, getAllSubject, getSubjectData } from '../controllers/subject.controllers.js'

const router = express.Router()

router.get('/get/:number', getSubjectData)
router.get('/get', getAllSubject)
router.post('/material/add/:id', addMaterial)
router.delete('/material/delete/:title', deleteMaterial)
router.post('/add', createSubject)
router.delete('/delete/:id', deleteSubject)

export default router