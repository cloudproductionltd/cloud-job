import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import {  Link } from 'react-router-dom';
import CoolTabs from 'react-cool-tabs';
import Error from '../../../components/Error';
const $ = window.$;

class AllDisApprovedUser extends Component {

    state = {
        users:[]
    }


    
    componentDidMount(){
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }


    getData = () => {

        Axios.get(`/users/`)
            .then(response => {
                
                // console.log('users: ', response.data.response.users)
                this.setState({users: response.data.response.users})
                this.intervalID = setTimeout(this.getData.bind(this), 5000);
            })
            .catch(error => {
                console.log('error: ', error.response)
            })


       
        
    }

    render() {

            let { users } = this.state

            const usersList = users.map((user,index)=>
            
                        <tr key={index}   style={{ visibility: (user.adminVerificationforUser == 0  && user.role =="seeker" && user.disapprovereport != null)  ?'':'collapse' }}>
                            
                            <td>
                                <p><b>Name:</b></p>
                                <p>{ user.personal.firstName }</p>
                                <p>{user.personal.lastName}</p> 
                            </td>
                            {/* <td>
                                {user.personal.lastName}
                            </td>
                            <td>
                                { user.local.email}
                            </td> */}
                            <td>
                                { user.verified == 0 ? "No" : "Yes"}
                            </td>
                            <td>
                                { user.adminVerificationforUser == 0 ? "No" : "Yes"}
                            </td>
                            <td>
                            {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                            <Link to={`/userinfo/${user._id}`} className="btn btn-primary btn-sm adminEdIconDelete btn-rounded">Details</Link>
                            </td>
                        </tr>
            )
        return (
            
                    <section className="">
                        
                    
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                            <div className="card-header">
                                                <h4>Disapproved User List </h4>
                                            </div>
                                            <div className="card-body">
                                            <table className="width_tb table table-bordered table-responsive online-applicant-table cmtable companyProfileView">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Name</th>
                                                            {/* <th>Middle Name</th>
                                                            <th>Email </th> */}
                                                            <th>Email verified</th>
                                                            <th>Admin verification</th>
                                                            <th>Details</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        { usersList }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                </div>
                            </div>
                      
                    </section>
           
        );
        }
    }
export default withRouter(AllDisApprovedUser);