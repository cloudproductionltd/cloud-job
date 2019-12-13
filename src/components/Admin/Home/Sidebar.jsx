import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap4-modal';

class Sidebar extends Component {

    state = {
        company_id: 0,
        user_role: '',

    }

    componentDidMount() {

        if (window.sessionStorage.getItem('company_id')) {
            this.setState({
                company_id: 1
            })
        }


        this.setState({
            user_role: window.sessionStorage.getItem('user_role')
        })

    }
    cursorActive(event) {
        let CompanyPendingStatus = window.sessionStorage.getItem('CompanyPendingStatus')

        const hasCompany = JSON.parse(window.sessionStorage.getItem('hasCompany'))

        if (CompanyPendingStatus == "0" && hasCompany === null) {

            event.preventDefault()

        } else if (CompanyPendingStatus == "1") {

            event.preventDefault()
        }
    }

    render() {
            const hasCompany = JSON.parse(window.sessionStorage.getItem('hasCompany'))
            const profile = JSON.parse(window.sessionStorage.getItem('user'))
            let CompanyPendingStatus = window.sessionStorage.getItem('CompanyPendingStatus')
            let { company_id, user_role } = this.state

            let companyCreateStatus;
            if (company_id && CompanyPendingStatus == 0) {
                // companyCreateStatus = <li> <NavLink to='/recruiter/company/update' activeClassName="active"><i className="fas fa-user-check"></i>Profile(old)</NavLink></li>
            } else if (CompanyPendingStatus == 1) {
                // companyCreateStatus = <li> <NavLink to='/recruiters-pending-profile' activeClassName="active"><i className="fas fa-user-check"></i> Profile(old)</NavLink></li>
            } else if (hasCompany === null && CompanyPendingStatus == 0) {
                // companyCreateStatus = <li> <NavLink to='/recruiter/company/add' activeClassName="active"><i className="fas fa-user-check"></i>Profile(old)</NavLink></li>
            }

        return (
            <nav className="side-navbar">
                <div className="side-navbar-wrapper">
                    <div className="sidenav-header d-flex align-items-center justify-content-center">
                        <div className="sidenav-header-inner text-center">
                        {/* <img src="./assets/images/1.jpg" alt="person" className="img-fluid rounded-circle"/> */}
                            <h2 className="h5">{profile.personal.firstName +' '+ profile.personal.lastName }</h2>
                            <h6>{profile.local.email}</h6>
                            <button className="btn btn-sm btn-primary">Recruiter</button>
                        </div>
                        <div className="sidenav-header-logo"><a href="index.html" className="brand-small text-center"> <strong className="admin-cls">A</strong><strong className="text-primary">D</strong></a></div>
                    </div>
                    <div className="main-menu">
                        <h5 className="sidenav-heading">Main</h5>
                        <ul id="side-main-menu" className="side-menu list-unstyled">
                            <li>
                                <NavLink exact to='/' activeClassName="active" ><i className="fas fa-home"></i>Home</NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/recruiter/dashboard' activeClassName="" ><i className="fas fa-laptop"></i>Dashboard</NavLink>
                            </li>
                            <li>
                                <a href="#exampledropdownDropdown1" aria-expanded="false" data-toggle="collapse">
                                <i className="fab fa-black-tie"></i>Job Related
                                </a>
                                <ul id="exampledropdownDropdown1" className="collapse list-unstyled">
                                    <li>
                                        <NavLink to='/recruiter/jobs/add' activeClassName="active" ><i className="fas fa-plus-circle"></i>Add New Job </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to='/admin/recruiterAllJobList' activeClassName="active" ><i className="fas fa-clipboard-list"></i>All Job List (New)</NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink to='/recruiterjobs' activeClassName="active" ><i className="fas fa-clipboard-list"></i>All Job List</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/recruiter/recruiterPendingJobList' activeClassName="active" ><i className="fas fa-bell-slash"></i>Pending List For Approval(New)</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/recruiter/recruiterDisapprovalList' activeClassName="active" ><i className="fas fa-times-circle"></i>Disapproval Job List(New)</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#exampledropdownDropdown3" aria-expanded="false" data-toggle="collapse">
                                <i className="fas fa-building"></i>Company Related
                                </a>
                                <ul id="exampledropdownDropdown3" className="collapse list-unstyled ">
                                    <li>
                                        <NavLink to='/recruiter/company' activeClassName="active" ><i className="fas fa-user-check"></i>Company Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/recruiter/company/add' activeClassName="active"><i className="fas fa-plus-circle"></i>Add New Company</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/recruiter/company' activeClassName="active"><i className="fas fa-clipboard-list"></i>All Company</NavLink>
                                    </li>
                                </ul>
                            </li>
                            {/* <li>
                                <NavLink to='/recruiter/jobs/add' activeClassName="active" ><i className="fas fa-user-plus"></i>Add jobs </NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to='/recruiter-pending-jobs' activeClassName="active" ><i className="fas fa-pause-circle"></i>Pending job list</NavLink>
                            </li>
                            <li>
                                <NavLink to='/recruiter-decline-jobs' activeClassName="active" ><i className="fas fa-pause-circle"></i>Disapprove job list</NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to='/recruiterjobs' activeClassName="active" ><i className="fas fa-list-alt"></i> job list</NavLink>
                            </li> */}
                            { companyCreateStatus }
                        </ul>
                    </div>
                </div>
                <Modal visible={ this.state.show =='success' ? true : false}>
                    <div className="card">
                        <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onclick={() => this.closeModal()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="alert alert-success user-success-message">
                            <strong> Please create your company profile! </strong> 
                        </div>
                    </div>
                </Modal>
            </nav>
        );
    }
}

export default Sidebar;