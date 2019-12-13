import React, { Component } from 'react';
import Breadcumb from './Home/Breadcumb';
import Sidebar from './Home/Sidebar';
import Footer from './Home/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';
import Page from 'react-page-loading';

class Applicants extends Component {


    state={
        applicants:[]
    }
    componentDidMount(){

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/applications/applicants`,{headers: headers})
            .then(response => {
                console.log('ressssss',response.data.response.applicants)
                this.setState({ applicants:response.data.response.applicants })
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
    }


    acceptApplicants(id,companyid){

        
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.get(`/applications/acceptapplicant/${id}/${companyid}`,{headers: headers})
        .then(response => {
            window.location.reload();
            
        })
        .catch(error => {
            window.location.reload();
        })
    }


    render() {
        let ts = new Date();

        let { applicants } = this.state
        const applicantslist = applicants.map((applicant,index)=> 
                    <tr key={index}>
                        <td>01</td>
                        <td>
                            <a href=" " class="applied-text">{applicant.job_title}</a>
                        </td>
                        <td>{applicant.user_name}</td>
                        <td>{applicant.expected_salary}</td>
                        <td><p class="employer-view"><span><i class="fas fa-calendar-alt"></i> {ts.toDateString(applicant.createdAt)}</span></p>
                        </td>
                        <td><p><i class="fas fa-calendar-alt"></i> {ts.toDateString(applicant.deadline)}</p></td>
                        <td><Link to={`/userinfo/${applicant.user_id}`}  className="btn btn-primary btn-xs adminEdIcon"><i class="fas fa-eye"></i></Link></td>
                        <td> <button type="button" class="btn btn-primary btn-xs adminEdIcon"  onClick={()=>this.acceptApplicants(applicant._id , applicant.company_id)}><i class="fas fa-check-square"></i></button></td>

                    
                    </tr>
        );
        
        return (
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    <section class="commonAdminForms">
                    <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                        <div class="container-fluid">
                                {/* <header> 
                                    <h1 class="h3 display"></h1>
                                </header> */}
                                <div class="row">
                                    <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4>Pending applicants list for interview </h4>
                                        </div>
                                        <div class="card-body">
                                        <table class="table table-bordered online-applicant-table">
                                                <thead class="">
                                                    <tr>
                                                        <th>SI</th>
                                                        <th>Job Title</th>
                                                        <th>Applicants Name</th>
                                                        <th>Expected Salary</th>
                                                        <th>Applied On</th>
                                                        <th>Deadline</th>
                                                        <th>Action</th>
                                                        <th>Approve</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                {applicantslist}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                        </Page>
                    </section>
                    <Footer/>
                </div>
            </div>
            );
        }
    }
export default withRouter(Applicants);