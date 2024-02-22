import express from 'express'
import { getSubjectData } from '../controllers/subject.controllers.js'

const router = express.Router()

router.get('/get/:number', getSubjectData)

export default router