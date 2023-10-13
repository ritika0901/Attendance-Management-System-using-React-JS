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
import Slogin from "./Slogin"
import Ssignup from "./Ssignup";

function Shome() {
  const history = useHistory();


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
            <b>ATTENDANCE MANAGEMENT</b>
          </center>
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Student Login</Tab>
            <Tab>Student Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Slogin />
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

export default Shome;
