
import './App.css';
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Dashboard from "./Pages/Dash1";
import AddStud from './Pages/Dashboards/utils/Add2';
import Shome from './components/Authentication/shome';
import Adminlog from './components/Authentication/AdmLog';
import Admin from './Pages/Dashboards/Admin';




function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/Dashboard" component={Dashboard} />
      <Route path="/AddStudent" component={AddStud} />
      <Route path="/Shome" component={Shome} />
      <Route path="/admin-login" component={Adminlog} />
      <Route path="/admin" component={Admin} />
    </div>
  );
}

export default App;
