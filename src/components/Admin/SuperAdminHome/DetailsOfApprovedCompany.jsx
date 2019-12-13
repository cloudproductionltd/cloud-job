import React, { Component } from 'react';
import Breadcumb from '../SuperAdminHome/Breadcumb';
import Sidebar from '../SuperAdminHome/Sidebar';
import Footer from '../SuperAdminHome/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html'

class DetailsOfApprovedCompany extends Component {
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

        Axios.get(`/companies/${params.id}`)
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
        return (
        
            <div>
                <Sidebar/>
                <div className="page commonAdminPage">
                    <Breadcumb/>
                    <section className="forms commonAdminForms">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                            <div className="col col-lg-10">
                                <div className="card">
                                
                                    <div className="view overlay">
                                    <div className="card-header">
                                        <h4>Company Details</h4>
                                        {/* <span className="EdWrapper"><button onClick = {this.approveCompany } className="btn btn-primary btn-sm">Approve</button> */}
                                        {/* </span> */}
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
                                <p>{company.about}</p>
                            </td>
                        
                        </tr>
                        {
                            company.logo == ""? <tr>
                            <td >
                                    <p><b>picture:</b></p>
                                    <img className="img-responsive img-rounded" height="150px" width="200px" src={`http://localhost:5000/public/uploads/company/logo/no-logo.png`} alt=""/>
                                </td>
                            </tr> :
                            <tr>
                                <td >
                                    <p><b>picture:</b></p>
                                    <img className="img-responsive img-rounded" height="100px" width="100px" src={`http://localhost:5000/public/uploads/company/logo/${company.logo}`} alt=""/>
                                </td>
                            </tr>
                        }
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
                       
                        {
                            company.photo == ""? <tr>
                            <td >
                                    <p><b>picture:</b></p>
                                    <img className="img-responsive img-rounded" height="100px" width="100px" src={`http://localhost:5000/public/uploads/company/contact/no-photo.png`} alt=""/>
                                </td>
                            </tr> :
                            <tr>
                                <td >
                                    <p><b>picture:</b></p>
                                    <img className="img-responsive img-rounded" height="100px" width="100px" src={`http://localhost:5000/public/uploads/company/contact/${company.photo}`} alt=""/>
                                </td>
                            </tr>
                        }
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
                        {
                            company.photo2 == ""? <tr>
                            <td >
                                    <p><b>picture:</b></p>
                                    <img className="img-responsive img-rounded" height="100px" width="100px" src={`http://localhost:5000/public/uploads/company/contact/no-photo.png`} alt=""/>
                                </td>
                            </tr> :
                            <tr>
                                <td >
                                    <p><b>picture:</b></p>
                                    <img className="img-responsive img-rounded" height="100px" width="100px" src={`http://localhost:5000/public/uploads/company/contact/${company.photo2}`} alt=""/>
                                </td>
                            </tr>
                        }
                        
                    </tbody>
                </table>
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

                <Modal visible={ this.state.modal == 'success' ? true : false}>
                    <div className="card">
                        <div className="alert alert-success user-success-message">
                            <strong>Company approve successfully!</strong>   
                            <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </Modal>
                </div>
            );
        }
    }
export default withRouter(DetailsOfApprovedCompany);
