import React, { Component } from 'react';
import Axios from 'axios';
import Footer from './Admin/Home/Footer';
import Sidebar from './Admin/Home/Sidebar';
import Breadcumb from './Admin/Home/Breadcumb';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class RecruiterJobs extends Component {

    state ={
        jobs:[]
    }

    componentDidMount(){

        if(!(window.sessionStorage.getItem('user_role') === 'recruiter')){
            this.props.history.push('/');
        }
        let company_id = window.sessionStorage.getItem('company_id')
        Axios.get(`/jobs/company/${company_id}`)
        //Axios.get(`https://cloudjobs.herokuapp.com/jobs/company/:id`)
            .then(response => {
                console.log('jobs',response)
                this.setState({jobs: response.data.response.jobs})
            })
            .catch(error => {
            })
    }

    

    
    render() { 
        let  { jobs } =this.state
        console.log('jobs',jobs)
     
        const joblist = jobs.map((job) =>
       
            <tr>
                <td>{job.title ? job.title : '' }</td>
                <td>{ job.company_name ? job.company_name : '' } </td>
                <td>{ job.sub_category ? job.sub_category : '' } </td>
                <td>{job.joblevel ?  job.joblevel : ''} </td>
                <td>{ job.vacancy ? job.vacancy : '' } </td>
                <td>{ job.nature ? job.nature : '' } </td>
                <td>{ job.category ? job.category : '' } </td>
                <td>{ job.experience ? job.experience : '' } </td>
                <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td>
                <td className="eidtUpdateBtn"><Link to={ `/recruiter/jobs/update/${job._id}`} className="btn btn-primary btn-xs adminEdIcon editBTn"><i className="fas fa-pencil-alt"></i></Link>
                <a href=" " className="btn btn-danger btn-xs adminEdIconDelete"><i className="fas fa-trash-alt"></i></a></td>

            </tr>
        );
        return (
            <div>
                <div className="page"> 
                <Breadcumb/>
                <section className="commonAdminForms">
                    <div className="col-lg-10  mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>Job list</h4>
                                <Link  to="/recruiter/jobs/add" >
                                    <button type="button" className="btn btn-info btn-sm pull-right add-jobbtn">Add job</button></Link> 
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm table-hover jobLst">
                                        <thead>
                                            <tr>
                                                <th> Name  </th>
                                                <th> Company Name  </th>
                                                <th> Sub Category </th>
                                                <th> Job level </th>
                                                <th> Vacancy</th>
                                                <th> Nature </th>
                                                <th> Category </th>
                                                <th> Experience </th>
                                                <th> Negotiable </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {joblist}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </section>
                <Footer/>
                </div>
                <Sidebar/>
            </div>
        )
    }

}

export default withRouter(RecruiterJobs);