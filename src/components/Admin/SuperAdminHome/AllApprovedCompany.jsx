import React, { Component } from 'react';
import Breadcumb from '../SuperAdminHome/Breadcumb';
import Sidebar from '../SuperAdminHome/Sidebar';
import Footer from '../SuperAdminHome/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';

class AllApprovedCompany extends Component {


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
        Axios.get(`/companies`,{headers:headers})
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
                            {company.country}
                        </td>
                        <td>
                        {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                        <Link to={`/admin/approved/company/${company._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
                        </td>
                    </tr>
        )


        return (
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
export default withRouter(AllApprovedCompany);