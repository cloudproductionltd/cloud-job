import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import UserSidebar from './userSidebar';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import "bootstrap/dist/css/bootstrap.css";
import { withRouter,Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Axios from 'axios'
const $ = window.$;

   
class UserDashboard extends Component{

    constructor(){
        super();
        this.state = {
            jobs: '',
            alljobs:[],
            allApprovedjobs:[],
            disapproveJobs:[],
            pendingJobsTotal:'',
            disapproveJobsTotal:'',
            applicableJobsTotal:'',
            totalappliedJobs:'',
            username:'',
            products: [],
            columns: [
                {
                    dataField: 'company_name',
                    text: 'company name',
                    filter: textFilter(),
                },
                {
                    dataField: 'job_title',
                    text: 'job title',
                }
            ]
        }
      
        
    }

   
    componentDidMount () {

      

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
       
        Axios.get(`/applications`,{headers: headers})
            .then(response => {
                    console.log('Appm',response.data.response.jobs)
                    this.setState({
                        alljobs: response.data.response.jobs,
                        totalappliedJobs :  response.data.response.total
                    })
                    
            })
            .catch(error => {
                console.log('error: ', error.response)
            })

        Axios.get(`/applications/approved`,{headers: headers})
            .then(response => {
                    console.log('Appm',response.data.response.jobs)
                    this.setState({
                        allApprovedjobs: response.data.response.jobs,
                        totalappliedJobs :  response.data.response.total
                    })
                    
            })
            .catch(error => {
                console.log('error: ', error.response)
            })

        Axios.get(`/applications/disapproved`,{headers: headers})
            .then(response => {
                    console.log('Appm',response.data.response.jobs)
                    this.setState({
                        allDisapprovedJobs: response.data.response.jobs,
                        totalappliedJobs :  response.data.response.total
                    })
                    
            })
            .catch(error => {
                console.log('error: ', error.response)
            })

            Axios.get(`/applications/pending`,{headers: headers})
            .then(response => {
                    console.log('pendingJobsTotal',response.data.response.total)
                    this.setState({
                        pendingJobsTotal: response.data.response.total
                    })
                    
            })
            .catch(error => {
                console.log('error: ', error.response)
            })

            Axios.get(`/applications/disapprove`,{headers: headers})
            .then(response => {
                    console.log('disapproveJobsTotal',response.data.response.total)
                    this.setState({
                        disapproveJobs: response.data.response.jobs
                    })
                    
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
            

            Axios.get(`/applications/applicable`,{headers: headers})
            .then(response => {
                    console.log('applicableJobsTotal',response.data.response.total)
                    this.setState({
                        applicableJobsTotal: response.data.response.total
                    })
                    
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
            

            
        $(document).ready(function() {
            $('#example').DataTable(
                
                {     
        
              "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                "iDisplayLength": 5
              } 
                );

                $('#example1').DataTable(
                
                    {     
           
                    "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                    "iDisplayLength": 5
                 } 
                   );
        } );
        
        
        function checkAll(bx) {
          var cbs = document.getElementsByTagName('input');
          for(var i=0; i < cbs.length; i++) {
            if(cbs[i].type == 'checkbox') {
              cbs[i].checked = bx.checked;
            }
          }
        }

       
            Axios.post(`/jobs/total/count`)
                .then(response => {
                    this.setState({ jobs: response.data.total})
            })
    
            Axios.post(`/users/total/count`)
            .then(response => {
                this.setState({ users: response.data.total})
            })
    
            Axios.get(`/companies/total/count`)
            .then(response => {
                this.setState({ companies: response.data.total})
            }) 
    }
    

    allApprovedJobDetails(cell, row) {
       
        return (
        //   <ActionFormatter onClick={()=>doAction(row)} />
            <div>
                        <button type="button" className="btn btn-primary btn-rounded btn-sm"> <Link to={`/jobs/${row.job_id}/${row.job_title}`}> Details </Link></button>
                   
            </div>
        )
    }
  
    render(){
        
        let ts = new Date();
        let { alljobs, allApprovedjobs ,disapproveJobsTotal, disapproveJobs} = this.state


    


        return (
            <div>
            <Navbar/>
            <div className="container page-wrapper chiller-theme">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <UserSidebar/>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <div className="row cardBd">
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body userdas1">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-sm-3 col-2">
                                                <span><i className="fas fa-user-graduate"></i></span>
                                            </div>
                                            <div className="col-md-12 col-lg-9 col-sm-9 col-10">
                                                <div className="tnumber"><span className="count"><CountUp start={0} duration={15} end={this.state.totalappliedJobs} />+</span></div>
                                                {/* <div className="tList">Applied Job</div> */}
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <span className="tList">Applied Job</span>
                                                </div>
                                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-3">
                            <div className="card">
                                    <div className="card-body userdas2">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-sm-3 col-2">
                                                <span><i className="fas fa-sync"></i></span>
                                            </div>
                                            <div className="col-md-12 col-lg-9 col-sm-9 col-10">
                                                <div className="tnumber"><span className="count"><CountUp start={0} duration={30} end={this.state.pendingJobsTotal} />+</span></div>
                                                
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <span className="tList">Pending Request</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                            <div className="card">
                                    <div className="card-body userdas3">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-sm-3 col-2">
                                                <span><i className="fas fa-user-plus"></i></span>
                                            </div>
                                            <div className="col-md-12 col-lg-9 col-sm-9 col-10">
                                                <div className="tnumber"><span className="count"><CountUp start={0} duration={18} end={this.state.applicableJobsTotal} />+</span></div>
                                                {/* <div className="tList">Applicable Job</div> */}
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <span className="tList">Applicable Job</span>
                                            </div>
                                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                            <div className="card">
                                    <div className="card-body userdas4">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-sm-3 col-2">
                                                <span><i className="fas fa-trash-alt"></i></span>
                                            </div>
                                            <div className="col-md-12 col-lg-9 col-sm-9 col-10">
                                                <div className="tnumber"><span className="count"><CountUp start={0} duration={1} end={this.state.disapproveJobsTotal} />+</span></div>
                                                {/* <div className="tList">Rejection</div> */}
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <span className="tList">Disapproval</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card cardLap">
                                    <div className="card-header">
                                        Recent Approval List
                                    </div>
                                    <div className="card-body">
                                    

                                        <BootstrapTable data={allApprovedjobs}  pagination>
                                            <TableHeaderColumn isKey dataField='company_name' filter={ { type: 'TextFilter', delay: 1000 } }>Company Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='job_title'  filter={ { type: 'TextFilter', delay: 1000 } }>Job title</TableHeaderColumn>
                                    
                                            <TableHeaderColumn  dataFormat={ this.allApprovedJobDetails }>Action</TableHeaderColumn>
                                        </BootstrapTable>
                            
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card cardLap">
                                    <div className="card-header">
                                        Recent Disapproval List
                                    </div>
                                    <BootstrapTable data={disapproveJobs}  pagination>
                                            <TableHeaderColumn isKey dataField='company_name' filter={ { type: 'TextFilter', delay: 1000 } }>Company Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='job_title'  filter={ { type: 'TextFilter', delay: 1000 } }>Job title</TableHeaderColumn>
                                    
                                            <TableHeaderColumn  dataFormat={ this.allApprovedJobDetails }>Action</TableHeaderColumn>
                                        </BootstrapTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default withRouter(UserDashboard);
