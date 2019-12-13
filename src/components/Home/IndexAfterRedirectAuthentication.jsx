import React, { Component } from 'react';
import Navbar from './Navbar'

// import Slider from './Slider';
import Banner from './Banner';

import Summary from './Summary';
import JobCategory from './JobCategory';
import TrendingSearch from './TrendingSearch';
import UpcomingEvents from './UpcomingEvents';
import axios from 'axios'
import Modal from 'react-bootstrap4-modal'
import FeatureCompany from './FeatureCompany';
import Page from 'react-page-loading';
import Footer from './Footer';
import {  withRouter, Link } from 'react-router-dom';

class IndexAfterRedirectAuthentication extends Component {

    state={
        fail:'',
        successModal:''
    }
    componentDidMount (history) {
        const { match: { params } } = this.props; 
        
        axios.get(`/auth/verify/${params.token}`)
        .then(response => {
            this.setState({
                successModal:'success'
            })
        }).catch( error => {
            this.setState({
                fail:'success'
            })
            
        })

    }


    closeModal(){

        this.setState({
            fail:''
        })
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Page loader={"bubble-spin"} color={"#4cbb17"} size={10} duration ={1}>
                    <Navbar/>
                    <Banner />
                    <Summary/>
                    <JobCategory/>
                    <UpcomingEvents/>
                    <TrendingSearch/>
                    <FeatureCompany/>
                    <Footer/>
                </Page>


                <Modal visible={ this.state.successModal =='success' ? true : false}>
                    <div className="card">
                        <div className="alert alert-success user-success-message">
                            <strong> You are verified to job site. Please <Link to='/'>  <a >Login </a></Link> </strong>
                            <button type="button" className="close common-close success-close verEmsin" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button> 
                        </div>
                    </div>

                    
                </Modal>


                <Modal visible={ this.state.fail =='success' ? true : false}>
                    <div className="card">
                        <div className="alert alert-success user-success-message">
                            <strong> Your verification link has expired. Please again fill up your registration form.</strong> 
                            <button type="button" className="close common-close success-close verEmsin" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>  
                        </div>
                    </div>
                </Modal>
            </div>
        );

    }
}
export default withRouter(IndexAfterRedirectAuthentication);
