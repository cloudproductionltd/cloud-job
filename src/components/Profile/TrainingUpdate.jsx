import React, { Component } from 'react';
import Axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import Modal from 'react-bootstrap4-modal';
import FormValidator from '../../helpers/FormValidator';
const $ = window.$;


class TrainingUpdate extends Component {
    constructor() {
        super();
    
        this.validator = new FormValidator([
            {
                field: 'traning_country', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Country is required.'
            },{
                field: 'traning_title', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Title is required.'
            },{
                field: 'traning_topic', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Topic is required.'
            },{
                field: 'traning_institute', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Institute is required.'
            },{
                field: 'traning_duration', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Duration is required.'
            },{
                
                field: 'traning_location', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Location is required.'
            }, {
                field: 'traning_year', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Year is required.'
            }
        ]);
    

    this.state ={
        traning_country:'',
        traning_year:'',
        traning_title:'',
        traning_topic:'',
        traning_institute:'',
        traning_duration:'',
        traning_location:'',
        id :'',
        error:{},
        validation: this.validator.valid()
        }
        this.submitted = false;
    }


    componentDidMount(){ 
        this.setState({
            traning_country : this.props.training.country,
            traning_year : this.props.training.year,
            traning_title : this.props.training.title,
            traning_topic : this.props.training.topic,
            traning_institute : this.props.training.institute,
            traning_duration : this.props.training.duration,
            traning_location : this.props.training.location,
            id : this.props.training._id
        });
    }


    updateDataTraining= (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    updateTrainingInfo = event => {

        event.preventDefault();
        const validation = this.validator.validate(this.state);
		this.setState({ validation });
		

        if(validation.isValid == false){
			this.submitted = false;
		}else{
            this.submitted = true;
        var user_id = (window.sessionStorage.getItem('user_id'));
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        const { traning_year, traning_country, traning_title,  traning_topic, traning_institute, traning_duration,traning_location,id } = this.state;
        var user_id = (window.sessionStorage.getItem('user_id'));

        Axios.put(`/users/update-training-info/${user_id}/${this.props.training._id}`,
                {
                    year : traning_year,
                    country: traning_country,
                    title: traning_title,
                    topic : traning_topic,
                    institute : traning_institute,
                    location : traning_location,
                    duration: traning_duration
                },{headers: headers})
                .then((result) => {
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                    this.setState({ user: result.data.response.user ,
                        modal : 'success'
                                })
                    $('#'+this.props.training._id).modal('hide');
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

    render() {
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation  
        let { traning_country, traning_year, traning_title, traning_topic, traning_institute, traning_duration ,traning_location } = this.state
        return (
            <div>
                <div className="modal fade" id={this.props.training._id} tabIndex="-1" role="dialog" aria-labelledby="academicModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card">
                            <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                            <h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Professional Training 
                            </h5>
                            <div className="card-body px-lg-5 pt-0">
                                <form  onSubmit={this.updateTrainingInfo} className="profile-edit-modal-form" >
                                    <div className="form-row">
                                        <div className="col">
                                            
                                    <div className="md-form">
                                        <i className="fas fa-flag prefix"></i>
                                        <span className={this.state.traning_country ? 'requiredtrainCountry asteriskNone' : 'requiredtrainCountry asterisk'}>*</span>
                                        
                                        <select className={ validation.traning_country.message ? "browser-default custom-select profile-edit-common-select is-invalid" : "browser-default custom-select profile-edit-common-select"} value ={traning_country} onChange={ this.updateDataTraining } name="traning_country">
                                        
                                        
                                            <option value="">Country</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="India">India</option>
                                            <option value="Canada">Canada</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                            <option value="Africa">Africa</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="England">England</option>
                                            <option value="Chaina">Chaina</option>
                                            <option value="Japan">Japan</option>
                                        </select>
                                        <div className="invalid-feedback">{validation.traning_country.message}</div>
                                    </div>
                                        </div>
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-calendar-alt prefix"></i>
                                                <span className={this.state.traning_year ? 'requiredTrainingYear asteriskNone' : 'requiredTrainingYear asterisk'}>*</span>
                                                <select className={ validation.traning_year.message ? "browser-default custom-select profile-edit-common-select required is-invalid" : "browser-default custom-select profile-edit-common-select required" } value={traning_year} onChange={ this.updateDataTraining } name="traning_year">
                                                    <option value="">Training Year</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2008">2008</option>
                                                </select>
                                                <div className="invalid-feedback">{validation.traning_year.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-tasks prefix"></i>
                                                <input type="text" id="materialEditFormTrainingTitle" onChange={ this.updateDataTraining } value={traning_title} name="traning_title" className={validation.traning_title.message ? "form-control is-invalid" : "form-control"}/>
                                                <label htmlFor="materialEditFormTrainingTitle" className={ traning_title ? "required active":"required " }>Training Title</label>
                                                <div className="invalid-feedback">{validation.traning_title.message}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-pencil-alt prefix"></i>
                                                <input type="text" id="materialEditFormTopicsCovered" onChange={ this.updateDataTraining } value={ traning_topic }  name="traning_topic" className={validation.traning_topic.message ? "form-control is-invalid": "form-control"}/>
                                                <label htmlFor="materialEditFormTopicsCovered" className={ traning_topic ? "required active":"required " }>Topics Covered</label>
                                                <div className="invalid-feedback">{validation.traning_topic.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-university prefix"></i>
                                                <input type="text" id="materialEditFormInstitute" onChange={ this.updateDataTraining } value={traning_institute} name="traning_institute" className={validation.traning_institute.message ? "form-control is-invalid" : "form-control"}/>
                                                <label htmlFor="materialEditFormInstitute" className={ traning_institute ? "required active":"required " }>Institute</label>
                                                <div className="invalid-feedback">{validation.traning_institute.message}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="far fa-clock prefix"></i>
                                                <input type="text" id="materialEditFormDuration" onChange={ this.updateDataTraining } value={traning_duration} name="traning_duration" className={validation.traning_duration.message ? "form-control is-invalid":"form-control"}/>
                                                <label htmlFor="materialEditFormDuration" className={ traning_duration ? "required active":"required " }>Duration</label>
                                                <div className="invalid-feedback">{validation.traning_duration.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-map-marker-alt prefix"></i>
                                                <input type="text" id="materialEditFormLocation" onChange={ this.updateDataTraining } value={traning_location} name="traning_location" className={validation.traning_location.message ? "form-control is-invalid" : "form-control"}/>
                                                <label htmlFor="materialEditFormLocation" className={ traning_location ? "required active":"required " }>Location</label>
                                                <div className="invalid-feedback">{validation.traning_location.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center profile-edit-modal-btn">
                                        <button type="submit" className="btn btn-success btn-rounded waves-effect waves-light">Save</button>
                                        <button type="reset" className="btn btn-light btn-rounded waves-effect waves-light" data-dismiss="modal">Close</button>
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
							<strong>Training Informations updated Successfully!</strong>   
							</div>
                    </div>
                </Modal>

            </div>
        );
    }
}

export default TrainingUpdate;







