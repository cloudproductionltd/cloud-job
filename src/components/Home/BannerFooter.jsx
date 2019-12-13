
import React, { Component } from 'react';


class BannerFooter extends Component {
    render() {
        return (
            <section id="app" className="">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 app-left">
                        <img src="assets/images/app-device.png" alt="app-device" className="noo-image"/>
                    </div>
                    <div className="col-md-6 app-right">
                        <div className="noo-text-block">
                            <div className="app-section">
                                <h3 className="app-right-title">Download Cloud Job Android App</h3>
                                <p>Be a member of a family of more than one million job seekers and apply to any of the 3000+ live jobs</p>
                                <img className="mr-2 mt-3" src="assets/images/app-googleplay.png" alt="customer"/>
                                <img className="mt-3" src="assets/images/app-appstore.png" alt="customer"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        );
    }
}
export default BannerFooter;