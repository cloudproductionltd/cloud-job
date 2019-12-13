import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

const $ = window.$;

class DisapprovalListByAdmin extends Component {

    intervalID;


    state ={
        jobs:[],
        report: true
    }

    componentDidMount(){
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }
    
    getData = () => {
        if(!(window.sessionStorage.getItem('user_role') === 'admin')){
            this.props.history.push('/');
        }
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/jobs/admin/pending`,{headers:headers})
    
            .then(response => {
                
                this.setState({ jobs: [...response.data.response.jobs]})

                this.intervalID = setTimeout(this.getData.bind(this), 5000);
            });
    }


    render() {

        let  { jobs } =this.state
    
        const joblist = jobs.map((job) =>


            <tr style={{ visibility: job.report ?'':'collapse'}}>
                <td> {job.title ? job.title : '' }</td>
                <td>{ job.company_name ? job.company_name : '' } </td>
                {/* <td>{ job.sub_category ? job.sub_category : '' } </td> */}
                {/* <td>{job.joblevel ?  job.joblevel : ''} </td> */}
                {/* <td>{ job.vacancy ? job.vacancy : '' } </td> */}
                <td>{ job.category ? job.category : '' } </td>
            
                {/* <td>{ job.experience ? job.experience : '' } </td> */}
                {/* <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td> */}
                <td><Link to={`/admin/disapprove/job/details/${job._id}`}><button type="button" className="btn btn-primary btn-rounded btn-sm">Show</button></Link>
            </td>

            </tr>
        );

        return (
            <div>
                <div className="page commonAdminPage"> 
                    <Breadcumb/>
                    <section className="commonAdminForms">
                   
                   <div className="container-fluid">
                       <div className="row justify-content-md-center">
                       <div className="col col-lg-10">
                       <div className="card recrutrJobRow">
                                   <div className="card-header">
                                       <h4 className="mb-0">Disapproval list of job</h4>
                                   </div>
                                    <div className="card-body">
                                    <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                    <thead className="thead-light">
                                    <tr>
                                            <th>Job Title</th>
                                            <th>Company name</th>
                                            {/* <th>Sub category</th> */}
                                            {/* <th>Job level</th> */}
                                            {/* <th>Vacancy</th> */}
                                            <th>Job Category</th>
                                        
                                            {/* <th>Experience</th>
                                            <th>Negotiable</th> */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                    {joblist}
                                    </tbody>
                                </table>

                               


                                  </div>
                               </div>
                           
                           
                               {/* <div className="card">
                                   <div className="card-header">
                                       <h4 className="mb-0">DisApproval list of Recruiter</h4>
                                   </div>
                                    <div className="card-body">
                                    <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Job Id</th>
                                            <th>Job Title</th>
                                            <th>Total Applicants</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td className="">0001</td>
                                            <td>Android Developer</td>
                                            <td>10</td>
                                            <td><button type="button" className="btn btn-primary btn-rounded btn-sm">Details</button>
                                            <button type="button" className="btn nextStep btn-rounded btn-sm">Approve</button></td>

                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td className="">0002</td>
                                            <td>Software Engineer</td>
                                            <td>11</td>
                                            <td><button type="button" className="btn btn-primary btn-rounded btn-sm">Details</button>
                                            <button type="button" className="btn nextStep btn-rounded btn-sm">Approve</button></td>

                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td className="">0003</td>
                                            <td>Android Developer</td>
                                            <td>15</td>
                                            <td><button type="button" className="btn btn-primary btn-rounded btn-sm">Details</button>
                                            <button type="button" className="btn nextStep btn-rounded btn-sm">Approve</button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <nav aria-label="Page navigation example">
                                    <ul className="pagination pg-blue justify-content-center"> 
                                        <li className="page-item disabled">
                                        <span className="page-link">Previous</span>
                                        </li>
                                        <li className="page-item"><a className="page-link">1</a></li>
                                        <li className="page-item active">
                                        <span className="page-link">
                                            2
                                            <span className="sr-only">(current)</span>
                                        </span>
                                        </li>
                                        <li className="page-item"><a className="page-link">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                                


                                  </div>
                               </div>
                            */}
                        
                           </div>
                       </div>
                   </div>
               </section>
               
                    <Footer/>
                </div>
                <Sidebar/>
               
            </div>
        );
    }
}

export default withRouter(DisapprovalListByAdmin);