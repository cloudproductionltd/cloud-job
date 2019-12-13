import React, { Component, useState } from 'react';
import Axios from 'axios';
import FormValidator from './../../../helpers/FormValidator';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import DatePicker from "react-datepicker";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

class Personalinfo extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.dateChange = this.dateChange.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.validator = new FormValidator([
            {
                field: 'firstName',
                method: 'isEmpty',
                validWhen: false,
                message: 'First name is required.'
            },
            {
                field: 'lastName',
                method: 'isEmpty',
                validWhen: false,
                message: 'Last Name is required.'
            },
            {
                field: 'birthDate',
                method: 'isEmpty',
                validWhen: false,
                message: 'Birth date is required.'
            },
            {
                field: 'gender',
                method: 'isEmpty',
                validWhen: false,
                message: 'Gender is required.'
            },
            {
                field: 'nationality',
                method: 'isEmpty',
                validWhen: false,
                message: 'Nationality is required.'
            },
            {
                field: 'contactNo',
                method: 'isEmpty',
                validWhen: false,
                message: 'Contact No. is required.'
            },
            {
                field: 'country',
                method: 'isEmpty',
                validWhen: false,
                message: 'Country is required.'
            },
            {
                field: 'city',
                method: 'isEmpty',
                validWhen: false,
                message: 'Region is required.'
            },
            {
                field: 'onlineInterview',
                method: 'isEmpty',
                validWhen: false,
                message: 'Online interview is required.'
            },
            {
                field: 'OnlineInterviewTools',
                method: 'isEmpty',
                validWhen: false,
                message: 'Online interview tools is required.'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email  is required.'
            },

            {
                field: 'prefecture',
                method: 'isEmpty',
                validWhen: false,
                message: 'prefecture  is required.'
            },
        ]);

        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            nationality: '',
            OtherNationality: '',
            country: '',
            state: '',
            city: '',
            prefecture: '',
            currentAddressDetails: '',
            permanentCountry: '',
            permanentState: '',
            permanentCity: '',
            permanentPrefecture: '',
            email: '',
            contactNo: '',
            onlineInterview: '',
            PermissionWorkInAbroad: '',
            OnlineInterviewTools: '',
            PersonalDescription: '',
            photo: null,

            imageURL: '',
            error: {},
            validation: this.validator.valid(),
        }

        this.submitted = false;

    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    selectCountry(val) {
        this.setState({ country: val });
    }
    selectRegion(val) {
        this.setState({ city: val });
    }

    selectPermanentCountry(val) {
        this.setState({ permanentCountry: val });
    }
    selectPermanentCity(val) {
        this.setState({ permanentCity: val });
    }


    dateChange(date) {

        if (date === null) {
            this.setState({
                birthDate: ''
            });
        } else {
            this.setState({
                birthDate: date
            });
        }
    }

    componentDidMount() {

        let data = JSON.parse(localStorage.getItem('personalInfo'))

        if (data) {
            this.setState({
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                birthDate: data.birthDate ? new Date(data.birthDate) : '',
                gender: data.gender,
                nationality: data.nationality,
                OtherNationality: data.OtherNationality,
                country: data.country,
                state: data.state,
                city: data.city,
                prefecture: data.prefecture,
                currentAddressDetails: data.currentAddressDetails,
                permanentCountry: data.permanentCountry,
                permanentState: data.permanentState,
                permanentCity: data.permanentCity,
                permanentPrefecture: data.permanentPrefecture,
                email: data.email,
                contactNo: data.contactNo,
                onlineInterview: data.onlineInterview,
                PermissionWorkInAbroad: data.PermissionWorkInAbroad,
                OnlineInterviewTools: data.OnlineInterviewTools,
                PersonalDescription: data.PersonalDescription,
                photo: '',
            })
        }
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangedHandler = event => {
        this.setState({ photo: event.target.files[0] })
    }

    handleSubmit = event => {

        event.preventDefault();
        this.commonCode()
    };

    handleSubmitFromUpperTab = event => {

        // event.preventDefault();
        this.commonCode()

    };

    commonCode() {
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        let { firstName, middleName, lastName, country, state, city, birthDate, gender, nationality, OtherNationality, prefecture, permanentCountry, permanentState, permanentCity, currentAddressDetails, permanentPrefecture, email, contactNo, onlineInterview, PermissionWorkInAbroad, OnlineInterviewTools, PersonalDescription, photo, error, source } = this.state

        let personalInfo = new Object()
        let address = new Object()
        if (firstName) {
            personalInfo.firstName = firstName
        }
        if (middleName) {
            personalInfo.middleName = middleName
        }
        if (lastName) {
            personalInfo.lastName = lastName
        }

        if (birthDate) {
            personalInfo.birthDate = birthDate
        }
        if (gender) {
            personalInfo.gender = gender
        }
        if (nationality) {
            personalInfo.nationality = nationality
        }
        if (OtherNationality) {
            personalInfo.OtherNationality = OtherNationality
        }

        if (contactNo) {
            personalInfo.contact = contactNo
        }

        // if(photo){
        //     personalInfo.photo=photo
        // }
        if (PersonalDescription) {
            personalInfo.PersonalDescription = PersonalDescription
        }
        if (onlineInterview) {
            personalInfo.onlineInterview = onlineInterview
        }
        if (OnlineInterviewTools) {
            personalInfo.OnlineInterviewTools = OnlineInterviewTools
        }

        if (PermissionWorkInAbroad) {
            personalInfo.PermissionWorkInAbroad = PermissionWorkInAbroad
        }

        if (email) {
            personalInfo.alternetEmail = email
        }

        // if(state){
        //     personalInfo.state=state
        // }

        ///////////
        if (country) {
            address.current_country = country
        }
        if (city) {
            address.current_city = city
        }
        if (prefecture) {
            address.prefecture = prefecture
        }

        if (currentAddressDetails) {
            address.currentAddressDetails = currentAddressDetails
        }
        if (permanentCity) {
            address.permanent_city = permanentCity
        }

        if (permanentCountry) {
            address.permanent_country = permanentCountry
        }

        if (permanentPrefecture) {
            address.permanentPrefecture = permanentPrefecture
        }

        /////////////////////

        const picture = new FormData();
        picture.append('photo', this.uploadInput.files[0]);
        // picture.append('filename', this.fileName.value);

        localStorage.setItem('personalInfo', JSON.stringify(this.state));

        // window.sessionStorage.setItem('validationfromPersonalinfo', validation.isValid);
        let user_id = (window.sessionStorage.getItem('user_id'));
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        if (validation.isValid == true) {
            // event.preventDefault();

            Axios.put(`/users/personal-info/${user_id}`, personalInfo,
                { headers: headers }
            )
                .then((result) => {

                    console.log('personal_result', result)

                    // window.location.reload()
                })
                .catch((error) => {

                });

            Axios.put(`/users/address/${user_id}`, address,
                { headers: headers }
            )
                .then((result) => {

                    console.log('address', result)

                    // window.location.reload()
                })
                .catch((error) => {

                });

            Axios.post(`/users/pro-pic`, picture,
                { headers: headers }
            )
                .then((result) => { })
                .catch((error) => { });
            this.props.nextStep();
        } else {

        }
    }
    render() {
        const { values, handleChange } = this.props;
        let { firstName, middleName, lastName, country, state, city, birthDate, gender, nationality, OtherNationality, prefecture, permanentCountry, permanentState, permanentCity, currentAddressDetails, permanentPrefecture, email, contactNo, onlineInterview, PermissionWorkInAbroad, OnlineInterviewTools, PersonalDescription, photo, error, source } = this.state
        let validation = this.submitted ?                         // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation                   // otherwise just use what's in state

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="companyProfileForm step1Form form-horizontal">
                    <div className="form-row firProw">
                        <div className='form-group col-md-4 col-sm-12 col-12'>
                            <label className="required">First Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                </div>
                                <input type="text" name="firstName" className={validation.firstName.message ? "form-control is-invalid" : "form-control"} placeholder="First Name"
                                    value={firstName} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{validation.firstName.message}</div>
                            </div>
                        </div>
                        <div className='form-group col-md-4 col-sm-12 col-12'>
                            <label className="required">Last Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                </div>
                                <input type="text" name="lastName" className={validation.lastName.message ? "form-control is-invalid" : "form-control"} placeholder="Last Name"
                                    value={lastName} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{validation.lastName.message}</div>
                            </div>
                        </div>
                        <div className='form-group col-md-4 col-sm-12 col-12'>
                            <label>Middle Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                </div>
                                <input type="text" name="middleName" value={middleName} className="form-control" onChange={this.handleInputChange} placeholder="Middle Name"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 perDaOfBirth">
                            <label className="required">Date of Birth</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                </div>

                                <DatePicker onChange={this.dateChange} className={validation.birthDate.message ? "form-control is-invalid" : "form-control"} selected={this.state.birthDate} placeholderText="yyyy/mm/dd" name="birthDate" dateFormat="yyyy/MM/dd" />
                                <div className="invalid-feedback">{validation.birthDate.message}</div>
                                <span className="about_length text-red"> {validation.birthDate.message ? validation.birthDate.message : ''}</span>
                            </div>
                        </div>
                        <div className='form-group col-md-6'>
                            <label className="required">Gender</label>
                            <div className="input-group">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="gender" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleInputChange} className="custom-control-input" id="male" />
                                    <label className="custom-control-label" htmlFor="male">Male</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">

                                    <input type="radio" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.handleInputChange} className="custom-control-input" id="female" />
                                    <label className="custom-control-label" htmlFor="female">Female</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="gender" value="Other" checked={this.state.gender === 'Other'} onChange={this.handleInputChange} className="custom-control-input" id="Other" />
                                    <label className="custom-control-label" htmlFor="Other">Other</label>
                                </div>
                                {validation.gender.message ? <span className="triple-radio-feedback">Gender is required</span> : ' '}
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='form-group col-md-6'>
                            <label className="required">Nationality</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                </div>

                                <input value={nationality} type="text" name="nationality" className={validation.nationality.message ? "form-control is-invalid" : "form-control"} placeholder="Nationality"
                                    value={nationality} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{validation.nationality.message}</div>
                            </div>
                        </div>
                        <div className='form-group col-md-6'>
                            <label className="">Other Nationality <span>(If have any)</span></label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                </div>
                                <input value={OtherNationality} type="text" name="OtherNationality" className="form-control" placeholder="Other Nationality" onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='form-group col-md-4'>
                            <label className="required">Current Address</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                </div>
                                <CountryDropdown className={validation.country.message ? "form-control is-invalid" : "form-control"}
                                    value={country}
                                    onChange={(val) => this.selectCountry(val)}
                                />
                                <div className="invalid-feedback">{validation.country.message}</div>
                            </div>
                        </div>
                        <div className='form-group col-md-4'>
                            <label className="required invisibleCm">Region</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                </div>
                                <RegionDropdown className={validation.city.message ? "form-control is-invalid" : "form-control"}
                                    country={country}
                                    value={city}
                                    onChange={(val) => this.selectRegion(val)}
                                    placeholder="Select Region"
                                />
                                <div className="invalid-feedback">{validation.city.message}</div>
                            </div>
                        </div>
                        <div className='form-group col-md-4'>
                            <label className="required invisibleCm">Prefecture</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                </div>
                                <input type="text" name="prefecture" className={validation.prefecture.message ? "form-control is-invalid" : "form-control"} placeholder="Prefecture"
                                    value={prefecture} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{validation.prefecture.message}</div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="">Current Address Details</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                </div>
                                <input type="text" name="currentAddressDetails" className="form-control" placeholder="Current Address Details"
                                    value={currentAddressDetails} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className='form-group col-md-4'>
                            <label className="">Permanent Address</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                </div>
                                <CountryDropdown className="form-control"
                                    value={permanentCountry}
                                    onChange={(val) => this.selectPermanentCountry(val)}
                                />
                            </div>
                        </div>

                        <div className='form-group col-md-4'>
                            <label className="invisibleCm">region</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                </div>
                                <RegionDropdown className="form-control"
                                    country={permanentCountry}
                                    value={permanentCity}
                                    onChange={(val) => this.selectPermanentCity(val)}
                                    placeholder="Select Region"
                                />
                            </div>
                        </div>
                        <div className='form-group col-md-4'>
                            <label className="invisibleCm">prefecture</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                </div>
                                <input type="text" name="permanentPrefecture" className="form-control" placeholder="Prefecture"
                                    value={permanentPrefecture} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-row emConCheck">
                        <div className='form-group col-md-4'>
                            <label className="required">Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                </div>

                                <input type="email" name="email" className={validation.email.message ? "form-control is-invalid" : "form-control"} placeholder="Email"
                                    value={email} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{validation.email.message}</div>
                            </div>
                        </div>
                        <div className='form-group col-md-4'>
                            <label className="required">Contact No</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-address-book"></i></span>
                                </div>
                                <input type="text" name="contactNo" className={validation.contactNo.message ? "form-control is-invalid" : "form-control"} placeholder="Contact No"
                                    value={contactNo} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{validation.contactNo.message}</div>
                            </div>
                        </div>
                        <div className='form-group col-md-4'>
                            <label className="required">Online Interview</label>
                            <div className="input-group">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="OnInyes" checked={this.state.onlineInterview === 'yes'} value="yes" name="onlineInterview" onChange={this.handleInputChange} />
                                    <label className="custom-control-label" htmlFor="OnInyes">Yes</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="OnInno" checked={this.state.onlineInterview === 'no'} value="no" name="onlineInterview" onChange={this.handleInputChange} />
                                    <label className="custom-control-label" htmlFor="OnInno">No</label>
                                </div>
                            </div>
                            <span className="about_length text-red"> {validation.onlineInterview.message ? validation.onlineInterview.message : ''}</span>
                        </div>
                    </div>
                    <div className="form-row perNatueTool">
                        <div className='form-group col-md-6'>
                            <label className="">Permission To Work In Abroad</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                </div>
                                <select className="form-control" name="PermissionWorkInAbroad" onChange={this.handleInputChange}>
                                    <option>Select</option>
                                    <option selected={this.state.PermissionWorkInAbroad === 'Yes'} value="Yes">Yes</option>
                                    <option selected={this.state.PermissionWorkInAbroad === 'No'} value="No">No</option>
                                    <option selected={this.state.PermissionWorkInAbroad === 'National/PR'} value="National/PR">National/PR</option>
                                </select>
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

                        <div className="form-group col-md-6">
                            <label>Personal Description</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                </div>
                                <textarea name="PersonalDescription" id="additional_requirment" rows="2" className="form-control" placeholder="Personal Description" onChange={this.handleInputChange}  ></textarea>
                            </div>
                        </div>
                        <div className='form-group col-md-6'>
                            <label className="required">Online Interview Tools</label>
                            <div className="input-group">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="onSkype" checked={this.state.OnlineInterviewTools === 'Skype'} value="Skype" name="OnlineInterviewTools" onChange={this.handleInputChange} />
                                    <label className="custom-control-label" htmlFor="onSkype">Skype</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="onLine" checked={this.state.OnlineInterviewTools === 'Line'} value="Line" name="OnlineInterviewTools" onChange={this.handleInputChange} />
                                    <label className="custom-control-label" htmlFor="onLine">Line</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="onViber" checked={this.state.OnlineInterviewTools === 'Viber'} value="Viber" name="OnlineInterviewTools" onChange={this.handleInputChange} />
                                    <label className="custom-control-label" htmlFor="onViber">Viber</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="onWhatsapp" checked={this.state.OnlineInterviewTools === 'Whatsapp'} value="Whatsapp" name="OnlineInterviewTools" onChange={this.handleInputChange} />
                                    <label className="custom-control-label" htmlFor="onWhatsapp">Whatsapp</label>
                                </div>
                            </div>
                            <span className="about_length text-red"> {validation.OnlineInterviewTools.message ? validation.OnlineInterviewTools.message : ''}</span>
                        </div>
                    </div>
                    {/* <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label className="">Photo</label>
                                                        
                                                        <div>
                                                            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                                                            </div>
                                                            <div>
                                                            
                                                            </div>
                                                    </div>
                                                </div> */}
                    <div className="jSeeBtWrap">
                        {/* <div className="previousBtnWrap">
                                                <button align="left" className="btn btn-primary previousBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Personal Information</span></span></button>
                                                </div> */}
                        <div className="nextBtnWrap">
                            <button align="right" className="btn btn-success nextBtn btn-md" type="submit" ><span className="insBtIcon"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default Personalinfo;