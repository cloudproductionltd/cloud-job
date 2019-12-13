import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import Axios from 'axios';
import {  withRouter } from 'react-router-dom';
import 'moment-timezone';
import {  Link } from 'react-router-dom';
import Modal from 'react-bootstrap4-modal';
import SweetAlert from 'sweetalert2-react';
import EducationUpdate from './EducationUpdate';
import TrainingUpdate from './TrainingUpdate';
import EmployeementUpdate from './EmployeementUpdate';
import EducationAdd from './EducationAdd';
import TrainingAdd from './TrainingAdd';
import EmployeementAdd from './EmployeementAdd';

class ProfileEdit extends Component {    

	state = {
        // user: '',
        email:'',
        username:'',
        firstName:'',
        lastName:'',
        middleName:'',
        fatherName:'',
        motherName:'',
        gender:'',
        religion:'',
        maritualStatus:'',
        birthDate:'',
        nationality:'',
        nationalId:'',
        bloodGroup:'',
        contactInfo:'',
        emergencyContact:'',
        alternetEmail:'',
        company_name:'',
        company_type: '',
        location: '',
        designation: '',
        depertment:'',
        responsibilities :'',
        start_date: '',
        end_date: '',
        currently_working:'',
        employments:[],

        ///career property
        objective:'',
        present_salary:'',
        expected_salary:'',
        looking_for:'',
        avliable_for:'',
    
        ///Address property
        current_country : '',
        current_state: '',
        current_city: '',
        permanent_country: '',
        permanent_state: '',
        permanent_city: '',
        permanent_zipcode: '',
        current_zipcode: '',
        
        major: '',
        result: '',
        duration: '',
        institute: '',
        degree: '',
        year: '',

        educations: [],
		trainings: [],
		

		company_currently_working: true 
    };
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    setInputValueToState = (e) => {
		this.setState({ [e.target.name]: e.target.value } );
		if(e.target.name === 'company_currently_working'){
			this.setState({
				company_currently_working: !this.state.company_currently_working,
			});
		}
    }

	


    updateAcademicInfo  = row_id => e=> {
        e.preventDefault();
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        const { majorOrGroup, result, duration, institute  } = this.state;
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/update-academic-info/${user_id}/${row_id}`,
                {
                    major : majorOrGroup,
                    result: result,
                    duration: duration,
                    institute: institute,
                },{headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
                                    show : true
                    })
                }).catch((error) =>{
                    this.setState({
                        show : false
                    })
                });
    }

	deleteTrainingInfo = training_id => e =>{
		e.preventDefault();
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/delete-training-info/${user_id}/${training_id}`,
                {

                },{headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
                                    show : true
                                })
                }).catch((error) =>{
                    this.setState({
                        show : false
                    })
                });
	}


	deleteEducation = education_id => e => {
		e.preventDefault();
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/delete-academic-info/${user_id}/${education_id}`,
                {

                },{headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
                                    show : true
                                })
                }).catch((error) =>{
                    this.setState({
                        show : false
                    })
                });
	}


	deleteEmployment = employeement_id => e => {
		e.preventDefault();
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/delete-employments-info/${user_id}/${employeement_id}`,
                {

                },{headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
                                    show : true
                                })
                }).catch((error) =>{
                    this.setState({
                        show : false
                    })
                });

	}

    updateTrainingInfo  = row_id => e=> {
        e.preventDefault();
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        const { traning_year, traning_country, traning_title,  traning_topic, traning_institute, traning_duration,traning_location } = this.state;
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/update-traning-info/${user_id}/${row_id}`,
                {
                    year : traning_year,
                    country: traning_country,
                    title: traning_title,
                    topic : traning_topic,
                    institute : traning_institute,
                    location : traning_location,
                    duration: traning_duration
                },{headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
                                    show : true
                                })
                }).catch((error) =>{
                    this.setState({
                        show : false
                    })
                });
    }

    
    onSubmitUpdateAddress = (e) =>{
        e.preventDefault();
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        const { current_city, current_country, current_state, current_zipcode, permanent_city, permanent_country,  permanent_state, permanent_zipcode  } = this.state;
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/address/${user_id}`,
                {
                    current_country : current_country,
                    current_zipcode: current_zipcode,
                    current_state: current_state,
                    current_city: current_city,
                    permanent_country: permanent_country,
                    permanent_state: permanent_state,
                    permanent_city: permanent_city,
                    permanent_zipcode: permanent_zipcode
                },{headers: headers})
                .then((result) => {
                    this.setState({
                        show : true
                    })
                }).catch((error) =>{
                    this.setState({
                        show : false
                    })
                });
    }

    
    onSubmitPersonalDetails = (e) => {
        e.preventDefault();

        var user_id = (window.sessionStorage.getItem('user_id'));
        console.log('user_id',user_id)
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        const { firstName, lastName, middleName, fatherName, motherName, gender,
                religion , maritualStatus, birthDate, nationality,
                nationalId, bloodGroup, contactInfo, emergencyContact, alternetEmail
            } = this.state;

            let personalInfo = new Object()
            if(firstName){
                personalInfo.firstName=firstName
            }
            if(lastName){
                personalInfo.lastName=lastName 
            }
            if(middleName){
                personalInfo.middleName= middleName
            }
            if(fatherName){
                personalInfo.fatherName= fatherName
            }
            if(motherName){
                personalInfo.motherName = motherName
            }
            if(gender){
                personalInfo.gender = gender
            }
            if(religion){
                personalInfo.religion= religion
            }
            if(maritualStatus){
                personalInfo.maritualStatus= maritualStatus
            }
            if(birthDate){
                personalInfo.birthDate= birthDate
            }
            if(nationality){
                personalInfo.nationality= nationality
            }
            if(nationalId){
                personalInfo.nationalId= nationalId
            }
            if(bloodGroup){
                personalInfo.bloodGroup= bloodGroup
            }
            if(contactInfo){
                personalInfo.contact= contactInfo
            }
            if(emergencyContact){
                personalInfo.emergencyContact= emergencyContact
            }
            if(alternetEmail){
                personalInfo.alternetEmail= alternetEmail
            }
            
            Axios.put(`/users/personal-info/${user_id}`,personalInfo,
                {headers: headers}
                )
                .then((result) => {
                
                    this.setState({
                        show : true
                    })
                })
                .catch((error) =>{
                    this.setState({
                        show : false
                    })
                });
    }

    onSubmitEmployeementDetails = (e) => {
        e.preventDefault();

        var user_id = (window.sessionStorage.getItem('user_id'));
        console.log('user_id',user_id)
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        const { objective , present_salary , expected_salary, looking_for, avliable_for } = this.state;
            
            Axios.put(`/users/careear/${user_id}`,
                {
                    objective : objective,
                    present_salary: present_salary,
                    expected_salary: expected_salary,
                    looking_for: looking_for,
                    avliable_for: avliable_for
                },
                {headers: headers}
                )
                .then((result) => {
                        this.setState({
                            show : true
                        })
                }).catch((error)=>
                        this.setState({
                            show : true
                        })
                );
        }




    onSubmitCareerDetails = (e) => {
        e.preventDefault();

        var user_id = (window.sessionStorage.getItem('user_id'));
        console.log('user_id',user_id)
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        const { objective , present_salary , expected_salary, looking_for, avliable_for } = this.state;
            
            Axios.put(`/users/careear/${user_id}`,
                {
                    objective : objective,
                    present_salary: present_salary,
                    expected_salary: expected_salary,
                    looking_for: looking_for,
                    avliable_for: avliable_for
                },
                {headers: headers}
                )
                .then((result) => {
                        this.setState({
                            show : true
                        })
                }).catch((error)=>
                        this.setState({
                            show : true
                        })
                );
        }


    componentDidMount(){ 
        var user_id = (window.sessionStorage.getItem('user_id'));
        var token = (window.sessionStorage.getItem('cool-jwt'));
            Axios.get(`/users/${user_id}`,
            { headers: { Authorization: `${token}` }
            
            })
            .then(response => {
                this.setState( 
                        { 
                            email :  response.data.response.user.local.email,
                            username : response.data.response.user.local.username,
                            firstName: response.data.response.user.personal.firstName,
                            lastName: response.data.response.user.personal.lastName,
                            middleName: response.data.response.user.personal.middleName,
                            fatherName: response.data.response.user.personal.fatherName,
                            motherName: response.data.response.user.personal.motherName,
                            gender: response.data.response.user.personal.gender,
                            religion: response.data.response.user.personal.religion,
                            maritualStatus: response.data.response.user.personal.maritualStatus,
                            birthDate:  new Date(response.data.response.user.personal.birthDate).toLocaleDateString(),
                            nationality: response.data.response.user.personal.nationality,
                            contactInfo: response.data.response.user.personal.contact,
                            alternetEmail:  response.data.response.user.personal.alternetEmail,
                            emergencyContact: response.data.response.user.personal.alternetEmail,
                            nationalId: response.data.response.user.personal.nationalId,
                            bloodGroup: response.data.response.user.personal.bloodGroup,
                        
                            ////career information
                            objective: response.data.response.user.careear ? response.data.response.user.careear.objective:'',
                            present_salary: response.data.response.user.careear ? response.data.response.user.careear.present_salary :'',
                            expected_salary: response.data.response.user.careear ? response.data.response.user.careear.expected_salary :'',
                            looking_for: response.data.response.user.careear ? response.data.response.user.careear.looking_for:'',
                            avliable_for: response.data.response.user.careear? response.data.response.user.careear.avliable_for:'',
                
                            ////address info
                            current_country : response.data.response.user.address ? response.data.response.user.address.current_country :'',
                            current_zipcode: response.data.response.user.address ? response.data.response.user.address.current_zipcode :'',
                            current_state: response.data.response.user.address ? response.data.response.user.address.current_state :'',
                            current_city: response.data.response.user.address ? response.data.response.user.address.current_city :'',
                            permanent_country: response.data.response.user.address ? response.data.response.user.address.permanent_country :'',
                            permanent_state: response.data.response.user.address ? response.data.response.user.address.permanent_state :'',
                            permanent_city: response.data.response.user.address ? response.data.response.user.address.permanent_city :'',
                            permanent_zipcode: response.data.response.user.address ?response.data.response.user.address.permanent_zipcode :''
                        })
            })
            .catch(error => {
                console.log('error',error)
            })
    }


    closeModal() {
        this.setState({
            show : '',
        });
    }

    render() {
		let educations = JSON.parse(window.sessionStorage.getItem('user')).educations
		let educationsSummery
		if ( educations.length == 0 ){
			educationsSummery =  <div className="card-body academic-1">
                <div className="btn-wrapper">
                    {/* <div className="edit-btn" data-toggle="modal" data-target={'#' + } ><i className="fas fa-pencil-alt"></i></div>
                    <div className="delete-btn" onClick ={ this.deleteEducation()}><i className="fas fa-trash-alt"></i>
				
                    </div> */}
                </div>
                <h5 className="training-title">Academic </h5>
                <table className="table table-striped academic-1-table">
                    <tbody>
						<tr>
							<td colspan="2">
                                <p className="table-title">Exam/Degree Title</p>
                            </td>
                        </tr>
                        <tr>
					    	<td>
                                <p className="table-title">Result</p>
                                
                            </td>
                            <td>
                                <p className="table-title">Year of passing</p>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="table-title">Concentration/ Major/Group</p>
                                
                            </td>
                            <td>
                                <p className="table-title">Duration (Years)</p>
                            
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="table-title">Institute Name</p>
                            
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
		}else{
			educationsSummery = educations.map((education,i) =>
			<div>
				<div className="modal fade" id={education._id} tabIndex="-1" role="dialog" aria-labelledby="academic1eModalLabel" aria-hidden="true">
					<div>
					<EducationUpdate education = {education}/>
					</div>
				</div>
	
				<div className="card-body academic-1">
					<div className="btn-wrapper">
						<div className="edit-btn" data-toggle="modal" data-target={'#' + education._id} ><i className="fas fa-pencil-alt"></i></div>
						<div className="delete-btn" onClick ={ this.deleteEducation(education._id)}><i className="fas fa-trash-alt"></i>
					
						</div>
					</div>
					<h5 className="training-title">Academic { i + 1 }</h5>
					<table className="table table-striped academic-1-table">
						<tbody>
	
							<tr>
								<td colspan="2">
									<p className="table-title">Exam/Degree Title</p>
									{education.degree}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Result</p>
									{education.result} 
								</td>
								<td>
									<p className="table-title">Year of passing</p>
									{education.year}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Concentration/ Major/Group</p>
									{education.major}
								</td>
								<td>
									<p className="table-title">Duration (Years)</p>
									{education.duration}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Institute Name</p>
									{education.institute}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			)
		}
        

		
		let employments = JSON.parse(window.sessionStorage.getItem('user')).employments
		let employmentsSummery
		if ( employments.length == 0 ){
			employmentsSummery = <div>
					<div className="btn-wrapper">
						
					
					</div>
					<h5 className="employment-title">employment </h5>
					<table className="table table-striped employment-table-1">
						<tbody>
							<tr>
								<td>
									<p className="table-title">Name</p>
								
								</td>
								<td>
									<p className="table-title">Designation</p>
									
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Depertment</p>
									
								</td>
								<td>
									<p className="table-title">Company Type</p>
									
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Start date</p>
									<span className="table-title">From :</span> 
								</td>
								<td>
									<p className="table-title">End date</p>
									<span className="table-title">To :</span>
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Location</p>
								
								</td>
								<td>
									<p  className="table-title">Currently Working</p>
									
								</td>
							</tr>
						</tbody>
					</table>
				</div>
		}else{
		employmentsSummery = employments.map((employment,i) => 
			    <div>
					<div className="modal fade" id={employment._id} tabIndex="-1" role="dialog" aria-labelledby="academicModalLabel" aria-hidden="true">
						<div>
							<EmployeementUpdate  employment={employment}/>
						</div>
					</div>
					<div className="btn-wrapper">
						<div className="edit-btn" data-toggle="modal" data-target={'#' +employment._id}><i className="fas fa-pencil-alt"></i></div>
						<div className="delete-btn" onClick ={ this.deleteEmployment(employment._id)}><i className="fas fa-trash-alt"></i>
						</div>
					</div>
					<h5 className="employment-title">Employment { i + 1}</h5>
					<table className="table table-striped employment-table-1">
						<tbody>
							<tr>
								<td>
									<p className="table-title">Name</p>
									{employment.name}
								</td>
								<td>
									<p className="table-title">Designation</p>
									{employment.designation}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Depertment</p>
									{employment.designation}
								</td>
								<td>
									<p className="table-title">Company Type</p>
									{employment.type}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Start date</p>
									<span className="table-title">From :</span> {employment.start_date} 
								</td>
								<td>
									<p className="table-title">End date</p>
									<span className="table-title">To :</span> {employment.end_date}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Location</p>
									{employment.location}
								</td>
								<td>
									<p  className="table-title">currently working</p>
									{employment.currently_working === true ? 'yes': 'no'}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
            )
		}
		
		
		////////// for employeement

		let trainings = JSON.parse(window.sessionStorage.getItem('user')).trainings
		let trainingSummery
		if(trainings.length == 0 ){
			trainingSummery = <div>
                               
                                
                                <h5 className="training-title">Training </h5>
                                <table className="table table-striped training-table-1">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="table-title">Training Title </p>
                                                
                                            </td>
                                            <td>
                                                <p className="table-title">Country</p>
                                               
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="table-title">Topics Covered</p>
                                               
                                            </td>
                                            <td>
                                                <p className="table-title">Training Year</p>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="table-title">Institute</p>
                                               
                                            </td>
                                            <td>
                                                <p className="table-title">Duration</p>
                                               
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="table-title">Location</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
		}else{
			trainingSummery = trainings.map((training,i) => 
                            <div>
                                <div className="modal fade" id={training._id} tabIndex="-1" role="dialog" aria-labelledby="academicModalLabel" aria-hidden="true">
                                    <div>
										<TrainingUpdate  training={training}/>
									</div>
                                </div>
                                <div className="btn-wrapper">
                                    <div className="edit-btn" data-toggle="modal" data-target={'#' +training._id}><i className="fas fa-pencil-alt"></i></div>
                                    <div className="delete-btn" onClick ={ this.deleteTrainingInfo(training._id)} ><i className="fas fa-trash-alt"></i>
                                    </div>
                                </div>
                                <h5 className="training-title">Training { i + 1}</h5>
                                <table className="table table-striped training-table-1">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="table-title">Training Title </p>
                                                {training.title}
                                            </td>
                                            <td>
                                                <p className="table-title">Country</p>
                                                {training.location}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="table-title">Topics Covered</p>
                                                {training.topic}
                                            </td>
                                            <td>
                                                <p className="table-title">Training Year</p>
                                                {training.year}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="table-title">Institute</p>
                                                {training.institute}
                                            </td>
                                            <td>
                                                <p className="table-title">Duration</p>
                                                {training.duration}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="table-title">Location</p>
                                                {training.location}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
        )
		}
      




        let { username, firstName, lastName, middleName, fatherName, motherName, gender, religion,
                maritualStatus, birthDate, nationality, nationalId, bloodGroup,
                contactInfo, emergencyContact, alternetEmail, company_name, company_type, 
                location, designation, depertment, responsibilities, start_date,
                end_date, currently_working, objective, present_salary, expected_salary,
                looking_for, avliable_for , address
            } = this.state
    
	return(
		<div>
	<SweetAlert
		show={this.state.show}
		title="Successfull"
		onConfirm={() =>
	this.setState({ show: false })}
	/>
	<Navbar/>
	<div className="page-wrapper chiller-theme toggled container">
		<div className="row">
			<div className="col-md-3 col-sm-12">
				<nav id="sidebar" className="sidebar-wrapper">
					<div className="sidebar-content">
						<div className="sidebar-header">
							<div className="user-pic">
								<img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt=""/>
							</div>
							<div className="user-info">
								<span className="user-name">
								<strong>{this.state.username}</strong>
								</span>
								<span className="user-role">Administrator</span>
								<span className="user-status">
								<i className="fa fa-circle"></i>
								<span>Online</span>
								</span>
							</div>
						</div>
						<div className="sidebar-menu">
							<ul>
								<li>
									<Link to='/applications'>
									<i className="fa fa-book"></i>
									<span>  Applications </span>
									</Link>
								</li>
								<li>
									<Link to='/profile'>
									<i className="fa fa-calendar"></i>
									<span>User profile </span>
									</Link>
								</li>
								<li className="sidebar-dropdown">
            <a href="#">
              <i className="fa fa-tachometer-alt"></i>
              <span>Dashboard</span>
              <span className="badge badge-pill badge-warning">New</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
                <li>
                  <a href="# ">Dashboard 1
                    <span className="badge badge-pill badge-success">Pro</span>
                  </a>
                </li>
                <li>
                  <a href="# ">Dashboard 2</a>
                </li>
                <li>
                  <a href="# ">Dashboard 3</a>
                </li>
              </ul>
            </div>
          </li>
							</ul>
						</div>
					</div>
					<div className="sidebar-footer">
						<a href="# " title="notification">
						<i className="fa fa-bell"></i>
						{/* <span className="badge badge-pill badge-warning notification">3</span> */}
						</a>
						<a href="# " title="message">
						<i className="fa fa-envelope"></i>
						{/* <span className="badge badge-pill badge-success notification">7</span> */}
						</a>
						<a href="# ">
						<i className="fa fa-cog"></i>
						{/* <span className="badge-sonar"></span> */}
						</a>
					</div>
				</nav>
			</div>
			<div className="col-md-9 col-sm-12">
				<div className="card right-resume-edit-wrapper">
					<div className="top-inst">
						<p>Here you can edit your resume in five different steps (Personal, Education/ Training, Employment, Other Information and Photograph). To enrich your resume provide authentic information. </p>
					</div>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb resume-breadcumb-wrapper">
							<li className="breadcrumb-item"><a href="# ">Home</a></li>
							<li className="breadcrumb-item active">Edit Resume</li>
						</ol>
					</nav>
					<ul className="nav nav-tabs nav-justified md-tabs resume-tab-wrapper" id="myTabJust" role="tablist">
						<li className="nav-item waves-effect waves-light">
							<a className="nav-link active" id="home-tab-just" data-toggle="tab" href="#home-just" role="tab" aria-controls="home-just" aria-selected="true">Personal</a>
						</li>
						<li className="nav-item waves-effect waves-light">
							<a className="nav-link" id="profile-tab-just" data-toggle="tab" href="#profile-just" role="tab" aria-controls="profile-just" aria-selected="false">Education/Training</a>
						</li>
						<li className="nav-item waves-effect waves-light">
							<a className="nav-link" id="profile-tab-Training" data-toggle="tab" href="#profile-Training" role="tab" aria-controls="profile-Training" aria-selected="false">Employment</a>
						</li>
					</ul>
					<div className="tab-content resume-tab-content card" id="myTabContentJust">
						<div className="tab-pane fade show active" id="home-just" role="tabpanel" aria-labelledby="home-tab-just">
							<div id="accordion">
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingOne">
										<a href="# " className="btn btn-link common-user-ifo-btn waves-effect waves-light" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
											<p className="common-info-title">Personal Details</p>
										</a>
									</h4>
									<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
										<div className="card-body">
											<div className="btn-wrapper">
												<div className="edit-btn" data-toggle="modal" data-target="#personalDetails"><i className="fas fa-pencil-alt"></i></div>
											</div>
											<table className="table table-striped">
												<tbody>
													<tr>
														<td>
															<p className="table-title">Name</p>
															{this.state.firstName}
														</td>
														<td>
															<p className="table-title">Nationality</p>
															{this.state.nationality}
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Maritual Status</p>
															{this.state.maritualStatus}
														</td>
														{/* <td>
															<p className="table-title">National Id no</p>
															{this.state.nationalId}
														</td> */}
													</tr>
													<tr>
														<td>
															<p className="table-title">Father's Name</p>
															{this.state.fatherName}
														</td>
														<td>
															<p className="table-title">Contact No</p>
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Mother's Name</p>
															{this.state.motherName}
														</td>
														<td>
															<p className="table-title">Date of Birth </p>
															{this.state.birthDate}
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Gender</p>
															{this.state.gender}
														</td>
														<td>
															<p className="table-title">Email</p>
															{this.state.email}
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<p className="table-title">Religion</p>
															{this.state.religion}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div className="modal fade" id="personalDetails" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="card">
														<button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">×</span>
														</button>
														<h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Personal details</h5>
														<div className="card-body px-lg-5 pt-0">
															<form onSubmit={this.onSubmitPersonalDetails} className="profile-edit-modal-form">
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-user prefix "></i>
																			<input type="text" id="materialRegisterFormFirstName" name="firstName" value={firstName} className="form-control" onChange={this.onChange}  required />
																			<label htmlFor="materialRegisterFormFirstName" className={firstName ? "active required": 'required'}>First name</label>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-user prefix"></i>
																			<input type="text" name="lastName"  value={ lastName }  className="form-control" onChange={this.onChange}  id="materialRegisterFormLastName" className="form-control" required/>
																			<label htmlFor="materialRegisterFormLastName" className= { lastName ? "active required": 'required'} >Last Name</label>
																		</div>
																	</div>
																</div>
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fab fa-font-awesome-flag prefix"></i>
																			<input type="text"  id="materialRegisterFormNationality"  name="nationality" value={ nationality }  onChange={this.onChange}  className="form-control" required/>
																			<label htmlFor="materialRegisterFormNationality" className= { nationality ? "active required": 'required'}>Nationality</label>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-id-card-alt prefix"></i>
																			<input type="text" name="nationalId" value={ nationalId } onChange={this.onChange}  id="materialRegisterFormNationalId" className="form-control"/>
																			<label htmlFor="materialRegisterFormNationalId"  className= { nationalId ? "active required": 'required'}>National Id</label>
																		</div>
																	</div>
																</div>
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-user prefix "></i>
																			<input type="text" name="fatherName" value={ fatherName } onChange={this.onChange} id="materialRegisterFormMobileNo1" className="form-control" required/>
																			<label htmlFor="materialRegisterFormMobileNo1" className= { fatherName ? "active required": 'required'}>Father's Name</label>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-user prefix"></i>
																			<input type="text" name="motherName" value={ motherName } onChange={this.onChange} id="materialRegisterFormMotherName" className="form-control" required/>
																			<label htmlFor="materialRegisterFormMotherName" className= { motherName ? "active": ''}>Mother's Name</label>
																		</div>
																	</div>
																</div>
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-tint prefix"></i> 
																			<select  name="bloodGroup" value={ bloodGroup } onChange={this.onChange} className="browser-default custom-select profile-edit-common-select" required>
																				<option defaultValue="">blood Group</option>
																				<option value="A+">A+</option>
																				<option value="A-">A-</option>
																				<option value="O+">O+</option>
																				<option value="O-">O-</option>
																				<option value="AB+">AB+</option>
																				<option value="AB-">AB-</option>
																				<option value="B+">B+</option>
																				<option value="B-">B-</option>
																			</select>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-heart prefix"></i>
																			<input type="text"  name="maritualStatus" value={ maritualStatus } onChange={this.onChange}  id="materialRegisterFormMaritialStatus" className="form-control" required/>
																			<label htmlFor="materialRegisterFormMaritialStatus" className= { maritualStatus ? "active required": 'required'}>Maritual Status</label>
																		</div>
																	</div>
																</div>
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-calendar-week prefix"></i> 
																			<span className="requiredStar birthdatestar">*</span>
																			<input type="date"  name ="birthDate" value = { birthDate } onChange={this.onChange} id="materialRegisterFormDateOfBirth" className="form-control" required/>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-transgender prefix"></i>
																			<select  name="gender" value = { gender } onChange={this.onChange} className="browser-default custom-select profile-edit-common-select" required>
																				<option defaultValue ="">Gender</option>
																				<option value="Male">Male</option>
																				<option value="Female">Female</option>
																			</select>
																		</div>
																	</div>
																</div>
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-praying-hands prefix"></i>
																			<input type="text" id="mModalReligionFo" name="religion" value={ religion } onChange={this.onChange} className="form-control" required/>
																			<label htmlFor="mModalReligionFo"  className= { religion ? "active required": 'required'}>Religion</label>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-envelope prefix"></i> 
																			<input type="text" name="alternetEmail" value={ alternetEmail } onChange={this.onChange}  id="materialRegisterFormAlternateEmail" className="form-control" required/>
																			<label htmlFor="materialRegisterFormAlternateEmail" className= { alternetEmail ? "active required": 'required'}>Email</label>
																		</div>
																	</div>
																</div>
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-address-book prefix"></i>
																			<input type="text" name="contactInfo" value={ contactInfo } onChange={this.onChange}  id="materialRegisterFormContact" className="form-control"/>
																			<label htmlFor="materialRegisterFormContact" className= { contactInfo ? "active required": 'required'}>Contact</label>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-address-book prefix"></i>
																			<input type="text" name="emergencyContact" value={ emergencyContact } onChange={this.onChange}  id="materialRegisterFormEmergencyContact" className="form-control" required/>
																			<label htmlFor="materialRegisterFormEmergencyContact" className= { emergencyContact ? "active": ''}>emergencyContact</label>
																		</div>
																	</div>
																</div>
																<div className="text-center profile-edit-modal-btn">
																	<button type="submit" className="btn btn-success btn-rounded waves-effect waves-light">Update</button>
																	<button type="button" className="btn btn-light btn-rounded waves-effect waves-light" data-dismiss="modal">Close</button>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingTwo">
										<a href="# " className="btn btn-link common-user-ifo-btn collapsed waves-effect waves-light" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
											<p className="common-info-title">Address Details</p>
										</a>
									</h4>
									<div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
										<div className="card-body" >
											<div className="btn-wrapper">
												<div className="edit-btn" data-toggle="modal" data-target="#modal-one"><i className="fas fa-pencil-alt"></i></div>
											</div>
											<table className="table table-striped">
												<tbody>
													<tr>
														<td>
															<p className="table-title title_t"><b>Present Address</b></p>
															<span className="address-commonspan"><b>>city :</b> {this.state.current_city} </span><br/>
															<span className="address-commonspan"><b>state :  </b> {this.state.current_state}</span> <br/>
															<span className="address-commonspan"><b>country :</b> {this.state.current_country}</span> <br/>
															<span className="address-commonspan"><b>zipcode :</b> {this.state.current_zipcode} </span><br/>
														</td>
														<td>
															<p className="table-title title_t"><b> Permanent Address </b></p>
															<span className="address-commonspan">city : {this.state.permanent_city}</span> <br/>
															<span className="address-commonspan">state :  {this.state.permanent_state}</span> <br/>
															<span className="address-commonspan">zipcode : {this.state.permanent_zipcode}</span> <br/>
															<span className="address-commonspan">country : {this.state.permanent_country}</span> <br/>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div className="modal fade" id="modal-one" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="card">
														<button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">×</span>
														</button>
														<h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Address Details</h5>
														<div className="card-body px-lg-5 pt-0">
															<form onSubmit={this.onSubmitUpdateAddress } className="profile-edit-modal-form">
																<div className="form-row">
																	<div className="col">
																		<p className="cm-address">Present Address</p>
																		<div className="md-form">
																			<i className="fab fa-font-awesome-flag prefix"></i>
																			<span className="requiredStar">*</span>
																			<select className="browser-default custom-select profile-edit-common-select" value ={this.state.current_country} onChange={this.onChange} name="current_country">
																				<option defaultValue="">Select Country</option>
																				<option value="Afghanistan">Afghanistan</option>
																				<option value="Albania">Albania</option>
																				<option value="Algeria">Algeria</option>
																				<option value="Australia">Australia</option>
																				<option value="Bahrain">Bahrain</option>
																				<option value="Belgium">Belgium</option>
																				<option value="Bangladesh">Bangladesh</option>
																				<option value="Brazil">Brazil</option>
																				<option value="Canada">Canada</option>
																				<option value="Denmark">Denmark</option>
																				<option value="Finland">Finland</option>
																				<option value="France">France</option>
																				<option value="Germany">Germany</option>
																				<option value="Iceland">Iceland</option>
																				<option value="India">India</option>
																				<option value="Indonesia">Indonesia</option>
																				<option value="Iran">Iran</option>
																				<option value="Nepal">Nepal</option>
																				<option value="Netherlands">Netherlands</option>
																				<option value="North Korea">North Korea</option>
																				<option value="Norway">Norway</option>
																				<option value="South Africa">South Africa</option>
																				<option value="Norway">Norway</option>
																				<option value="Norway">Norway</option>
																			</select>
																		</div>
																		<div className="md-form">
																			<i className = {this.state.current_state ? "fab fa-font-awesome-flag prefix active": "fab fa-font-awesome-flag prefix"}></i>
																			<input type="text" id="materialRegisterCurrentState" value={this.state.current_state}  name="current_state"   onChange={this.onChange} className="form-control"/>
																			<label htmlFor="materialRegisterCurrentState" class= {this.state.current_state ? "active required" : "required" }>State</label>
																		</div>
																		<div className="md-form">
																			<i className = {this.state.current_city ? "fas fa-city prefix active" : "fas fa-city prefix"} ></i>
																			<input type="text" id="materialRegisterFormCity" value={this.state.current_city} name="current_city"   onChange={this.onChange} className="form-control"/>
																			<label htmlFor="materialRegisterFormCity" class= {this.state.current_city ? "active required" : "required" }>City</label>
																		</div>
																		<div className="md-form">
																			<i className = {this.state.current_zipcode ? "fas fa-map-pin prefix active" : "fas fa-map-pin prefix "}></i>
																			<input type="text" id="materialRegisterFormPresentZipCod"  value={this.state.current_zipcode} name="current_zipcode"  onChange={this.onChange} className="form-control"/>
																			<label htmlFor="materialRegisterFormPresentZipCod" class= {this.state.current_zipcode ? "active" : "" }>Zip Code</label>
																		</div>
																	</div>
																	<div className="col">
																		<p className="cm-address">Permanent Address</p>
																		<div className="md-form">
																			<i className="fab fa-font-awesome-flag prefix"></i>
																			<span className="requiredStar">*</span>
																			<select className="browser-default custom-select profile-edit-common-select"  value ={this.state.permanent_country}   onChange={this.onChange} name="permanent_country">
																				<option defaultValue="">Select Country</option>
																				<option value="Afghanistan">Afghanistan</option>
																				<option value="Albania">Albania</option>
																				<option value="Algeria">Algeria</option>
																				<option value="Australia">Australia</option>
																				<option value="Bahrain">Bahrain</option>
																				<option value="Belgium">Belgium</option>
																				<option value="Bangladesh">Bangladesh</option>
																				<option value="Brazil">Brazil</option>
																				<option value="Canada">Canada</option>
																				<option value="Denmark">Denmark</option>
																				<option value="Finland">Finland</option>
																				<option value="France">France</option>
																				<option value="Germany">Germany</option>
																				<option value="Iceland">Iceland</option>
																				<option value="India">India</option>
																				<option value="Indonesia">Indonesia</option>
																				<option value="Iran">Iran</option>
																				<option value="Nepal">Nepal</option>
																				<option value="Netherlands">Netherlands</option>
																				<option value="North Korea">North Korea</option>
																				<option value="Norway">Norway</option>
																				<option value="South Africa">South Africa</option>
																				<option value="Norway">Norway</option>
																				<option value="Norway">Norway</option>
																			</select>
																		</div>
																		<div className="md-form">
																			<i className = {this.state.permanent_state ? "fab fa-font-awesome-flag prefix active" : "fab fa-font-awesome-flag prefix " }></i>
																			<input type="text" id="materialRegisterPermanentState"  name="permanent_state"  value ={this.state.permanent_state}  onChange={this.onChange} className="form-control"/>
																			<label htmlFor="materialRegisterPermanentState"  class= {this.state.permanent_state ? "active required" : "required" }>State</label>
																		</div>
																		<div className="md-form">
																			<i className= { this.state.permanent_city ?  "fas fa-city prefix active" : "fas fa-city prefix"}></i>
																			<input type="text" id="materialRegisterFormpermanentCity"  name="permanent_city" value ={this.state.permanent_city} onChange={this.onChange} className="form-control"/>
																			<label htmlFor="materialRegisterFormpermanentCity" class= {this.state.permanent_city ? "active required" : "required" }>City</label>
																		</div>
																		<div className="md-form">
																			<i className = { this.state.permanent_zipcode ? "fas fa-map-pin prefix active" : "fas fa-map-pin prefix"} ></i>
																			<input type="text" id="materialRegisterFormPermanentZipCod"  name="permanent_zipcode" value ={this.state.permanent_zipcode} onChange={this.onChange} className="form-control"/>
																			<label htmlFor="materialRegisterFormPermanentZipCod" class= {this.state.permanent_zipcode ? "active" : "" } >Zip Code</label>
																		</div>
																	</div>
																</div>
																<div className="text-center profile-edit-modal-btn">
																	<button type="submit" className="btn btn-success btn-rounded waves-effect waves-light" aria-label="Close">Update</button>
																	<button type="reset" className="btn btn-light btn-rounded waves-effect waves-light" data-dismiss="modal">Close</button>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingThree">
										<a href="# " className="btn btn-link common-user-ifo-btn collapsed waves-effect waves-light" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
											<p className="common-info-title">Carrer and Application Information</p>
										</a>
									</h4>
									<div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
										<div className="card-body">
											<div className="btn-wrapper">
												<div className="edit-btn" data-toggle="modal" data-target="#modal-carrer"><i className="fas fa-pencil-alt"></i></div>
											</div>
											<table className="table table-striped">
												<tbody>
													<tr>
														<td colspan="2">
															<p className="table-title">Objective</p>
															{this.state.objective}
														</td>
													</tr>
													<tr>
														<td colSpan="1">
															<p className="table-title">Present Salary</p>
															{this.state.present_salary}
														</td>
														<td>
															<p className="table-title">Expected Salary</p>
															{this.state.expected_salary}
														</td>
													</tr>
													<tr>
														<td colSpan="1">
															<p className="table-title">Looking for (Job Level)</p>
															{this.state.looking_for}
														</td>
														<td>
															<p className="table-title">Available for (Job Nature)</p>
															{this.state.avliable_for}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div className="modal fade" id="modal-carrer" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="card">
														<button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">×</span>
														</button>
														<h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Carrer and Application Information
														</h5>
														<div className="card-body px-lg-5 pt-0">
															<form onSubmit={this.onSubmitCareerDetails}  className="profile-edit-modal-form">
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-pencil-alt prefix"></i>
																			<textarea type="text" name="objective" value={ objective } onChange={this.onChange}   id="form10" className="md-textarea form-control" rows="3"></textarea>
																			<label htmlFor="form10" className="required">Objective</label>
																		</div>
																	</div>
																</div>
																<div className="form-row">
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-money-bill-alt prefix"></i>
																			<input type="text" name="present_salary" value={ present_salary } onChange={this.onChange}   id="materialEditFormPresentSalary" className="form-control"/>
																			<label htmlFor="materialEditFormPresentSalary" className="required">Present Salary</label>
																		</div>
																	</div>
																	<div className="col">
																		<div className="md-form">
																			<i className="fas fa-money-bill-alt prefix"></i>
																			<input type="text" name="expected_salary" value={ expected_salary } onChange={this.onChange} id="materialEditFormExpectedSalary" className="form-control"/>
																			<label htmlFor="materialEditFormExpectedSalary" className="required">Expected Salary</label>
																		</div>
																	</div>
																</div>
																<div className="form-row looking-for-job">
																	<div className="col">
																		<label className="required">Looking for (job level)</label>
																		<div className="tripleradio">
																			<div className="custom-control custom-radio custom-control-inline">
																				<input type="radio" name="looking_for" value= "Entry Level" onChange={this.onChange}  className="custom-control-input" id="defaultInlineCarrer1" />
																				<label className="custom-control-label" htmlFor="defaultInlineCarrer1">Entry Level</label>
																			</div>
																			<div className="custom-control custom-radio custom-control-inline">
																				<input type="radio" name="looking_for" value= "Mid Level" onChange={this.onChange} className="custom-control-input" id="defaultInlineCarrer2" />
																				<label className="custom-control-label" htmlFor="defaultInlineCarrer2">Mid Level</label>
																			</div>
																			<div className="custom-control custom-radio custom-control-inline">
																				<input type="radio" name="looking_for" value="Top Level" onChange={this.onChange} className="custom-control-input" id="defaultInlineCarrer3" />
																				<label className="custom-control-label" htmlFor="defaultInlineCarrer3">Top Level</label>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="form-row available-job-nature">
																	<div className="col">
																		<label className="required">Available for (job nature)</label>
																		<div className="tripleradio">
																			<div className="custom-control custom-radio custom-control-inline">
																				<input type="radio"  name="avliable_for" value="Full time" onChange={this.onChange} className="custom-control-input" id="defaultInlineFullTime" />
																				<label className="custom-control-label" htmlFor="defaultInlineFullTime">Full time</label>
																			</div>
																			<div className="custom-control custom-radio custom-control-inline">
																				<input type="radio"  name="avliable_for" value="Part time" onChange={this.onChange} className="custom-control-input" id="defaultInlinePartTime" />
																				<label className="custom-control-label" htmlFor="defaultInlinePartTime">Part time</label>
																			</div>
																			<div className="custom-control custom-radio custom-control-inline">
																				<input type="radio"  name="avliable_for" value="Contract" onChange={this.onChange} className="custom-control-input" id="defaultInlineContract" />
																				<label className="custom-control-label" htmlFor="defaultInlineContract">Contract</label>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="text-center profile-edit-modal-btn">
																	<button type="submit" className="btn btn-success btn-rounded waves-effect waves-light">Update</button>
																	<button type="button" className="btn btn-light btn-rounded waves-effect waves-light" data-dismiss="modal">Close</button>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="profile-just" role="tabpanel" aria-labelledby="profile-tab-just">
							<div id="accordion">
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingTraining1">
										<a  href="# " className="btn btn-link common-user-ifo-btn waves-effect waves-light" data-toggle="collapse" data-target="#collapseTraining1" aria-expanded="true" aria-controls="collapseTraining1">
											<p className="common-info-title">Academic Summary</p>
										</a>
									</h4>
									<div id="collapseTraining1" className="collapse show" aria-labelledby="headingTraining1" data-parent="#accordion">
										<div className="card-body academic-1">
											{ educationsSummery }
										</div>
										<button type="button" className="btn btn-primary btn-sm float-right add_new" data-toggle="modal" data-target="#addnew"><i className="fas fa-plus"></i>Add New</button>
										<div className="modal fade" id="addnew" tabIndex="-1" role="dialog" aria-labelledby="academic1eModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="card">
														<button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">×</span>
														</button>
														<h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Academic Qualification 
														</h5>
														<div className="card-body px-lg-5 pt-0">
															<EducationAdd/>
														</div>
													</div>
												</div>
											</div>
										</div>
										
									</div>
								</div>
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingTraining2">
										<a  href="# " className="btn btn-link common-user-ifo-btn collapsed waves-effect waves-light" data-toggle="collapse" data-target="#collapseTraining2" aria-expanded="false" aria-controls="collapseTraining2">
											<p className="common-info-title">Training Summary</p>
										</a>
									</h4>
									<div id="collapseTraining2" className="collapse" aria-labelledby="collapseTraining2heading" data-parent="#accordion">
										<div className="card-body">
											{ trainingSummery}
										</div>
										<button type="button" className="btn btn-primary btn-sm float-right add_new" data-toggle="modal" data-target="#addnewTraining"><i className="fas fa-plus"></i>Add New</button>
										<div className="modal fade" id="addnewTraining" tabIndex="-1" role="dialog" aria-labelledby="academicModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="card">
														<button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">×</span>
														</button>
														<h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Professional Training 
														</h5>
														<div className="card-body px-lg-5 pt-0">
															<TrainingAdd/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="profile-Training" role="tabpanel" aria-labelledby="profile-tab-Training">
							<div id="accordion">
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingEmp">
										<a href="# " className="btn btn-link common-user-ifo-btn waves-effect waves-light" data-toggle="collapse" data-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3">
											<p className="common-info-title">Employment History </p>
										</a>
									</h4>
									<div id="collapseOne3" className="collapse show" aria-labelledby="headingEmp" data-parent="#accordion">
										<div className="card-body experience-1">
											{employmentsSummery}
										</div>
										
										<button type="button" className="btn btn-primary btn-sm float-right add_new" data-toggle="modal" data-target="#employmentH1"><i className="fas fa-plus"></i>Add New</button>
										<div className="modal fade" id="employmentH1" tabindex="-1" role="dialog" aria-labelledby="academicModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="card">
														<button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
														</button>
														<h5 className="card-header profile-edit-modal-header white-text text-center gray-color"> Employment History 
														</h5>
														<div className="card-body px-lg-5 pt-0">
															<EmployeementAdd/>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer/>
</div>
        )
    }
}
export default withRouter(ProfileEdit);
