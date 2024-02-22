import express from 'express'
import { getSemInfo } from '../controllers/semester.controllers.js'

const router = express.Router()

router.get('/get', getSemInfo)

export default router