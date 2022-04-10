import React, {Component} from "react";
import {Card, Table, Col, ButtonGroup, Button, InputGroup, FormControl, Form, Row} from "react-bootstrap";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faEdit,
    faTrash,
    faFastBackward,
    faFastForward,
    faStepForward,
    faStepBackward,
    faSearch, faTimes
} from '@fortawesome/free-solid-svg-icons';
import MyToast from "../Data/MyToast";
import {Link} from "react-router-dom";
import './App.css'
import '../Data/CantFind'
import CantFind from "../Data/CantFind";
import {connect} from "react-redux";

class Incomes extends Component{

    constructor(props){
        super(props);
        this.state={
            user : [],
            search : '',
            currentPage : 1,
            userPerPage : 13,
            sortToggle : "down"
        };
    }

    sortData = () => {
        if( this.state.sortToggle === "down"){
            this.state.sortToggle = "up"
        }else{
            this.state.sortToggle = "down"
        }
        this.findAllData();
    };

    componentDidMount(){
        this.findAllData();
    }

    findAllData(){
        axios.get("http://localhost:8080/rest/data/"+ localStorage.getItem("login") +"/incomes/" + this.state.sortToggle)
            .then(response => response.data)
            .then((data) => {
                this.setState({user : data});
            });
    }

    deleteIncomes = (id) => {
        axios.delete("http://localhost:8080/rest/delete/in/"+ localStorage.getItem("login") + "/"+id)
            .then(response => {
                if(response.data != null){
                    this.setState({"myShow": true});
                    setTimeout(() => this.setState({"myShow":false}), 2000);
                    this.setState(this.findAllData())

                }else{
                    this.setState({"myShow": false});
                }
            })
    };

    changePage = (event) => {
        this.setState({
            [event.target.name]: parseInt(event.target.value),
        });
    };

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1,
            });
        }
    };


    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
            });
        }
    };

    lastPage = () => {
        let usersLength = this.state.user.length;
        if (
            this.state.currentPage < Math.ceil(usersLength / this.state.userPerPage)
        ) {
            this.setState({
                currentPage: Math.ceil(usersLength / this.state.userPerPage),
            });
        }
    };

    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.user.length / this.state.userPerPage)
        ) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            });
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelChange = () => {
        this.setState({"search": ''})
        this.findAllData();
    };

    findSpecIncomes = () => {

        if(this.state.user.map((users) => (users.incomes)).includes(this.state.search)) {
            const myIncome = this.state.user.filter(users => (users.incomes).includes(this.state.search))
            this.setState({user : myIncome})
        }else{
            this.setState({"myError" : true});
            setTimeout(() => this.setState({"myError":false}), 1000);
        }
    };

    render(){
        const {user, currentPage, userPerPage, search} = this.state;
        const lastIndex = currentPage * userPerPage;
        const firstIndex = lastIndex - userPerPage;
        const totalPages = user.length / userPerPage;
        function nullable(){
            if(user == null){
                return 0
            }else{
                return Math.ceil(user.length / userPerPage)
            }
        }
        return(
             <div>
                    <div style={{"display":this.state.myShow ? "block" : "none"}}>
                        <MyToast children={{myShow:this.state.myShow, message: "Incomes Deleted Successfully"}}/>
                        {/*<ToastIn show={this.state.show} message={'Outcomes Deleted Successfully'} type={"danger"}/>*/}
                    </div>
                    <div style={{"display":this.state.myError ? "block" : "none"}}>
                        <CantFind children={{myError:this.state.myError, message: "Can't find any Incomes"}}/>
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <div style={{"float":"left"}}>
                                <FontAwesomeIcon icon={faList} /> Results
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm" >
                                    <FormControl placeholder="Search" name="search" value={search} className={"info-border bg-dark text-white"}
                                    onChange={this.searchChange}/>
                                    <Form.Group>
                                        <Button size="sm" variant="outline-info" type="button" onClick={this.findSpecIncomes}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                        <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelChange}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </Form.Group>
                                </InputGroup>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>Incomes</th>
                                    <th>Values</th>
                                    <th onClick={() => this.sortData()}>Date <div className={this.state.sortToggle === "down" ? "arrow arrow-down" : "arrow arrow-up"}> </div></th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { user == null ?
                                    <tr align="center">
                                        <td colSpan="6">No data</td>
                                    </tr>:

                                    user.slice(firstIndex, lastIndex).map((users) => (
                                        <tr key={users.id}>
                                            <td>{users.incomes}</td>
                                            <td>{users.value}</td>
                                            <td>{users.date}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"/edit/incomes/"+users.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
                                                    <Button size={"sm"} variant="outline-danger"  onClick={() => this.deleteIncomes(users.id)}><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{"float": "left"}}>
                                {user == null ?
                                    currentPage
                                    :
                                    <div>Showing Page {currentPage} of {nullable()}</div>
                                }
                            </div>
                            <div style={{"float": "right"}}>
                                <Form.Group>
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}
                                    >
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === 1 ? true : false}
                                        onClick={this.prevPage}
                                    >
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === totalPages ? true : false}
                                        onClick={this.nextPage}
                                    >
                                        <FontAwesomeIcon icon={faStepForward} /> Next
                                    </Button>
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === totalPages ? true : false}
                                        onClick={this.lastPage}
                                    >
                                        <FontAwesomeIcon icon={faFastForward} /> Last
                                    </Button>
                                </Form.Group>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps)(Incomes);
