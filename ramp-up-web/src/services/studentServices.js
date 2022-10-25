import axios from "axios";

let data = [];
const config = {
  headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
};

export const insertStudent = async (student) => {
  student.inEdit = false;
  if (
    student.dataItem.studentName == null ||
    student.dataItem.address == null ||
    student.dataItem.dob == null ||
    student.dataItem.mobileNo == null
  ) {
    alert("Please input valid data");
  } else {
    data.unshift(student.dataItem);
    if (new Date() - new Date(student.dataItem.dob) < 0) {
      alert("Please input valid date");
    } else {
      if (
        student.dataItem.gender === "Male" ||
        student.dataItem.gender === "Female" ||
        student.dataItem.gender === "Other"
      ) {
        student.dataItem.age =
          new Date().getFullYear() -
          new Date(student.dataItem.dob).getFullYear();

        const studentDetails = {
          studentName: student.dataItem.studentName,
          gender: student.dataItem.gender,
          address: student.dataItem.address,
          mobileNo: student.dataItem.mobileNo,
          dob: student.dataItem.dob,
          age: student.dataItem.age,
        };

        await axios.post(
          "http://localhost:3000/student",
          studentDetails,
          config
        );
      } else {
        alert("Please use these keywords only : Male, Female, and Other");
      }
    }
  }
};

export const getStudents = async () => {
  const res = await axios.get("http://localhost:3000/student", config);

  return res;
};
export const updateStudent = async (student) => {
  await axios.put(
    `http://localhost:3000/student/${student.ID}`,
    student,
    config
  );
};
export const deleteStudent = async (student) => {
  await axios.delete(`http://localhost:3000/student/${student.ID}`, config);
};
