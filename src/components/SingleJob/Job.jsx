import React, { Component } from 'react';
import renderHTML from 'react-render-html'
import moment from 'moment';
import Modal from 'react-bootstrap4-modal';
import axios from 'axios';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
// import moment from 'react-moment';
import TimeAgo from 'react-timeago'
import EnglishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {  Link } from 'react-router-dom';

class Job extends Component {

    state = {
        visible :'',
        expected_salary :'',
        success_massage : 1,
        job:'',
        already_applied :'',
        company:'',
        show:''
    }

    
    componentDidMount(){
        const { match: { params } } = this.props; 
        let url = '/jobs'
        let headers = {}
        if( ! (window.sessionStorage.getItem('cool-jwt')  === null)){
            url = url+'/status'
            headers = {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('cool-jwt')
            }
        }

        axios.get(`${url}/${params.id}`,{headers: headers})
        .then(response => {
            console.log('response_page',response.data.response)
            this.setState({ 
                job : response.data.response.job,
                already_applied : response.data.response.applied,
                company : response.data.response.company,
            })
                            
        })
        .catch(error => {
            console.log('Error: ', error.response)
        })

        
    }

    applyJob= (e) => {
        e.preventDefault();
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }


        if (window.sessionStorage.getItem('cool-jwt')  === null){
            this.setState({
                show : "login"
            })
        }else{

            if((window.sessionStorage.getItem('allowForApply')  == 0 )){
                this.setState({
                    show : "ErrorApply"
                })
            }else{
                if( window.sessionStorage.getItem('adminVerificationForJobseeker') == 0 ){
                    this.setState({
                        show : "NotVerified"
                    })
                }else{
                    axios.post('/applications/apply-online',
                    {
                        job_id : this.state.job._id,
                        user_id : this.state.job.posted_by,
                        company_name : this.state.job.company_name,
                        job_title :  this.state.job.title,
                        deadline : this.state.job.deadline,
                        company_id: this.state.job.company_id,
                        user_name : window.sessionStorage.getItem('user_name')
                    },
                    {headers: headers}
                    ).then( res => {
                        if(res.status === 200 ){
                            this.setState({ success_massage : 2 })
                        }
                        window.location.reload();
                    }).catch(error => {
                        console.log('error: ', error.response)
                    });
                }
            }

        }


    }

    addSalary(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    openModal(modal) {
        this.setState({
            show : modal
        });
    }


    closeModal() {
        this.setState({
            show : false
        });
    }

    closeModalForFailToApplyJob(){
        this.setState({
            show : false
        });
        this.props.history.push('/profile-edit');
    }
    render() {
        const formatter = buildFormatter(EnglishStrings)

        let role = window.sessionStorage.getItem('user_role') ? window.sessionStorage.getItem('user_role') :''
        let apply_status = ''
        if( this.state.job.apply_online && (role !== 'recruiter' || role === 'seeker') && !this.state.already_applied){
            apply_status =   
            <div>
                <div className="apto">
                    
                </div>
                <div className="apply text-center">
                    <a  className="btn btn-success btn-rounded" type="button" onClick ={ this.applyJob}  >Apply Online</a>
                </div>
            </div>
        }

       

        var ts = new Date();
        return (
            <div>
            <Modal visible={ this.state.show ==='apply' ? true : false}  >
                <div className="card">
                    
                    <form onSubmit = {e => this.applyJob(e)} id="loginForm" action="" method="post">
                        <h5 className="card-header light-green login-card white-text text-center">
                            <a href="# " className="active" id="login-form-link">Please add your expected salary</a>
                            <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h5>
                        <div className="form-wrapper-login form-row applyOnlineModal">
                            <div className="col-md-12">
                            <div className="md-form">
                                <i className="fas fa-money-check-alt prefix"></i>
                                <input type="text" className="form-control" id="materialApplyExpectedSalary" name="expected_salary" onChange={e => this.addSalary(e)} />
                                <label htmlFor="materialApplyExpectedSalary" className="">salary</label>
                            </div>
                            <button onClick={() => this.closeModal()} className="btn btn-outline-success btn-rounded btn-block" type="submit">submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
                <Modal visible={ this.state.show ==='login' ? true : false}>

                    <div className="card">
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                                <div className="alert alert-success user-success-message">
                                <strong> please login first </strong>   
                                </div>
                    </div>
                </Modal>



                <Modal visible={ this.state.show ==='ErrorApply' ? true : false}>
                    <div className="card">
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModalForFailToApplyJob()}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                                <div className="alert alert-success user-success-message">
                                <strong>Please fill up your personal details , educational and other important information ! </strong>   
                                </div>
                    </div>
                </Modal>

                <Modal visible={ this.state.show =='NotVerified' ? true : false}>
                    <div className="card">
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModalForFailToApplyJob()}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                                <div className="alert alert-success user-success-message">
                                <strong>You can't apply for this job until your profile verified from admin </strong>   
                                </div>
                    </div>
                </Modal>

                <Navbar/>
                    <section className="single-jop-details">
                <div className="breadcrumb-wrapper">
                    <nav className="navbar navbar-expand-md navbar-dark indigo mb-4 top-breadcumb">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="float-left">
                                        <a className="white-text button-collapse" href="#!" data-activates="slide-out"><i className="fas fa-home"></i></a>
                                    </div>
                                    <div className="nav-breadcumb-wrap">
                                        <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb clearfix d-md-inline-flex pt-0">
                                            <li className="breadcrumb-item"><a className="white-text" href="#!">{this.state.job.category}</a></li>
                                            <li className="breadcrumb-item active">{this.state.job.sub_category}</li>
                                        </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                
                <div className="container main-section-wrapper">
                    <div className="row">
                        <div className="col-md-8 jobDetailsWrap">
                            <div className="jobDetails">
                                <div className="card-header">Job description</div>
                                <div className="card-body">
                                <h4 className="job-details-title font-weight-medium">{this.state.job.title}</h4>
                                {/* <div className="view-all-job-link"><a href="# " className="view-all-jobs pull-right"> <Link to={`/jobs/company/${this.state.job.company_id}/${this.state.job.slug}`}>View all jobs of this company </Link> </a></div> */}
                                <h5 className="company-name font-weight-medium"> <Link to={`/company-profile/${this.state.job.company_id}`}> {this.state.job.company_name} </Link></h5>
                                <table className="table job-detailsTable">
                                    <tbody>
                                        <tr className="firstOnetr">
                                            <td><span className="details-all-title">Vacancy</span></td>
                                            <td><span className="details-ptag">{this.state.job.vacancy}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="details-all-title"> Category</span></td>
                                            <td><span className="job-responssDesc">{ renderHTML(`${this.state.job.category}`) }</span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="details-all-title"> Type</span></td>
                                            <td><span className="details-ptag">{this.state.job.jobType}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="details-all-title"> Level</span></td>
                                            <td><span className="common-details-joblist">{ renderHTML(`${this.state.job.joblevel}`) }</span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="details-all-title"> Location</span></td>
                                            <td><span className="addReq">{ renderHTML(`${this.state.job.job_location}`) }</span></td>
                                        </tr>

                                        <tr>
                                            <td><span className="details-all-title"> Description</span></td>
                                            <td><span className="addReq">{ renderHTML(`${this.state.job.description}`) }</span></td>
                                        </tr>
                                        {/* <tr>
                                            <td><span className="details-all-title">Job Location</span></td>
                                            <td><span className="details-ptag">{job_location}</span></td>
                                        </tr> */}
                                        <h4 className="cm_title mb-6">Facility Related</h4>
                                        <tr>
                                            <td>
                                                <h5 className="details-all-title">Salary</h5>
                                                <span className="addReq">{this.state.job.salary} </span>
                                            </td>
                                            <td>
                                                <h5 className="details-all-title">Salary Negotiable</h5>
                                                <span className="addReq">{this.state.job.is_negotiable} </span>
                                            </td>
                                        </tr>
                                        

                                        <tr>
                                            <td>
                                            <h5 className="details-all-title">Working Hour</h5>
                                            <span className="addReq">{this.state.job.working_hour} </span>
                                            </td>

                                            <td>
                                            <h5 className="details-all-title">Holiday</h5>
                                            <span className="addReq">{this.state.job.holiday} </span>
                                            </td>

                                        </tr>
                                        
                                       
                                        
                                        <tr>
                                            <td>
                                                <h5 className="details-all-title">Home Rent allowance</h5>
                                                <span className="addReq">{this.state.job.home_rent_allowance} </span>
                                            </td>
                                            <td>
                                                <h5 className="details-all-title">Bonous</h5>
                                                <span className="addReq">{this.state.job.bonous} </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h5 className="details-all-title">Transfer Allowance</h5>
                                                <span className="addReq">{this.state.job.transfer_allowance} </span>
                                            </td>
                                            <td>
                                                <h5 className="details-all-title">Working Place/Location</h5>
                                                <span className="addReq">{this.state.job.working_place} </span>
                                            </td>
                                        </tr>


                                        <h4 className="cm_title mb-3">Requirement Related</h4>
                                    
                                        <tr>
                                            <td>
                                                <h5 className="details-all-title">Required age</h5>
                                                <span className="addReq">{this.state.job.required_age} </span>
                                            </td>
                                            <td>
                                                <h5 className="details-all-title">Visa sponsorshop</h5>
                                                <span className="addReq">{this.state.job.visa_sponsorshop =="Yes" ? "Yes":"No"} </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="details-all-title">Apply Online</h5>
                                                <span className="addReq">{this.state.job.required_age} </span>
                                            </td>
                                            <td>
                                                <h5 className="details-all-title">Language Requirment</h5>
                                                <span className="addReq">{this.state.job.language_requirment } </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            
                                            <td>
                                                <h5 className="details-all-title">Visa sponsorshop</h5>
                                                <span className="addReq">{this.state.job.apply_online=="Yes" ? "Yes":"No"}</span>
                                            </td>

                                            <td>
                                                <h5 className="details-all-title">Additional Requirment</h5>
                                                <span className="addReq">{ renderHTML(`${this.state.job.additional_requirment}`) } </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            
                                            <td>
                                                <h5 className="details-all-title">Required Experience</h5>
                                                <span className="addReq"> { renderHTML(`${this.state.job.experience}`) }</span>
                                            </td>

                                            <td >
                                                <h5 className="details-all-title">Education Requirement</h5>
                                                <span className="addReq">{ renderHTML(`${this.state.job.education}`) } </span>
                                            </td>
                                        </tr>

                                        <tr >
                                                <h5 className="details-all-title">Job/Skill Requirements</h5>
                                                <span className="addReq"> {this.state.job.skills}</span>
                                        </tr>
                                        <h4 className="cm_title mb-3">Company Related Information</h4>
                                        <tr >
                                              <td colspan="2">
                                                <h5 className="details-all-title">Company Description</h5>
                                                <span className="addReq"> {this.state.job.company_description}</span>
                                                </td>
                                        </tr>
                                        <tr >
                                             <td colspan="2">
                                                <h5 className="details-all-title">Company name</h5>
                                                <span className="addReq"> {this.state.job.company_name}</span>
                                                </td>
                                        </tr>
                                        <tr >
                                        <td >
                                                <h5 className="details-all-title">Company region</h5>
                                                <span className="addReq"> {this.state.company.region}</span>
                                                </td>
                                                <td >
                                                <h5 className="details-all-title"> Country</h5>
                                                <span className="addReq"> {this.state.company.country}</span>
                                                </td>
                                             
                                        </tr>
                                        <tr>
                                            <td >
                                                <h5 className="details-all-title">Company address</h5>
                                                <span className="addReq"> {this.state.company.address}</span>
                                                </td>
                                        </tr>
                                        
                                        <tr>
                                            <td >
                                                <h5 className="details-all-title">Company city</h5>
                                                <span className="addReq"> {this.state.company.city}</span>
                                                </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <h5 className="details-all-title">Company prefecture</h5>
                                                <span className="addReq"> {this.state.company.prefecture}</span>
                                                </td>
                                        </tr>
                                        
                                        <tr>
                                            <td >
                                                <h5 className="details-all-title">Company web Address</h5>
                                                <span className="addReq"> {this.state.company.prefecture}</span>
                                                </td>
                                        </tr>
                                        
                                        <tr >
                                             <td colspan="2">
                                                <h5 className="details-all-title">Company about</h5>
                                                <span className="addReq"> {this.state.company.about}</span>
                                                </td>
                                        </tr>
                                        <tr >
                                             <td >
                                                <h5 className="details-all-title">Company business licence no</h5>
                                                <span className="addReq"> {this.state.company.business_licence_no}</span>
                                                </td>
                                                <td >
                                                <h5 className="details-all-title">Company recruiter licence no</h5>
                                                <span className="addReq"> {this.state.company.recruiter_licence_no}</span>
                                                </td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="2">
                                            <h5 className="details-all-title">Company Details</h5>
                                                <span className="addReq"> { renderHTML(`${this.state.job.company_details}`) }</span>
                                            </td>
                                        </tr>

                                        <h4 >Contact person </h4>
                                        <tr>
                                            <td >
                                            <h5 className="details-all-title">Name</h5>
                                                <span className="addReq"> { this.state.company.first_name } { this.state.company.middle_name }  { this.state.company.last_name } </span>
                                            </td>
                                            <td >
                                            <h5 className="details-all-title">Contact email</h5>
                                                <span className="addReq"> { this.state.company.contact_email } </span>
                                            </td>
                                            
                                            <td >
                                            <h5 className="details-all-title">Company designaton</h5>
                                                <span className="addReq"> { this.state.company.company_designaton } </span>
                                            </td>
                                            <td>
                                            <h5 className="details-all-title">phone</h5>
                                                <span className="addReq"> { this.state.company.phone } </span>
                                            </td>
                                        </tr>
                                        <h4 >Contact person 2 </h4>
                                        <tr>
                                            <td >
                                            <h5 className="details-all-title">Name</h5>
                                                <span className="addReq"> { this.state.company.first_name2 } { this.state.company.middle_name2 }  { this.state.company.last_name2 } </span>
                                            </td>
                                            <td >
                                            <h5 className="details-all-title">Contact email</h5>
                                                <span className="addReq"> { this.state.company.contact_email2 } </span>
                                            </td>
                                            
                                            <td >
                                            <h5 className="details-all-title">Company designaton</h5>
                                                <span className="addReq"> { this.state.company.company_designaton2 } </span>
                                            </td>
                                            <td>
                                            <h5 className="details-all-title">phone</h5>
                                                <span className="addReq"> { this.state.company.phone2 } </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            </div>
                        </div>
                        
                        
                        <div className="col-md-4">
                        <div className="card top-card">
                                <div className="card-header success-color white-text">
                                    Job Summary
                                </div>
                                <div className="card-body job-summary-card-body">
                                    <p className="job-summary-hints">
                                        <strong>Published on:</strong>&nbsp;  { new Date(this.state.job.createdAt).toLocaleDateString() }
                                    </p>
                                    <p className="job-summary-hints">
                                        <strong>Vacancy:</strong>&nbsp;
                                        {this.state.job.vacancy}
                                    </p>
                                   
                                    <p className="job-summary-hints">
                                        <strong>Experience:</strong>&nbsp;   {this.state.job.experience} 
                                    </p>
                                    <p className="job-summary-hints">
                                        <strong>Job Location:</strong>&nbsp;{this.state.job.job_location} 
                                    </p>   
                                    <p className="job-summary-hints">
                                        <strong>Salary:</strong>&nbsp; {this.state.job.salary}
                                    </p>
                                    <p className="job-summary-hints">
                                        <strong>Application Deadline:</strong>&nbsp;    { new Date(this.state.job.deadline).toLocaleDateString() }
                                    </p>
                                </div>
                                <div className="card-footer">
                                <p className="mb-0 job-summary-hints"><TimeAgo date={this.state.job.updatedAt} formatter={formatter} /> </p>
                                </div>
                            </div>

                            
                            <div className="card top-card">
                                <div className="card-header success-color white-text">
                                    Application procedure
                                </div>
                                <div className="card-body">
                                <div className="guide">
                                <div className="apply-online-wrapper">
                                    <div className="rba">
                                        <div className="s-sug-txt">
                                            <div className="instruction-details">Send your CV to <span className="mail-ad-txt"> Please input email</span> <br/>Please apply with detailed CV in PDF format
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="pho-txt">
                                        <h4>
                                            <span className="photograph-red">*Photograph</span> must be enclosed with the resume. 
                                        </h4>	 	                                 
                                    </div>
                                    {apply_status}
                                </div>
                                <div className="gra-padded gra-bordered gra-centered"></div>
                                <div className="apply-by-email text-center">
                                    <h4 className="font-weight-medium">Prohibition</h4>

                                    <p align="justify">It is strictly prohibited to send your resume directly to the company. If you send your resume by yourself then you will be get rejected. </p>


                                    {/* <div className="or">
                                        Send your CV to <strong> {this.state.company.email} </strong> or to Email CV from <strong>MY CLOUDJOBS</strong> account <a href="# ">Click here</a>.
                                    </div>
                                    <div>
                                        <span className="date">
                                            Application Deadline : <strong> { ts.toDateString(this.state.job.deadline) }</strong>
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                            </div>
                            </div>
                            
                            <div className="card card-body top-card btTopCard">
                                <div className="panel-body">
                                    <div className="list-group bottom-card-inner list-inline">
                                    <ul className="list-inline tooltip-listWrap">
                                        <li className="list-inline-item"><Link to='/' className="firstItemAnchor" data-toggle="tooltip" data-placement="bottom" title="Shortlist job"><i className="fa fa-star"></i></Link></li>
                                        <li className="list-inline-item"><a href="#!" data-toggle="tooltip" data-placement="bottom" title="Share by email"><i className="fa fa-envelope"></i></a></li>
                                        <li className="list-inline-item"><a href="#!" data-toggle="tooltip" data-placement="bottom" title="Print this job"><i className="fa fa-print"></i></a>  </li>
                                        <li className="list-inline-item"><a href="#!" data-toggle="tooltip" data-placement="bottom" title="View all jobs"><i className="fa fa-file"></i></a></li>
                                        <li className="list-inline-item"><a href="#!" data-toggle="tooltip" data-placement="bottom" title="Report this job"><i className="fa fa-flag"></i></a></li>
                                    </ul>
                                    <ul className="list-inline social-link-bottom">
                                            <li className="list-inline-item"><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
                                            <li className="list-inline-item"><a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a></li>
                                            <li className="list-inline-item"><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
                                            <li className="list-inline-item"><a href="https://pinterest.com"><i className="fab fa-pinterest-p"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                        <div className="col-sm-12">
                            <div className="feature-border shadow-sm similarWraper">
                            <div className="card-header success-color white-text">
                                   Similar Jobs
                                </div>
                                <ul id="similarJobUl" className="wrapOfJob similarJobLogo">
                                    <li className="col-lg-6 col-md-12 col-sm-6 col-12">
                                        <img src="../../assets/images/logo2.jpg" alt="" />
                                    </li>
                                    <li className="col-lg-6 col-md-12 col-sm-6 col-12">
                                        <img src="../../assets/images/logo2.jpg" alt="" />
                                    </li>
                                    <div className="gra-padded gra-bordered gra-centered"></div>
                                    <div className="apply text-center brw"><a className="btn btn-success btn-rounded" href="/errror/page" type="button">Browse All</a></div>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
          
                        </div>
                    </div>
                    {/* <div className="row apply-procedure common-section text-center">
                        <div className="col-md-12">
                            
                        </div>
                    </div> */}

                   
                   



                </div></section>
                <Footer/>
            </div>
            
        );
    }
}
export default Job;