import express from "express";
import { addStudent, allStudent, removeStudent,  upgradeStudent} from '../controllers/student.controller';
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth')
import cors from "cors";
import * as BodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

const router = express.Router();

router.get("/students",userAuth, allStudent);
router.post("/students", userAuth,adminAuth, addStudent);
router.delete("/students/:id", userAuth,adminAuth, removeStudent);
router.put("/students/:id", userAuth,adminAuth, upgradeStudent);

export default router;