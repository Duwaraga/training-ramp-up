import { Student } from "../../entities/student.entity";
import {
  deleteStudent,
  getStudent,
  postStudent,
  updateStudent,
} from "../student.service";

describe("Student Service", () => {
  describe("Get All Student", () => {
    const studentDetails = [
      {
        name: "Bob",
        gender: "Male",
        address: "BobsAddress",
        mobileNo: "0718976356",
        birth: new Date("1999-12-30 00:00:00"),
        age: 21,
      },
    ];

    const body = [
      {
        name: "Bob",
        gender: "Male",
        address: "BobsAddress",
        mobileNo: "0718976356",
        birth: new Date("1999-12-30 00:00:00"),
        age: 21,
      },
    ];

    test("Success for get all the students", async () => {
      Student.find = jest.fn().mockResolvedValue(studentDetails);
      const res = await getStudent();
      expect(res).toEqual(body);
    });

    test("Fail to get students", async () => {
      Student.find = jest.fn().mockRejectedValue(null);
      const res = await getStudent();
      expect(res).toEqual({
        msg: "get student failed",
      });
    });
  });

  describe("delete Student", () => {
    const req = {
      params: {
        id: 1,
      },
    };

    const studentId = 1;

    test("Success for delete Student", async () => {
      Student.delete = jest.fn().mockResolvedValue(studentId);
      const res = await deleteStudent(req);
      expect(res).toEqual(studentId);
    });

    test("Fail to delete student", async () => {
      Student.delete = jest.fn().mockResolvedValue(null);
      const res = await deleteStudent(req);
      expect(res).toEqual(null);
    });
  });

  describe("update student", () => {
    const student = {
      name: "Bob",
      gender: "Male",
      address: "BobsAddress",
      mobileNo: "0718976356",
      birth: new Date("1999-12-30 00:00:00"),
      age: 21,
      id: 1,
    };
    const request = {
      name: "Bob",
      gender: "Male",
      address: "BobsAddress",
      mobileNo: "0718976356",
      birth: new Date("1999-12-30 00:00:00"),
      age: 21,
      studentId: 1,
    };

    const studentChange = {
      id: 1,
      name: "Bob",
      gender: "Male",
      address: "BobsAddress",
      mobileNo: "0718976356",
      birth: new Date("1999-12-30 00:00:00"),
      age: 21,
    };

    test("Update student", async () => {
      Student.findOne = jest.fn().mockResolvedValue(student);
      Student.merge = jest.fn().mockResolvedValue(studentChange);
      Student.save = jest.fn().mockResolvedValue(studentChange);
      const res = await updateStudent(request);
      expect(res).toEqual(studentChange);
    });

    test("Update failed", async () => {
      Student.findOne = jest.fn().mockResolvedValue(null);
      Student.merge = jest.fn().mockResolvedValue(null);
      Student.save = jest.fn().mockResolvedValue(null);
      const res = await updateStudent(request);
      expect(res).toEqual(null);
    });
  });

  describe("User Add", () => {
    const request = {
      studentName: "Bob",
      gender: "Male",
      address: "test address",
      mobileNo: "0123456789",
      dob: new Date("1999-12-30 00:00:00"),
      age: 20,
    };

    const studentDetails = {
      name: "Bob",
      gender: "Male",
      address: "test address",
      mobileNo: "0123456789",
      birth: new Date("1999-12-30 00:00:00"),
      age: 20,
      id: 1,
    } as never;

    test("Add Student Success", async () => {
      jest.spyOn(Student, "save").mockResolvedValue(studentDetails);
      const a = await postStudent(request);
      expect(a).toEqual(studentDetails);
    });
  });
});
