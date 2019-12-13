import React, { Component } from 'react';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import FormValidator from './../../../helpers/FormValidator';
import { TreeSelect } from "antd";
//  import "antd/dist/antd.css";

import { withRouter } from 'react-router';

const { TreeNode } = TreeSelect;

class Preferrence extends Component {


    constructor(props) {
        super(props);

        this.dropdownTreedataCollect = this.dropdownTreedataCollect.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
            typeOfEmployee:'',
            desired_Designation:'',
            job_type : undefined,
            Industry:'',
            carrerlevel:'',
            salary:'',
            desired_start_date:'',
            error:{},
            // value: undefined,
            options: this.options,
            validation: this.validator.valid(),
        }

    
        this.submitted = false;
        
    }


    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    componentDidMount(){
        
        let data = JSON.parse(localStorage.getItem('preferrence'))

        if(data){
            this.setState({
                desired_Designation : data.desired_Designation,
                Industry : data.Industry,
                carrerlevel : data.carrerlevel,
                job_type : data.job_type,
                salary : data.salary,
                desired_start_date : data.desired_start_date,
                typeOfEmployee : data.typeOfEmployee,
            
            })
        }
    }

    handleSubmit = event => {
        let { desired_Designation , Industry, carrerlevel , job_type, salary, desired_start_date , typeOfEmployee} = this.state
        event.preventDefault();
        
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

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

        
        localStorage.setItem('preferrence', JSON.stringify(this.state));

        window.sessionStorage.setItem('validationfromPreferrenceinfo', validation.isValid);
        let user_id = (window.sessionStorage.getItem('user_id'));
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        if(validation.isValid == true){
            event.preventDefault();

            Axios.put(`/users/add-preference-info/${user_id}`,preferrence,
            {headers: headers}
            )
            .then((result) => {
                // console.log('add-preference-info',result)

                localStorage.removeItem("employeement")    
                localStorage.removeItem("personalInfo")
                localStorage.removeItem("preferrence")
                localStorage.removeItem("education")

                this.props.history.push('/userDashboard');
                window.location.reload()

            })
            .catch((error) =>{
                
            });

            this.props.nextStep();
        }else{

        }
        
    };

    dropdownTreedataCollect = value => {
        this.setState({ job_type: value });
    };


    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }; 

    render(){
        let { desired_Designation , Industry, carrerlevel , job_type, salary, desired_start_date , typeOfEmployee} = this.state
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation  


        
        console.log('preference state ',this.state)

        return(
            <div>
                <form onSubmit={ this.handleSubmit }  className="companyProfileForm step1Form form-horizontal">
                                                <div className="form-row">
                                                <div className='form-group col-md-12'>
                                                        <label className="">Types of employement</label>
                                                        <div className="input-group">
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="fullTime" name="typeOfEmployee" value="fullTime" checked={this.state.typeOfEmployee == 'fullTime'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="fullTime">Full Time</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="partTime" name="typeOfEmployee" value="partTime" checked={this.state.typeOfEmployee == 'partTime'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="partTime">Part Time</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="contactual" name="typeOfEmployee"  value="contactual" checked={this.state.typeOfEmployee == 'contactual'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="contactual">Contactual</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="intern" name="typeOfEmployee"  value="intern" checked={this.state.typeOfEmployee == 'intern'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="intern">Intern</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input type="radio" className="custom-control-input" id="freelance" name="typeOfEmployee"  value="freelance" checked={this.state.typeOfEmployee == 'Freelance'}  onChange={ this.handleInputChange } />
                                                                <label className="custom-control-label" for="freelance">Freelance</label>
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
                                                        <label className="">Job Category</label>
                                                        <div className='input-group'>
                                                            <TreeSelect
                                                                showSearch
                                                                style={{ width: 300 }}
                                                                value={this.state.job_type}
                                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                                placeholder="Job Category (Please select category and sub-category from here)"
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
                                                    
                                                <div className="form-row">
                                                    <div className='form-group col-md-6'>
                                                    <label className="">Desired Career Level</label>
                                                    <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-level-up-alt"></i></span>
                                                            </div>
                                                            <select id="nature" className="form-control cmPrAdd" name="carrerlevel" onChange={this.handleInputChange}>
                                                                <option>Desired Carrer Level</option>
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
                                                                <option>Desired Salary</option>
                                                                <option selected={this.state.salary === '10000~30000'}  value="10000~30000">10000~30000</option>
                                                                <option selected={this.state.salary === '30000~40000'}  value="30000~40000">30000~40000</option>
                                                                <option selected={this.state.salary === '40000~50000'}  value="40000~50000">40000~50000</option>
                                                                <option selected={this.state.salary === '50000~60000'}  value="50000~60000">50000~60000</option>
                                                                <option selected={this.state.salary === '60000~70000'}  value="60000~70000">60000~70000</option>
                                                                <option selected={this.state.salary === '70000~80000'}  value="70000~80000">70000~80000</option>
                                                                <option selected={this.state.salary === '80000~90000'}  value="80000~90000">80000~90000</option>
                                                                <option selected={this.state.salary === '90000~100000'} value="90000~100000">90000~100000</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-md-6'>
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
                                                <div className="jSeeBtWrap">

                                                    <div className="previousBtnWrap">
                                                        <button align="left" className="btn nextStep previousBtn btn-md" type="button"  onClick={this.back}><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Employement</span></span></button>
                                                    </div>

                                                    <div className="nextBtnWrap">
                                                        <button align="right" className="btn btn-primary btn-md" type="submit"  ><span className="insBtIcon finishcm"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Finish<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                    </div>
                                                </div>
                                            </form>
            </div>
        )
    }
}

export default withRouter(Preferrence) ;