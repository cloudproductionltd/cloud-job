import React, { Component } from 'react';


class SearchJob extends Component {
    render() {
        return (
            <section className="search-job">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="search-job-wrapper">
                            <h2 className="title">Quick Search</h2>
                            <div className="search-field">
                                <form className="" action="" method="post">
                                        <div className="form-row">
                                            <div className="col">
                                                <div className="md-form">
                                                    <i className="fa fa-search prefix"></i>
                                                    <input type="text" id="materialKeyword" className="form-control"/>
                                                    <label htmlFor="materialKeyword">keyword or Title</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="md-form">
                                                    <i className="fa fa-ambulance prefix"></i>
                                                    <input type="email" id="materialCategory" className="form-control"/>
                                                    <label htmlFor="materialCategory">Category</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <button type="button" className="btn btn-success btn-rounded waves-effect waves-light">Find Jobs</button>
                                            </div>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}
export default SearchJob;