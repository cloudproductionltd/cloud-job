import React, { Component } from 'react';
import Axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import Modal from 'react-bootstrap4-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormValidator from './../../helpers/FormValidator';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const $ = window.$;
class AddressAdd extends Component {

    constructor(props) {
        super(props);
        this.setCurrentCountryChange = this.setCurrentCountryChange.bind(this)
        this.setInputValueToState = this.setInputValueToState.bind(this)
        this.onSubmitUpdateAddress = this.onSubmitUpdateAddress.bind(this)
        this.validator = new FormValidator([
			{
				field: 'current_city', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'current city is required.'
            },{
                field: 'current_country', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'current country is required.'
            },
            {
                field: 'permanent_city', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'permanent city is required.'
            },{
                field: 'permanent_country', 
				method: 'isEmpty', 
				validWhen: false, 
				message: 'permanent country is required.'
            }
            
        ]);

        this.state = {
            current_city: '',
            current_country: '',
            prefecture:'',
            currentAddressDetails:'',
            permanentAddressDetails:'',
			permanent_city: '',
            permanent_country: '',
            permanentPrefecture:'',
            validation: this.validator.valid(),
			error:{},
        }
        this.submitted = false;
    }

    selectCountry (val) {
        this.setState({ current_country: val });
    }
    selectRegion (val) {
        this.setState({ current_city: val });
    }

    selectRegionForPermanentCity (val) {
        this.setState({ permanent_city: val });
    }

    selectPermanentCountry(val) {
        this.setState({ permanent_country: val });
    }
    setInputValueToState(e){
		this.setState({ [e.target.name]: e.target.value } );
		
    }

    setCurrentCountryChange(e){
        this.setState({ [e.target.name]: e.currentTarget.value } );
    }

    componentDidMount(){ 
        var user_id = (window.sessionStorage.getItem('user_id'));
        var token = (window.sessionStorage.getItem('cool-jwt'));
            Axios.get(`/users/${user_id}`,
            { headers: { Authorization: `${token}` }
            
            })
            .then(response => {
                console.log('response of address',response)
                this.setState( 
                        { 
                            ////address info
                            current_city: response.data.response.user ? response.data.response.user.address.current_city :'',
                            current_country : response.data.response.user.address ? response.data.response.user.address.current_country :'',
                            prefecture: response.data.response.user.address ? response.data.response.user.address.prefecture :'',
                            currentAddressDetails :  response.data.response.user.address ? response.data.response.user.address.currentAddressDetails :'',

                            permanentAddressDetails: response.data.response.user.address ? response.data.response.user.address.permanentAddressDetails :'',
                            permanent_country: response.data.response.user.address ? response.data.response.user.address.permanent_country :'',

                            permanent_city: response.data.response.user.address ? response.data.response.user.address.permanent_city :'',
                            permanentPrefecture : response.data.response.user.address ? response.data.response.user.address.permanentPrefecture :''

                        })
            })
            .catch(error => {
                console.log('error',error)
            })
    }

    closeModal() {
        this.setState({
            modal : '',
        });
        window.location.reload()
    }

    onSubmitUpdateAddress = (e) =>{


        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });

        if(  validation.isValid == false){
            this.submitted = false;
        }else{
            this.submitted = true;
            var user_id = (window.sessionStorage.getItem('user_id'));
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('cool-jwt')
            }
            const { current_city, current_country,currentAddressDetails,permanentAddressDetails, prefecture, permanentPrefecture,  permanent_city, permanent_country,   permanent_zipcode  } = this.state;
            let address = new Object()
            if(current_city){
                address.current_city = current_city
            }
            if(current_country){
                address.current_country = current_country
            }
            
            
            if(prefecture){
                address.prefecture = prefecture
            }

            if(currentAddressDetails){
                address.currentAddressDetails = currentAddressDetails
            }
            
            if(permanentAddressDetails){
                address.permanentAddressDetails = permanentAddressDetails
            }

            if(permanent_city){
                address.permanent_city = permanent_city
            }
            if(permanent_country){
                address.permanent_country = permanent_country
            }

            
            if(permanentPrefecture){
                address.permanentPrefecture = permanentPrefecture
            }
        
            Axios.put(`/users/address/${user_id}`,address
                ,{headers: headers})
                    .then((result) => {

                        
                        window.sessionStorage.setItem('user', JSON.stringify(result.data.response.user))
                        $('#modal-one').modal('hide');
                        this.setState({ user: result.data.response.user , 
                            modal : 'success',
                        })
                        // window.location.reload()
                        //this.forceUpdate();

                    }).catch((error) =>{

                        
                        this.setState({
                            modal : '',
                        })
                    });
        }
        
    }
    

    
    render() {

        let { current_country, permanent_country } = this.state
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state
        // console.log(validation)
        return(
            <div>
                <div className="modal fade" id="modal-one" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="card">
                                <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                                <h5 className="card-header profile-edit-modal-header white-text text-center gray-color">Address Details</h5>
                                <div className="card-body px-lg-5 pt-0">
                                    <form onSubmit={this.onSubmitUpdateAddress } className="resume-editForm">
                                        <div className="form-row">
                                        <div className="col">
                                                {/* <p className="cm-address">Current Address</p> */}
                                                <div className="form-group">
                                                    <label className="required">Current Address</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                        </div>
                                                        <CountryDropdown className={validation.current_country.message ? "form-control is-invalid": "form-control"}
                                                            value={current_country}
                                                            onChange={(val) => this.selectCountry(val)} 
                                                        />
                                                        <div className="invalid-feedback">{validation.current_country.message }</div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="required invisibleDispaly">Region</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                        </div>
                                                        {/* <input type="text" placeholder="Region" id="materialRegisterFormCity" value={this.state.current_city} name="current_city"   onChange={this.setInputValueToState} className={validation.current_city.message ? "form-control is-invalid": "form-control"}/>
                                                         */}
                                                        <RegionDropdown className={validation.current_city.message ? "form-control is-invalid": "form-control"}
                                                                country={current_country}
                                                                value={this.state.current_city}
                                                                onChange={(val) => this.selectRegion(val)} 
                                                            />  
                                                        <div className="invalid-feedback">{validation.current_city.message}</div>
                                                    </div>
                                                    {/* <i className = {this.state.current_city ? "fas fa-city prefix active" : "fas fa-city prefix"} ></i>
                                                    <input type="text" id="materialRegisterFormCity" value={this.state.current_city} name="current_city"   onChange={this.setInputValueToState} className={validation.current_city.message ? "form-control is-invalid": "form-control"}/>
                                                    <label htmlFor="materialRegisterFormCity" class= {this.state.current_city ? "active required" : "required" }>City</label>
                                                    <div className="invalid-feedback">{validation.current_city.message}</div> */}
                                                </div>
                                                <div className="form-group">
                                                    <label className="required invisibleDispaly">Prefecture</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                            </div>
                                                            <input type="text" placeholder="Prefecture" id="materialRegisterFormPermanentZipCod"  name="prefecture" value ={this.state.prefecture} onChange={this.setInputValueToState} className="form-control"/>
                                                        </div>
                                                    {/* <i className = { this.state.prefecture ? "fas fa-map-pin prefix active" : "fas fa-map-pin prefix"} ></i>
                                                    <input type="text" id="materialRegisterFormPermanentZipCod"  name="prefecture" value ={this.state.prefecture} onChange={this.setInputValueToState} className="form-control"/>
                                                    <label htmlFor="materialRegisterFormPermanentZipCod" class= {this.state.prefecture ? "active" : "" } >Prefecture</label> */}
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label className="required invisibleDispaly">Current Address Details</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                            </div>
                                                            <input type="text" placeholder="Current Address Details" id="materialRegisterFormPermanentZipCod"  name="currentAddressDetails" value ={this.state.currentAddressDetails} onChange={this.setInputValueToState} className="form-control"/>
                                                        </div>
                                                    {/* <i className = { this.state.prefecture ? "fas fa-map-pin prefix active" : "fas fa-map-pin prefix"} ></i>
                                                    <input type="text" id="materialRegisterFormPermanentZipCod"  name="prefecture" value ={this.state.prefecture} onChange={this.setInputValueToState} className="form-control"/>
                                                    <label htmlFor="materialRegisterFormPermanentZipCod" class= {this.state.prefecture ? "active" : "" } >Prefecture</label> */}
                                                </div>
                                            </div>
                                            <div className="col">
                                                {/* <p className="cm-address">Current Address</p> */}
                                                <div className="form-group">
                                                    <label className="required">Permanent Address</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fab fa-font-awesome-flag"></i></span>
                                                        </div>
                                                        <CountryDropdown className={validation.permanent_country.message ? "form-control is-invalid": "form-control"}
                                                                value={permanent_country}
                                                                onChange={(val) => this.selectPermanentCountry(val)} 
                                                            />
                                                    <div className="invalid-feedback">{validation.permanent_country.message }</div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="required invisibleDispaly">Region</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                        </div>
                                                        {/* <input type="text" placeholder="Region" id="materialRegisterFormpermanentCity"  name="permanent_city" value ={this.state.permanent_city} onChange={this.setInputValueToState} className={validation.permanent_city.message ? "form-control is-invalid": "form-control"}/>
                                                         */}
                                                        <RegionDropdown className={validation.permanent_city.message ? "form-control is-invalid": "form-control"}
                                                                country={permanent_country}
                                                                value={this.state.permanent_city}
                                                                onChange={(val) => this.selectRegionForPermanentCity(val)} 
                                                            />  
                                                        
                                                        <div className="invalid-feedback">{validation.permanent_city.message}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="required invisibleDispaly">Prefecture</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                            </div>
                                                            <input type="text" placeholder="prefecture" id="materialRegisterFormPermanentZipCod"  name="permanentPrefecture" value ={this.state.permanentPrefecture} onChange={this.setInputValueToState} className="form-control"/>
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-group">
                                                    <label className="required invisibleDispaly">Permanent Address Details</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                                                            </div>
                                                            <input type="text" placeholder="Permanent Address Details" id="materialRegisterFormPermanentZipCod"  name="permanentAddressDetails" value ={this.state.permanentAddressDetails} onChange={this.setInputValueToState} className="form-control"/>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                
                                                
                                                
                                            {/* <div className="col">
                                                <p className="cm-address">Permanent Address</p>
                                                <div className="md-form">
                                                    <i className="fab fa-font-awesome-flag prefix"></i>
                                                
                                                    <CountryDropdown className={validation.permanent_country.message ? "form-control is-invalid cmapi": "form-control cmapi"}
                                                                value={permanent_country}
                                                                onChange={(val) => this.selectPermanentCountry(val)} 
                                                            />
                                                    <div className="invalid-feedback">{validation.permanent_country.message }</div>
                                            
                                                </div>
                                                
                                                <div className="md-form">
                                                    <i className= { this.state.permanent_city ?  "fas fa-city prefix active" : "fas fa-city prefix"}></i>
                                                    <input type="text" id="materialRegisterFormpermanentCity"  name="permanent_city" value ={this.state.permanent_city} onChange={this.setInputValueToState} className={validation.permanent_city.message ? "form-control is-invalid": "form-control"}/>
                                                    <label htmlFor="materialRegisterFormpermanentCity" class= {this.state.permanent_city ? "active required" : "required" }>City</label>
                                                    <div className="invalid-feedback">{validation.permanent_city.message}</div>
                                                </div>
                                                <div className="md-form">
                                                    <i className = { this.state.permanentPrefecture ? "fas fa-map-pin prefix active" : "fas fa-map-pin prefix"} ></i>
                                                    <input type="text" id="materialRegisterFormPermanentZipCod"  name="permanentPrefecture" value ={this.state.permanentPrefecture} onChange={this.setInputValueToState} className="form-control"/>
                                                    <label htmlFor="materialRegisterFormPermanentZipCod" class= {this.state.permanentPrefecture ? "active" : "" } > Prefecture</label>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="text-center profile-edit-modal-btn">
                                            <button type="submit" className="btn btn-success btn-rounded waves-effect waves-light" aria-label="Close">Update</button>
                                            <button type="reset" className="btn btn-light btn-rounded waves-effect waves-light" data-dismiss="modal">Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal visible={ this.state.modal == 'success' ? true : false}>
                    <div className="card">
                        <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                            <div className="alert alert-success user-success-message">
							<strong>Address Details saved successfully!</strong>   
							</div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddressAdd;