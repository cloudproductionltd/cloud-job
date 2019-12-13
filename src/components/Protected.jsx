import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Home from './Home/Index';
// import Profile from './Profile/ProfileOfAuthenticate';
// import Singlejob from '../components/SingleJob/index';
// import testComponent from './testComponent';
import { withRouter } from 'react-router';


class Protected extends Component {

    componentDidMount(){
        if(!(window.sessionStorage.getItem('user_role') === 'recruiter')){
            this.props.history.push('/');
        }
    }
    render(){
        return(
            <div>
                <h1>Protected</h1>
            </div>
            )
    }

}

export default withRouter(Protected);