import React, { Component } from 'react';
import {  Link , NavLink} from 'react-router-dom';

const $ = window.$;

class UserSidebar extends Component {

    constructor(){
		super();
        this.state = {
            username:'',
            user_id: '',
            activeClass: 'active'
        }
	}

    componentDidMount () {
        this.setState({
            user_id: window.sessionStorage.getItem('user_id')
        })
        $(".sidebar-dropdown .cmDropdown").click(function() {
            $(".sidebar-submenu").slideUp(200);
            if (
              $(this)
                .parent()
                .hasClass("active")
            ) {
              $(".sidebar-dropdown").removeClass("active");
              $(this)
                .parent()
                .removeClass("active");
            } else {
              $(".sidebar-dropdown").removeClass("active");
              
              $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
            }
        });
    }

    render() {
        let   { user_id } =this.state
        return (
                <div>
                    <nav id="sidebar" className="sidebar-wrapper">
                        <div className="sidebar-content">
                            <div className="sidebar-header">
                                <div className="user-pic">
                                    <img className="img-responsive img-rounded" height="150px" width="80px" src={`http://localhost:5000/public/uploads/profile/${user_id}.jpg`} alt=""/>
                                    {/* <img className="img-responsive img-rounded" src='' alt=""/> */}
                                </div>
                                <div className="user-info">
                                    <span className="user-name">
                                    <strong>{this.state.username}</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="sidebar-menu" >

                                {/* <ul className="oldSidebar">
                                    <div className="card-header">Old version</div>
                                    <li>
                                        <NavLink to="/applications">
                                        <i className="fa fa-book"></i>
                                        <span>Applications</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/profile">
                                        <i className="fa fa-user"></i>
                                        <span>User profile </span>
                                        </NavLink>
                                    </li>
                                </ul> */}

                                <ul className="fixSidebar">
                                    {/* <div className="card-header">New version</div> */}
                                    <li>
                                        <NavLink to="/userDashboard">
                                            <i className="fas fa-tachometer-alt"></i>
                                            <span>Dashboard</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/profile-edit">
                                            <i className="fas fa-file"></i>
                                            <span>Resume</span>
                                        </NavLink>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <NavLink to="#" className="cmDropdown">
                                            <i className="fas fa-calendar-check"></i>
                                            <span>Events</span>
                                        </NavLink>
                                        <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <NavLink to="/errror/page">Upcoming Events</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/errror/page">All event list</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/errror/page">Pending Requst</NavLink>
                                            </li>
                                        </ul>
                                        </div>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <NavLink to='#' className="cmDropdown">
                                        <i className="fas fa-user-tie"></i>
                                        <span>Job Related </span>
                                        </NavLink>
                                        <div className="sidebar-submenu" style={{ 'display': 'block'}}>
                                        <ul>
                                            <li>
                                                <Link to="/pendingJobList">Pending Job List</Link>
                                            </li>
                                            <li>
                                                <Link to="/applicableJobList">Applicable Job List</Link>
                                            </li>
                                            <li>
                                                <Link to="/disapprovedJobList">Not Applicable List</Link>
                                            </li>
                                        </ul>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="fixSidebar">
                                    {/* <div className="card-header">Upcoming Changes</div> */}
                                    <li>
                                        <NavLink to="/profile-edit">
                                        <i className="fas fa-user"></i>
                                        <span>Profile</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="sidebar-footer">
                            <a href="# " title="notification">
                            <i className="fa fa-bell"></i>
                            {/* <span className="badge badge-pill badge-warning notification">3</span> */}
                            </a>
                            <a href="# " title="message">
                            <i className="fa fa-envelope"></i>
                            {/* <span className="badge badge-pill badge-success notification">7</span> */}
                            </a>
                            <a href="# ">
                            <i className="fa fa-cog"></i>
                            {/* <span className="badge-sonar"></span> */}
                            </a>
                        </div>
                    </nav>
                    
			    </div>
        );
    }
}
export default UserSidebar;