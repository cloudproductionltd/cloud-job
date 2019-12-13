import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Slider extends Component {
    render() {
        return (
            <section className="hero-section">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className=""></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1" className=""></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2" className="active"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item" style={{ backgroundImage: `url("assets/images/1.jpg")` }}>
                        <div className="carousel-caption d-none d-md-block">
                            <h2 className="display-4 carousel-text">Design your own global carrer</h2>
                            <button type="button" className="btn btn-success btn-rounded waves-effect waves-light"><i className="fa fa-briefcase"></i> <Link to='/jobs'> Browse Jobs </Link> </button>
                            <button type="button" className="btn btn-gray btn-rounded waves-effect waves-light"><i className="fa fa-user"></i>Post a Resume</button>
                        </div>
                    </div>
                    <div className="carousel-item" style= {{ backgroundImage: `url("assets/images/2.jpg")` }}>
                        <div className="carousel-caption d-none d-md-block">
                            <h2 className="display-4 carousel-text">It's your career, It's your time</h2>
                            <button type="button" className="btn btn-success btn-rounded waves-effect waves-light"> <Link to='/jobs'> Browse Jobs </Link> </button>
                            <button type="button" className="btn btn-gray btn-rounded waves-effect waves-light">Post a Resume</button>
                        </div>
                    </div>
                    <div className="carousel-item active" style= {{ backgroundImage: `url("assets/images/3.jpg")` }}>
                        <div className="carousel-caption d-none d-md-block">
                            <h2 className="display-4 carousel-text">Join us &amp; Explore thousands of Jobs</h2>
                            <button type="button" className="btn btn-success btn-rounded waves-effect waves-light"><Link to='/jobs'> Browse Jobs </Link> </button>
                            <button type="button" className="btn btn-gray btn-rounded waves-effect waves-light">Post a Resume</button>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
                </a>
            </div>
        </section>
        );
    }
}
export default Slider;