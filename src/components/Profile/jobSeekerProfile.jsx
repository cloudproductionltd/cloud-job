import React, { Component } from 'react';
import Axios from 'axios';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import UserSidebar from './userSidebar';
import Information from './JobSeekerWizerd/Personalinfo';

import Employeement from './JobSeekerWizerd/Employeement';
import EducationAndTraining from './JobSeekerWizerd/EducationAndTraining';
import Preferrence from './JobSeekerWizerd/Preferrence';

import { Link, withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const $ = window.$;

class JobSeekerProfile extends Component{

    componentDidMount () {
        $(document).ready(function () {

            var  navListItems = $('div.setup-panel div a'),

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

    addClassto = (e) => {
        e.preventDefault();
            console.log('e',e)
            $('.steTwoWrap p').removeClass('active');
            $('.steThreeoWrap p').addClass('active');
            $('.steTwoWrap p').addClass('newColorPa');
    }
    StepThree = (e) => {
        $('.steThreeoWrap p').removeClass('active');
        $('.steFourWrap p').addClass('active');
        $('.steThreeoWrap p').addClass('newColorPa');
    }
    StepFour = (e) => {
        $('.steFourWrap p').removeClass('active');
        $('.steFiveWrap p').addClass('active');
        $('.steFourWrap p').addClass('newColorPa');
    }

    
    render(){
        return (
            <div>
            <Navbar/>  
            <div className="page-wrapper chiller-theme">
                <div className="container">
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
                                        <div className="stepwizard-stepCompany afcolorActive newpostcm">
                                            <a href="#step-1" id="" type="button" className="btn btn-primary btn-circle"><i className="fas fa-user"></i></a>
                                            <p className="mb-0 priCoAll active">Personal Details
                                            <span className="cmWiSubtitle">Enter your first time personal details</span></p>
                                        </div>
                                        <div className="stepwizard-stepCompany newpostcm" onClick={(e) => this.addClassto(e)}>
                                            <a href="#step-2" type="button" className="btn btn-default btn-circle" disabled="disabled"><i className="fas fa-graduation-cap"></i></a>
                                            <p className="mb-0 priCoAll">Education/Training
                                            <span className="cmWiSubtitle">Enter your first time Education/Training details</span></p>
                                        </div>
                                        <div className="stepwizard-stepCompany newpostcm" onClick={(e) => this.StepThree(e)}>
                                            <a href="#step-3" id="" type="button" className="btn btn-default btn-circle" disabled="disabled"><i className="fas fa-running"></i></a>
                                            <p className="mb-0 priCoAll">Employment
                                            <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                        </div>
                                        <div className="stepwizard-stepCompany newpostcm" onClick={(e) => this.StepFour(e)}>
                                            <a href="#step-4" type="button" className="btn btn-default btn-circle" disabled="disabled"><i className="fas fa-cog"></i></a>
                                            <p className="mb-0 priCoAll">Preferrence
                                            <span className="cmWiSubtitle">Enter your first time Employment details</span></p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row setup-content" id="step-1">
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
                                    <div className="row setup-content" id="step-2">
                                        <div className="col-md-12">
                                            <div className="topInsideTitle">
                                                <h4><span className="titlePd"><i className="fas fa-user"></i></span>Education/Training<span className="stepName">Step 2-4</span></h4>
                                            </div>
                                                <EducationAndTraining/>
                                            </div>
                                        </div>
                                        <div className="row setup-content" id="step-3">
                                            <div className="col-md-12">
                                            <div className="topInsideTitle">
                                                <h4><span className="titlePd"><i className="fas fa-user"></i></span>Employement<span className="stepName">Step 3-4</span></h4>
                                            </div>
                                                <Employeement/>
                                            </div>
                                        </div>
                                        <div className="row setup-content" id="step-4">
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
            <Footer/>
            </div>
           
        )
    }
}

export default withRouter(JobSeekerProfile);
