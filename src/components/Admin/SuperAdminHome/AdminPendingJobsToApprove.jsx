import React, { Component } from 'react';
import Breadcumb from '../SuperAdminHome/Breadcumb';
import Sidebar from '../SuperAdminHome/Sidebar';
import Footer from '../SuperAdminHome/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';

class AdminPendingJobsToApprove extends Component {

    intervalID;

    state={
        jobs:[]
    }

    componentDidMount(){
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    getData = () => {
        Axios.post(`/jobs/pending`)
        .then(response => {
            this.setState({
                jobs:[...response.data.response.jobs]
            })

            this.intervalID = setTimeout(this.getData.bind(this), 5000);
        })
        

    }


    render() {
    
        let { jobs } = this.state

        const joblist = jobs.map((job,index)=>
        
                    <tr key={index} style={{ visibility: job.report ?'collapse':''}}>
                        
                        <td>
                            <h2 className="loop-item-title"> { job.title } </h2>
                        </td>
                        <td>
                            {job.company_name}
                        </td>
                        <td>
                            { job.sub_category}
                        </td>
                        <td>
                            {job.jobType}
                        </td>
                        {/* <td>
                            {job.experience}
                        </td> */}
                        <td>
                        {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                        <Link to={`/pendingjobsdetails/${job._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
                        </td>
                    </tr>
        )


        return (
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    <section className="commonAdminForms">
                        <div className="container-fluid">
                                {/* <header> 
                                    <h1 className="h3 display"></h1>
                                </header> */}
                                <div className="row justify-content-md-center">
                                    <div className="col col-lg-10">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>All Pending job list</h4>
                                        </div>
                                        <div className="card-body">
                                        <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Job Title</th>
                                                        <th>Company Name</th>
                                                        <th>Job Category</th>
                                                        <th>Job nature</th>
                                                        {/* <th>Experience</th> */}
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {joblist}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer/>
                </div>
            </div>
            );
        }
    }
export default withRouter(AdminPendingJobsToApprove);