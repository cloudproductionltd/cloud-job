import React, { Component } from 'react';
import Axios from 'axios'
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import { withRouter } from 'react-router-dom';
import {  Link } from 'react-router-dom';

class Companyjobs extends Component {

    state = {
        jobs : [],
        total :'',
        company :''
    }
    
    componentDidMount(){
        const { match: { params } } = this.props; 
        // console.log('company',params.id)
        Axios.get(`/jobs/company/${params.id}`)
            .then(response => {
                this.setState({ jobs: response.data.response.jobs ,
                                total : response.data.response.total,
                                company : response.data.response.company
                                })
            }).catch(error =>{
            })
    }

    render() {
        var ts = new Date();
        let { jobs } = this.state
        const joblist = jobs.map((job,index)=>
                    <tr key={index}>
                    <td scope="row">
                        <img className="table-img" alt=""  src="assets/images/about-img.png"/>
                    </td>
                    <td>
                        <h2 className="loop-item-title"> 
                            <a href="# ">{ job.title ? job.title : 'no title yet'}</a>
                        </h2>
                        <span className="job-company"><a href="# ">{job.category}</a></span>
                    </td>
                    <td>
                        <span className="job-type contract">
                            <i className="fa fa-bookmark"></i> {job.nature ? job.nature : 'null' }
                        </span>
                    </td>
                    <td>
                        <span>
                            <time className="entry-date" dateTime="2015-08-18T01:40:23+00:00">
                                <i className="fa fa-calendar"></i> { new Date(job.deadline).toLocaleDateString() }
                            </time>
                        </span>
                    </td>
                    {/* <td><a href="# " data-toggle="tooltip" data-placement="bottom" title="View Profile" class="btn btn-primary btn-xs adminEdIcon"><i class="fas fa-eye"></i></a></td> */}
                    <Link to={`/jobs/${job._id}/${job.slug}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" class="btn btn-primary btn-xs adminEdIcon"><i class="fas fa-eye"></i></Link>

                </tr>
               
        );
        
        return (
            <div>
            <Navbar/>
                <section className="pagination-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="vacency-header-left">
                                        <div className="btn btn-success btn-rounded view-more">{this.state.total}</div>
                                        <div className="top-vacency-left">
                                            <h6 className="match-job-title">jobs matching your search criteria</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    {/* <nav aria-label="Page navigation example" className="pagination-inner">
                                        <ul className="pagination pagination-top pg-dark float-right">
                                            <li className="page-item disabled">
                                            <a href="# " className="page-link" tabIndex="-1">Previous</a>
                                            </li>
                                            <li className="page-item"><a href="# " className="page-link">1</a></li>
                                            <li className="page-item active">
                                            <a href="# " className="page-link">2 <span className="sr-only">(current)</span></a>
                                            </li>
                                            <li href="# " className="page-item"><a href="# " className="page-link">3</a></li>
                                            <li className="page-item">
                                            <a  href="# " className="page-link">Next</a>
                                            </li>
                                        </ul>
                                    </nav> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section className="filter-job">
                        <div className="container filter-job-inner">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form input-group mb-3 filter-md-form">
                                        <input type="text" className="form-control filter-input" placeholder="Job Title, Skills, or Military Occupational Code" aria-label="Job Title, Skills, or Military Occupational Code" aria-describedby="MaterialButton-addon2"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-success m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id="MaterialButton-addon2">Active filters</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                    <section className="top-job">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card infOfUsers">
                                        <div className="card-header infOfUsers-cHeader">
                                            <h5>Search Job</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="radio-button-filter common-border after-border">
                                                <h6 className="common-font-weight-bold">Date Posted</h6>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" id="defaultGroupExample1" name="groupOfDefaultRadios"/>
                                                    <label className="custom-control-label" htmlFor="defaultGroupExample1">24 hours</label>
                                                </div>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" id="defaultGroupExample2" name="groupOfDefaultRadios"/>
                                                    <label className="custom-control-label" htmlFor="defaultGroupExample2">3 days</label>
                                                </div>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" id="defaultGroupExample3" name="groupOfDefaultRadios"/>
                                                    <label className="custom-control-label" htmlFor="defaultGroupExample3">7 days</label>
                                                </div>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" id="defaultGroupExample4" name="groupOfDefaultRadios"/>
                                                    <label className="custom-control-label" htmlFor="defaultGroupExample4">30 days</label>
                                                </div>
                                            </div>
                                            <div className="custom-controls-stacked d-block my-3 common-border after-border">
                                                <h6 className="common-font-weight-bold">Employment Type</h6>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked1"/>
                                                    <label className="custom-control-label" htmlFor="defaultUnchecked1">All</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked2"/>
                                                    <label className="custom-control-label" htmlFor="defaultUnchecked2">Part Time</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked3"/>
                                                    <label className="custom-control-label" htmlFor="defaultUnchecked3">Contractor</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked4"/>
                                                    <label className="custom-control-label" htmlFor="defaultUnchecked4">Contract to Hire</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked5"/>
                                                    <label className="custom-control-label" htmlFor="defaultUnchecked5">Intern</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="defaultUnchecked6"/>
                                                    <label className="custom-control-label" htmlFor="defaultUnchecked6">Seasonal / Temp</label>
                                                </div>
                                            </div>
                                            <div className="radio-button-filter common-border after-border cmFont">
                                                <h6 className="common-font-weight-bold">Sallery Range</h6>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Minimum"  value={this.state.minimum} name="minimum" onChange={this.setAdvanceSearchValue}/>
                                                    <input type="text" class="form-control" placeholder="Maximum"  value={this.state.maximum} name="maximum" onChange={this.setAdvanceSearchValue}/>
                                                </div>
                                            </div>
                                            <div className="select-option-search after-border common-border select-wrapper">
                                                <div className="wrap">
                                                    <div className="select">
                                                        <select className="select-text filter-selectbox-search" required="">
                                                            <option ></option>
                                                            <option value="1">84 Lumber (5)</option>
                                                            <option value="2">A-Line Staffing Solutions (7)</option>
                                                            <option value="3">AAA (The Auto Club Group) (5)</option>
                                                            <option value="1">AAA Club Alliance (7)</option>
                                                            <option value="2">ABF Freight (8)</option>
                                                            <option value="3">AbilityLab (12)</option>
                                                            <option value="1">ACURA COLUMBUS (41)</option>
                                                            <option value="2">Addus HomeCare, Inc (2)</option>
                                                            <option value="3">Advantage Resourcing (26)</option>
                                                        </select>
                                                        <span className="select-highlight"></span>
                                                        <span className="select-bar"></span>
                                                        <label className="select-label">Company</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="select-option-search after-border select-wrapper">
                                                <div className="wrap">
                                                    <div className="select">
                                                        <select className="select-text filter-selectbox-search" required="">
                                                            <option ></option>
                                                            <option value="1">Accounting (23)</option>
                                                            <option value="2">Admin - Clerical (47)</option>
                                                            <option value="3">Automotive (977)</option>
                                                            <option value="1">Banking (8)</option>
                                                            <option value="2">Biotech (13)</option>
                                                            <option value="3">AbilityLab (12)</option>
                                                            <option value="1">ACURA COLUMBUS (41)</option>
                                                            <option value="2">Addus HomeCare, Inc (2)</option>
                                                            <option value="3">Advantage Resourcing (26)</option>
                                                        </select>
                                                        <span className="select-highlight"></span>
                                                        <span className="select-bar"></span>
                                                        <label className="select-label">Job Category</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="select-option-search after-border select-wrapper">
                                                <div className="wrap">
                                                    <div className="select">
                                                        <select className="select-text filter-selectbox-search" required="">
                                                            <option ></option>
                                                            <option value="1">Accounting (23)</option>
                                                            <option value="2">Admin - Clerical (47)</option>
                                                            <option value="3">Automotive (977)</option>
                                                            <option value="1">Banking (8)</option>
                                                            <option value="2">Biotech (13)</option>
                                                            <option value="3">AbilityLab (12)</option>
                                                            <option value="1">ACURA COLUMBUS (41)</option>
                                                            <option value="2">Addus HomeCare, Inc (2)</option>
                                                            <option value="3">Advantage Resourcing (26)</option>
                                                        </select>
                                                        <span className="select-highlight"></span>
                                                        <span className="select-bar"></span>
                                                        <label className="select-label">Job SubCategory</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="card infOfUsers">
                                        <div className="card-header infOfUsers-cHeader">
                                            <h5>All Jobs</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="headline">
                                                <h2 className="title job">We found <span className="text-primary-color">{this.state.total}</span> available job(s) of {this.state.company.name}</h2>
                                            </div>
                                            <table className="table table-striped job-details-table">
                                            <tbody>
                                                {joblist}
                                            </tbody>
                                            </table>
                                            <nav aria-label="Page navigation example" className="pagination-inner d-flex align-items-center justify-content-center bottom-pagination">
                                                <ul className="pagination pg-primary">
                                                    <li className="page-item disabled">
                                                    <a href="# " className="page-link" tabIndex="-1">Previous</a>
                                                    </li>
                                                    <li className="page-item"><a  href="# " className="page-link">1</a></li>
                                                    <li className="page-item active">
                                                    <a  href="# " className="page-link">2 <span className="sr-only">(current)</span></a>
                                                    </li>
                                                    <li className="page-item"><a href="# " className="page-link">3</a></li>
                                                    <li className="page-item">
                                                    <a  href="# " className="page-link">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer/>
            </div>
        );
    }
}
export default Companyjobs;