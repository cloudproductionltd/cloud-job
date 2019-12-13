import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from '../SuperAdminHome/Sidebar';
import Footer from './Footer';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import {  Link } from 'react-router-dom';
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import AdminPendingCompanyForApprove from '../../Admin/SuperAdminHome/AdminPendingCompanyForApprove';
import AllApprovedUserList from '../../Admin/SuperAdminHome/AllApprovedUser';
import AllApprovedCompany from '../../Admin/SuperAdminHome/AllApprovedCompany';

const $ = window.$;


class AllApprovedUsersInfoWithTab extends Component {

    state = {
        users:[]
    }

    componentDidMount(){

    }

    render() {


        return (
            
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    <section className="commonAdminForms recruiterJobListContainer">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center recrutrJobRow">
                                <div className="col col-lg-10">
                                    <div className="tab-card">
                                        <div className="tab-card-header mb-3">
                                            <ul className="nav nav-tabs card-header-tabs tab-cmList" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <button className="btn btn-success btn-sm" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true"> Approved User List </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="btn nextStep btn-sm" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false"> Approved Company List </button>
                                                </li>
                                                {/* <li className="nav-item">
                                                    <button className="btn btn-danger btn-sm" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Rejected</button>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <div className="tab-content pt-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
                                                <div className="card">
                                                    
                                                <AllApprovedUserList/>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                                                <div className="card">
                                                    <AllApprovedCompany/>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="three" role="tabpanel" aria-labelledby="three-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="mb-0">Rejected List</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer/>
                </div>
            </div>
            
        );
        }
    }
export default withRouter(AllApprovedUsersInfoWithTab);