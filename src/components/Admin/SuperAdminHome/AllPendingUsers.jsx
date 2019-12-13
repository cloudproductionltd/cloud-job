import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import {  Link } from 'react-router-dom';
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
// import DetailsOfPendingCompany from '../../Admin/SuperAdminHome/DetailsOfPendingCompany';
const $ = window.$;

class AllPendingUsers extends Component {

    state = {
        users:[]
    }

    componentDidMount(){

        Axios.get(`/users/`)
            .then(response => {
                
                // console.log('users: ', response.data.response.users)
                this.setState({users: response.data.response.users})
            })
            .catch(error => {
                console.log('error: ', error.response)
            })


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
        
    }

    render() {

        // const columns = [{
        //         Header: 'Name',
        //         accessor: 'personal.firstName' // String-based value accessors!
        //     },
        //     {
        //         Header: 'Email',
        //         accessor: 'local.email' // String-based value accessors!
        //     },
        //     {
        //         Header: 'FatherName',
        //         accessor: 'personal.fatherName' // String-based value accessors!
        //     },{
        //         Header: 'FatherName',
        //         accessor: 'personal.fatherName'
        //     }
        //      ]

             
            let { users } = this.state

            const usersList = users.map((user,index)=>
            
                        <tr key={index} >
                            
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
                            <Link to={`/pendingjobsdetails/${user._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
                            </td>
                        </tr>
            )
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
                                                    <button className="btn btn-success btn-sm" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Pending </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="btn nextStep btn-sm" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Approve </button>
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
                                                    <Test/>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="mb-0">Approved List</h4>
                                                    </div>
                                                    <div className="card-body">
                                                    <PendingCompany/>
                                                    </div>
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
export default withRouter(AllPendingUsers);


class  Test extends Component {

    state = {
        users:[]
    }


    componentDidMount(){

        Axios.get(`/users/`)
            .then(response => {
                
                // console.log('users: ', response.data.response.users)
                this.setState({users: response.data.response.users})
            })
            .catch(error => {
                console.log('error: ', error.response)
            })


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
        
    }


    render() {

        let { users } = this.state

        const usersList = users.map((user,index)=>
                    <tr key={index} >
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
                        <Link to={`/pendingjobsdetails/${user._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
                        </td>
                    </tr>
        )

        return(
            <div>
                <section className="commonAdminForms">
                    <div className="container-fluid">
                            <div className="row">
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
                                        </div>
                            </div>
                            </div>
                    </div>
                </section>
        </div>
        );
    }
}

class  PendingCompany extends Component {

    state={
        companies:[]
    }


    componentDidMount(){
        const {
            match: {
                params
            }
        } = this.props;

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/companies/admin/pending/`,{headers:headers})
            .then(response => {
                console.log('res',response.data.companies)
                this.setState({
                    companies:response.data.companies
                })
            })
            .catch(error => {
                console.log('error : ', error.response)
            })
    }
    render() {

        let { companies } = this.state

        const company_list = companies.map((company,index)=>
        
                    <tr key={index}>
                        
                        <td>
                            <h2 className="loop-item-title"> { company.name } </h2>
                        </td>
                        <td>
                            { company.address}
                        </td>
                        
                        <td>
                            {company.city}
                        </td>
                        <td>
                            {company.state}
                        </td>
                        <td>
                            {company.country}
                        </td>
                        <td>
                        {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                        <Link to={`/admin/compamy/pending/${company._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
                        </td>
                    </tr>
        )


        return(
<div>
  <section className="commonAdminForms">
                        <div className="container-fluid">
                                {/* <header> 
                                    <h1 className="h3 display"></h1>
                                </header> */}
                                <div className="row">
                                    <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>All Pending Company list </h4>
                                        </div>
                                        <div className="card-body">
                                        <table className="table table-bordered online-applicant-table">
                                                <thead className="">
                                                    <tr>
                                                    
                                                        <th>Company Name</th>
                                                        <th>Address</th>
                                                        <th>Company city</th>
                                                        <th>Company state</th>
                                                        <th>Country</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {company_list}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </section>
</div>
        );
    }
}


class DetailsOfPendingCompany  extends Component {

    state = {
        company: ''
    }
    
    componentDidMount() {
        const {
            match: {
                params
            }
        } = this.props;
        // console.log('company',params.id)
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.get(`/companies/admin/pending/${params.id}`, {
                headers: headers
            })
            .then(response => {

                console.log('rescompany', response.data.response.company)
                this.setState({
                    company: response.data.response.company
                })
            }).catch(error => {})
    }


    approveCompany = (e) => {
        e.preventDefault()
        let {
            company
        } = this.state

        let headers = {}
        headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.post(`/companies/admin/pending/approve/${company._id}`,{},{headers: headers})
            .then(response => {
            this.setState({
                modal: 'success'
            })
            // this.props.history.push('/');

        }).catch(error => {
            
        })
    }

    closeModal() {
        this.setState({
            modal: ''
        })
        this.props.history.push('/admin/pending');
    }
    render() {
        let { company } = this.state
        console.log('company:', company)
        let ts = new Date();
        return(
            <div>

{/* <section className="forms commonAdminForms">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                            <div className="col col-lg-10">
                                <div className="card">
                                
                                    <div className="view overlay">
                                    <div className="card-header">
                                        <h4>Company Details</h4>
                                        <span className="EdWrapper"><button onClick = {this.approveCompany } className="btn btn-primary btn-sm">Approve</button>
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                      
                <table class="table table-bordered companyProfileView">
                    <tbody>
                        <tr>
                            <td>
                                <p><b>Company Name:</b></p>
                                <p>{company.name}</p>
                            </td>
                            <td>
                                <p><b>Email:</b></p>
                                <p>{company.contact_email}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>Company Type</b></p>
                                <p>{company.type}</p>
                            </td>
                            <td>
                                <p><b>Contact Number</b></p>
                                <p>{company.phone}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>Web Address</b></p>
                                <p>{company.web}</p>
                            </td>
                            <td>
                                <p><b>Address</b></p>
                                <p>{company.address}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>City</b></p>
                                <p>{company.city}</p>
                            </td>
                            <td>
                                <p><b>State</b></p>
                                <p>{company.state}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>Region</b></p>
                                <p>{company.region}</p>
                            </td>
                            <td>
                                <p><b>Country</b></p>
                                <p>{company.country}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>Business Licence No</b></p>
                                <p>{company.business_licence_no}</p>
                            </td>
                            <td>
                                <p><b>Recruiter Licence No</b></p>
                                <p>{company.recruiter_licence_no}</p>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="viewAbout">
                                <p><b>About</b></p>
                            </td>
                            <td>
                                <p>{company.about}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>Contact Person</b></p>
                                <p>{company.first_name} { company.last_name}</p>
                            </td>
                            <td>
                                <p><b>Phone</b></p>
                                <p>{company.phone}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>Designation</b></p>
                                <p>{company.company_designaton}</p>
                            </td>
                            <td>
                                <p><b>email</b></p>
                                <p>{company.contact_email}</p>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p><b>Contact Person 2</b></p>
                                <p>{company.first_name2} { company.last_name2}</p>
                            </td>
                            <td>
                                <p><b>Phone</b></p>
                                <p>{company.phone2}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><b>Designation</b></p>
                                <p>{company.company_designaton2}</p>
                            </td>
                            <td>
                                <p><b>email</b></p>
                                <p>{company.contact_email2}</p>
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
                    </section> */}
            </div>
        );
    }

}

