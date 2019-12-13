import React, { Component } from 'react';
import Axios from 'axios';
import Breadcumb from './Home/Breadcumb';
import Sidebar from './Home/Sidebar';
import Footer from './Home/Footer';
import Page from 'react-page-loading';
import { withRouter } from 'react-router-dom';

class ViewRecruiterPendingProfileInfo extends Component {

state = {
    companies: []
}


componentDidMount = async (history) => {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('cool-jwt')
    }
    await Axios.get(`/companies/recruiter/pending`, {
            headers: headers
        })
        .then(response => {
            this.setState({
                companies: response.data.companies,
            })
            if (response.data.response.companies === null) {
                this.props.history.push('/recruiter/company/update');
            }
        })
        .catch(error => {

        })
}

    render() {
        const companies = this.state.companies.map(company => 
            <div className="card-body dis_container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="cm_title mb-3">Company Details</h4>
                        <table className="table table-responsive table-striped companyProfileView">
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
                                        {/* <p>{this.state.company.prefecture}</p> */}
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
                                        <p>{company.web}</p>
                                    </td>
                                    <td>
                                        <p><b>Industry Type:</b></p>
                                        <p></p>
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
                                    <td>
                                        <p><b>Business Description:</b></p>
                                    </td>
                                    <td>
                                    <p>{company.about}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        <p><b>Image:</b></p>
                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/logo/${company.logo}`} alt=""/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <h4 className="cm_title mb-3">Contact Details (Primary)</h4>
                        <table className="table table-responsive table-striped companyProfileView">
                            <tbody>
                            <tr>
                                    <td>
                                        <p><b>First Name:</b></p>
                                        <p>{company.first_name}</p>
                                        <p>{ company.last_name}</p>
                                    </td>
                                    <td>
                                        <p><b>Middle Name:</b></p>
                                        <p></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p><b>Contact Designation:</b></p>
                                        <p>{company.company_designaton}</p>
                                    </td>
                                    <td>
                                        <p><b>Contact Email:</b></p>
                                        <p>{company.contact_email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <p><b>Contact No:</b></p>
                                        <p>{company.phone}</p>
                                    </td>
                                    {/* <td>
                                        <p><b>Company Type</b></p>
                                        <p>{this.state.company.type}</p>
                                    </td> */}
                                </tr>
                                {/* <tr>
                                    <td >
                                        <p><b>picture:</b></p>
                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/contact/${company.photo}`} alt=""/>
                                    </td>
                                </tr> */}

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
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <h4 className="cm_title mb-3">Contact Details (Secondary)</h4>
                        <table className="table table-responsive table-striped companyProfileView">
                            <tbody>
                                <tr>
                                    <td>
                                        <p><b>First Name:</b></p>
                                        <p>{company.first_name2}</p>
                                        <p>{company.last_name2}</p>
                                    </td>
                                    
                                    <td>
                                        <p><b>Middle Name:</b></p>
                                        {/* {this.state.company.last_name2}  */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p><b>Contact Designation:</b></p>
                                        <p>{company.company_designaton2}</p>
                                    </td>
                                    <td>
                                        <p><b>Contact Email:</b></p>
                                        <p>{company.contact_email2}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <p><b>Contact No:</b></p>
                                        <p>{company.phone2}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        <p><b>picture:</b></p>
                                        <img className="img-responsive img-rounded" height="80px" width="80px" src={`http://localhost:5000/public/uploads/company/contact/${company.photo2}`} alt=""/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <table class="table table-bordered companyProfileView">
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
                </table> */}
            </div>
            )
            return (
                <div>
                    <Sidebar/>
                    <div className="page">
                        <Breadcumb/>
                        <section className="forms commonAdminForms commonAdminPage recruiter_pending_company dis_container">
                            <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                                <div className="container-fluid">
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-10">
                                            {/* 
                                            <header>
                                                <h1 className="h2 display title-of-company">Company Profile</h1>
                                            </header>
                                            */}
                                            <div class="alert alert-warning" role="alert">
                                                Your company profile information is now waiting for admin approval 
                                            </div>
                                            <div className="card">
                                                <div className="card-header d-flex align-items-center">
                                                    <h4>Pending Company Profile</h4>
                                                    <br/>
                                                </div>
                                                { companies }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Page>
                        </section>
                        <Footer/>
                    </div>
                </div>
            )
    }
}
export default withRouter(ViewRecruiterPendingProfileInfo)
