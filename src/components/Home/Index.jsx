import React, { Component } from 'react';
import Navbar from './Navbar'

// import Slider from './Slider';
import Banner from './Banner';

import Summary from './Summary';
import JobCategory from './JobCategory';
import TrendingSearch from './TrendingSearch';
import UpcomingEvents from './UpcomingEvents';
import FeatureCompany from './FeatureCompany';
import Page from 'react-page-loading';
import Footer from './Footer';
import {  withRouter } from 'react-router-dom';

class Index extends Component {

    
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

            </div>
        );

    }
}
export default withRouter(Index);
