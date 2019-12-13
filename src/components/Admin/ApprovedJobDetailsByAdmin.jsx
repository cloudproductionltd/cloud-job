import React, { Component } from 'react';
import Axios from 'axios';
import Breadcumb from './Home/Breadcumb';
import Sidebar from '../Admin/SuperAdminHome/Sidebar';
import Footer from './Home/Footer';
import Page from 'react-page-loading';
import { withRouter } from 'react-router-dom';
import renderHTML from 'react-render-html'
import Modal from 'react-bootstrap4-modal';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ApprovedJobDetailsByAdmin extends Component {

    state = {
      job:''
    }


    componentDidMount ()  {
      const { match: { params } } = this.props; 
      let job_id = params.id;
      let headers = {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('cool-jwt')
      }
      Axios.get(`/jobs/admin/${job_id}`,{headers:headers})  
            .then(response => {
               console.log('approve job details',response.data.response.job)
                this.setState({ 
                      job : response.data.response.job,
                    })
            })
            
    }

    openModal(){
      this.props.history.push('/');
    }

    render() { 
      let { job } = this.state
        return (
          <div>
            <Sidebar/>
            <div className="page">
                <Breadcumb/>
                <section className="forms commonAdminForms commonAdminPage">
                <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                    <div className="container-fluid">
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-10">
                                
                                <div className="card">
                                    <div className="card-header d-flex align-items-center">
                                        <h4> Job  details</h4>
                                      
                                    </div>
                                  
                                    <div className="card-body">
                                    <table className="table table-bordered companyProfileView">
                                    <tbody>
                                      <tr>
                                          <td>
                                            <p><b>Title:</b></p>
                                            <p>{job.title}</p>
                                          </td>
                                          <td>
                                            <p><b>Job Category:</b></p>
                                            <p>{job.category}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Company name</b></p>
                                            <p>{job.company_name}</p>
                                          </td>
                                          <td>
                                            <p><b>Job level</b></p>
                                            <p>{job.joblevel}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                      <td>
                                            <p><b>Job Type</b></p>
                                            <p>{job.jobType}</p>
                                          </td>
                                          <td>
                                            <p><b>Salary</b></p>
                                            <p>{job.salary}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Company description</b></p>
                                            <p>{job.company_description}</p>
                                          </td>
                                          <td>
                                            <p><b>Skills</b></p>
                                            <p>{job.skills}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Vacancy</b></p>
                                            <p>{job.vacancy}</p>
                                          </td>
                                          <td>
                                            <p><b>Job Sub Category</b></p>
                                            <p>{job.sub_category}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Required age</b></p>
                                            <p>{job.required_age}</p>
                                          </td>
                                          <td>
                                            <p><b>Visa sponsorshop</b></p>
                                            <p>{job.visa_sponsorshop =="Yes" ? "Yes":"No"}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Apply Online</b></p>
                                            <p>{job.apply_online=="Yes" ? "Yes":"No"}</p>
                                          </td>
                                          <td>
                                            <p><b>language Requirment</b></p>
                                            <p>{job.language_requirment }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Salary negotiable</b></p>
                                            <p>{job.is_negotiable =="Yes" ? "Yes":"No"}</p>
                                          </td>
                                          <td>
                                            <p><b>Transfer allowance</b></p>
                                            <p>{job.transfer_allowance }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Home rent allowance</b></p>
                                            <p>{job.home_rent_allowance }</p>
                                          </td>
                                          <td>
                                            <p><b>Medical allowance</b></p>
                                            <p>{job.medical_allowance }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>    Bonous</b></p>
                                            <p>{job.bonous }</p>
                                          </td>
                                          <td>
                                            <p><b>Job location</b></p>
                                            <p>{job.job_location }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Working hour</b></p>
                                            <p>{job.working_hour }</p>
                                          </td>
                                          <td>
                                            <p><b>Holiday</b></p>
                                            <p>{job.holiday }</p>
                                          </td>
                                      </tr>
                                      
                                      <tr>
                                          <td>
                                            <p><b>Working Place</b></p>
                                            <p>{job.working_place}</p>
                                          </td>
                                          <td>
                                            <p><b>Deadline</b></p>
                                            
                                            <p>{ new Date(job.deadline).toLocaleDateString() }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b> Job Description</b></p>
                                          </td>
                                          <td>
                                          
                                            <p> { renderHTML(`${job.description}`) } </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b>education</b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${job.education}`) } </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b>Additional Requirment</b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${job.additional_requirment}`) } </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b> Required Experience</b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${job.experience}`) } </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b> Company Details </b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${job.company_details}`) } </p>
                                          </td>
                                      </tr>
                                    </tbody>
                                </table>
                               
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        
                    </div>   
                        </Page>
                </section>
                
                <Footer/>
            </div>
            
        </div>
        )
    }
}
export default withRouter(ApprovedJobDetailsByAdmin)
