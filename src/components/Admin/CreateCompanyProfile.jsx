import React, { Component } from 'react';
import Breadcumb from './Home/Breadcumb';
import Sidebar from './Home/Sidebar';
import Footer from './Home/Footer';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import FormValidator from './../../helpers/FormValidator';
import Page from 'react-page-loading';

class CreateCompanyProfile extends Component {

    constructor() {
        super();
        
        this.validator = new FormValidator([
            { 
                field: 'name', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Name is required.' 
            },
            { 
                field: 'email', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Email is required.' 
            },
            { 
                field: 'web', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Web is required.' 
            },
            { 
                field: 'address', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Address is required.' 
            },
            { 
                field: 'zip', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Zip is required.' 
            },
            { 
                field: 'city', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'City is required.' 
            },
            { 
                field: 'state', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'State is required.' 
            },
            { 
                field: 'country', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Country is required.' 
            },
            { 
                field: 'emergency_contact', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Contact is required.' 
            },
            { 
                field: 'type', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Company type is required.' 
            },{ 
                field: 'about', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'About is required.' 
            }
        ]);

        this.state = {
            name: '',
            email: '',
            web: 'http://',
            address: '',
            zip: '',
            city: '',
            state: '',
            country: '',
            emergency_contact: '',
            type: '',
            about: '',
            error:{},
            validation: this.validator.valid(),


            aboutFieldValidation:''
        };
        this.submitted = false;
    }

    componentDidMount() {

        if(window.sessionStorage.getItem('company_id')){
            
            this.props.history.push('/recruiter/company/add');



        }

    }



    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = event => {
        console.log('state',this.state)

        event.preventDefault();
        let { name , email, web, address, zip, city, state, country, emergency_contact, logo, type, about} = this.state

        const validation = this.validator.validate(this.state);
        this.setState({ validation });


        if(  validation.isValid == false){
            this.submitted = false;
        }else if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({ 
                emailFieldValidation: 'Please enter the valid Email.'
            }); 
            this.submitted = false;
            
        }else if(this.state.about.length < 100 || this.state.about.length > 400 ){
            this.setState({ 
                aboutFieldValidation: 'About should be at least 100 to 400 charecter '
            }); 
            this.submitted = false;
        }else if(!this.state.web.match(/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)){
            this.setState({ 
                webFieldValidation: 'Please enter the valid url'
            }); 
            this.submitted = false;
            
        }else if(this.state.address.length < 20 ){
            this.setState({ 
                addressFieldValidation: 'Length must be at least 20 characters long'
            }); 
            this.submitted = false;
            
        }else if(this.state.emergency_contact.length < 11 ){
            this.setState({ 
                contactFieldValidation: 'Contact Number must be at least 11 number long'
            }); 
            this.submitted = false;
            
        }else if( this.state.name.length < 7 || this.state.name.length > 40){
            this.setState({ 
                nameFieldValidation: 'Company name length must be at least 7 or equal to 40 characters long'
            }); 
            this.submitted = false;
            
        }else {
            this.submitted = true;
            this.setState({ 
                aboutFieldValidation: ''
            });
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('cool-jwt')
            }
            let { name , email, web, address, zip, city, state, country, emergency_contact, logo, type, about} = this.state
            axios.post('/companies', {
                name: name,
                email:  email,
                web: web,
                address: address,
                zip: zip,
                city: city,
                state: state,
                country: country,
                phone: emergency_contact,
                type: type,
                about: about
    
            },{headers: headers}).then( res => {

                this.setState({
                    show : 'success'
                });
                window.sessionStorage.setItem('company_id', res.data.company._id);
                window.sessionStorage.setItem('hasCompany',JSON.stringify(res.data.company));
                window.sessionStorage.setItem('CompanyPendingStatus', res.data.company.pending);
                this.props.history.push('/recruiters-pending-profile');
            })
            .catch((error)=> {
                console.log(error.response.data)
                // this.setState({
                //     name : error.response.data.items.name
                // })
                // console.log(this.state)
            });
        }
        
    }

    closeModal() {
        this.setState({
            show : '',
        });
        // this.props.history.push('/recruiterjobs');
    }

render() {
    let { name, email, web, address, zip, city, state, country, emergency_contact, type, about, aboutFieldValidation, addressFieldValidation, contactFieldValidation, nameFieldValidation,  emailFieldValidation, webFieldValidation} = this.state
    let validation = this.submitted ?                         // if the form has been submitted at least once
                        this.validator.validate(this.state) :   // then check validity every time we render
                        this.state.validation                   // otherwise just use what's in state
            console.log('validation', validation)
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
                                {/* <header>
                                    <h1 className="h2 display title-of-company">Company Profile</h1>
                                </header> */}
                                <div className="card">
                                    <div className="card-header d-flex align-items-center">
                                        <h4>Add Company Profile</h4>
                                        <br/>
                                    </div>
                                    <div className="card-body">
                                        <form className="form-horizontal companyProfileForm" onSubmit={ this.handleSubmit } encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Company Name</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-building"></i></span>
                                                        </div>
                                                        <input  type="text" name="name" className={validation.name.message ? "form-control is-invalid": "form-control"} placeholder="Company Name"  value={ name } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.name.message}</div>
                                                    </div>
                                                    <span className="about_length text-red"> {nameFieldValidation ? nameFieldValidation :''}</span>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Email</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                                        </div>
                                                        <input  type="text" name="email" className={validation.email.message ? "form-control is-invalid": "form-control"} placeholder="Email"  value={ email } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.email.message }</div>
                                                    </div>
                                                    <span className="about_length text-red"> {emailFieldValidation ? emailFieldValidation :''}</span>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Web Address</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-globe"></i></span>
                                                        </div>
                                                        <input type="text" name="web" className={validation.web.message ? "form-control is-invalid": "form-control"} placeholder="http://example.com"  value={ web } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.web.message }</div>
                                                    </div>
                                                    <span className="about_length text-red"> {webFieldValidation ? webFieldValidation :''}</span>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Address</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                                        </div>
                                                        <input  type="text" name="address" className={validation.address.message ? "form-control is-invalid": "form-control"} placeholder="Address"  value={ address } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.address.message }</div>
                                                    </div>
                                                    <span className="about_length text-red"> {addressFieldValidation ? addressFieldValidation :''}</span>
                                                </div>
                                            </div>



                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Zip Code</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-map-pin"></i></span>
                                                        </div>
                                                        <input  type="text" name="zip" className={validation.zip.message ? "form-control is-invalid": "form-control"} placeholder="Zip Code"  value={ zip } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.zip.message }</div>
                                                    </div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">City</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-city"></i></span>
                                                        </div>
                                                        <input  type="text" name="city" className={validation.city.message ? "form-control is-invalid": "form-control"}  placeholder="City"  value={ city } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.city.message }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">State</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                        </div>
                                                        <input  type="text" name="state" className={validation.state.message ? "form-control is-invalid": "form-control"} placeholder="State"  value={ state } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.state.message }</div>
                                                    </div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Country</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                        </div>
                                                        <input  type="text" name="country" className={validation.country.message ? "form-control is-invalid": "form-control"} placeholder="Country"  value={ country } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.country.message }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required"> Contact Number </label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-mobile"></i></span>
                                                        </div>
                                                        <input  type="text" name="emergency_contact" className={validation.emergency_contact.message ? "form-control is-invalid": "form-control"} placeholder="Contact Number"  value={ emergency_contact } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.emergency_contact.message }</div>
                                                    </div>
                                                    <span className="about_length text-red"> {contactFieldValidation ? contactFieldValidation :''}</span>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Company Type</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-business-time"></i></span>
                                                        </div>
                                                        <input  type="text" name="type" className={validation.type.message ? "form-control is-invalid": "form-control"} placeholder="Type"  value={ type } onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.type.message}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col'>
                                                    <label className="required">About</label>
                                                    <div className="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                                                        </div>
                                                        <textarea  type="text" rows="3" name="about" className={validation.about.message ? "form-control is-invalid": "form-control"}  placeholder="About"   onChange={this.handleInputChange}/>
                                                        <div class="invalid-feedback">{validation.about.message }</div>
                                                    </div>
                                                    <span className="minchar about_length text-red"> {aboutFieldValidation? aboutFieldValidation:''}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="Add" className="btn btn-info"/></span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                        <Modal visible={ this.state.show ==='success' ? true : false}>
                            <div className="card">
                                <div className="alert alert-success user-success-message">
                                <strong>Your Company is going to admin approval </strong> 
                                <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>  
                                </div>
                            </div>
                        </Modal>
                        </Page>
                </section>
                <Footer/>
            </div>
            <Modal visible={ this.state.show ==='success' ? true : false}>
                <div className="card">
                    <div className="alert alert-success user-success-message">
                        <strong> Please first create your company profile. !  </strong>   
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
export default withRouter(CreateCompanyProfile);