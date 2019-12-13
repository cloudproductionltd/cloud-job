import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-awesome-modal';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            username : '',
            email: '',
            password: ''
        }

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
            
        }
        
    

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        axios.post('/users/signup', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then( 
            (response) => { console.log(response) },
            (error) => { console.log(error.response.data.details[0]) }
        );
    }


    
    openModal() {
        this.setState({
            visible : true
        });
    }


    closeModal() {
        this.setState({
            visible : false
        });
    }

    render(){
        return (
            <div>
                <a className="btn btn-success btn-rounded waves-effect waves-light" type="button" href="# " data-toggle="modal" data-target="#basicExampleModal" onClick={() => this.openModal()}>Signup</a>
        
                <Modal  visible={this.state.visible}
                                width="500"
                                height="400"
                                effect="fadeInUp"
                                onClick={() => this.closeModal()}>

                            <div>
                                    <div>
                                        <div className="fade login-modal show" id="basicExampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" >
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-body-1">
                                                        <div className="card">
                                                        <button onClick={() => this.closeModal()} type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true" onClick={() => this.closeModal()}>×</span>
                                                        </button>
                                                        <form onSubmit = {e => this.submit(e)} className="" id="SignUpForm" action="" method="post" >
                                                            <h5 className="card-header gray-color login-card white-text text-center py-4">
                                                                <a href="# " className="active" id="login-form-link">sign up</a>
                                                            </h5>
                                                            <div className="form-wrapper-login">
                                                            
                                                                <div className="md-form">
                                                                    <label>Username</label> <input type="text" name="username" onChange={e => this.change(e)} value={this.state.username}/>
                                                                    <label htmlFor="materialLoginFormUsername" className="">Username</label>
                                                                </div>

                                                                <div className="md-form">
                                                                    <label>email</label> <input type="text" name="email" onChange={e => this.change(e)} value={this.state.email}/>
                                                                    <label htmlFor="materialLoginFormUsername" className="">email</label>
                                                                </div>

                                                                <div className="md-form has-error">
                                                                    <i className="fas fa-key prefix"></i>
                                                                    {/* <input type="password" id="materialLoginFormPassword" className="form-control"  />
                                                                    <label htmlFor="materialLoginFormPassword" className="text-danger">Password</label> */}

                                                                    <label>password</label><input type="password" name="password"  onChange={e =>this.change(e)} value={this.state.password} />
                                                                    <span className="help-block text-danger error-message">Please correct the error</span>
                                                                </div>
                                                                <div className="d-flex justify-content-around">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input" />
                                                                        <label className="custom-control-label" htmlFor="defaultUnchecked">Remember Me</label>
                                                                    </div>
                                                                    <div>
                                                                        <a href="# " id="forgetPass">Forget Password?</a>
                                                                    </div>
                                                                </div>
                                                                <button onClick={() => this.closeModal()} className="btn btn-success btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Sign in</button>
                                                                <div className="row site-link">
                                                                    <div className="col-md-12">
                                                                    <p className="member-check">Not a member?
                                                                        <a href="# " id="register_btn">Register</a>
                                                                    </p>
                                                                    <p className="text-center">or sign in with:</p>
                                                                    <div className="social-icon-wrapper">
                                                                        <a  href="# " type="button" className="btn-floating btn-fb btn-sm waves-effect waves-light">
                                                                        <i className="fab fa-facebook-f"></i>
                                                                        </a>
                                                                        <a href="# " type="button" className="btn-floating btn-tw btn-sm waves-effect waves-light">
                                                                        <i className="fab fa-twitter"></i>
                                                                        </a>
                                                                        <a href="# " type="button" className="btn-floating btn-li btn-sm waves-effect waves-light">
                                                                        <i className="fab fa-linkedin-in"></i>
                                                                        </a>
                                                                        <a  href="# "type="button" className="btn-floating btn-git btn-sm waves-effect waves-light">
                                                                        <i className="fab fa-github"></i>
                                                                        </a>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <form className="forget-pass" id="forget_pass" action="" method="post" >
                                                            <h5 className="card-header gray-color login-card white-text text-center py-4">
                                                                <a href="# " className="active" id="login-form-link">Forget password?</a>
                                                            </h5>
                                                            <div className="form-wrapper-login">
                                                                <div className="md-form">
                                                                    <i className="fas fa-envelope prefix"></i>
                                                                    <input type="email" name="email" id="forgetEmailFrom" className="form-control" />
                                                                    <label htmlFor="materialLoginFormUsername">Email Address</label>
                                                                </div>
                                                                <button className="btn btn-success btn-rounded btn-block my-4 waves-effect z-depth-0"  type="submit">Submit</button>
                                                                <div className="alert alert-success" role="alert">
                                                                    This is a success alert—check it out!
                                                                </div>
                                                            </div>
                                                        </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                
                                </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(SignUp);
