import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component{
    render(){
        return(

            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <Navbar.Brand className="nav-link">Charts.io</Navbar.Brand>
                </Link>

                <Nav className="mr-auto">
                    <Link to={""} className="nav-link">Home</Link>
                    <Link to={"contact"} className="nav-link">Contact</Link>
                    <Link to={"charts"} className="nav-link">List of charts</Link>
                    <Link to={"new"} className="nav-link">Create new chart</Link>
                    <Link to={"results"} className="nav-link">Results</Link>
                </Nav>
                {/* <Nav className="mr-auto">
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/register"}>Register</Link>
                </Nav> */}
            </Navbar>
        );
    }
}

