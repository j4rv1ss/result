import express from "express"
import { createStudent, getStudent, result } from "../controllers/studentController.js"

const router = express.Router()

router.post("/upload",createStudent)
router.get("/students/:Id/result",getStudent)
router.get("/students", result)
export default router