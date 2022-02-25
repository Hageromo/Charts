import React, {Component} from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";


export default class NewCharts extends Component{

    // constructor(props){
    //     super(props);
    //     this.state = {incomes:'', inValues:'', outcomes:'', outValues:''};
    //     this.dataChange = this.dataChange.bind(this);
    //     this.submitData = this.submitData.bind(this);
    // }

    submitData(event){
        alert(this.state.incomes)
        event.preventDefault();
    }

    dataChange(event){
        this.setState(
            {
                [event.targett.name]:event.target.value
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
                    <Form onSubmit={this.submitData} id="dataFormId">
                        <Card.Body>

                            <Row>
                                <Col>
                                    <Form.Group as={Col} controlId="formIncomesTitle">
                                            <Form.Label>Incomes</Form.Label>
                                            <Form.Control type="text" name="incomes"
                                            // value={this.state.incomes}
                                            // onChange={this.dataChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter income" />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group as={Col}>
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control type="text" name="inValues"
                                        className={"bg-dark text-white"}
                                        placeholder="Enter value" />
                                    </Form.Group>
                                </Col>
                            </Row>
                                <br/>
                                <Form.Group as={Col}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required type="date"
                                    className={"bg-dark text-white"}
                                    placeholder="Enter date" />
                                </Form.Group>

                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                Submit
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>,
                
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        Add Outcomes
                    </Card.Header>
                    <Form onSubmit={this.submitData} id="dataFormId">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group as={Col}>
                                        <Form.Label>Outcomes</Form.Label>
                                        <Form.Control type="text" name="outcomes"
                                        className={"bg-dark text-white"}
                                        placeholder="Enter outcome" />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group as={Col}>
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control type="text" name="outValues"
                                        className={"bg-dark text-white"}
                                        placeholder="Enter value" />
                                    </Form.Group>
                                </Col>
                                </Row>
                                <br/>
                                <Form.Group as={Col}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required type="date"
                                    className={"bg-dark text-white"}
                                    placeholder="Enter date" />
                                </Form.Group>

                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                Submit
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>  
            </Col>
        );
    }
}


