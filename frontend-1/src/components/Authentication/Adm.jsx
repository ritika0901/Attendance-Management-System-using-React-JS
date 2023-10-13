import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState, useContext } from "react";
import axios from 'axios';
import { Context } from "../../context";
import { useHistory } from "react-router-dom";

const Adm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const navigate = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, setLogin } = useContext(Context)
  
  const clickHandle = async () => {
    navigate.push("/Shome")
  }

  // console.log(login)
  const submitHandler = async () => {
   
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const data = {email:email,password:password}
    
    // console.log(email,password)
    axios
        .post("http://localhost:5000/algin", data)
        .then((res) => res.data) 
        .then((data1) => { 
            console.log(data1, "userLogin"); 
            if (data1.usr === "A") { 
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            // console.log(data1.course)
            setLogin(data1.usr)
            setLoading(false);
            navigate.push("/Dashboard")
        }
        if (data1.error === "User Not found") { 
            toast({
                title: "User Not found",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            setLoading(false);
        }
        if (data1.error === "Incorrect password") { 
            toast({
                title: "Incorrect password",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            setLoading(false);
        }

  });
    }
   
    const data = {email:email,password:password}
    // console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  ;
    return (
      <VStack spacing="10px">
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    );
  
 
};

export default Adm;
