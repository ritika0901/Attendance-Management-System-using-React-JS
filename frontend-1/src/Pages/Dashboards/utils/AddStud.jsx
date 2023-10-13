import React, { useState } from "react";
import "../../../App.css"; // import css file to set styles
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
import { useHistory } from "react-router-dom";


function AddStud() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState(0);
  const [course1, setCourse1] = useState("");
  const [course2, setCourse2] = useState("");
  const [course3, setCourse3] = useState("");
  const toast = useToast();
  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRollNoChange = (event) => {
    setRollNo(parseInt(event.target.value));
  };

  const handleCourse1Change = (event) => {
    setCourse1(event.target.value);
  };

  const handleCourse2Change = (event) => {
    setCourse2(event.target.value);
  };

  const handleCourse3Change = (event) => {
    setCourse3(event.target.value);
  };

  const handleSubmit = (event) => {

    if (!name || !rollNo || !course1|| !course2|| !course3) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        
        return;
      }
      
      const data = {name:name,rno:rollNo,course1:course1,attend1:0,course2:course2,attend2:0,course3:course3,attend3:0,}
      
      console.log(name,rollNo,course1,course2,course3)
      axios
        .post("http://localhost:5000/addstud",data)
        .then(() => console.log('Student Created'))
        .catch(err => {
          console.error(err);
        });
      
      console.warn(data);
      if (data) {
        alert("Data saved succesfully");
        setRollNo("");
        setName("");
        setCourse1("");
        setCourse2("");
        setCourse3("");
      }
      console.log(data);
      toast({
        title: "Student Added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    history.push("/Dashboard")
  }

    return (
    <div className="container">
          <form >
              <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNo">Roll No.:</label>
          <input
            type="number"
            id="rollNo"
            value={rollNo}
            onChange={handleRollNoChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course1">Course 1:</label>
          <input
            type="text"
            id="course1"
            value={course1}
            onChange={handleCourse1Change}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course2">Course 2:</label>
          <input
            type="text"
            id="course2"
            value={course2}
            onChange={handleCourse2Change}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course3">Course 3:</label>
          <input
            type="text"
            id="course3"
            value={course3}
            onChange={handleCourse3Change}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddStud;