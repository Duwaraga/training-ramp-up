import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    loading: false,
    students: [],
  },
  reducers: {
    saveStudents(state, action) {
      state.students = action.payload;
    },
    insertStudent() {},
    removeStudent() {},
    putStudent(state, action) {},
    retrieveStudents(state, action) {},
  },
});

export default studentSlice;
