import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
const $ = window.$;

class applicableListByAdmin extends Component {
    intervalID;

    state={
        jobs:[]
    }

    componentDidMount(){
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    getData = () => {
        Axios.get(`/jobs/`)
        .then(response => {
            // console.log('jonbsss',response.data)
            this.setState({
                jobs:[...response.data.response.jobs]
            })

            this.intervalID = setTimeout(this.getData.bind(this), 5000);
        })
    
    }


    render() {

        let { jobs } = this.state

        const joblist = jobs.map((job,index)=>
        
                    <tr key={index} style={{ visibility: job.report ?'collapse':''}}>
                        
                        <td>
                            <h2 className="loop-item-title"> { job.title } </h2>
                        </td>
                        <td>
                            {job.company_name}
                        </td>
                        <td>
                            {job.jobType}
                        </td>
                        <td>
                            { job.sub_category}
                        </td>
                        
                        {/* <td>
                            {job.experience}
                        </td> */}
                        <td>
                        {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                        <Link to={`/admin/approved/job/details/${job._id}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-eye"></i></Link>
                        </td>
                    </tr>
        )

        return (
            <div>
                <div className="page commonAdminPage"> 
                    <Breadcumb/>
                    <section className="commonAdminForms">
                    <div className="container-fluid">
                       <div className="row justify-content-md-center">
                       <div className="col col-lg-10">
                       <div className="card recrutrJobRow">
                                   <div className="card-header">
                                       <h4 className="mb-0"> Approved job list </h4>
                                   </div>
                                    <div className="card-body">
                                        <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Job Title</th>
                                                    <th>Company Name</th>
                                                    <th>Job nature</th>
                                                    <th>Job Category</th>
                                                    {/* <th>Experience</th> */}
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {joblist}
                                            </tbody>
                                        </table>

                                {/* <nav aria-label="Page navigation example">
                                    <ul className="pagination pg-blue justify-content-center"> 
                                        <li className="page-item disabled">
                                        <span className="page-link">Previous</span>
                                        </li>
                                        <li className="page-item"><a className="page-link">1</a></li>
                                        <li className="page-item active">
                                        <span className="page-link">
                                            2
                                            <span className="sr-only">(current)</span>
                                        </span>
                                        </li>
                                        <li className="page-item"><a className="page-link">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link">Next</a>
                                        </li>
                                    </ul>
                                </nav> */}
                                


                                  </div>
                               </div>
                           
                           
                               {/* <div className="card">
                                   <div className="card-header">
                                       <h4 className="mb-0">Applicable list of recruiter</h4>
                                   </div>
                                    <div className="card-body">
                                    <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Job Id</th>
                                            <th>Job Title</th>
                                            <th>Total Applicants</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td className="">0001</td>
                                            <td>Android Developer</td>
                                            <td>10</td>
                                            <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                            <button type="button" className="btn btn-danger btn-rounded btn-sm">Cancel</button></td>

                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td className="">0002</td>
                                            <td>Software Engineer</td>
                                            <td>11</td>
                                            <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                            <button type="button" className="btn btn-danger btn-rounded btn-sm">Cancel</button></td>

                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td className="">0003</td>
                                            <td>Android Developer</td>
                                            <td>15</td>
                                            <td><button type="button" className="btn btn-cyan btn-rounded btn-sm">Details</button>
                                            <button type="button" className="btn btn-danger btn-rounded btn-sm">Cancel</button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <nav aria-label="Page navigation example">
                                    <ul className="pagination pg-blue justify-content-center"> 
                                        <li className="page-item disabled">
                                        <span className="page-link">Previous</span>
                                        </li>
                                        <li className="page-item"><a className="page-link">1</a></li>
                                        <li className="page-item active">
                                        <span className="page-link">
                                            2
                                            <span className="sr-only">(current)</span>
                                        </span>
                                        </li>
                                        <li className="page-item"><a className="page-link">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                                


                                  </div>
                               </div> */}
                           
                        
                           </div>
                       </div>
                   </div>
               </section>
               
                    <Footer/>
                </div>
                <Sidebar/>
               
            </div>
        );
    }
}

export default withRouter(applicableListByAdmin);