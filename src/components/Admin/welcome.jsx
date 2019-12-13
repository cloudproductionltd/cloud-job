import React, { Component } from 'react';

class Welcome extends Component {

    render() {
        return (
        <section className="statistics">
            <div className="container-fluid">
                <div className="row d-flex">
                <div className="col-lg-4">
                
                    <div className="card income text-center">
                    <div className="icon"><i className="icon-line-chart"></i></div>
                    <div className="number">126,418</div><strong className="text-primary">All Income</strong>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card data-usage">
                        <h2 className="display h4">Monthly Usage</h2>
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-6">
                            <div id="progress-circle" className="d-flex align-items-center justify-content-center"></div>
                        </div>
                        <div className="col-sm-6"><strong className="text-primary">80.56 Gb</strong><small>Current Plan</small><span>100 Gb Monthly</span></div>
                    </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card user-activity">
                        <h2 className="display h4">User Activity</h2>
                    <div className="number">210</div>
                        <h3 className="h4 display">Social Users</h3>
                    <div className="progress">
                        <div role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" className="progress-bar progress-bar bg-primary"></div>
                    </div>
                    <div className="page-statistics d-flex justify-content-between">
                        <div className="page-statistics-left"><span>Pages Visits</span><strong>230</strong></div>
                        <div className="page-statistics-right"><span>New Visits</span><strong>73.4%</strong></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

    );
}
}
export default Welcome;