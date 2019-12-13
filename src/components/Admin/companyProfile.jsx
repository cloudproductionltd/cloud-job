import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import Breadcumb from './Home/Breadcumb';
import Footer from './Home/Footer';
import Sidebar from './Home/Sidebar';
import FormValidator from '../../helpers/FormValidator';
import 'react-dropdown-tree-select/dist/styles.css'

const $ = window.$;

class CompanyWizardProfile extends Component {

    constructor() {
        super();
        this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Company name is required.'
            },
            {
                field: 'address',
                method: 'isEmpty',
                validWhen: false,
                message: 'Company address details is required.'
            },
            {
                field: 'city',
                method: 'isEmpty',
                validWhen: false,
                message: 'City is required.'
            },
            {
                field: 'type',
                method: 'isEmpty',
                validWhen: false,
                message: 'Industry Type is required.'
            },
            {
                field: 'web',
                method: 'isEmpty',
                validWhen: false,
                message: 'Website url is required.'
            },
            {
                field: 'region',
                method: 'isEmpty',
                validWhen: false,
                message: 'Region is required.'
            },
            {
                field: 'country',
                method: 'isEmpty',
                validWhen: false,
                message: 'Country is required.'
            },
            {
                field: 'about',
                method: 'isEmpty',
                validWhen: false,
                message: 'Business description is required.'
            }
        ]);

        this.validatorTwo = new FormValidator([
            {
                field: 'first_name',
                method: 'isEmpty',
                validWhen: false,
                message: 'First name is required.'
            },
            {
                field: 'last_name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Last name is required.'
            },
            {
                field: 'company_designaton',
                method: 'isEmpty',
                validWhen: false,
                message: 'Your designation is required.'
            },
            {
                field: 'contact_email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Company email is required.'
            },
            {
                field: 'contact_email',
                method: 'isEmail',
                validWhen: true,
                message: 'Must be a valid email'
            },
            {
                field: 'phone',
                method: 'isEmpty',
                validWhen: false,
                message: 'Contact name is required.'
            }
        ]);

        this.state = {
            step: 1,
            name: '',
            address: '',
            type: '',
            email: '',
            web: '',
            region: '',
            city: '',
            country: '',
            first_name: '',
            last_name: '',
            company_designaton: '',
            contact_email: '',
            phone: '',
            about: '',
            logo: '',
            logoPreview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu7XcyP0vxZihVcj-WVGILeDEft_GXk0A__yfC4iO-6KgHyprh',
            personOne: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWmGCIdAxMiMx407obVe8rBdY_zcexrY9nuxwBqQpH_OGBqk-B',
            personTwo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWmGCIdAxMiMx407obVe8rBdY_zcexrY9nuxwBqQpH_OGBqk-B',
            error: {},
            nameFieldValidation: '',
            addressFieldValidation: '',
            webFieldValidation: '',
            aboutFieldValidation: '',
            emailFieldValidation: '',
            validation: this.validator.valid(),
            validationTwo: this.validatorTwo.valid()
        }
        this.submitted = false;
    }

    setValueToState = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setLogoToState = e => {
        e.preventDefault();

        this.setState({ logoPreview: URL.createObjectURL(e.target.files[0]) });

        let logoName = Math.random().toString().substring(2, 13) + '_' + new Date().getTime() + '_' + Math.random().toString().substring(2, 13) + '.png'
        this.setState({ logo: logoName });
        const picture = new FormData();
        picture.append('photo', e.target.files[0], logoName);

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/companies/upload/logo`, picture,
            { headers: headers }
        )
            .then((result) => {
                console.log('result:', result)

            })
            .catch((error) => {
                console.log('error:', error)
            });

    }

    setPesonOnePhoto = e => {
        e.preventDefault();
        this.setState({ personOne: URL.createObjectURL(e.target.files[0]) });
        let photoName = Math.random().toString().substring(2, 13) + '_' + new Date().getTime() + '_' + Math.random().toString().substring(2, 13) + '.png'
        this.setState({ photo: photoName });
        const picture = new FormData();
        picture.append('personOne', e.target.files[0], photoName);
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/companies/upload/person-one`, picture,
            { headers: headers }
        )
            .then((result) => {
                console.log('result:', result)
            })
            .catch((error) => {
                console.log('error:', error)
            });
    }

    setPesonTwoPhoto = e => {
        e.preventDefault();
        e.preventDefault();
        this.setState({ personTwo: URL.createObjectURL(e.target.files[0]) });
        let photoName2 = Math.random().toString().substring(2, 13) + '_' + new Date().getTime() + '_' + Math.random().toString().substring(2, 13) + '.png'
        this.setState({ photo2: photoName2 });
        const picture = new FormData();
        picture.append('personTwo', e.target.files[0], photoName2);
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/companies/upload/person-two`, picture,
            { headers: headers }
        )
            .then((result) => {
                console.log('result:', result)
            })
            .catch((error) => {
                console.log('error:', error)
            });
    }

    StepOneValidator = (e, history) => {
        let { name, address, web, region, city, country, type, about } = this.state
        this.submitted = true;
        const validation = this.validator.validate({ name, address, web, city, region, country, type, about });
        this.setState({ validation })
        if (validation.isValid) {
            let error_count = 0
            this.setState({
                emailFieldValidation: '',
                nameFieldValidation: '',
                addressFieldValidation: '',
                webFieldValidation: '',
                aboutFieldValidation: '',
            })

            if (this.state.name.length < 7 || this.state.name.length > 40) {
                this.setState({
                    nameFieldValidation: 'Company name must be at least 7 or equal to 40 characters long'
                })
                error_count++
            }
            if (this.state.address.length < 20) {
                this.setState({
                    addressFieldValidation: 'Length must be at least 20 characters long'
                })
                error_count++
            }
            if (!this.state.web.match(/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
                this.setState({
                    webFieldValidation: 'Please enter the valid url starting with http://'
                })
                error_count++
            }
            if (this.state.about.length < 100 || this.state.about.length > 400) {
                this.setState({
                    aboutFieldValidation: 'Business details should be at least 100 to 400 charecter '
                })
                error_count++
            }
            console.log('error_count:', error_count)
            if (error_count === 0) {
                this.setState({ step: 2 })
            }
        }
        this.submitted = false;
    }

    StepTwoValidator = (e) => {
        this.submitted = true;
        const validationTwo = this.validatorTwo.validate(this.state);
        this.setState({ validationTwo });
        if (validationTwo.isValid)
            this.setState({ step: 3 })
        this.submitted = false;
    }

    storeCompanyProfile = (e) => {
        let {
            name,
            address,
            region,
            country,
            city,
            state,
            prefecture,
            type,
            business_licence_no,
            recruiter_licence_no,
            web,
            logo,
            about,
            first_name,
            middle_name,
            last_name,
            company_designaton,
            contact_email,
            phone,
            photo,
            first_name2,
            middle_name2,
            last_name2,
            company_designaton2,
            contact_email2,
            phone2,
            photo2,
            id
        } = this.state

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/companies/`, {
            name,
            address,
            region,
            country,
            city,
            state,
            prefecture,
            type,
            business_licence_no,
            recruiter_licence_no,
            web,
            logo,
            about,
            first_name,
            middle_name,
            last_name,
            company_designaton,
            contact_email,
            phone,
            photo,
            first_name2,
            middle_name2,
            last_name2,
            company_designaton2,
            contact_email2,
            phone2,
            photo2,
            id,
            report: ''
        },
            { headers: headers }
        )
            .then((result) => {
                this.state = {}
                this.props.history.push('/recruiter/company/pending')
            })
            .catch((error) => {
                this.setState({
                    nameFieldValidation: error.response.data.items.name
                })
                console.log(this.state)
            });
    }

    componentDidMount = async () => {
        const { match: { params } } = this.props;
        let id = params.id;
        if (id) {
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('cool-jwt')
            }
            await Axios.get(`companies/recruiter/pending/${id}`, {
                headers: headers
            })
                .then(response => {
                    this.setState({
                        name: response.data.company.name,
                        address: response.data.company.address ? response.data.company.address : '',
                        region: response.data.company.region ? response.data.company.region : '',
                        country: response.data.company.country ? response.data.company.country : '',
                        city: response.data.company.city ? response.data.company.city : '',
                        state: response.data.company.state ? response.data.company.state : '',
                        prefecture: response.data.company.prefecture ? response.data.company.prefecture : '',
                        type: response.data.company.type ? response.data.company.type : '',
                        business_licence_no: response.data.company.business_licence_no ? response.data.company.business_licence_no : '',
                        recruiter_licence_no: response.data.company.recruiter_licence_no ? response.data.company.recruiter_licence_no : '',
                        web: response.data.company.web ? response.data.company.web : '123',
                        logo: response.data.company.logo ? response.data.company.logo : '',
                        about: response.data.company.about ? response.data.company.about : '',
                        first_name: response.data.company.first_name ? response.data.company.first_name : '',
                        middle_name: response.data.company.middle_name ? response.data.company.middle_name : '',
                        last_name: response.data.company.last_name ? response.data.company.last_name : '',
                        company_designaton: response.data.company.company_designaton ? response.data.company.company_designaton : '',
                        contact_email: response.data.company.contact_email ? response.data.company.contact_email : '',
                        phone: response.data.company.phone ? response.data.company.phone : '',
                        photo: response.data.company.photo ? response.data.company.photo : '',
                        first_name2: response.data.company.first_name2 ? response.data.company.first_name2 : '',
                        middle_name2: response.data.company.middle_name2 ? response.data.company.middle_name2 : '',
                        last_name2: response.data.company.last_name2 ? response.data.company.last_name2 : '',
                        company_designaton2: response.data.company.company_designaton2 ? response.data.company.company_designaton2 : '',
                        contact_email2: response.data.company.contact_email2 ? response.data.company.contact_email2 : '',
                        phone2: response.data.company.phone2 ? response.data.company.phone2 : '',
                        photo2: response.data.company.photo2 ? response.data.company.photo2 : '',
                        id: id,
                        report: response.data.company.report ? response.data.company.report : '',
                        logoPreview : response.data.company.logo ?  `http://localhost:5000/public/uploads/company/logo/${response.data.company.logo}` :`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu7XcyP0vxZihVcj-WVGILeDEft_GXk0A__yfC4iO-6KgHyprh`,
                        personOne : response.data.company.photo ?  `http://localhost:5000/public/uploads/company/contact/${response.data.company.photo}` :`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWmGCIdAxMiMx407obVe8rBdY_zcexrY9nuxwBqQpH_OGBqk-B`,
                        personTwo :  response.data.company.photo2 ?  `http://localhost:5000/public/uploads/company/contact/${response.data.company.photo2}` :`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWmGCIdAxMiMx407obVe8rBdY_zcexrY9nuxwBqQpH_OGBqk-B`,
                    })
                })
                .catch(error => {

                })
        }

        console.log('State:', this.state)
        $(document).ready(function () {
            var navListItems = $('div.setup-panel div a'),
                navListItemsPara = $('div.setup-panel div p'),
                allWells = $('.setup-content'),
                allNextBtn = $('.nextBtn');
            navListItems.click(function (e) {
                e.preventDefault();
                var $target = $($(this).attr('href')),
                    $item = $(this);
                if (!$item.hasClass('disabled')) {
                    navListItems.removeClass('activecom').addClass('btn-light');
                    navListItemsPara.removeClass('disActive').addClass('active');
                    navListItemsPara.addClass('active');
                    $item.addClass('activecom');
                    $target.show();
                    $target.find('input:eq(0)').focus();
                }
                else { }
            });

            allNextBtn.click(function () {
                var curStep = $(this).closest(".setup-content"),
                    curStepBtn = curStep.attr("id"),
                    nextStepWizard = $('div.stup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                    curInputs = curStep.find("input[type='text'],input[type='url']"),
                    isValid = true;

                $(".form-group").removeClass("has-error");
                for (var i = 0; i < curInputs.length; i++) {
                    if (!curInputs[i].validity.valid) {
                        isValid = false;
                        $(curInputs[i]).closest(".form-group").addClass("has-error");
                    }
                }
                if (isValid)
                    nextStepWizard.removeAttr('disabled').trigger('click');
            });
            $('div.setup-panel div a.btn-primary').trigger('click');
        })
    }

    render() {
        let { report } = this.state
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
        let validationTwo = this.submitted ? this.validatorTwo.validate(this.state) : this.state.validationTwo
        let { step, nameFieldValidation, addressFieldValidation, webFieldValidation, aboutFieldValidation } = this.state

        return (
            <div>
                <Sidebar />
                <div className="page">
                    <Breadcumb />

                    <section class="commonAdminForms">
                        <div class="container-fluid">
                            <div class="row justify-content-md-center">
                                <div class="col col-lg-10">

                                    <div className="card wizard-card">
                                        <div className="card-header">
                                            <h4 className="mb-0">Company Profile</h4>
                                        </div>
                                        {
                                            (this.state.report) ?
                                                <div class="alert alert-danger">
                                                    <strong>Disapproval massage  :  {this.state.report} </strong>
                                                </div> : ''
                                        }
                                        <div class="stepwizard">
                                            <div class="stepwizard-row setup-panel">
                                                <div class="steTwoWrap stepwizard-stepCompany afcolorActive">
                                                    <a href="#" id="" type="button" class={step === 1 ? 'btn activecom btn-circle' : 'btn btn-circle btn-light'}><i class="fas fa-building"></i></a>
                                                    <p className={step === 1 ? 'mb-0 priCoAll active mt-2' : 'mb-0 priCoAll  mt-2'}>Company Details
                                                            <span className="cmWiSubtitle">Enter your first time company details</span>
                                                    </p>
                                                </div>
                                                <div class="steThreeoWrap stepwizard-stepCompany">
                                                    <a href="#" type="button" class={step === 2 ? 'btn activecom btn-circle' : 'btn btn-circle btn-light'}><i class="fas fa-mobile-alt"></i></a>
                                                    <p className={step === 2 ? 'mb-0 priCoAll active mt-2' : 'mb-0 priCoAll  mt-2'}>Contact Details (Primary)
                                                            <span className="cmWiSubtitle">Enter your first time contact details(Primary)</span>
                                                    </p>
                                                </div>
                                                <div class="steFourWrap stepwizard-stepCompany">
                                                    <a href="#" id="" type="button" class={step === 3 ? 'btn activecom btn-circle' : 'btn btn-circle btn-light'} disabled="disabled"><i class="fas fa-mobile-alt"></i></a>
                                                    <p className={step === 3 ? 'mb-0 priCoAll active mt-2' : 'mb-0 priCoAll  mt-2'}>Contact Details (Secondary)
                                                            <span className="cmWiSubtitle">Enter your first time contact details(Secondary)</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div class="row setup-content" id="step-1" class={step !== 1 ? "hide" : ''}>
                                                <div class="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i class="fas fa-building"></i></span>Company Details<span className="stepName">Step 1-3</span></h4>
                                                    </div>
                                                    <div className="companyProfileForm step1Form form-horizontal">
                                                        <div className="form-row firProw">
                                                            <div className='form-group col-lg-12 col-md-12 col-sm-12 col-12'>
                                                                <label className="required" for="name">Company Name </label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} value={this.state.name} name="name" className={validation.name.message ? "form-control is-invalid" : "form-control"} placeholder="Company Name" />
                                                                    <div class="invalid-feedback" style={{ 'display': 'block' }}>{validation.name.message} {nameFieldValidation}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-row">
                                                            <div className='form-group col-lg-3 col-md-3 col-sm-12 col-12'>
                                                                <label className="required">Company Address</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-map-marker"></i></span>
                                                                    </div>
                                                                    <select id="region" className={validation.region.message ? "cmPrAdd form-control is-invalid" : "cmPrAdd form-control"} onChange={this.setValueToState} value={this.state.region} name="region">
                                                                        <option>Region</option>
                                                                        <option value="asia">Asia</option>
                                                                        <option value="North America">North America</option>
                                                                        <option value="South America">South America</option>
                                                                        <option value="Europe">Europe</option>
                                                                        <option value="Oceania">Oceania</option>
                                                                        <option value="Africa">Africa</option>
                                                                    </select>
                                                                    <div class="invalid-feedback">{validation.region.message}</div>
                                                                    {/* <label className="required" for="address">Company Address Details</label>
                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"><i class="fas fa-map-marker"></i></span>
                                                                        </div>
                                                                        <input  type="text" onChange={this.setValueToState}  name="address" value={this.state.address} className={validation.address.message ? "form-control is-invalid": "form-control"} placeholder="Company Address Details"/>
                                                                        <div class="invalid-feedback" style={{'display':'block'}}>{validation.address.message } { addressFieldValidation }</div>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-lg-3 col-md-3 col-sm-12 col-12'>
                                                                <label className="invisibleCm">Country</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                                    </div>
                                                                    <select id="country" className={validation.country.message ? "cmPrAdd form-control is-invalid" : "cmPrAdd form-control"} onChange={this.setValueToState} value={this.state.country} name="country">
                                                                        <option>Country</option>
                                                                        <option value="Bangladesh">Bangladesh</option>
                                                                        <option value="India">India</option>
                                                                        <option value="China">China</option>
                                                                        <option value="Indonesia">Indonesia</option>
                                                                        <option value="Afghanistan">Afghanistan</option>
                                                                        <option value="Bhutan">Bhutan</option>
                                                                    </select>
                                                                    <div class="invalid-feedback">{validation.country.message}</div>
                                                                </div>
                                                            </div>

                                                            <div className='form-group col-12 col-lg-3 col-md-3 col-sm-12'>
                                                                <label className="invisibleCm">City</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                                    </div>
                                                                    <select id="city" className={validation.city.message ? "cmPrAdd form-control is-invalid" : "cmPrAdd form-control"} onChange={this.setValueToState} value={this.state.city} name="city">
                                                                        <option>City</option>
                                                                        <option value="Barisal">Barisal anchal</option>
                                                                        <option value="Bandarban">Bandarban anchal</option>
                                                                        <option value="Chittagong">Chittagong anchal</option>
                                                                        <option value="ChittagongHill">Chittagong Hill Tracts</option>
                                                                        <option value="Comilla anchal">Comilla anchal</option>
                                                                        <option value="Noakhali anchal">Noakhali anchal</option>
                                                                        <option value="Sylhet anchal">Sylhet anchal</option>
                                                                        <option value="Dhaka anchal">Dhaka anchal</option>
                                                                        <option value="Faridpur anchal">Faridpur anchal</option>
                                                                        <option value="Jamalpur anchal">Jamalpur anchal</option>
                                                                        <option value="Mymensingh anchal">Mymensingh anchal</option>
                                                                        <option value="Tangail anchal">Tangail anchal</option>
                                                                        <option value="Jessore anchal">Jessore anchal</option>
                                                                        <option value="Khulna anchal">Khulna anchal</option>
                                                                        <option value="Khustia anchal">Khustia anchal</option>
                                                                        <option value="Bogra anchal">Bogra anchal</option>
                                                                        <option value="Dinajpur anchal">Dinajpur anchal</option>
                                                                    </select>
                                                                    <div class="invalid-feedback">{validation.city.message}</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-12 col-lg-3 col-md-3 col-sm-12 prefecLabel'>
                                                                <label className="invisibleCm">Prefecture</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                                    </div>
                                                                    <select id="prefecture" className="form-control cmPrAdd" onChange={this.setValueToState} value={this.state.prefecture} name="prefecture">
                                                                        <option>Prefecture</option>
                                                                        <option value="Ghazipur">Ghazipur</option>
                                                                        <option value="Kishoreganj">Kishoreganj</option>
                                                                        <option value="Manikganj">Manikganj</option>
                                                                        <option value="Munshiganj">Munshiganj</option>
                                                                        <option value="Narayanganj">Narayanganj</option>
                                                                        <option value="Narsingdi">Narsingdi</option>
                                                                        <option value="Tangail">Tangail</option>
                                                                        <option value="Faridpur">Faridpur</option>
                                                                        <option value="Gopalganj">Gopalganj</option>
                                                                        <option value="Madaripur">Madaripur</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className='form-group col-12 col-lg-3 col-md-6 col-sm-6'>
                                                                <label className="invisibleDispaly">State</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                                    </div>
                                                                    <select id="state" className="form-control cmPrAdd" onChange={this.setValueToState}  value={this.state.state} name="state">
                                                                        <option>State</option>
                                                                        <option value="Barisal">Barisal</option>
                                                                        <option value="Bandarban">Bandarban</option>
                                                                        <option value="Comilla">Comilla</option>
                                                                        <option value="Noakhali">Noakhali</option>
                                                                        <option value="Sylhet">Sylhet</option>
                                                                        <option value="Dhaka">Dhaka</option>
                                                                        <option value="Faridpur">Faridpur</option>
                                                                        <option value="Jamalpur">Jamalpur</option>
                                                                        <option value="Mymensingh">Mymensingh</option>
                                                                        <option value="Tangail">Tangail</option>
                                                                        <option value="Jessore">Jessore</option>
                                                                        <option value="Khulna">Khulna</option>
                                                                        <option value="Khustia">Khustia</option>
                                                                        <option value="Bogra">Bogra</option>
                                                                        <option value="Dinajpur">Dinajpur</option>
                                                                    </select>
                                                                </div>
                                                            </div> */}

                                                        <div className="form-row">
                                                            <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                                <label className="required" for="address">Company Address Details</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-map-marker"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} name="address" value={this.state.address} className={validation.address.message ? "form-control is-invalid" : "form-control"} placeholder="Company Address Details" />
                                                                    <div class="invalid-feedback" style={{ 'display': 'block' }}>{validation.address.message} {addressFieldValidation}</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-lg-3 col-md-3'>
                                                                <label className="" for="business_licence_no">Business Licence No</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} value={this.state.business_licence_no} name="business_licence_no" id="business_licence_no" className="form-control" placeholder="Business Licence No" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-lg-3 col-md-3'>
                                                                <label className="" for="recruiter_licence_no">RL No (Only Recruiting Agent)</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} value={this.state.recruiter_licence_no} name="recruiter_licence_no" id="recruiter_licence_no" className="form-control" placeholder="RL No" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-row">
                                                            <div className='form-group col-lg-12 col-md-12 col-sm-12 col-12'>
                                                                <label className="required">Industry Type</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-industry"></i></span>
                                                                    </div>
                                                                    <select id="type" value={this.state.type} className={validation.type.message ? "cmPrAdd form-control is-invalid" : "cmPrAdd form-control"} name="type" onChange={this.setValueToState}>
                                                                        <option>Industry</option>
                                                                        <option value="Software">Software</option>
                                                                        <option value="Networking">Networking</option>
                                                                        <option value="Marketing">Marketing</option>
                                                                        <option value="Manufacturing Business">Manufacturing Business</option>
                                                                        <option value="Others">Others</option>
                                                                    </select>
                                                                    <div class="invalid-feedback">{validation.type.message}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-row">
                                                            <div className='form-group col-md-6'>
                                                                <label className="required" for="web">Website URL</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fab fa-weebly"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} value={this.state.web} name="web" className={validation.web.message ? "form-control is-invalid" : "form-control"} id="web" placeholder="Website URL" aria-label="Website URL" aria-describedby="basic-addon2"></input>
                                                                    <div class="invalid-feedback" style={{ 'display': 'block' }}>{validation.web.message ? validation.web.message : webFieldValidation}</div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label className="">Logo</label>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group-prepend fileUpload">
                                                                        <span class="input-group-text"><i class="fas fa-upload"></i></span>
                                                                    </div>
                                                                    <div class="custom-file customFileWrap">
                                                                        <input type="file" onChange={this.setLogoToState} name="logo" class="custom-file-input" id="inputLogo" />
                                                                        <label class="custom-file-label" for="inputLogo">Choose File</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <label className="required" for="about">Business Description</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea
                                                                        onChange={this.setValueToState}
                                                                        rows="2"
                                                                        className={validation.about.message ? "form-control is-invalid" : "form-control"}
                                                                        id="about"
                                                                        name="about"
                                                                        placeholder="Business description"
                                                                        value={this.state.about}
                                                                    >
                                                                        {this.state.about}
                                                                    </textarea>
                                                                    <div class="invalid-feedback" style={{ 'display': 'block' }}>{validation.about.message ? validation.about.message : aboutFieldValidation}</div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label className="required" for="about">Preview</label>
                                                                <div className="input-group">
                                                                    <img style={{
                                                                        "height": "100px",
                                                                        "border-radius": "5px",
                                                                        "border": "1px solid #ccc",
                                                                        "padding": "2px"
                                                                    }}
                                                                        src={this.state.logoPreview} alt="" />
                                                                </div>
                                                                {/* <img className="img-responsive img-rounded" height="150px" width="150px" src={`http://localhost:5000/public/uploads/company/contact/${this.state.photo2}`} alt=""/> */}
                                                            </div>
                                                        </div>
                                                        <div className="jSeeBtWrap">
                                                            <div className="nextBtnWrap" >
                                                                <button align="right" onClick={(e) => this.StepOneValidator(e)} class="btn btn-success nextBtn btn-md"><span className="insBtIcon"><i class="fas fa-chevron-right"></i></span>
                                                                    <span className="wrapToSpan">Next Step <br /><span className="botBtn">Confirm Your Details</span></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row setup-content" id="step-2" class={step !== 2 ? "hide" : ''}>
                                                <div class="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i class="fas fa-mobile-alt"></i></span>Contact Details (Primary)<span className="stepName">Step 2-3</span></h4>
                                                    </div>
                                                    <div className="companyProfileForm step1Form form-horizontal">
                                                        <div className="form-row firProw">
                                                            <div className='form-group col-md-4 col-sm-12 col-12'>
                                                                <label className="required">First Name</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} className={validationTwo.first_name.message ? "form-control is-invalid" : "form-control"} name="first_name" value={this.state.first_name} placeholder="First Name" />
                                                                    <div class="invalid-feedback">{validationTwo.first_name.message}</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4 col-sm-12 col-12'>
                                                                <label className="required">Last Name</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} className={validationTwo.last_name.message ? "form-control is-invalid" : "form-control"} name="last_name" value={this.state.last_name} placeholder="Last Name" />
                                                                    <div class="invalid-feedback">{validationTwo.last_name.message}</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4 col-sm-12 col-12'>
                                                                <label className="">Middle Name</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                    </div>
                                                                    <input type="text" name="middle_name" value={this.state.middle_name} onChange={this.setValueToState} className="form-control" placeholder="Middle Name" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-4'>
                                                                <label className="required">Contact Designation</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                                    </div>
                                                                    <input type="text" value={this.state.company_designaton} onChange={this.setValueToState} className={validationTwo.company_designaton.message ? "form-control is-invalid" : "form-control"} name="company_designaton" placeholder="Contact Designation" />
                                                                    <div class="invalid-feedback">{validationTwo.company_designaton.message}</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4'>
                                                                <label className="required">Contact Email</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-envelope"></i></span>
                                                                    </div>
                                                                    <input value={this.state.contact_email} type="email" onChange={this.setValueToState} className={validationTwo.contact_email.message ? "form-control is-invalid" : "form-control"} name="contact_email" placeholder="Contact Email" />
                                                                    <div class="invalid-feedback">{validationTwo.contact_email.message}</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4'>
                                                                <label className="required">Contact No</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-mobile"></i></span>
                                                                    </div>
                                                                    <input type="text" value={this.state.phone} onChange={this.setValueToState} className={validationTwo.phone.message ? "form-control is-invalid" : "form-control"} name="phone" placeholder="Contact No" />
                                                                    <div class="invalid-feedback">{validationTwo.phone.message}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <label className="">Photo</label>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group-prepend fileUpload">
                                                                        <span class="input-group-text"><i className="fas fa-upload"></i></span>
                                                                    </div>
                                                                    <div class="custom-file customFileWrap">
                                                                        <input type="file" onChange={this.setPesonOnePhoto} name="" class="custom-file-input" id="inputGroupFile01" />
                                                                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label for="about">Preview</label>
                                                                <div className="input-group">
                                                                    <img style={{
                                                                        "height": "100px",
                                                                        "border-radius": "5px",
                                                                        "border": "1px solid #ccc",
                                                                        "padding": "2px"
                                                                    }}
                                                                        src={this.state.personOne} alt="Your photo here" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="jSeeBtWrap">
                                                            <div className="previousBtnWrap" onClick={() => { this.setState({ step: 1 }) }}>
                                                                <button align="left" class="btn nextStep previousBtn btn-md" type="button" ><span className="insBtIcon"><i class="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Personal Information</span></span></button>
                                                            </div>
                                                            <div className="nextBtnWrap" onClick={(e) => this.StepTwoValidator(e)}>
                                                                <button align="right" class="btn btn-success nextBtn btn-md" type="submit" ><span className="insBtIcon"><i class="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row setup-content" id="step-3" class={step !== 3 ? "hide" : ''}>
                                                <div class="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i class="fas fa-mobile-alt"></i></span>Contact Details (Secondary)<span className="stepName">Step 3-3</span></h4>
                                                    </div>
                                                    <div className="companyProfileForm step1Form form-horizontal">
                                                        <div className="form-row firProw">
                                                            <div className='form-group col-md-4 col-sm-12 col-12'>
                                                                <label className="">First Name</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} value={this.state.first_name2} name="first_name2" className="form-control" placeholder="First Name" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4 col-sm-12 col-12'>
                                                                <label className="">Last Name</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} value={this.state.last_name2} name="last_name2" className="form-control" placeholder="Last Name" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4 col-sm-12 col-12'>
                                                                <label className="">Middle Name</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} name="middle_name2" value={this.state.middle_name2} className="form-control" placeholder="Middle Name" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-4'>
                                                                <label className="">Contact Designation</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fab fa-font-awesome-flag"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} name="company_designaton2" value={this.state.company_designaton2} className="form-control" placeholder="Company Designation" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4'>
                                                                <label className="">Contact Email</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-envelope"></i></span>
                                                                    </div>
                                                                    <input type="email" onChange={this.setValueToState} className="form-control" value={this.state.contact_email2} name="contact_email2" placeholder="Contact Email" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4'>
                                                                <label className="">Contact No</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i class="fas fa-mobile"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} className="form-control" name="phone2" value={this.state.phone2} placeholder="Contact No" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <label className="">Photo</label>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group-prepend fileUpload">
                                                                        <span class="input-group-text"><i className="fas fa-upload"></i></span>
                                                                    </div>
                                                                    <div class="custom-file customFileWrap">
                                                                        <input type="file" name="photo2" onChange={this.setPesonTwoPhoto} class="custom-file-input" id="photo2" />
                                                                        <label class="custom-file-label" for="photo2">Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label for="about">Preview</label>
                                                                <div className="input-group">
                                                                    <img style={{
                                                                        "height": "100px",
                                                                        "border-radius": "5px",
                                                                        "border": "1px solid #ccc",
                                                                        "padding": "2px"
                                                                    }}
                                                                        src={this.state.personTwo} alt="Your photo here" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="jSeeBtWrap">
                                                            <div className="previousBtnWrap" onClick={() => { this.setState({ step: 2 }) }}>
                                                                <button align="left" class="btn nextStep previousBtn btn-md" type="button" ><span className="insBtIcon"><i class="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Contact Details</span></span></button>
                                                            </div>
                                                            <div className="nextBtnWrap">
                                                                <button align="right" class="btn btn-primary nextBtn btn-md" onClick={(e) => this.storeCompanyProfile(e)}><span className="insBtIcon finishcm"><i class="fas fa-chevron-right"></i></span><span className="wrapToSpan">Finish!<br /><span className="botBtn">Confirm Your Details</span></span></button>
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
                    </section>
                    <Footer />
                </div>
            </div>
        )
    }
}
export default withRouter(CompanyWizardProfile);