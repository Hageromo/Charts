import React, {Component} from "react";
import { Col } from "react-bootstrap";
import { Chart } from "react-google-charts";

export default class ChartsList extends Component{
    render(){
        return(
            <Col>
                <Chart
                chartType="PieChart"
                data={[ ['Task', 'Hours per Day'],
                ['Work',     11],
                ['Eat',      2],
                ['Commute',  2],
                ['Watch TV', 2],
                ['Sleep',    7] ]}
                width="auto"
                height="400px"
                legendToggle
                options={{
                    backgroundColor: "lightgray"
                  }}
                />,
                <Chart
                chartType="PieChart"
                data={[ ['Task', 'Hours per Day'],
                ['Work',     11],
                ['Eat',      2],
                ['Commute',  2],
                ['Watch TV', 2],
                ['Sleep',    7] ]}
                backgroundColor="dark"
                width="auto"
                height="400px"
                legendToggle
                options={{
                    backgroundColor: "lightgray"
                  }}
                />
            </Col>
        );
    }
}


