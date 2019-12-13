import React, { Component } from 'react';
import Breadcumb from '../Admin/Home/Breadcumb';
import Sidebar from '../Admin/Home/Sidebar';
import Footer from '../Admin/Home/Footer';
import CountUp from 'react-countup';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Axios from 'axios';

const $ = window.$;



class RecruiterDashboard extends Component {

    intervalID;
    CompanyID;
    SisterConcernID;
    PendingJobTotalID;
    PendingCompanyTotalID;
    disapprovedPendingJobTotalID;

    state = {
        jobs:[],
        report: true,
        pendingCompanies:[],
        PendingJobTotal:'',
        sisterConcernCompanyTotal:'',
        PendingCompanyTotal:'',
        DisapprovePendingJobTotal:''
    }


   

   

    componentDidMount() {

        this.getData();
        this.getCompany();
        this.getSisterConcernCompanyNumber();
        this.getPendingCompanyTotal();
        this.getDisapprovedPendingJobTotal();
        this.getPendingJobTotal();
        let data =JSON.parse(window.sessionStorage.getItem('user')) 
        
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
        clearTimeout(this.CompanyID);
        clearTimeout(this.SisterConcernID);
        clearTimeout(this.disapprovedPendingJobTotalID);
        clearTimeout(this.PendingJobTotalID);

    }

    getData = () => {
        if(!(window.sessionStorage.getItem('user_role') === 'recruiter')){
            this.props.history.push('/');
        }
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/jobs/pendingofusers/dashboard/${user_id}`)
    
            .then(response => {
                
                this.setState({ jobs: [...response.data.response.jobs]})

                this.intervalID = setTimeout(this.getData.bind(this), 5000);
            });


           
    }


    getPendingJobTotal = () => {
        
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/companies/pending/total/jobs`,{ headers: headers})
    
            .then(response => {
                
                this.setState({ 
                    PendingJobTotal: response.data.response.total
                })

                this.PendingJobTotalID = setTimeout(this.getPendingJobTotal.bind(this), 5000);
            });


        
    }


    getDisapprovedPendingJobTotal = () => {
        
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/companies/pending/total/jobs/disapprove`,{ headers: headers})
    
            .then(response => {
                
                this.setState({ 
                    DisapprovePendingJobTotal: response.data.response.total
                })

                this.disapprovedPendingJobTotalID = setTimeout(this.getDisapprovedPendingJobTotal.bind(this), 5000);
            });

    }

    getPendingCompanyTotal = () => {
        
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/companies/pending/total`,{ headers: headers})
    
            .then(response => {
                
                this.setState({ 
                    PendingCompanyTotal: response.data.total
                })

                this.PendingCompanyTotalID = setTimeout(this.getPendingCompanyTotal.bind(this), 5000);
            });


           
    }

   

    getSisterConcernCompanyNumber = () => {

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`companies/sister/total/count`, {
            headers: headers
        })
        .then(response => {
            if(response.data.type == 'ok') {
                this.setState({
                    sisterConcernCompanyTotal:response.data.total
                })
               
            }
            this.SisterConcernID = setTimeout(this.getSisterConcernCompanyNumber.bind(this), 5000);
        })
        .catch(error => {

        })
    }

    getCompany = () => {

        if(!(window.sessionStorage.getItem('user_role') === 'recruiter')){
            this.props.history.push('/');
        }
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`companies/recruiter/pending/without/disapprove`, {
            headers: headers
        })
        .then(response => {
            if(response.data.type == 'ok') {
                this.setState({
                    pendingCompanies:response.data.companies,
                    total: response.data.total
                })
            }
            this.CompanyID = setTimeout(this.getCompany.bind(this), 5000);
        })
        .catch(error => {

        })
    }

    actionFormatter(cell, row) {
        return (
            <div>
                        <Link to={`/recruiter/company/pending/${row._id}`}>
                            <button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                        </Link>

                        <Link to={`/recruiter/company/pending/${row._id}/edit`}>
                            <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button>
                        </Link>
            </div>
        )
    }


    pendigJobsDetailsActions(cell, row) {
        return (
            <div>

                        <Link to={`/recruiter/pending/jobslist/dashboard/${row._id}`}>
                            <button type="button" className="btn btn-primary btn-rounded btn-sm">details</button>
                        </Link>
            </div>
        )
    }

    render() {
        let  { jobs, pendingCompanies  ,DisapprovePendingJobTotal, PendingCompanyTotal, PendingJobTotal, sisterConcernCompanyTotal} =this.state


        const joblist = jobs.map((job) =>


            <tr style={{ visibility: job.report ?'collapse':''}}>
                <td>{job.title ? job.title : '' }</td>
                <td>{ job.company_name ? job.company_name : '' } </td>
                {/* <td>{ job.sub_category ? job.sub_category : '' } </td> */}
                {/* <td>{job.joblevel ?  job.joblevel : ''} </td> */}
                {/* <td>{ job.vacancy ? job.vacancy : '' } </td> */}
                <td>{ job.jobType ? job.jobType : '' } </td>
                <td>{ job.category ? job.category : '' } </td>
                {/* <td>{ job.experience ? job.experience : '' } </td> */}
                {/* <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td> */}
              
                <td><Link to={`/recruiter/pending/jobslist/dashboard/${job._id}`}><button type="button" className="btn btn-primary btn-rounded btn-sm">details</button></Link>
                {/* <button type="button" className="btn btn-danger btn-rounded btn-sm">Decline</button> */}
                </td>
            </tr>

            
        );
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
                                                    <div className="tnumber count-number"><span className="count"><CountUp start={0} duration={2} end={PendingJobTotal} /></span></div>
                                                    <div className="tList text-uppercase">Total Pending Job Posted</div>
                                                </div>
                                            </div>
                                        </div>  
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                    <span><a href=" /">All Pending Job </a></span>
                                                    </div>
                                                    <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                    <span className="evntCount">{PendingJobTotal}</span>
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
                                                <div className="tnumber count-number"><CountUp start={0} duration={2} end={sisterConcernCompanyTotal} /></div>
                                                <div className="tList text-uppercase">Branch or sister concern</div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                <span><a>All branch count</a></span>
                                                </div>
                                                <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                <span className="evntCount">{sisterConcernCompanyTotal}</span>
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
                                                <div className="tnumber count-number"><CountUp start={0} duration={2} end={PendingCompanyTotal} /></div>
                                                <div className="tList text-uppercase">Total Pending Company Request</div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                <span>All Pending Company </span>
                                                </div>
                                                <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                <span className="evntCount">{PendingCompanyTotal}</span>
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
                                                <div className="tnumber count-number"><CountUp start={0} duration={2} end={DisapprovePendingJobTotal} /></div>
                                                <div className="tList text-uppercase">Total Disapproval</div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-8 col-6 col-lg-10">
                                                <span>All Rejected Job total</span>
                                                </div>
                                                <div className="col-md-6 col-sm-4 col-6 col-lg-2">
                                                <span className="evntCount">{DisapprovePendingJobTotal}</span>
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
                                            <h4 className="adminh4">Pending list of posted job</h4>
                                        </div>
                                        <BootstrapTable data={ jobs }  pagination>
                                            <TableHeaderColumn isKey dataField='title' filter={ { type: 'TextFilter', delay: 1000 } }>Title</TableHeaderColumn>
                                            <TableHeaderColumn dataField='company_name' filter={ { type: 'TextFilter', delay: 1000 } } >Company Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='jobType' filter={ { type: 'TextFilter', delay: 1000 } }>Job Type</TableHeaderColumn>
                                            <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
                                            <TableHeaderColumn  dataFormat={ this.pendigJobsDetailsActions }>Action</TableHeaderColumn>
                                        </BootstrapTable>
                                </div>
                                    </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="adminh4">Pending Company list for approval</h4>
                                        </div>
                                        <BootstrapTable data={pendingCompanies}  pagination>
                                            <TableHeaderColumn isKey dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>Company Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='type' filter={ { type: 'TextFilter', delay: 1000 } } >Industry Type</TableHeaderColumn>
                                            <TableHeaderColumn dataField='business_licence_no' filter={ { type: 'TextFilter', delay: 1000 } }>Business License No</TableHeaderColumn>
                                            <TableHeaderColumn dataField='web'>Website URL</TableHeaderColumn>
                                            <TableHeaderColumn  dataFormat={ this.actionFormatter }>Action</TableHeaderColumn>
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
export default withRouter(RecruiterDashboard);