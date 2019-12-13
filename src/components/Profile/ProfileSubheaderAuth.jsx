import React, { Component } from 'react';
import Axios from 'axios'

class ProfileSubheaderAuth extends Component {
    
    state = {
        user : '',
        employments : [],
        address : '',
        createdat: ''
    }

    componentDidMount(){
        let user_id = window.sessionStorage.getItem('loggedInUserId');
        Axios.get(`/users/${user_id}`)
        //Axios.get(`https://cloudjobs.herokuapp.com/users/${user_id}`)
            .then(response => {
                this.setState({ 
                    user: response.data.response.user,
                    employments : response.data.response.user.employments,
                    address : response.data.response.user.address,
                    createdat : response.data.response.user.createdAt
                })
            })
            .catch(error => {
            })

    }
    render() {
    
        var userCreatedAt = new Date(this.state.createdat).toLocaleDateString()

        let{ employments } = this.state

        let  showEmployments 
        if (employments && employments.length){
            showEmployments =   <div>
                                    <span className="font-weight-medium"><i> {this.state.user && this.state.user.employments && this.state.user.employments[0].company && this.state.user.employments[0].company.designation}</i></span>
                                    <p className="member-mail"><b>Email:</b> {this.state.user && this.state.user.employments && this.state.user.employments[0].company && this.state.user.employments[0].company.designation}{this.state.user && this.state.user.local &&  this.state.user.local.email }</p> 
                                </div> 
            }else{
                showEmployments =<div></div> 
            }

        let  { address } = this.state
        let showAddress
        if( address ){
            showAddress =  <div><b>Current Address: </b><p className="d-inline-block pComAddress">  {address.current_city} , {address.current_country}, {address.current_state},  {address.current_zipcode}   </p>  <br/>
                                <b>Permanent Address: </b><p className="d-inline-block pComAddress">  {address.permanent_city} , {address.permanent_country}, {address.permanent_state} , {address.permanent_zipcode}   </p> 
                            </div>
        }else{
            showAddress =    <p className="d-inline-block">  Current Address:  <br/>  Permanent Address:</p>
        }
        return (

            <div>
                <section className="profile-subheader">
                        <div className="container">
                            <div className="row candidate-details">
                                <div className="col-md-8">
                                    <div className="candidate-sidebar">
                                        <div className="profile-title">
                                            <h4 className="mt-0 d-inline-block"> <b> {this.state.user && this.state.user.local && this.state.user.local.username} </b> </h4>
                                        </div>
                                        {showEmployments}
                                        <p className="company-member"><b>Member Since: </b>{userCreatedAt}</p>
                                        <div className="profile-address">
                                            {showAddress}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </div>
        );
    }
}
export default ProfileSubheaderAuth;