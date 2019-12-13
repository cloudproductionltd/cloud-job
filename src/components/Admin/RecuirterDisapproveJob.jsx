import React, { Component } from 'react';
import Axios from 'axios';
import Breadcumb from './Home/Breadcumb';
import Sidebar from './Home/Sidebar';
import Footer from './Home/Footer';
import Page from 'react-page-loading';
import { withRouter } from 'react-router-dom';
import renderHTML from 'react-render-html'
import Modal from 'react-bootstrap4-modal';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class RecuirterDisapproveJob extends Component {

    state = {
      pending_job:''
    }


    componentDidMount ()  {
      const { match: { params } } = this.props; 
      let job_id = params.id;
      let headers = {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('cool-jwt')
      }
      Axios.get(`/jobs/company/pending/disapprove/${job_id}`,{headers:headers})
            .then(response => {
                this.setState({ 
                      pending_job : response.data.response.PendingJob,
                    })
            })
    }

    openModal(){
      this.props.history.push('/');
    }

    render() { 
      let { pending_job } = this.state
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
                                <div className="card dis_container">
                                <div class="alert alert-danger" role="alert">
                                      { renderHTML(`${pending_job.report}`) }
                                    </div>
                                    <div className="card-header d-flex align-items-center">
                                        <h4 className="reject_title">Disapprove job</h4>
                                        
                                        <span className="float-right"><Link className="btn btn-primary btn-xs adminEdIcon float-right" to={ `/recruiter/disapprovejobs/update/${pending_job._id}`}><i className="fas fa-pencil-alt" ></i> </Link></span>
                                    </div>
                                  <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                          <h4 className="cm_title mb-3">Job Related</h4>
                                          <table className="table table-striped companyProfileView dis_container">
                                            <tbody>
                                              <tr>
                                                  <td>
                                                    <p><b>Job Title:</b></p>
                                                    <p>{pending_job.title}</p>
                                                  </td>
                                                  <td>
                                                    <p><b>Job Category:</b></p>
                                                    <p>{pending_job.category}</p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                    <p><b>Job Type:</b></p>
                                                    <p>{pending_job.jobType}</p>
                                                    
                                                  </td>
                                                  <td>
                                                    <p><b>Job Level:</b></p>
                                                    <p>{pending_job.joblevel}</p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                    <p><b>Vacancy:</b></p>
                                                    <p>{pending_job.vacancy}</p>
                                                  </td>
                                                  <td>
                                                    <p><b>Job Sub Category:</b></p>
                                                    <p>{pending_job.sub_category}</p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <p><b>Job Location:</b></p>
                                                  <p>{pending_job.job_location }</p>
                                                </td>
                                                <td>
                                                  <p><b>Deadline:</b></p>
                                                  <p>{ new Date(pending_job.deadline).toLocaleDateString() }</p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td colspan="2">
                                                  <p><b> Job Description</b></p>
                                                  <p> { renderHTML(`${pending_job.description}`) } </p>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div className="col-md-12">
                                        <h4 className="cm_title mb-3">Facility Related</h4>
                                        <table className="table table-striped companyProfileView">   
                                          <tbody>
                                            <tr>
                                              <td>
                                                <p><b>Salary:</b></p>
                                                <p>{pending_job.salary}</p>
                                              </td>
                                              <td>
                                                  <p><b>Salary Negotiable:</b></p>
                                                  <p>{pending_job.is_negotiable =="Yes" ? "Yes":"No"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <p><b>Working Hour:</b></p>
                                                <p>{pending_job.working_hour }</p>
                                              </td>
                                              <td>
                                                <p><b>Holiday:</b></p>
                                                <p>{pending_job.holiday }</p>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <p><b>Home Rent Allowance:</b></p>
                                                <p>{pending_job.home_rent_allowance }</p>
                                              </td>
                                              <td>
                                                <p><b>Treatement Allowance:</b></p>
                                                <p>{pending_job.medical_allowance }</p>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <p><b>Bonous:</b></p>
                                                <p>{pending_job.bonous }</p>
                                              </td>
                                              <td>
                                                <p><b>Transfer Allowance:</b></p>
                                                <p>{pending_job.transfer_allowance }</p>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colspan="2">
                                                <p><b>Working Place/Location:</b></p>
                                                <p>{pending_job.working_place}</p>
                                              </td>
                                            </tr>
                                          </tbody>
                                          </table>
                                        </div>
                                      </div>
                                      <div className="row">
                                      <div className="col-md-12">
                                      <h4 className="cm_title mb-3">Requirement Related</h4>
                                          <table className="table table-striped companyProfileView">
                                        <tbody>
                                          <tr>
                                              <td>
                                                <p><b>Required Age:</b></p>
                                                <p>{pending_job.required_age}</p>
                                              </td>
                                              <td>
                                                <p><b>Visa Sponsorshop:</b></p>
                                                <p>{pending_job.visa_sponsorshop =="Yes" ? "Yes":"No"}</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td>
                                                <p><b>Apply Online:</b></p>
                                                <p>{pending_job.apply_online=="Yes" ? "Yes":"No"}</p>
                                              </td>
                                              <td>
                                                <p><b>Language Requirments:</b></p>
                                                <p>{pending_job.language_requirment }</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td className="">
                                                <p><b>Additional Requirments:</b></p>
                                                <p> { renderHTML(`${pending_job.additional_requirment}`) } </p>
                                              </td>
                                              <td>
                                                <p><b>Required Experience:</b></p>
                                                <p> { renderHTML(`${pending_job.experience}`) } </p>
                                              </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <p><b>Education Requirements:</b></p>
                                              <p>{ renderHTML(`${pending_job.education}`) }</p>
                                            </td>
                                            <td>
                                              <p><b>Job/Skill Requirements:</b></p>
                                              <p>{pending_job.skills}</p>
                                            </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                        </div>
                                      <div className="col-md-12">
                                      
                                    <h4 className="cm_title mb-3">Company Related</h4>
                                          <table className="table table-striped companyProfileView">   
                                            <tbody>
                                              <tr>
                                                  <td>
                                                    <p><b>Company Description:</b></p>
                                                    <p>{pending_job.company_description}</p>
                                                  </td>
                                                  <td>
                                                    <p><b>Company Name:</b></p>
                                                    <p>{pending_job.company_name}</p>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td colspan="2">
                                                    <p><b> Company Details:</b></p>
                                                    <p> { renderHTML(`${pending_job.company_details}`) } </p>
                                                  </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        
                                      </div>
                                    </div>
                                    
                                    {/* <table className="table table-bordered companyProfileView">
                                    <tbody>
                                      <tr>
                                          <td>
                                            <p><b>Title</b></p>
                                            <p>{pending_job.title}</p>
                                          </td>
                                          <td>
                                            <p><b>Job Category</b></p>
                                            <p>{pending_job.category}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Company name</b></p>
                                            <p>{pending_job.company_name}</p>
                                          </td>
                                          <td>
                                            <p><b>Job level</b></p>
                                            <p>{pending_job.joblevel}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                      <td>
                                            <p><b>Job Type</b></p>
                                            <p>{pending_job.jobType}</p>
                                          </td>
                                          <td>
                                            <p><b>Salary</b></p>
                                            <p>{pending_job.salary}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Company description</b></p>
                                            <p>{pending_job.company_description}</p>
                                          </td>
                                          <td>
                                            <p><b>Skills</b></p>
                                            <p>{pending_job.skills}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Vacancy</b></p>
                                            <p>{pending_job.vacancy}</p>
                                          </td>
                                          <td>
                                            <p><b>Job Sub Category</b></p>
                                            <p>{pending_job.sub_category}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Required age</b></p>
                                            <p>{pending_job.required_age}</p>
                                          </td>
                                          <td>
                                            <p><b>Visa sponsorshop</b></p>
                                            <p>{pending_job.visa_sponsorshop =="Yes" ? "Yes":"No"}</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Apply Online</b></p>
                                            <p>{pending_job.apply_online=="Yes" ? "Yes":"No"}</p>
                                          </td>
                                          <td>
                                            <p><b>language Requirment</b></p>
                                            <p>{pending_job.language_requirment }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Salary negotiable</b></p>
                                            <p>{pending_job.is_negotiable =="Yes" ? "Yes":"No"}</p>
                                          </td>
                                          <td>
                                            <p><b>Transfer allowance</b></p>
                                            <p>{pending_job.transfer_allowance }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Home rent allowance</b></p>
                                            <p>{pending_job.home_rent_allowance }</p>
                                          </td>
                                          <td>
                                            <p><b>Medical allowance</b></p>
                                            <p>{pending_job.medical_allowance }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>    Bonous</b></p>
                                            <p>{pending_job.bonous }</p>
                                          </td>
                                          <td>
                                            <p><b>Job location</b></p>
                                            <p>{pending_job.job_location }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <p><b>Working hour</b></p>
                                            <p>{pending_job.working_hour }</p>
                                          </td>
                                          <td>
                                            <p><b>Holiday</b></p>
                                            <p>{pending_job.holiday }</p>
                                          </td>
                                      </tr>
                                      
                                      <tr>
                                          <td>
                                            <p><b>Working Place</b></p>
                                            <p>{pending_job.working_place}</p>
                                          </td>
                                          <td>
                                            <p><b>Deadline</b></p>
                                            
                                            <p>{ new Date(pending_job.deadline).toLocaleDateString() }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b> Job Description</b></p>
                                          </td>
                                          <td>
                                          
                                            <p> { renderHTML(`${pending_job.description}`) } </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b>education</b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${pending_job.education}`) } </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b>Additional Requirment</b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${pending_job.additional_requirment}`) } </p>
                                          </td>
                                      </tr>

                                      
                                      <tr>
                                          <td className="viewAbout">
                                            <p><b> Required Experience</b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${pending_job.experience}`) } </p>
                                          </td>
                                      </tr>

                                      <tr>
                                          <td className="viewAbout">
                                            <p><b> Company Details </b></p>
                                          </td>
                                          <td>
                                            <p> { renderHTML(`${pending_job.company_details}`) } </p>
                                          </td>
                                      </tr>
                                    </tbody>
                                </table> */}
                                  
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
        )
    }
}
export default withRouter(RecuirterDisapproveJob)
