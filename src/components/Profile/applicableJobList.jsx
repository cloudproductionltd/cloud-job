import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import UserSidebar from './userSidebar';
import { withRouter,Link } from 'react-router-dom';
import Axios from 'axios'
const $ = window.$;

class ApplicableJobList extends Component {

    constructor(){
        super();
        
    }

    state = {
        jobs:[]
    }

    componentDidMount () {

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/applications`,{headers: headers})
            .then(response => {
                    console.log('Appm',response.data.response.jobs)
                    this.setState({
                        jobs: response.data.response.jobs
                    })
                    
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
        
    }
        


    
    
    render(){
        let ts = new Date();
        let { jobs } = this.state
        const Applications = jobs.map((job,index)=>
                    <tr key={index} style={{ visibility: (job.call == 1)?'':'collapse'}} >
                        <td>
                            <p><b>Company Name: </b>{job.company_name}</p>
                            <p><b>Job title: </b><a href="" className="applied-text">{job.job_title}</a></p>
                            <p className="employer-view"><b>Applied on: </b><span>{ ts.toDateString(job.createdAt)}</span></p>
                        </td>
                        <td className="statusCm" style={{color:'#33b35a'}}> Call For interview</td>
                        <td>  { ts.toDateString(job.deadline)}</td>
                        <td>
                        <button type="button" className="btn btn-primary btn-rounded btn-sm"> <Link to={`/jobs/${job.job_id}/${job.job_title}`}> Details </Link></button>
                        {/* <button type="button" className="btn btn-danger btn-rounded btn-sm" data-toggle="modal" data-target="#sureModal">Cancel</button> */}
                        </td>
                    </tr>
        );

       
        return (
            <div>
            <Navbar/>
            <div className="container page-wrapper chiller-theme">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <UserSidebar/>
                    </div>
                    <div className="col-md-9 col-sm-12">
                    <div className="right-resume-edit-wrapper">
                                <div className="card-bodycm">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb resume-breadcumb-wrapper cmBreadCumb">
                                        <li className="breadcrumb-item">Job Related</li>
                                        <li className="breadcrumb-item active">Applicable Job List</li>
                                    </ol>
                                </nav>
                                <div className="row">
                                    {/* <div className="col-md-4">
                                        <p className="d-inline-block totJob">Total job found</p><span className="d-inline-block job-no">3</span>
                                    </div> */}
                                    
                                </div>
                                <table className="table table-bordered table-responsive online-applicant-table cmtable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Job Title</th>
                                            <th>Status</th>
                                            <th>Deadline</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                   
                                    
                                    {Applications}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="modal" id="sureModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Confirmation</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            {/* <i className="fas fa-exclamation-circle"></i> */}
                            <p className="sureAsk-text">Are you sure?</p>
                            <p align="center">You will not be able to recover this.</p>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <button className="btn btn-success btn-md sureAsk-btn">Yes</button>
                                    <button className="btn btn-danger btn-md sureAsk-btn" data-dismiss="modal">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default withRouter(ApplicableJobList);
