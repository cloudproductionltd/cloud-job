import React, { Component } from 'react';
import ProfileIntro from './ProfileIntro';
import ProfileSubheader from './ProfileSubheader';
import ProfileMenu from './ProfileMenu';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import Axios from 'axios'
class ProfileOfUsers extends Component {

	constructor(props) {
		super(props);

		// this.state = {
		//     id:''
		// }

	}

	state = {
		user: null,
		employments: '',
		address: '',
		careear: '',
		educations: [],
		trainings: [],
		employeements: [],
		propsUser_id:''
	}


	componentDidMount() {

		const { match: { params } } = this.props;

		// window.sessionStorage.setItem('useridforgettingdetails', params.id);

		// const data = params.id
		// this.setState({
		//     id:params.id
		// });


		let user_id = params.id;
		this.setState({
			propsUser_id :user_id
		})
		console.log('user_iddddd', user_id)
		Axios.get(`/users/${user_id}`)
			//Axios.get(`https://cloudjobs.herokuapp.com/users/${user_id}`)
			.then(response => {

				this.setState({
					user: response.data.response.user,
					employments: response.data.response.user.employments,
					address: response.data.response.user.address,
					createdat: response.data.response.user.createdAt
				})


			})
			.catch(error => {
			})



		let user_id_2 = params.id;
		Axios.get(`/users/${user_id_2}`)
			//Axios.get(`https://cloudjobs.herokuapp.com/users/${user_id}`)
			.then(response => {
				console.log('res', response.data.response.user.trainings)
				this.setState({
					email: response.data.response.user.local.email,
					username: response.data.response.user.local.username,
					firstName: response.data.response.user.personal.firstName,
					lastName: response.data.response.user.personal.lastName,
					middleName: response.data.response.user.personal.middleName,
					OtherNationality: response.data.response.user.personal.OtherNationality,
					fatherName: response.data.response.user.personal.fatherName,
					motherName: response.data.response.user.personal.motherName,
					gender: response.data.response.user.personal.gender,
					religion: response.data.response.user.personal.religion,
					maritualStatus: response.data.response.user.personal.maritualStatus,
					birthDate: response.data.response.user.personal.birthDate ? new Date(response.data.response.user.personal.birthDate) : '',
					nationality: response.data.response.user.personal.nationality,
					contactInfo: response.data.response.user.personal.contact,
					onlineInterview: response.data.response.user.personal.onlineInterview,
					OnlineInterviewTools: response.data.response.user.personal.OnlineInterviewTools,
					alternetEmail: response.data.response.user.personal.alternetEmail,
					emergencyContact: response.data.response.user.personal.alternetEmail,
					nationalId: response.data.response.user.personal.nationalId,
					bloodGroup: response.data.response.user.personal.bloodGroup,
					PersonalDescription: response.data.response.user.personal.PersonalDescription,
					////career information
					objective: response.data.response.user.careear ? response.data.response.user.careear.objective : '',
					present_salary: response.data.response.user.careear ? response.data.response.user.careear.present_salary : '',
					expected_salary: response.data.response.user.careear ? response.data.response.user.careear.expected_salary : '',
					looking_for: response.data.response.user.careear ? response.data.response.user.careear.looking_for : '',
					avliable_for: response.data.response.user.careear ? response.data.response.user.careear.avliable_for : '',

					////address info
					current_country: response.data.response.user.address ? response.data.response.user.address.current_country : '',
					current_zipcode: response.data.response.user.address ? response.data.response.user.address.current_zipcode : '',
					prefecture: response.data.response.user.address ? response.data.response.user.address.prefecture : '',
					current_state: response.data.response.user.address ? response.data.response.user.address.current_state : '',
					current_city: response.data.response.user.address ? response.data.response.user.address.current_city : '',
					permanent_country: response.data.response.user.address ? response.data.response.user.address.permanent_country : '',
					permanent_state: response.data.response.user.address ? response.data.response.user.address.permanent_state : '',
					permanent_city: response.data.response.user.address ? response.data.response.user.address.permanent_city : '',
					permanent_zipcode: response.data.response.user.address ? response.data.response.user.address.permanent_zipcode : '',
					permanentPrefecture: response.data.response.user.address ? response.data.response.user.address.permanentPrefecture : '',

					currentAddressDetails: response.data.response.user.address ? response.data.response.user.address.currentAddressDetails : '',
					permanentAddressDetails: response.data.response.user.address ? response.data.response.user.address.permanentAddressDetails : '',
					//// Preference
					desired_Designation: response.data.response.user.preference ? response.data.response.user.preference.desired_Designation : '',
					Industry: response.data.response.user.preference ? response.data.response.user.preference.Industry : '',
					carrerlevel: response.data.response.user.preference ? response.data.response.user.preference.carrerlevel : '',
					job_type: response.data.response.user.preference ? response.data.response.user.preference.job_type : '',
					salary: response.data.response.user.preference ? response.data.response.user.preference.salary : '',
					desired_start_date: response.data.response.user.preference ? response.data.response.user.preference.desired_start_date : '',
					typeOfEmployee: response.data.response.user.preference ? response.data.response.user.preference.typeOfEmployee : '',

					educations: response.data.response.user.educations ? response.data.response.user.educations : '',
					employments: response.data.response.user.employments ? response.data.response.user.employments : '',


					DisapproveMassage: response.data.response.user.disapprovereport,
					PendingForVerification: response.data.response.user.adminVerificationforUser,
				})
			})
			.catch(error => {
			})
	}





	render() {

		var userCreatedAt = new Date(this.state.createdat).toLocaleDateString()
		let { employments } = this.state

		let showEmployments
		if (employments && employments.length) {
			showEmployments = <div>
				<span className="font-weight-medium"><i> {this.state.user && this.state.user.employments && this.state.user.employments[0].company && this.state.user.employments[0].company.designation}</i></span>
				<p className="member-mail"><b>Email:</b> {this.state.user && this.state.user.employments && this.state.user.employments[0].company && this.state.user.employments[0].company.designation}{this.state.user && this.state.user.local && this.state.user.local.email}</p>
			</div>
		} else {
			showEmployments = <div></div>
		}

		let { address } = this.state
		let showAddress
		if (address) {
			showAddress = <div><b>Current Address: </b><p className="d-inline-block pComAddress">  {address.current_city} , {address.current_country}, {address.current_state},  {address.current_zipcode}   </p>  <br />
				<b>Permanent Address: </b><p className="d-inline-block pComAddress">  {address.permanent_city} , {address.permanent_country}, {address.permanent_state} , {address.permanent_zipcode}   </p>
			</div>
		} else {
			showAddress = <p className="d-inline-block">Current Address:  <br />Permanent Address:</p>
		}




		let { careear } = this.state
		let careear_objective
		if (careear) {
			careear_objective = <div>
				<p>{careear.objective}</p>
			</div>
		} else {
			careear_objective = <div>

			</div>
		}



		let { trainings } = this.state

		let trainingsSummery = trainings.map((training) =>
			<div className="edu-history">
				<i className="fas fa-chalkboard-teacher"></i>
				<div className="edu-hisinfo">
					<h3><strong>Training Title: </strong>{training.topic}</h3>
					<span><b>Training Title: </b>{training.title}</span>
					<span><b>Training Institute: </b>{training.institute} </span>
					<span><b>Passing Year: </b>{training.year}</span>
					<span><b>location: </b>{training.location}</span>
				</div>
			</div>
		)

		// let { employeements } = this.state
		// let employmentsSummery = employeements.map((employment) =>
		//     <div className="edu-history">
		//                 <i className="fas fa-user-tie"></i>
		//                 <div className="edu-hisinfo">
		//                     <h3><strong>Company Name: { employment.name}</strong></h3>
		//                     <span><b>Company Type: </b>{employment.type}</span>
		//                     <span><b>Company Location: </b>{employment.location} </span>
		//                     <span><b>Employment period: </b></span>
		//                     <span><b>From: </b>{ new Date(employment.start_date).toLocaleDateString() }</span> 
		//                     <span><b>To: </b>{ employment.currently_working ? new Date(employment.end_date).toLocaleDateString() :'Till now'}</span>
		//                     <span><b>Responsibilities: </b>{employment.responsibilities}</span>
		//                 </div>
		//             </div>
		// )

		// let employments = this.state.employments
		let employmentsSummery
		if (employments.length == 0) {
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
		} else {
			employmentsSummery = employments.map((employment, i) =>
				<div>
					{/* <EmployeementUpdate  employment={employment }/> */}
					<div className="btn-wrapper">

					</div>
					<h2 className="employment-title">Employment {i + 1}</h2>
					<table className="table table-striped employment-table-1">
						<tbody>
							<tr>
								<td>
									<p className="table-title d-inline pr-2">Types Of Employment:</p>

									<p className="d-inline">{employment.typeOfEmployee}</p>
								</td>
								<td>
									<p className="table-title d-inline pr-2">Designation:</p>
									<p className="d-inline">{employment.designation}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title d-inline pr-2">Industry:</p>
									<p className="d-inline">{employment.Industry}</p>
								</td>
								<td>
									<p className="table-title d-inline pr-2">Job Category:</p>

									<p className="d-inline">{employment.job_type}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title d-inline pr-2">Carrer Level:</p>
									<p className="d-inline">{employment.carrerlevel}</p>
								</td>
								<td>
									<p className="table-title d-inline pr-2">Company Name:</p>
									<p className="d-inline">{employment.name}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title d-inline pr-2">Currently Worked In:</p>
									<p className="d-inline">{employment.currentlyWorkOnCompanyBarch}</p>
								</td>
								<td>
									<p className="table-title d-inline pr-2">Location Of HQ:</p>
									<p className="d-inline">{employment.location}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="table-title d-inline pr-2">Start From:</p>
									<p className="d-inline">{employment.start_date ? new Date(employment.start_date).toLocaleDateString() : ''}</p>
								</td>
								<td>
									<p className="table-title d-inline pr-2">End To:</p>
									<p className="d-inline">{employment.end_date ? new Date(employment.end_date).toLocaleDateString() : ''}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)
		}


		let educations = this.state.educations
		let educationsSummery
		if (educations.length == 0) {
			educationsSummery = <div className="academic-1">
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
								<p className="table-title">Latest Degree Title:</p>
							</td>
						</tr>
						<tr>
							<td>
								<p className="table-title">Result:</p>
							</td>
							<td>
								<p className="table-title">Passing Year:</p>
							</td>
						</tr>
						<tr>
							<td>
								<p className="table-title">Institute Name:</p>
							</td>
							<td>
								<p className="table-title">Duration:</p>
							</td>
						</tr>
						<tr>
							<td>
								<p className="table-title">Language Ability:</p>
							</td>
							<td>
								<p className="table-title">Score:</p>
							</td>
						</tr>
						<tr>
							<td>
								<p className="table-title">Level:</p>
							</td>
							<td>
								<p className="table-title">Certificate:</p>
							</td>
						</tr>
						<tr>
							<td>
								<p className="table-title">Certified:</p>
							</td>
							<td>
								<p className="table-title">Year of Achieved:</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		} else {
			educationsSummery = educations.map((education, i) =>
				<div>
					{/* <EducationUpdate education = {education}/> */}
					<div className="academic-1">
						<div className="btn-wrapper">


						</div>
						<h5 className="training-title">Academic {i + 1}</h5>
						<table className="table table-striped academic-1-table">
							<tbody>

								<tr>
									<td colspan="2">
										<p className="table-title d-inline pr-2">Exam/Degree Title:</p>
										<p className="d-inline">{education.degree}</p>
									</td>
								</tr>
								<tr>
									<td>
										<p className="table-title d-inline pr-2">Result:</p>
										<p className="d-inline">{education.result}</p>
									</td>
									<td>
										<p className="table-title d-inline pr-2">Passing Year:</p>
										<p className="d-inline">{education.passingYear}</p>
									</td>

								</tr>
								<tr>
									<td>
										<p className="table-title d-inline pr-2">Institute Name:</p>
										<p className="d-inline">{education.institute}</p>
									</td>
									<td>
										<p className="table-title d-inline pr-2">Duration:</p>
										<p className="d-inline">{education.duration}</p>
									</td>
								</tr>
								<tr>
									<td>
										<p className="table-title d-inline pr-2">Language Ability:</p>
										<p className="d-inline">{education.language_ability}</p>
									</td>
									<td>
										<p className="table-title d-inline pr-2">Score:</p>
										<p className="d-inline">{education.score}</p>
									</td>
								</tr>
								<tr>
									<td>
										<p className="table-title d-inline pr-2">Level:</p>
										<p className="d-inline">{education.level}</p>
									</td>
									<td>
										<p className="table-title d-inline pr-2">Certificate:</p>
										<p className="d-inline">{education.course_title}</p>
									</td>
								</tr>
								<tr>
									<td>
										<p className="table-title d-inline pr-2">Certified:</p>

										<p className="d-inline">{education.certified}</p>
									</td>
									<td>
										<p className="table-title d-inline pr-2">Year of Achieved:</p>
										<p className="d-inline">{education.achievedYear}</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			)
		}
		 
		let { propsUser_id }= this.state
		return (
		  
			<div>
				<Navbar />
				<ProfileIntro  data = {propsUser_id}/>
				<section className="profile-subheader">
					<div className="container">
						<div className="row candidate-details">
							<div className="col-md-12">
								<div className="candidate-sidebar">
									<div className="profile-title">
										<h4 className="mt-0 d-inline-block"> <b> {this.state.user && this.state.user.local && this.state.user.local.username} </b> </h4>
									</div>
									{showEmployments}
									<p className="company-member"><b>Member Since: </b>{userCreatedAt}</p>
									<div className="profile-address">
										{showAddress}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>





				<section className="profile-menu">
					<div className="container">
						<div className="row profile-excerpt-wrap">
							<div className="col-lg-12 profile-body-section-left">
								<div className="card singleProWrap">
									{/* <ul className="cand-extralink" >
                                        <li><a href="#about" className="active">About</a></li>
                                        <li className=""><a href="#education" title="">Academic Summary</a></li>
                                        <li><a href="#training">Training Summary</a></li>
                                        <li className=""><a href="#experience" title="">Work Experience</a></li>
                                    </ul> */}


									<ul className="nav nav-tabs nav-justified md-tabs resume-tab-wrapper cand-extralink" id="myTabJust" role="tablist">
										<li className="nav-item waves-effect waves-light">
											<a className="nav-link active" id="about-tab-just" data-toggle="tab" href="#about-just" role="tab" aria-controls="about-just" aria-selected="true">Personal</a>
										</li>
										<li className="nav-item waves-effect waves-light">
											<a className="nav-link" id="education-tab-just" data-toggle="tab" href="#education-just" role="tab" aria-controls="education-just" aria-selected="false">Education/Training </a>
										</li>
										<li className="nav-item waves-effect waves-light">
											<a className="nav-link" id="training-tab-just" data-toggle="tab" href="#training-just" role="tab" aria-controls="training-just" aria-selected="false">Employeement</a>
										</li>
										<li className="nav-item waves-effect waves-light">
											<a className="nav-link" id="employment-tab-just" data-toggle="tab" href="#employment-just" role="tab" aria-controls="employment-just" aria-selected="false">Preference</a>
										</li>
									</ul>
									<div className="card-body">
										<div className="tab-content" id="myTabContentJust">
											<div className="tab-pane fade show active" id="about-just" role="tabpanel" aria-labelledby="about-tab-just">
												<div className="cand-details">

													<table className="table table-striped">
														<tbody>
															<tr>
																<td>
																	<p className="d-inline pr-2 table-title">Name:</p>
																	<p className="d-inline">{this.state.firstName} {this.state.middleName} {this.state.lastName}</p>
																</td>
																<td>
																	<p className="table-title pr-2 d-inline">Date of Birth:</p>
																	<p className="d-inline">{this.state.birthDate ? new Date(this.state.birthDate).toLocaleDateString() : ''}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="d-inline pr-2 table-title">Nationality:</p>
																	<p className="d-inline">{this.state.nationality}</p>
																</td>
																<td>
																	<p className="d-inline pr-2 table-title">Other Nationality:</p>
																	<p className="d-inline">{this.state.OtherNationality}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="d-inline pr-2 table-title">Permission to work in abroad:</p>
																	<p className="d-inline"><span>Yes</span></p>
																</td>
																<td>
																	<p className="d-inline pr-2 table-title">Contact No:</p>
																	<p className="d-inline">{this.state.contactInfo}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="d-inline pr-2 table-title">Gender:</p>
																	<p className="d-inline">{this.state.gender}</p>
																</td>
																<td>
																	<p className="d-inline pr-2 table-title">Email:</p>
																	<p className="d-inline email_text">{this.state.email}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="d-inline pr-2 table-title">Online Interview:</p>
																	<p className="d-inline">{this.state.onlineInterview == 'yes' ? 'yes' : 'no'}</p>
																</td>
																<td>
																	<p className="d-inline pr-2 table-title">Online Interview Tools:</p>
																	<p className="d-inline"><span>{this.state.OnlineInterviewTools}</span></p>
																</td>
															</tr>
															<tr>
																<td colspan="2">
																	<p className="d-inline pr-2 table-title">Personal Description:</p>
																	<p className="d-inline desc_text">{this.state.PersonalDescription}</p>
																</td>
															</tr>
															</tbody>
															</table>
															<h2 className="w-100">Address Details</h2>
															<table className="table table-striped">
														<tbody>
															<tr>
																<td>
																	<p className="table-title d-inline pr-2">Current City:</p>
																	<p className="d-inline">{this.state.current_city}</p>
																</td>
																<td>
																	<p className="table-title d-inline pr-2">Permanent City:</p>
																	<p className="d-inline">{this.state.permanent_city}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="table-title d-inline pr-2">Current Country:</p>
																	<p className="d-inline">{this.state.current_country}</p>
																</td>
																<td>
																	<p className="table-title d-inline pr-2">Permanent Country:</p>
																	<p className="d-inline"> {this.state.permanent_country}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="table-title d-inline pr-2">Current Prefecture:</p>
																	<p className="d-inline">{this.state.prefecture}</p>
																</td>
																<td>
																	<p className="table-title d-inline pr-2">Permanent Prefecture:</p>
																	<p className="d-inline">{this.state.permanentPrefecture}</p>
																</td>
															</tr>
															<tr>
																<td colspan="2">
																	<p className="table-title d-inline pr-2">Current Address Details:</p>
																	<p className="d-inline desc_text">{this.state.currentAddressDetails}</p>
																</td>
																{/* <td>
																	<span className="address-commonspan"><b>Permanent Address Details :</b> {this.state.permanentAddressDetails}</span> <br/>
																</td> */}
															</tr>
														</tbody>
													</table>

												</div>
											</div>
											<div className="tab-pane fade" id="education-just" role="tabpanel" aria-labelledby="education-tab-just">
												<div className="edu-history-sec cand-details">
													{/* <h2>Education</h2> */}
													{educationsSummery}
												</div>
											</div>
											<div className="tab-pane fade" id="training-just" role="tabpanel" aria-labelledby="training-tab-just">
												<div className="edu-history-sec cand-details">

													{employmentsSummery}
												</div>
											</div>
											<div className="tab-pane fade" id="employment-just" role="tabpanel" aria-labelledby="employment-tab-just">
												<div className="edu-history-sec cand-details">
													{/* <h2>Employeement Summery</h2> */}
													{/* {employmentsSummery} */}
													<table className="table table-striped">
														<tbody>
															<tr>
																<td>
																	<p className="table-title d-inline pr-2">Types Of Employment:</p>
																	<p className="d-inline">{this.state.typeOfEmployee}</p>
																</td>
																<td>
																	<p className="table-title d-inline pr-2">Desired Designation:</p>
																	<p className="d-inline">{this.state.desired_Designation}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="table-title d-inline pr-2">Industry:</p>
																	<p className="d-inline">{this.state.Industry}</p>
																</td>
																<td>
																	<p className="table-title d-inline pr-2">Desired Carrer Level:</p>
																	<p className="d-inline">{this.state.carrerlevel}</p>
																</td>
															</tr>
															<tr>
																<td>
																	<p className="table-title d-inline pr-2">job Category:</p>
																	<p className="d-inline">{this.state.job_type}</p>
																</td>
																<td>
																	<p className="table-title d-inline pr-2">Desired Salary:</p>

																	<p className="d-inline">{this.state.salary}</p>
																</td>
															</tr>
															<tr>
																<td colspan="2">
																	<p className="table-title d-inline pr-2">Desired Start Date:</p>
																	<p className="d-inline">{this.state.desired_start_date}</p>
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
							{/* <div className="col-lg-3">
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
                            </div> */}
						</div>
					</div>
				</section>



				<Footer />
				{/* <h1>hello </h1> */}
			</div>
		);
	}
}
export default ProfileOfUsers;