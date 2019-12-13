import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink} from 'react-router-dom';
import help from './Footer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Applicantlist from '../Applicants';
import fotter from '../header'
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcumb from './Breadcumb';
import SelectedApplicants from '../SelectedApplicants'
import Applicants from '../ApplicantslistByJob'


import Page from 'react-page-loading';

class RecruiterTabbarForlistApplicants extends Component {


    state={
        applicants:[]
    }
    componentDidMount(){

        const { match: { params } } = this.props; 

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/applications/company/applicantlist/${params.id}`,{headers: headers})
            .then(response => {
                this.setState({ applicants:response.data.response.users })
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
    }
   

    render() {
        let { data } = this.state
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

                    <Router>
                        <div >
                            <div className='row'>
                            <div style={{marginTop: '25px', marginLeft: '50px'}}>
                                <nav className="nav">
                                    <a className="nav-link active" ><Link to='/applicants'>All applicants list </Link></a>
                                    <a className="nav-link " ><Link to="/selected-applicants/${data}">All applicants list </Link></a>
                                </nav>
                            </div>
                            </div>
                            <hr />

                            <div className ='row'>
                            <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                                <div className="container-fluid">
                                        {/* <header> 
                                            <h1 className="h3 display"></h1>
                                        </header> */}
                                        <div className="row">
                                            <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4> applicants list</h4>
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
                            </div>                         
                        </div>
                    </Router>

                    <Footer/>
                </div>
                </div>
            );



            
        }
}

export default  withRouter(RecruiterTabbarForlistApplicants);