import React, { Component, useState } from 'react';
import Axios from 'axios';
import FormValidator from './../../../helpers/FormValidator';
import YearPicker from "react-year-picker";

class EducationAndTraining extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.passingYear = this.passingYear.bind(this)
        this.achievedYear = this.achievedYear.bind(this)

        this.validator = new FormValidator([
            

            // { 
            //     field: 'course_title', 
            //     method: 'isEmpty', 
            //     validWhen: false, 
            //     message: 'course title is required.' 
            // },

            // { 
            //     field: 'certified', 
            //     method: 'isEmpty', 
            //     validWhen: false, 
            //     message: 'Certified is required.' 
            // },

        
            
        ]);
    
        this.state = {
            degree:'',
            result :'',
            duration:'',
            passingYear:'',
            achievedYear:'',

            language_ability:'',
            score:'',
            level:'',
            institute:'',

            certified :'',
            certified_year:'',
            course_title:'',

            error:{},
            validation: this.validator.valid(),
        }
    
        this.submitted = false;
        
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }; 
    componentDidMount(){
        
        let data = JSON.parse(localStorage.getItem('education'))

        if(data){
            this.setState({
                degree: data.degree,
                result: data.result,
                duration:data.duration,
                passingYear:data.passingYear,
                achievedYear:data.achievedYear,
                institute:data.institute,

                language_ability:data.language_ability,
                score:data.score,
                level:data.level,
                

                certified :data.certified,
                certified_year: data.certified_year,
                course_title: data.course_title,
                
            })
        }
    }

    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    passingYear(data){
        this.setState({
            passingYear: data
        });
    }

    getDropList = () => {
        const year = new Date().getFullYear();
        return (
           
            Array.from( new Array(50), (v,i) =>
                
                <option key={i} value={year-i}>{year-i}</option>
            )
        );
    };
    
    achievedYear(data){
        this.setState({
            achievedYear: data
        });
    }

    handleSubmit = event => {
    
        // event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        let { certified_year,course_title,certified, degree, result, duration, passingYear, achievedYear,institute, score, language_ability, level, error,source  } = this.state
   
        let educationInfo = new Object()
        let languageInfo = new Object()
        let cerficationInfo = new Object()

        if(degree){
            educationInfo.degree=degree
        }
        if(result){
            educationInfo.result=result
        }
        if(duration){
            educationInfo.duration=duration
        }
        if(passingYear){
            educationInfo.passingYear=passingYear
        }
    
        
        if(institute){
            educationInfo.institute=institute
        }
        
        
        if(course_title){
            educationInfo.course_title=course_title
        }
        
        if(certified){
            educationInfo.certified=certified
        }
        
        if(achievedYear){
            educationInfo.achievedYear=achievedYear
        }

        
        if(score){
            educationInfo.score=score
        }

        if(level){
            educationInfo.level = level
        }
        
        if(language_ability){
            educationInfo.language_ability=language_ability
        }
        
        localStorage.setItem('education', JSON.stringify(this.state));
        window.sessionStorage.setItem('allowForApply',1 );
        window.sessionStorage.setItem('validationfromEducationinfo', validation.isValid);
        let user_id = (window.sessionStorage.getItem('user_id'));
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        if(validation.isValid == true){
            // event.preventDefault();

            Axios.put(`/users/add-academic-info/${user_id}`,educationInfo,
            {headers: headers}
            )
            .then((result) => {
            
                // console.log('address',result)

                // window.location.reload()
            })
            .catch((error) =>{
                
            });


            // Axios.put(`/users/add-certificate-info/${user_id}`,cerficationInfo,
            // {headers: headers}
            // )
            // .then((result) => {
            
            //     // console.log('address',result)

            //     // window.location.reload()
            // })
            // .catch((error) =>{
                
            // });

            this.props.nextStep();
        }else{

        }
        
    };

    render(){
        const { values, handleChange } = this.props;
        let {course_title, certified,certified_year, language_ability, level, score, degree, result, duration, achievedYear, passingYear,institute, error , source } = this.state
    
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state
    
        console.log('education state ',this.state)
        return(
            <div>
                <form  onSubmit={ this.handleSubmit } className="companyProfileForm step1Form form-horizontal">
                                                <div className="form-row firProw">
                                                    <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                        <label className="" for="latestEducation">Latest Education</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-user-graduate"></i></span>
                                                            </div>
                                                            <input  type="text"  id="latestEducation" name="degree" className= "form-control" placeholder="Latest Degree Title" 
                                                            value={ degree } onChange={ this.handleInputChange } />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                    <label className="required invisibleCm">Result</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-check-circle"></i></span>
                                                            </div>
                                                            <select className="form-control" name="result" onChange={this.handleInputChange}>
                                                                <option value=""className="">Result</option>
                                                                <option value="A+">A+</option>
                                                                <option value="A">A</option> 
                                                                <option value="A-">A-</option> 
                                                                <option value="B+">B+</option>
                                                                <option value="B">B</option>
                                                                <option value="B-">B-</option>
                                                                <option value="C+">C+</option>
                                                                <option value="C-">C-</option>
                                                                <option value="D">D</option>
                                                                <option value="F">F</option>
                                                                {/* <option value="" className="result-bold">Division</option> */}
                                                                <option value="First class">First class</option>
                                                                <option value="Second class">Second class </option>
                                                                <option value="Third class">Third class</option>
                                                            </select>
                                                            
                                                        </div>
   
                                                    </div>
                                                </div>
                                                
                                                <div className="form-row">
                                                    <div className='form-group col-lg-3 col-md-6 col-sm-12 col-12'>
                                                        <label className="invisibleDispaly">Duration</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="far fa-clock"></i></span>
                                                            </div>
                                                            <select className="form-control" name="duration" onChange={this.handleInputChange}>
                                                                <option>Duration</option>
                                                                <option value="1 year">1 year</option>
                                                                <option value="2 year">2 year</option>
                                                                <option value="3 year">3 year</option>
                                                                <option value="4 year">4 year</option>
                                                                <option value="5 year">5 year</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-3 col-md-6 col-sm-12 col-12'>
                                                        <label className="invisibleDispaly">Passing Year</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                            </div>
                                                            <select className="form-control" name='passingYear' value={passingYear} onChange={this.handleInputChange}>
                                                                <option  value=''>Passing Year</option>
                                                                {this.getDropList()}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-6 col-md-12 col-sm-12 col-12'>
                                                        <label className="required invisibleDispaly">Institute Name</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-university"></i></span>
                                                            </div>
                                                            <input  type="text" name="institute" value={institute } className= "form-control" placeholder="Institute Name"  onChange={this.handleInputChange}/>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-lg-4 col-md-12 col-sm-12 col-12'>
                                                        <label className="">Language Ability</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-language"></i></span>
                                                            </div>
                                                            <select className="form-control" name="language_ability"  onChange={this.handleInputChange}>
                                                                <option>Language Ability</option>
                                                                <option  selected={this.state.language_ability === 'IELTS'} value="IELTS">IELTS</option>
                                                                <option  selected={this.state.language_ability === 'TOFEL'} value="TOFEL">TOFEL</option>
                                                                <option  selected={this.state.language_ability === 'GRE'} value="GRE">GRE</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-4 col-md-6 col-sm-12 col-12'>
                                                        <label className="invisibleCm">Score</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-poll-h"></i></span>
                                                            </div>
                                                            <select className="form-control" name="score" onChange={this.handleInputChange}>
                                                                <option>Score</option>
                                                                <option selected={this.state.score === '9'} value="9">9</option>
                                                                <option selected={this.state.score === '8'} value="8">8</option>
                                                                <option selected={this.state.score === '7'} value="7">7</option>
                                                                <option selected={this.state.score === '6'} value="6">6</option>
                                                                <option selected={this.state.score === 'Others'} value="Others">Others</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-4 col-md-6 col-sm-12 col-12'>
                                                        <label className="invisibleCm">Level</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-level-up-alt"></i></span>
                                                            </div>
                                                            <select className="form-control" name="level" onChange={this.handleInputChange}>
                                                                <option>Level</option>
                                                                <option selected={this.state.level === 'Beginner'} value="Beginner">Beginner</option>
                                                                <option selected={this.state.level === 'Intermediate'} value="Intermediate">Intermediate</option>
                                                                <option selected={this.state.level === 'Conversational'} value="Conversational">Conversational</option>
                                                                <option selected={this.state.level === 'Fluent'} value="Fluent">Fluent</option>
                                                                <option selected={this.state.level === 'Business'} value="Business">Business</option>
                                                                <option selected={this.state.level === 'Native'} value="Native">Native</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-lg-4 col-md-12 col-sm-12 col-12'>
                                                    <label >Certificate</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-graduation-cap"></i></span>
                                                            </div>
                                                            <input  type="text" name="course_title" className= "form-control" placeholder="Course Title"  value={course_title} onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-4 col-md-6 col-sm-12 col-12'>
                                                        <label className="invisibleCm">Certificate</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-certificate"></i></span>
                                                            </div>
                                                            <input  type="text" value ={certified}name="certified" className="form-control" placeholder="Certified"   onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-4 col-md-6 col-sm-12 col-12'>
                                                        <label className="invisibleCm">Year of achieved</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                            </div>
                                                            <select className="form-control" name='achievedYear' value={achievedYear} onChange={this.handleInputChange}>
                                                                <option  value=''>Year of Achieved</option>
                                                                {this.getDropList()}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    </div>
                                                <div className="jSeeBtWrap">
                                                    <div className="previousBtnWrap">
                                                    <button align="left" className="btn nextStep previousBtn btn-md" type="button"  onClick={this.back}><span className="insBtIcon"><i className="fas fa-chevron-left"></i></span><span className="wrapToSpan">Previous Step<br /><span className="botBtn">Personal Information</span></span></button>
                                                    </div>
                                                    {/* <div className="nextBtnWrap">
                                                        <button align="right" className="btn btn-primary nextBtn btn-md" type="button" onClick={this.continue}><span className="insBtIcon"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                    </div> */}
                                                    <div className="nextBtnWrap">
                                                    <button align="right" className="btn btn-success btn-md" type="submit" ><span className="insBtIcon"><i className="fas fa-chevron-right"></i></span><span className="wrapToSpan">Next Step<br /><span className="botBtn">Confirm Your Details</span></span></button>
                                                </div>
                                                </div>   
                                                {/* <button className="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button> */}
                                            </form>
                                    </div>
            )
        }
    }

export default EducationAndTraining;