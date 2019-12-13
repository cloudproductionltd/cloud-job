import React, { Component } from 'react';
import Navbar from './navbar';
import Header from './header';
import axios from 'axios';

class form extends Component {

    state = {
        companies: [],
        categories:[],
        thanas:[]
    }
    
    
    componentDidMount() {
        axios.get(`http://cloudproduction.co.bd/jobs/public/api/v1/companies`)
            .then(res => {
            const companies = res.data.companies;
            this.setState({ companies });
            })

            axios.get(`http://cloudproduction.co.bd/jobs/public/api/category`)
            .then(res => {
            const categories = res.data.categories;
            this.setState({ categories });
            }) 
            
            axios.get(`http://cloudproduction.co.bd/jobs/public/api/v1/thans`)
            .then(res => {
            const thanas = res.data.thanas;
            this.setState({ thanas });
            }) 
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value})
    }
    

    render() {
        return (
            <div>
                <Navbar/>
                <Header/>
                <div className="row">
                    <div className="container">
                    <div className="breadcrumb-holder">
                        <div className="container-fluid">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="# ">Home</a></li>
                                <li className="breadcrumb-item active">Forms </li>
                            </ul>
                        </div>
                    </div>
                    <section className="forms">
                            <header>
                                <h1 className="h3 display">Forms    </h1>
                            </header>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center">
                                            <h4>Basic Form</h4>
                                        </div>
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                                            <form>
                                                <div className="form-group">
                                                    <label className="active">Email</label>
                                                    <input type="email" placeholder="Email Address" className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="active">Password</label>
                                                    <input type="password" placeholder="Password" className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="Signin" className="btn btn-info"/></span>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center">
                                            <h4>Horizontal Form</h4>  
                                        </div>
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                                            <form className="form-horizontal">
                                                <div className="form-group row">
                                                    <label className="col-sm-2">Email</label>
                                                    <div className="col-sm-10">
                                                        <input id="inputHorizontalSuccess" type="email" placeholder="Email Address" className="form-control form-control-success"/><small className="form-text">Example help text that remains unchanged.</small>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2">Password</label>
                                                    <div className="col-sm-10">
                                                        <input id="inputHorizontalWarning" type="password" placeholder="Pasword" className="form-control form-control-warning"/><small className="form-text">Example help text that remains unchanged.</small>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-10 offset-sm-2">
                                                        <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="Signin" className="btn btn-info"/></span>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div> 

                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center">
                                            <h4>Inline Form</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form-inline">
                                                <div className="form-group">
                                                    <label htmlFor="inlineFormInput" className="sr-only active">Name</label>
                                                    <input id="inlineFormInput" type="text" placeholder="Jane Doe" className="mr-3 form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inlineFormInputGroup" className="sr-only active">Username</label>
                                                    <input id="inlineFormInputGroup" type="text" placeholder="Username" className="mr-3 form-control form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="Submit" className="mr-3 btn btn-info"/></span>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center">
                                            <h4>Modal Form</h4>
                                        </div>
                                        <div className="card-body text-center">
                                            <button type="button" data-toggle="modal" data-target="#myModal" className="btn btn-info waves-effect waves-light">Form in simple modal </button>
                                            <div id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" className="modal fade text-left">
                                                <div role="document" className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 id="exampleModalLabel" className="modal-title">Signin Modal</h5>
                                                            <button type="button" data-dismiss="modal" aria-label="Close" className="close"><span aria-hidden="true">×</span></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                            <form>
                                                                <div className="form-group">
                                                                    <label className="active">Email</label>
                                                                    <input type="email" placeholder="Email Address" className="form-control"/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="active">Password</label>
                                                                    <input type="password" placeholder="Password" className="form-control"/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <span className="waves-input-wrapper waves-effect waves-light"><input type="submit" value="Signin" className="btn btn-info"/></span>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" data-dismiss="modal" className="btn btn-secondary waves-effect waves-light">Close</button>
                                                            <button type="button" className="btn btn-info waves-effect waves-light">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center">
                                            <h4>All form elements</h4>
                                        </div>
                                        <div className="card-body">
                                            <form className="form-horizontal">
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Normal</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Help text</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control"/><span className="text-small text-gray help-block-none">A block of help text that breaks onto a new line and may extend beyond one line.</span>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Password</label>
                                                    <div className="col-sm-10">
                                                        <input type="password" name="password" className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Placeholder</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" placeholder="placeholder" className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-lg-2 form-control-label">Disabled</label>
                                                    <div className="col-lg-10">
                                                        <input type="text" disabled="" placeholder="Disabled input here..." className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Checkboxes and radios
                                                    <br/><small className="text-primary">Normal Bootstrap elements</small></label>
                                                    <div className="col-sm-10">
                                                        <div>
                                                            <input id="option" type="checkbox" value=""/>
                                                            <label htmlFor="option">Option one is this and that—be sure to include why it's great</label>
                                                        </div>
                                                        <div>
                                                            <input id="optionsRadios1" type="radio"  value="option1" name="optionsRadios"/>
                                                            <label htmlFor="optionsRadios1">Option one is this and that be sure to include why it's great</label>
                                                        </div>
                                                        <div>
                                                            <input id="optionsRadios2" type="radio" value="option2" name="optionsRadios"/>
                                                            <label htmlFor="optionsRadios2">Option two can be something else and selecting it will deselect option one</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Inline checkboxes</label>
                                                    <div className="col-sm-10">
                                                        <label className="checkbox-inline">
                                                        <input id="inlineCheckbox1" type="checkbox" value="option1"/> a
                                                        </label>
                                                        <label className="checkbox-inline">
                                                        <input id="inlineCheckbox2" type="checkbox" value="option2"/> b
                                                        </label>
                                                        <label className="checkbox-inline">
                                                        <input id="inlineCheckbox3" type="checkbox" value="option3"/> c
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Checkboxes &amp; radios
                                                    <br/><small className="text-primary">Custom elements</small></label>
                                                    <div className="col-sm-10">
                                                        <div className="i-checks">
                                                            <input id="checkboxCustom1" type="checkbox" value="" className="form-control-custom"/>
                                                            <label htmlFor="checkboxCustom1">Option one</label>
                                                        </div>
                                                        <div className="i-checks">
                                                            <input id="checkboxCustom2" type="checkbox" value=""  className="form-control-custom"/>
                                                            <label htmlFor="checkboxCustom2">Option two checked</label>
                                                        </div>
                                                        <div className="i-checks">
                                                            <input id="checkboxCustom" type="checkbox" value="" disabled="" checked="" className="form-control-custom"/>
                                                            <label htmlFor="checkboxCustom">Option three checked and disabled</label>
                                                        </div>
                                                        <div className="i-checks">
                                                            <input id="checkboxCustom3" type="checkbox" value="" disabled="" className="form-control-custom"/>
                                                            <label htmlFor="checkboxCustom3">Option four disabled</label>
                                                        </div>
                                                        <div className="i-checks">
                                                            <input id="radioCustom1" type="radio" value="option1" name="a" className="form-control-custom radio-custom"/>
                                                            <label htmlFor="radioCustom1">Option one</label>
                                                        </div>
                                                        <div className="i-checks">
                                                            <input id="radioCustom2" type="radio" checked="" value="option2" name="a" className="form-control-custom radio-custom"/>
                                                            <label htmlFor="radioCustom2">Option two checked</label>
                                                        </div>
                                                        <div className="i-checks">
                                                            <input id="radioCustom3" type="radio" disabled="" checked="" value="option2" className="form-control-custom radio-custom"/>
                                                            <label htmlFor="radioCustom3">Option three checked and disabled</label>
                                                        </div>
                                                        <div className="i-checks">
                                                            <input id="radioCustom4" type="radio" disabled="" name="a" className="form-control-custom radio-custom"/>
                                                            <label htmlFor="radioCustom4">Option four disabled</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Companies</label>
                                                    <div className="col-sm-10 mb-3">
                                                        <select onChange={this.handleChange}  name="account" className="form-control">
                                                            <option> --select company--</option>
                                                            { 
                                                                    (this.state.companies && this.state.companies.length > 0) && this.state.companies.map((company) => {
                                                                    return (<option value={company.company_name}> {company.company_name}</option>);
                                                                    })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">category</label>
                                                    <div className="col-sm-10 mb-3">
                                                        <select onChange={this.handleChange}  name="account" className="form-control">
                                                            <option> --select category--</option>
                                                            { 
                                                                (this.state.categories && this.state.categories.length > 0) && this.state.categories.map((category) => {
                                                                return (<option value={category.category_id}> {category.name}</option>);
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">thanas</label>
                                                    <div className="col-sm-10 mb-3">
                                                        <select onChange={this.handleChange}  name="account" className="form-control">
                                                            <option> --select thanas--</option>
                                                            { 
                                                                (this.state.thanas && this.state.thanas.length > 0) && this.state.thanas.map((thana) => {
                                                                return (<option value={thana.thana_id}> {thana.name}</option>);
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row has-success">
                                                    <label className="col-sm-2 form-control-label">Input with success</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control is-valid"/>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row has-danger">
                                                    <label className="col-sm-2 form-control-label">Input with error</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control is-invalid"/>
                                                        <div className="invalid-feedback">Please provide your name.</div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Control sizing</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-group">
                                                            <input type="text" placeholder=".input-lg" className="form-control form-control-lg"/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" placeholder="Default input" className="form-control"/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" placeholder=".input-sm" className="form-control form-control-sm"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Column sizing</label>
                                                    <div className="col-sm-10">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <input type="text" placeholder=".col-md-2" className="form-control"/>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input type="text" placeholder=".col-md-3" className="form-control"/>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="text" placeholder=".col-md-4" className="form-control"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"> </div>
                                                <div className="row">
                                                    <label className="col-sm-2 form-control-label">Material Inputs</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-group-material">
                                                            <input id="register-username" type="text" name="registerUsername" required="" className="input-material"/>
                                                            <label htmlFor="register-username" className="label-material">Username</label>
                                                        </div>
                                                        <div className="form-group-material">
                                                            <input id="register-email" type="email" name="registerEmail" required="" className="input-material"/>
                                                            <label htmlFor="register-email" className="label-material">Email Address </label>
                                                        </div>
                                                        <div className="form-group-material">
                                                            <input id="register-password" type="password" name="registerPassword" required="" className="input-material"/>
                                                            <label htmlFor="register-password" className="label-material">Password </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Input groups</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend"><span className="input-group-text">@</span></div>
                                                                <input type="text" placeholder="Username" className="form-control"/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control"/>
                                                                <div className="input-group-append"><span className="input-group-text">.00</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend"><span className="input-group-text">$</span></div>
                                                                <input type="text" className="form-control"/>
                                                                <div className="input-group-append"><span className="input-group-text">.00</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text">
                                                                        <input type="checkbox"/>
                                                                    </div>
                                                                </div>
                                                                <input type="text" className="form-control"/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text">
                                                                        <input type="radio"/>
                                                                    </div>
                                                                </div>
                                                                <input type="text" className="form-control"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">Button addons</label>
                                                    <div className="col-sm-10">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <button type="button" className="btn btn-info waves-effect waves-light">Go!</button>
                                                                </div>
                                                                <input type="text" className="form-control"/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control"/>
                                                                <div className="input-group-append">
                                                                    <button type="button" className="btn btn-info waves-effect waves-light">Go!</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 form-control-label">With dropdowns</label>
                                                    <div className="col-sm-10">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <button data-toggle="dropdown" type="button" className="btn btn-outline-secondary dropdown-toggle waves-effect waves-light">Action <span className="caret"></span></button>
                                                                <div className="dropdown-menu">
                                                                    <a href="# " className="dropdown-item">Action</a><a href="# " className="dropdown-item">Another action</a><a href="# " className="dropdown-item">Something else here</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a href="# " className="dropdown-item">Separated link</a>
                                                                </div>
                                                            </div>
                                                            <input type="text" className="form-control"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line"></div>
                                                <div className="form-group row">
                                                    <div className="col-sm-4 offset-sm-2">
                                                        <button type="submit" className="btn btn-secondary waves-effect waves-light">Cancel</button>
                                                        <button type="submit" className="btn btn-info waves-effect waves-light">Save changes</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                </div>
            );
        }
    }
export default form;