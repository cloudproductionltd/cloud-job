import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';

class JobCategory extends Component {
    state = {
        categories :[],
    }
    componentDidMount(){
        Axios.get(`http://cloudproduction.co.bd/jobs/public/api/category`)
        .then(response => {
            this.setState({ categories:response.data.categories })
        })
    }
    
    render() {
        const categories = this.state.categories.map((cat,key) =>
            <li key={key} className="list-group-item"><Link to={'jobs?category=?'+cat.name }>{ cat.name }</Link></li>
            )
        return (
            <section className="category-container">
            <div className="container">
                <div className="row no-gutters tab-option-wrap">
                    <div className="col-lg-9 col-md-12 col-sm-12 col-12 tab-inner-heading shadow-sm">
                        <ul className="nav nav-tabs nav-tabs-home" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i className="fas fa-list-ul pr-1"></i>New Arrival</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                                    <i className="fa fa-paper-plane pr-1"></i>Job Category</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><i className="fa fa-briefcase pr-1"></i>Industry</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="language-tab" data-toggle="tab" href="#language" role="tab" aria-controls="contact" aria-selected="false"><i className="fa fa-globe pr-1"></i>Language</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row tab-row-wrapper">
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            {/* { categories } */}
                                            <li className="list-group-item"><a href="# ">Executive</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">IT (PC, Web, Unix)</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">IT (Mainframe)</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">IT (Hardware/Network)</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">IT (ontrol Systems)</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>

                                        </ul>
                                    </div>
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Genral Affairs/HR/Legal</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">Legal</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">Finance/Accounting</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">Administrative</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                                <li className="list-group-item"><a href="# ">Customer Service</a>
                                                    <span className="badge badge-primary badge-pill"></span>
                                                </li>
                                            </ul>
                                    </div>
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Logistics/Retail/Consumer/Fashion</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Hospitality Business Speciallist</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Education/Training/Language Specialist</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Creative (Other)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Health/Nursing</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row tab-row-wrapper">
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Executive</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">IT (PC, Web, Unix)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">IT (Mainframe)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">IT (Hardware/Network)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">IT (ontrol Systems)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">IT (Other)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Electronics (Appliance/Semiconductor)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Manufacturing (Automobile Equipment)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Medical/Pharmaceutical/Food</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Equipment/Real Estate</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Consulting</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div claNamess="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Legal</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Finance/Accounting</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Administrative</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Customer Service</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Finance/Bank/Securities</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Insurance</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <div className="row tab-row-wrapper">
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Fashion/Apparel/Accessory</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Fast Moving Consumer Good</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Luxury Goods</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Pharmaceuticals</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Electronics Manufacturing</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Automotive Manufacturing</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Banking/Securities</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Perfumery/Cosmetic</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Telecommunication Equipment</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">EElectronics Manufacturing</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Wholesale Trade/Import-Export</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Machinery Manufacturer</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Food and Beverage Production</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Chemicals/Petro-Chemicals</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Clothing and Textile Manufacturing</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Manufacturing - Other</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Precision, Measuring Equipment</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Restaurant, Food Services </a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="language" role="tabpanel" aria-labelledby="language-tab">
                                <div className="row tab-row-wrapper">
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">English</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Japanese</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Chinese - Mandarin</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Korean</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Russian</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">French</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Spanish</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Chinese - Shanghainese</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Indonesian</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">German</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Portuguese (Brazilian)</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Thai</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col col-12 col-md-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><a href="# ">Italian</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Chinese - Cantonese</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Tagalog</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Malay</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Arabic</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                            <li className="list-group-item"><a href="# ">Portuguese</a>
                                                <span className="badge badge-primary badge-pill"></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 sliderSidebar-wrap">
                        <div className="card">
                            <div className="card-header infOfUsers-cHeader">
                                <h4>Divisional Jobs</h4>
                            </div>
                            <div className="card-body">
                                <div className="division">
                                    <div className="all-division">
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Dhaka <span></span></a>
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Barishal <span></span></a>
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Khulna <span></span></a>
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Sylhet <span></span></a>
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Chattogram <span></span></a>
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Rajshahi <span></span></a>
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Rangpur <span></span></a>
                                        <a href="/errror/page" className="btn btn-default" target="_blank">Mymensingh <span></span></a>
                                    </div>
                                </div>
                                <div className="quick-links desktop">
                                <h6>Quick Links</h6>
                                <div className="ql-list">
                                    <ul>
                                        <li><a href="/errror/page" target="_blank">Employer List</a></li>
                                        <li><a href="/errror/page" target="_blank">New Jobs (24 hrs)</a></li>
                                        <li><a href="/errror/page" target="_blank">Deadline Tomorrow</a></li>
                                        <li><a href="/errror/page" target="_blank">Contractual Jobs</a></li>
                                    </ul>
                                </div>
                            </div>

                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}
export default JobCategory;