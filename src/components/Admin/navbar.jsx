import React, { Component } from 'react';
import Styles from '../../assets/css/styles'

class Sidebar extends Component {
    render() {
        return (
            <nav className="side-navbar mCustomScrollbar _mCS_1">
                <div id="mCSB_1" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" tabIndex="0">
                    <div id="mCSB_1_container" className="mCSB_container" dir="ltr">
                        <div className="side-navbar-wrapper">
                            <div className="sidenav-header d-flex align-items-center justify-content-center">
                                <div className="sidenav-header-inner text-center"><img src="assets/images/logo06.jpg" alt="person" className="img-fluid rounded-circle mCS_img_loaded" />
                                    <h2 className="h5">Nathan Andrews</h2><span>Web Developer</span>
                                </div>
                                <div className="sidenav-header-logo">
                                    <a href="# " className="brand-small text-center"> <strong className="admin-cls">A</strong><strong className="text-primary">D</strong></a>
                                </div>
                            </div>
                            <div className="main-menu">
                                <h5 className="sidenav-heading">Main</h5>
                                <ul id="side-main-menu" className="side-menu list-unstyled">
                                    <li className={Styles.divStyle}><a href="# "><i className="fas fa-home"></i>Home eee</a></li>
                                    <li><a href="# "><i className="fab fa-wpforms"></i>Forms</a></li>
                                    <li><a href="# "><i className="fas fa-table"></i>Tables</a></li>
                                    <li><a href="# " aria-expanded="false" data-toggle="collapse"><i className="fas fa-window-restore"></i>Example dropdown</a>
                                        <ul id="exampledropdownDropdown" className="collapse list-unstyled ">
                                            <li><a href="# ">Page</a></li>
                                            <li><a href="# ">Page</a></li>
                                            <li><a href="# ">Page</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="# "><i className="fas fa-window-restore"></i>Login page</a></li>
                                    <li>
                                        <a href="# "> <i className="icon-mail"></i>Demo
                                            <div className="badge badge-warning">6 New</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="admin-menu">
                                <h5 className="sidenav-heading">Second menu</h5>
                                <ul id="side-admin-menu" className="side-menu list-unstyled">
                                    <li>
                                        <a href="# "> <i className="icon-screen"> </i>Demo</a>
                                    </li>
                                    <li>
                                        <a href="# "> <i className="icon-flask"> </i>Demo
                                            <div className="badge badge-info">Special</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="# "> <i className="icon-flask"> </i>Demo</a>
                                    </li>
                                    <li>
                                        <a href="# "> <i className="icon-picture"> </i>Demo</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="mCSB_1_scrollbar_vertical" className="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical">
                        <div className="mCSB_draggerContainer">
                            <div id="mCSB_1_dragger_vertical" className="mCSB_dragger">
                                <div className="mCSB_dragger_bar"></div>
                            </div>
                            <div className="mCSB_draggerRail"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Sidebar;