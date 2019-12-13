import React, { Component } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';



class ErrorPage extends Component {

    
    render() {
        return (
            <div>
                <Navbar/>
                
    <div id="wrapper">
        <div className="container">
            <div className=""></div>
            <div className="number">
                <div className="four"></div>
                <div className="zero">
                    <div className="nail"></div>
                </div>
                <div className="four"></div>
            </div>
            <div className="info">
                <h2>The page is not found</h2>
                <p>We are sorry! The page you are looking for is now under construction.</p>
                <a href="../" className="btn btn-success">Go Home</a>
            </div>
        </div>
    </div>
   

   
                <Footer/>
            </div>
            
        );
    }
}
export default ErrorPage;