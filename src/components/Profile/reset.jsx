
import React, { Component } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import {  Link } from 'react-router-dom';


class Reset extends Component{

    constructor(){
        super();
        this.state = {
            username:''
        }
    }
    
    render(){
        return (
            <Router>
            <div>
            <Navbar/>
            <div className="container page-wrapper chiller-theme">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <nav id="sidebar" className="sidebar-wrapper">
                            <div className="sidebar-content">
                                <div className="sidebar-header">
                                    <div className="user-pic">
                                        <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt=""/>
                                    </div>
                                    <div className="user-info">
                                        <span className="user-name">
                                        <strong>{this.state.username}</strong>
                                        </span>
                                        <span className="user-role">Administrator</span>
                                        <span className="user-status">
                                        <i className="fa fa-circle"></i>
                                        <span>Online</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="sidebar-menu">
                                    <ul>
                                        <li>
                                            <Link to='/applications'>
                                            <i className="fa fa-book"></i>
                                            <span>  Applications </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/profile'>
                                            <i className="fa fa-calendar"></i>
                                            <span>User profile </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sidebar-footer">
                                <a href="# " title="notification">
                                <i className="fa fa-bell"></i>
                                {/* <span className="badge badge-pill badge-warning notification">3</span> */}
                                </a>
                                <a href="# " title="message">
                                <i className="fa fa-envelope"></i>
                                {/* <span className="badge badge-pill badge-success notification">7</span> */}
                                </a>
                                <a href="# ">
                                <i className="fa fa-cog"></i>
                                {/* <span className="badge-sonar"></span> */}
                                </a>
                            </div>
                        </nav>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                Home / Setting / Reset Password
                            </div>
                            <div className="card-body">
                                <h5 className="reset-h5">
                                    Reset Password
                                </h5>
                                <form className=""  action="" method="post" className="resetForm-wrapper">
                                    <div className="form-group row">
                                        <label for="currentPass" className="col-sm-4 col-form-label">Enter Current Password</label>
                                        <div className="col-sm-1"> : </div>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" id="currentPass" placeholder="Enter Current Password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="newPassword" className="col-sm-4 col-form-label">Enter New Password</label>
                                        <div className="col-sm-1"> : </div>
                                        <div className="col-sm-7">
                                            <input type="password" className="form-control" id="newPassword" placeholder="Enter New Password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="ConfirmnewPassword" className="col-sm-4 col-form-label">Confirm New Password</label>
                                        <div className="col-sm-1"> : </div>
                                        <div className="col-sm-7">
                                            <input type="password" className="form-control" id="ConfirmnewPassword" placeholder="Confirm New Password" />
                                        </div>
                                    </div>
                                    <div className="form-group row resetBtnWrap">
                                        <button type="button" className="btn btn-default btn-rounded">Submit</button>
                                        <button type="button" className="btn btn-danger btn-rounded">Reset</button>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
            </Router>
        )
    }
}

export default withRouter(Reset);
