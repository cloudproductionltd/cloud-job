import React, { Component } from 'react';
import Axios from 'axios';
import Footer from './Home/Footer';
import Sidebar from './Home/Sidebar';
import Breadcumb from './Home/Breadcumb';
import { withRouter } from 'react-router';
import Page from 'react-page-loading';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const $ = window.$;





class AdminDisapprovalListofJobs extends Component {


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
        // if(!(window.sessionStorage.getItem('user_role') == 'admin')){
        //     this.props.history.push('/');
        // }
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/jobs/pendingofusers/${user_id}`)
    
            .then(response => {
                
                this.setState({ jobs: [...response.data.response.jobs]})

                this.intervalID = setTimeout(this.getData.bind(this), 5000);
            });
    }

    render() {

        let  { jobs } =this.state
    
        const joblist = jobs.map((job) =>


            <tr style={{ visibility: job.report ?'collapse':''}}>
                <td> <Link to={`/recruiter-decline-job/${job._id}`}>{job.title ? job.title : '' }</Link></td>
                <td>{ job.company_name ? job.company_name : '' } </td>
                <td>{ job.sub_category ? job.sub_category : '' } </td>
                <td>{job.joblevel ?  job.joblevel : ''} </td>
                <td>{ job.vacancy ? job.vacancy : '' } </td>
                <td>{ job.nature ? job.nature : '' } </td>
                <td>{ job.category ? job.category : '' } </td>
                <td>{ job.experience ? job.experience : '' } </td>
                <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td>
                <td><Link to={`/recruiter-decline-job/${job._id}`}><button type="button" class="btn btn-primary btn-rounded btn-sm">Edit</button></Link>
            </td>

            </tr>
        );

        return (
            <div>
                <div className="page commonAdminPage"> 
                    <Breadcumb/>
                    <section class="commonAdminForms disapproveListContainer">
                   
                   <div class="container-fluid">
                       <div class="row justify-content-md-center">
                       <div class="col col-lg-10">
                           <div className="card">
                                   <div className="card-header">
                                       <h4 className="mb-0">Disapproval Job List Admin</h4>
                                   </div>
                                    <div className="card-body">
                                    <table class="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>Title</th>
                                            <th>Company name</th>
                                            <th>Sub category</th>
                                            <th>Job level</th>
                                            <th>Vacancy</th>
                                            <th>Nature</th>
                                            <th>Category</th>
                                            <th>Experience</th>
                                            <th>Negotiable</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {joblist}
                                    </tbody>
                                </table>

                                <nav aria-label="Page navigation example">
                                    <ul class="pagination pg-blue justify-content-center"> 
                                        <li class="page-item disabled">
                                        <span class="page-link">Previous</span>
                                        </li>
                                        <li class="page-item"><a class="page-link">1</a></li>
                                        <li class="page-item active">
                                        <span class="page-link">
                                            2
                                            <span class="sr-only">(current)</span>
                                        </span>
                                        </li>
                                        <li class="page-item"><a class="page-link">3</a></li>
                                        <li class="page-item">
                                        <a class="page-link">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                                


                                  </div>
                               </div>
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

export default withRouter(AdminDisapprovalListofJobs);