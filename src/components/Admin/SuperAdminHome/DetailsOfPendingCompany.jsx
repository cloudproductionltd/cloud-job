import React, { Component } from 'react';
import Breadcumb from '../SuperAdminHome/Breadcumb';
import Sidebar from '../SuperAdminHome/Sidebar';
import Footer from '../SuperAdminHome/Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html'

class DetailsOfPendingCompany extends Component {
    state = {
        company: '',
        report:''
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
        }).catch(error => {
            
        })
    }


    openDisapproveModal(modal) {
        this.setState({
            show : modal,
        });
    }
    
    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    disapprove= (e) =>{
        let { report , company } = this.state
        console.log('report',report)
        e.preventDefault();
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/companies/admin/disapprove/company/${company._id}`,{ report : report },{headers:headers})
        .then(response => {
            console.log('yap')
            this.props.history.push('/pending');
            window.location.reload();
        })
        .catch(error => {
            console.log('yap',error)
        })

    }



    closeModal() {
        this.setState({
            modal: ''
        })
        this.props.history.push('/pending');
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
                    <section className="forms commonAdminForms dis_container">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-10">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Company Details</h4>
                                            <span className="EdWrapper"><button onClick={(e) => this.openDisapproveModal('disapprove')} className="btn btn-danger btn-sm btn-rounded">Reject</button>
                                            </span>
                                            <span className="EdWrapper"><button onClick = {this.approveCompany } className="btn nextStep btn-sm btn-rounded">Approve</button>
                                            </span>
                                        </div>
                                        <div className="card-body">
                                        <h4 className="cm_title mb-3">Company Details</h4>                    
                                            <table class="table table-responsive table-striped companyProfileView">
                                            <tbody>
                                                <tr>
                                                    <td colspan="2">
                                                        <p><b>Company Name:</b></p>
                                                        <p>{company.name}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p><b>Region:</b></p>
                                                        <p>{company.region}</p>
                                                    </td>
                                                    <td>
                                                        <p><b>Country:</b></p>
                                                        <p>{company.country}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p><b>City:</b></p>
                                                        <p>{company.city}</p>
                                                    </td>
                                                    <td>
                                                        <p><b>Prefecture:</b></p>
                                                        <p></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <p><b>Company Address Details:</b></p>
                                                        <p>{company.address}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p><b>Website URL:</b></p>
                                                        <p className="email_text">{company.web}</p>
                                                    </td>
                                                    <td>
                                                        <p><b>Industry Type:</b></p>
                                                        <p>{company.type}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p><b>Business Licence No:</b></p>
                                                        <p>{company.business_licence_no}</p>
                                                    </td>
                                                    <td>
                                                        <p><b>RL No:</b></p>
                                                        <p>{company.recruiter_licence_no}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <p><b>Business Description:</b></p>
                                                        <p>{company.about}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                        <td colspan="2">
                                                            <p><b>Image:</b></p>
                                                            <img className="img-responsive img-rounded" height="150px" width="150px" src={`http://localhost:5000/public/uploads/company/logo/${company.logo}`} alt=""/>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <h4 className="cm_title mb-3">Contact Details (Primary)</h4>
                                            <table class="table table-responsive table-striped companyProfileView">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p><b>Name:</b></p>
                                                            <p>{company.first_name}</p>
                                                            <p>{company.last_name}</p>
                                                        </td>
                                                        <td>
                                                            <p><b>Contact Designation:</b></p>
                                                            <p>{company.company_designaton}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><b>Contact Email:</b></p>
                                                            <p>{company.contact_email}</p>
                                                        </td>
                                                        <td>
                                                            <p><b>Contact No:</b></p>
                                                            <p>{company.phone}</p>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td colspan="2">
                                                            <p><b>Image:</b></p>
                                                            <img className="img-responsive img-rounded" height="150px" width="150px" src={`http://localhost:5000/public/uploads/company/contact/${company.photo}`} alt=""/>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <h4 className="cm_title mb-3">Contact Details (Secondary)</h4>
                                            <table class="table table-responsive table-striped companyProfileView">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p><b>Name:</b></p>
                                                            <p>{company.first_name2}</p>
                                                            <p>{company.last_name2}</p>
                                                        </td>
                                                        <td>
                                                            <p><b>Contact Designation:</b></p>
                                                            <p>{company.company_designaton2}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><b>Contact Email:</b></p>
                                                            <p>{company.contact_email2}</p>
                                                        </td>
                                                        <td>
                                                            <p><b>Contact No:</b></p>
                                                            <p>{company.phone2}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td >
                                                            <p><b>Image:</b></p>
                                                            <img className="img-responsive img-rounded" height="150px" width="150px" src={`http://localhost:5000/public/uploads/company/contact/${company.photo2}`} alt=""/>
                                                        </td>
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

                <Modal visible={ this.state.show == 'disapprove' ? true : false}>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={ this.disapprove }> 
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Sumit your report</label>
                                    <textarea rows="4" cols="50" name="report" form="usrform" onChange={this.handleInputChange}>
                                    </textarea>
                                </div> 
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="submit" className="btn btn-info"/></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>

                </div>
            );
        }
    }
export default withRouter(DetailsOfPendingCompany);
