import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Footer from './Home/Footer';
import Sidebar from './Home/Sidebar';
import Breadcumb from './Home/Breadcumb';
import Axios from 'axios';

import { withRouter } from 'react-router-dom'

const $ = window.$;




class RecruiterAllJobList extends Component {

    componentDidMount() {
        $(document).ready(function() {
            $('#recruiterOngoingJobList').DataTable(
                {     
                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                "iDisplayLength": 5
                } 
                );

                $('#outgoingJob').DataTable(
                
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

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.get(`/jobs/company`,{headers:headers})
            .then(response => {

                console.log('responseresponse',response.data.response.jobs)
                // this.setState(previousState => {
                //     return {
                //         jobs: response.data.response.jobs ,
                //     };
                // });
            })
            .catch(error => {
            })

    }

    render() {
        return (
            <div>
                <div className="page commonAdminPage"> 
                    <Breadcumb/>
                    <section className="commonAdminForms recruiterJobListContainer">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center recrutrJobRow">
                                <div className="col col-lg-10">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="mb-0">Current Job List</h4>
                                        </div>
                                        <div className="card-body">
                                            <table id="recruiterOngoingJobList" className="table table-striped table-bordered table-responsive recruiterJobTableWrap">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" onclick="checkAll(this)" /></th>
                                                    <th>Job Title</th>
                                                    <th>Vacancy</th>
                                                    <th>Job Category</th>
                                                    <th>Salary</th>
                                                    <th>Deadline</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>System Architect</td>
                                                    <td>03</td>
                                                    <td>Full Time</td>
                                                    <td>jakarea</td>
                                                    <td>2021/04/25</td>
                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                    <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button></td>
                                                </tr>
                                                </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-10">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="mb-0">Expired Job List</h4>
                                        </div>
                                        <div className="card-body">
                                            <table id="outgoingJob" className="table table-striped table-bordered table-responsive recruiterJobTableWrap">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" onclick="checkAll(this)" /></th>
                                                    <th>Job Title</th>
                                                    <th>Vacancy</th>
                                                    <th>Job Category</th>
                                                    <th>Salary</th>
                                                    <th>Deadline</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>System Architect</td>
                                                    <td>03</td>
                                                    <td>Full Time</td>
                                                    <td>$320,800</td>
                                                    <td>2021/04/25</td>
                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                    <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button></td>

                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>Accountant</td>
                                                    <td>02</td>
                                                    <td>Part Time</td>
                                                    <td>$170,750</td>
                                                    <td>2021/07/25</td>
                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                    <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>Junior Technical Author</td>
                                                    <td>04</td>
                                                    <td>Contactual</td>
                                                    <td>$86,000</td>
                                                    <td>2021/01/12</td>
                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                    <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>Junior Technical Author</td>
                                                    <td>04</td>
                                                    <td>Contactual</td>
                                                    <td>$86,000</td>
                                                    <td>2021/01/12</td>
                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                    <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button></td>
                                                </tr>
                                            </tbody>
                                                
                                        </table>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
               </section>
               
                    <Footer/>
                </div>
                <Sidebar/>
               
            </div>
        );
    }
}

export default withRouter(RecruiterAllJobList);