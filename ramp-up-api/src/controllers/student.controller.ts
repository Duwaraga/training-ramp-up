import { Student } from "../entities/student.entity";
import {
  getStudent,
  postStudent,
  deleteStudent,
  updateStudent,
} from "../services/student.service";

export const allStudent = async (req: any, res: any) => {
  try {
    const user = await getStudent();
    if (!user) return res.json("Error get Student").status(400);
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = async (req: any, res: any) => {
  console.log("req", req.body);
  try {
    const studentData = req.body;
    const user = await postStudent(studentData);
    if (!user) return res.json("Error post Student").status(400);
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const removeStudent = async (req: any, res: any) => {
  try {
    const studentId = req.params.id;
    const user = await deleteStudent(studentId);
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const upgradeStudent = async (req: any, res: any) => {
  try {
    const studentId = req.body;
    const studentUpdateDetails = { user: req.body, id: req.params.id };
    const user = await updateStudent(studentUpdateDetails);
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
};
