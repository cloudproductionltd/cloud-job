import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';

import Footer from '../Admin/Home/Footer';
import Sidebar from '../Admin/Home/Sidebar';
import Breadcumb from '../Admin/Home/Breadcumb';
import { withRouter } from 'react-router';
import Page from 'react-page-loading';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class RecruiterJobs extends Component {

    state ={
        jobs:[],
        navlink:'recent'
    }

    componentDidMount(){

        if(!(window.sessionStorage.getItem('user_role') === 'recruiter')){
            this.props.history.push('/');
        }
        let company_id = window.sessionStorage.getItem('company_id')
        let user_id = window.sessionStorage.getItem('user_id')

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.get(`/jobs/company`,{headers:headers})
            .then(response => {

                console.log('responseresponse',response.data.response)
                this.setState(previousState => {
                    return {
                        jobs: response.data.response.jobs ,
                        navlink: 'recent'
                    };
                });
            })
            .catch(error => {
            })
    }

    
    deleteJob(id){

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.delete(`/jobs/company/${id}`,{headers:headers})
        .then(response => {
            
            this.props.history.push('/recruiterjobs');
            window.location.reload();
        })
        .catch(error => {
        })

    }


    handleClickforRecentJobs(){
        this.setState({
            navlink : 'recent',
        })
    }

    handleClickforDeadlineCrossedJobs(){
        this.setState({
            navlink : 'deadline',
        })
    }
    
    render() {
        const now = moment() 
        let  { jobs ,navlink} =this.state
        
        const joblist = jobs.map((job) =>
            <tr style={{ visibility: job.delete === 0  && now.isAfter(moment(job.deadline, 'YYYY-MM-DDTHH:mm:ss.SSSZ')) ?'':'collapse'}}>
                <td>{job.title ? job.title : '' }</td>
                <td>{ job.company_name ? job.company_name : '' } </td>
                <td>{ job.sub_category ? job.sub_category : '' } </td>
                <td>{job.joblevel ?  job.joblevel : ''} </td>
                <td>{ job.vacancy ? job.vacancy : '' } </td>
                <td>{ job.nature ? job.nature : '' } </td>
                <td>{ job.category ? job.category : '' } </td>
                <td>{ job.experience ? job.experience : '' } </td>
                <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td>
            
                <td><button className="btn btn-primary btn-xs adminEdIcon"> <Link to={ `/applicantslistbyid/${job._id}`}> <i className="fas fa-eye"></i></Link>   </button> </td>  
                <td className="eidtUpdateBtn"><Link to={ `/recruiter/jobs/update/${job._id}`} className="btn btn-primary btn-xs adminEdIcon editBTn"><i className="fas fa-pencil-alt"></i></Link>
                <button  className="btn btn-danger btn-xs adminEdIconDelete" onClick={() => this.deleteJob(job._id)} ><i className="fas fa-trash-alt"></i></button>
                </td>

            </tr>
        );

        ///////
        const recentjobs = jobs.map((job) =>
                                        // 1                               1
        <tr  style={{ visibility: ((job.delete == "0" )  && now.isBefore(moment(job.deadline, 'YYYY-MM-DDTHH:mm:ss.SSSZ'))) ?'':'collapse'}}>
            <td>{job.title ? job.title : '' }</td>
            <td>{ job.company_name ? job.company_name : '' } </td>
            {/* <td>{ job.sub_category ? job.sub_category : '' } </td>
            <td>{job.joblevel ?  job.joblevel : ''} </td>
            <td>{ job.vacancy ? job.vacancy : '' } </td>
            <td>{ job.nature ? job.nature : '' } </td>
            <td>{ job.category ? job.category : '' } </td>
            <td>{ job.experience ? job.experience : '' } </td>
            <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td> */}
            <td >  <button className="btn btn-primary btn-xs adminEdIcon"> <Link to={ `/recruiter/job/details/${job._id}`}> <i className="fas fa-eye"></i></Link>   </button> </td>  
           
            <td >  <button className="btn btn-primary btn-xs adminEdIcon"> <Link to={ `/applicantslistbyid/${job._id}`}> <i className="fas fa-eye"></i></Link>   </button> </td>  
            
            <td className="eidtUpdateBtn"><Link to={ `/recruiter/jobs/update/${job._id}`} className="btn btn-primary btn-xs adminEdIcon editBTn"><i className="fas fa-pencil-alt"></i></Link>
                <button  className="btn btn-danger btn-xs adminEdIconDelete" onClick={() => this.deleteJob(job._id)} ><i className="fas fa-trash-alt"></i></button>
            </td>

        </tr>
        );


        const deadlingCrossJobs = jobs.map((job) =>
        <tr  style={{ visibility: ((job.delete == "0" ) && now.isAfter(moment(job.deadline, 'YYYY-MM-DDTHH:mm:ss.SSSZ')) )? '':'collapse'}}>
            <td>{job.title ? job.title : '' }</td>
            <td>{ job.company_name ? job.company_name : '' } </td>
            {/* <td>{ job.sub_category ? job.sub_category : '' } </td>
            <td>{job.joblevel ?  job.joblevel : ''} </td>
            <td>{ job.vacancy ? job.vacancy : '' } </td>
            <td>{ job.nature ? job.nature : '' } </td>
            <td>{ job.category ? job.category : '' } </td>
            <td>{ job.experience ? job.experience : '' } </td>
            <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td> */}
            <td >  <button className="btn btn-primary btn-xs adminEdIcon"> <Link to={ `/recruiter-job-details/${job._id}`}> <i className="fas fa-eye"></i></Link>   </button> </td>  
            
            <td >  <button className="btn btn-primary btn-xs adminEdIcon"> <Link to={ `/applicantslistbyid/${job._id}`}> <i className="fas fa-eye"></i></Link>   </button> </td>  
           
            <td className="eidtUpdateBtn"><Link to={ `/recruiter/jobs/update/${job._id}`} className="btn btn-primary btn-xs adminEdIcon editBTn"><i className="fas fa-pencil-alt"></i></Link>
                <button  className="btn btn-danger btn-xs adminEdIconDelete" onClick={() => this.deleteJob(job._id)} ><i className="fas fa-trash-alt"></i></button>
            </td>

        </tr>
        );


        return (

            <div>
                <div className="page"> 
                <Breadcumb/>
                <div style={{paddingTop:'39px', paddingLeft: '86px'}}> 
                        <nav className="nav nav-pills nav-justified custom_navWrap">
                            <a class={ navlink == 'recent' ?  "nav-link active" : "nav-link btn-outline-primary"} onClick={this.handleClickforRecentJobs.bind(this)}>Recent jobs </a>  
                            <a class={ navlink == 'deadline' ?  "nav-link active" : "nav-link btn-outline-primary "} onClick={this.handleClickforDeadlineCrossedJobs.bind(this)}> Deadlined crossed jobs </a>
                            {/* <a class={ navlink == 'disapprove' ?  "nav-link active" : "nav-link "}  onClick={this.handleClickforDisapprove.bind(this)}>disapprove user table</a> */}
                        </nav>
                    </div>

                <section className="commonAdminForms">
                <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                    <div className="col-lg-11  mx-auto">
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
                                                {/* <th> Sub Category </th>
                                                <th> Job level </th>
                                                <th> Vacancy</th>
                                                <th> Nature </th>
                                                <th> Category </th>
                                                <th> Experience </th>
                                                <th> Negotiable </th> */}
                                                <th> Job details </th>
                                                <th> Applicant list </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { navlink == 'recent' ? recentjobs : ''  }
                                            { navlink == 'deadline' ? deadlingCrossJobs : ''  }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Page>
                    </section>
                <Footer/>
                </div>
                <Sidebar/>
            </div>
        )
    }

}

export default withRouter(RecruiterJobs);