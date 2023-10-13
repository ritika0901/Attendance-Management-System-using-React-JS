import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { sContext } from "../../studcontext";
import { useContext } from "react";
import "../../App.css"
import {
    Box,
    Container,
    Text,
  } from "@chakra-ui/react";
  import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'




function Student(props) {
    
    let new1 = {
        name: 'default',
        tids: [0],
        courses: [0],
        attends: [0],
    }
    const [data, setData] = useState(
        {name: 'default',
        tids: [0],
        courses: [0],
        attends: [0],
    }  
); 
    const { rno, setRno } = useContext(sContext)
    const navigate = useHistory();
    const [fl,setFl] = useState(0)
    const [c1,setC1] = useState(1)
    const [c2,setC2] = useState(1)
    const [c3,setC3] = useState(1)
    let rollno = rno 
    console.log(rollno)
    let C1 = 0
    let C2 = 0
    let C3 = 0

 
    if(fl===0){
        setFl(1)
    }
    const getCls = async (tid,course,flag) => {
        const dsend = {tid:tid,course:course}
        console.log(dsend)
        await axios.post("http://localhost:5000/getcls",dsend)
            .then((res) => res.data)
            .then((data1)=>{
                if(flag===1){
                    setC1(data1.classes)
                    console.log(data1.classes)
                }
                if(flag===2){
                    setC2(data1.classes)
                }
                if(flag===3){
                    setC3(data1.classes)
                }
            })
            if(fl===0){
                setFl(1)
            }
    }
    
    useEffect(()=>{
        const GetData = async (rollno) => {
            // let data1 = {};
            const dsend = { rno: rollno };
            console.log(dsend);
        
            try {
                const response = await axios.post("http://localhost:5000/getstud", dsend);
                const data1 = response.data;
                // data1 = data2;
                console.log(data1);
                setData(data1)
                console.log(data1.tids[0],data1.courses[0],1)

                if(data){
                    getCls(data1.tids[0],data1.courses[0],1)
                    getCls(data1.tids[1],data1.courses[1],2)
                    getCls(data1.tids[2],data1.courses[2],3)
                }
                
            } catch (error) {
                console.error(error);
            }
        };  
        GetData(rollno) 
    },[fl])

  
    


    return (
        <Container maxW="xl" centerContent>
        <div>
            <div>
                <div>
                <Box
                    d="flex"
                    justifyContent="center"
                    p={3}
                    bg="white"
                    w="100%"
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Text fontSize="4xl" fontFamily="Work sans">
                    <center>
                        <b>{data.name}</b>
                    </center>
                    </Text>
                    <Text fontSize="4xl" fontFamily="Work sans">
                    <center>
                        <b>Roll No: {data.rno}</b>
                    </center>
                    </Text>
                </Box> 
                </div>
                <TableContainer>
                    {data ?(
                        <Table variant='striped' colorScheme='whitealpha'>
                        <TableCaption>Student Attendance</TableCaption>
                        <Thead>
                    <Tr>
                        <Th><center><Text fontSize="lg" color='white'>{data.courses[0]}</Text></center></Th>
                        <Th><center><Text fontSize="lg" color='white'>{data.courses[1]}</Text></center></Th>
                        <Th><center><Text fontSize="lg" color='white'>{data.courses[2]}</Text></center></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td><Text fontSize="lg" color='white' fontFamily="Work sans"><center>{data.attends[0]}({(data.attends[0]/c1)*100})</center></Text></Td>
                            <Td><Text fontSize="lg" color='white' fontFamily="Work sans"><center>{data.attends[1]}({(data.attends[1]/c2)*100})</center></Text></Td>
                            <Td><Text fontSize="lg" color='white' fontFamily="Work sans"><center>{data.attends[2]}({(data.attends[2]/c3)*100})</center></Text></Td>       
                        </Tr>   
                             
                    </Tbody> 
                    </Table>

                    ):(<Table variant='striped' colorScheme='messenger'>
                    <TableCaption>Student Attendance</TableCaption>
                    {/* <Thead>
                <Tr>
                    <Th><center><Text fontSize="lg" color='black'>{data.courses[0]}</Text></center></Th>
                    <Th><center><Text fontSize="lg" color='black'>{data.courses[1]}</Text></center></Th>
                    <Th><center><Text fontSize="lg" color='black'>{data.courses[2]}</Text></center></Th>
                </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td><Text fontSize="lg" fontFamily="Work sans"><center>{data.attends[0]}({(data.attends[0]/c1)*100})</center></Text></Td>
                        <Td><Text fontSize="lg" fontFamily="Work sans"><center>{data.attends[1]}({(data.attends[1]/c2)*100})</center></Text></Td>
                        <Td><Text fontSize="lg" fontFamily="Work sans"><center>{data.attends[2]}({(data.attends[2]/c3)*100})</center></Text></Td>       
                    </Tr>   
                         
                </Tbody>  */}
                </Table>)}
                
                </TableContainer>

            </div>
        </div>
        </Container>
        );
}

export default Student;