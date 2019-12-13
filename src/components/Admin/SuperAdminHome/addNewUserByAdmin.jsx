import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';


import Information from '../../Profile/JobSeekerWizerd/Personalinfo';

import Employeement from '../../Profile/JobSeekerWizerd/Employeement';
import EducationAndTraining from '../../Profile/JobSeekerWizerd/EducationAndTraining';
import Preferrence from '../../Profile/JobSeekerWizerd/Preferrence';



import { withRouter } from 'react-router-dom'
import DropdownTreeSelect from 'react-dropdown-tree-select'
const $ = window.$;

const data = 
[
    { "label": "Executive", 
   
    "checked": false, 
    "children": [
       
        { "label": "CEO/COO/CFO/CIO/CTO/Other" },
        { "label": "Manager (Sales/Marketing)" },
        { "label": "Manager (Administration)" },
        { "label": "Manager (Other)" },

    ] 

    },
    { "label": "IT (pc,Web,Unix)", 
   
    "checked": false, 
    "children": [
       
        { "label": "Project Manager" },
        { "label": "Business Application SE" },
        { "label": "ERP,SCM,CRM Architect" },
        { "label": "Web Application SE" },
        { "label": "Database SE" },
        { "label": "Programmer" },
        { "label": "QA/Quality/Control/Testing Engineer" }

    ] 

    },
    

{ "label": "IT (Embedded Software, Control Systems)", 
   
    "checked": false, 
    "children": [
       
        { "label": "Project Manager" },
        { "label": "Software Architecture" },
        { "label": "Programmer" },
    ]
}
];

const onChange = (currentNode, selectedNodes) => {
    console.log('onChange::', currentNode, selectedNodes)
  }
  const onAction = (node, action) => {
    console.log('onAction::', action, node)
  }
  const onNodeToggle = currentNode => {
    console.log('onNodeToggle::', currentNode)
  }


class AddNewUserByAdmin extends Component {

    componentDidMount(){
        $(document).ready(function () {

            var   navListItems = $('div.setup-panel div a'),

                  navListItemsPara = $('div.setup-panel div p'),

                  allWells = $('.setup-content'),
                  allNextBtn = $('.nextBtn');
      
                  allWells.hide();
                  navListItems.click(function (e) {
                      e.preventDefault();
                      var $target = $($(this).attr('href')),
                              $item = $(this);

              if (!$item.hasClass('disabled')) {

                  navListItems.removeClass('activecom').addClass('btn-light');


                  navListItemsPara.removeClass('disActive').addClass('active');

                  navListItemsPara.addClass('active');

                  $item.addClass('activecom');
                  allWells.hide();
                  $target.show();
                  $target.find('input:eq(0)').focus();
                  
              }
              else {
                  
              }

            });
      
          allNextBtn.click(function(){
              var curStep = $(this).closest(".setup-content"),
                  curStepBtn = curStep.attr("id"),
                  nextStepWizard = $('div.stup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                  curInputs = curStep.find("input[type='text'],input[type='url']"),
                  isValid = true;
                  
              $(".form-group").removeClass("has-error");
              for(var i=0; i<curInputs.length; i++){
                  if (!curInputs[i].validity.valid){
                      isValid = false;
                      $(curInputs[i]).closest(".form-group").addClass("has-error");
                  }
              }
      
              if (isValid)
                  nextStepWizard.removeAttr('disabled').trigger('click');
          });
      
          $('div.setup-panel div a.btn-primary').trigger('click');

          
      });
       
    }

    render() {
        return (
    
       
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    
                                 
                    <section className="commonAdminForms">
                        <div className="container-fluid">
                            <div className="row recrutrJobRow justify-content-md-center">
                                <div className="col-lg-10">
                                    <div className="tab-card">
                                        <div className="tab-card-header mb-3">
                                            <ul className="nav nav-tabs card-header-tabs tab-cmList tab_custom_cm" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-item nav-link active" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Registration</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-item nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Add New Company</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-item nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Add New Jobseeker</a>
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="tab-content pt-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
                                            <div className="card">
                                            <div className="card-header">
                                                <h4 className="adminh4">Registration for Jobseeker/Recruiter</h4>
                                            </div>
                                            <div className="card-body">
                                                <form id="signupForm"  method="post">
                                                    <div className="form-wrapper-login">
                                                        <div className="form-row firstRow">
                                                    
                                                            <div className="col col-lg-4 col-md-4 col-12 ">
                                                                <div className="md-form firstResname">
                                                                    <i className="fas fa-user prefix"></i>
                                                                    <input type="text" name = "firstName"  id="mRegisterFormUsername" className="form-control"/>
                                                                    <label htmlFor="mRegisterFormUsername"  className="required  first-namereg">First Name</label>
                                                                </div>
                                                            </div>
                                                            <div className="col col-lg-4 col-md-4 col-12 ">
                                                                <div className="md-form cmCommonname lastnameMd">
                                                                    <input type="text" name = "lastName"  id="mRegisterFormLastName" className="form-control" />
                                                                    <label htmlFor="mRegisterFormLastName"  className="required">Last Name</label>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="col col-lg-4 col-md-4 col-12 ">
                                                                <div className="md-form cmCommonname middlenameMd">
                                                                    <input type="text" name = "middleName"  id="mRegisterFormMiddleName" className="form-control" />
                                                                    <label htmlFor="mRegisterFormMiddleName"  className=""> Middle Name</label>
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="col-lg-4 col-md-4 col-12">
                                                                <div className="md-form">
                                                                    <i className="fas fa-envelope prefix"></i>
                                                                    <input type="email" name="email" id="mRegisterFormEmail" className="form-control" />
                                                                    <label htmlFor="mRegisterFormEmail"  className= "required">Email Address</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-12">
                                                                <div className="md-form">
                                                                    <i className="fas fa-key prefix"></i>
                                                                    <input type="password" name="password" id="mRegisterFormPassword" className="form-control" />
                                                                    <label htmlFor="mRegisterFormPassword" className= "required">Password</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-12">
                                                                <div className="md-form">
                                                                    <i className="fas fa-key prefix"></i>
                                                                    <input type="password" name="confirmPassword" id="mRegisterFormConfirm-Password" className="form-control" />
                                                                    <label htmlFor="mRegisterFormConfirm-Password" className= "required">Confirm Password</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <p className="register-as mb-1">Register as</p>
                                                                <div className="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" className="custom-control-input" id="seeker" name="role" value='seeker' />
                                                                    <label className="custom-control-label" htmlFor="seeker">Jobseeker</label>
                                                                </div>
                                                                <div className="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" className="custom-control-input" id="recruiter" name="role" value='recruiter' />
                                                                    <label className="custom-control-label" htmlFor="recruiter">Recruiter</label>
                                                                </div>
                                                            </div>
                                                            <button type="submit" value='Register Now' className="btn btn-outline-success btn-rounded mt-3">Register</button> 
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                            <div className="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                                                <div className="card wizard-card">
                                        <div className="card-header">
                                            <h4 className="mb-0">Add New Company Profile</h4>
                                        </div>
                                        <div className="stepwizard">
                                            <div className="stepwizard-row setup-panel">
                                                <div className="steTwoWrap stepwizard-stepCompany afcolorActive">
                                                    <a href="#step-1" id="" type="button" className="btn activecom btn-circle"><i className="fas fa-building"></i></a>
                                                    <p className="mb-0 priCoAll active mt-2">Company Details
                                                    <span className="cmWiSubtitle">Enter your first time company details</span></p>
                                                </div>
                                                <div className="steThreeoWrap stepwizard-stepCompany">
                                                    <a href="#step-2" type="button" className="btn btn-light btn-circle" disabled="disabled"><i className="fas fa-mobile-alt"></i></a>
                                                    <p className="mb-0 priCoAll mt-2 disActive">Contact Details (Primary)
                                                    <span className="cmWiSubtitle">Enter your first time contact details(Primary)</span></p>
                                                </div>
                                                <div className="steFourWrap stepwizard-stepCompany">
                                                    <a href="#step-3" id="" type="button" className="btn btn-light btn-circle" disabled="disabled"><i className="fas fa-mobile-alt"></i></a>
                                                    <p className="mb-0 priCoAll mt-2  disActive">Contact Details (Secondary)
                                                    <span className="cmWiSubtitle">Enter your first time contact details(Secondary)</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="card-body">
                                        <div className="row setup-content" id="step-1">
                                            <div className="col-md-12">
                                            <div className="topInsideTitle">
                                                <h4><span className="titlePd"><i className="fas fa-building"></i></span>Company Details<span className="stepName">Step 1-3</span></h4>
                                            </div>
                                            <form className="companyProfileForm step1Form form-horizontal">
                                                    <div className="form-row firProw">
                                                        <div className='form-group col-md-6 col-sm-12 col-12'>
                                                            <label className="required">Company Name</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-user-tie"></i></span>
                                                                </div>
                                                                <input  type="text" name="job_id" className="form-control" placeholder="Company Name" />
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-md-6 col-sm-12 col-12'>
                                                            <label className="required">Company Address Details</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                                </div>
                                                                <input  type="text" name="job_title" className="form-control" placeholder="Company Address Details" 
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className='form-group col'>
                                                            <label className="required">Company Address</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                                </div>
                                                                <select id="nature" className="form-control cmPrAdd" name="nature">
                                                                    <option>Region</option>
                                                                    <option value="FullTime">Asia</option>
                                                                    <option value="partTime">Africa</option>
                                                                    <option value="Intern">Nepal</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-12 col-lg-2 col-md-6 col-sm-6 labelComheight'>
                                                            <label className="">Country</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                                </div>
                                                                <select id="nature" className="form-control cmPrAdd" name="nature">
                                                                    <option>Country</option>
                                                                    <option value="Bangladesh">Bangladesh</option>
                                                                    <option value="India">India</option>
                                                                    <option value="Intern">Americal</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-12 col-lg-2 col-md-3 col-sm-6 labelComheight'>
                                                            <label className="">City</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                                </div>
                                                                <select id="nature" className="form-control cmPrAdd" name="nature">
                                                                    <option>City</option>
                                                                    <option value="Barisal">Barisal anchal</option>
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
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-12 col-lg-2 col-md-3 col-sm-6 labelComheight'>
                                                            <label className="">State</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                                </div>
                                                                <select id="nature" className="form-control cmPrAdd" name="nature">
                                                                    <option>State</option>
                                                                    <option value="FullTime">Full Time</option>
                                                                    <option value="partTime">Part Time</option>
                                                                    <option value="Intern">Intern</option>
                                                                    <option value="Contractual">Contructual</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-12 col-lg-2 col-md-6 col-sm-6 labelComheight prefecLabel'>
                                                            <label className="">Prefecture</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                                </div>
                                                                <select id="nature" className="form-control cmPrAdd" name="nature">
                                                                    <option>Prefecture</option>
                                                                    <option value="FullTime">Full Time</option>
                                                                    <option value="partTime">Part Time</option>
                                                                    <option value="Intern">Intern</option>
                                                                    <option value="Contractual">Contructual</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                

                                                    <div className="form-row">
                                                        <div className='form-group col-lg-4 categorySubDroRect'>
                                                            <label className="required">Industry Type</label>
                                                            <DropdownTreeSelect texts={{ placeholder: 'Industry Type' }} data={data} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
                                                        </div>
                                                        <div className='form-group col-lg-4'>
                                                            <label className="">Business Licence No</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-pencil-alt"></i></span>
                                                                </div>
                                                                <input type="text" name="vacancy" className="form-control" placeholder="Business Licence No" />
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-lg-4'>
                                                            <label className="">RL No (Only Recruiting Agent)</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-pencil-alt"></i></span>
                                                                </div>
                                                                <input type="text" name="vacancy" className="form-control" placeholder="RL No" />
                                                            </div>
                                                        </div>
                                                    </div>


                                                



                                                    

                                                    <div className="form-row">
                                                    <div className='form-group col-md-6'>
                                                            <label className="required">Website URL</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fab fa-weebly"></i></span>
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Website URL" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                                                                
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="form-group col-md-6">
                                                            <label className="">Company Logo</label>
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend fileUpload">
                                                                    <span className="input-group-text">Logo</span>
                                                                </div>
                                                                <div className="custom-file customFileWrap">
                                                                    <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                                                    <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                
                                                    
                                                    
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label className="">Business Description</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-list-ol"></i></span>
                                                                </div>
                                                                <textarea name="additional_requirment" rows="2" className="form-control" placeholder="Business description"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
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
                                        </div>



                                        <div className="row setup-content" id="step-2">
                                            <div className="col-md-12">
                                                <div className="topInsideTitle">
                                                    <h4><span className="titlePd"><i className="fas fa-mobile-alt"></i></span>Contact Details (Primary)<span className="stepName">Step 2-3</span></h4>
                                                </div>
                                                <form className="companyProfileForm step1Form form-horizontal">
                                                    <div className="form-row firProw">
                                                        <div className='form-group col-md-4 col-sm-12 col-12'>
                                                            <label className="required">First Name</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                </div>
                                                                <input  type="text" name="first_name" className="form-control" placeholder="First Name" />
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-md-4 col-sm-12 col-12'>
                                                            <label className="">Middle Name</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                </div>
                                                                <input  type="text" name="middle_name" className="form-control" placeholder="Middle Name" 
                                                                />
                                                                
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-md-4 col-sm-12 col-12'>
                                                            <label className="required">Last Name</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                </div>
                                                                <input type="text" name="lastname" className="form-control" placeholder="Last Name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-row">
                                                        <div className='form-group col-md-6'>
                                                            <label className="required">Company Designation</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                                </div>
                                                                <input  type="text" name="nationality" className="form-control" placeholder="Company Designation" />
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-md-6'>
                                                            <label className="required">Company Email</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                                                </div>
                                                                <input  type="text" name="title" className="form-control" placeholder="Company Email" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label className="">Photo</label>
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend fileUpload">
                                                                    <span className="input-group-text">Upload</span>
                                                                </div>
                                                                <div className="custom-file customFileWrap">
                                                                    <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                                                    <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                    
                            
                                                <div className="jSeeBtWrap">
                                                    <div className="previousBtnWrap">
                                                    <button align="left" className="btn nextStep previousBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Personal Information</span></span></button>
                                                    </div>
                                                    <div className="nextBtnWrap">
                                                        <button align="right" className="btn btn-success nextBtn btn-md" type="submit" ><span className="insBtIcon"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                    </div>
                                                </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className="row setup-content" id="step-3">
                                                <div className="col-md-12">
                                                    <div className="topInsideTitle">
                                                        <h4><span className="titlePd"><i className="fas fa-mobile-alt"></i></span>Contact Details (Secondary)<span className="stepName">Step 3-3</span></h4>
                                                    </div>
                                                    <form className="companyProfileForm step1Form form-horizontal">
                                                    <div className="form-row firProw">
                                                        <div className='form-group col-md-4 col-sm-12 col-12'>
                                                            <label className="required">First Name</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                </div>
                                                                <input  type="text" name="first_name" className="form-control" placeholder="First Name" />
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-md-4 col-sm-12 col-12'>
                                                            <label className="">Middle Name</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                </div>
                                                                <input  type="text" name="middle_name" className="form-control" placeholder="Middle Name" />
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-md-4 col-sm-12 col-12'>
                                                            <label className="required">Last Name</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                                </div>
                                                                <input type="text" name="lastname" className="form-control" placeholder="Last Name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-row">
                                                        <div className='form-group col-md-6'>
                                                            <label className="required">Company Designation</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                                </div>
                                                                <input  type="text" name="nationality" className="form-control" placeholder="Company Designation" />
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-md-6'>
                                                            <label className="required">Company Email</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                                                </div>
                                                                <input  type="text" name="title" className="form-control" placeholder="Company Email" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label className="">Photo</label>
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend fileUpload">
                                                                    <span className="input-group-text">Upload</span>
                                                                </div>
                                                                <div className="custom-file customFileWrap">
                                                                    <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                                                    <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="jSeeBtWrap">
                                                        <div className="nextBtnWrap">
                                                            <button align="right" className="btn btn-primary nextBtn btn-md" type="submit" ><span className="insBtIcon finishcm"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Finish!<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                        </div>
                                                    </div>
                                                </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                            </div>
                                            <div className="tab-pane fade" id="three" role="tabpanel" aria-labelledby="three-tab">
                                                <div className="card wizard-card">
                                        <div className="card-header">
                                            <h4 className="mb-0">Add New Jobseeker Profile</h4>
                                        </div>
                                        <div className="stepwizard">
                                        <div className="stepwizard-row setup-panel">
                                    
                                        <div className="step-before">
                                            <div className="stepwizard-stepCompany afcolorActive newpostcm">
                                                <a href="#step-11" id="" type="button" className="btn btn-primary btn-circle"><i className="fas fa-user"></i></a>
                                                <p className="mb-0 priCoAll active">Personal Details
                                                <span className="cmWiSubtitle">Enter your first time personal details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm" onClick={(e) => this.addClassto(e)}>
                                                <a href="#step-12" type="button" className="btn btn-default btn-circle" disabled="disabled"><i className="fas fa-graduation-cap"></i></a>
                                                <p className="mb-0 priCoAll">Education/Training
                                                <span className="cmWiSubtitle">Enter your first time Education/Training details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm" onClick={(e) => this.StepThree(e)}>
                                                <a href="#step-13" id="" type="button" className="btn btn-default btn-circle" disabled="disabled"><i className="fas fa-running"></i></a>
                                                <p className="mb-0 priCoAll">Employment
                                                <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                            </div>
                                            <div className="stepwizard-stepCompany newpostcm" onClick={(e) => this.StepFour(e)}>
                                                <a href="#step-14" type="button" className="btn btn-default btn-circle" disabled="disabled"><i className="fas fa-cog"></i></a>
                                                <p className="mb-0 priCoAll">Preferrence
                                                <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row setup-content" id="step-11">
                                            <div className="col-md-12">
                                            <div className="topInsideTitle">
                                                <h4><span className="titlePd"><i className="fas fa-user"></i></span>Personal Details<span className="stepName">Step 1-4</span></h4>
                                            </div>
                                                <Information/>
                                            </div>
                                            <div className="jSeeBtWrap">
                                                    {/* <div className="previousBtnWrap">
                                                    <button align="left" className="btn btn-primary previousBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Personal Information</span></span></button>
                                                    </div> */}
                                                    {/* <div className="nextBtnWrap">
                                                        <button href="#step-2" align="right" className="btn btn-success nextBtn btn-md" type="button" ><span className="insBtIcon"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                    </div> */}
                                                </div>
                                        </div>
                                        <div className="row setup-content" id="step-12">
                                            <div className="col-md-12">
                                                <div className="topInsideTitle">
                                                    <h4><span className="titlePd"><i className="fas fa-user"></i></span>Education/Training<span className="stepName">Step 2-4</span></h4>
                                                </div>
                                                    <EducationAndTraining/>
                                                </div>
                                            </div>
                                            <div className="row setup-content" id="step-13">
                                                <div className="col-md-12">
                                                <div className="topInsideTitle">
                                                    <h4><span className="titlePd"><i className="fas fa-user"></i></span>Employement<span className="stepName">Step 3-4</span></h4>
                                                </div>
                                                    <Employeement/>
                                                </div>
                                            </div>
                                            <div className="row setup-content" id="step-14">
                                                <div className="col-md-12">
                                                <div className="topInsideTitle">
                                                    <h4><span className="titlePd"><i className="fas fa-user"></i></span>Employement<span className="stepName">Step 4-4</span></h4>
                                                </div>
                                                <Preferrence/>
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
            </div>
        );
           
        }
    }
export default withRouter(AddNewUserByAdmin);