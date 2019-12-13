import React, { Component } from 'react';
import Axios from 'axios'
import CountUp from 'react-countup';


class Summary extends Component {
    state = {
        jobs: '',
        users: '',
        companies: ''
    }
    componentDidMount(){
        Axios.post(`/jobs/total/count`)
            .then(response => {
                this.setState({ jobs: response.data.total})
        })

        Axios.post(`/users/total/count`)
        .then(response => {
            this.setState({ users: response.data.total})
        })

        Axios.get(`/companies/total/count`)
        .then(response => {
            this.setState({ companies: response.data.total})
        })
    }
render() {
    return (
        <section className="counting-section">
            <div className="container">
                <div className="page-info page-info-lite rounded">
                    <div className="text-center section-promo">
                        <div className="row">
                            <div className="col-sm-4 col-12 col-md-4 col-lg-4">
                                <div className="iconbox-wrap">
                                    <div className="iconbox">
                                        <div className="iconbox-wrap-icon">
                                        <i className="fas fa-briefcase"></i>
                                        </div>
                                        <div className="iconbox-wrap-content">
                                            <h5><span className="count"><CountUp start={0} duration={2} end={this.state.jobs} />+</span></h5>
                                            <div className="iconbox-wrap-text">Jobs</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12 col-md-4 col-lg-4">
                                <div className="iconbox-wrap">
                                    <div className="iconbox">
                                        <div className="iconbox-wrap-icon">
                                        <i className="fas fa-users"></i>
                                        </div>
                                        <div className="iconbox-wrap-content">
                                            <h5><span><CountUp start={0} duration={2} end={this.state.users} />+ </span></h5>
                                            <div className="iconbox-wrap-text">Users</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12 col-md-4 col-lg-4">
                                <div className="iconbox-wrap">
                                    <div className="iconbox">
                                        <div className="iconbox-wrap-icon">
                                            <i className="fas fa-industry"></i>
                                        </div>
                                        <div className="iconbox-wrap-content">
                                            <h5><span><CountUp start={0} duration={2} end={this.state.companies} />+ </span></h5>
                                            <div className="iconbox-wrap-text">Companies</div>
                                        </div>
                                    </div>
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
export default Summary;