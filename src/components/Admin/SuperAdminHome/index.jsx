import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';

class index extends Component {

    state = {
        jobtotal:'',
        companytotal:''
    }

    componentDidMount(){

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.post(`/jobs/pending-jobs-company-count`)
            .then(response => {
                this.setState({
                    jobtotal : response.data.response.jobtotal,
                    companytotal : response.data.response.companytotal
                })
            })
            .catch(error => {
                console.log('error admin: ', error.response)
            })
    }

    render() {
    
        let { jobtotal , companytotal } = this.state
        return (
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    <section className="commonAdminForms">
                        <div className="container-fluid">
                            
                                <div className="row">
                                    <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Admin</h4>
                                        </div>
                                        <div className="admin-container-fluid">
                                        <div className="row">
                                            <div className="col-xl-3 col-md-6 mb-4 ">
                                                <div className="card border border-left-0 shadow h-100 py-2 rounded mb-0">
                                                    <div className="card-body">
                                                        <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs  font-family- font-weight-bold text-primary text-uppercase mb-1">Pending jobs post </div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{jobtotal}</div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-md-6 mb-4">
                                                <div className="card border border-left-0 shadow h-100 py-2 rounded mb-0">
                                                    <div className="card-body">
                                                        <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">pending company post </div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{companytotal}</div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                        </div>
                                                        </div>
                                                    </div>
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
export default withRouter(index);