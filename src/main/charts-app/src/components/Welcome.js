import React, {Component} from "react";
import {Carousel, Col} from "react-bootstrap";
import {Chart} from "react-google-charts";
import "./charts.css"
import { Pie } from 'react-chartjs-2';


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let data = [
    ["Task", "Hours per Day"],
    ["Work", getRandomInt(1000)],
    ["Eat",  getRandomInt(1000)],
    ["Commute",  getRandomInt(1000)],
    ["Watch TV",  getRandomInt(1000)],
    ["Sleep",  getRandomInt(1000)],
];

export const options = {
    title: "My Daily Activities",
    backgroundColor: '#EEEEEE',
    // titleTextStyle: {color: 'white'},
    // legendTextStyle: {color: 'white'},
};

export const dataMyLine = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
];

export const optionsMyLine = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: '#EEEEEE',
};

export function App() {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"500px"}
        />
    );
}

export function WelcomeLine() {
    return (
        <Chart
            chartType="LineChart"
            data={dataMyLine}
            options={optionsMyLine}
            width={"100%"}
            height={"500px"}
        />
    );
}

export const Js2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function ControlledCarousel() {
    return (
        <Carousel variant={"dark"}>
            <Carousel.Item>
                <div>
                    {/*<Chart*/}
                    {/*    chartType="LineChart"*/}
                    {/*    data={dataMyLine}*/}
                    {/*    options={optionsMyLine}*/}
                    {/*    width={"100%"}*/}
                    {/*    height={"500px"}*/}
                    {/*/>*/}
                    <Pie data={Js2}/>

                </div>
            </Carousel.Item>

            <Carousel.Item>
                {/*<Chart*/}
                {/*    chartType="PieChart"*/}
                {/*    data={data}*/}
                {/*    options={options}*/}
                {/*    width={"100%"}*/}
                {/*    height={"500px"}*/}
                {/*/>*/}
                <Pie data={Js2} className={"chartJs2"}/>

            </Carousel.Item>

            <Carousel.Item>
                {/*<Chart*/}
                {/*    chartType="LineChart"*/}
                {/*    data={dataMyLine}*/}
                {/*    options={optionsMyLine}*/}
                {/*    width={"100%"}*/}
                {/*    height={"500px"}*/}
                {/*/>*/}
                <Pie data={Js2} className={"chartJs2"}/>

            </Carousel.Item>
        </Carousel>
    );
}

export default class Welcome extends Component{

    render(){
        return(
            // <Col>
            //     <div className='text-lg-center container-fluid p-5 backColor2'>
            //         <h1 className="display-2">Welcome to Charts.io</h1>
            //         <p className="lead">Create your own charts, taking control of your own money!</p>
            //     </div>
            //     <br/>
            //     <div className={"backColor2"}>
            //         <br/>
            //         <br/>
            //         {App()}
            //         {/*{WelcomeLine()}*/}
            //     </div>
            //     <br/>
            //     <br/>
            // </Col>
            <Col>
                <div className='text-lg-center container-fluid p-5 backColor2'>
                    <h1 className="display-2">Welcome to Charts.io</h1>
                    <p className="lead">Create your own charts, taking control of your own money!</p>
                </div>
                <br/>
                {ControlledCarousel()}
            </Col>
        );
    }
 }

// const UserProfiles  = () => {
//
//     const [dataIncomes, setDataIncomes] = useState([]);
//     const [dataOutcomes, setDataOutcomes] = useState([]);
//     const [date, setDate] = useState([]);
//
//     const fetchUserProfiles = () => {
//         axios.get("http://localhost:8080/rest/" + localStorage.getItem("login"))
//             .then(res => {
//                 setDataIncomes(res.data.incomes);
//                 setDataOutcomes(res.data.outcomes);
//                 console.log(res);
//             })
//     };
//
//     useEffect(() => {
//         fetchUserProfiles();
//     }, []);
//
//     ChartJS.register(
//         CategoryScale,
//         LinearScale,
//         PointElement,
//         BarElement,
//         LineElement,
//         Title,
//         Tooltip,
//         Legend
//     );
//
//
//     const label = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//
//     const valueDataIncomes = [];
//     const valueDataOutcomes = [];
//
//     dataIncomes.map((user) => valueDataIncomes.push(user.value));
//     dataOutcomes.map((user) => valueDataOutcomes.push(user.value));
//
//
//     const data = {
//
//         labels: label,
//
//         datasets: [
//             {
//                 label: 'Incomes',
//                 data: valueDataIncomes,
//                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
//
//             },
//             {
//                 label: 'Outcomes',
//                 data: valueDataOutcomes,
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             },
//         ],
//     };
//
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     color: "white",
//                 },
//                 title: {
//                     display: true,
//                     text: 'Chart.js Line Chart',
//                     color: "white",
//                     font: {
//                         size: 14
//                     }
//                 },
//             },
//         }
//     };
//
//     return (
//         <Col>
//             <div className="col-md-4">
//                 <Form.Group controlId="dob">
//                     <Form.Label>Select Date</Form.Label>
//                     <Form.Control type="date" name="dob" placeholder="Date of Birth" />
//                 </Form.Group>
//             </div>
//             <br/>
//             <Line options={options} data={data}/>
//             <br/>
//             <Bar options={options} data={data}/>
//             <br/>
//             <br/>
//         </Col>
//     );
// };
//
//
// function Welcome() {
//     return (
//         <div className='ChartsList'>
//             <UserProfiles />
//         </div>
//     );
// }
//
//
// export default Welcome;
