import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Axios from 'axios';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { withRouter } from 'react-router-dom'
import {  Link } from 'react-router-dom';
import CoolTabs from 'react-cool-tabs';
import Error from '../../../components/Error';
const $ = window.$;

class AllUserListSeeRecruAdmin extends Component {

    state = {
        users:[],
        usersPersonal:[],
        Personal:[]
    }
    componentDidMount(){
        this.getData();
        
    }

    getData = () => {
        clearTimeout(this.intervalID);
    }

    componentDidMount(){

        Axios.get(`/users/all/job/seeker/approved`)
            .then(response => {
                
                // console.log('users: ', response.data.response.users)
                this.setState({users: response.data.response.users})
                this.setState({usersPersonal: response.data.response.users})

                this.intervalID = setTimeout(this.getData.bind(this), 5000);
            })
            .catch(error => {
                console.log('error: ', error.response)
            })


      
        
    }


 

    render() {

            let { users ,usersPersonal, Personal} = this.state
            console.log('usersPersonal',users)
            const usersList = users.map((user,index)=>
            
                        <tr key={index}  style={{ visibility: (user.adminVerificationforUser == 1  && user.role =="seeker")  ?'':'collapse' }}>
                            
                            <td>
                                <h2 className="loop-item-title"> { user.personal.firstName } </h2>
                            </td>
                            <td>
                                {user.personal.lastName}
                            </td>
                            <td>
                                { user.local.email}
                            </td>
                            <td>
                                { user.verified == 0 ? "No" : "Yes"}
                            </td>
                            <td>
                                { user.adminVerificationforUser == 0 ? "No" : "Yes"}
                            </td>
                            <td>
                            {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                            <Link to={`/userinfo/${user._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
                            </td>
                        </tr>
            )
        return (
            <div>
                    <section className="commonAdminForms">
                        <div className="container-fluid">
                    
                            <div className="row recrutrJobRow">
                                <div className="col-lg-12">
                                    <div className="card">
                                            <div className="card-header">
                                                <h4>User List </h4>
                                            </div>
                                            <div className="card-body">
                                            <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>First Name</th>
                                                            <th>Middle Name</th>
                                                            <th>Email </th>
                                                            <th>Email verified</th>
                                                            <th>Admin verification</th>
                                                            <th>Details</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        { usersList }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* <BootstrapTable data={users.personal}  pagination>
                                                <TableHeaderColumn isKey dataField='firstName' filter={ { type: 'TextFilter', delay: 1000 } }>role</TableHeaderColumn>
                                                
                                            </BootstrapTable>  */}
                                        </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </div>
        );
        }
    }
export default withRouter(AllUserListSeeRecruAdmin);