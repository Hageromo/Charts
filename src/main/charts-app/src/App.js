//import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './components/Results/App.css';
//import axios from 'axios';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import ChartsList from './components/ChartsList';
import Footer from './components/Footer';
import NewCharts from './components/NewCharts';
import Results from './components/Results';
import Contact from './components/Contact';
import Incomes from "./components/Results/Incomes";
import Outcomes from "./components/Results/Outcomes";
import NewIncomes from "./components/NewCharts/NewIncomes";
import NewOutcomes from "./components/NewCharts/NewOutcomes";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
function App() {

  const marginTop = {
    marginTop:"25px"
  };

  return (
    <Router>
      <NavigationBar/>

      <Container>
        <Row>
          <Col lg ={12} style = {marginTop}>

            <Routes>
              <Route path="/" element={<Welcome/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/charts" element={<ChartsList/>}/>
              <Route path="/charts" element={<ChartsList/>}/>
              <Route path="/results" element={<Results/>}/>
              <Route path="/incomes" element={<Incomes/>}/>
              <Route path="/outcomes" element={<Outcomes/>}/>
              <Route path="/new" element={<NewCharts/>}/>
              <Route path="/new/incomes" element={<NewIncomes/>}/>
              <Route path="/new/outcomes" element={<NewOutcomes/>}/>
              <Route path="/edit/incomes/:id" element={<NewIncomes/>}/>
              <Route path="/edit/outcomes/:id" element={<NewOutcomes/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/register"} element={<Register/>}/>
              <Route path={"/logout"} element={<Login/>}/>
            </Routes>

          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>

  );
}





// const UserProfiles = () => {
  
//   const [userProfiles, setUserProfiles] = useState([]);


//   const fetchUserProfiles = () => {
//     axios.get("http://localhost:8080/rest/all")
//     .then(res => {
//       console.log(res);
//       setUserProfiles(res.data);
//     });
//   };

//   useEffect(() => {
//     fetchUserProfiles();
//   }, []);

//   return userProfiles.map((userProfile, index) => {
//     return (
//       <div key={index}>
//         <br/>
//         <br/>
//         <h1>{userProfile.userName}</h1>
//         <p1>{userProfile.id}</p1>
//         <br/>
//       </div>
//     );
//   });
// };


// function App() {
//   return (
//     <div className='App'>
//       <UserProfiles />
//     </div>
//   );
// }

export default App;
