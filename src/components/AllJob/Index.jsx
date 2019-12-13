import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import Jobs from '../AllJob/jobs';


class index extends Component {

    
    render() {
        return (
            <div>
                <Navbar/>
                <Jobs />
                <Footer/>
            </div>
            
        );
    }
}
export default index;