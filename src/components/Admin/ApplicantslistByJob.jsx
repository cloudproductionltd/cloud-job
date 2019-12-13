import React, { Component } from 'react';
import Breadcumb from './Home/Breadcumb';
import Sidebar from './Home/Sidebar';
import Footer from './Home/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link,NavLink } from 'react-router-dom';
import Page from 'react-page-loading';
import renderHTML from 'react-render-html'

class ApplicantslistByJob extends Component {

    

    constructor(props) {
        
        super(props)
        this.state = {
        
            applicants:[],
            accepted : '' ,
            navlink : 'pending',
            massagebox:false,
            disapproveMassage:'',
            showCv : '',

            job_info :'',
            user_info : '' ,
            user_info_employeements: [],
            user_info_educations:[],
            user_info_carrer:'',
            user_info_training : [],
            preference:'',

            disapproveId:'',
            disapproveJobId:'',
            disapproveCompanyId:''
        }

        this.handleClickforPending = this.handleClickforPending.bind(this);
        this.handleClickforAccepted = this.handleClickforAccepted.bind(this);
        this.DissapproveMassageBox = this.DissapproveMassageBox.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.SubmitDisapproveMassage = this.SubmitDisapproveMassage.bind(this);
        this.closeCompareCvModal = this.closeCompareCvModal.bind(this);
    }


    componentDidMount(){

        const { match: { params } } = this.props; 
        
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/applications/company/applicantlist/${params.id}`,{headers: headers})
            .then(response => {
                    console.log('componentDidMount',response.data.response)

                    this.setState(previousState => {
                        return {
                            applicants:response.data.response.users ,
                            navlink: 'pending'
                        };
                    });
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
    }


    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    SubmitDisapproveMassage = (event)=> {

        event.preventDefault()
        this.setState({
            disapproveMassage : event.target.value
        });
    
        let { disapproveId, disapproveJobId , disapproveCompanyId , disapproveMassage } = this.state
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/applications/disapprove/applicant/${disapproveId}/${disapproveJobId}/${disapproveCompanyId}`, {disapproveMassage:disapproveMassage} ,{headers: headers})
        .then( res => {
            this.setState({
                massagebox : false
            })
            window.location.reload();
        });
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

    disapproveApplicants = (event, id, job_id, companyid ) => {
        
        this.setState(previousState => {
            return {
                massagebox: true
            };
        });

        event.preventDefault();

        const { massage }  = this.state
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/applications/disapprove/applicant/${id}/${job_id}/${companyid}`, massage , {headers: headers})
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            window.location.reload();
        })
    }





    compareCv( id,user_id) { 


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.get(`/applications/applicantlist/compare/cv/${id}/${user_id}`,{headers: headers})
        .then(response => {
            
            this.setState(previousState => {

                console.log('uydfgudgbduyb',response.data.response.user)
                return {
                    job_info : response.data.response.jobinfo ,
                    user_info : response.data.response.user,
                    user_info_employeements : response.data.response.user.employments,
                    
                    user_info_educations : response.data.response.user.educations,
                    user_info_carrer : response.data.response.user.careear,
                    user_info_training : response.data.response.user.trainings,
                    preference:response.data.response.user.preference
                };
            });
        })
        .catch(error => {
            
        })


        this.setState(previousState => {
            return {
                showCv: 'yes',
            };
        });
    }

    DissapproveMassageBox( id ,job_id, company_id ){
        this.setState(previousState => {
            return {
                massagebox: !previousState.massagebox,
                disapproveId:id,
                disapproveJobId : job_id ,
                disapproveCompanyId : company_id
            };
    
        });


    }

    
    handleClickforPending() {
            this.setState({
                navlink : 'pending',
            })
    }

    handleClickforAccepted (){
        this.setState({
            navlink : 'accepted',
        })
    }

    handleClickforDisapprove (){
        this.setState({
            navlink : 'disapprove',
        })
    }
    closeCompareCvModal () { 
        this.setState({
            showCv : ''
        })
    }
    render() {
        let ts = new Date();

        let { applicants , accepted , navlink , job_info, user_info, user_info_employeements, user_info_educations, user_info_carrer, user_info_training} = this.state

    
        
        const trainingStatus = user_info_training.map((training,index)=> 
            <div>
                <tr>
                    <td> <b>Title  </b>  {training.title}</td>
                    <br/>
                </tr>
                <tr>    
                    <td> <b> Institute  </b>{training.institute}</td>
                    <br/>
                    <td> <b>Topic  </b> {training.topic}</td>
                    <br/>
                </tr>    
                <tr>
                    <td> <b>location  </b>  {training.location}</td>
                    <br/>
                    <td> <b>Year  </b> {training.year}</td>
                    <br/>
                    <td> <b>Duration  </b> {training.duration}</td>
                </tr> 
            </div>
        );


        const educationStatus = user_info_educations.map((education,index)=> 
            <div>
                <tr>
                    <td> <b>Degree:</b>{education.degree}</td>
                    <br/>
                </tr>
                <tr>    
                    <td><b> Institute : </b>{education.institute}</td>
                    <br/>
                    <td><b> Duration : </b>{education.duration}</td>
                    <br/>
                </tr>    
                <tr>
                    <td>{education.major}</td>
                    <br/>
                    <td>{education.year}</td>
                </tr> 
            </div>
        );

        const employeementStatus = user_info_employeements.map((employeement,index)=> 
            <div>
                <tr>
                    <td> <b>Company name</b> :{employeement.name}</td>
                    <br/>

                    <td> <b> Company type :</b> {employeement.type}</td>
                    <br/>
                </tr>   

                <tr>  
                    <td> <b> Designation :</b> {employeement.designation}</td>
                    <br/>
                    <td> <b> Depertment:</b> {employeement.depertment}</td>
                </tr>

                <tr> 
                    <td> <b>Responsibilities :</b>{employeement.responsibilities}</td>
                    <br/>
                    <td> <b>Currently_working : </b>{employeement.currently_working == true ? 'yes':'no'}</td>
                </tr>
                <br/>
                </div> 
                
        );
        
        const pendingApplicantslist = applicants.map((applicant,index)=> 

                                    <tr  style={{ visibility: (applicant.call == 0 && (applicant.disapproveStatus == null || applicant.disapproveStatus == 0)) ?'':'collapse'}}>
                                
                                        <td>
                                            <a href=" " class="applied-text">{applicant.job_title}</a>
                                        </td>
                                    
                                        {/* <td><p class="employer-view"><span><i class="fas fa-calendar-alt"></i> {ts.toDateString(applicant.createdAt)}</span></p></td> */}
                                        {/* <td><p><i class="fas fa-calendar-alt"></i> {ts.toDateString(applicant.deadline)}</p></td> */}
                                        <td> <button type="button" class="btn btn-primary btn-xs adminEdIcon"  onClick={()=>this.compareCv(applicant.job_id , applicant.user_id)}><i class="fas fa-arrows-alt"></i></button></td> 
                                        <td><Link to={`/userinfo/${applicant.user_id}`}  className="btn btn-primary btn-xs adminEdIcon" href="/profile"><i class="fas fa-eye"></i></Link></td>
                                        <td> <button type="button" class="btn btn-primary btn-xs adminEdIcon"  onClick={()=>this.acceptApplicants(applicant._id , applicant.company_id)}><i class="fas fa-check-square"></i></button></td> 
                                    
                                        <td> <button type="button" class="btn btn-primary btn-xs adminEdIcon"  onClick={()=>this.DissapproveMassageBox(applicant._id , applicant.job_id, applicant.company_id)}><i class="far fa-thumbs-down red"></i></button></td> 
                                    
                                    </tr> 
        );

        const acceptedApplicantslist = applicants.map((applicant,index)=> 

                                    <tr style={{ visibility: applicant.call === 1  ?'':'collapse'}}>
                                
                                        <td>
                                            <a href=" " class="applied-text">{applicant.job_title}</a>
                                        </td>
                                    
                                        <td> <button type="button" class="btn btn-primary btn-xs adminEdIcon"  onClick={()=>this.compareCv(applicant.job_id ,  applicant.user_id)}><i class="fas fa-arrows-alt"></i></button></td> 
                                    
                                        <td><Link to={`/userinfo/${applicant.user_id}`}  className="btn btn-primary btn-xs adminEdIcon" href="/profile"><i class="fas fa-eye"></i></Link></td>
                                    
                                    </tr> 
        );


        const disapproveApplicantslist = applicants.map((applicant,index)=> 

                                    <tr style={{ visibility: (applicant.disapproveStatus == 1 && applicant.call == 0)?'':'collapse'}}>
                                    
                                        <td>
                                            <a href=" " class="applied-text">{applicant.job_title}</a>
                                        </td>
                                
                                        <td> <button type="button" class="btn btn-primary btn-xs adminEdIcon"  onClick={()=>this.compareCv(applicant.job_id ,  applicant.user_id)}><i class="fas fa-arrows-alt"></i></button></td> 
                                    
                                        <td><Link to={`/userinfo/${applicant.user_id}`}  className="btn btn-primary btn-xs adminEdIcon" href="/profile"><i class="fas fa-eye"></i></Link></td>
                                    
                                    </tr> 
        );


       
        return (
        
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    <div style={{paddingTop:'39px', paddingLeft: '50px'}}> 
                        <nav class="nav nav-pills nav-justified custom_navWrap">
                            <a class={ navlink == 'pending' ?  "nav-link active" : "nav-link btn-outline-primary"} onClick={this.handleClickforPending.bind(this)}>Pending Table </a>  
                            <a class={ navlink == 'accepted' ?  "nav-link active" : "nav-link btn-outline-primary"}  onClick={this.handleClickforAccepted.bind(this)}>Accepted User Table</a>
                            <a class={ navlink == 'disapprove' ?  "nav-link active" : "nav-link btn-outline-primary "}  onClick={this.handleClickforDisapprove.bind(this)}>Disapprove User Table</a>
                        </nav>
                    </div>
                    <section class="commonAdminForms">
                        <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="card">
                                            <div class="card-header">
                                                <h4> applicants list</h4>
                                            </div>
                                            <div class="card-body">
                                                <table class="table table-bordered table-responsive online-applicant-table">
                                                    <thead class="">
                                                        <tr>
                                                            <th>Job Title</th>
                                                          
                                                            {/* <th>Applied On</th>
                                                            <th>Deadline</th> */}
                                                            <th>Compare Cv</th>
                                                            <th>View Details</th>
                                                            { navlink == 'pending' ? <th> Approve </th> :'' }
                                                            { navlink == 'pending' ? <th> Disapprove </th> :'' }
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                    { navlink == 'pending' ? pendingApplicantslist : ''  }
                                                    { navlink == 'accepted' ? acceptedApplicantslist : ''  }
                                                    { navlink == 'disapprove' ? disapproveApplicantslist : ''  }
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

                <Modal visible={ this.state.showCv == 'yes' ? true : false} className="customSeekerModal">
                    
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                            <div className="col-md-6" style={{borderRight: '1px solid #111'}}>
                                <h3> <b>Company requirment </b></h3>
                                <ul>
                                    <li> <b>Job Title : </b>{job_info.title}</li>
                                    <br/>
                                    <li> <b>Job  Category : </b>{job_info.category}</li>
                                    <br/>
                                    <li> <b>Job Sub Category : </b>{job_info.sub_category}</li>
                                    <br/>
                                    <li> <b>Job details : </b> { renderHTML(`${job_info.details}`) } </li>
                                    <br/>
                                    <li> <b>Job responsibilities : </b> { renderHTML(`${job_info.responsibilities}`) } </li>
                                    <br/>
                                    <li> <b>Job education : </b> { renderHTML(`${job_info.education}`) } </li>
                                    <br/>
                                    
                                    <li> <b>Job experience : </b> { renderHTML(`${job_info.experience}`) } </li>
                                    <br/>
                                    <li>
                                        <b>Salary</b> {job_info.max_salary }-{ job_info.min_salary} 
                                    </li>
                                    <li>
                                        <b>Job level :</b> {job_info.joblevel }
                                    </li>
                                    <li>
                                        <b>Job benefits :</b> { renderHTML(`${job_info.benefits}`) } 
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h3><b>Applicant requirment</b></h3>
                                <ul>
                                <li><h2> Employement status</h2></li> {employeementStatus}
                                    <br/>
                                    <li> <b> <h2>Education :</h2> </b></li> 
                                    {educationStatus}
                                    <br/>
                                    
                                    <h2> <b>Preference </b></h2>
                                    <li>  
                                        <b>Desired Designation:</b>  {this.state.preference.desired_Designation}
                                        <br/>
                                        <b>Carrer level : </b> {this.state.preference.carrerlevel} 
                                        <br/>
                                        <b>Job Type :  </b> {this.state.preference.job_type}
                                        <br/>
                                        <b> Desired start date : </b> {this.state.preference.desired_start_date}
                                        <br/>
                                        <b>Salary :</b> {this.state.preference.salary} 
                                        <br/>
                                        <b>Type Of Employee :  </b> {this.state.preference.typeOfEmployee}
                                        <br/>
                                        <b>Industry  :   </b> {this.state.preference.Industry}
                                    </li>
                                    <br/>
                                    <li> <h4>Training : </h4> {trainingStatus} </li>
                                </ul>
                            </div>
                            </div>
                            <div class="col-sm-10">
                                <button type="submit" class="btn btn-default pull-6" onClick={this.closeCompareCvModal}>Close</button>
                            </div>
                        </div>
                    </div>
                
                </Modal>
                <Modal visible={ this.state.massagebox == true ? true : false} className="customSeekerModal">
                    <div className="card">
                        <div className="card-body">
                        <form onSubmit={this.SubmitDisapproveMassage}>
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="comment">Comment:</label>
                                <div class="col-sm-10">
                                    <textarea type="text"  rows="3" name="disapproveMassage" className="form-control"  onChange={ this.handleInputChange }></textarea> 
                                </div>
                            </div>
                            <div class="form-group">        
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button type="submit" class="btn btn-default">Submit</button>
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
export default withRouter(ApplicantslistByJob);