import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import UserSidebar from '../Profile/userSidebar';
import Axios from 'axios';

class index extends Component {
    state={
        applications:[],
        total_jobs :''
    }
    componentDidMount(){

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/applications/`,{headers: headers})
            .then(response => {
                console.log('response: ', response.data.response.jobs)
                this.setState({ applications : response.data.response.jobs ,
                                total_jobs : response.data.response.total
                    })
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
    }


    render() {
        

        let { applications } = this.state
    
        const applicationslist = applications.map((application,index)=> 
                    <tr>
                        
                        <td><p> <b>Company Name:</b> {application.company_name}<a></a></p><p><a>
                            </a><a href="" className="applied-text"> <b>Job title:</b>  {application.job_title}</a>
                            </p><p className="employer-view"> <b>Applied on:</b>
                                <span>
                                <i className="fas fa-calendar-alt"></i> {application.createdAt}
                                </span>
                            </p>
                        </td>
                        <td>{application.expected_salary}</td>
                        <td><p><i className="fas fa-calendar-alt"></i> {application.deadline} </p></td>
                        <td>
                            {
                                application.seen ? <i className="fas fa-check text-success"></i> : ''
                            } 
                        </td>
                        
                        <td>{application.call ===1? 'selected for interview':'pending for interview call'}</td>
                        
                </tr>
        );
        return (
            <div>
                <div className="page-wrapper chiller-theme toggled container">
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <UserSidebar/>
                        </div>
                        <div className="col-md-9 col-sm-12">
                            <div className="card right-resume-edit-wrapper">
                                <div className="top-inst">
                                    <p>Here you can edit your resume in five different steps (Personal, Education/ Training, Employment, Other Information and Photograph). To enrich your resume provide authentic information. 
                                    </p>                      
                                </div>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb resume-breadcumb-wrapper">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Job Applied</li>
                                    </ol>
                                </nav>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="d-inline-block">Total job found</p><span className="d-inline-block job-no">{this.state.total_jobs}</span>

                                    </div>
                                    
                                </div>
                                <table className="table online-applicant-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Job Information</th>
                                            <th>Expected Salary</th>
                                            <th>Deadline</th>
                                            <th>Seen</th>
                                            <th>Interview status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicationslist}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default index;