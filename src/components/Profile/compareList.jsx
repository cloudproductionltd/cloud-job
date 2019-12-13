import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import UserSidebar from './userSidebar';
import { withRouter,Link } from 'react-router-dom';

const $ = window.$;

class CompareJobList extends Component {

    constructor(){
        super();
        
    }

   
    componentDidMount () {

    }
        
    render(){
        return (
            <div>
            <Navbar/>
            <div className="container page-wrapper chiller-theme">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <UserSidebar/>
                    </div>
                    <div className="col-md-9 col-sm-12">
                    <div className="right-resume-edit-wrapper">
                                <div className="card-bodycm">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb resume-breadcumb-wrapper cmBreadCumb">
                                        <li className="breadcrumb-item"><a href="#">Job Related</a></li>
                                        <li className="breadcrumb-item active">Compare List</li>
                                    </ol>
                                </nav>
                                
                                <table className="table table-bordered table-responsive online-applicant-table cmtable compaTable">
                                    <thead className="thead-light">
                                        <th><p><b>Job Title: </b><a href="" className="">Android Developer</a></p></th>
                                        <th><p className="employer-view"> <b>Applied on: </b>
                                            <span>12/10/2019</span>
                                        </p></th>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <p><b>Required skills:</b>
                                                <ul>
                                                    <li>5+ years of Android Application or platform development experience</li>
                                                    <li>Strong Java programming skills (preferred)</li>
                                                    <li>Good understanding of Android platform architecture</li>
                                                    <li>Excellent written and verbal communication skills in English</li>
                                                    <li>Excellent written and verbal communication skills in Japanese, Korean or Mandarin</li>
                                                </ul>
                                            </p>
                                        </td>
                                       
                                        <td>
                                            <p><b>Your skills:</b>
                                                <ul>
                                                    <li>5+ years of Android Application or platform development experience</li>
                                                    <li>Strong Java programming skills (preferred)</li>
                                                    <li>Good understanding of Android platform architecture</li>
                                                    <li>Excellent written and verbal communication skills in English</li>
                                                    <li>Excellent written and verbal communication skills in Japanese, Korean or Mandarin</li>
                                                </ul>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p><b>Educational Qualification:</b>
                                                <ul>
                                                    <li>BSC in CSE</li>
                                                </ul>
                                            </p>
                                           
                                        </td>
                                       
                                        <td>
                                            <p><b>Your Educational Qualification:</b>
                                            <ul>
                                                <li>Honours in Management</li></ul> 
                                            </p>
                                           
                                        </td>
                                    </tr>
                                   
                                    
                                   
                                        
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default withRouter(CompareJobList);
