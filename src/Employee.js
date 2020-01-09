import React, { Component } from 'react';
import axios from 'axios';
import EmpForm from './EmpForm';
let updateDataIndex;

class Employee extends Component {
    constructor() {
        super();
        this.state = {
            empDetails: {
                id: '',
                firstName: '',
                skill: '',
                team: ''
            },
            myDataLength: false,
            myData: [],
            isUpdateNeeded: false
        }
    }
    componentDidMount(){
        this.refresh();
    }
    refresh(){
        this.getData().then( (response)=> {
            this.setState({
                myData : response.employees, myDataLength: true
            })
            console.log(this.state.myData);
        })
    }
    async getData(){
            let response =
              await axios.get("http://localhost:4000/employee/get")

            return response.data
    }
    addItem = (e) => {
        e.preventDefault();
        // console.log("Button is clicked")
        axios.post("http://localhost:4000/employee/create", this.state.empDetails)
        .then(
            ()=>{
                this.refresh();
                this.setState({
                    empDetails: {
                        id: '',
                        firstName: '',
                        skill: '',
                        team: ''
                    }
                })
            } ).catch();
        // let myDataDetails = this.state.myData;
        // // console.log(myDataDetails)
        // myDataDetails.push(this.state.empDetails)
        // console.log(this.state.empDetails);
        
        //console.log(this.state.myData)
    }

    deleteItem = (id) => {
        // console.log("I am clicked");
        //this.state.myData.splice(index, 1);
        axios.delete(`http://localhost:4000/employee/remove/${id}`)
        .then(()=>{
            this.refresh();
                this.setState({
                    empDetails: {
                        id: '',
                        firstName: '',
                        skill: '',
                        team: ''
                    }
        });
        if (this.state.myData.length === 0) {
            this.setState({ myDataLength: false })
        }}).catch();
        // let myDataDetails = this.state.myData;
        // myDataDetails.splice(index, 1)
        // this.setState({
        //     myData: myDataDetails, empDetails: {
        //         id: '',
        //         firstName: '',
        //         skill: '',
        //         team: ''
        //     }
        // })
        
        // console.log(this.state.myData);
    }
    editItem = (id) => {
        updateDataIndex = id;
        axios.get(`http://localhost:4000/employee/get/${id}`)
        .then((response)=>{
            console.log(response);
            this.setState({
                empDetails: {
                    id: response.data.employee.id,
                    firstName: response.data.employee.firstName,
                    skill: response.data.employee.skill,
                    team: response.data.employee.team
                }, isUpdateNeeded: true
            })
        });
        // axios.put(`http://localhost:4000/employee/update/${id}`)
        
        // let myDataDetails = this.state.myData[index];
        

    }
    updateItem = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/employee/update/${updateDataIndex}`, this.state.empDetails)
        .then(()=>{
            this.refresh();
                this.setState({
                    empDetails: {
                        id: '',
                        firstName: '',
                        skill: '',
                        team: ''
                    },myDataLength: true, isUpdateNeeded: false
        });
        })
    }
    
    cancelUpdate = () => {
        this.setState({ empDetails: {
                id: '',
                firstName: '',
                skill: '',
                team: ''
            }, isUpdateNeeded: false
        })
    }
    handleInput = (e) => {
        let empDetails = { ...this.state.empDetails }
        empDetails[e.target.name] = e.target.value;
        this.setState({ empDetails })
        
    }

    render() {
        return (
            <div className="container my-2">
                <h2 className="my-2"> Employee Details</h2>
                <form className="form-inline">
                    <div className="form-group">
                        <label className="m-2" htmlFor="id"> Emp Id:</label>
                        <input type="text" className="form-control" name="id" onChange={this.handleInput}
                            value={this.state.empDetails.id} />
                    </div>
                    <div className="form-group">
                        <label className="m-2" htmlFor="firstName"> First Name:</label>
                        <input type="text" className="form-control" name="firstName" onChange={this.handleInput}
                            value={this.state.empDetails.firstName} />
                    </div>
                    <div className="form-group">
                        <label className="m-2" htmlFor="skill"> Skill: </label>
                        <input type="text" className="form-control" name="skill" onChange={this.handleInput}
                            value={this.state.empDetails.skill} />
                    </div>
                    <div className="form-group">
                        <label className="m-2" htmlFor="team"> Team:</label>
                        <input type="text" className="form-control" name="team" onChange={this.handleInput}
                            value={this.state.empDetails.team} />
                    </div>
                    {this.state.isUpdateNeeded ?
                        <div className="my-2">
                            <button className="btn btn-success mr-2" onClick={this.updateItem}> Update </button>
                            <button className="btn btn-danger" onClick={this.cancelUpdate}> Cancel </button>
                        </div> :
                        <div className="my-2">
                            <button className="btn btn-primary" onClick={this.addItem}>Add</button>
                        </div>
                    }
                </form>

                {this.state.myDataLength ? <EmpForm formData={this.state.myData} deleteItem={this.deleteItem} editItem={this.editItem}></EmpForm> : null}
                {/* <EmpForm></EmpForm> */}
            </div>

        )
    }
}

export default Employee;