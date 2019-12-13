import React, { Component } from 'react';
import Breadcumb from './Breadcumb';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import {  Link } from 'react-router-dom';
import CoolTabs from 'react-cool-tabs';
import Error from '../../../components/Error';
import  Pagination  from '../../Pagination';
import Modal from 'react-bootstrap4-modal';
const $ = window.$;

class AllUserListSeeRecruAdmin extends Component {

    state = {
        users:[],
        totalPage:'',
        currentPage : '1',
        postsPerPage :5,
        total:'',
        show:'',
        report:''
    }

    componentDidMount(){
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }


    getData = () => {
        Axios.get(`/users/`)
            .then(response => {
                console.log('users find pending : ', response.data.response.users)
                this.setState({users: response.data.response.users})
                this.intervalID = setTimeout(this.getData.bind(this), 5000);
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
        }

    handleInputChange = event  => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    approveUser(id){

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.get(`/companies/admin/verified/user/${id}`,{headers:headers})
        .then(response => {
            console.log('yap')
            this.props.history.push('/pending');
            window.location.reload();
        })
        .catch(error => {
            console.log('yap',error)
        })

    }



    openDisapproveModal(modal, user_id_modal) {
        this.setState({
            show : modal,
            user_id_modal: user_id_modal
        });
    }

    disapprove= (e) =>{
       
        let { report ,user_id_modal } = this.state
      
        
        e.preventDefault();
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('cool-jwt')
        }

        Axios.post(`/companies/admin/disapprove/user/${user_id_modal}`,{ disapprovereport : report },{headers:headers})
        .then(response => {
            console.log('yap')
            this.props.history.push('/pending');
            window.location.reload();
        })
        .catch(error => {
            console.log('yap',error)
        })

    }

    render() {

        // const columns = [{
        //         Header: 'Name',
        //         accessor: 'personal.firstName' // String-based value accessors!
        //     },
        //     {
        //         Header: 'Email',
        //         accessor: 'local.email' // String-based value accessors!
        //     },
        //     {
        //         Header: 'FatherName',
        //         accessor: 'personal.fatherName' // String-based value accessors!
        //     },{
        //         Header: 'FatherName',
        //         accessor: 'personal.fatherName'
        //     }
        //      ]

             
            let { users } = this.state
  
            let indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
            let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
            let currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);


            
            const paginate = pageNumber => this.setCurrentPage(pageNumber);
            this.setCurrentPage = (pageNumber) => {
                console.log('pageNumber',pageNumber)
                this.setState({
                    currentPage: pageNumber
                })
            }
         
            const usersList = users.map((user,index)=>
            /*    &&  user.verified == 1 && user.adminVerificationforUser == 0  && user.disapprovereport == null */
                <tr key={index}  style={{ visibility: (user.role=="seeker" &&  user.verified == 1 && user.adminVerificationforUser == 0 && user.disapprovereport === null)?'':'collapse'}}>
                            
                            <td>
                                <h2 className="loop-item-title"> { user.personal.firstName } {user.personal.lastName} </h2>
                            </td>
                            
                            <td>
                                { user.local.email}
                            </td>
                            {/* <td>
                                { user.verified == 0 ? "No" : "Yes"}
                            </td> */}
                            <td>
                                { user.adminVerificationforUser == 0 ? "No" : "Yes"}
                            </td>
                            <td className="eidtUpdateBtn">
                                 {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                                <Link to={`/userinfo/${user._id}`} className="btn btn-primary btn-sm adminEdIconDelete btn-rounded">Details</Link>
                                <button  className="btn nextStep btn-sm adminEdIconDelete btn-rounded" onClick={() => this.approveUser(user._id)} >Approve</button>
                                <button  className="btn btn-danger btn-sm adminEdIconDelete btn-rounded" onClick={(e) => this.openDisapproveModal('disapprove', user._id)} >Reject</button>
                            </td> 
                        </tr>
            )
        return (
    
       
        
            <div>
                {/* <Sidebar/> */}
                
                    {/* <Breadcumb/> */}
                    
     
                    <section className="">
                        <div className="">
                    
                            <div className="row recrutrJobRow">
                                <div className="col-lg-12">
                                    <div className="card">
                                            <div className="card-header">
                                                <h4>Pending User List</h4>
                                            </div>
                                            <div className="card-body">
                                            <table className="table table-bordered table-responsive online-applicant-table cmtable recruitercmTable">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Name</th>
                                                            {/* <th>Middle Name</th> */}
                                                            <th>Email </th>
                                                            {/* <th>Email verified</th> */}
                                                            <th>Verification</th>
                                                            
                                                            <th>Action</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        { usersList }
                                                        {/* <Pagination  postsPerPage={this.state.postsPerPage} totalPosts={this.state.total}  paginate={paginate}/> */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                        
                        </div>
                    </section>

                    <Modal visible={ this.state.show == 'disapprove' ? true : false}>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={ this.disapprove }> 
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Sumit your report</label>
                                    <textarea rows="4" cols="50" name="report" form="usrform" onChange={this.handleInputChange}>
                                    </textarea>
                                </div> 
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="submit" className="btn nextStep"/></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
            
        );
           
        }
    }
export default withRouter(AllUserListSeeRecruAdmin);