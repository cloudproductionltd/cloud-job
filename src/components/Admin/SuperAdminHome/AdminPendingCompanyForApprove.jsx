import React, { Component } from 'react';
import Breadcumb from '../SuperAdminHome/Breadcumb';
import Sidebar from '../SuperAdminHome/Sidebar';
import Footer from '../SuperAdminHome/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';

class AdminPendingCompanyForApprove extends Component {


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
        
                    <tr key={index} style={{ visibility: company.report ?'collapse':''}}>
                        
                        <td>
                            <h2 className="loop-item-title"> { company.name } </h2>
                        </td>
                        {/* <td>
                            { company.address}
                        </td>
                        
                        <td>
                            {company.city}
                        </td>
                        <td>
                            {company.region}
                        </td>
                        <td>
                            {company.country}
                        </td> */}
                        <td>
                            {company.type}
                        </td>
                        <td>
                            {company.business_licence_no}
                        </td>
                        <td>
                            {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                            <Link to={`/admin/compamy/pending/${company._id}`} className="btn btn-primary btn-sm btn-rounded det_anchor">Details</Link>
                        </td>
                    </tr>
        )


        return (
           
               
                    <section className="">
                        <div className="">
                                {/* <header> 
                                    <h1 className="h3 display"></h1>
                                </header> */}
                                <div className="row">
                                    <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Pending Company List</h4>
                                        </div>
                                        <div className="card-body">
                                        <table className="table table-bordered online-applicant-table cmtable width_tb">
                                                <thead className="thead-light">
                                                    <tr>
                                                    
                                                        <th>Company Name</th>
                                                        {/* <th>Address</th>
                                                        <th>Company city</th>
                                                        <th>Company region</th>
                                                        <th>Country</th> */}
                                                        <th>Company Type</th>
                                                        <th>Business Licence No</th>
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
                    
               
           
            );
        }
    }
export default withRouter(AdminPendingCompanyForApprove);