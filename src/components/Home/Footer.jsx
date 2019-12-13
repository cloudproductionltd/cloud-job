import React, { Component } from 'react';
import ScrollUpButton from "react-scroll-up-button";
import { getJwt } from './../../../src/helpers/jwt';
import { Route , withRouter} from 'react-router-dom';
const $ = window.$;

class Footer extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount () {
        const jwt =getJwt();
        // if(!jwt){
        //     this.props.history.push('./')
        // }
        console.log('jwt:',jwt)
        var btn = $('.customContbtn');

        $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
        });
    
    // btn.on('click', function(e) {
    //   e.preventDefault();
    //   $('html, body').animate({scrollTop:0}, '300');
    // });
}

    render() {
        return (
                    <div>
                        <section className="footer">
                        <div>
                            <div className="container">
                                <span className="cBtnWrap">
                                    <a className="btn customContbtn" data-toggle="modal" data-target="#myModal">Contact</a>
                                </span>
                                <ScrollUpButton />
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="modal" id="myModal">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Feel free to contact us</h4>
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <div className="col-md-7">
                                                                    <form className="contactFormPopup">
                                                                        <div className="md-form">
                                                                            <i className="fas fa-user prefix"></i>
                                                                            <input type="text" id="ContactName" name="ContactName" className="form-control" value="" />
                                                                            <label for="ContactName">First name</label>
                                                                        </div>
                                                                        <div className="md-form">
                                                                            <i className="fas fa-envelope prefix"></i>
                                                                            <input type="text" name="ContactEmail" id="ContactEmail" className="form-control" value="" />
                                                                            <label for="ContactEmail">Email</label>
                                                                        </div>
                                                                        <div className="md-form">
                                                                            <i className="fas fa-list prefix"></i>
                                                                            <select name="ContactSelect" className="browser-default custom-select profile-edit-common-select">
                                                                                <option value="" selected="">Choose One:</option>
                                                                                <option value="">General Customer Service </option>
                                                                                <option value="">Suggestions</option>
                                                                                <option value="">Product Support</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="md-form">
                                                                            <i className="fas fa-pencil-alt prefix"></i>
                                                                            <textarea type="text" name="message" id="ContactMessage" className="md-textarea form-control" rows="3"></textarea>
                                                                            <label for="ContactMessage" className="">Message</label>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <ul className="list-unstyled mb-0 contact-address1">
                                                                        <li><i className="fas fa-map-marker-alt"></i>
                                                                            <p>Mirpur DOHS, Avenue #3, Road No 12, House 854, Dhaka Bangladesh</p>
                                                                        </li>
                                                                        <li><i className="fas fa-mobile mt-4"></i>
                                                                            <p>+ 01 234 567 89</p>
                                                                        </li>

                                                                        <li><i className="fas fa-envelope mt-4"></i>
                                                                            <p>contact@cloudpro.com</p>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <button type="submit" className="btn btn-primary pull-right" id="btnContactUs">
                                                                    Send Message</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="footerSnsIcon test-center">
                                    <a href=" #" className="btn-floating btn-sm btn-sns" type="button" role="button"><i className="fab fa-facebook-f"></i></a>
                                    <a href=" #" className="btn-floating btn-sm btn-sns" type="button" role="button"><i className="fab fa-instagram"></i></a>
                                    <a href=" #" className="btn-floating btn-sm btn-sns" type="button" role="button"><i className="fab fa-twitter"></i></a>
                                    <a href=" #" className="btn-floating btn-sm btn-sns" type="button" role="button"><i className="fab fa-pinterest-p"></i></a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="footerNavbarList">
                                        <a href="/errror/page">About Us</a> 
                                        <a href="/errror/page">Terms & Condition</a> 
                                        <a href="/errror/page">Privacy & Policy</a> 
                                        <a href="/errror/page">Site Map</a> 
                                        <a href="/errror/page">FAQ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="colophon site-info">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="noo-bottom-bar-content">
                                <div className="footerBottom">
                                        <h4 className="text-center">Post Job, Search Job, Interview & Join Job</h4>
                                        <p className="text-center">Copyright @ All rights Reserved by Cloud JOB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>  
                    </footer>
                    </div>
        );
    }
}
export default withRouter(Footer);