import '../App.css';
import Faculty from "./Dashboards/Faculty";
import Student from "./Dashboards/Student";
import Admin from './Dashboards/Admin';
import { useContext } from "react";
import { Context } from "../context";
import { useHistory } from "react-router-dom";

function Dashboard() {
    const navigate = useHistory()
    const {login, setLogin} = useContext(Context)
    console.log(login)
    
    if(login!==""){
        if(login==='S'){
            return(
                <Student/>
            )
        }
        if(login==='A'){
            return(
                <Admin/>
            )
        }

        else{
            return(
                <Faculty data={login}/>
                )
        }
    }

    else{
        navigate.push("/")

    }
}

export default Dashboard;