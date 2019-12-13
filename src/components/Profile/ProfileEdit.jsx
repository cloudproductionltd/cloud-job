import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import UserSidebar from './userSidebar';
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
import AddressAdd from './AddressAdd';
import UpdateCareerInfo from './UpdateCareerInfo';
import PersonalDetailsAdd from './PersonalDetailsAdd';
import Preferrence from './Preferrence';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const $ = window.$;

class ProfileEdit extends Component {    
	constructor(){
		super();

		this.selectChange = this.selectChange.bind(this)
		this.onChange = this.onChange.bind(this)
		this.dateChange = this.dateChange.bind(this)
		
		

		this.state = {
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
			birthDate: '',
			nationality:'',
			nationalId:'',
			OtherNationality:'',
			onlineInterview:'',
			bloodGroup:'',
			contactInfo:'',
			PersonalDescription:'',
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
			prefecture:'',
			permanent_country: '',
			permanentPrefecture:'',
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
			
	
			company_currently_working: true ,

			deletedata: '',
			DisapproveMassage:'',
			PendingForVerification:''
		}
	}
	
    onChange(e){
		this.setState({ [e.target.name]: e.currentTarget.value });
		console.log(this.state.gender);
	}


	dateChange(date){
		this.setState({
			birthDate: date
		});
	}
	selectChange(e){
		this.setState({ [e.target.name]: e.currentTarget.value });
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

	getdeletedEducationId = education_id => e => {
		e.preventDefault();
		this.setState({
			modal : 'education',
			education_id : education_id
		})

	}

	deleteEducationAction (e) {
	
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/delete-academic-info/${user_id}/${this.state.education_id}`,
                {

                },{headers: headers})
                .then((result) => {
					window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
					
					if ( result.data.response.user.educations.length == 0 ||  result.data.response.user.personal.firstName == null ){
						window.sessionStorage.setItem('allowForApply', 0);
					}else{
						window.sessionStorage.setItem('allowForApply', 1);
					}

                    this.setState({ user: result.data.response.user ,
									modal : '',
									modal: 'done'
                                })
                }).catch((error) =>{
                    this.setState({
                    
                    })
                });
	}

	deleteEmployeementAction(){
		var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
		var user_id = (window.sessionStorage.getItem('user_id'));
			Axios.put(`/users/delete-employments-info/${user_id}/${this.state.employeement_id}`,
			{

			},{headers: headers})
			.then((result) => {
				window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
				this.setState({ user: result.data.response.user ,
								modal : '',
								modal: 'done'
							})
			}).catch((error) =>{
				this.setState({
					show : false
				})
			});
	}

	getdeletedEmploymentId = employeement_id => e => {
		e.preventDefault();
		this.setState({
			modal : 'confirm',
			employeement_id : employeement_id
		})

	}


	getdeletedTrainingInfo =  training_id => e => {
		e.preventDefault();
		
		this.setState({
			modal : 'training',
			training_id : training_id
		})
	}

    deleteTrainingAction(e) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        // const { traning_year, traning_country, traning_title,  traning_topic, traning_institute, traning_duration,traning_location } = this.state;
        var user_id = (window.sessionStorage.getItem('user_id'));
        Axios.put(`/users/delete-training-info/${user_id}/${this.state.training_id}`,
                {
                },{headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
									modal : '',
									modal: 'done'
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

            let personalInfo = {}
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
						validEmailError : '',
					})

					
					this.setState({
						modal : 'success',
					})
					

					if ( result.data.response.user.educations.length == 0 ||  result.data.response.user.personal.firstName == null ){
						window.sessionStorage.setItem('allowForApply', 0);
					}else{
						window.sessionStorage.setItem('allowForApply', 1);
					}

					$('#personalDetails').modal('hide');
                })
                .catch((error) =>{

					if(error.response.data.items.alternetEmail){
						this.setState({
							validEmailError : 'Email must be valid '
						})
					}
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


		openModal(modal) {
			this.setState({
				modal : modal
			});
		
		}
		
		closeModal() {
			this.setState({
				modal : '',
			});
		}

		componentDidMount(){
			this.getData();
		}
	
		componentWillUnmount() {
			clearTimeout(this.intervalID);
		}

    getData = () =>{ 
		
        var user_id = (window.sessionStorage.getItem('user_id'));
        var token = (window.sessionStorage.getItem('cool-jwt'));
            Axios.get(`/users/${user_id}`,
            { headers: { Authorization: `${token}` }
            
            })
            .then(response => {
				console.log('dsjkfbjdbfkb',response.data.response.user)
                this.setState( 
                        { 
                            email :  response.data.response.user.local.email,
                            username : response.data.response.user.local.username,
                            firstName: response.data.response.user.personal.firstName,
                            lastName: response.data.response.user.personal.lastName,
							middleName: response.data.response.user.personal.middleName,
							OtherNationality: response.data.response.user.personal.OtherNationality,
                            fatherName: response.data.response.user.personal.fatherName,
                            motherName: response.data.response.user.personal.motherName,
                            gender: response.data.response.user.personal.gender,
                            religion: response.data.response.user.personal.religion,
                            maritualStatus: response.data.response.user.personal.maritualStatus,
                            birthDate: response.data.response.user.personal.birthDate? new Date(response.data.response.user.personal.birthDate): '',
                            nationality: response.data.response.user.personal.nationality,
							contactInfo: response.data.response.user.personal.contact,
							onlineInterview: response.data.response.user.personal.onlineInterview,
							OnlineInterviewTools :response.data.response.user.personal.OnlineInterviewTools,
							alternetEmail:  response.data.response.user.personal.alternetEmail,
                            emergencyContact: response.data.response.user.personal.alternetEmail,
                            nationalId: response.data.response.user.personal.nationalId,
                            bloodGroup: response.data.response.user.personal.bloodGroup,
							PersonalDescription: response.data.response.user.personal.PersonalDescription,
                            ////career information
                            objective: response.data.response.user.careear ? response.data.response.user.careear.objective:'',
                            present_salary: response.data.response.user.careear ? response.data.response.user.careear.present_salary :'',
                            expected_salary: response.data.response.user.careear ? response.data.response.user.careear.expected_salary :'',
                            looking_for: response.data.response.user.careear ? response.data.response.user.careear.looking_for:'',
                            avliable_for: response.data.response.user.careear? response.data.response.user.careear.avliable_for:'',
                
                            ////address info
                            current_country : response.data.response.user.address ? response.data.response.user.address.current_country :'',
							current_zipcode: response.data.response.user.address ? response.data.response.user.address.current_zipcode :'',
							prefecture : response.data.response.user.address ? response.data.response.user.address.prefecture :'',
                            current_state: response.data.response.user.address ? response.data.response.user.address.current_state :'',
                            current_city: response.data.response.user.address ? response.data.response.user.address.current_city :'',
                            permanent_country: response.data.response.user.address ? response.data.response.user.address.permanent_country :'',
                            permanent_state: response.data.response.user.address ? response.data.response.user.address.permanent_state :'',
                            permanent_city: response.data.response.user.address ? response.data.response.user.address.permanent_city :'',
                            permanent_zipcode: response.data.response.user.address ?response.data.response.user.address.permanent_zipcode :'',
							permanentPrefecture : response.data.response.user.address ? response.data.response.user.address.permanentPrefecture:'',

							currentAddressDetails : response.data.response.user.address ? response.data.response.user.address.currentAddressDetails :'',
							permanentAddressDetails: response.data.response.user.address ? response.data.response.user.address.permanentAddressDetails :'',
							//// Preference
							desired_Designation : response.data.response.user.preference? response.data.response.user.preference.desired_Designation :'',
							Industry: response.data.response.user.preference ? response.data.response.user.preference.Industry :'',
							carrerlevel : response.data.response.user.preference ? response.data.response.user.preference.carrerlevel :'',
							job_type : response.data.response.user.preference ?  response.data.response.user.preference.job_type :'',
							salary: response.data.response.user.preference ?  response.data.response.user.preference.salary :'',
							desired_start_date : response.data.response.user.preference ?  response.data.response.user.preference.desired_start_date :'',
							typeOfEmployee : response.data.response.user.preference ? response.data.response.user.preference.typeOfEmployee :'',
						
						    educations: response.data.response.user.educations ? response.data.response.user.educations:'',
							employments : response.data.response.user.employments ? response.data.response.user.employments :'',


							DisapproveMassage: response.data.response.user.disapprovereport ,
							PendingForVerification : response.data.response.user.adminVerificationforUser,
							
						})
						this.intervalID = setTimeout(this.getData.bind(this), 5000);
					})
            .catch(error => {
                console.log('error',error)
            })
	}

	setNavbar(value){

		window.sessionStorage.setItem('navbarActive', value);
	}

	setSideNavbar(value){
		window.sessionStorage.setItem('subNavbarActive', value);
	}

    closeModal() {
        this.setState({
            modal : '',
		});
		window.location.reload()
    }

    render() {

		
        let navbarActiveData = window.sessionStorage.getItem('navbarActive');
		let subNavbarActiveStatus = window.sessionStorage.getItem('subNavbarActive');

		window.sessionStorage.setItem('adminVerificationForJobseeker', this.state.PendingForVerification)

		
		let educations = this.state.educations
		let educationsSummery
		if ( educations.length == 0 ){
			educationsSummery =  <div className="card-body academic-1">
                <div className="btn-wrapper">
                    {/* <div className="edit-btn" data-toggle="modal" data-target={'#' + } ><i className="fas fa-pencil-alt"></i></div>
                    <div className="delete-btn" onClick ={ this.deleteEducation()}><i className="fas fa-trash-alt"></i>
				
                    </div> */}
                </div>
                {/* <h5 className="training-title">Academic </h5> */}
                <table className="table table-striped academic-1-table">
                    <tbody>
						<tr>
							<td colSpan="2">
                                <p className="table-title">Latest Degree Title</p>
                            </td>
                        </tr>
                        <tr>
					    	<td>
                                <p className="table-title">Result</p>
                            </td>
                            <td>
                                <p className="table-title">Passing Year</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="table-title">Institute Name</p>
                            </td>
                            <td>
                                <p className="table-title">Duration</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="table-title">Language Ability</p>
                            </td>
							<td>
                                <p className="table-title">Score</p>
                            </td>
                        </tr>
						<tr>
                            <td>
                                <p className="table-title">Level</p>
                            </td>
							<td>
                                <p className="table-title">Certificate</p>
                            </td>
                        </tr>
						<tr>
                            <td>
                                <p className="table-title">Certified</p>
                            </td>
							<td>
                                <p className="table-title">Year Of Achieved</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
		}else{
			educationsSummery = educations.map((education,i) =>
			<div>
				<EducationUpdate education = {education}/>
				<div className="card-body academic-1">
					<div className="btn-wrapper">
						<div className="edit-btn" data-toggle="modal" data-target={'#' + education._id} ><i className="fas fa-pencil-alt"></i></div>
						<div className="delete-btn" onClick ={ this.getdeletedEducationId(education._id)}><i className="fas fa-trash-alt"></i>
					
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
									<p className="table-title">Passing Year</p>
									{education.passingYear}
								</td>
								
							</tr>
							<tr>
								<td>
									<p className="table-title">Institute Name</p>
									{education.institute}
								</td>
								<td>
									<p className="table-title">Duration</p>
									{education.duration}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">language ability</p>
									{education.language_ability}
								</td>
								<td>
									<p className="table-title">score</p>
									{education.score}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Level</p>
									{education.level}
								</td>
								<td>
									<p className="table-title">Certificate</p>
									
									{education.course_title}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Certified</p>
									
									{education.certified}
								</td>
								<td>
									<p className="table-title">Year Of Achieved</p>
									{education.achievedYear}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			)
		}
        

		
		let employments = this.state.employments
		let employmentsSummery
		if ( employments.length == 0 ){
			employmentsSummery = <div>
					<div className="btn-wrapper">
					</div>
				
					<table className="table table-striped employment-table-1">
						<tbody>
							<tr>
								<td>
									<p className="table-title">Types Of Employment</p>
								</td>
								<td>
									<p className="table-title">Designation</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Industry</p>
									
								</td>
								<td>
									<p className="table-title">Job Category</p>
									
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Carrer Level</p>
									
								</td>
								<td>
									<p className="table-title">Company Name</p>
									
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">C Worked In</p>
									
								</td>
								<td>
									<p className="table-title">Location Of HQ</p>
									
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Start date</p>
									<span className="table-title">Form :</span> 
								</td>
								<td>
									<p className="table-title">End date</p>
									<span className="table-title">To :</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
		}else{
		employmentsSummery = employments.map((employment,i) => 
			    <div>
					<EmployeementUpdate  employment={employment }/>
					<div className="btn-wrapper">
						<div className="edit-btn" data-toggle="modal" data-target={'#' +employment._id}><i className="fas fa-pencil-alt"></i></div>
						<div className="delete-btn" onClick ={ this.getdeletedEmploymentId(employment._id)}><i className="fas fa-trash-alt"></i>
						</div>
					</div>
					<h5 className="employment-title">Employment { i + 1}</h5>
					<table className="table table-striped employment-table-1">
						<tbody>
							<tr>
								<td>
									<p className="table-title">Types Of Employment</p>
									
									{employment.typeOfEmployee}
								</td>
								<td>
									<p className="table-title">Designation</p>
									{employment.designation}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Industry</p>
									{employment.Industry}
								</td>
								<td>
									<p className="table-title">Job Category</p>
									
									{employment.job_type}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Carrer Level</p>
									{employment.carrerlevel}
								</td>
								<td>
									<p className="table-title">Company Name</p>
									{employment.name}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Currently Worked In</p>
									{employment.currentlyWorkOnCompanyBarch}
								</td>
								<td>
									<p className="table-title">Location Of HQ</p>
									{employment.location}
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title">Start date</p>
									<span className="table-title">From :</span> {employment.start_date ?new Date(employment.start_date).toLocaleDateString():''} 
								</td>
								<td>
									<p className="table-title">End date</p>
									<span className="table-title">To :</span> {employment.end_date ?new Date(employment.end_date).toLocaleDateString():''}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
            )
		}
		
		
		////////// For employeement

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
                                
										<TrainingUpdate  training={training}/>
								
                                <div className="btn-wrapper">
                                    <div className="edit-btn" data-toggle="modal" data-target={'#' +training._id}><i className="fas fa-pencil-alt"></i></div>
                                    <div className="delete-btn" onClick ={ this.getdeletedTrainingInfo(training._id)} ><i className="fas fa-trash-alt"></i>
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
                end_date, currently_working, objective, present_salary, expected_salary,OnlineInterviewTools,
                looking_for, avliable_for , address, validEmailError
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
				<UserSidebar/>
			</div>
			<div className="col-md-9 col-sm-12">
				<div className="card right-resume-edit-wrapper infOfUsers">
					<div className="card-header infOfUsers-cHeader">
						<h5>User Information</h5>
					</div>
                    <div className="card-body">
						<div className="top-inst">
							<p>Here you can edit your resume in three different steps (Personal, Education/ Training & Employment). To enrich your resume provide authentic information. </p>
						</div>
						<nav aria-label="breadcrumb" className="proeditBreadcumb">
							<ol className="breadcrumb resume-breadcumb-wrapper">
								<li className="breadcrumb-item"><a href="# ">Home</a></li>
								<li className="breadcrumb-item active">Edit Resume</li>
							</ol>
							<div className="egbtnWrap" align="right">
								<button type="button" className="btn btn-primary btn-rounded btn-sm" data-toggle="tooltip" data-placement="top" title="Download">English</button>
								<button type="button" className="btn btn-secondary btn-rounded btn-sm" data-toggle="tooltip" data-placement="top" title="Download">Japanese</button>
							</div>

						</nav>
						<ul className="nav nav-tabs nav-justified md-tabs resume-tab-wrapper" id="myTabJust" role="tablist">
							<li className="nav-item waves-effect waves-light">
								<a className={ navbarActiveData === 'Personal' ? "nav-link active" :"nav-link"} id="home-tab-just" data-toggle="tab" href="#home-just" role="tab" aria-controls="home-just" aria-selected="true" onClick ={() => this.setNavbar('Personal')}>Personal</a>
							</li>
							<li className="nav-item waves-effect waves-light">
								<a className={ navbarActiveData === 'Education' ? "nav-link active" :"nav-link"} id="profile-tab-just" data-toggle="tab" href="#profile-just" role="tab" aria-controls="profile-just" aria-selected="false" onClick={() => this.setNavbar('Education')}>Education/Training</a>
							</li>
							<li className="nav-item waves-effect waves-light">
								<a className={ navbarActiveData === 'Employment' ? "nav-link active" :"nav-link"} id="profile-tab-Training" data-toggle="tab" href="#profile-Training" role="tab" aria-controls="profile-Training" aria-selected="false"  onClick={() =>this.setNavbar('Employment')}>Employment/Preferrence</a>
							</li>
						</ul>
					<div className="tab-content resume-tab-content card" id="myTabContentJust">
						<div className={ navbarActiveData === 'Personal' ? "tab-pane fade show active" :"tab-pane fade"} id="home-just" role="tabpanel" aria-labelledby="home-tab-just">
							<div id="accordion">
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingPersonal">
										<a href="# " className="btn btn-link common-user-ifo-btn" data-toggle="collapse" data-target="#collapsePersonal" aria-expanded="true" aria-controls="collapsePersonal" onClick={() =>this.setSideNavbar('Personal Details')} >
											<p className="common-info-title">Personal Details</p>
										</a>
									</h4>
									<div id="collapsePersonal" className={subNavbarActiveStatus === "Personal Details" ? "collapse show" :"collapse"} aria-labelledby="headingPersonal" data-parent="#accordion">
										<div className="card-body">
											<div className="btn-wrapper">
												<div className="edit-btn" data-toggle="modal" data-target="#personalDetails"><i className="fas fa-pencil-alt"></i></div>
											</div>
											<table className="table table-striped">
												<tbody>
													<tr>
														<td>
															<p className="table-title">Name</p>
															{this.state.firstName} {this.state.middleName} {this.state.lastName}
														</td>
														<td>
															<p className="table-title">Date Of Birth</p>
															{ this.state.birthDate ? new Date(this.state.birthDate).toLocaleDateString():'' }
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Nationality</p>
															{this.state.nationality}
														</td>
													    <td>
															<p className="table-title">Other Nationality</p>
															{this.state.OtherNationality}
														</td>
														{/* <td>
															<p className="table-title">National Id No</p>
															{this.state.nationalId}
														</td> */}
													</tr>
													<tr>
														<td>
														<p className="table-title">Date of Birth </p>
															{ this.state.birthDate ? new Date(this.state.birthDate).toLocaleDateString():'' }
														</td>
														<td>
															<p className="table-title">Contact No</p>
															{this.state.contactInfo}
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
														<td>
															<p className="table-title">Online Interview</p>
															{this.state.onlineInterview =='yes' ? 'yes': 'no'}
														</td>
														<td>
															<p className="table-title">Online Interview Tools</p>
															<span>{this.state.OnlineInterviewTools }</span>
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Permission to work in abroad</p>
															<span>Yes</span>
															
														</td>
														<td>
															<p className="table-title">Personal Description</p>
															 {this.state.PersonalDescription}
														</td>
													</tr>
												</tbody>
											</table>
										</div>

                                        <PersonalDetailsAdd/>
										
									</div>
								</div>
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingTwo">
										<a href="# " className="btn btn-link common-user-ifo-btn collapsed waves-effect waves-light" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" onClick={() =>this.setSideNavbar('Address Details')} aria-controls="collapseTwo">
											<p className="common-info-title">Address Details</p>
										</a>
									</h4>
									<div id="collapseTwo" className={subNavbarActiveStatus === "Address Details" ? "collapse show" :"collapse"} aria-labelledby="collapseTwo" data-parent="#accordion">
										<div className="card-body" >
											<div className="btn-wrapper">
												<div className="edit-btn" data-toggle="modal" data-target="#modal-one"><i className="fas fa-pencil-alt"></i></div>
											</div>
											<table className="table table-striped">
												<thead>
													<tr>
														<td><b>Current Address</b></td>
														<td><b>Permanent Address</b></td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<span className="address-commonspan"><b>Country :</b>{this.state.current_city}</span><br/>
														</td>
														<td>
														<span className="address-commonspan"><b>Country :</b> {this.state.permanent_city}</span> 
														</td>
													</tr>
													<tr>
														<td>
															<span className="address-commonspan"><b>Region :</b>  {this.state.current_country}</span> <br/>
														</td>
														<td>
														<span className="address-commonspan"><b>Region :</b>  {this.state.permanent_country}</span> <br/>
														</td>
													</tr>
													<tr>
														<td>
															<span className="address-commonspan"><b>Prefecture :</b> {this.state.prefecture}</span> <br/>
														</td>
														<td>
															<span className="address-commonspan"><b>Prefecture :</b> {this.state.permanentPrefecture}</span> <br/>
														</td>
													</tr>

													
													<tr>
														<td>
															<span className="address-commonspan"><b>Current Address Details :</b> {this.state.currentAddressDetails}</span> <br/>
														</td>
														{/* <td>
															<span className="address-commonspan"><b>Permanent Address Details :</b> {this.state.permanentAddressDetails}</span> <br/>
														</td> */}
													</tr>
													
												</tbody>
											</table>
										</div>
										<AddressAdd/>
									</div>
								</div>
								
							</div>
						</div>
						<div className= { navbarActiveData === 'Education' ? "tab-pane fade show active" :"tab-pane fade"}  id="profile-just" role="tabpanel" aria-labelledby="profile-tab-just">
							<div id="accordion">
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingTraining1">
										<a href="# " className="btn btn-link common-user-ifo-btn" data-toggle="collapse" data-target="#collapseTraining1" aria-expanded="true" onClick={() =>this.setSideNavbar('Academic Summary')} aria-controls="collapseTraining1">
											<p className="common-info-title">Academic Summary And Training</p>
										</a>
									</h4>
									<div id="collapseTraining1" className={subNavbarActiveStatus === "Academic Summary" ? "collapse show" :"collapse"} aria-labelledby="headingTraining1" data-parent="#accordion">
										
											{ educationsSummery }
										
										<button type="button" className="btn btn-primary btn-sm float-right add_new" data-toggle="modal" data-target="#addnew"><i className="fas fa-plus"></i>Add New</button>
										<EducationAdd/>
									</div>
								</div>
								
							</div>
						</div>
						<div className= { navbarActiveData === 'Employment' ? "tab-pane fade show active" :"tab-pane fade"}  id="profile-Training" role="tabpanel" aria-labelledby="profile-tab-Training">
							<div id="accordion">
								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingEmp">
										<a href="# " className="btn btn-link common-user-ifo-btn" data-toggle="collapse" data-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3">
											<p className="common-info-title">Employment History </p>
										</a>
									</h4>
									<div id="collapseOne3" className="collapse show" aria-labelledby="collapseOne3" data-parent="#accordion">
										<div className="card-body experience-1">
											{employmentsSummery}
										</div>
										
										<button type="button" className="btn btn-primary btn-sm float-right add_new" data-toggle="modal" data-target="#employmentH1"><i className="fas fa-plus"></i>Add New</button>
										    <EmployeementAdd/>
										
									</div>
								</div>


								<div className="card common-card">
									<h4 className="panel-title card-header common-card-header" id="headingPreferrence">
										<a href="# " className="btn btn-link common-user-ifo-btn waves-effect waves-light" data-toggle="collapse" data-target="#preference1" aria-expanded="false" onClick={() =>this.setSideNavbar('Preference')} aria-controls="preference1">
											<p className="common-info-title">Preference Details</p>
										</a>
									</h4>
									<div id="preference1" className={subNavbarActiveStatus === "Preference" ? "collapse show" :"collapse"} aria-labelledby="headingPreferrence" data-parent="#accordion">
										<div className="card-body">
											<div className="btn-wrapper">
												<div className="edit-btn" data-toggle="modal" data-target="#preference"><i className="fas fa-pencil-alt"></i></div>
											</div>
											<table className="table table-striped">
												<tbody>
													<tr>
														<td colspan="2">
															<p className="table-title">Types Of Employment</p>
														    {this.state.typeOfEmployee}
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Desired Designation</p>
															{this.state.desired_Designation} 
														</td>
														<td>
															<p className="table-title">Industry</p>
															{this.state.Industry}
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Desired Carrer Level</p>
															{this.state.carrerlevel}
														</td>
														<td>
															<p className="table-title">job Category</p>
															{this.state.job_type}
														</td>
													</tr>
													<tr>
														<td>
															<p className="table-title">Desired Salary</p>
															
															{this.state.salary}
														</td>
														<td>
															<p className="table-title">Desired Start Date</p>
															{this.state.desired_start_date}
														</td>
													</tr>
													
												</tbody>
											</table>
										</div>

										<Preferrence/>
									</div>
								</div>

								
							</div>
							
						</div>
					</div>
					</div>
				</div>
				<br/>

                {
					(this.state.DisapproveMassage) ? 
					<div class="alert alert-danger">
						<strong>Disapproval massage  :  {this.state.DisapproveMassage} </strong> 
					</div> :''
				}
				
				
				{
					(this.state.PendingForVerification == 0 && this.state.DisapproveMassage == null) ? 
					<div class="alert alert-info">
						<strong> Your profile is pending now for admin approval  </strong> 
					</div> :''
				}
				
			</div>
			
		</div>
		
	</div>
	<Footer/>


	            <Modal visible={ this.state.modal == 'success' ? true : false}>
                    <div className="card">
                        <div className="alert alert-success user-success-message">
							<strong>Personal Details saved successfully!</strong>  
							<button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
								<span aria-hidden="true">&times;</span>
							</button> 
						</div>
                    </div>
                </Modal>

				<Modal visible={ this.state.modal == 'confirm' ? true : false} className="sureModal">
				<div className="modal-content">
						<div className="modal-body">
						<i className="fas fa-exclamation-circle"></i>
						
							<p className="sureAsk-text">Are you sure?</p>
							<p align="center">You will not be able to recover this.</p>
							<div className="row">
								<div className="col-12 text-center">
									<button className="btn btn-success btn-md sureAsk-btn" onClick={() => this.deleteEmployeementAction()}>Yes</button>
									<button className="btn btn-danger btn-md sureAsk-btn" onClick={() => this.closeModal()}>No</button>
								</div>
							</div>
						</div>
						</div>
				</Modal>


				<Modal visible={ this.state.modal == 'education' ? true : false} className="sureModal">
					
					<div className="modal-content">
						<div className="modal-body">
						<i className="fas fa-exclamation-circle"></i>
							<p className="sureAsk-text">Are you sure?</p>
							<p align="center">You will not be able to recover this.</p>
							<div className="row">
								<div className="col-12 text-center">
									<button className="btn btn-success btn-md sureAsk-btn" onClick={() => this.deleteEducationAction()}>Yes</button>
									<button className="btn btn-danger btn-md sureAsk-btn" onClick={() => this.closeModal()}>No</button>
								</div>
							</div>
						</div>
						</div>
					
					
                </Modal>

				<Modal visible={ this.state.modal == 'training' ? true : false} className="sureModal">
					<div className="modal-content">
						<div className="modal-body">
							<i className="fas fa-exclamation-circle"></i>
							<p className="sureAsk-text">Are you sure?</p>
							<p align="center">You will not be able to recover this.</p>
							<div className="row">
								<div className="col-12 text-center">
									<button className="btn btn-success btn-md sureAsk-btn" onClick={() => this.deleteTrainingAction()}>Yes</button>
									<button className="btn btn-danger btn-md sureAsk-btn" onClick={() => this.closeModal()}>No</button>
								</div>
							</div>
						</div>
					</div>
                </Modal>

				

				<Modal visible={ this.state.modal == 'done' ? true : false} className="">
                    <div className="card">
						<div className="alert alert-success user-success-message">
							<strong>Your action successfull!</strong>   
							<button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
                    </div>
                </Modal>

        </div>
        )
    }
}
export default withRouter(ProfileEdit);
