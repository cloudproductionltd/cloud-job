import React, { Component ,forwardRef, useRef,createRef, useImperativeHandle} from 'react'

import Footer from '../Home/Footer'
import Navbar from '../Home/Navbar'
import UserSidebar from './userSidebar'
import Axios from 'axios';
import Personalinfo from './JobSeekerWizerd/Personalinfo'
import Employeement from './JobSeekerWizerd/Employeement'
import EducationAndTraining from './JobSeekerWizerd/EducationAndTraining'
import Preferrence from './JobSeekerWizerd/Preferrence'
import FormValidator from './../../helpers/FormValidator'
import { Link, withRouter } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
const $ = window.$;


class JobSeekerWizerd extends Component{

    constructor(props) {
        super(props);
    
        this.personalinfo = React.createRef();
        this.educationInfo = React.createRef();

        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            email: '',
            occupation: '',
            city: '',
            bio: '',
            // error:{},
            // validation: this.validator.valid(),
        }

      
        this.submitted = false;
        }


        componentDidMount () {
            let data={}
        }
    
        nextStep = () => {
            
                const { step } = this.state;
                this.setState({
                    step: step + 1
                });
            
        };


        checkPersonalValidation =() =>{
            this.personalinfo.current.handleSubmitFromUpperTab()
            // console.log('ssssssssssssssssssssssssss')
        }


        checkEducationInfor =() =>{
            this.educationInfo.current.handleSubmit()
            // console.log('ssssssssssssssssssssssssss')
        }

    
        prevStep = () => {
        const { step } = this.state;
            this.setState({
                step: step - 1
            });
        };

        setStep = (data) => {
                this.setState({
                    step: data
                });
        }

        handleChange = input => e => {
            e.preventDefault();
            const validation = this.validator.validate(this.state);
            this.setState({ validation });
            this.submitted = true;
            this.setState({ [input]: e.target.value });
        };



    render(){
        const { step } = this.state;
        
            switch (step) {
                case 1:
                return (

                    <div>
                    <Navbar/> 
                    <div className="container page-wrapper chiller-theme">
                        <div className="row">
                            <div className="col-md-3 col-sm-12 profileSideBar">
                                <UserSidebar/>
                            </div>
                            <div className="col-md-9 col-sm-12">
                                <div className="container">
                                <div className="row">
                                <div className="card wizard-card">
                                    <div className="card-header">
                                        <h4 className="mb-0">User Information</h4>
                                    </div>
                                    <div className="stepwizard">
                                        <div className="stepwizard-row setup-panel">
                                            <div className="step-before">
                                                <div className="stepwizard-stepCompany newpostcm steTwoWrap">
                                                    <a href="#step-1" id="" type="button" class={step == 1 ? "btn btn-circle activecom" : "btn btn-light btn-circle"} ><i className="fas fa-user"></i></a>
                                                    <p className="mb-0 priCoAll active">Personal Details
                                                    <span className="cmWiSubtitle">Enter your first time personal details</span></p> 
                                                </div>
                                                <div className="stepwizard-stepCompany newpostcm steThreeoWrap" >
                                                    <a href="#step-2" type="button" class={step == 1 ? "btn btn-light btn-circle" : "btn btn-circle btn-light" }  onClick = {this.checkPersonalValidation} disabled="disabled"><i className="fas fa-graduation-cap"></i></a>
                                                    <p className="mb-0 priCoAll">Education/<br className="mobile_screen" />Training
                                                        <span className="cmWiSubtitle">Enter your first time Education/Training details</span></p>
                                                </div>
                                                <div className="stepwizard-stepCompany newpostcm steFourWrap" >
                                                    <a href="#step-3" id="" type="button" class={step == 1 ? "btn btn-light btn-circle" : "btn btn-circle btn-light"}  disabled="disabled"><i className="fas fa-running"></i></a>
                                                    <p className="mb-0 priCoAll">Employment
                                                        <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                                </div>
                                                <div className="stepwizard-stepCompany newpostcm steFiveWrap">
                                                    <a href="#step-4" type="button" class={step == 1 ? "btn btn-light btn-circle" : "btn btn-circle btn-light"}  disabled="disabled"><i className="fas fa-cog"></i></a>
                                                    <p className="mb-0 priCoAll">Preferrence
                                                    <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <br/>
                                <Personalinfo
                                nextStep={this.nextStep}
                                handleChange={this.handleChange}
                                ref={this.personalinfo}
                                // values={values}
                                />
                                 </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>  
                    <Footer/>
                    </div>
                );
                case 2:
                return (
                    <div>
                    <Navbar/> 
                    <div className="container page-wrapper chiller-theme">
                        <div className="row">
                            <div className="col-md-3 col-sm-12 profileSideBar">
                                <UserSidebar/>
                            </div>
                            <div className="col-md-9 col-sm-12">
                                <div className="container">
                                <div className="row">
                            <div className="card wizard-card">
                                <div className="card-header">
                                    <h4 className="mb-0">User Information</h4>
                                </div>
                                <div className="stepwizard">
                                    <div className="stepwizard-row setup-panel">
                                        <div className="step-before">   
                                            <div className="stepwizard-stepCompany newpostcm steTwoWrap">
                                                <a href="#step-1" id="" type="button" class={step == 2 ? "btn btn-circle btn-light" :"btn btn-circle btn-light"  }  ><i className="fas fa-user"></i></a>
                                                <p className="mb-0 priCoAll active">Personal Details
                                                    <span className="cmWiSubtitle">Enter your first time personal details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm steThreeoWrap" >
                                                <a href="#step-2" type="button" class={step == 2 ? "btn btn-circle activecom" : "btn btn-light btn-circle"}   disabled="disabled"><i className="fas fa-graduation-cap"></i></a>
                                                <p className="mb-0 priCoAll">Education/Training
                                                <span className="cmWiSubtitle">Enter your first time Education/Training details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm steFourWrap" >
                                                <a href="#step-3" id="" type="button" class={step == 2 ? "btn btn-circle btn-light" :"btn btn-light btn-circle"  }  onClick = {this.checkEducationInfor}  disabled="disabled"><i className="fas fa-running"></i></a>
                                                <p className="mb-0 priCoAll">Employment
                                                <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm steFiveWrap">
                                                <a href="#step-4" type="button" class={step == 2 ? "btn btn-circle btn-light" :"btn btn-light btn-circle"  }   disabled="disabled"><i className="fas fa-cog"></i></a>
                                                <p className="mb-0 priCoAll">Preferrence
                                                <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                               
                                <br/>
                                <EducationAndTraining
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                // values={values}
                                ref={this.educationInfo}
                                handleChange={this.handleChange}
                               
                                />
                                 </div>
                                 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>  
                    </div>
                );
                case 3:
                return (

                    <div>
                    <Navbar/> 
                    <div className="container page-wrapper chiller-theme">
                        <div className="row">
                            <div className="col-md-3 col-sm-12 profileSideBar">
                                <UserSidebar/>
                            </div>
                            <div className="col-md-9 col-sm-12">
                                <div className="container">
                                    <div className="row">
                                        <div className="card wizard-card">
                                            <div className="card-header">
                                                <h4 className="mb-0">User Information</h4>
                                            </div>
                                            <div className="stepwizard">
                                                <div className="stepwizard-row setup-panel">
                                                
                                                    <div className="step-before">
                                                        <div className="stepwizard-stepCompany newpostcm steTwoWrap">
                                                            <a href="#step-1" id="" type="button" class={step == 3 ? "btn btn-circle btn-light" :"btn btn-circle btn-light"  }  ><i className="fas fa-user"></i></a>
                                                            <p className="mb-0 priCoAll active">Personal Details
                                                                <span className="cmWiSubtitle">Enter your first time personal details</span></p>
                                                        </div>
                                                        <div className="stepwizard-stepCompany newpostcm steThreeoWrap" >
                                                            <a href="#step-2" type="button" class={step == 3 ? "btn btn-circle btn-light" :"btn btn-circle btn-light"  }  onClick = {()=>this.setStep(2)} disabled="disabled"><i className="fas fa-graduation-cap"></i></a>
                                                            <p className="mb-0 priCoAll">Education/Training
                                                                <span className="cmWiSubtitle">Enter your first time Education/Training details</span></p>
                                                        </div>
                                                        <div className="stepwizard-stepCompany newpostcm steFourWrap" >
                                                            <a href="#step-3" id="" type="button" class={step == 3 ? "btn btn-circle activecom" : "btn btn-light btn-circle"}  onClick = {()=>this.setStep(3)} disabled="disabled"><i className="fas fa-running"></i></a>
                                                            <p className="mb-0 priCoAll">Employment
                                                                <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                                        </div>
                                                        <div className="stepwizard-stepCompany newpostcm steFiveWrap">
                                                            <a href="#step-4" type="button" class={step == 3 ? "btn btn-circle btn-light" :"btn btn-circle btn-light"  }  onClick = {()=>this.setStep(4)} disabled="disabled"><i className="fas fa-cog"></i></a>
                                                            <p className="mb-0 priCoAll">Preferrence
                                                                <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <br/>
                                            <Employeement
                                                nextStep={this.nextStep}
                                                prevStep={this.prevStep}
                                                handleChange={this.handleChange}
                                                // values={values}
                                                />
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <Footer/>
                    </div>
                );
                case 4:
                return (

                    <div>
                    <Navbar/> 
                    <div className="container page-wrapper chiller-theme">
                        <div className="row">
                            <div className="col-md-3 col-sm-12 profileSideBar">
                                <UserSidebar/>
                            </div>
                            <div className="col-md-9 col-sm-12">
                                <div className="container">
                                <div className="row">
                            <div className="card wizard-card">
                                <div className="card-header">
                                    <h4 className="mb-0">User Information</h4>
                                </div>
                                <div className="stepwizard">
                                    <div className="stepwizard-row setup-panel">
                                        
                                        <div className="step-before">
                                            <div className="stepwizard-stepCompany newpostcm steTwoWrap">
                                                <a href="#step-1" id="" type="button" class={step == 4 ? "btn btn-circle btn-light" :"btn btn-circle btn-light"} onClick = {()=>this.setStep(1)} ><i className="fas fa-user"></i></a>
                                                <p className="mb-0 priCoAll active">Personal Details
                                                    <span className="cmWiSubtitle">Enter your first time personal details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm steThreeoWrap" >
                                                <a href="#step-2" type="button" class={step == 4 ? "btn btn-circle btn-light" :"btn btn-circle btn-light"   } onClick = {()=>this.setStep(2)} disabled="disabled"><i className="fas fa-graduation-cap"></i></a>
                                                <p className="mb-0 priCoAll">Education/Training
                                                    <span className="cmWiSubtitle">Enter your first time Education/Training details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm steFourWrap" >
                                                <a href="#step-3" id="" type="button" class={step == 4 ?"btn btn-circle btn-light" :"btn btn-circle btn-light"   }  onClick = {()=>this.setStep(3)} disabled="disabled"><i className="fas fa-running"></i></a>
                                                <p className="mb-0 priCoAll">Employment
                                                    <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm steFiveWrap">
                                                <a href="#step-4" type="button" class={step == 4 ? "btn btn-circle activecom" : "btn btn-light btn-circle"} onClick = {()=>this.setStep(4)} disabled="disabled"><i className="fas fa-cog"></i></a>
                                                <p className="mb-0 priCoAll">Preferrence
                                                    <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <br/>
                                <Preferrence
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                // values={values}
                                />
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <Footer/>
                    </div>
                    
                ); 

            }
    }
}

export default withRouter(JobSeekerWizerd);
