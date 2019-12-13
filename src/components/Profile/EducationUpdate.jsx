import React, { Component } from 'react';
import Axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import Modal from 'react-bootstrap4-modal';
import YearPicker from "react-year-picker";
import FormValidator from '../../helpers/FormValidator';
const $ = window.$;

class EducationUpdate extends Component {
    constructor() {
        super();
        this.validator = new FormValidator([
			{ 
                field: 'degree', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Degree is required.' 
            },
            { 
                field: 'result', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Result is required.' 
            },
            
            { 
                field: 'institute', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Institute is required.' 
            },

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

            validation: this.validator.valid(),
			error:{},
    }
    this.submitted = false;
}

    //onSubmit={this.updateAcademicInfo(education._id)} 

    componentDidMount(){ 
         console.log("this.props.education.institute",this.props.education)
        this.setState({
            degree:this.props.education.degree,
            result :this.props.education.result,
            duration:this.props.education.duration,
            passingYear:this.props.education.passingYear,
            achievedYear:this.props.education.achievedYear,

            language_ability:this.props.education.language_ability,
            score:this.props.education.score,
            level:this.props.education.level,
            institute:this.props.education.institute,
            
            certified :this.props.education.certified,
            certified_year:this.props.education.certified_year,
            course_title:this.props.education.course_title,
            id : this.props.education._id,
        });
    }


    updateDataEducation= (event) =>{
      //  console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    passingYear(data){
        this.setState({
            passingYear: data
        });
    }

    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getDropList = () => {
        const year = new Date().getFullYear();
        return (
            Array.from( new Array(50), (v,i) =>

                <option key={i} value={year-i}>{year-i}</option>
            )
        );
    };

    updateAcademicInfo = (e) =>{
        e.preventDefault();

        
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
    
        let { certified_year,course_title, certified, degree, result, duration, passingYear, achievedYear,institute, score, language_ability, level, error,source  } = this.state
        
        let educationInfo = new Object()
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

        if(language_ability){
            educationInfo.language_ability=language_ability
        }
        
        if(level){
            educationInfo.level=level
        }
        
        if(score){
            educationInfo.score=score
        }

        if(  validation.isValid == false){
            this.submitted = false;
        }else{
            this.submitted = true;

        let user_id = (window.sessionStorage.getItem('user_id'));
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.put(`/users/update-academic-info/${user_id}/${this.props.education._id}`,educationInfo,{headers: headers})
                .then((result) => {
                    console.log('result',result)
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
                                    modal : 'success'
                                })
                    $('#'+this.props.education._id).modal('hide');
                
                }).catch((error) =>{
                    this.setState({
                        show : ''
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
    render() {
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state
        // console.log(validation)
        
        let {course_title, certified,certified_year, language_ability, level, score, degree, result, duration, achievedYear, passingYear,institute, error , source } = this.state
    
        
        return (
            
            <div>
            
                <div className="modal fade" id={this.props.education._id} tabIndex="-1" role="dialog" aria-labelledby="academic1eModalLabel" aria-hidden="true">
					
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card">
                            <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                            <h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Academic Information
                            </h5>
                            <div className="card-body px-lg-5 pt-0">
                                
                                <form  className="" onSubmit={ this.updateAcademicInfo } >
                                                <div className="form-row firProw">
                                                    <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                        <label className="required" for="latestEducation">Latest Education</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-user-graduate"></i></span>
                                                            </div>
                                                            <input  type="text"  id="latestEducation" name="degree" className={validation.degree.message ? "form-control is-invalid": "form-control"} placeholder="Latest Degree Title" 
                                                            value={ degree } onChange={ this.handleInputChange } />
                                                            <div className="invalid-feedback">{validation.degree.message }</div>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-6 col-md-6 col-sm-12 col-12'>
                                                    <label className="required">Result</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-check-circle"></i></span>
                                                            </div>
                                                            <select className="form-control" name="result" onChange={this.handleInputChange}>
                                                                {/* <option value=""className="result-bold">Result</option> */}
                                                                <option selected={this.state.result === 'A+'} value="A+">A+</option>
                                                                <option selected={this.state.result === 'A'} value="A">A</option> 
                                                                <option selected={this.state.result === 'A-'} value="A-">A-</option> 
                                                                <option selected={this.state.result === 'B+'} value="B+">B+</option>
                                                                <option selected={this.state.result === 'B'} value="B">B</option>
                                                                <option selected={this.state.result === 'B-'} value="B-">B-</option>
                                                                <option selected={this.state.result === 'C+'} value="C+">C+</option>
                                                                <option selected={this.state.result === 'C-'} value="C-">C-</option>
                                                                <option selected={this.state.result === 'D'} value="D">D</option>
                                                                <option selected={this.state.result === 'F'} value="F">F</option>
                                                                {/* <option value="" className="result-bold">Division</option> */}
                                                                <option selected={this.state.result === 'First class'} value="First class">First class</option>
                                                                <option selected={this.state.result === 'Second class'} value="Second class">Second class </option>
                                                                <option selected={this.state.result === 'Third class'} value="Third class">Third class</option>
                                                            </select>
                                                            
                                                        </div>
                                                        <span className="about_length text-red"> {validation.result.message ? validation.result.message:''}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="form-row">
                                                    <div className='form-group col-lg-3 col-md-6 col-sm-12 col-12'>
                                                        <label className="">Duration</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="far fa-clock"></i></span>
                                                            </div>
                                                            <select className="form-control" name="duration" onChange={this.handleInputChange}>
                                                                <option>Duration</option>
                                                                <option selected={this.state.duration === '1 year'} value="1 year">1 year</option>
                                                                <option selected={this.state.duration === '2 year'}  value="2 year">2 year</option>
                                                                <option selected={this.state.duration === '3 year'} value="3 year">3 year</option>
                                                                <option selected={this.state.duration === '4 year'} value="4 year">4 year</option>
                                                                <option selected={this.state.duration === '5 year'} value="5 year">5 year</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-3 col-md-6 col-sm-12 col-12'>
                                                        <label className="">Passing Year</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                            </div>
                                                            {/* <YearPicker onChange={this.passingYear}/> */}
                                                            <select className="form-control" name='passingYear' value={passingYear} onChange={this.handleInputChange}>
                                                                {this.getDropList()}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-6 col-md-12 col-sm-12 col-12'>
                                                        <label className="required">Institute Name</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-university"></i></span>
                                                            </div>
                                                            <input  type="text" name="institute" value={institute } className={validation.institute.message ? "form-control is-invalid": "form-control"} placeholder="Institute Name"  onChange={this.handleInputChange}/>
                                                            <div className="invalid-feedback">{validation.institute.message }</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                </div>
                                                <div className="form-row">
                                                    <div className='form-group col-lg-4 col-md-12 col-sm-12 col-12'>
                                                        <label className="">Language ability</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-language"></i></span>
                                                            </div>
                                                            <select className="form-control" name="language_ability"  onChange={this.handleInputChange}>
                                                                <option>Language</option>
                                                                <option  selected={this.state.language_ability === 'IELTS'} value="IELTS">IELTS</option>
                                                                <option  selected={this.state.language_ability === 'TOFEL'} value="TOFEL">TOFEL</option>
                                                                <option  selected={this.state.language_ability === 'GRE'} value="GRE">GRE</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-4 col-md-6 col-sm-12 col-12'>
                                                        <label className="">Score</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-poll-h"></i></span>
                                                            </div>
                                                            <select className="form-control" name="score" onChange={this.handleInputChange}>
                                                                <option>score</option>
                                                                <option selected={this.state.score === '9'} value="9">9</option>
                                                                <option selected={this.state.score === '8'} value="8">8</option>
                                                                <option selected={this.state.score === '7'} value="7">7</option>
                                                                <option selected={this.state.score === '6'} value="6">6</option>
                                                                <option selected={this.state.score === 'Others'} value="Others">Others</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-4 col-md-6 col-sm-12 col-12'>
                                                        <label className="">Level</label>
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
                                                    <div className='form-group col-lg-5 col-md-12 col-sm-12 col-12'>
                                                    <label >Certificate</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-certificate"></i></span>
                                                            </div>
                                                            <input  type="text" name="course_title" className= "form-control" placeholder="Enter the Course title"  value={course_title} onChange={this.handleInputChange} />
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-4 col-md-6 col-sm-12 col-12'>
                                                        <label >Certified</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-certificate"></i></span>
                                                            </div>
                                                        
                                                            <input  type="text" value ={certified}name="certified" className="form-control" placeholder="certified"   onChange={this.handleInputChange} />
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='form-group col-lg-3 col-md-6 col-sm-12 col-12'>
                                                        <label>Year of achieved</label>
                                                        
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                                            </div>
                                                            {/* <YearPicker onChange={()=>this.achievedYear} value={achievedYear}/> */}
                                                            <select className="form-control" name='achievedYear' value={achievedYear} onChange={this.handleInputChange}>
                                                                {this.getDropList()}
                                                            </select>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div className="text-center profile-edit-modal-btn">
                                                    <button type="submit" className="btn btn-success btn-rounded">Save</button>
                                                    <button type="button" className="btn btn-light btn-rounded" data-dismiss="modal">Close</button>
                                                </div>
                                                
                                                {/* <button className="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button> */}
                                            
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
							<strong>Education have update successfully!</strong>   
							</div>
                    </div>
                </Modal>
            </div> 
        );
    }
}
export default EducationUpdate;