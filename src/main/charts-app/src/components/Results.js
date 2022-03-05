import React, {Component} from "react";
import {Card, Table, Col, ButtonGroup, Button} from "react-bootstrap";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


export default class Results extends Component{

    constructor(props){
        super(props);
        this.state={
            user : []
        };
    }

    componentDidMount(){
        this.findAllData();
    }

    findAllData(){
        axios.get("http://localhost:8080/rest/hageromo")
            .then(response => response.data)
            .then((data) => {
                this.setState({user : data});
            });
    }

    
    render(){
        return(
            <Col>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Results
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Incomes</th>
                                <th>Values</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.user.incomes == null ?
                                <tr align="center">
                                    <td colSpan="6">No data</td>
                                </tr>:

                                this.state.user.incomes.map((users) => (
                                    <tr key={users.id}>
                                        <td>{users.incomes}</td>
                                        <td>{users.value}</td>
                                        <td>{users.date}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size={"sm"} variant={"outline-primary"}><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button size={"sm"} variant={"outline-danger"}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Results
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Outcomes</th>
                                <th>Values</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.user.outcomes == null ?
                                <tr align="center">
                                    <td colSpan="6">No data</td>
                                </tr>:

                                this.state.user.outcomes.map((users) => (
                                    <tr key={users.id}>
                                        <td>{users.outcomes}</td>
                                        <td>{users.value}</td>
                                        <td>{users.date}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size={"sm"} variant={"outline-primary"}><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button size={"sm"} variant={"outline-danger"}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

}

