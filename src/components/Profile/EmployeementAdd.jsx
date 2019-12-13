import React, { Component } from 'react';
import Axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormValidator from '../../helpers/FormValidator';
import Modal from 'react-bootstrap4-modal';
import DatePicker from "react-datepicker";
import { TreeSelect } from "antd";
// import "antd/dist/antd.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'

import "react-datepicker/dist/react-datepicker.css";
const $ = window.$;


const { TreeNode } = TreeSelect;

class EmployeementAdd extends Component {

    constructor() {
        super();
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.dropdownTreedataCollect = this.dropdownTreedataCollect.bind(this)
        this.options = countryList().getData()
        this.dateChangeForStartEmployyement = this.dateChangeForStartEmployyement.bind(this)

        this.dateChangeForEndEmployyement = this.dateChangeForEndEmployyement.bind(this)
        this.CompanyLocationchange = this.CompanyLocationchange.bind(this)
        this.currentyWorkOn = this.currentyWorkOn.bind(this)
        this.validator = new FormValidator([
            // { 
            //     field: 'company_start_date', 
            //     method: 'isEmpty', 
            //     validWhen: false, 
            //     message: 'company start date is required.' 
            // },
            // { 
            //     field: 'company_end_date', 
            //     method: 'isEmpty', 
            //     validWhen: false, 
            //     message: 'company end date is required.' 
            // },
            
            
        ]);

        this.state = {
            company_name:'',
            currentlyWorkOnCompanyBarch: undefined,
            company_location:undefined,
            company_designation:'',
            job_type: undefined,
            Industry:'',
            carrerlevel: '',
            company_start_date: undefined,
            company_end_date: undefined,
            typeOfEmployee:'',

            error:{},
            // value: undefined,
            options: this.options,
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }


    dropdownTreedataCollect = value => {
        this.setState({ job_type: value });
    };

    currentyWorkOn = value => {
        this.setState({ currentlyWorkOnCompanyBarch : value.label })
    }

    CompanyLocationchange = value => {
        this.setState({ company_location :value.label })
    }

    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    setInputValueToState = (e) => {
		this.setState({ [e.target.name]: e.target.value } );
		if(e.target.name === 'company_currently_working'){
			this.setState({
				company_currently_working: !this.state.company_currently_working,
			});
		}
    }

    dateChangeForStartEmployyement(date){

        if (date === null){
            this.setState({
                company_start_date: ''
            });
        }else{
            this.setState({
                company_start_date: date
            });
        }
    }

    
    dateChangeForEndEmployyement(date){

        if (date === null){
            this.setState({
                company_end_date: ''
            });
        }else{
            this.setState({
                company_end_date: date
            });
        }
    }
    

    endDateChange(date){
		this.setState({
			company_end_date: date
		});
    }
    
    startDateChange(date){
		this.setState({
			company_start_date: date
		});
	}
    
    addEmployeeInfo = (e) => {
        e.preventDefault();
    
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        if(  validation.isValid == false){
            this.submitted = false;
        }else{
            this.submitted = true;
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        let { company_name, job_type, typeOfEmployee, company_end_date, company_start_date, Industry, carrerlevel, company_designation, currentlyWorkOnCompanyBarch, company_location , error,source }  = this.state
        
        let employeement = new Object()
    

        if(company_name){
            employeement.company_name = company_name
        }
        
        if(company_designation){
            employeement.company_designation = company_designation
        }

        if(company_name){
            employeement.company_location = company_location
        }

        if(currentlyWorkOnCompanyBarch){
            employeement.currentlyWorkOnCompanyBarch = currentlyWorkOnCompanyBarch
        }

        if(Industry){
            employeement.Industry = Industry
        }
        
        
        if(job_type){
            employeement.job_type = job_type
        }

        if(carrerlevel){
            employeement.carrerlevel = carrerlevel
        }

        if(company_start_date){
            employeement.company_start_date = company_start_date
        }
        if(company_end_date){
            employeement.company_end_date = company_end_date
        }
        
        if(typeOfEmployee){
            employeement.typeOfEmployee = typeOfEmployee
        }  

            Axios.put(`/users/add-employments-info/${user_id}`,employeement,
                {headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    
                    this.setState({ user: result.data.response.user ,
                            modal : 'success'
                        })
                    $('#employmentH1').modal('hide');
                
                }).catch((error) =>{
                    this.setState({
                        modal : ''
                    })
                });
            }
    }



    closeModal() {
        this.setState({
            modal : '',
        });
        window.location.reload();
    }


    render(){

        let { company_name,  job_type, Industry, data, currentlyWorkOnCompanyBarch,company_end_date,company_start_date, company_designation, carrerlevel, company_location, dropworn }  = this.state

        let validation = this.submitted ?        // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state
        // console.log(validation)
        return(
            <div>
                <div className="modal fade" id="employmentH1" tabIndex="-1" role="dialog" aria-labelledby="academicModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="card">
                                <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 className="card-header profile-edit-modal-header white-text text-center gray-color"> Employment History 
                                </h5>
                                <div className="card-body px-lg-5 pt-0">
														
            
                <form onSubmit={ this.addEmployeeInfo } className="">
                                                <div className="form-row">
                                                    <div className='form-group col-md-12'>
                                                        <label className="">Types of employement</label>
                                                        <div className="input-group">
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="fullTime" name="typeOfEmployee" value="fullTime" checked={this.state.typeOfEmployee === 'fullTime'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="fullTime">Full Time</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="partTime" name="typeOfEmployee" value="partTime" checked={this.state.typeOfEmployee === 'partTime'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="partTime">Part Time</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="contactual" name="typeOfEmployee"  value="contactual" checked={this.state.typeOfEmployee === 'contactual'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="contactual">Contactual</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="intern" name="typeOfEmployee"  value="intern" checked={this.state.typeOfEmployee === 'intern'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="intern">Intern</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="freelance" name="typeOfEmployee"  value="freelance" checked={this.state.typeOfEmployee === 'Freelance'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="freelance">Freelance</label>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-lg-6 col-md-12 col-sm-12 col-12'>
                                                        <label className="">Designation</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                                            </div>
                                                            <input  type="text" name="company_designation"  value ={ company_designation }className="form-control" placeholder="Designation" onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                        <label className="invisibleCm">Industry</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-industry"></i></span>
                                                            </div>
                                                            <select id="nature" className="form-control cmPrAdd" name="Industry" onChange={this.handleInputChange}>
                                                                <option>Industry</option>
                                                                <option  selected={this.state.Industry === 'Software'} value="Software">Software</option>
                                                                <option selected={this.state.Industry === 'Networking'} value="Networking">Networking</option>
                                                                <option selected={this.state.Industry === 'Others'} value="Others">Others</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-lg-12 col-md-12 col-sm-12 col-12'>
                                                        <label className="">Job Category</label>
                                                        <div className="form-row">
                                                            <div className='form-group col'>
                                                            <TreeSelect
                                                                showSearch
                                                                style={{ width: 300 }}
                                                                value={this.state.job_type}
                                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                                placeholder="Please select"
                                                                allowClear
                                                                multiple
                                                                treeDefaultExpandAll
                                                                onChange={this.dropdownTreedataCollect}
                                                                placeholder="Job Category (Please select category and sub-category from here)"
                                                            >
                                                                <TreeNode value="Executive" title="Executive" key="0-1">
                                                                    <TreeNode value="CEO/COO/CFO/CIO/CTO/Other" title="CEO/COO/CFO/CIO/CTO/Other" key="0-1-1"/>
                                                                    <TreeNode value="Manager (Sales/Marketing)" title="Manager (Sales/Marketing)" key="0-1-2"/>    
                                                                    <TreeNode value="Manager (Administration)" title="Manager (Administration)" key="0-1-3"/>
                                                                    <TreeNode value="Manager (Other)" title="Manager (Other)" key="0-1-4"/>
                                                                    
                                                                </TreeNode>

                                                                <TreeNode value="IT (pc,Web,Unix)" title="IT (pc,Web,Unix)" key="0-2">
                                                                    <TreeNode value="Project Manager" title="Project Manager" key="0-2-1"/>
                                                                    <TreeNode value="Business Application SE" title="Business Application SE" key="0-2-2"/>    
                                                                    <TreeNode value="ERP,SCM,CRM Architect" title="ERP,SCM,CRM Architect" key="0-3-3"/>
                                                                    <TreeNode value="Web Application SE" title="Web Application SE" key="0-4-4"/>
                                                                    <TreeNode value="Database SE" title="Database SE" key="0-4-5"/>
                                                                    <TreeNode value="Programmer" title="Programmer" key="0-4-6"/>
                                                                    <TreeNode value="QA/Quality/Control/Testing Engineer" title="QA/Quality/Control/Testing Engineer" key="0-4-7"/>
                                                                </TreeNode>
                                                            </TreeSelect>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-lg-6 col-md-12 col-sm-12 col-12'>
                                                        <label className="">Carrer Level</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-level-up-alt"></i></span>
                                                            </div>
                                                            <select id="nature" className="form-control cmPrAdd" name="carrerlevel" onChange={this.handleInputChange}>
                                                                <option>Carrer level</option>
                                                                <option selected={this.state.carrerlevel == 'HR'}   value="HR">HR</option>
                                                                <option selected={this.state.carrerlevel == 'Web developer'}  value="Web developer">Web developer</option>
                                                                <option selected={this.state.carrerlevel == 'PRM'}  value="PRM">PRM</option>
                                                                <option selected={this.state.carrerlevel == 'Accounts'}  value="Accounts">Accounts</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-6 col-md-12 col-sm-12 col-12'>
                                                        <label className="">Company Name</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-building"></i></span>
                                                            </div>
                                                            <input type="text" name="company_name"  value={ company_name }  className= "form-control" placeholder="Company Name" onChange={ this.handleInputChange }/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="form-row">
                                                    <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                        <label className="">Country Worked In</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                            </div>
                                                            <Select className="cmPrAdd" name="currentlyWorkOnCompanyBarch"
                                                                options={this.state.options}
                                                                value={this.state.value}
                                                                onChange={this.currentyWorkOn}
                                                                placeholder="Country Worked In"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                        <label className="">Location of HQ</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                            </div>
                                                                <Select className="cmPrAdd" name="company_location"
                                                                    options={this.state.options}
                                                                    value={this.state.value}
                                                                    onChange={this.CompanyLocationchange}
                                                                    placeholder="Location of HQ"
                                                                />
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                                <div className="form-row">
                                                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12 perDaOfBirth fromToOnefield combineDatepicker">
                                                        <label className="required">Employement Duration</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                            </div>
                                                            {/* <DatePicker className="form-control" placeholderText="From: yyyy/mm/dd" name="company_start_date"  dateFormat="yyyy/MM/dd" /> */}
                                                            <DatePicker onChange={ this.dateChangeForStartEmployyement } className="form-control" selected={this.state.company_start_date} placeholderText="From: yyyy/mm/dd" name="company_start_date"   dateFormat="yyyy/MM/dd" />
                                                                {/* <div className="invalid-feedback">{validation.company_start_date.message}</div>  
                                                                <span className="about_length text-red"> {validation.company_start_date.message? validation.company_start_date.message:''}</span> */}

                                                        
                                                            <DatePicker onChange={ this.dateChangeForEndEmployyement } className="form-control" selected={this.state.company_end_date} placeholderText="From: yyyy/mm/dd" name="company_end_date"   dateFormat="yyyy/MM/dd" />
                                                                {/* <div className="invalid-feedback">{validation.company_end_date.message}</div>  
                                                                <span className="about_length text-red"> {validation.company_end_date.message? validation.company_end_date.message:''}</span> */}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center profile-edit-modal-btn">
                                                    <button type="submit" className="btn btn-success btn-rounded">Save</button>
                                                    <button type="button" className="btn btn-light btn-rounded" data-dismiss="modal">Close</button>
                                                </div>  
                                            </form>
            </div>
            </div>
            </div>
        </div>
    </div>
									

                <Modal visible={ this.state.modal == 'success' ? true : false}>
                    <div className="card">
                        <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                            <div className="alert alert-success user-success-message">
							<strong>Employment information saved Successfully!</strong>   
							</div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default EmployeementAdd;