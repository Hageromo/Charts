import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faList, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Chart} from "react-google-charts";
import "../index.css"
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

class CustomChart extends React.Component {

    constructor(props){
        super(props);
        this.state={

        };
    }

    finalData = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
    ];

    finalOptions = {
        title: "My Daily Activities",
    };

    render() {

        return (
            <Card className={"border border-dark bg-dark text-white centerCard"} style={{ width: '70rem' }}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                        <FontAwesomeIcon icon={faChartLine} /> Make Your own Chart
                    </div>
                </Card.Header>
                <br/>
                <Card className={"border-secondary bg-dark text-white centerCard"} style={{ width: '60rem' }}>
                    <Card.Header>
                        <Row>
                            <div style={{"float":"left"}}>
                                <FontAwesomeIcon icon={faList} /> Charts Panel
                            </div>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label className={"text-white"}>Title of the chart</Form.Label>
                                <Form.Control required type="text" name="incomes" autoComplete="off"        //autoComplete -> suggest value
                                              className={"bg-dark text-white"}
                                              placeholder="Enter title of Your chart" />
                            </Col>
                            <Col>
                                <Form.Label className={"text-white"}>Date Since</Form.Label>
                                <Form.Control required type="date" formControlName="startDate" autoComplete="off"
                                              className={"bg-dark text-white"}
                                              placeholder="Enter date" />
                            </Col>
                            <Col>
                                <Form.Label className={"text-white"}>Date To</Form.Label>
                                <Form.Control required type="date" formControlName="startDate" autoComplete="off"
                                              className={"bg-dark text-white"}
                                              placeholder="Enter date" />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Form.Select required aria-label="Charts Categories">
                                    <option>Chart Categories...</option>
                                    <option value="1">Pie Chart</option>
                                    <option value="2">Column Chart</option>
                                    <option value="3">Number Range Chart</option>
                                    <option value="4">Bar Chart</option>
                                    <option value="5">Gantt ??? Chart</option>
                                    <option value="6">Line Chart</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select required aria-label="Charts Categories">
                                    <option>Budget Categories...</option>
                                    <option value="1">Incomes</option>
                                    <option value="2">Outcomes</option>
                                    <option value="3">Incomes && Outcomes</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                {/*<div style={{"float":"right"}}>*/}
                                {/*    <Button size={"sm"} variant="success" type="submit"><FontAwesomeIcon icon={faCheck} /> Submit</Button>*/}
                                {/*    {" "}*/}
                                {/*    <Button size={"sm"} variant="info" type="reset" name="InReset"><FontAwesomeIcon icon={faUndo} /> Reset</Button>*/}
                                {/*</div>*/}
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size={"sm"} variant="success" type="submit"><FontAwesomeIcon icon={faCheck} /> Submit</Button>
                        {" "}
                        <Button size={"sm"} variant="info" type="reset" name="InReset"><FontAwesomeIcon icon={faUndo} /> Reset</Button>
                    </Card.Footer>
                </Card>
                <Table bordered hover striped variant="dark">
                    <thead>
                    <Card.Body>
                        <div>
                            <Chart
                                chartType="PieChart"
                                data={this.finalData}
                                options={this.finalOptions}
                                width={"100%"}
                                height={"500px"}
                            />
                            <Button variant="success" type="submit">Save as ...</Button>
                        </div>
                    </Card.Body>
                    </thead>
                </Table>
                <br/>
                <br/>
            </Card>
        );
    }
}

export default CustomChart;