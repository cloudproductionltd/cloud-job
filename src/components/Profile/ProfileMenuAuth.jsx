import React, { Component } from 'react';
import Axios from 'axios'

class ProfileMenu extends Component {
    state = {
        user: null,
        employments : '',
        address:'',
        careear:'',
        educations:[],
        trainings:[],
        employeements:[]
    }

    componentDidMount(){
        let user_id = window.sessionStorage.getItem('loggedInUserId');
        Axios.get(`/users/${user_id}`)
        //Axios.get(`https://cloudjobs.herokuapp.com/users/${user_id}`)
            .then(response => {
                console.log('res',response.data.response.user.trainings)
                this.setState({ 
                        user : response.data.response.user,
                        address :  response.data.response.user.address,
                        employments : response.data.response.user.employments,
                        careear: response.data.response.user.careear,
                        educations: response.data.response.user.educations,
                        trainings : response.data.response.user.trainings,
                        employeements : response.data.response.user.employments
                    })
            })
            .catch(error => {
            })
    }

    render() {
  
        let { careear } = this.state
        let careear_objective
        if(careear){
            careear_objective =   <div>  
                                    <p>{careear.objective}</p>
                                </div>
        }else{
            careear_objective =  <div>  
                                    
                                </div>
        }
        
        let { educations }  = this.state
        let educationsSummery = educations.map((education) =>
                <div className="edu-history">
                    <i className="fa fa-graduation-cap"></i>
                    <div className="edu-hisinfo">
                        <h3><strong>Education Degree:</strong> { education.degree}</h3>
                        <span><b>Duration: </b> {education.duration}</span>
                        <span><b>Institute: </b> {education.institute} </span>
                        <span><b>Passing Year: </b>{education.year}</span>
                        <span><b>Result: </b>{education.result}</span>
                        
                    </div>
                </div>        
        )
            
        let { trainings } = this.state

        let trainingsSummery = trainings.map((training) =>
                <div className="edu-history">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <div className="edu-hisinfo">
                        <h3><strong>Training Title: </strong>{ training.topic}</h3>
                        <span><b>Training Title: </b>{training.title}</span>
                        <span><b>Training Institute: </b>{training.institute} </span>
                        <span><b>Passing Year: </b>{training.year}</span>
                        <span><b>location: </b>{training.location}</span>
                    </div>
                </div>        
        )

        let { employeements } = this.state
        let employmentsSummery = employeements.map((employment) =>
            <div className="edu-history">
                        <i className="fas fa-user-tie"></i>
                        <div className="edu-hisinfo">
                            <h3><strong>Company Name: { employment.name}</strong></h3>
                            <span><b>Company Type: </b>{employment.type}</span>
                            <span><b>Company Location: </b>{employment.location} </span>
                            <span><b>Employment period: </b></span>
                            <span><b>From: </b>{ new Date(employment.start_date).toLocaleDateString() }</span> 
                            <span><b>To: </b>{ employment.currently_working ? new Date(employment.end_date).toLocaleDateString() :'Till now'}</span>
                            <span><b>Responsibilities: </b>{employment.responsibilities}</span>
                        </div>
                    </div>
        )
        return (
            <div>
                <section className="profile-menu">
                    <div className="container">
                        <div className="row profile-excerpt-wrap">
                            <div className="col-lg-9 profile-body-section-left">
                                <div className="card singleProWrap">
                                    {/* <ul className="cand-extralink" >
                                        <li><a href="#about" className="active">About</a></li>
                                        <li className=""><a href="#education" title="">Academic Summary</a></li>
                                        <li><a href="#training">Training Summary</a></li>
                                        <li className=""><a href="#experience" title="">Work Experience</a></li>
                                    </ul> */}


                                <ul className="nav nav-tabs nav-justified md-tabs resume-tab-wrapper cand-extralink" id="myTabJust" role="tablist">
                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link active" id="about-tab-just" data-toggle="tab" href="#about-just" role="tab" aria-controls="about-just" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link" id="education-tab-just" data-toggle="tab" href="#education-just" role="tab" aria-controls="education-just" aria-selected="false">Academic Summary</a>
                                    </li>
                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link" id="training-tab-just" data-toggle="tab" href="#training-just" role="tab" aria-controls="training-just" aria-selected="false">Training Summary</a>
                                    </li>
                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link" id="employment-tab-just" data-toggle="tab" href="#employment-just" role="tab" aria-controls="employment-just" aria-selected="false">Work Experience</a>
                                    </li>
                                </ul>

                               













                                    <div className="card-body">
                                        <div className="tab-content" id="myTabContentJust">
                                            <div className="tab-pane fade show active" id="about-just" role="tabpanel" aria-labelledby="about-tab-just">
                                                <div className="cand-details">
                                                    <h2>Career Objective</h2>
                                                    {careear_objective}
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="education-just" role="tabpanel" aria-labelledby="education-tab-just">
                                                <div className="edu-history-sec cand-details">
                                                    <h2>Education</h2>
                                                    {educationsSummery}
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="training-just" role="tabpanel" aria-labelledby="training-tab-just">
                                                <div className="edu-history-sec cand-details">
                                                    <h2>Training Summery</h2>
                                                    {trainingsSummery}
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="employment-just" role="tabpanel" aria-labelledby="employment-tab-just">
                                                <div className="edu-history-sec cand-details">
                                                        <h2>Employeement Summery</h2>
                                                        {employmentsSummery}
                                                    </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="job-overview">
                                    <div className="card" >
                                        <h3 className="card-title">Job Overview</h3>
                                        <div className="card-body">
                                            <ul>
                                                <li><i className="fas fa-money-check-alt"></i><h3><b>Present Salary: </b></h3><span>{this.state.careear ? this.state.careear.present_salary : ''} </span></li>
                                                <li><i className="fas fa-briefcase briefC"></i><h3><b>Avliable for:</b></h3><span>{ this.state.careear ? this.state.careear.avliable_for :''}</span></li>
                                                <li><i className="fas fa-money-check-alt"></i><h3><b>Expected salary: </b></h3><span>{ this.state.careear ? this.state.careear.expected_salary :''}</span></li>
                                                <li><i className="fas fa-briefcase briefC"></i><h3><b>Looking for: </b></h3><span>{ this.state.careear ? this.state.careear.looking_for: ''}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default ProfileMenu;