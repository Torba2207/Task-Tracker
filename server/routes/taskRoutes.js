import express from 'express'
import {addTask,getTasks,updateTask,deleteTask} from "../controllers/taskController.js"
import { authMiddleware } from '../middlewares/authMiddleware.js'


const router=express.Router()

router.post('/tasks', authMiddleware,addTask)
router.get('/tasks',authMiddleware,getTasks)
router.put('/tasks:taskId',authMiddleware,updateTask)
router.delete('/tasks:taskId',authMiddleware,deleteTask)

export default router