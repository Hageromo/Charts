import React, {Component} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import "./Results/App.css"

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
                    <NavDropdown title="Create new chart" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"new/incomes"} style={{ fontSize: '95%' }}>Incomes</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"new/outcomes"} style={{ fontSize: '95%' }}>Outcomes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to={"new"} style={{ fontSize: '95%' }}>Test czy zostaje?</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Results" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"incomes"} style={{ fontSize: '95%' }}>Incomes</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"outcomes"} style={{ fontSize: '95%' }}>Outcomes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to={"results"} style={{ fontSize: '95%' }}>All Results</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="ms-auto">
                    <Link to={"/login"} className="nav-link">Login</Link>
                    <Link to={"/register"} className="nav-link">Register</Link>
                </Nav>
            </Navbar>
        );
    }
}

