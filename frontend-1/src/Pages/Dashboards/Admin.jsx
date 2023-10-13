import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  import { useHistory } from "react-router";
  import Ssignup from "../../components/Authentication/Ssignup";
  import Signup from "../../components/Authentication/Signup";
  import AddStud from '../../Pages/Dashboards/utils/Add2';
  
  function Admin() {
    const history = useHistory();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
  
      // if (user) history.push("/Signup");
    }, [history]);
  
    return (
      <Container maxW="xl" centerContent>
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
              <b>ADMIN VIEW</b>
            </center>
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Add Faculty</Tab>
              <Tab>Add Student</Tab>
              <Tab>Create Student Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Signup />
              </TabPanel>
              <TabPanel>
                <AddStud />
              </TabPanel>
              <TabPanel>
                <Ssignup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
  }
  
  export default Admin;
  