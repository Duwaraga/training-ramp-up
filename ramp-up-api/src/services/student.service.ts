import { Student } from "../entities/student.entity";

export const getStudent = async () => {
  try {
    const student = await Student.find();
    if (student) {
      return student;
    }
  } catch (error) {
    return { msg: "get student failed" };
  }
};

export const postStudent = async (studentDetails: any) => {
  const { studentName, gender, address, mobileNo, dob, age } = studentDetails;
  const student = await Student.save({
    studentName: studentName,
    gender: gender,
    address: address,
    mobileNo: mobileNo,
    dob: dob,
    age: age,
  });
  return student;
};

export const deleteStudent = async (studentRemoveDetails: any) => {
  const id = studentRemoveDetails;
  const response = await Student.delete(id);
  return response;
};

export const updateStudent = async (studentUpdateDetails: any) => {
  const student = await Student.findOne({
    where: { ID: parseInt(studentUpdateDetails.id) },
  });
  Student.merge(student, studentUpdateDetails.user);
  const result = await Student.save({ ...student });
  return result;
};
