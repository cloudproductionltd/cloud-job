import React, { Component } from 'react';
import Breadcumb from '../SuperAdminHome/Breadcumb';
import Sidebar from '../SuperAdminHome/Sidebar';
import Footer from '../SuperAdminHome/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html'

class DetailsOfDesapproveJob extends Component {

    intervalID;


    state = {
        job:'',
        modal:'',
        report:''
    }



    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount(){
        const { match: { params } } = this.props; 
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.get(`/jobs/admin/pending/${params.id}`,{headers:headers})
            .then(response => {
              console.log('pending job list ',response.data.response.job)
                this.setState({
                    job:  response.data.response.job
                })
            
            }).catch(error =>{
                console.log('error',error)
            }) 
    }

  
    disapproveModal = (e) =>  {
        this.setState({
            modal:'form'
        })
    }
        
    
    disapproveJob = (e) => {
        let { job , report} = this.state
        e.preventDefault();
        var headers = {
            
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/jobs/admin/pending/disapprove/${job._id}`,{ report: report },{headers:headers})
            .then(response => {
            
                this.setState({
                    modal:'report'
                })

            }).catch(error =>{
            })
    }




    approveJob = (e) =>  {
        let { job } = this.state
        e.preventDefault();
        var headers = {
            
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/jobs/admin/pending/approve/${job._id}`,{headers:headers})
            .then(response => {
            
                this.setState({
                    modal:'success'
                })

            }).catch(error =>{
            })
    }



    closeModal(){
        this.setState({
            modal:''
        })
        this.props.history.push('/admin-pending-jobs');
    }
    render() {
    
        let { job } = this.state
        let ts = new Date();
        return (
        
            <div>
                <Sidebar/>
                <div className="page commonAdminPage">
                    <Breadcumb/>
                    <section className="forms commonAdminForms">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                            <div className="col col-lg-10">
                                <div className="card">
                                
                                    <div className="view overlay">
                                    <div className="card-header">
                                        <h4>Job Details</h4>
                                        {/* <span className="EdWrapper"><button onClick = {this.approveJob} className="btn btn-primary btn-sm">Approve</button>
                                        </span>
                                        <span className="EdWrapper"><button onClick = {this.disapproveModal} className="btn btn-danger btn-sm">Disapprove</button>
                                        </span> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
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
                            </div>
                            </div>
                        </div>
                    </section>
                    <Footer/>
                </div>

                <Modal visible={ this.state.modal == 'success' ? true : false}>
                    <div className="card">
                        <div className="alert alert-success user-success-message">
							<strong>Job approve successfully!</strong>   
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
						</div>
                    </div>
                </Modal>

                <Modal visible={ this.state.modal == 'report' ? true : false}>
                    <div className="card">
                        <div className="alert alert-success user-success-message">
                            <strong>Job decline report successfull!</strong>  
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button> 
                        </div>
                    </div>
                </Modal>

                <Modal visible={ this.state.modal == 'form' ? true : false}>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={ this.disapproveJob }> 
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Sumit your report</label>
                                    <textarea rows="4" cols="50" name="report" form="usrform" onChange={this.handleInputChange}>
                                    </textarea>
                                </div> 
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="submit" className="btn btn-info"/></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
                </div>
            );
        }
    }
export default withRouter(DetailsOfDesapproveJob);