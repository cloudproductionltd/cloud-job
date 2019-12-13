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

class Jobpost extends Component {

    constructor(props) {
    super(props);
    this.setResponsiblity = this.setResponsiblity.bind(this)
    this.setDetails = this.setDetails.bind(this)
    this.setEducation = this.setEducation.bind(this)
    this.setBenefits = this.setBenefits.bind(this)
    this.showSalaryRange = this.showSalaryRange.bind(this)
    this.startDateChange = this.startDateChange.bind(this)
    this.validator = new FormValidator([
        { 
            field: 'title', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Job title is required.' 
        },
        { 
            field: 'responsibilities', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Responsibilities is required' 
        },
        { 
            field: 'category', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Category is required' 
        },
        { 
            field: 'nature', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Job nature is required' 
        },
        { 
            field: 'details', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Job details is required' 
        },
        { 
            field: 'deadline', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Deadline is required' 
        },
        { 
            field: 'is_negotiable', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Is salary negotiable?' 
        },
        { 
            field: 'education', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Education is required' 
        },
        { 
            field: 'vacancy', 
            method: 'isNumeric', 
            validWhen: true, 
            message: 'Number of vacency is required' 
        },
        { 
            field: 'details', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Job details is required'
        },
        { 
            field: 'benefits', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Compensation & other benefits is required'
        },{
            
            field: 'joblevel', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Job level is required'
        }
    ]);

    this.state = {
        title:'',
        responsibilities:'',
        category: '',
        dropdownCategories:[],
        sub_category:'',
        dropdownsubcategories:[],
        company:'',
        dropdowncompanies:[],
        joblevel:'',
        education:'',
        additional_requirment:'',
        nature: '',
        posted_by:'',
        experience:'',
        vacancy: '',
        extra_instruction:'',
        deadline:'',
        is_hot:'',
        details:'',
        is_negotiable:'',
        apply_online:'',
        max_salary:'',
        min_salary:'',
        source:'',
        benefits: '',
        error:{},
        validation: this.validator.valid(),
    }

    this.submitted = false;
    }

    setSalary = (e) => {
        this.setState({
            is_negotiable : e.target.value,
        })
        
    }

    componentDidMount() {
        if(!(window.sessionStorage.getItem('user_role') === 'recruiter')){
            this.props.history.push('/');
        }

        if(!window.sessionStorage.getItem('company_id')){
        
            this.props.history.push('/recruiter/company/add');
        }

        let initialcategories = [];
        axios.get(`http://cloudproduction.co.bd/jobs/public/api/category`)
        .then(res => {
            initialcategories = res.data.categories.map((category) => {
                return category
            });
            this.setState({
                dropdownCategories: initialcategories,
            });
        })
        
    }

    setResponsiblity(value) {
        this.setState({ responsibilities: value })
    }

    setEducation(value) {
        
        this.setState({ education: value })
    }
    setBenefits(value) {
        this.setState({ benefits: value })
    }

    setDetails(value) {
        this.setState({ details: value })
    }

    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getsubcategory = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        let initialsubcategories = [];
            axios.post(`http://cloudproduction.co.bd/jobs/public/api/subcategory`,
                {
                    category_id: event.target[event.target.selectedIndex].getAttribute('data-id'),
                }
            )
            .then(res => {
                initialsubcategories = res.data.subcategories.map((subcategory) => {
                    return subcategory
                });
                this.setState({
                    dropdownsubcategories: initialsubcategories,
                });
            })
    };

    handleSubmit = event => {

        event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        let { title , responsibilities, category, sub_category, joblevel, education, additional_requirment, nature, experience, vacancy, extra_instruction, details, benefits, deadline, is_hot, is_negotiable, apply_online, max_salary, min_salary, source, error } = this.state
        
        
        if(source == '')
            source =' Cloud Production'

        //axios.post('https://cloudjobs.herokuapp.com/jobs', {

        let job = new Object()
            if(deadline){
                job.deadline=deadline
            }
            if(sub_category){
                job.sub_category=sub_category
            }
            if(is_hot){
                job.is_hot=is_hot
            }
            if(vacancy){
                job.vacancy=vacancy
            }
            if(apply_online){
                job.apply_online=apply_online
            }
            if(extra_instruction){
                job.extra_instruction=extra_instruction
            }
            if(is_negotiable){
                job.is_negotiable=is_negotiable
            }
            if(additional_requirment){
                job.additional_requirment=additional_requirment
            }
            if(experience){
                job.experience=experience
            }
            if(source){
                job.source=source
            }
            
            if(benefits){
                job.benefits=benefits
            }
            if(title){
                job.title=title
            }
            if(category){
                job.category=category
            }
            if(details){
                job.details=details
            }
            if(responsibilities){
                job.responsibilities=responsibilities
            }
            if(nature){
                job.nature=nature
            }
            if(joblevel){
                job.joblevel=joblevel
            }
            if(min_salary){
                job.min_salary=min_salary
            }
            if(max_salary){
                job.max_salary=max_salary
            }
            if(education){
                job.education=education
            }



        axios.post('/jobs', job,{headers: headers}).then( res => {
            console.log('responsejob',res)
            this.setState({
                show : 'success'
            });
        });

    };

    handleReset = () => {
        this.setState({
            title: '',
            responsibilities:'',
            categories:[],
            joblevel:''
        });
    };


    startDateChange(date){

	
        if ( date === null){
            this.setState({
                deadline: ''
            });
        }else{
            this.setState({
                deadline: date
            });
        }
    
    }

    

    closeModal() {
        this.setState({
            show : '',
        });
        this.props.history.push('/recruiter-pending-jobs');
    }
    
    showSalaryRange = (value) =>{
        
        this.setState({
            is_negotiable : value,
        });
    }
    render() {


        let salary 

        if(this.state.is_negotiable === 'false'){
            salary = 
                <div>
                    <div className="form-row max-minWrap">
                        <div className="form-group col-md-12">
                            <label className="">Salary</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-money-bill-wave"></i></span>
                                </div>
                                <input value={ this.state.max_salary } onChange={ this.handleInputChange } type="number" name="max_salary" className='form-control' placeholder="Enter the salary"/>
                            </div>
                        </div>
                    </div>
                </div>
        }else if(this.state.is_negotiable === 'true'){
            salary =<div>
                        <div className="form-row max-minWrap">
                            <div className='form-group col-md-6'>
                                <label className="required">Max Salary</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-money-bill-wave"></i></span>
                                    </div>
                                    <input value={ this.state.max_salary } onChange={ this.handleInputChange } type="number" name="max_salary" className='form-control' placeholder="Enter the maximum salary"/>
                                </div>
                            </div>
                            <div className='form-group col-md-6'>
                                <label className="">Min Salary</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-money-bill-wave"></i></span>
                                    </div>
                                    <input value = { this.state.min_salary } onChange={ this.handleInputChange } type="number" name="min_salary"  className='form-control' placeholder="Enter the minimum salary"/>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        
    const styles ={
        responsiblity: {
            width: '100%',
            marginTop: '.25rem',
            fontSize: '80%',
            color: '#dc3545'
        },

        joblevel: {
            width: '100%',
            marginTop: '.25rem',
            fontSize: '80%',
            color: '#dc3545',
        },
        quill: {
            border: '1px solid #dc3545'
        }
    }

        let { title, responsibilities, category, sub_category, company, joblevel, education, benefits, additional_requirment, nature, experience, vacancy,details, extra_instruction, deadline, is_hot, is_negotiable,apply_online, max_salary, min_salary, source, error } = this.state

        let dropdowncategories = this.state.dropdownCategories;
        let categoryItems = dropdowncategories.map((category) =>
                    <option key={category.category_id}  data-id={category.category_id} value={category.name} >{category.name}</option>
            );

        let dropdownsubcategories = this.state.dropdownsubcategories;
        let subcategoryItems = dropdownsubcategories.map((subcategory) =>
                <option key={subcategory.category_id} value={subcategory.name} >{subcategory.name}</option>
            );
        let validation = this.submitted ?                         // if the form has been submitted at least once
                        this.validator.validate(this.state) :   // then check validity every time we render
                        this.state.validation                   // otherwise just use what's in state
            // console.log(validation)
        return (
            <div>
            
                <div className="page commonAdminPage"> 
                    <Breadcumb/>
                    <section className="forms commonAdminForms">
                    <div className="container-fluid">
                    <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-10">
                                <div className="card">
                                    <div className="card-header d-flex align-items-center">
                                        <h4>Post a job</h4>
                                        <br/>
                                    </div>
                                    <div className="card-body">
                                        <form className="form-horizontal companyProfileForm" onSubmit={ this.handleSubmit } encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Post Name</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                                        </div>
                                                        <input  type="text" name="title" className={validation.title.message ? "form-control is-invalid": "form-control"} placeholder="Enter the post name" 
                                                        value={ title } onChange={ this.handleInputChange } />
                                                        <div className="invalid-feedback">{validation.title.message }</div>
                                                    </div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="">Experience</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-list-alt"></i></span>
                                                        </div>
                                                        <input value={ experience } type="text" name="experience" className="form-control" placeholder="Enter the experience" onChange={ this.handleInputChange } />
                                                        <div className="invalid-feedback"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Job Nature</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-handshake"></i></span>
                                                        </div>
                                                        <select id="nature" className={validation.nature.message ? "form-control is-invalid": "form-control"} name="nature" onChange={ this.getsubcategory }  >
                                                            <option>--Select job nature--</option>
                                                            <option value="FullTime">Full Time</option>
                                                            <option value="partTime">Part Time</option>
                                                            <option value="Intern">Intern</option>
                                                            <option value="Contractual">Contructual</option>
                                                        </select>
                                                        <div className="invalid-feedback">{validation.nature.message }</div>
                                                    </div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Vacancy</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-user-plus"></i></span>
                                                        </div>
                                                        <input value={ vacancy } type="number" name="vacancy" className={validation.vacancy.message ? 'form-control is-invalid':'form-control'} placeholder="Enter the vacancy number" onChange={ this.handleInputChange }  />
                                                        <div className="invalid-feedback">{validation.vacancy.message}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">details</label>
                                                    <ReactQuill value={this.state.details} name="details" height="300px" onChange={this.setDetails} />
                                                    <div style={styles.responsiblity}>{validation.details.message }</div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Responsibilities</label>
                                                    <ReactQuill value={this.state.responsibilities} name="responsibilities" height="500px" onChange={this.setResponsiblity} />
                                                    <div style={styles.responsiblity}>{validation.responsibilities.message }</div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Category</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-tags"></i></span>
                                                        </div>
                                                        <select id="category" className={validation.category.message ? "form-control is-invalid addcommonSelect": "form-control addcommonSelect"} name="category" onChange={ this.getsubcategory }  >
                                                            <option value=" " className="cn">--Select Category--</option>
                                                            {categoryItems}
                                                        </select>
                                                        <div className="invalid-feedback">{validation.category.message }</div>
                                                    </div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="">Sub Category</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-tags"></i></span>
                                                        </div>
                                                        <select id="sub_category"  className="form-control addcommonSelect"  data-id="123" name="sub_category" onChange={ this.handleInputChange } >
                                                            <option value=" ">--Select Sub Category--</option>
                                                            { subcategoryItems }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Job level</label>
                                                    <div className="input-group">
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input type="radio" className="custom-control-input" id="entry_level" value="Entry Level" name="joblevel" onChange={ this.handleInputChange }/>
                                                            <label className="custom-control-label" htmlFor="entry_level">Entry Level</label>
                                                        </div>
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input type="radio" className="custom-control-input" id="medium_level"  value="Medium Level" name="joblevel" onChange={ this.handleInputChange }/>
                                                            <label className="custom-control-label" htmlFor="medium_level">Medium Level</label>
                                                        </div>
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input type="radio" className="custom-control-input" id="Senior-level" value="Senior Level" name="joblevel" onChange={ this.handleInputChange }/>
                                                            <label className="custom-control-label" htmlFor="Senior-level">Senior Level</label>
                                                        </div>
                                                    </div>
                                                    <div style={styles.joblevel}>{validation.joblevel.message }</div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="">Hot jobs</label>
                                                    <div className="input-group">
                                                        <div className="" onChange={ this.handleInputChange }>
                                                            <div className="radio radio-danger custom-control custom-radio custom-control-inline">
                                                                <input type="radio" name="is_hot" id="is_hot_yes" className="custom-control-input" value="1"/>
                                                                <label htmlFor="is_hot_yes" className="custom-control-label"> Yes </label>
                                                            </div>
                                                            <div className="radio radio-danger custom-control custom-radio custom-control-inline">
                                                                <input type="radio" name="is_hot" className="custom-control-input" id="is_hot_no" value="0"/>
                                                                <label htmlFor="is_hot_no" className="custom-control-label"> No </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Is negotiable?</label>
                                                    <div className="input-group">
                                                        <div className="" onChange={ this.handleInputChange }>
                                                            <div className="radio radio-danger custom-control custom-radio custom-control-inline">
                                                                <input type="radio" name="is_negotiable" className="custom-control-input" id="is_negotiable_yes" value='true'  onChange ={this.setSalary}/>
                                                                <label htmlFor="is_negotiable_yes" className="custom-control-label">Yes</label>
                                                            </div>
                                                            <div className="radio radio-danger custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className={validation.is_negotiable.message ? 'custom-control-input':'custom-control-input'}  name="is_negotiable" id="is_negotiable_no" value='false'  onChange ={this.setSalary}/>
                                                                <label htmlFor="is_negotiable_no" className="custom-control-label">No</label>
                                                            </div>
                                                            <div className="invalid-feedback">{validation.is_negotiable.message}</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div style={styles.responsiblity}>{validation.is_negotiable.message }</div>
                                                    {salary}
                                                </div>
                                                <div className='form-group col-md-6'>
                                                <label htmlFor="apply_online" className="">Apply online ?</label>
                                                    <div className="" onChange={ this.handleInputChange }>
                                                        <div className="radio radio-danger custom-control custom-radio custom-control-inline">
                                                            <input type="radio" name="apply_online" className="custom-control-input" id="apply_online_yes" value="1" /> 
                                                            <label htmlFor="apply_online_yes" className="custom-control-label">Yes</label>
                                                        </div>
                                                        <div className="radio radio-danger custom-control custom-radio custom-control-inline">
                                                            <input type="radio" className="custom-control-input" name="apply_online" id="apply_online_no" value="0" />
                                                            <label htmlFor="apply_online_no" className="custom-control-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Education</label>
                                                    <ReactQuill value={this.state.education} name="education" height="500px" onChange={this.setEducation} className="educationFieldResize"/>
                                                    <div style={styles.responsiblity}> {validation.education.message } </div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="required">Compensation & Other Benefits</label>
                                                    <ReactQuill value={this.state.benefits} name="education" height="500px" onChange={this.setBenefits} className="compensionFieldResize" />
                                                <div style={styles.responsiblity}> {validation.benefits.message } </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6'>
                                                    <label className="">Additional Requirment</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                        </div>
                                                        <textarea name="additional_requirment" id="additional_requirment" rows="3" className="form-control" placeholder="Enter the additional requirment" onChange={ this.handleInputChange } >{ additional_requirment }</textarea>
                                                    </div>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="">Extra instruction</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-info"></i></span>
                                                        </div>
                                                        <textarea value={ extra_instruction } type="text"  rows="3" name="extra_instruction" className="form-control" placeholder="Enter the extra instruction" onChange={ this.handleInputChange }></textarea>
                                                        <div className="invalid-feedback"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className='form-group col-md-6 updateJobDate'>
                                                    <label className="required">Deadline</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                            <DatePicker 
                                                                onChange={ this.startDateChange } 
                                                                minDate={new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000))}      
                                                                className={validation.deadline.message ? "form-control is-invalid": "form-control"} 
                                                                selected={this.state.deadline} 
                                                                placeholderText="yyyy/mm/dd" name="deadline"  dateFormat="yyyy/MM/dd" />
                                                        </div>
                                                        <div className="invalid-feedback">{validation.deadline.message}</div>
                                                    </div>
                                                    <span className="about_length text-red"> {validation.deadline.message}</span>
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className="">Location</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                        </div>
                                                        <input value={ source } type="text" name="source" className="form-control " placeholder="Enter the location" onChange={ this.handleInputChange }/>
                                                        <div className="invalid-feedback"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="Add" className="btn btn-info"/></span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <Modal visible={ this.state.show ==='success' ? true : false}>
                                    <div className="card">
                                        <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                            <div className="alert alert-success user-success-message">
                                            <strong> Your job post is going now for admin approval  </strong>   
                                            </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        
                        </Page>
                    </div>
                </section>
                    <Footer/>
                </div>
                <Sidebar/>
            </div>
        );
    }
}

export default withRouter(Jobpost);