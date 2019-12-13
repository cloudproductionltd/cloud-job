import React, { Component } from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Applylist from './Applylist'
class index extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Applylist/>
                <Footer/>
            </div>
        );
    }
}
export default index;