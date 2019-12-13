import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import UserSidebar from './userSidebar';
import { withRouter,Link } from 'react-router-dom';
import Axios from 'axios'
const $ = window.$;

class DisapprovedJobList extends Component {

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
                <tr key={index} style={{ visibility: (job.disapproveStatus == 1)?'':'collapse'}} >
                    <td>
                        <p><b>Company Name: </b>{job.company_name}</p>
                        <p><b>Job title: </b><a href="" className="applied-text">{job.job_title}</a></p>
                        <p className="employer-view"><b>Applied on: </b><span>{ ts.toDateString(job.createdAt)}</span></p>
                    </td>
                    <td className="statusCm" style={{color:'#33b35a'}}> disapprove</td>
                    <td>  {job.disapproveMassage}</td>
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
                                    <li className="breadcrumb-item active">Disapproved Job List</li>
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
                                        <th>Disapprove Massage</th>
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
            <div className="modal" id="compareListModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Compare List</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                        <table className="table table-bordered table-responsive online-applicant-table cmtable compaTable">
                                    <thead className="thead-light">
                                        <th><p><b>Job Title: </b><a href="" className="">Android Developer</a></p></th>
                                        <th><p className="employer-view"> <b>Applied on: </b>
                                            <span>12/10/2019</span>
                                        </p></th>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <p><b>Required skills:</b>
                                                <ul>
                                                    <li>5+ years of Android Application or platform development experience</li>
                                                    <li>Strong Java programming skills (preferred)</li>
                                                    <li>Good understanding of Android platform architecture</li>
                                                    <li>Excellent written and verbal communication skills in English</li>
                                                    <li>Excellent written and verbal communication skills in Japanese, Korean or Mandarin</li>
                                                </ul>
                                            </p>
                                        </td>
                                       
                                        <td>
                                            <p><b>Your skills:</b>
                                                <ul>
                                                    <li>5+ years of Android Application or platform development experience</li>
                                                    <li>Strong Java programming skills (preferred)</li>
                                                    <li>Good understanding of Android platform architecture</li>
                                                    <li>Excellent written and verbal communication skills in English</li>
                                                    <li>Excellent written and verbal communication skills in Japanese, Korean or Mandarin</li>
                                                </ul>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p><b>Educational Qualification:</b>
                                                <ul>
                                                    <li>BSC in CSE</li>
                                                </ul>
                                            </p>
                                           
                                        </td>
                                       
                                        <td>
                                            <p><b>Your Educational Qualification:</b>
                                            <ul>
                                                <li>Honours in Management</li></ul> 
                                            </p>
                                           
                                        </td>
                                    </tr>
                                   
                                    
                                   
                                        
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default withRouter(DisapprovedJobList);
