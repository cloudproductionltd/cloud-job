import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
const $ = window.$;


class PendingUserListFromAdmin extends Component {

    state = {
        users:[]
    }
    

    componentDidMount(){
        $(document).ready(function() {
            $('#adminCompanyPendingList').DataTable(
                
            {    
                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                "iDisplayLength": 5
            } 
                );

                $('#adminPendingJobList').DataTable(
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
        Axios.get(`/users`,{headers:headers})
            .then(response => {
                    console.log('pending user',response.data.response.users)
                
                    this.setState({
                    users: response.data.response.users
                })
            })
            .catch(error => {
                console.log('error : ', error.response)
            })
        
    }

    render() {
        
        let { users } = this.state
        const pendingUser = users.map((user,index)=>
                    <tr key={index}>
                        <td><input type="checkbox" name="" /></td>
                        <td>hhh</td>
                        <td>jaka12@gmail.com</td>
                        <td>Bangladeshi</td>
                        <td>Male</td>
                        <td>0171123897</td>
                        <td>Mirpur 12, Dhaka</td>`
                    </tr>
        );
        return (
    
            <div>
                <Sidebar/>
                <div className="page">
                    <Breadcumb/>
                    <section className="commonAdminForms">
                        <div className="container-fluid">
                            <div className="row recrutrJobRow">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="adminh4">Pending All Jobseeker User List </h4>
                                        </div>
                                        <div className="card-body">
                                        <table id="adminCompanyPendingList" class="table table-striped table-bordered table-responsive recruiterJobTableWrap">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" onclick="checkAll(this)" /></th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Nationality</th>
                                                    <th>Gender</th>
                                                    <th>Contact No</th>
                                                    <th>Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {pendingUser}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                   <div className="card">
                                        <div className="card-header">
                                            <h4 className="adminh4"> Pending All Recruiter User List</h4>
                                        </div>
                                        <div className="card-body">
                                        <table id="adminPendingJobList" class="table table-striped table-bordered table-responsive recruiterJobTableWrap">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" onclick="checkAll(this)" /></th>
                                                    <th>Company Name</th>
                                                    <th>Industry Type</th>
                                                    <th>RL No</th>
                                                    <th>Website URL</th>
                                                    <th>Designation</th>
                                                    <th>Business Licence No</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {pendingUser}
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>System co. Ltd 001</td>
                                                    <td>Software</td>
                                                    <td>0301</td>
                                                    <td>http://Syestem.com</td>
                                                    <td>A software Business</td>
                                                    <td>0306543</td>

                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>System co. Ltd 002</td>
                                                    <td>Software</td>
                                                    <td>0301</td>
                                                    <td>http://Syestem.com</td>
                                                    <td>A software Business</td>
                                                    <td>0306543</td>

                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>System co. Ltd</td>
                                                    <td>Software</td>
                                                    <td>0301</td>
                                                    <td>http://Syestem.com</td>
                                                    <td>A software Business</td>
                                                    <td>0306543</td>

                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td>System co. Ltd</td>
                                                    <td>Software</td>
                                                    <td>0301</td>
                                                    <td>http://Syestem.com</td>
                                                    <td>A software Business</td>
                                                    <td>0306543</td>

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
            </div>
        );
           
        }
    }
export default withRouter(PendingUserListFromAdmin);