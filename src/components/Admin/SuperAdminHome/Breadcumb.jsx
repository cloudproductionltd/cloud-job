import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {  Link } from 'react-router-dom';
const $ = window.$;

class Breadcumb extends Component {
    componentDidMount() {

        // $('#toggle-btn').on('click', function (e) {

        //     e.preventDefault();
    
        //     if ($(window).outerWidth() > 1194) {
        //         $('nav.side-navbar').toggleClass('shrink');
        //         $('.page').toggleClass('active');
        //     } else {
        //         $('nav.side-navbar').toggleClass('show-sm');
        //         $('.page').toggleClass('active-sm');
        //     }
        // });
        
    }

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
                                        {/* <a id="toggle-btn" href="# " className="menu-btn"></a> */}
                                        <a id="toggle-btn" href=" #" className="menu-btn">
                                        <i className="fas fa-bars"></i>
                                    </a>
                                        <a href="# " className="navbar-brand">
                                            <div className="brand-text d-none d-md-inline-block"><span className="recruiterDsh">Admin</span><strong className="text-primary">Dashboard</strong></div>
                                        </a>
                                        
                                    </div>
                                    <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                        
                                        <li className="nav-item" onClick={() => this.logout()}><a href="# " className="nav-link logout"> <span className="d-none d-sm-inline-block">Logout</span><i className="fas fa-sign-out-alt"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                    {/* <div className="breadcrumb-holder">
                        <div className="container-fluid">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="# ">Home</a></li>
                                
                                <li className="breadcrumb-item active">Forms</li>
                            </ul>
                        </div>
                    </div> */}
                </div>

            );
        }
}

export default  withRouter(Breadcumb);