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

class Preferrence extends Component {

    constructor() {
        super();
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.dropdownTreedataCollect = this.dropdownTreedataCollect.bind(this)
        // this.handleInputChange = this.handleInputChange.bind(this)
        
        
        this.validator = new FormValidator([
            // { 
            //     field: '', 
            //     method: 'isEmpty', 
            //     validWhen: false, 
            //     message: 'company start date is required.' 
            // },
            // { 
            //     field: '', 
            //     method: 'isEmpty', 
            //     validWhen: false, 
            //     message: 'company end date is required.' 
            // },
            
        ]);

        this.state = {
            company_name:'',
            desired_Designation:'',
            job_type : undefined,
            Industry:'',
            carrerlevel:'',
            salary:'',
            typeOfEmployee:'',
            desired_start_date:'',
            error:{},
            // value: undefined,
            options: this.options,
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }

    handleInputChange = event  => {
        // console.log('xx',event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    };
  

    
    dropdownTreedataCollect = value => {
        this.setState({ job_type: value });
    };



    componentDidMount(){ 
        var user_id = (window.sessionStorage.getItem('user_id'));
        var token = (window.sessionStorage.getItem('cool-jwt'));
            Axios.get(`/users/${user_id}`,
            { headers: { Authorization: `${token}` }
            
            })
            .then(response => {

                console.log('response',response)
                this.setState( 
                        { 
                            desired_Designation :  response.data.response.user.preference.desired_Designation ? response.data.response.user.preference.desired_Designation :'',
                            Industry :  response.data.response.user.preference.Industry ? response.data.response.user.preference.Industry :'',
                            carrerlevel :  response.data.response.user.preference.carrerlevel ? response.data.response.user.preference.carrerlevel :'',
                            job_type :  response.data.response.user.preference.job_type ? response.data.response.user.preference.job_type :'',
                            salary :  response.data.response.user.preference.salary ? response.data.response.user.preference.salary :'',
                            desired_start_date :  response.data.response.user.preference.desired_start_date ? response.data.response.user.preference.desired_start_date :'',
                            typeOfEmployee :  response.data.response.user.preference ? response.data.response.user.preference.typeOfEmployee :'',
                        })
            })
            .catch(error => {
                console.log('error',error)
            })
    }




    addEmployeeInfo = (e) => {
        
        e.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        let { desired_Designation , Industry, carrerlevel , job_type, salary, desired_start_date , typeOfEmployee } = this.state
    

        let preferrence = new Object()
    

        if(desired_Designation){
            preferrence.desired_Designation = desired_Designation
        }
        
        if(Industry){
            preferrence.Industry = Industry
        }

        if(carrerlevel){
            preferrence.carrerlevel = carrerlevel
        }

        if(job_type){
            preferrence.job_type = job_type
        }

        if(salary){
            preferrence.salary = salary
        }
        
        
        if(typeOfEmployee){
            preferrence.typeOfEmployee = typeOfEmployee
        }
        
        if(desired_start_date){
            preferrence.desired_start_date = desired_start_date
        }
        


        if(  validation.isValid == false){
            this.submitted = false;
        }else{
            this.submitted = true;
            var user_id = (window.sessionStorage.getItem('user_id'));
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('cool-jwt')
            }
        
            
            var user_id = (window.sessionStorage.getItem('user_id'));
            Axios.put(`/users/add-preference-info/${user_id}`,preferrence,{headers: headers})
                    .then((result) => {
                    
                        window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
        
                        if ( result.data.response.user.educations.length == 0 ||   result.data.response.user.personal.firstName == null ){
                            window.sessionStorage.setItem('allowForApply', 0);
                        }else{
                            window.sessionStorage.setItem('allowForApply', 1);
                        }
        
                        this.setState({ user: result.data.response.user , 
                            modal : 'success'
                        })
                        
                        $('#preference').modal('hide');
                    
                    }).catch((error) =>{
                        this.setState({
                            show : false
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

        let { desired_Designation , Industry, carrerlevel , job_type, salary, desired_start_date } = this.state

        let validation = this.submitted ?        // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state
        // console.log(validation)
        return(
            <div>
                <div className="modal fade" id="preference" tabIndex="-1" role="dialog" aria-labelledby="academicModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="card">
                                <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Preference</h5>
                                <div className="card-body px-lg-5 pt-0">
									<form  onSubmit={ this.addEmployeeInfo } className="">
                                                <div className="form-row">
                                                <div className='form-group col-md-12'>
                                                        <label className="">Types of employement</label>
                                                        <div className="input-group">
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="fullTime1" name="typeOfEmployee" value="fullTime" checked={this.state.typeOfEmployee === 'fullTime'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="fullTime1">Full Time</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="partTime1" name="typeOfEmployee" value="partTime" checked={this.state.typeOfEmployee === 'partTime'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="partTime1">Part Time</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="contactual1" name="typeOfEmployee"  value="contactual" checked={this.state.typeOfEmployee === 'contactual'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="contactual1">Contactual</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="intern1" name="typeOfEmployee"  value="intern" checked={this.state.typeOfEmployee === 'intern'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="intern1">Intern</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="freelance1" name="typeOfEmployee"  value="freelance" checked={this.state.typeOfEmployee === 'Freelance'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="freelance1">Freelance</label>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-md-12 col-lg-6'>
                                                        <label for="desiredDesignation">Desired Designation</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                                            </div>
                                                            <input  type="text" name="desired_Designation"  value ={ desired_Designation } className="form-control" placeholder="Designation" onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-md-6 col-lg-6'>
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
                                                <div className='form-group col-md-12 col-lg-12'>
                                                    <label className="invisibleDispaly">Job Category</label>
                                                        <div className="form-row">
                                                            <div className='form-group col'>
                                                                <TreeSelect
                                                                    showSearch
                                                                    style={{ width: 300 }}
                                                                    value={this.state.job_type}
                                                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                                    placeholder="Job Category(Please select category and sub-category from here)"
                                                                    allowClear
                                                                    multiple
                                                                    treeDefaultExpandAll
                                                                    onChange={this.dropdownTreedataCollect}
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
                                                    <div className='form-group col-md-6'>
                                                    <label className="">Desired Career Level</label>
                                                    <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-level-up-alt"></i></span>
                                                            </div>
                                                            <select id="nature" className="form-control cmPrAdd" name="carrerlevel" onChange={this.handleInputChange}>
                                                                <option>Carrer level</option>
                                                                <option selected={this.state.carrerlevel === 'HR'}   value="HR">HR</option>
                                                                <option selected={this.state.carrerlevel === 'Web developer'}  value="Web developer">Web developer</option>
                                                                <option selected={this.state.carrerlevel === 'PRM'}  value="PRM">PRM</option>
                                                                <option selected={this.state.carrerlevel === 'Accounts'}  value="Accounts">Accounts</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-md-6'>
                                                    <label className="">Desired Salary</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-money-bill-wave-alt"></i></span>
                                                            </div>
                                                            <select id="nature" className="form-control cmPrAdd" name="salary" onChange={this.handleInputChange}>
                                                                <option>Salary</option>
                                                                <option selected={this.state.salary === '10000~30000'}  value="10000~30000">10000~30000</option>
                                                                <option selected={this.state.salary === '30000~40000'}  value="30000~40000">30000~40000</option>
                                                                <option selected={this.state.salary === '40000~50000'}  value="40000~50000">40000~50000</option>
                                                                <option selected={this.state.salary === '50000~60000'}  value="50000~60000">50000~60000</option>
                                                                <option selected={this.state.salary === '60000~70000'}  value="60000~70000">60000~70000</option>
                                                                <option selected={this.state.salary === '70000~80000'}  value="70000~80000">70000~80000</option>
                                                                <option selected={this.state.salary === '80000~90000'}  value="80000~90000">80000~90000</option>
                                                                <option selected={this.state.salary === '90000~100000'} value="Network">90000~100000</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-md-6 col-lg-6'>
                                                    <label className="">Desired Start Date</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                            </div>
                                                            <select id="nature" className="form-control cmPrAdd" name="desired_start_date" onChange={this.handleInputChange}>
                                                                <option>Desired Start Date</option>
                                                                <option  selected={this.state.desired_start_date === 'Next day after confirming'} value="Next day after confirming">Next day after confirming</option>
                                                                <option  selected={this.state.desired_start_date === '3 days'} value="3 days">3 days</option>
                                                                <option  selected={this.state.desired_start_date === '7 days'} value="7 days">7 days</option>
                                                                <option  selected={this.state.desired_start_date === '15 days'} value="15 days">15 days</option>
                                                                <option  selected={this.state.desired_start_date === '30 days'} value="30 days">30 days</option>
                                                                <option  selected={this.state.desired_start_date === '2 months'} value="2 months">2 months</option>
                                                                <option  selected={this.state.desired_start_date === '3 months'} value="3 months">3 months</option>
                                                            </select>
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
							<strong>Preferrence information saved Successfully!</strong>   
							</div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Preferrence;