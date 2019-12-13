import React, { Component } from 'react';
import Axios from 'axios'
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Modal from 'react-bootstrap4-modal';

class AllCompanies extends Component {
    
    state = {
        companies:[],
        visible : false,
        company:''

    }

    componentDidMount(){
        Axios.get(`https://cloudjobs.herokuapp.com/companies`)
            .then(response => {
                console.log('companies', response.data.companies);
                this.setState({ companies:response.data.companies })
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
    }

    onSubmitUpdateCompanyInfo = (e) => {
        e.preventDefault();
        let newCompany = this.state.company;
        newCompany[e.target.name] = e.target.value;
        this.setState({
            company: newCompany 
        })
    }

    updateData = (e) => {
        e.preventDefault();

        const  { name, email , address , city, state, country, emergency_contact, logo, type, about, zip } = this.state;
        var company_id = this.state.company._id
        Axios.put(`https://cloudjobs.herokuapp.com/companies/${company_id}`,
            {
                name: name,
                email: email,
                address: address,
                city: city,
                state: state,
                country: country,
                emergency_contact: emergency_contact,
                logo: logo,
                type: type,
                about: about,
                zip: zip
            })
            .then((result) => {
            console.log('ddd',result)
            });
    }

    openModal(modal,company) {
        this.setState({
            show : modal,
            company:{
                name: company.name,
                email: company.email,
                address: company.address,
                city: company.city,
                state: company.state,
                country: company.country,
                emergency_contact: company.emergency_contact,
                logo: company.logo,
                type: company.type,
                about: company.about,
                zip: company.zip
            } 
        });
    }

    closeModal() {
        this.setState({
            show : '',
            company:{
                name: '',
                email: '',
                address: '',
                city: '',
                state: '',
                country: '',
                emergency_contact: '',
                logo: '',
                type: '',
                about: '',
                zip: ''
            }
        });
    }

    setcompany(company){
        this.setState({
            company : company
        });
    }

    openModalForEdit(edit){
        this.setState({
            edit : edit
        });
    }

    closeModalForEdit(edit){
        this.setState({
            edit : '',
        
        });
    }


    render() {
        let { companies } = this.state
        const companylist = companies.map((company)=>
            <tbody>
                <tr>
                    <th scope="row"> { company.logo ? <img className="table-img" alt="" src={ company.logo } /> : <img className="table-img" alt="" src="assets/images/nologo.png" />   } </th>
                        <td >
                            <h5 className="loop-item-title" data-toggle="modal" onClick={() => this.openModal('open', company)} > <a href="# ">{company.name}</a> </h5>
                            <p className="content-meta"><span className="job-company"><a href="# "> {company.email} </a></span> { company.web ?  <span className="job-type contract"><a href="# "><i className="fa fa-bookmark"></i>{company.web}</a></span> : null } { company.address ?  <span className="job-location"><i className="fa fa-map-marker"></i><a href="# "><em>{company.address}</em></a></span> : null }  { company.city ? <span> <time className="entry-date" datetime="2015-08-18T01:40:23+00:00">  <i  className="fa fa-calendar" ></i> {company.city} </time></span> : null  }</p>
                        </td>
                    <td><button className="btn btn-success btn-rounded view-more waves-effect waves-light">View jobs</button></td>
                </tr>
            </tbody>
        );

        return (
            <div>
                <Navbar/>
                    <section className="top-job common-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="headline">
                                        <h2 className="title">We found available companies(s) for you</h2>
                                    </div>
                                    <table className="table table-borderless job-details-table">
                                    {companylist}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Modal visible={ this.state.show ==='open' ? true : false} backdrop="static">
                        <div className="card">
                            
                                <h5 className="card-header gray-color login-card white-text text-center py-4">
                                    <a href="# " className="active" id="login-form-link">About Company</a>
                                    <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </h5>
                                <div className="form-wrapper-login">
                                        <div>
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                <th scope="col">company name</th>
                                                <th scope="col"> company email</th>
                                                <th scope="col"> company web</th>
                                                <th scope="col"> company address</th>
                                                <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td >{this.state.company.name}</td>
                                                    <td>{this.state.company.email}</td>
                                                    <td>{this.state.company.web}</td>
                                                    <td>{this.state.company.address}</td>
                                                    <td> <div className="edit-btn" data-toggle="modal" data-target="#modal-one"><i className="fas fa-pencil-alt" onClick={() => this.openModalForEdit('edit')}></i></div></td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                </div>
                        </div>
                    </Modal>
                    <Modal visible={ this.state.edit ==='edit' ? true : false} backdrop="static">
                        <div className="card">
                            <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModalForEdit()}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <form   onSubmit={this.updateData}  id="loginForm" action="" method="post" >
                                <h5 className="card-header gray-color login-card white-text text-center py-4">
                                    <a href="# " className="active" id="login-form-link">Edit company profile</a>
                                </h5>
                                <div className="form-wrapper-login">
                                    <div className="md-form">
                                        <i className={this.state.company.name ? 'fas fa-industry prefix active':'fas fa-industry prefix' }></i>
                                        <input type="text" name="name"  value= {this.state.company.name} onChange={this.onSubmitUpdateCompanyInfo} className="form-control" />
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.name ?'active':''}>company name</label>
                                    </div>
                                    <div className="md-form">
                                        <i className="fas fa-envelope prefix "></i>
                                        <i className={this.state.company.email ? 'fas fa-envelope prefix active':'fas fa-envelope prefix' }></i>
                                        <input type="text" name="email" value= {this.state.company.email}  onChange={this.onSubmitUpdateCompanyInfo}  className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.name ?'active':''}>email</label>
                                    </div>
                                    <div className="md-form">
                                        <i className={this.state.company.address ? 'fas fa-map-marked-alt prefix active':'fas fa-map-marked-alt prefix' }></i>
                                        <input type="text" name="address" value= {this.state.company.address}  onChange={this.onSubmitUpdateCompanyInfo}  className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.address ?'active':''}>address</label>
                                    </div>
                                    <div className="md-form">
                                        <i className={this.state.company.city ? 'fas fa-city prefix active':'fas fa-city prefix' }></i>
                                        <input type="text" name="city"   value= {this.state.company.city}  onChange={this.onSubmitUpdateCompanyInfo} className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.city ?'active':''}>city</label>
                                    </div>
                                    <div className="md-form">
                                        <i className={this.state.company.state ? 'fas fa-flag-usa prefix active':'fas fa-flag-usa prefix' }></i>
                                        <input type="text" name="state"   value= {this.state.company.state}  onChange={this.onSubmitUpdateCompanyInfo} className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.state ?'active':''} >state</label>
                                    </div>
                                    <div className="md-form">
                                        <i className={this.state.company.country ? 'fas fa-globe-europe prefix active':'fas fa-globe-europe prefix' }></i>
                                        <input type="text" name="country"  value= {this.state.company.country}  onChange={this.onSubmitUpdateCompanyInfo}  className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.country ?'active':''}>country</label>
                                    </div>
                                    <div className="md-form">
                                        <i className={this.state.company.emergency_contact ? 'fas fa-address-book prefix active':'fas fa-address-book prefix' }></i>
                                        <input type="text" name="emergency_contact"  value= {this.state.company.emergency_contact}  onChange={this.onSubmitUpdateCompanyInfo}  className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.emergency_contact ?'active':'' }>emergency contact</label>
                                    </div>
                                    <div className="md-form">
                                        <i className={this.state.company.logo ? 'far fa-eye prefix active':'far fa-eye prefix' }></i>
                                        <input type="text" name="logo" value= {this.state.company.logo}  onChange={this.onSubmitUpdateCompanyInfo} className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.logo ?'active':'' }>logo</label>
                                    </div>
                                    <div className="md-form">
                                        <i className={this.state.company.type ? 'fas fa-layer-group prefix active':'fas fa-file-prescription prefix' }></i>
                                        <input type="text" name="type" value= {this.state.company.type}  onChange={this.onSubmitUpdateCompanyInfo}  className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.type ?'active':'' }>type</label>
                                    </div>
                                    <div className="md-form">
                                        <i className ={this.state.company.about ?'fas fa-file-prescription prefix active':'fas fa-file-prescription prefix' }></i>
                                        <input type="text" name="about" value= {this.state.company.about}  onChange={this.onSubmitUpdateCompanyInfo}  className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.about ?'active':'' }> about</label>
                                    </div>
                                    <div className="md-form">
                                        <i className ={this.state.company.zip ?'far fa-file-archive prefix active':'far fa-file-archive prefix' }></i>
                                        <input type="text" name="zip" value= {this.state.company.zip}  onChange={this.onSubmitUpdateCompanyInfo} className="form-control"/>
                                        <label htmlFor="materialLoginFormUsername" className ={this.state.company.zip ?'active':'' }>zip</label>
                                    </div>
                                </div>
                                <button className="btn btn-success btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">update</button>
                            </form>
                        </div>
                    </Modal>
                <Footer/>    
            </div>
        );
    }
}
export default AllCompanies;