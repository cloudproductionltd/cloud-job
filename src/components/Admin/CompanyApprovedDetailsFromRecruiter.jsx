import React, { Component } from 'react';
import Breadcumb from './Home/Breadcumb';
import Sidebar from './Home/Sidebar';
import Footer from './Home/Footer';
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import Page from 'react-page-loading';
import { Link } from 'react-router-dom'

class CompanyApprovedDetailsFromRecruiter extends Component {

    state = {
        company: '',
    }


    componentDidMount = async () => {
        const { match: { params } } = this.props;
        let id = params.id;
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        await Axios.get(`companies/${id}`
        )
            .then(response => {
                
                this.setState({
                    company: response.data.response.company
                })
            })
            .catch(error => {

            })

        console.log('Company AS:', this.state.company)
    }

    render() {
        return (
            <div>
                <Sidebar />
                <div className="page commonAdminPage">
                    <Breadcumb />
                    <section className="forms commonAdminForms dis_container">
                        <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration={1}>
                            <div className="container-fluid">
                                <div className="row justify-content-md-center">
                                    <div className="col col-lg-10">
                                        <div className="show card">
                                            <div className="card-header">
                                                <h4>Company Profile Details</h4>
                                                    {/* <Link to={`/recruiter/company/pending/${this.state.company._id}/edit`}>
                                                        <span className="EdWrapper"><button className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-pencil-alt"></i></button></span>
                                                    </Link> */}
                                            </div>
                                            <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h4 className="cm_title mb-3">Company Details</h4>
                                                    <table className="table table-responsive table-striped companyProfileView">
                                                        <tbody>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <p><b>Company Name:</b></p>
                                                                    <p>{this.state.company.name}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><b>Region:</b></p>
                                                                    <p>{this.state.company.region}</p>
                                                                </td>
                                                                <td>
                                                                    <p><b>Country:</b></p>
                                                                    <p>{this.state.company.country}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><b>City:</b></p>
                                                                    <p>{this.state.company.city}</p>
                                                                </td>
                                                                <td>
                                                                    <p><b>Prefecture:</b></p>
                                                                    <p>{this.state.company.prefecture}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <p><b>Company Address Details:</b></p>
                                                                    <p>{this.state.company.address}</p>
                                                                </td>
                                                                
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><b>Website URL:</b></p>
                                                                    <p>{this.state.company.web}</p>
                                                                </td>
                                                                <td>
                                                                    <p><b>Industry Type:</b></p>
                                                                    <p>{this.state.company.type}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><b>Business Licence No:</b></p>
                                                                    <p>{this.state.company.business_licence_no}  </p>
                                                                </td>
                                                                <td>
                                                                    <p><b>RL No:</b></p>
                                                                    <p>{this.state.company.recruiter_licence_no}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <p><b>Business Description:</b></p>
                                                                    <p>{this.state.company.about}</p>
                                                                </td>
                                                            </tr>
                                                            {
                                                                this.state.company.logo == ""? <tr>
                                                                <td >
                                                                        <p><b>picture:</b></p>
                                                                        <img className="img-responsive img-rounded" height="80px" width="120px" src={`http://localhost:5000/public/uploads/company/logo/no-logo.png`} alt=""/>
                                                                    </td>
                                                                </tr> :
                                                                <tr>
                                                                    <td >
                                                                        <p><b>picture:</b></p>
                                                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/logo/${this.state.company.logo}`} alt=""/>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-12">
                                                    <h4 className="cm_title mb-3">Contact Details (Primary)</h4>
                                                    <table className="table table-responsive table-striped companyProfileView">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <p><b>Name:</b></p>
                                                                    <p>{this.state.company.first_name}</p>
                                                                    <p>{this.state.company.last_name}</p>
                                                                </td>
                                                                <td>
                                                                    <p><b>Middle Name:</b></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><b>Contact Designation:</b></p>
                                                                    <p>{this.state.company.company_designaton}</p>
                                                                </td>
                                                                <td>
                                                                    <p><b>Contact Email:</b></p>
                                                                    <p>{this.state.company.contact_email}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <p><b>Contact No:</b></p>
                                                                    <p>{this.state.company.phone}</p>
                                                                </td>
                                                               {/* <td>
                                                                    <p><b>Company Type</b></p>
                                                                    <p>{this.state.company.type}</p>
                                                                </td> */}
                                                            </tr>
                                                            {
                                                                this.state.company.photo == ""? <tr>
                                                                <td >
                                                                        <p><b>picture:</b></p>
                                                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/contact/no-photo.png`} alt=""/>
                                                                    </td>
                                                                </tr> :
                                                                <tr>
                                                                    <td >
                                                                        <p><b>picture:</b></p>
                                                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/contact/${this.state.company.photo}`} alt=""/>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-12">
                                                    <h4 className="cm_title mb-3">Contact Details (Secondary)</h4>
                                                    <table className="table table-responsive table-striped companyProfileView">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <p><b>Name:</b></p>
                                                                    <p>{this.state.company.first_name2}</p>
                                                                    <p>{this.state.company.last_name2} </p>
                                                                </td>
                                                                <td>
                                                                    <p><b>Middle Name:</b></p>
                                                                    {/* {this.state.company.last_name2}  */}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><b>Contact Designation:</b></p>
                                                                    <p>{this.state.company.company_designaton2}</p>
                                                                </td>
                                                                <td>
                                                                    <p><b>Contact Email:</b></p>
                                                                    <p>{this.state.company.company_email2} </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <p><b>Contact No:</b></p>
                                                                    <p>{this.state.company.phone2}</p>
                                                                </td>
                                                                {/* <td>
                                                                    <p><b>Contact Designaton</b></p>
                                                                    <p>{this.state.company.company_designaton}</p>
                                                                </td> */}
                                                            </tr>
                                                            {
                                                                this.state.company.photo2 == ""? <tr>
                                                                <td >
                                                                        <p><b>picture:</b></p>
                                                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/contact/no-photo.png`} alt=""/>
                                                                    </td>
                                                                </tr> :
                                                                <tr>
                                                                    <td >
                                                                        <p><b>picture:</b></p>
                                                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/contact/${this.state.company.photo2}`} alt=""/>
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
                        </Page>
                    </section>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default withRouter(CompanyApprovedDetailsFromRecruiter);