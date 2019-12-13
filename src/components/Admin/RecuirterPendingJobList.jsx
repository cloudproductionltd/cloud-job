import React, { Component } from 'react';
import Axios from 'axios';
import Footer from '../Admin/Home/Footer';
import Sidebar from '../Admin/Home/Sidebar';
import Breadcumb from '../Admin/Home/Breadcumb';
import { withRouter } from 'react-router';
import Page from 'react-page-loading';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class RecuirterPendingJobList extends Component {

    intervalID;


    state ={
        jobs:[],
        report: true
    }

    componentDidMount(){
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }
    
    getData = () => {
        if(!(window.sessionStorage.getItem('user_role') === 'recruiter')){
            this.props.history.push('/');
        }
        let user_id = window.sessionStorage.getItem('user_id')
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }
        Axios.get(`/jobs/pendingofusers/${user_id}`)
    
            .then(response => {
                
                this.setState({ jobs: [...response.data.response.jobs]})

                this.intervalID = setTimeout(this.getData.bind(this), 5000);
            });
    }
    
    render() { 
        let  { jobs } =this.state
    
        const joblist = jobs.map((job) =>


            <tr style={{ visibility: job.report ?'collapse':''}}>
                <td>{job.title ? job.title : '' }</td>
                <td>{ job.company_name ? job.company_name : '' } </td>
                <td>{ job.sub_category ? job.sub_category : '' } </td>
                <td>{job.joblevel ?  job.joblevel : ''} </td>
                <td>{ job.vacancy ? job.vacancy : '' } </td>
                <td>{ job.nature ? job.nature : '' } </td>
                <td>{ job.category ? job.category : '' } </td>
                <td>{ job.experience ? job.experience : '' } </td>
                <td>{ job.is_negotiable === 1 ? 'yes' : 'no' } </td>
            </tr>
        );
        return (
            <div>
                <div className="page"> 
                <Breadcumb/>
                <section className="commonAdminForms">
                <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                    <div className="col-lg-10  mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>Pending Job list</h4>
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
                    </Page>
                    </section>
                <Footer/>
                </div>
                <Sidebar/>
            </div>
        )
    }

}

export default withRouter(RecuirterPendingJobList);