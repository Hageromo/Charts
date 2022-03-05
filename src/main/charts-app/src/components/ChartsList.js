import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {Col, Form } from "react-bootstrap";




const UserProfiles = () => {

    const [dataIncomes, setDataIncomes] = useState([]);
    const [dataOutcomes, setDataOutcomes] = useState([]);
    const [date, setDate] = useState([]);

  const fetchUserProfiles = () => {
    axios.get("http://localhost:8080/rest/hageromo")
        .then(res => {
            setDataIncomes(res.data.incomes);
            setDataOutcomes(res.data.outcomes);
            console.log(res);
        })
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );


    const label = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const valueDataIncomes = [];
    const valueDataOutcomes = [];

    dataIncomes.map((user) => valueDataIncomes.push(user.value));
    dataOutcomes.map((user) => valueDataOutcomes.push(user.value));


    const data = {

        labels: label,

        datasets: [
            {
                label: 'Incomes',
                data: valueDataIncomes,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',

            },
            {
                label: 'Outcomes',
                data: valueDataOutcomes,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: "white",
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                    color: "white",
                    font: {
                        size: 14
                    }
                },
            },
        }
    };
    
    return (
        <Col>
            <div className="col-md-4">
                <Form.Group controlId="dob">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                </Form.Group>
            </div>
            <br/>
            <Line options={options} data={data}/>
            <br/>
            <Bar options={options} data={data}/>
            <br/>
            <br/>
        </Col>
    );
};


function ChartsList() {
  return (
    <div className='ChartsList'>
      <UserProfiles />
    </div>
  );
}


export default ChartsList;

