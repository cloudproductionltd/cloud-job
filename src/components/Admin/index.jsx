import React, { Component } from 'react';
import Navbar from './navbar';
import Header from './header';

class index extends Component {
    render() {
        return (
            <div>
            <Navbar/>
            <Header/>
            <footer className="main-footer">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                    <p>Cloud Production © 2019</p>
                    </div>
                    <div className="col-sm-6 text-right">
                    <p>Design by <a href="https://cloudproduction.co.bd" className="external">@CloudProduction</a></p>
                    </div>
                </div>
                </div>
            </footer>
        </div>
        );
    }
}
export default index;