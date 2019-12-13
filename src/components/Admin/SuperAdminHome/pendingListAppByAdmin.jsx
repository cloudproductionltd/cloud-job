import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
const $ = window.$;


class PendingListAppByAdmin extends Component {

    constructor() {
        super();
        this.state = {
            pendingCompanies:[]
        }
    }
    componentDidMount() {
        var token = (window.sessionStorage.getItem('cool-jwt'));
        Axios.get(`/companies/admin/pending/`,
            { headers: { Authorization: `${token}` }})
        .then(response => {
            console.log('Response:', response.data.companies)
            this.setState({
                pendingCompanies : response.data.companies
            })
        })
    }

    render() {
        const pendingCompanies = this.state.pendingCompanies.map((company, i) =>
        <tr key={i}>
            <td>{i + 1}</td>
            <td className="">{company.name}</td>
            <td>{company.type}</td>
            <td>{company.address}</td>
            <td><a href={company.web} target="_blank">{company.web}</a></td>
            <td>{company.first_name} {company.last_name} </td>
            <td>{company.phone}</td>
            <td>
                <Link to={`/admin/pending/company/${company._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
            </td>
        </tr>
        );
        return (
            <div>
                <div className="page commonAdminPage">
                    <Breadcumb/>
                    <section className="commonAdminForms">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-10">
                                    <div className="card recrutrJobRow">
                                        <div className="card-header">
                                            <h4 className="mb-0">Pending list of jobseeker</h4>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Company Name</th>
                                                        <th>Job Title</th>
                                                        <th>Total Applicants</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>3</td>
                                                        <td className="">0003</td>
                                                        <td>Android Developer</td>
                                                        <td>3</td>
                                                        <td><button type="button" className="btn btn-primary btn-rounded btn-sm">Details</button>
                                                            <button type="button" className="btn btn-danger btn-rounded btn-sm">Decline</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination pg-blue justify-content-center">
                                                    <li className="page-item disabled">
                                                        <span className="page-link">Previous</span>
                                                    </li>
                                                    <li className="page-item"><a className="page-link">1</a></li>
                                                    <li className="page-item active">
                                                        <span className="page-link">
                                                        2
                                                        <span className="sr-only">(current)</span>
                                                        </span>
                                                    </li>
                                                    <li className="page-item"><a className="page-link">3</a></li>
                                                    <li className="page-item">
                                                        <a className="page-link">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="mb-0">Pending list of recruiter</h4>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Company Name</th>
                                                        <th>Comnpany Type</th>
                                                        <th>Address</th>
                                                        <th>web</th>
                                                        <th>Contact Person</th>
                                                        <th>Phone</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { pendingCompanies }
                                                </tbody>
                                            </table>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination pg-blue justify-content-center">
                                                    <li className="page-item disabled">
                                                        <span className="page-link">Previous</span>
                                                    </li>
                                                    <li className="page-item"><a className="page-link">1</a></li>
                                                    <li className="page-item active">
                                                        <span className="page-link">
                                                        2
                                                        <span className="sr-only">(current)</span>
                                                        </span>
                                                    </li>
                                                    <li className="page-item"><a className="page-link">3</a></li>
                                                    <li className="page-item">
                                                        <a className="page-link">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
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

export default withRouter(PendingListAppByAdmin);