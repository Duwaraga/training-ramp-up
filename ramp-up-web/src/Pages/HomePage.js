import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "../Components/MyCommandCell";
import { getStudents } from "../services/studentServices";
import { Upload } from "@progress/kendo-react-upload";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import studentSlice from "../redux/slice/studentSlice";

const socket = io("http://localhost:8080");
const editField = "inEdit";

const HomePage = () => {
  const [data, setData] = useState([]);
  const[admin,setAdmin] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const studentList = students.data;

useEffect(()=>{
 if( localStorage.getItem("role") ==="Admin"){
  setAdmin(true)
 }
  
},[])

  useEffect(() => {
    setData(studentList);
  }, [studentList]);

  useEffect(() => {
    dispatch(studentSlice.actions.retrieveStudents());
  }, []);

  useEffect(() => {
    socket.on("student_received", (data) => {
      alert(data);
    });
    socket.on("student_deleted", (data) => {
      alert(data);
    });
  }, [socket]);

  const remove = (dataItem) => {
    try {
      dispatch(studentSlice.actions.removeStudent(dataItem));

      socket.emit("student_removed", `Student was deleted`);
      alert("Student was deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const add = (dataItem) => {
    try {
      dispatch(studentSlice.actions.insertStudent({ dataItem }));
      socket.emit("student_added", `Student was added `);
      alert("Student was added");
    } catch (error) {
      console.log(error);
    }
  };

  const update = (dataItem) => {
    try {
      dispatch(studentSlice.actions.putStudent(dataItem));
      socket.emit("student_added", `Student was changed`);
      alert("Student was updated");
    } catch (error) {
      console.log(error);
    }
  };
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalStudent = getStudents().find((p) => p.ID === dataItem.ID);
    const newData = data.map((student) =>
      student.ID === originalStudent.ID ? originalStudent : student
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((student) =>
        student.ID === dataItem.ID
          ? { ...student, dob: new Date(student.dob), inEdit: true }
          : student
      )
    );
  };

  const itemChange = (event) => {
    const newData = data.map((student) =>
      student.ID === event.dataItem.ID
        ? { ...student, [event.field || ""]: event.value }
        : student
    );
    setData(newData);
  };

  const addNew = () => {
    try {
      socket.emit("student_added");
      const newDataItem = {
        inEdit: true,
        Discontinued: false,
      };
      setData([newDataItem, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const CommandCell = (props) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  const logout = () => {
    navigate("/");
    localStorage.removeItem("role")
  };

  return (
    <Grid
      style={{
        height: "1000px",
      }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <> 
        {admin ? (
           <button
           title="Add new"
           className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
           onClick={addNew}
         >
           Add new
         </button>
        ):(
          <div></div>
        )}
       
        </>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={logout}
        >
          Logout
        </button>
        <Upload
          restrictions={{
            allowedExtensions: [".csv", ".xlsx"],
          }}
          autoUpload={false}
          defaultFiles={[]}
          withCredentials={false}
          saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
          removeUrl={
            "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
          }
        />
      </GridToolbar>
      <Column field="ID" title="ID" width="50px" editable={false} />
      <Column field="studentName" title="Student Name" width="200px" />
      <Column field="gender" title="Gender" width="120px" />
      <Column field="address" title="Address" width="200px" />
      <Column field="mobileNo" title="Mobile No" width="150px" />
      <Column
        field="dob"
        title="Date of Birth"
        editor="date"
        format="{0:d}"
        width="175px"
      />

      <Column field="age" title="Age" width="150px" editable={false} />
      {admin && <Column cell={CommandCell} title="Command" width="200px" />}
    </Grid>
  );
};

export default HomePage;
