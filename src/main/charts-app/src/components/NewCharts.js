import React, {Component, useState} from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';


export default class NewCharts extends Component{

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }


    initialState = {
        incomes:'', value:'', date: '',
    }

    resetData = () =>{
        this.setState(() => this.initialState)
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
                    this.setState(this.initialState);
                    alert("Incomes Saved Successfully")
                }
            })
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
                                Submit
                            </Button>{'  '}
                            <Button size="sm" variant="info" type="reset">
                                Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>,
                
                {/*<Card className={"border border-dark bg-dark text-white"}>*/}
                {/*    <Card.Header>*/}
                {/*        Add Outcomes*/}
                {/*    </Card.Header>*/}
                {/*    <Form onReset={this.resetData} onSubmit={this.submitData} id="dataFormId">*/}
                {/*        <Card.Body>*/}
                {/*            <Row>*/}
                {/*                <Col>*/}
                {/*                    <Form.Group as={Col}>*/}
                {/*                        <Form.Label>Outcomes</Form.Label>*/}
                {/*                        <Form.Control required type="text" name="outcomes" autoComplete="off"*/}
                {/*                        value={outcomes}*/}
                {/*                        onChange={this.dataChange}*/}
                {/*                        className={"bg-dark text-white"}*/}
                {/*                        placeholder="Enter outcome" />*/}
                {/*                    </Form.Group>*/}
                {/*                </Col>*/}

                {/*                <Col>*/}
                {/*                    <Form.Group as={Col}>*/}
                {/*                        <Form.Label>Value</Form.Label>*/}
                {/*                        <Form.Control required type="text" name="outValues" autoComplete="off"*/}
                {/*                        value={value}*/}
                {/*                        onChange={this.dataChange}*/}
                {/*                        className={"bg-dark text-white"}*/}
                {/*                        placeholder="Enter value" />*/}
                {/*                    </Form.Group>*/}
                {/*                </Col>*/}
                {/*                </Row>*/}
                {/*                <br/>*/}
                {/*                <Form.Group as={Col}>*/}
                {/*                    <Form.Label>Date</Form.Label>*/}
                {/*                    <Form.Control required type="date" autoComplete="off"*/}
                {/*                    value={date}*/}
                {/*                    onChange={this.dataChange}*/}
                {/*                    className={"bg-dark text-white"}*/}
                {/*                    placeholder="Enter date" />*/}
                {/*                </Form.Group>*/}

                {/*        </Card.Body>*/}
                {/*        <Card.Footer style={{"textAlign":"right"}}>*/}
                {/*            <Button size="sm" variant="success" type="submit">*/}
                {/*                Submit*/}
                {/*            </Button>{' '}*/}
                {/*            <Button size="sm" variant="info" type="reset">*/}
                {/*                Reset*/}
                {/*            </Button>*/}
                {/*        </Card.Footer>*/}
                {/*    </Form>*/}
                {/*</Card>  */}
            </Col>
        );
    }
}


