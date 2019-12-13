import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from "react-router-dom";

class Topjob extends Component {

    state = {
        jobs : [],
        totalJobs: '',
        title: '',
        category:''
    }
    
    componentDidMount(){
        Axios.get(`/jobs`,{
            params: {
                title: '',
                category: ''
            }
        })
        .then(response => {
            this.setState({ jobs:response.data.response.jobs })
        })
        .catch(error => {
        })
    }


    search =  (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    searchValueSubmit = (e) => {
        e.preventDefault();
        let { title, category } = this.state
        Axios.get(`http://localhost:5000/jobs`,{
            params: {
                title: title,
                category: category
            }
        })
        .then(response => {
            console.log('response',response)
            this.setState({ jobs:response.data.response.jobs })
        })
        .catch(error => {
        })
    
    }

    render() {
        let { jobs } = this.state
        const joblist = jobs.map((job,index)=>
            <tbody key={index}>
                <tr>
                    <th scope="row">
                        <img className="table-img" alt="" src="assets/images/about-img.png"/>
                    </th>
                    <td>
                        <h2 className="loop-item-title"> { job.title ? job.title : 'no title yet'} </h2>
                        <p className="content-meta">
                            <span className="job-company">
                                {job.category}
                            </span>
                            <span className="job-type contract">
                                <i className="fa fa-bookmark"></i>{job.nature ? job.nature : 'null' }
                            </span>
                            <span className="job-location">
                                <i className="fa fa-map-marker"></i><em>{job.job_location ?  job.job_location : 'null'}</em>
                            </span>
                            <span>
                                <time className="entry-date" dateTime="2015-08-18T01:40:23+00:00">
                                    <i className="fa fa-calendar"></i>
                                    {job.deadline ? job.deadline :' null'}
                                </time>
                            </span>
                        </p>
                    </td>
                    <td><button className="btn btn-success btn-rounded view-more waves-effect waves-light">  <Link to={{ pathname: '/singlejob', state: { job }  }}> View More </Link></button></td>
                </tr>
                
            </tbody>

        );
    
        return (
            <div>
                <section className="search-job">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            <div className="search-job-wrapper">
                                <h2 className="title">Quick Search</h2>
                                <div className="search-field">
                                    <form className="" onSubmit={ this.searchValueSubmit } method="post">
                                        <div className="form-row">
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fa fa-search prefix"></i>
                                                <input type="text" name='title' id="materialKeyword" className="form-control" onChange={this.search}/>
                                                <label htmlFor="materialKeyword">keyword or Title</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="md-form">
                                                <i className="fa fa-ambulance prefix"></i>
                                                <input type="text" name='category' id="materialCategory" className="form-control"  onChange={this.search}/>
                                                <label htmlFor="materialCategory">Category</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button type="submit" className="btn btn-success btn-rounded waves-effect waves-light">Find Jobs</button>
                                        </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="top-job common-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            <div className="headline">
                                {/* 
                                <h2 className="title">We found <span className="text-primary-color">18</span> available job(s) for you</h2>
                                */}
                            </div>
                            <table className="table table-borderless job-details-table">
                                {joblist}
                            </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default Topjob;