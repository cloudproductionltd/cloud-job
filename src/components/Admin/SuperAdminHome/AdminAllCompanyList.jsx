import React, { Component } from 'react';
import Axios from 'axios';
import Footer from './../Home/Footer';
import Sidebar from './Sidebar';
import Breadcumb from './../Home/Breadcumb';
import { withRouter, Link } from 'react-router-dom'

const $ = window.$;

class AdminAllCompanyList extends Component {

    state = {
        total:'',
        pending:0,
        pendingCompanies:[],
        companies:[]
    }

    componentDidMount  = async()=> {

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        await Axios.get(`companies/admin/pending`, {
                headers: headers
            })
            .then(response => {

                console.log('respose',response)
                if(response.data.type == 'ok'){
                    this.setState({
                        pendingCompanies:response.data.companies,
                        pending: response.data.total
                    })
                }
                console.log('State:', this.state)
            })
            .catch(error => {})

        await Axios.get(`companies/`, {
                headers: headers
            })
            .then(response => {
                console.log(response)
                if(response.data.type == 'ok'){
                    this.setState({
                        companies:response.data.companies,
                        approve: response.data.total
                    })
                }
                console.log('State:', this.state)
            })
            .catch(error => {})

        $(document).ready(function() {
            $('#recruiterOngoingJobList').DataTable(
                {
                    "aLengthMenu": [
                        [5, 10, 25, -1],
                        [5, 10, 25, "All"]
                    ],
                    "iDisplayLength": 5
                }
            );

            $('#outgoingJob').DataTable(
                {
                    "aLengthMenu": [
                        [5, 10, 25, -1],
                        [5, 10, 25, "All"]
                    ],
                    "iDisplayLength": 5
                }
            );
        });


        function checkAll(bx) {
            var cbs = document.getElementsByTagName('input');
            for (var i = 0; i < cbs.length; i++) {
                if (cbs[i].type == 'checkbox') {
                    cbs[i].checked = bx.checked;
                }
            }
        }
    }
    render() {
        let { approve, pending,pendingCompanies, companies } = this.state
        const pendings = pendingCompanies.map((pending) =>
                <tr>
                <td>{pending.name}</td>
                <td>{pending.type}</td>
                <td>{pending.business_licence_no}</td>
                <td>{pending.web}</td>
                <td>{pending.first_name} {pending.last_name} </td>
                <td>{pending.company_designaton} </td>
                <td>
                    <Link to={`/recruiter/company/pending/${pending._id}`}>
                        <button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                    </Link>
                    
                    <Link to={`/recruiter/company/pending/${pending._id}/edit`}>
                        <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button>
                    </Link>
                </td>
            </tr>
            );

            const approveCompanies = companies.map((company) =>
                <tr>
                <td>{company.name}</td>
                <td>{company.type}</td>
                <td>{company.business_licence_no}</td>
                <td>{company.web}</td>
                <td>{company.first_name} {company.last_name} </td>
                <td>{company.company_designaton} </td>
                <td>
                    <Link to={`/recruiter/company/company/${company._id}`}>
                        <button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                    </Link>
                    
                    <Link to={`/recruiter/company/company/${company._id}/edit`}>
                        <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button>
                    </Link>
                </td>
            </tr>
            );
        return (
            <div>
                <div className="page commonAdminPage">
                    <Breadcumb/>
                    <section className="commonAdminForms recruiterJobListContainer">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center recrutrJobRow">
                                <div className="col col-lg-10">
                                    <div className="tab-card">
                                        <div className="tab-card-header mb-3">
                                            <ul className="nav nav-tabs card-header-tabs tab-cmList" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <button className="btn btn-success btn-sm" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Pending ({ pending })</button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="btn nextStep btn-sm" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Approve ({approve})</button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="btn btn-danger btn-sm" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Rejected</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-content pt-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="mb-0">Pending List</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <table id="recruiterOngoingJobList" className="table table-striped table-bordered table-responsive recruiterJobTableWrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>Company Name</th>
                                                                    <th>Industry Type</th>
                                                                    <th>Business License No</th>
                                                                    <th>Website URL</th>
                                                                    <th>Contact Person</th>
                                                                    <th>Company Designation</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                { pendings }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="mb-0">Approved List</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <table id="recruiterOngoingJobList" className="table table-striped table-bordered table-responsive recruiterJobTableWrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>Company Name</th>
                                                                    <th>Industry Type</th>
                                                                    <th>Business License No</th>
                                                                    <th>Website URL</th>
                                                                    <th>Company Designation</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {approveCompanies}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="three" role="tabpanel" aria-labelledby="three-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="mb-0">Rejected List</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <table id="recruiterOngoingJobList" className="table table-striped table-bordered table-responsive recruiterJobTableWrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>Company Name</th>
                                                                    <th>Industry Type</th>
                                                                    <th>Business License No</th>
                                                                    <th>Website URL</th>
                                                                    <th>Company Designation</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>System Architect</td>
                                                                    <td>03</td>
                                                                    <td>Full Time</td>
                                                                    <td>$320,800</td>
                                                                    <td>2021/04/25</td>
                                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                                        <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Accountant</td>
                                                                    <td>02</td>
                                                                    <td>Part Time</td>
                                                                    <td>$170,750</td>
                                                                    <td>2021/07/25</td>
                                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                                        <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Junior Technical Author</td>
                                                                    <td>04</td>
                                                                    <td>Contactual</td>
                                                                    <td>$86,000</td>
                                                                    <td>2021/01/12</td>
                                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                                        <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Junior Technical Author</td>
                                                                    <td>04</td>
                                                                    <td>Contactual</td>
                                                                    <td>$86,000</td>
                                                                    <td>2021/01/12</td>
                                                                    <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                                                        <button type="button" className="btn btn-primary btn-rounded btn-sm">Edit</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
                <Sidebar/>
            </div>

        )
    }
}

export default withRouter(AdminAllCompanyList);