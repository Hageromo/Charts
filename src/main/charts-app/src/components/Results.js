import React, {Component} from "react";
import { Card, Table } from "react-bootstrap";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList} from '@fortawesome/free-solid-svg-icons';


export default class Results extends Component{

    constructor(props){
        super(props);
        this.state={
            user : []
        };
    }

    componentDidMount(){
        axios.get("http://localhost:8080/rest/hageromo")
        .then(response => response.data)
        .then((data) => {
                this.setState({user : data});
        });
    }

    
    render(){
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header> 
                <FontAwesomeIcon icon={faList} /> Results
                </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>Incomes</th>
                                <th>Outcomes</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this.state.user.length === 0 ? 
                            <tr align="center">  
                                <td colSpan="6">No data</td>
                            </tr>:

                            <tr>  
                                <td >{this.state.user.incomes.date}</td>
                            </tr>
                        }   
                        
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>            
        );
    }

}

