import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class CompanyProfile extends Component {


    state={
        company:''
    }
    componentDidMount(){
        const { match: { params } } = this.props; 
        console.log('company_id',params.id)
        Axios.get(`/companies/${params.id}`)
            .then(response => {
                this.setState({ company : response.data.response.company })
                console.log('response',response.data.response.company)
        })
    }

    render() {
        return (
            <div>
                <Navbar/>

                <div className="top-c-profile">
                    <img src="/assets/images/company-banner.jpg" className="company-common-banner" alt="company-banner"/>
                    <div className="container">
                        <div className="row">
                            <div className="p-logo">Logo</div>
                            <div className="p-social-icon">
                                            <a type="button" href=" "className="btn-floating btn-fb btn-sm waves-effect waves-light">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                            <a type="button" className="btn-floating btn-tw btn-sm waves-effect waves-light">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a type="button" className="btn-floating btn-li btn-sm waves-effect waves-light">
                                                    <i className="fab fa-google"></i>
                                            </a>
                                        </div>
                            <div className="banner-text">
                                <h2>{this.state.company.name}</h2>
                                <h5>{this.state.company.type}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                

                <section className="company-profile">
                    <div className="container">
                        <div className="row profile-info-to p">
                    
                            <div className="col-md-9">
                                
                                <div className="about-company">
                                    <h4>Company type </h4>
                                    <p>{this.state.company.type}</p>
                                </div>
                            
                            </div>
                            <div className="col-md-3">
                            </div>
                        </div>
                        <div className="row contact-wrapper">
                            <div className="col-md-6">
                                <div className="contact-top-content">
                                    <h4 className="contact-info"> Company Info</h4>
                                    <p>{this.state.company.about}</p>
                                </div>
                                <div className="c-profile-c-info">
                                    <div className="left-ad">
                                        <div className="address">
                                            <h5 className="bold colr"><i className="fas fa-home"></i> Bangladesh Office</h5>
                                            <p>
                                                Foundation Six<br/>
                                                11 Harrisford St. Suite 84<br/>
                                                Sharshon Road, Dhaka<br/>
                                                L8K 6L7<br/>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="right-ad">
                                        <div className="phoneno">
                                            <h5 className="bold colr"><i className="fas fa-mobile-alt"></i> Phone</h5>
                                            <p>800.123.456 [Toll-free U.S. only]</p>
                                        </div>
                                        <div className="email">
                                            <h5 className="bold colr"><i className="fas fa-envelope"></i> Email</h5>
                                            <p><a href="mailto:info@companyname.com">info@companyname.com</a></p>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="bold colr"> <i className="fas fa-globe"></i> <a href="#">{this.state.company.web}</a></h6>
                                <div>
                                    <p>
                                        <div> company address : {this.state.company.address}</div>
                                        <div> city: {this.state.company.city} </div>
                                        <div> state : {this.state.company.state} </div> 
                                        <div> country : {this.state.company.country} </div> 
                                    </p>
                                </div> 
                            </div>
                            <div className="col-md-6">
                                <h3 align="center">Google Map</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(CompanyProfile);
