import React, { Component } from 'react';

class EmpForm extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     id:'',
        //     firstName: '',
        //     skill: '',
        //     team: ''
        // }
        //this.state.empDetails = props;
        
        // console.log(this.props.formData);
    }
    render() {
        return (
            <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th> Emp Id</th>
                            <th> Name</th>
                            <th> Skill</th>
                            <th> Team</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.formData.map((singleEmp, index) => (
                            <tr key={singleEmp.id}>
                                <td> {singleEmp.id} </td>
                                <td> {singleEmp.firstName}</td>
                                <td> {singleEmp.skill}</td>
                                <td> {singleEmp.team}</td>
                                <td> <button className="btn btn-primary mr-2" onClick={()=> this.props.editItem(singleEmp._id)}> Edit </button><button className="btn btn-secondary" onClick={()=>this.props.deleteItem(singleEmp._id)}> Delete </button></td>
                            </tr>
                        ))
                        }

                    </tbody>
                </table>

            </div>
        );
    }
}

export default EmpForm