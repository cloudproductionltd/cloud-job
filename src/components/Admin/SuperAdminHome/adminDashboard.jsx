import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Axios from 'axios'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import CountUp from 'react-countup';
import { withRouter,Link } from 'react-router-dom';
const $ = window.$;


class AdminDashboardPage extends Component {

    intervarJobsID;
    intervarCompaniesID;
    intervarApprovedCompaniesTotalID;
    intervarAllApprovedJobsTotalID;

    state = {
        PendingCompanies:[],
        Pendingjobs :[],
        PendingjobsTotal:'',
        PendingCompaniesTotal:'',
        ApprovedCompanyTotal:'',
        AllApprovedJobTotal:''
    }

    componentDidMount(){
        const {
            match: {params}
        } = this.props;

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        
            this.getCompanyData()
            this.getJobsData()
            this.getApprovedCompanyTotal()
            this.getAllApproveJobTotalData()
            
    }

    
    componentWillUnmount() {
        clearTimeout(this.intervarJobsID);
        clearTimeout(this.intervarCompaniesID);
        clearTimeout(this.intervarApprovedCompaniesTotalID);
        clearTimeout(this.intervarAllApprovedJobsTotalID);
    }

    getCompanyData = () => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/companies/admin/pending/dashboard/notreported`,{headers:headers})
        .then(response => {

            this.setState({
                PendingCompanies:[...response.data.companies],
                PendingCompaniesTotal:response.data.total
            })
            this.intervarCompaniesID = setTimeout(this.getCompanyData.bind(this), 5000);
        })
    }

    getAllApproveJobTotalData = () => {
    
        Axios.post(`/jobs/total/count`)
        .then(response => {

            this.setState({
            
                AllApprovedJobTotal : response.data.total
            })
            this.intervarAllApprovedJobsTotalID = setTimeout(this.getAllApproveJobTotalData.bind(this), 5000);
        })
    }

    getApprovedCompanyTotal = () => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/companies/admin/approved/company/count`)
        .then(response => {
            console.log('okk',response)
            this.setState({
                ApprovedCompanyTotal:response.data.total
            })
            this.intervarApprovedCompaniesTotalID = setTimeout(this.getApprovedCompanyTotal.bind(this), 5000);
        })
    }

    getJobsData = () => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/jobs/dashboard/pending`)
        .then(response => {

            console.log('sssssssssssss',response)
            this.setState({
                Pendingjobs:[...response.data.response.jobs],
                PendingjobsTotal:response.data.response.total
            })

            this.intervarJobsID = setTimeout(this.getJobsData.bind(this), 5000);
        })
        

    }

    pendingCompanyDetails (cell, row) {
        return (
                <div>
                    <button type="button" className="btn btn-primary btn-rounded btn-sm"> <Link to={`/admin/compamy/pending/${row._id}`}> Details </Link></button>
                </div>
            )
    }

    pendingJobDetails (cell, row) {
        return (
                <div>
                    <button type="button" className="btn btn-primary btn-rounded btn-sm"> <Link to={`/pendingjobsdetails/${row._id}`}> Details </Link></button>
                </div>
            )
    }

    render() {

        let { PendingCompanies, PendingCompaniesTotal, ApprovedCompanyTotal, Pendingjobs,AllApprovedJobTotal, PendingjobsTotal} = this.state

        return (
    
       
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    <section className="dashboard-counts mt-3 mb-4">
                                <div className="container-fluid">
                                <div className="row adminCounterRow">
                                <div className="col-md-6 col-lg-3 col-sm-6 col-12">
                                    <div className="card">
                                        <div className="card-body userdas1">
                                            <div className="row">
                                                <div className="col-md-12 col-lg-3 col-sm-2 col-2">
                                                    <span><i className="fas fa-tags"></i></span>
                                                </div>
                                                <div className="col-md-12 col-lg-9 col-sm-10 col-10">
                                                    <div className="tnumber count-number"><span className="count"><CountUp start={0} duration={2} end={this.state.PendingjobsTotal} /></span></div>
                                                    <div className="tList text-uppercase">Total Pending Job</div>
                                                </div>
                                            </div>
                                        </div>  
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                    <span><a href=" /">All Pending job </a></span>
                                                    </div>
                                                    <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                    <span className="evntCount">{this.state.PendingjobsTotal}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className="col-md-6 col-lg-3 col-sm-6 col-12">
                            <div className="card">
                                    <div className="card-body userdas2">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-sm-2 col-2">
                                                <span><i className="fas fa-tags"></i></span>
                                            </div>
                                            <div className="col-md-12 col-lg-9 col-sm-10 col-10">
                                                <div className="tnumber count-number"><CountUp start={0} duration={2} end={PendingCompaniesTotal} /></div>
                                                <div className="tList text-uppercase">Total Pending Company</div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                <span><a>Pending Companies Total</a></span>
                                                </div>
                                                <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                <span className="evntCount">{PendingCompaniesTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 col-sm-6 col-12">
                            <div className="card">
                                    <div className="card-body userdas3">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-sm-2 col-2">
                                                <span><i className="fas fa-tags"></i></span>
                                            </div>
                                            <div className="col-md-12 col-lg-9 col-sm-10 col-10">
                                                <div className="tnumber count-number"><CountUp start={0} duration={2} end={ApprovedCompanyTotal} /></div>
                                                <div className="tList text-uppercase">Total Approved Company</div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                <span>Total Approved Company</span>
                                                </div>
                                                <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                <span className="evntCount">{ApprovedCompanyTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 col-sm-6 col-12 admin-app-end">
                            <div className="card">
                                    <div className="card-body userdas4">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-sm-2 col-2">
                                                <span><i className="fas fa-tags"></i></span>
                                            </div>
                                            <div className="col-md-12 col-lg-9 col-sm-10 col-10">
                                                <div className="tnumber count-number"><CountUp start={0} duration={2} end={AllApprovedJobTotal} /></div>
                                                <div className="tList text-uppercase">Total Approved Job</div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                <span>Total Approved Job</span>
                                                </div>
                                                <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                <span className="evntCount">{AllApprovedJobTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>
                                 
                    <section className="adminDashSection">
                        <div className="container-fluid">
                            <div className="row recrutrJobRow">
                                <div className="col-lg-12">
                                   <div className="card">
                                        <div className="card-header">
                                            <h4 className="adminh4">Pending list of company for approval</h4>
                                        </div>
                                        <BootstrapTable data={PendingCompanies}  pagination>
                                            <TableHeaderColumn isKey dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='address'filter={ { type: 'TextFilter', delay: 1000 } }>Address</TableHeaderColumn>
                                            <TableHeaderColumn dataField='region'filter={ { type: 'TextFilter', delay: 1000 } }>Region</TableHeaderColumn>
                                            <TableHeaderColumn dataField='country' filter={ { type: 'TextFilter', delay: 1000 } }>Country</TableHeaderColumn>
                                            <TableHeaderColumn dataField='business_licence_no'filter={ { type: 'TextFilter', delay: 1000 } }>Business licence no</TableHeaderColumn>
                                            
                                            <TableHeaderColumn  dataFormat={ this.pendingCompanyDetails }>Action</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                   <div className="card">
                                        <div className="card-header">
                                            <h4 className="adminh4">Pending job list for approval</h4>
                                        </div>
                                        <BootstrapTable data={Pendingjobs}  pagination>
                                            <TableHeaderColumn isKey dataField='title' filter={ { type: 'TextFilter', delay: 1000 } }>Title</TableHeaderColumn>
                                            <TableHeaderColumn dataField='company_name' filter={ { type: 'TextFilter', delay: 1000 } }>Company Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='sub_category'filter={ { type: 'TextFilter', delay: 1000 } }>Sub Category</TableHeaderColumn>
                                            <TableHeaderColumn dataField='jobType'filter={ { type: 'TextFilter', delay: 1000 } }>Job Type</TableHeaderColumn>
                                            <TableHeaderColumn  dataFormat={ this.pendingJobDetails }>Action</TableHeaderColumn>
                                        </BootstrapTable>
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
export default withRouter(AdminDashboardPage);