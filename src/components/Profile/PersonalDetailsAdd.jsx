import React, { Component } from 'react';
import Axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import Modal from 'react-bootstrap4-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormValidator from './../../helpers/FormValidator';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const $ = window.$;

class PersonalDetailsAdd extends Component {


    constructor(props) {
        super(props);
        this.setInputValueToState = this.setInputValueToState.bind(this)
        this.onChange = this.onChange.bind(this)
        this.dateChange = this.dateChange.bind(this)
        this.validator = new FormValidator([
			{
				field: 'firstName', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'First Name is required.'
            },{
                field: 'lastName', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'Last Name is required.'
            },{
                field: 'nationality', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'Nationality is required.'
            },{
                field: 'gender', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'Gender is required.'
            },
            {
                
                field: 'alternetEmail', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'Email is required.'
            },{
                
                field: 'contactInfo', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'Contact Info is required.'
            },{
                
                field: 'birthDate', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'Birth Date is required.'
            },
        ]);

        this.state = {
            firstName:'',
            lastName:'' ,
            middleName:'',
            fatherName:'',
            motherName:'',
            gender:'',
            religion:'' ,
            maritualStatus:'', 
            birthDate:'',
            nationality:'',
            onlineInterview:'',
            OnlineInterviewTools:'',
            PersonalDescription:'',
            OtherNationality:'',
            OnlineInterviewTools:'',
            nationalId:'', 
            bloodGroup:'',
            contactInfo:'',
            emergencyContact:'', 
            alternetEmail:'',
            validation: this.validator.valid(),
            error:{},
        }
        this.submitted = false;
    }

   

    setInputValueToState(e){
		this.setState({ [e.target.name]: e.target.value } );
    
    }

    
	dateChange(date){

        if (date ===null){
            this.setState({
                birthDate: ''
            });
        }else{
            this.setState({
                birthDate: date
            });
        }
		
	}
    onChange(e){
		this.setState({ [e.target.name]: e.currentTarget.value });
		
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
                            email :  response.data.response.user.local ? response.data.response.user.local.email :'',
                            username : response.data.response.user.local ? response.data.response.user.local.username :'',
                            firstName: response.data.response.user.personal ? response.data.response.user.personal.firstName : '',
                            lastName: response.data.response.user.personal? response.data.response.user.personal.lastName : '',
                            middleName: response.data.response.user.personal ? response.data.response.user.personal.middleName : '',
                            fatherName: response.data.response.user.personal ? response.data.response.user.personal.fatherName : '',
                            motherName: response.data.response.user.personal ?  response.data.response.user.personal.motherName : '',
                            gender: response.data.response.user.personal ? response.data.response.user.personal.gender : '',
                        
                            maritualStatus: response.data.response.user.personal.maritualStatus ? response.data.response.user.personal.maritualStatus : '',
                            birthDate: response.data.response.user.personal.birthDate? new Date(response.data.response.user.personal.birthDate): '',
                            nationality: response.data.response.user.personal.nationality ? response.data.response.user.personal.nationality :'',
                            OtherNationality:response.data.response.user.personal.OtherNationality? response.data.response.user.personal.OtherNationality:'',
                            PersonalDescription: response.data.response.user.personal.PersonalDescription ? response.data.response.user.personal.PersonalDescription:'',
                            contactInfo: response.data.response.user.personal.contact ? response.data.response.user.personal.contact:'',
                            alternetEmail:  response.data.response.user.personal.alternetEmail ? response.data.response.user.personal.alternetEmail :'',
                            emergencyContact: response.data.response.user.personal.alternetEmail ? response.data.response.user.personal.alternetEmail :'',
                            nationalId: response.data.response.user.personal.nationalId ? response.data.response.user.personal.nationalId:'',
                            bloodGroup: response.data.response.user.personal.bloodGroup ? response.data.response.user.personal.bloodGroup : '',
                            onlineInterview: response.data.response.user.personal.onlineInterview ? response.data.response.user.personal.onlineInterview :'',
                            OnlineInterviewTools : response.data.response.user.personal.OnlineInterviewTools ? response.data.response.user.personal.OnlineInterviewTools :'',
                            PermissionWorkInAbroad : response.data.response.user.personal.PermissionWorkInAbroad ?response.data.response.user.personal.PermissionWorkInAbroad:''
                        })
            })
            .catch(error => {
                console.log('error',error)
            })
    }



    onSubmitPersonalDetails = (e) => {
        e.preventDefault();

        const picture = new FormData();
        picture.append('photo', this.uploadInput.files[0]);


        const validation = this.validator.validate(this.state);
        console.log('jjjnsdjkb vaggo bole mene nen',validation)

        this.setState({ validation });

        if(  validation.isValid == false){
            this.submitted = false;
        }else if(!this.state.alternetEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({ 
                emailFieldValidation: 'Please input valid Email.'
            }); 
            this.submitted = false;
            
        }else if(!this.state.birthDate){
            this.setState({ 
                dateFieldValidation: 'Please input valid date.'
            }); 
            this.submitted = false;
            
        }else{
            this.submitted = true;
            var user_id = (window.sessionStorage.getItem('user_id'));
            console.log('user_id',user_id)
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('cool-jwt')
            }
            const { firstName, lastName, middleName, fatherName, motherName, gender,
                      maritualStatus, birthDate, nationality,OtherNationality,onlineInterview,OnlineInterviewTools,
                    nationalId, PermissionWorkInAbroad, PersonalDescription, bloodGroup, contactInfo, emergencyContact, alternetEmail
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
            
                if(maritualStatus){
                    personalInfo.maritualStatus= maritualStatus
                }
                if(birthDate){
                    personalInfo.birthDate= birthDate
                }
                
                if(PermissionWorkInAbroad){
                    personalInfo.PermissionWorkInAbroad= PermissionWorkInAbroad
                }

                if(onlineInterview){
                    personalInfo.onlineInterview= onlineInterview
                }
                if(OtherNationality){
                    personalInfo.OtherNationality= OtherNationality
                }
                
                if(OnlineInterviewTools){
                    personalInfo.OnlineInterviewTools= OnlineInterviewTools
                }
                if(nationality){
                    personalInfo.nationality= nationality
                }
                if(nationalId){
                    personalInfo.nationalId= nationalId
                }
                
                if(PersonalDescription){
                    personalInfo.PersonalDescription = PersonalDescription
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
                            modal : 'success',
                            dateFieldValidation:'',
                            emailFieldValidation:''
                        })
                        

                        if ( result.data.response.user.educations.length == 0 ||  result.data.response.user.personal.firstName == null ){
                            window.sessionStorage.setItem('allowForApply', 0);
                        }else{
                            window.sessionStorage.setItem('allowForApply', 1);
                        }

                        $('#personalDetails').modal('hide');

                        
                    })
                    .catch((error) =>{
                        this.setState({
                            show : false
                        })
                    });




                    Axios.post(`/users/pro-pic`, picture,
                    { headers: headers }
                )
                    .then((result) => { })
                    .catch((error) => { }); 
                }
    }

    closeModal() {
        this.setState({
            modal : '',
        });
        window.location.reload()
    }

    render(){

        const { firstName, lastName, middleName, fatherName, motherName, gender,
             maritualStatus, birthDate, nationality,OtherNationality,onlineInterview,OnlineInterviewTools,
            nationalId,PersonalDescription,PermissionWorkInAbroad, bloodGroup, contactInfo, emergencyContact, alternetEmail, emailFieldValidation, dateFieldValidation
        } = this.state;

        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation   

        return(

            <div>

                <div className="modal fade" id="personalDetails" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card">
                            <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                            <h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Personal details</h5>
                            <div className="card-body px-lg-5 pt-0">
                            <form onSubmit={this.onSubmitPersonalDetails} className="resume-editForm">
                            <div className="form-row">
                                <div className='form-group col-md-6 col-sm-12 col-12'>
                                <label htmlFor="materialRegisterFormFirstName" className={firstName ? "active required": 'required'}>First name</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                        </div>
                                        <input type="text" id="materialRegisterFormFirstName" name="firstName" value={firstName} className={validation.firstName.message ? "form-control is-invalid": "form-control"} onChange={this.setInputValueToState}   />
                                        <div className="invalid-feedback">{validation.firstName.message}</div>
                                    </div>
                                </div>
                                <div className='form-group col-md-6 col-sm-12 col-12'>
                                    <label htmlFor="materialRegisterFormLastName" className= { lastName ? "active required": 'required'} >Last Name</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                        </div>
                                        <input type="text" name="lastName"  value={ lastName } className={validation.lastName.message ? "form-control is-invalid": "form-control"} onChange={this.setInputValueToState}  id="materialRegisterFormLastName"  />
                                        <div className="invalid-feedback">{validation.lastName.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className='form-group col-md-6 col-sm-12 col-12'>
                                    <label htmlFor="materialRegisterFormNationality" className= { nationality ? "active ": 'required'}>Middle Name</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                        </div>
                                        <input type="text"  id="materialRegisterFormNationality"  name="middleName" value={ middleName }  onChange={this.setInputValueToState}  className= "form-control" />
                                     </div>
                                </div>
                                <div className="form-group col-md-6 col-sm-12 col-12 perDaOfBirth">
                                    <label className="required">Date of birth</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                        </div>
                                        <DatePicker onChange={ this.dateChange } className={validation.birthDate.message ? "form-control is-invalid": "form-control"} selected={this.state.birthDate} placeholderText="Date Of Birth" name="birthDate"  dateFormat="yyyy/MM/dd" />
                                        <div className="invalid-feedback">{validation.birthDate.message}</div>
                                        <span className="about_length text-red"> {validation.birthDate.message? validation.birthDate.message:''}</span>
                                    </div>
                                </div>
                            </div>
                          

                                {/* <div className="form-row">
                                    <div className="col">
                                        <div className="md-form">
                                        <i className="fas fa-user prefix "></i>
                                        <input type="text" id="materialRegisterFormFirstName" name="firstName" value={firstName} className={validation.firstName.message ? "form-control is-invalid": "form-control"} onChange={this.setInputValueToState}   />
                                        <label htmlFor="materialRegisterFormFirstName" className={firstName ? "active required": 'required'}>First name</label>
                                        <div className="invalid-feedback">{validation.firstName.message}</div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="md-form">
                                        <i className="fas fa-user prefix"></i>
                                        <input type="text" name="lastName"  value={ lastName } className={validation.lastName.message ? "form-control is-invalid": "form-control"} onChange={this.setInputValueToState}  id="materialRegisterFormLastName"  />
                                        <label htmlFor="materialRegisterFormLastName" className= { lastName ? "active required": 'required'} >Last Name</label>
                                        <div className="invalid-feedback">{validation.lastName.message}</div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="form-row">
                                    <div className="col">
                                        <div className="md-form">
                                            <i className="fab fa-font-awesome-flag prefix"></i>
                                            <input type="text"  id="materialRegisterFormNationality"  name="middleName" value={ middleName }  onChange={this.setInputValueToState}  className= "form-control" />
                                            <label htmlFor="materialRegisterFormNationality" className= { nationality ? "active ": 'required'}>Middle Name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="md-form">
                                            <i className="fas fa-id-card-alt prefix"></i>
                                            <input type="text" name="nationalId" value={ nationalId } onChange={this.setInputValueToState}  id="materialRegisterFormNationalId" className="form-control"/>
                                            <label htmlFor="materialRegisterFormNationalId"  className= { nationalId ? "active": ''}>National Id</label>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="form-row">
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label htmlFor="materialRegisterFormNationality" className= { nationality ? "active required": 'required'}>Nationality</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                            </div>
                                            <input type="text"  id="materialRegisterFormNationality"  name="nationality" value={ nationality }  onChange={this.setInputValueToState}  className={validation.nationality.message ? "form-control is-invalid": "form-control"} />
                                            <div className="invalid-feedback">{validation.nationality.message}</div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label htmlFor="materialRegisterFormNationalId"  className= { OtherNationality ? "active": ''}>Other Nationality(If have any)</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-id-card-alt"></i></span>
                                            </div>
                                            <input type="text" name="OtherNationality" value={ OtherNationality } onChange={this.setInputValueToState}  id="materialRegisterFormNationalId" className="form-control" />
                                        </div>
                                    </div>
                                </div>




                                {/* <div className="form-row">
                                    <div className="col">
                                        <div className="md-form">
                                        <i className="fab fa-font-awesome-flag prefix"></i>
                                        <input type="text"  id="materialRegisterFormNationality"  name="nationality" value={ nationality }  onChange={this.setInputValueToState}  className={validation.nationality.message ? "form-control is-invalid": "form-control"} />
                                        <label htmlFor="materialRegisterFormNationality" className= { nationality ? "active required": 'required'}>Nationality</label>
                                        <div className="invalid-feedback">{validation.nationality.message}</div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="md-form">
                                        <i className="fas fa-id-card-alt prefix"></i>
                                        <input type="text" name="OtherNationality" value={ OtherNationality } onChange={this.setInputValueToState}  id="materialRegisterFormNationalId" className="form-control"/>
                                        <label htmlFor="materialRegisterFormNationalId"  className= { OtherNationality ? "active": ''}>Other Nationality(If have any)</label>
                                        </div>
                                    </div>
                                </div> */}
                                


                                
                                
                                {/* <div className="form-row">
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <div className="md-form">
                                        <i className="fas fa-user prefix "></i>
                                        <input type="text" name="PersonalDescription" value={ PersonalDescription } onChange={this.setInputValueToState} id="materialRegisterFormMobileNo1" className= "form-control"/>
                                        <label htmlFor="materialRegisterFormMobileNo1" className= { PersonalDescription ? "active": ''}>Personal Description</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <div className="onlineInterWrap">
                                            <label className="required">Online Interview</label>
                                            <div className="tripleradio ">
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" name="onlineInterview" value= "Yes" checked={this.state.onlineInterview === 'Yes'} onChange={this.onChange}  className="custom-control-input" id="defaultInlineCarrer1" />
                                                    <label className="custom-control-label" htmlFor="defaultInlineCarrer1">Yes</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" name="onlineInterview" value= "No" checked={this.state.onlineInterview === 'No'} onChange={this.onChange} className="custom-control-input" id="defaultInlineCarrer2" />
                                                    <label className="custom-control-label" htmlFor="defaultInlineCarrer2">No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="form-row">
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label htmlFor="materialRegisterFormContact" className= { contactInfo ? "active required": 'required'}>Contact No</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-address-book"></i></span>
                                            </div>
                                            <input type="text" name="contactInfo" value={ contactInfo } onChange={this.setInputValueToState}  id="materialRegisterFormContact" className={validation.contactInfo.message ? "form-control is-invalid": "form-control"} />
                                           
                                            <div className="invalid-feedback">{validation.contactInfo.message}</div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label className="required">Online Interview</label>
                                        <div className="input-group">
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" name="onlineInterview" value= "Yes" selected={this.state.onlineInterview === 'Yes'} defaultChecked  onChange={this.onChange}  className="custom-control-input" id="defaultInlineCarrer1" />
                                                <label className="custom-control-label" htmlFor="defaultInlineCarrer1">Yes</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" name="onlineInterview" value= "No" selected={this.state.onlineInterview === 'No'} onChange={this.onChange} className="custom-control-input" id="defaultInlineCarrer2" />
                                                <label className="custom-control-label" htmlFor="defaultInlineCarrer2">No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label className="required">Gender</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-transgender"></i></span>
                                            </div>
                                        
                                            {/* <span className={this.state.gender ? 'requiredStarGender asteriskNone' : 'requiredStarGender asterisk'}>*</span> */}
                                            <select  className="form-control" name="gender" value = { gender } onChange={this.onChange}>
                                                <option value="">Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="invalid-feedback">{validation.gender.message}</div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label className="">Permission To Work In Abroad</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            </div>
                                            <select className="form-control" name="PermissionWorkInAbroad" value = { PermissionWorkInAbroad } onChange={this.onChange}  >
                                                <option value="">Permission To Work In Abroad</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                                <option value="National/PR">National/PR</option>
                                            </select>
                                            {/* <div className="invalid-feedback">{validation.PermissionWorkInAbroad.message}</div> */}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* <div className="form-row">
                                    <div className="col">
                                        <div className="md-form pDatepik-wrap">
                                            <i className="fas fa-calendar-alt prefix"></i>
                                            <span className="requiredDtStar">*</span>
                                            <DatePicker onChange={ this.dateChange } className={validation.birthDate.message ? "form-control is-invalid": "form-control"} selected={this.state.birthDate} placeholderText="Date Of Birth" name="birthDate"  dateFormat="yyyy/MM/dd" />
                                            <div className="invalid-feedback">{validation.birthDate.message}</div>
                                            <span className="about_length text-red"> {validation.birthDate.message? validation.birthDate.message:''}</span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="md-form">
                                        <i className="fas fa-transgender prefix"></i>
                                        <span className={this.state.gender ? 'requiredStarGender asteriskNone' : 'requiredStarGender asterisk'}>*</span>
                                        <select  name="gender" value = { gender } onChange={this.onChange}  className={validation.gender.message ? "browser-default custom-select profile-edit-common-select required is-invalid":"browser-default custom-select profile-edit-common-select"} >
                                        <option value="">Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        </select>
                                        <div className="invalid-feedback">{validation.gender.message}</div>
                                        </div>
                                    </div>
                                </div> */}






                                <div className="form-row">
                                    
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label htmlFor="materialRegisterFormAlternateEmail" className= { alternetEmail ? "active required": 'required'}>Email</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                            </div>
                                            <input type="text" placeholder="Email" name="alternetEmail" value={ alternetEmail } onChange={this.setInputValueToState}  id="materialRegisterFormAlternateEmail" className={validation.alternetEmail.message ? "form-control is-invalid": "form-control"} />
                                            <span className="about_length text-red"> {emailFieldValidation? emailFieldValidation:''}</span>
                                            <div className="invalid-feedback">{validation.alternetEmail.message}</div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="">Photo</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend fileUpload">
                                                <span className="input-group-text"><i className="fas fa-download"></i></span>
                                            </div>
                                            <div className="custom-file customFileWrap">
                                            <input ref={(ref) => { this.uploadInput = ref; }} type="file" className="custom-file-input" id="inputGroupFile01" />
                                                <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label htmlFor="materialRegisterFormMobileNo1" className= { PersonalDescription ? "active": ''}>Personal Description</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            </div>
                                            <textarea type="text" name="PersonalDescription" value={ PersonalDescription } onChange={this.setInputValueToState} id="materialRegisterFormMobileNo1" className= "form-control"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12 col-12">
                                        <label className="required">Online Interview Tools</label>
                                        <div className="input-group">
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" name="OnlineInterviewTools" value= "Skype" checked={this.state.OnlineInterviewTools == 'Skype'}    onChange={this.onChange}  className="custom-control-input" id="OnlineInterviewTools1" />
                                                <label className="custom-control-label" htmlFor="OnlineInterviewTools1">Skype</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" name="OnlineInterviewTools" value= "Line" checked={this.state.OnlineInterviewTools == 'Line'} onChange={this.onChange} className="custom-control-input" id="OnlineInterviewTools2" />
                                                <label className="custom-control-label" htmlFor="OnlineInterviewTools2">Line</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" name="OnlineInterviewTools" value= "Viber" checked={this.state.OnlineInterviewTools == 'Viber'} onChange={this.onChange}  className="custom-control-input" id="OnlineInterviewTools3" />
                                                <label className="custom-control-label" htmlFor="OnlineInterviewTools3">Viber</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" name="OnlineInterviewTools" value= "Whatsapp" checked={this.state.OnlineInterviewTools == 'Whatsapp'} onChange={this.onChange}  className="custom-control-input" id="OnlineInterviewTools4" />
                                                <label className="custom-control-label" htmlFor="OnlineInterviewTools4">Whatsapp</label>
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

            </div>
        );
    }
}


export default PersonalDetailsAdd;