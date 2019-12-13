import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {  Link,NavLink } from 'react-router-dom';

class Breadcumb extends Component {

    logout = (e) =>{
        sessionStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (            
                <div>
                    <header className="adminHeader">
                        <nav className="navbar">
                            <div className="container-fluid">
                                <div className="navbar-holder d-flex align-items-center justify-content-between">
                                    <div className="navbar-header">
                                    <a id="toggle-btn" href=" #" className="menu-btn">
                                        <i className="fas fa-bars"></i>
                                    </a>
                                    <a href="# " className="navbar-brand">
                                        <div className="brand-text d-none d-md-inline-block"><strong className="recruiterDsh">Dashboard</strong></div>
                                    </a>
                                    </div>
                                    <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                        <li className="nav-item" onClick={() => this.logout()}><a href="# " className="nav-link logout"> <span className="d-sm-inline-block">Logout</span><i className="fas fa-sign-out-alt"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                
                {/* <div className='navmargin'>
                    <ul className="nav nav-tabs" role="tablist">
                        <li> <NavLink to='/applicants'>Applicants</NavLink> </li>
                        <li className="nav-item">
                        <li><NavLink to='/selected-applicants'>Applicants</NavLink></li>
                        </li>

                    </ul>
                </div>   */}

             
                </div>

            );
        }
}

export default  withRouter(Breadcumb);