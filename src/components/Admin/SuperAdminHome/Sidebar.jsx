import React, { Component } from 'react';
import {  Link,NavLink } from 'react-router-dom';


class Sidebar extends Component {

    componentDidMount() {
        if(window.sessionStorage.getItem('company_id')){
            this.setState({
                company_id : 1
            })
        }
    }

    render() {
        const profile = JSON.parse(window.sessionStorage.getItem('user'))
        return (
            <nav className="side-navbar">
                <div className="side-navbar-wrapper">
                    <div className="sidenav-header d-flex align-items-center justify-content-center">
                        <div className="sidenav-header-inner text-center">
                            {/* <img src="../assets/images/1.jpg" alt="person" className="img-fluid rounded-circle"/> */}
                            <h2 className="h5">{profile.personal.firstName +' '+ profile.personal.lastName }</h2>
                            <h6>{profile.local.email}</h6>
                        </div>
                        <div className="sidenav-header-logo"><a href="index.html" className="brand-small text-center"> <strong className="admin-cls">A</strong><strong className="text-primary">D</strong></a></div>
                    </div>
                    <div className="main-menu">
                        <h5 className="sidenav-heading">Main</h5>
                        <ul id="side-main-menu" className="side-menu list-unstyled">
                            <li><NavLink exact to='/'><i className="fas fa-home"></i>Home</NavLink></li>
                            
                            {/* <li><NavLink exact to='/admindashboard'><i className="fas fa-chart-pie"></i>Dashboard</NavLink></li> */}
                            
                            <li className="active"><NavLink exact to='/adminDashboard'><i className="fas fa-laptop"></i>Dashboard</NavLink></li>
                            
                            <li><a href="#adminUserRelated" aria-expanded="false" data-toggle="collapse">
                                <i className="fas fa-user"></i>User Related
                                </a>
                            <ul id="adminUserRelated" className="collapse list-unstyled">
                                <li><NavLink to='/addNewUserByAdmin'><i className="fas fa-plus-circle"></i>Add New User</NavLink></li>
                                <li><NavLink to='/pending'><i className="fas fa-clipboard-list"></i> Pending User for Approval</NavLink></li>
                                
                                <li><NavLink exact to='/admin/all/users'><i className="fas fa-bell-slash"></i>All User List</NavLink></li>
                                <li><NavLink exact to='/admin/disapprove/users'><i className="fas fa-bell-slash"></i> Disapproved User List</NavLink></li>
                                {/* <li><NavLink to='/pending/user/list'><i className="fas fa-clipboard-list"></i>  Pending User </NavLink></li> */}
                            </ul>
                        </li>
                        
                        <li><a href="#adminUserRelated1" aria-expanded="false" data-toggle="collapse">
                            <i className="fas fa-calendar-alt"></i>Event Related</a>
                            <ul id="adminUserRelated1" className="collapse list-unstyled">
                                <li><NavLink to='/nopage'><i className="fas fa-list"></i>Upcoming Event List</NavLink></li>
                                <li><NavLink to='/nopage'><i className="fas fa-plus-circle"></i>Add New Event</NavLink></li>
                                <li><NavLink to='/nopage'><i className="fas fa-clipboard-list"></i>All Event List</NavLink></li>
                            </ul>
                        </li>
                        
                        <li><a href="#adminUserRelated2" aria-expanded="false" data-toggle="collapse">
                            <i className="fab fa-black-tie"></i>Job Related</a>
                            <ul id="adminUserRelated2" className="collapse list-unstyled">
                                <li><NavLink to='/applicableByAdmin'><i className="fas fa-clipboard-check"></i>Approved Job List</NavLink></li>
                                <li><NavLink to='/admin-pending-jobs'><i className="fas fa-bell-slash"></i>Pending List Of Approval</NavLink></li>
                                <li><NavLink to='/disapprovalListByAdmin'><i className="fas fa-times-circle"></i>Disapproval List</NavLink></li>
                                {/* <li><NavLink exact to='/admin-pending-jobs'><i className="fas fa-bell-slash"></i>Pending jobs(old xxxx)</NavLink></li> */}
                            </ul>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Sidebar;