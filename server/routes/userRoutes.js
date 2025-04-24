import express from 'express'
import { getCurrentUserData } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router=express.Router()

router.get('/me',authMiddleware,getCurrentUserData)

export default router