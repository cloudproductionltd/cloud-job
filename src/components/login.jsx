
import React, { Component } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import FormValidator from '../helpers/FormValidator';
import Footer from './Home/Footer';
import Navbar from './Home/Navbar';
import Axios from 'axios';
import Modal from 'react-bootstrap4-modal';


class login extends Component{
    
    constructor() {
        super();
    

        this.validator = new FormValidator([
            { 
                field: 'new_password', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'new password is required.' 
            },{ 
                field: 'confirm_password', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'confirm password is required.' 
            }
        ]);


        this.state = {
            new_password : '',
            confirm_password : '',
            token :'',
            validation_massage_password_match :'',
            passwordlength :'',
            error:{},
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }
    
    componentDidMount(history){
        const { match: { params } } = this.props;
        console.log('param',params.token)
    
        this.setState({ 
            token: params.token
        });

    

        Axios.get(`/auth/reset-password/${params.token}`,
        )
        .then(response => {
            console.log('response',response)
            if (response.data.user == null){
                this.setState({
                    modal: 'unsuccess'
                })
            }
        })
    }

    passwordChange =  (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value,
            validation_massage_password_match:''
        })
    }

    submit =  ( event, history) => {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        let { new_password, confirm_password , validation_massage_password_match, token} = this.state
        this.submitted = true;

        let submitToken = token
        if(validation.isValid == false){
			this.submitted = false;
		}else if(new_password !=confirm_password){
            this.setState({
                validation_massage_password_match : 'password not match',
            })
        }else if( new_password.length < 6){
            
            this.setState({
                passwordlength : 'password length should be 6 cherecter ',
            })
        }
        
        else{
            this.submitted = true;
            Axios.post(`/auth/reset-password/${submitToken}`, {
                password : new_password
            }).then( res => {
                console.log('responsejob',res)
                this.setState({
                    modal : 'success',
                })
            });
        }
    }

    closeModal( history) {
        this.setState({
            modal:''
        });

        this.props.history.push('/');
    }


    render(){

        let {validation_massage_password_match, passwordlength } =this.state
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state
        console.log('validation_massage_password_match',validation_massage_password_match)
        return (
            <Router>
            <div>
            <Navbar/>
                <div className="fade login-modal show" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body-1">
                                <div className="card">
                                
                                <form onSubmit = {this.submit} className="" id="loginForm" action="" method="post" >
                                    <h5 className="card-header gray-color login-card white-text text-center py-4">
                                        <a href="# " className="active" id="login-form-link">Reset Password</a>
                                    </h5>
                                
                                    <div className="form-wrapper-login">
                                        <div className="md-form">
                                        <i className="fas fa-lock prefix"></i>
                                            <input type="password" id="Addnewpass" className={validation.new_password.message ? "form-control is-invalid": "form-control"}   name="new_password" onChange={this.passwordChange}  />
                                            <label htmlFor="Addnewpass" className="">New Password</label>
                                            <div className="invalid-feedback">{validation.new_password.message }</div>
                                        </div>
                                        <div className="md-form">
                                            <i className="fas fa-clipboard-check prefix"></i>
                                            <input type="password" id="confirmPassword" className={validation.confirm_password.message ? "form-control is-invalid": "form-control"} name="confirm_password" onChange={this.passwordChange}  />
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <div className="invalid-feedback">{validation.confirm_password.message }</div>
                                            

                                        </div>
                                        
                                        <span className="minchar_forgetpassword text-red"> {validation_massage_password_match? validation_massage_password_match:''}</span>
                                        
                                        <span className="minchar_forgetpassword text-red"> {passwordlength? passwordlength:''}</span>
                                        <button className="btn btn-success btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Reset Password</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                <Footer/>
                <Modal visible={ this.state.modal == 'success' ? true : false}>
                    <div className="card">
                        <div className="alert alert-success user-success-message">
                            <strong>Password reset successfull, Please login with new password!</strong>  
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal visible={ this.state.modal == 'unsuccess' ? true : false}>
                    <div className="card">
                        
                        <div className="alert alert-success user-success-message">
                            <strong> Link is not valid!</strong>  
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button> 
                        </div>
                        
                    </div>
                </Modal>
            </div>
            </Router>
        )
    }
}

export default withRouter(login);
