import React, { Component } from 'react';

class CounterSection extends Component {
    render() {
        return (
            <section className="counter-section counter parallax text-center">
                <div className="tint"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 counter-inner-wrapper">
                        <h2 className="counter-title">Jobtheme site stats</h2>
                        <h4 className="counter-subtitle">How many people we’ve helped</h4>
                        <div className="row reduce-width-row">
                            <div className="">
                                <div className="employees">
                                    <div className="counter-count">879</div>
                                    <div className="employee-p">Members</div>
                                </div>
                            </div>
                            <div className="">
                                <div className="customer">
                                    <div className="counter-count">954</div>
                                    <div className="customer-p">Jobs</div>
                                </div>
                            </div>
                            <div className="">
                                <div className="design">
                                    <div className="counter-count">1050</div>
                                    <div className="design-p">Resumes</div>
                                </div>
                            </div>
                            <div className="">
                                <div className="order">
                                    <div className="counter-count">652</div>
                                    <div className="order-p">Companies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        );
    }
}
export default CounterSection;