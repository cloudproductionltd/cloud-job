import React, { Component } from 'react'
import Axios from 'axios'
import { Link, withRouter } from "react-router-dom"
import { Typeahead } from 'react-bootstrap-typeahead'
// import { withRouter } from 'react-router'
const $ = window.$;

class Banner extends Component {
    state = {
        selected: '',
        options: '',
        title: '',
        category: '',
        level:''
    }

    componentDidMount(){
        Axios.get(`http://cloudproduction.co.bd/jobs/public/api/category`)
            .then(response => {
                this.setState({ options: response.data.categories })
            })

        $('.carousel').carousel({
            interval: 3000
        });
    }

    setSearchValue = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    SearchJobs = (e) => {
    e.preventDefault();
    let { title, category, level, type, language } = this.state

    let url = 'jobs?'
    if(title)
        url +='&title='+title
    if(level)
        url +='&level='+level
    if(category)
        url +='&category='+category
    if(type)
        url +='&type='+type
    if(language)
        url +='&language='+language

    url = url.replace('?&','?')

    this.props.history.push(url)
}

    render() {
        return (
            <section className="hero-section top-banner-wrap">
                <div className="top-inner-wrap">
                    <div className="top-inner">
                    <div id="demo" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="../assets/images/job1.jpg" alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="../assets/images/job14.jpg" alt=" Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="../assets/images/job12.jpg" alt="Third slide" />
                                </div>
                            </div>
                            <div className="stContOverimg">
                                <div className="container text-center">
                                    <h1 className="intro-title">Find a job near you</h1>
                                    <p className="sub">Simple, fast and efficient</p>
                                    <div className="search-field">
                                        <div onSubmit={this.SearchJobs} className="top-banner-form">
                                            <div className="form-row">
                                                <div className='form-group banTopTitle col-lg-12'>

                                                    <div className="input-group">
                                                        <input type="text" name="title" onChange={this.setSearchValue} className="form-control key-title location-select" placeholder="Keyword or Title" aria-label="Keyword or Title"
                                                            aria-describedby="MaterialButton-addon2" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="form-row groupOfField">
                                                <div className='form-group col'>
                                                    <Typeahead
                                            labelKey="name"
                                            onChange={(selected) => {
                                                if(selected.length > 0){
                                                    this.setState({ category : selected[0].name});
                                                }
                                            }}
                                            options={ this.state.options }

                                            placeholder="Job Category..."
                                        />
                                                    {/* <select className="form-control location-select" placeholder="Location" aria-describedby="jobCategory">
                                                        <option value="" hidden>Job Category</option>
                                                        <option value="1">Executive</option>
                                                        <option value="2">IT (PC, Web, Unix)</option>
                                                        <option value="3">IT (Mainframe)</option>
                                                        <option value="4">IT (Hardware/Network)</option>
                                                        <option value="5">IT (Embedded Software, Control Systems)</option>
                                                        <option value="6">IT (Other)</option>
                                                        <option value="7">Electronics (Appliance/Semiconductor)</option>
                                                        <option value="8">Manufacturing (Automobile/Plant Engineering/Precision Equipment)</option>
                                                        <option value="9">Medical/Pharmaceutical/Bio/Fabric/Food</option>
                                                        <option value="10">Building/Construction/Equipment/Real Estate</option>
                                                        <option value="11">Consulting</option>
                                                        <option value="12">General Affairs/HR/Legal</option>
                                                        <option value="13">Legal</option>
                                                        <option value="14">Finance/Accounting</option>
                                                        <option value="15">Administrative</option>
                                                        <option value="16">Customer Service</option>
                                                        <option value="17">Finance/Bank/Securities</option>
                                                        <option value="18">Insurance</option>
                                                        <option value="19">Property/Real Estate</option>
                                                        <option value="20">Other Financial Specialist</option>
                                                        <option value="21">Sales/AE</option>
                                                        <option value="22">Marketing/PR</option>
                                                        <option value="23">Logistics/Retail/Consumer/Fashion</option>
                                                        <option value="24">Hospitality Business Specialists</option>
                                                        <option value="25">Education/Training/Language Specialist</option>
                                                        <option value="26">Creative(Internet Related)</option>
                                                        <option value="27">Creative (Media Related)</option>
                                                        <option value="28">Creative (Other)</option>
                                                        <option value="29">Health/Nursing</option>
                                                        <option value="30">Government/Public Sector</option>
                                                        <option value="31">Other Job Type</option>
                                                    </select> */}
                                                </div>
                                                <div className='form-group col'>
                                                    <select onChange={this.setSearchValue} name="level" className="form-control location-select" placeholder="Location" aria-describedby="MaterialButton-addon2">
                                                        <option value="">Job Level</option>
                                                        <option value="Entry">Entry Level</option>
                                                        <option value="Mid">Medium Level</option>
                                                        <option value="Senior">Senior Level</option>
                                                    </select>
                                                </div>
                                                <div className='form-group col'>
                                                    <select onChange={this.setSearchValue} name="type" className="form-control location-select" placeholder="Location" aria-describedby="MaterialButton-addon2">
                                                        <option value="">Job Type</option>
                                                        <option value="Full Time">Full Time</option>
                                                        <option value="Part Time">Part Time</option>
                                                        <option value="Contractual">Contractual</option>
                                                    </select>
                                                </div>
                                                <div  className='form-group col'>
                                                    <select onChange={this.setSearchValue} name="language"className="form-control location-select" placeholder="Location" aria-describedby="MaterialButton-addon2">
                                                        <option value="">Language</option>
                                                        <option value="English">English</option>
                                                        <option value="Japanese">Japanese</option>
                                                        <option value="Bangla">Bangla</option>
                                                    </select>
                                                </div>
                                                <div className='form-group col'>
                                                    <div className="input-group-append findJobBtn">
                                                        <button className="btn btn-md banwidt m-0 px-3" onClick={ (e) =>  this.SearchJobs(e)}>Find jobs</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#demo" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#demo" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default withRouter(Banner);