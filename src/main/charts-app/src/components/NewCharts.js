import React, {Component, useState} from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';
import ToastIn from "./Data/ToastIn";
import MyToast from "./Data/MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faUndo, faSave, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


export default class NewCharts extends Component{

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.state = this.initialState2;
        this.dataChange = this.dataChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.submitData2 = this.submitData2.bind(this);

        this.state.show = false;
    }


    initialState = {
        incomes:'', value:'', date: ''
    }

    initialState2 = {
        outcomes:'', valueC:'', dateC:''
    }

    resetData = () =>{
        this.setState(() => this.initialState)
    }

    resetData2 = () =>{
        this.setState(() => this.initialState2)
    }

    submitData = event => {

        event.preventDefault();

        const data = {
            incomes: this.state.incomes,
            value: this.state.value,
            date: this.state.date,
        };

        axios.post("http://localhost:8080/rest/add/incomes/hageromo", data)
            .then(res => {
                if(res.data != null){
                    this.setState({"myShow": true});
                    setTimeout(() => this.setState({"myShow":false}), 2000);
                }else{
                    this.setState({"myShow": false});
                }
            })
        this.setState(this.initialState);
    }

    submitData2 = event => {

        event.preventDefault();

        const dataCosts = {
            outcomes: this.state.outcomes,
            value: this.state.valueC,
            date: this.state.dateC,
        };

        axios.post("http://localhost:8080/rest/add/outcomes/hageromo", dataCosts)
            .then(res => {
                if(res.data != null){
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show":false}), 2000);
                }else{
                    this.setState({"show": false});
                }
            })
        this.setState(this.initialState2);
    }

    dataChange = event =>{
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        );
    }

    render(){
        return(
            <Col>
                <div>
                    <div style={{"display":this.state.myShow ? "block" : "none"}}>
                        <MyToast children={{myShow:this.state.myShow, message: "Incomes Saved Successfully"}}/>
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            Add Incomes
                        </Card.Header>
                        <Form onReset={this.resetData} onSubmit={this.submitData} id="dataFormId">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formIncomesTitle">
                                            <Form.Label>Incomes</Form.Label>
                                            <Form.Control required type="text" name="incomes" autoComplete="off"        //autoComplete -> suggest value
                                                          value={this.state.incomes}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter income" />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Col} controlId="formIncomesValue">
                                            <Form.Label>Value</Form.Label>
                                            <Form.Control required type="text" name="value" autoComplete="off"
                                                          value={this.state.value}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter value" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br/>
                                <Form.Group as={Col} controlId="formIncomesDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required type="date" formControlName="startDate" autoComplete="off"
                                                  value={this.state.date}
                                                  onChange={event => this.setState({date: event.target.value})}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date" />
                                </Form.Group>

                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave} /> Submit
                                </Button>{'  '}
                                <Button size="sm" variant="info" type="reset" name="InReset">
                                    <FontAwesomeIcon icon={faUndo} /> Reset
                                </Button>{" "}
                                <Link to={"/results"} className="btn btn-sm btn-primary text-white" ><FontAwesomeIcon icon={faList} /> Incomes List</Link>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>,

                <div>
                    <div style={{"display":this.state.show ? "block" : "none"}}>
                        <ToastIn children={{show:this.state.show, message:'Outcomes Saved Successfully'}}/>
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            Add Outcomes
                        </Card.Header>
                        <Form onReset={this.resetData2} onSubmit={this.submitData2} id="dataFormId">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col}>
                                            <Form.Label>Outcomes</Form.Label>
                                            <Form.Control required type="text" name="outcomes" autoComplete="off"
                                                          value={this.state.outcomes}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter outcome" />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Col} controlId="formOutcomesValue">
                                            <Form.Label>Value</Form.Label>
                                            <Form.Control required type="text" name="valueC" autoComplete="off"
                                                          value={this.state.valueC}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter value" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br/>
                                <Form.Group as={Col}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required type="date" autoComplete="off"
                                                  value={this.state.dateC}
                                                  onChange={event => this.setState({dateC: event.target.value})}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date" />
                                </Form.Group>

                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave} /> Submit
                                </Button>{' '}
                                <Button size="sm" variant="info" type="reset" name="OutReset">
                                    <FontAwesomeIcon icon={faUndo} /> Reset
                                </Button>{" "}
                                <Link to={"/results"} className="btn btn-sm btn-primary text-white" ><FontAwesomeIcon icon={faList} /> Outcomes List</Link>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
            </Col>


        );
    }
}



