import React, { Component } from 'react';
import Footer from './Home/Footer';
import Sidebar from './Home/Sidebar';
import Breadcumb from './Home/Breadcumb';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import FormValidator from './../../helpers/FormValidator';
import DatePicker from "react-datepicker";
import ReactQuill from 'react-quill';
import Page from 'react-page-loading';
import 'react-quill/dist/quill.snow.css';

class JobPostEdit extends Component {
    
    
    constructor() {
        super();
        this.setDateToState = this.setDateToState.bind(this)
        this.jobInfoValidator = new FormValidator([
            { 
                field: 'title', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Job title is required!' 
            },
            { 
                field: 'joblevel', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Job level is required!' 
            },
            { 
                field: 'jobType', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'job type is required!' 
            },
            
            { 
                field: 'category', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Job category is required!' 
            },
            { 
                field: 'sub_category', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Job sub category is required!' 
            },
            { 
                field: 'deadline',
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Deadline is required!' 
            },
            { 
                field: 'description', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Job description is required!' 
            }
        ])

        this.jobRequirmentValidator = new FormValidator([
            { 
                field: 'skills', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Skill is required!' 
            },
            { 
                field: 'experience', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Experience is required!' 
            },
            { 
                field: 'education', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Education is required!' 
            }
        ])

        this.facilityInfoValidator = new FormValidator([
            { 
                field: 'salary', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Required salary must be number!' 
            }
        ])

        this.companyInfoValidator = new FormValidator([
            { 
                field: 'company_name', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Company name is required!'
            }
        ])

        this.state = {
            update_job_id:'',
            step: 1,
            stepOne:'',
            stepFour:'',
            job_id: Date.now(),
            title:'',
            vacancy:1,
            joblevel:'',
            jobType:'',
            category:'',
            sub_category:'',
            job_location:'',
            deadline:  new Date().setDate(new Date().getDate()+30),
            description:'',
            jobInfoValidation: this.jobInfoValidator.valid(),

            stepTwo:'',
            required_age:'',
            visa_sponsorshop:'',
            apply_online:'',
            skills: '',
            education:'',
            additional_requirment:'',
            experience:'',
            language_requirment:'',
            jobRequirmentValidation: this.jobRequirmentValidator.valid(),

            stepThree:'',
            salary:'',
            is_negotiable:'',
            transfer_allowance:'',
            home_rent_allowance:'',
            medical_allowance:'',
            
            working_place:'',
            bonous:'',
            facilityInfoValidation: this.facilityInfoValidator.valid(),

            stepFour:'',
            company_name:'',
            company_details:'',
            company_description:'',
            companyInfoValidation: this.companyInfoValidator.valid()
        }
        this.submitted = false;
    }
    
    componentDidMount ()  {
        const { match: { params } } = this.props; 
        let job_id = params.id;
    
        this.setState({
            update_job_id :params.id
        })

        
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        axios.get(`/jobs/company/${job_id}`,{headers:headers})  
                .then(response => {
                console.log('Recuirter  Job',response.data.response.job)
                    this.setState({
                        title: response.data.response.job? response.data.response.job.title:'',
                        joblevel: response.data.response.job?response.data.response.job.joblevel:'',
                        sub_category: response.data.response.job ? response.data.response.job.sub_category:'',
                        category: response.data.response.job ? response.data.response.job.category:'',
                        jobType: response.data.response.job ?response.data.response.job.jobType:'',
                        job_location: response.data.response.job ? response.data.response.job.job_location:'',
                        description: response.data.response.job ? response.data.response.job.description:'',
                        vacancy: response.data.response.job?response.data.response.job.vacancy:'',
                        required_age: response.data.response.job? response.data.response.job.required_age:'',
                        visa_sponsorshop: response.data.response.job ? response.data.response.job.visa_sponsorshop:'',
                        apply_online: response.data.response.job ? response.data.response.job.apply_online:'',
                        
                        skills: response.data.response.job ? response.data.response.job.skills:'',
                        language_requirment:response.data.response.job? response.data.response.job.language_requirment:'',
                        experience: response.data.response.job ? response.data.response.job.experience:'',
                        education: response.data.response.job ? response.data.response.job.education:'',
                        
                        // logo:response.data.response.job ? response.data.response.job.logo:'',
                        medical_allowance: response.data.response.job ? response.data.response.job.medical_allowance:'',
                        // posted_by: response.data.response.job ? response.data.response.job.posted_by:'',
                        // report:response.data.response.job ? response.data.response.job.report:'',
                        
                        salary: response.data.response.job ? response.data.response.job.salary: '',
                        // slug: response.data.response.job? response.data.response.job.slug:'',
                        // source: response.data.response.job? response.data.response.job.source:'',
                        
                        transfer_allowance: response.data.response.job ? response.data.response.job.transfer_allowance:'',
                        // updatedAt: response.data.response.job ? response.data.response.job.updatedAt: '',
                        working_hour: response.data.response.job? response.data.response.job.working_hour:'',
                        working_place: response.data.response.job? response.data.response.job.working_place:'',
                        additional_requirment: response.data.response.job ? response.data.response.job.additional_requirment:'',
                        
                        bonous: response.data.response.job ? response.data.response.job.bonous:'',
                       
                        company_description: response.data.response.job ? response.data.response.job.company_description:'',
                        company_details: response.data.response.job ? response.data.response.job.company_details:'',
                        company_name: response.data.response.job? response.data.response.job.company_name:'',
                       
                        holiday: response.data.response.job ? response.data.response.job.holiday:'',
                        home_rent_allowance: response.data.response.job ?response.data.response.job.home_rent_allowance:'',
                        is_negotiable: response.data.response.job ? response.data.response.job.is_negotiable:'',
                       
                        
                    })
                })
    }

    setValueToState = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    setDateToState(date){
        if (date === null){
            this.setState({
                deadline: ''
            });
        }else{
            this.setState({
                deadline: date
            });
        }
    }


    submitFormToApi = () => {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        let { update_job_id, job_id, title , working_place , skills, vacancy, joblevel, jobType, category, sub_category,job_location,deadline,description,education,additional_requirment,experience,required_age,visa_sponsorshop,apply_online,language_requirment,salary,is_negotiable,transfer_allowance,home_rent_allowance,medical_allowance,bonous,working_hour,holiday, company_name,logo,company_details,company_description,extra_instruction} = this.state
        
        let job = new Object()
            if(job_id){
                job.job_id=job_id
            }
            if(title){
                job.title=title
            }
            if(vacancy){
                job.vacancy=vacancy
            }
        
            if(joblevel){
                job.joblevel=joblevel
            }
            if(jobType){
                job.jobType=jobType
            }
            if(category){
                job.category=category
            }
            if(sub_category){
                job.sub_category=sub_category
            }
            if(job_location){
                job.job_location=job_location
            }
            if(experience){
                job.experience=experience
            }
            
            if(deadline){
                job.deadline=deadline
            }
            if(description){
                job.description=description
            }
            if(education){
                job.education=education
            }
            if(additional_requirment){
                job.additional_requirment=additional_requirment
            }
            if(required_age){
                job.required_age=required_age
            }
            if(visa_sponsorshop){
                job.visa_sponsorshop=visa_sponsorshop
            }
            if(apply_online){
                job.apply_online=apply_online
            }
            if(language_requirment){
                job.language_requirment=language_requirment
            }
            if(salary){
                job.salary=salary
            }
            if(is_negotiable){
                job.is_negotiable=is_negotiable
            }
            if(transfer_allowance){
                job.transfer_allowance=transfer_allowance
            }

            if(home_rent_allowance){
                job.home_rent_allowance=home_rent_allowance
            }

            if(medical_allowance){
                job.medical_allowance=medical_allowance
            }

            if(bonous){
                job.bonous=bonous
            }

            if(working_hour){
                job.working_hour=working_hour
            }

            if(holiday){
                job.holiday=holiday
            }
            if(company_name){
                job.company_name=company_name
            }
            if(logo){
                job.logo=logo
            }
            if(company_details){
                job.company_details=company_details
            }
            if(company_description){
                job.company_description=company_description
            }
            if(extra_instruction){
                job.extra_instruction=extra_instruction
            }
            
            if(skills){
                job.skills=skills
            }

            
            if(working_place){
                job.working_place=working_place
            }
        axios.put(`/jobs/company/${update_job_id}`, job,{headers: headers}).then( res => {
            console.log('responsejob',res)

            this.setState({

                show : 'success'
            });
        });
    }
    //Step one validation

    validateStepOne = (e) =>{
        console.log('step: 1')
        let { title, joblevel, jobType, category, sub_category, deadline, description } = this.state
        this.submitted = true;
        const jobInfoValidation = this.jobInfoValidator.validate({  title, joblevel, jobType, category, sub_category, deadline, description });
        this.setState({ jobInfoValidation })
        console.log('jobInfoValidation:',jobInfoValidation)
        if(!jobInfoValidation.isValid){
            this.setState({
                step:1
            })
        }
        else{
            this.setState({ stepOne: 1 })
            this.setState({
                step:2
            })
        }
        this.submitted = false;
    }

    validateStepTwo = (e) => {
        console.log('step: 2')
        let { skills, experience, education, stepTwo } = this.state
        this.submitted = true;
        const jobRequirmentValidation = this.jobRequirmentValidator.validate({ skills, experience, education });
        this.setState({ jobRequirmentValidation })
        console.log('jobRequirmentValidation:', jobRequirmentValidation)
        if(!jobRequirmentValidation.isValid){
            console.log('state:', this.state)
            console.log('inValid step 2')
            this.setState({
                step:2
            })
        }
        else{ 
            console.log('Valid step 2')
            this.setState({ stepTwo: true })
            this.setState({
                step:3
            })
        }
        this.submitted = false;

        console.log('State:', this.state)
    }

    validateStepThree = (e) =>{
        console.log('step #3:')
        let { salary, stepThree} = this.state
        this.submitted = true;
        const facilityInfoValidation = this.facilityInfoValidator.validate({ salary });
        this.setState({ facilityInfoValidation })
        console.log('facilityInfoValidation:',facilityInfoValidation)
        if(!facilityInfoValidation.isValid){
            this.setState({
                step:3
            })
        }
        else{
            this.setState({ stepThree: true })
            this.setState({
                step:4
            })
        }
        this.submitted = false;

    }

    validateStepFour = (e) =>{
        console.log('step: 4')
        let { company_name,stepFour } = this.state
        this.submitted = true;
        const companyInfoValidation = this.companyInfoValidator.validate({ company_name });
        this.setState({ companyInfoValidation })
        console.log('companyInfoValidation:',companyInfoValidation)
        if(!companyInfoValidation.isValid){
            this.setState({
                step:4
            })
        }
        else{
            this.setState({ stepFour: 1 })
            this.submitFormToApi()
            console.log('Finish All State:', this.state)
            this.props.history.push('/recruiter/recruiterPendingJobList');
        }
        this.submitted = false;
    }

    render(){
        let { step,job_id, title,working_place, vacancy, joblevel, jobType, category, sub_category, job_location, deadline, description, skills, experience, education, required_age, language_requirment,additional_requirment, salary, is_negotiable, transfer_allowance,  home_rent_allowance, medical_allowance, bonous, working_hour, holiday, company_name, company_details, company_description} = this.state
        let jobInfoValidation = this.submitted ? this.jobInfoValidator.validate({ title, joblevel, jobType, category, sub_category, deadline, description}) : this.state.jobInfoValidation 
        let jobRequirmentValidation = this.submitted ? this.jobRequirmentValidator.validate({ skills, experience, education }) : this.state.jobRequirmentValidation
        let facilityInfoValidation = this.submitted ? this.facilityInfoValidator.validate({ salary }) : this.state.facilityInfoValidation
        let companyInfoValidation = this.submitted ? this.companyInfoValidator.validate({ company_name }) : this.state.companyInfoValidation

        return (
            <div>
                <div className="page commonAdminPage">
                    <Breadcumb/>
                    <section className="commonAdminForms">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-10">
                                    <div className="card wizard-card">
                                        <div className="card-header">
                                            <h4 className="mb-0">Update Job23</h4>
                                        </div>
                                        <div className="stepwizard">
                                            <div className="stepwizard-row setup-panel">
                                                <div className="steTwoWrap stepwizard-stepCompany afcolorActive newpostcm">
                                                    <a href="#" id="" type="button" className={ step === 1 ? 'btn activecom btn-circle': 'btn btn-light btn-circle'}><i className="fas fa-briefcase"></i></a>
                                                    <p className="mb-0 priCoAll active mt-2">Job Related
                                                        {/* <span className="cmWiSubtitle">Enter your first time Job details</span> */}
                                                    </p>
                                                </div>
                                                <div className="steThreeoWrap stepwizard-stepCompany newpostcm">
                                                    <a href="#" type="button" className={ step === 2 ? 'btn activecom btn-circle': 'btn btn-light btn-circle'}><i className="fas fa-cogs"></i></a>
                                                    <p className="mb-0 priCoAll mt-2 disActive">Requirement Related
                                                        {/* <span className="cmWiSubtitle">Enter your first time requirement details</span> */}
                                                    </p>
                                                </div>
                                                <div className="steFourWrap stepwizard-stepCompany newpostcm">
                                                    <a href="#" id="" type="button" className={ step === 3 ? 'btn activecom btn-circle': 'btn btn-light btn-circle'}><i className="fas fa-list"></i></a>
                                                    <p className="mb-0 priCoAll mt-2  disActive">Facility Related
                                                        {/* <span className="cmWiSubtitle">Enter your first time facility details</span> */}
                                                    </p>
                                                </div>
                                                <div className="steFourWrap stepwizard-stepCompany newpostcm">
                                                    <a href="#" id="" type="button" className={ step === 4 ? 'btn activecom btn-circle': 'btn btn-light btn-circle'}><i className="far fa-building"></i></a>
                                                    <p className="mb-0 priCoAll mt-2  disActive">Company Related
                                                        {/* <span className="cmWiSubtitle">Enter your first time company details(Secondary)</span> */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div id="step-1" className= {  step === 1 ?'row setup-content block':'row setup-content hide'}>
                                                <div className="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i className="fas fa-briefcase"></i></span>Job Related<span className="stepName">Step 1-4</span></h4>
                                                    </div>
                                                    <div className="companyProfileForm step1Form form-horizontal">
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6 col-12'>
                                                                <label className="required">Job ID</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fab fa-black-tie"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="job_id" className="form-control" placeholder="Job Id" value={job_id} disabled />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-sm-6 col-12'>
                                                                <label className="required">Job Title</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-pencil-alt"></i></span>
                                                                    </div>
                                                                    <input onChange={this.setValueToState} 
                                                                        value={title} name="title" 
                                                                        className={jobInfoValidation.title.message ? "form-control is-invalid": "form-control"} type="text" 
                                                                        placeholder="Job Title" 
                                                                        />
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobInfoValidation.title.message }</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-4 col-sm-4 col-12'>
                                                                <label className="">Vacancy</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-search-plus"></i></span>
                                                                    </div>
                                                                    <input  type="number" name="vacancy" onChange={this.setValueToState} value={vacancy} className="form-control" placeholder="Vacancy" 
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-12 col-md-4 col-sm-4 '>
                                                                <label className="required">Job Level</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-level-up-alt"></i></span>
                                                                    </div>
                                                                    <select onChange={this.setValueToState} value={joblevel}  className={jobInfoValidation.joblevel.message ? "form-control cmPrAdd is-invalid": "form-control cmPrAdd"} id="nature" name="joblevel">
                                                                    <option value=''>Job Level</option>
                                                                        <option selected={this.state.joblevel == 'Entry'} value="Entry">Entry</option>
                                                                        <option selected={this.state.joblevel == 'Mid'} value="Mid">Mid</option>
                                                                        <option selected={this.state.joblevel == 'Management'} value="Management">Management</option>
                                                                        <option selected={this.state.joblevel == 'HR'} value="HR">HR</option>
                                                                    </select>
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobInfoValidation.joblevel.message }</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-12 col-md-4 col-sm-4'>
                                                                <label className="required">Job Type</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-history"></i></span>
                                                                    </div>
                                                                    <select id="type" onChange={this.setValueToState} value={jobType} className={jobInfoValidation.jobType.message ? "form-control cmPrAdd is-invalid": "form-control cmPrAdd"} name="jobType">
                                                                        <option value="">Job Type</option>
                                                                        <option selected={this.state.jobType == 'Part-time'} value="Part-time">Part-time</option>
                                                                        <option selected={this.state.jobType == 'Full-time'} value="Full-time">Full-time</option>
                                                                        <option selected={this.state.jobType == 'Intern'} value="Intern">Intern</option>
                                                                    </select>
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobInfoValidation.jobType.message }</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="required">Job Category</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-tags"></i></span>
                                                                    </div>
                                                                    <select id="category" onChange={this.setValueToState} value={category}  className={jobInfoValidation.category.message ? "form-control cmPrAdd is-invalid": "form-control cmPrAdd"} name="category">
                                                                        <option value="">Category</option>
                                                                        <option selected={this.state.category == 'Executive'} value="Executive">Executive</option>
                                                                        <option selected={this.state.category == 'IT (PC, Web, Unix)'} value="IT (PC, Web, Unix)"> IT (PC, Web, Unix)</option>
                                                                        <option selected={this.state.category == 'IT (Mainframe)'} value="IT (Mainframe)">IT (Mainframe)</option>
                                                                        <option selected={this.state.category == 'IT (Hardware/Network)'} value="IT (Hardware/Network)">IT (Hardware/Network)</option>
                                                                        <option selected={this.state.category == 'IT (Embedded Software, Control Systems)'} value="IT (Embedded Software, Control Systems)">IT (Embedded Software, Control Systems)</option>
                                                                        <option selected={this.state.category == 'IT (Other)'} value="IT (Other)">IT (Other)</option>
                                                                        <option selected={this.state.category == 'Electronics (Appliance/Semiconductor)'} value="Electronics (Appliance/Semiconductor)">Electronics (Appliance/Semiconductor)</option>
                                                                        <option selected={this.state.category == 'Manufacturing (Automobile/Plant Engineering/Precision Equipment)'} value="Manufacturing (Automobile/Plant Engineering/Precision Equipment)">Manufacturing (Automobile/Plant Engineering/Precision Equipment)</option>
                                                                    </select>
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobInfoValidation.category.message }</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="required">Job Sub-Category</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-layer-group"></i></span>
                                                                    </div>
                                                                    <select id="sub_category" onChange={this.setValueToState} value={sub_category} className={jobInfoValidation.sub_category.message ? "form-control cmPrAdd is-invalid": "form-control cmPrAdd"} name="sub_category">
                                                                        <option value="">Sub-Category</option>
                                                                        <option selected={this.state.sub_category == 'All'} value="All">All</option>
                                                                        <option selected={this.state.sub_category == 'Project Manager'} value="Project Manager">Project Manager</option>
                                                                        <option selected={this.state.sub_category == 'Network Engineer'} value="Network Engineer">Network Engineer</option>
                                                                        <option selected={this.state.sub_category == 'Security System SE'} value="Security System SE">Security System SE</option>
                                                                        <option selected={this.state.sub_category == 'Server Architect and Developer'} value="Server Architect and Developer">Server Architect and Developer</option>
                                                                        <option selected={this.state.sub_category == 'Server and Machine Operation and Maintenance'} value="Server and Machine Operation and Maintenance">Server and Machine Operation and Maintenance</option>
                                                                        <option selected={this.state.sub_category == 'Network Monitoring'} value="Network Monitoring">Network Monitoring</option>
                                                                        <option selected={this.state.sub_category == 'Communication Infrastructure (Including ISP and Carrer)'} value="Communication Infrastructure (Including ISP and Carrer)">Communication Infrastructure (Including ISP and Carrer)</option>
                                                                        <option selected={this.state.sub_category == 'Project Manager'} value="Project Manager">Project Manager</option>
                                                                        <option selected={this.state.sub_category == 'Software Architecture'} value="Software Architecture">Software Architecture</option>
                                                                        <option selected={this.state.sub_category == 'Programmer'} value="Programmer">Programmer</option>
                                                                    </select>
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobInfoValidation.sub_category.message }</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="">Job Location</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                                    </div>
                                                                    <input  type="text" onChange={this.setValueToState} value={job_location}  name="job_location" className="form-control" placeholder="Job Location" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6 col-sm-6 perDaOfBirth">
                                                                <label className="required">Deadline</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                                    </div>
                                                                    <DatePicker onChange={ this.setDateToState } className={jobInfoValidation.deadline.message ? "form-control cmPrAdd is-invalid": "cmPrAdd form-control"} selected={this.state.deadline} placeholderText="yyyy/mm/dd" name="deadline" dateFormat="yyyy/MM/dd" />
                                                                </div>
                                                                <div className="invalid-feedback" style={{'display':'block'}}>{jobInfoValidation.deadline.message }</div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-12'>
                                                                <label className="required">Job Description</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea name="description" value={description} onChange={this.setValueToState} rows="2" className={jobInfoValidation.description.message ? "form-control is-invalid": "form-control"} placeholder="Job description"></textarea>
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobInfoValidation.description.message }</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="jSeeBtWrap">
                                                            {/* 
                                                            <div className="previousBtnWrap">
                                                                <button align="left" className="btn btn-primary previousBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Personal Information</span></span></button>
                                                            </div>
                                                            */}
                                                            <div className="nextBtnWrap" onClick={ (e) => this.validateStepOne(e) }>
                                                                <button align="right" className="btn nextBtn btn-md btn-success" type="submit" >
                                                                    <span className="insBtIcon"><i className="fas fa-chevron-right"></i></span>
                                                                    <span className="wrapToSpan">Next Step<br />
                                                                    <span className="botBtn">Confirm Your Details</span></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className= {  step === 2 ?'row setup-content block':'row setup-content hide'}>
                                                <div className="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i className="fas fa-cogs"></i></span>Requirement Related<span className="stepName">Step 2-4</span></h4>
                                                    </div>
                                                    <div className="companyProfileForm step1Form form-horizontal">
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6 col-lg-8'>
                                                                <label className="">Required Age</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user-friends"></i></span>
                                                                    </div>
                                                                    <input type="text" onChange={this.setValueToState} 
                                                                        value={required_age} name="required_age" className="form-control" placeholder="Required Age" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-3 col-sm-3 col-lg-2'>
                                                                <label className="">Visa Sponsorship</label>
                                                                <div className="input-group">
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" onChange={this.setValueToState} className="custom-control-input" id="visa_sponsorship"  checked={this.state.visa_sponsorshop == "Yes"} value='Yes' name="visa_sponsorshop" />
                                                                        <label className="custom-control-label" for="visa_sponsorship">Yes</label>
                                                                    </div>
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" onChange={this.setValueToState} className="custom-control-input" id="addno"  checked={this.state.visa_sponsorshop == "No"} value="No" name="visa_sponsorshop" />
                                                                        <label className="custom-control-label" for="addno">No</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-3 col-sm-3 col-lg-2'>
                                                                <label className="">Apply Online</label>
                                                                <div className="input-group">
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" onChange={this.setValueToState} value="Yes" className="custom-control-input" id="apply_onlineY" checked={this.state.apply_online == "Yes"} name="apply_online" />
                                                                        <label className="custom-control-label" for="apply_onlineY">Yes</label>
                                                                    </div>
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" onChange={this.setValueToState} value="No" className="custom-control-input" id="apply_onlineN" checked={this.state.apply_online == "No"} name="apply_online" />
                                                                        <label className="custom-control-label" for="apply_onlineN">No</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="required">Job/Skill Requirement</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea name="skills" rows="2" value={skills} onChange={this.setValueToState} className={jobRequirmentValidation.skills.message ? "form-control is-invalid": "form-control"} placeholder="skills ">{skills}</textarea>
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobRequirmentValidation.skills.message }</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="required">Education Requirement</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea onChange={this.setValueToState}  className={jobRequirmentValidation.education.message ? "form-control is-invalid": "form-control"} name="education" rows="2" placeholder="Education Requirement" value={education}/>
                                                                    
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobRequirmentValidation.education.message }</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="">Extra/Additional Requirement</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea name="additional_requirment" value={additional_requirment} onChange={this.setValueToState} rows="2" className="form-control" placeholder="Extra/Additional Requirement">{additional_requirment}</textarea>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="required">Required Experience</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea name="experience" rows="2" value={experience} onChange={this.setValueToState} className={jobRequirmentValidation.experience.message ? "form-control is-invalid": "form-control"} placeholder="Required Experience">{experience}</textarea>
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{jobRequirmentValidation.experience.message }</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-12'>
                                                                <label className="">Language Requirement</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea name="language_requirment" value={language_requirment} onChange={this.setValueToState}rows="2" className="form-control" placeholder="Language Requirement">{language_requirment}</textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="jSeeBtWrap">
                                                            <div className="previousBtnWrap" onClick={ () => this.setState({'step':1}) }>
                                                                <button align="left" className="btn nextStep previousBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Job Related</span></span></button>
                                                            </div>
                                                            <div className="nextBtnWrap" onClick={ (e) => this.validateStepTwo(e) }>
                                                                <button align="right" className="btn btn-success nextBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className= {  step === 3 ?'row setup-content block':'row setup-content hide'}>
                                                <div className="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i className="fas fa-list"></i></span>Facility Related<span className="stepName">Step 3-4</span></h4>
                                                    </div>
                                                    <div className="companyProfileForm step1Form form-horizontal">
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6 col-lg-6'>
                                                                <label className="required">Salary</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-dollar-sign"></i></span>
                                                                    </div>
                                                                    <input type="text" name="salary" onChange={this.setValueToState} value={salary} className={facilityInfoValidation.salary.message ? "form-control is-invalid": "form-control"} placeholder="Salary" />
                                                                    
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{facilityInfoValidation.salary.message }</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-sm-6 col-lg-6'>
                                                                <label className="">Salary Negotiable</label>
                                                                <div className="input-group">
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input onChange={this.setValueToState} value='Yes' type="radio" className="custom-control-input" id="addsalnegyes" checked={this.state.is_negotiable == "Yes"} name="is_negotiable" />
                                                                        <label className="custom-control-label" for="addsalnegyes">Yes</label>
                                                                    </div>
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" className="custom-control-input" onChange={this.setValueToState} id="addsalnegno" value="No" checked={this.state.is_negotiable == "No"}   name="is_negotiable" />
                                                                        <label className="custom-control-label" for="addsalnegno">No</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-12 col-sm-6 col-lg-3'>
                                                                <label className="">Other Additional Allowance</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-clipboard-list"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="transfer_allowance" value={transfer_allowance} onChange={this.setValueToState} className="form-control" placeholder="Transfer Allowance" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-12 col-sm-6 col-lg-3'>
                                                                <label className="invisibleCm uniinvisible">Home rent Allowance</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-home"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="home_rent_allowance" value={home_rent_allowance} onChange={this.setValueToState} className="form-control" placeholder="Home rent Allowance" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-12 col-sm-6 col-lg-3'>
                                                                <label className="invisibleCm traResponsive">Treatement Allowance</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-ambulance"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="medical_allowance"  value={medical_allowance} onChange={this.setValueToState} className="form-control" placeholder="Treatement Allowance" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-12 col-sm-6 col-lg-3'>
                                                                <label className="invisibleCm traResponsive">Bonus</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-file-invoice-dollar"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="bonous" value={bonous} onChange={this.setValueToState} className="form-control" placeholder="Bonus" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-4 col-sm-6'>
                                                                <label className="">Working Place/Job Location</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-map-marked-alt"></i></span>
                                                                    </div>
                                                                    <input  type="text" value ={ working_place}name="working_place"  onChange={this.setValueToState} className="form-control" placeholder="Job Location" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4 col-sm-6'>
                                                                <label className="">Working Hour</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-user-clock"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="working_hour" value={working_hour} onChange={this.setValueToState} className="form-control" placeholder="Working Hour" />
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-4 col-sm-12'>
                                                                <label className="">Holiday</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-snowboarding"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="holiday" value={holiday} onChange={this.setValueToState} className="form-control" placeholder="Holiday" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="jSeeBtWrap">
                                                            <div className="previousBtnWrap" onClick={ () => this.setState({'step':2}) }>
                                                                <button align="left" className="btn nextStep previousBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Requirement Related</span></span></button>
                                                            </div>
                                                            <div className="nextBtnWrap" onClick={ (e) => this.validateStepThree(e) }>
                                                                <button align="right" className="btn btn-success nextBtn btn-md" type="submit" ><span className="insBtIcon"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className= {  step === 4 ?'row setup-content block':'row setup-content hide'}>
                                                <div className="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i className="far fa-building"></i></span>Company Related<span className="stepName">Step 4-4</span></h4>
                                                    </div>
                                                    <div className="companyProfileForm step1Form form-horizontal">
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="required">Company Name</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-pencil-alt"></i></span>
                                                                    </div>
                                                                    <input  type="text" name="company_name" value={company_name} onChange={this.setValueToState}
                                                                    className={companyInfoValidation.company_name.message ? "form-control is-invalid": "form-control"}
                                                                    placeholder="Company Name" />
                                                                    <div className="invalid-feedback" style={{'display':'block'}}>{companyInfoValidation.company_name.message }</div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="">Logo</label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend fileUpload">
                                                                        <span className="input-group-text"><i className="fas fa-upload"></i></span>
                                                                    </div>
                                                                    <div className="custom-file customFileWrap">
                                                                        <input type="file" className="custom-file-input" id="inputGroupFileadd" />
                                                                        <label className="custom-file-label" for="inputGroupFileadd">Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="">Company Details</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea  name="company_details" rows="2" className="form-control" onChange={this.setValueToState} value ={ company_details } placeholder="Company Details"></textarea>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-6 col-sm-6'>
                                                                <label className="">Company Description</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                    </div>
                                                                    <textarea name="company_description"  value ={ company_description }  rows="2" className="form-control" placeholder="Company Description">{company_description}</textarea>
                                                                 </div>
                                                            </div>
                                                        </div>
                                                        <div className="jSeeBtWrap">
                                                            <div className="previousBtnWrap" onClick={ () => this.setState({'step': 3}) }>
                                                                <button align="left" className="btn nextStep previousBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Facility Related</span></span></button>
                                                            </div>
                                                            <div className="nextBtnWrap" onClick={ (e) => this.validateStepFour(e) }>
                                                                <button align="right" className="btn btn-primary nextBtn btn-md" type="button" ><span className="insBtIcon finishcm"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Finish!<br /><span className="botBtn">Confirm Your Details</span></span></button>
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
                    <Footer/>
                </div>
                <Sidebar/>
            </div>
        );
    }
}

export default withRouter(JobPostEdit);