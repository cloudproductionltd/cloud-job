import React, { Component } from 'react';
import Axios from 'axios';

import Modal from 'react-bootstrap4-modal';

import FormValidator from '../../helpers/FormValidator';
const $ = window.$;

class UpdateCareerInfo extends Component {

    constructor() {
        super();
    
        this.validator = new FormValidator([
            {
                field: 'objective', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Objective is required.'
            },
            {
                field: 'expected_salary', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Expected salary is required.'
            },{
                field: 'looking_for', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'looking for is required.'
            },{
                field: 'avliable_for', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'avliable for is required.'
            }
        ]);


        this.state = {
            objective:'',
            validlengthOfObjective:'',
            present_salary:'' , 
            expected_salary:'',
            looking_for:'',
            avliable_for:'', 
            error:{},
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }

    onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value } );
    }


    componentDidMount(){ 
        var user_id = (window.sessionStorage.getItem('user_id'));
        var token = (window.sessionStorage.getItem('cool-jwt'));
            Axios.get(`/users/${user_id}`,
            { headers: { Authorization: `${token}` }
            
            })
            .then(response => {
                this.setState( 
                    { 
                    objective: response.data.response.user.careear ? response.data.response.user.careear.objective:'',
                    present_salary: response.data.response.user.careear ? response.data.response.user.careear.present_salary :'',
                    expected_salary: response.data.response.user.careear ? response.data.response.user.careear.expected_salary :'',
                    looking_for: response.data.response.user.careear ? response.data.response.user.careear.looking_for:'',
                    avliable_for: response.data.response.user.careear? response.data.response.user.careear.avliable_for:'',
                })
            })
            .catch(error => {
                console.log('error',error)
            })
    }


    onSubmitCareerDetails = (e) => {
        e.preventDefault();
        const validation = this.validator.validate(this.state);
		this.setState({ validation });
        const { objective , present_salary , expected_salary, looking_for, avliable_for, validlengthOfObjective } = this.state;

		if(validation.isValid == false){
			this.submitted = false;
		}else if( this.state.objective.length<100  || this.state.objective.length >400){
            
            this.state.validlengthOfObjective='Character length 100 to 400 Character.'

        }else{
            this.submitted = true;
        var user_id = (window.sessionStorage.getItem('user_id'));
        console.log('user_id',user_id)
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
      
            
        let careearInfo = new Object()
            if(objective){
                careearInfo.objective=objective
            }            
            if(present_salary){
                careearInfo.present_salary=present_salary
            }            
            if(expected_salary){
                careearInfo.expected_salary=expected_salary
            }
            if(looking_for){
                careearInfo.looking_for=looking_for
            }
            if(avliable_for){
                careearInfo.avliable_for=avliable_for
            }
            
            Axios.put(`/users/careear/${user_id}`,
            careearInfo,
                {headers: headers}
                )
                .then((result) => {
                    $('#modal-carrer').modal('hide');
                    window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                        
                        this.setState({ user: result.data.response.user , 
                            modal : 'success',
                        })
                        
                    window.location.reload();
                })
            }
        }

    render(){
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state
        // console.log(validation)
        let { objective , present_salary , expected_salary, looking_for, avliable_for , validlengthOfObjective} = this.state;
        return(
            <div>
            <div className="modal fade" id="modal-carrer" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card">
                            <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                            <h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Carrer and Application Information
                            </h5>
                            <div className="card-body px-lg-5 pt-0">
                                <form onSubmit={this.onSubmitCareerDetails}  className="profile-edit-modal-form">
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-pencil-alt prefix"></i>
                                                <textarea type="text" onChange={this.onChange} name="objective" value={ objective } id="form10" className={validation.objective.message ? "md-textarea form-control is-invalid": "md-textarea form-control"}  rows="3"></textarea>
                                                <label htmlFor="form10" className={ objective ? "required active":"required " }>Objective </label>
                                                <div className="invalid-feedback">{validation.objective.message}</div>
                                                
                                                <span className="minchar text-red"> {validlengthOfObjective? validlengthOfObjective:''}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-money-bill-alt prefix"></i>
                                                <input type="text" name="present_salary" value={ present_salary } onChange={this.onChange}   id="materialEditFormPresentSalary" className="form-control"/>
                                                <label htmlFor="materialEditFormPresentSalary"  className={ present_salary ? "active":"" }>Present Salary</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fas fa-money-bill-alt prefix"></i>
                                                <input type="text" className={validation.expected_salary.message ? "form-control is-invalid": "form-control"} name="expected_salary" value={ expected_salary } onChange={this.onChange} id="materialEditFormExpectedSalary"/>
                                                <label htmlFor="materialEditFormExpectedSalary" className={ expected_salary ? "required active":"required " }>Expected Salary</label>
                                                <div className="invalid-feedback">{validation.expected_salary.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row looking-for-job">
                                        <div className="col">
                                            <label class="required">Looking for (job level)</label>
                                            <div className="tripleradio ">
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" name="looking_for" value= "Entry Level" checked={this.state.looking_for === 'Entry Level'} onChange={this.onChange}  className="custom-control-input" id="defaultInlineCarrer1" />
                                                    <label className="custom-control-label" htmlFor="defaultInlineCarrer1">Entry Level</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" name="looking_for" value= "Mid Level" checked={this.state.looking_for === 'Mid Level'} onChange={this.onChange} className="custom-control-input" id="defaultInlineCarrer2" />
                                                    <label className="custom-control-label" htmlFor="defaultInlineCarrer2">Mid Level</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" name="looking_for" value="Top Level" checked={this.state.looking_for === 'Top Level'} onChange={this.onChange} className="custom-control-input" id="defaultInlineCarrer3" />
                                                    <label className="custom-control-label" htmlFor="defaultInlineCarrer3">Top Level</label>
                                                </div>
                                            </div>
                                            {validation.looking_for.message ? <span className="triple-radio-feedback">job level is required</span> :' '}
                                        </div>
                                    </div>
                                    <div className="form-row available-job-nature">
                                        <div className="col">
                                            <label class="required">Available for (job nature)</label>
                                            <div className="tripleradio">
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio"  name="avliable_for" value="Full time" checked={this.state.avliable_for === 'Full time'} onChange={this.onChange} className="custom-control-input" id="defaultInlineFullTime" />
                                                    <label className="custom-control-label" htmlFor="defaultInlineFullTime">Full time</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio"  name="avliable_for" value="Part time" checked={this.state.avliable_for === 'Part time'} onChange={this.onChange} className="custom-control-input" id="defaultInlinePartTime" />
                                                    <label className="custom-control-label" htmlFor="defaultInlinePartTime">Part time</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio"  name="avliable_for" value="Contract" checked={this.state.avliable_for === 'Contract'} onChange={this.onChange} className="custom-control-input" id="defaultInlineContract" />
                                                    <label className="custom-control-label" htmlFor="defaultInlineContract">Contract</label>
                                                </div>
                                            </div>
                                            {validation.avliable_for.message ?  <span className="triple-radio-feedback">job nature is required</span> : ''}
                                        </div>
                                    </div>
                                    <div className="text-center profile-edit-modal-btn">
                                        <button type="submit" className="btn btn-success btn-rounded waves-effect waves-light">Update</button>
                                        <button type="button" className="btn btn-light btn-rounded waves-effect waves-light" data-dismiss="modal">Close</button>
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
                    <strong>Carrier Information saved Successfully!</strong>   
                </div>
            </div>
            </Modal>
        </div>
        )
    }

}

export default UpdateCareerInfo;