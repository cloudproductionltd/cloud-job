import React, { Component } from 'react';
import Breadcumb from './Home/Breadcumb';
import Sidebar from './Home/Sidebar';
import Footer from './Home/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link,NavLink } from 'react-router-dom';
import Page from 'react-page-loading';

class SelectedApplicants extends Component {


    state={
        applicants:[]
    }
    componentDidMount(){

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/applications/applicantlist/interview`,{headers: headers})
            .then(response => {
                console.log('ressssss',response.data.response.application)
                this.setState({ applicants:response.data.response.application })
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
    }

    render() {
        let ts = new Date();

        let { applicants } = this.state
        const applicantslist = applicants.map((applicant,index)=> 
                    <tr key={index}>
                        <td>01</td>
                        <td>
                            <a href=" " className="applied-text">{applicant.job_title}</a>
                        </td>
                        <td>{applicant.user_name}</td>
                        <td>{applicant.expected_salary}</td>
                        <td><p className="employer-view"><span><i className="fas fa-calendar-alt"></i> {ts.toDateString(applicant.createdAt)}</span></p>
                        </td>
                        <td><p><i className="fas fa-calendar-alt"></i> {ts.toDateString(applicant.deadline)}</p></td>
                        <td><Link to={`/userinfo/${applicant.user_id}`}  className="btn btn-primary btn-xs adminEdIcon" href="/profile"><i className="fas fa-eye"></i></Link></td>
                    
                    </tr>
        );
        
        return (
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>

                    <section className="commonAdminForms">
                    <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                        <div className="container-fluid">
                                {/* <header> 
                                    <h1 className="h3 display"></h1>
                                </header> */}
                                <div className="row">
                                    <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Selected applicants list</h4>
                                        </div>
                                        <div className="card-body">
                                        <table className="table table-bordered online-applicant-table">
                                                <thead className="">
                                                    <tr>
                                                        <th>SI</th>
                                                        <th>Job Title</th>
                                                        <th>Applicants Name</th>
                                                        <th>Expected Salary</th>
                                                        <th>Applied On</th>
                                                        <th>Deadline</th>
                                                        <th>Action</th>
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
export default withRouter(SelectedApplicants);