import React, { useState } from "react";
import axios from 'axios';
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";
import { Context } from "../../context";
import { useContext } from "react";
import { Select } from '@chakra-ui/react'
import "../../App.css"
import { CSVLink } from "react-csv";
import {
    Box,
    Container,
    Text,
  } from "@chakra-ui/react";
  import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

function Gdata(temp,cval){
    let d2 =temp
    axios.get("http://localhost:5000/studs")
            .then((res) => res.data)
            .then((data1)=>{
                d2 = data1.filter(obj => obj.courses.includes(cval));
                     
            })
    return d2        
}

function Faculty(props) {
    const Addcls =(tid,cval,prev,flag) => {
        let clsnow = prev
        if(flag===1){
            clsnow = prev+1
        }
        else{
            clsnow = prev-1
        }

        const dsend = {tid:tid,course:cval,cls:clsnow}
        console.log(dsend)
        axios
          .post("http://localhost:5000/addcls",dsend)
          .then(() => {
            if(fl===1){
                setFl(2)
               }
               else{setFl(1)}})
          .catch(err => {
            console.error(err);
          });
     
    
    }
    const getCourses = (login) => {
        const dsend = {tid:login}
        console.log(dsend)
        axios.post("http://localhost:5000/gcourses",dsend)
            .then((res) => res.data)
            .then((data1)=>{  
                setCourses(data1.courses)
            })

    }
    const getCls = (cval) => {
        const dsend = {tid:login,course:cval}
        console.log(dsend)
        axios.post("http://localhost:5000/getcls",dsend)
            .then((res) => res.data)
            .then((data1)=>{
                console.log(data1.classes)
                setCls(data1.classes)
                console.log(cls)
            })

    }
    
    const AddAtt = (prev,cur,pos,rno,flag) => {
        
        let attnow  = 0
        // console.log("inp: ", prev,cur,pos,rno,flag)
        if(flag===1){
            attnow = cur[pos]+1
            // console.log("f1: ",attnow,prev)
        }
        else{
            attnow = cur[pos]-1
            // console.log("fe: ",attnow)
        }
        // console.log(attnow)
        cur[pos] = attnow
        let dsend ={}
        // console.log(cur,prev,attnow,rno)
        dsend = {rno:rno,attends:cur}
        // console.log(dsend)
        axios
          .post("http://localhost:5000/addattn",dsend)
          .then((res) => res.data)
          .then((data1) =>{
            if(data1.status==='ok'){   
               setData(Gdata(data,cval))
               if(fl===1){
                setFl(2)
               }
               else{setFl(1)}
            //    navigate.push("/Dashboard")
               
            }
    
          });   
    }


    const { login, setLogin } = useContext(Context)
    const [data, setData] = useState([]);
    const [courses,setCourses] = useState([]) 
    const [cval,setCval] = useState() 
    const [cls,setCls] = useState()
    const [fl , setFl] = useState(0)
    let pos = 0
    let val = 0
    let perc = 0
    
    const GetData = () =>{ 
        axios.get("http://localhost:5000/studs")
            .then((res) => res.data)
            .then((data1)=>{
                let d1 = data1.filter(obj => obj.courses.includes(cval));
                let d3 = d1.filter(obj => obj.tids.includes(login.toString()))
                setData(d3)
            })
        };
    React.useEffect(()=>GetData(),[cval]) 
    React.useEffect(()=>GetData(),[fl])       
    React.useEffect(()=>getCourses(login),[login])
    React.useEffect(()=>getCls(cval),[cval])
    React.useEffect(()=>getCls(cval),[fl])
    console.log(courses)
    // getCls(course)
    let d2 = []
    let fname = login + "_" + cval + ".csv"
    
    data.map((item,index)=>{
        pos = item.courses.indexOf(cval)
        val = item.attends[pos]
        if(cls!==0){
            perc = val/cls * 100
        }
        else{
            perc = 0
        }
        let itemp = {
            rno:item.rno,
            name:item.name,
            course:cval,
            value:val,
            classes:cls,
            percentage:perc

        }
        d2.push(itemp)
    })

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
                    <Select placeholder='Select option' onChange={(e) => setCval(e.target.value)}>
                    {courses.map((item,index)=>(
                            <option value={item}>{item}</option>
                    ))}
                    </Select>
                    
                    <Text fontSize="4xl" fontFamily="Work sans">
                    <center>
                        <b>{cval}</b>
                    </center>
                    </Text>
                    <Text fontSize="xl" fontFamily="Work sans">
                    <center>
                        <b>Total Number of Classes = {cls}</b>
                    </center>
                    </Text>
                </Box>
                <center>
                <Button
                    colorScheme="blue"
                    width="40%"
                    style={{ marginTop: 15 ,marginRight:20}}
                    onClick={()=>Addcls(login,cval,cls,1)}
                    >
                    +1 class
                </Button>
                <Button
                    colorScheme="blue"
                    width="40%"
                    style={{ marginTop: 15 ,marginLeft:20 }}
                    onClick={()=>Addcls(login,cval,cls,0)}
                    >
                    -1 Class
                </Button>
                </center>
                </div>
                <TableContainer>
                <Table variant='striped' colorScheme='whitealpha'>
                    <TableCaption>Student Attendance</TableCaption>
                    <Thead>
                    <Tr>
                        <Th><center><Text fontSize="lg" color='white'>Roll No</Text></center></Th>
                        <Th><center><Text fontSize="lg" color='white'>Name</Text></center></Th>
                        <Th><center><Text fontSize="lg" color='white'>Attendance</Text></center></Th>
                        <Th><center><Text fontSize="lg" color='white'>Percentage</Text></center></Th>
                        <Th><center><Text fontSize="lg" color='white'>Add Attendance</Text></center></Th>
                        <Th><center><Text fontSize="lg" color='white'>Remove Attendance</Text></center></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => {
                        pos = item.courses.indexOf(cval)
                        val = item.attends[pos]
                        console.log("val:",val)
                        if(cls!==0){
                            perc = val/cls * 100
                        }
                        else{
                            perc = 0
                        }
                        if(perc<60){
                            return (
                                <Tr key={index}>
                                    <Td><Text as='b' color='tomato' fontSize="lg" fontFamily="Work sans"><center>{item.rno}</center></Text></Td>
                                    <Td><Text as='b' color='tomato' fontSize="lg" fontFamily="Work sans"><center>{item.name}</center></Text></Td>
                                    <Td><Text as='b' color='tomato' fontSize="lg" fontFamily="Work sans"><center>{val}</center></Text></Td>
                                    <Td><Text as='b' color='tomato' fontSize="lg" fontFamily="Work sans"><center>{perc}%</center></Text></Td>
                                    <Td>
                                    <center>
                                    <Button
                                        colorScheme="blue"
                                        width="100%"
                                        onClick={() => AddAtt(val,item.attends,pos,item.rno,1)}
                                    >
                                        +1 Attendance
                                    </Button>
                                    </center>
                                    </Td>
                                    <Td>
                                    <center>
                                    <Button
                                        colorScheme="blue"
                                        width="100%"
                                        onClick={() => AddAtt(val,item.attends,pos,item.rno,0)}
                                    >
                                        -1 Attendance
                                    </Button>
                                    </center>
                                    </Td>
                                </Tr>
                                );

                        }
                        else {
                            return (
                                <Tr key={index}>
                                    <Td><Text as='b' color='white' fontSize="lg"  fontFamily="Work sans"><center>{item.rno}</center></Text></Td>
                                    <Td><Text as='b' color='white' fontSize="lg" fontFamily="Work sans"><center>{item.name}</center></Text></Td>
                                    <Td><Text as='b' color='white' fontSize="lg" fontFamily="Work sans"><center>{val}</center></Text></Td>
                                    <Td><Text as='b' color='white' fontSize="lg" fontFamily="Work sans"><center>{perc}%</center></Text></Td>
                                    <Td>
                                    <center>
                                    <Button
                                        colorScheme="blue"
                                        width="100%"
                                        onClick={() => AddAtt(val,item.attends,pos,item.rno,1)}
                                    >
                                        +1 Attendance
                                    </Button>
                                    </center>
                                    </Td>
                                    <Td>
                                    <center>
                                    <Button
                                        colorScheme="blue"
                                        width="100%"
                                        onClick={() => AddAtt(val,item.attends,pos,item.rno,0)}
                                    >
                                        -1 Attendance
                                    </Button>
                                    </center>
                                    </Td>
                                </Tr>
                                );
                        }
                        
                    })}
    
               
                    </Tbody>
                </Table>
                </TableContainer>
                <CSVLink data={d2} filename={fname}>
                         <Button
                                colorScheme="blue"
                                width="20%"
                            >
                                Download CSV
                            </Button>
                    
                    </CSVLink>

            </div>
        </div>
        </Container>
        );
}

export default Faculty;