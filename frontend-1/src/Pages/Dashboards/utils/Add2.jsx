import React, { useState } from "react";
import "../../../App.css"; // import css file to set styles
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import {FormControl,FormLabel,Box,Container,Text} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/button";

function AddStud() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState(0);
  const [tids, setTids] = useState("");
  const [course, setCourse] = useState("");
  const toast = useToast();
  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRollNoChange = (event) => {
    setRollNo(parseInt(event.target.value));
  };
  const handletidChange = (event) => {
    setTids(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };


  const handleSubmit = (event) => {
    if (!name || !rollNo || !course || !tids) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    const data = {
      name: name,
      rno: rollNo,
      tids: tids.split(","),
      courses: course.split(","),
      attends: Array(tids.split(",").length).fill(0),
    };

    console.log(name, rollNo, course, tids);
    axios
      .post("http://localhost:5000/addstud", data)
      .then(() => console.log("Student Created"))
      .catch((err) => {
        console.error(err);
      });

    console.warn(data);
    if (data) {
      alert("Data saved succesfully");
      setRollNo("");
      setName("");
      setCourse("");
      setTids("");
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
    history.push("/Dashboard");
  };

    return (
   
      <VStack spacing="5px">
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
        <FormControl id="rollNo" isRequired>
          <FormLabel>Roll No.</FormLabel>
          <Input
            placeholder="Enter your Roll No."
            value={rollNo}
            onChange={handleRollNoChange}
          />
        </FormControl>
        <FormControl id="tids" isRequired>
          <FormLabel>Teacher IDs</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="Enter Teacher IDs separted by comma"
              onChange={handletidChange}
            />
          </InputGroup>
        </FormControl>
        <FormControl id="course" isRequired>
          <FormLabel>Courses</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="Enter Courses separted by comma"
              onChange={handleCourseChange}
            />
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </VStack>
    );
};

export default AddStud