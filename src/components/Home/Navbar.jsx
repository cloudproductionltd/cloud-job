import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Axios from 'axios'
import Modal from 'react-bootstrap4-modal';
import { Link } from "react-router-dom";
const $ = window.$;
class Navbar extends Component {
    constructor() {
        super();
        this.radioChange = this.radioChange.bind(this)
        this.loginCheckedChange = this.loginCheckedChange.bind(this)
        this.state = {
            username:'',
            email: '',
            password: '',
            confirmPassword: '',
            role:'seeker',
            firstName:'',
            lastName : '',
            middleName : '',

            inValidUsername: '',
            inValidfirstname :'',
            inValidlastname:'',
            inValidEmail: '',
            inValidPassword: '',
            validConfirmPassword: '',
            matchWithPassword: 0,
            loginUsername:'',
            loginPassword :'',
            user: '',

            addForgetEmail:'',
            remember_me: 0,
            verify:''
        }
    }


    componentDidMount () {
        const nav = document.querySelector('nav');
        const navTop = nav.offsetTop;
        function handleScroll() {
            if (window.scrollY > navTop) {
                nav.classList.add('fixed-nav');
                document.body.style.paddingTop = nav.offsetHeight+'px';
            } else {
                nav.classList.remove('fixed-nav');
                document.body.style.paddingTop = 0;
            }
        }
        window.addEventListener('scroll', handleScroll);
        document.getElementById('item');
    }

    Register =  (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    radioChange(e) {
        this.setState({
            role: e.currentTarget.value
        });
    }

    loginCheckedChange(e){
    
        this.setState(prevState => ({
            remember_me: !prevState.remember_me,
        }));
    }

    login = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    logout = (e) =>{
        sessionStorage.clear();
        this.props.history.push('/');
    }

    resetPasswordSubmit = ( e ) => {
        
        e.preventDefault();
        let { addForgetEmail } = this.state

        Axios.post(`/auth/forgot-password `,
        {
            email: addForgetEmail
        })
        .then((result) => {
            console.log('result',result.data.user)
            
            if(result.data.user === null){
                this.setState({
                    notHaveAnyMail : 'Your mail does not match with our records'
                })
            }else{
                $('#ForgetPassword').modal('hide');
                this.setState({
                    modal : 'Success'
                })
            }
        })
        .catch((error)=> {
            
        })
    }
        
    registerSubmit = (e, history) => {
        e.preventDefault();
        let checkpassword = 1
        const { username, email, password, confirmPassword, role, firstName,  lastName ,middleName , errorUsernameMassage, errorEmailMassage, inValidUsername, inValidfirstname, inValidlastname, inValidEmail, inValidPassword, validConfirmPassword, matchWithPassword }  = this.state
        this.setState({
            inValidUsername: username  ? '': "",
            inValidfirstname : firstName ? '' :"",
            inValidlastname : lastName ? '' : "",
            inValidEmail: email ? '':'',
            inValidPassword: password ? '':'',
            validConfirmPassword: confirmPassword ? '':'error',
            matchWithPassword : password !== confirmPassword ? 1:0 
        })
        if (password !== confirmPassword){
            checkpassword = 0
        }

        let authuser = new Object()
            if(firstName){
                authuser.firstname=firstName
            }
            if(lastName){
                authuser.lastname=lastName
            }
            if(middleName){
                authuser.middlename=middleName
            }
            if(email){
                authuser.email=email
            }
            if(password){
                authuser.password=password
            }
            if(role){
                authuser.role=role
            }



        if(checkpassword){
            Axios.post(`auth/signup`,authuser)
            .then((result) => {
                this.setState({
                    show : 'success',
                });
            })
            .catch((error)=> {
                this.setState({
                    inValidUsername : error.response.data.messages.username,
                    inValidfirstname : error.response.data.messages.firstname,
                    inValidlastname : error.response.data.messages.lastname,
                    inValidEmail : error.response.data.messages.email,
                    inValidPassword : error.response.data.messages.password
                });
            })
    
            this.props.history.push('/');
        }
        
    }


    loginSubmit = ( e , history ) => {

        e.preventDefault();
        
        const { loginUsername, loginPassword, inValidUsername, inValidPassword , remember_me}  = this.state

        this.setState({
            inValidUsername : loginUsername  ? '':'',
            inValidPassword : loginPassword ? '':'',
        
        })

        let userInfo = {}
        if(loginUsername){
            userInfo.email=loginUsername
        } 
        if(loginPassword){
            userInfo.password=loginPassword
        }
        if(remember_me){
            userInfo.rememberme=1
        } 

        Axios.post(`auth/signin`,userInfo
        )
        .then((result) => {

        

            if ( result.data.profile.educations.length == 0 ||  result.data.profile.personal.firstName == null ){
                window.sessionStorage.setItem('allowForApply', 0);
            }else{
                window.sessionStorage.setItem('allowForApply', 1);
            }

            if(result.data.profile.adminVerificationforUser == 0){
                window.sessionStorage.setItem('adminVerificationForJobseeker', 0);
            }else{
                window.sessionStorage.setItem('adminVerificationForJobseeker', 1);
            }
            
            this.setState({
                show : ''
            });

            this.setState({ user: result.data.profile});
            window.sessionStorage.setItem('loggedInUserId', result.data.profile._id);
            window.sessionStorage.setItem('user', JSON.stringify(result.data.profile))
            window.sessionStorage.setItem('loggedInUserId', result.data.profile._id);
            window.sessionStorage.setItem('hasCompany', JSON.stringify(result.data.hasCompany))
            window.sessionStorage.setItem('CompanyPendingStatus',result.data.pending_company)
            window.sessionStorage.setItem('cool-jwt', result.data.token);
            window.sessionStorage.setItem('user_id', result.data.profile._id);
            window.sessionStorage.setItem('user_role', result.data.profile.role);  
            window.sessionStorage.setItem('user_name', result.data.profile.local.username); 
            window.sessionStorage.setItem('navbarActive', 'Personal');        //// this session item create for page render in personal details page dashborad to open personal deteils section
            window.sessionStorage.setItem('subNavbarActive', 'Personal Details');
            if(result.data.hasCompany){
                window.sessionStorage.setItem('company_id', result.data.hasCompany._id);
            }
            
            if(result.data.profile.verified == 0){
                sessionStorage.clear();
                this.setState({
                    verify :'verify'
                })
                this.props.history.push('/');
            }else{

                if(  result.data.profile.role =='seeker' && result.data.profile.personal.birthDate === null   ){
                    this.props.history.push('/profile-create');
                }else{
                    if( window.sessionStorage.getItem('user_role') === 'recruiter'){
                        if( result.data.hasCompany === null && result.data.pending_company == 0){
                            this.props.history.push('/recruiter/company/add');
                        }else if(result.data.pending_company == 1 ){
                            this.props.history.push('/recruiter/company/pending');
                        }
                        else{
                            window.sessionStorage.setItem('user_data',JSON.stringify(result.data)); 
                            this.props.history.push('/recruiterjobs');
                        }
                    }else if(window.sessionStorage.getItem('user_role') == 'admin'){
                        this.props.history.push('/admindashboard');
                    }else{
                        this.props.history.push('/profile-edit');
                    }
                }
            }

        })
        .catch((error)=> {
            if (error.response.status == 401){
                this.setState({
                    unauthorized : 'Invalid email address or password'
                })
            }else{
                this.setState({
                        inValidUsername : error.response.data.messages.email,
                        inValidPassword : error.response.data.messages.password
                    });
            }
        })

    }

    openModal(modal) {
        this.setState({
            show : modal
        });
    
    }
    closeModal(){
        console.log(123)
    }
    openModalForReRegister(modal){
        $('#ForgetPassword').modal('hide');
        this.setState({
            show : modal
        });
    }

    closeModal() {
        this.setState({
            show : '',
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            inValidUsername: '',
            inValidfirstname :'',
            inValidlastname:'',
            inValidEmail: '',
            inValidPassword: '',
            validConfirmPassword: '',
            matchWithPassword: '',
            loginUsername:'',
            loginPassword :'',
            unauthorized:'',
            modal:'',
            verify:''
        });
    }
    render() {
        
        const styles ={
            classOne : {
            },

            classTwo : {
                
            },

            classThree: {
                
            }
        }

        const navbarClass = Object.assign({},
            styles.classOne,
            styles.classTwo, 
            styles.classThree
            )

        let jobpost_button

        let admin_dashboard 
        
        let user_dashboard


        if ( window.sessionStorage.getItem('user_role') == 'recruiter' ) {

            jobpost_button =  <div>
                                        <li className="nav-item">
                                        <Link to='/recruiter/jobs/add'>  <a className="btn btn-success btn-rounded signup-btn" type="button"><i className="fas fa-plus-circle btn-plus"></i>    Post a Job  </a></Link>
                                        </li>
                                    </div>
        }    
        
        
        if ( window.sessionStorage.getItem('user_role') == 'recruiter' ) {

            admin_dashboard =  <div>
                                        <li className="nav-item">
                                        <Link to='/recruiterjobs'> <a className="btn btn-outline-success btn-rounded signup-btn" type="button">  Dashboard  </a> </Link>
                                        </li>
                                    </div>
        }    

        if ( window.sessionStorage.getItem('user_role') == 'admin' ) {

            admin_dashboard =  <div>
                                        <li className="nav-item">
                                        <Link to='/admindashboard'> <a className="btn btn-outline-success btn-rounded signup-btn" type="button">   Dashboard  </a> </Link>
                                        </li>
                                    </div>
        }  

        if ( window.sessionStorage.getItem('user_role') == 'seeker' ) {

            user_dashboard =  <div>
                                        <li className="nav-item">
                                        <Link to='/profile-edit'> <a className="btn btn-outline-success btn-rounded signup-btn" type="button">   Dashboard  </a> </Link>
                                        </li>
                                    </div>
        } 

        let { errors } = this.state

        let errormassages

        let  authenticatebutton 

        if(!window.sessionStorage.getItem('cool-jwt')){
            authenticatebutton =   <ul className="navbar-nav ml-auto nav-right-cont">
                                    <li className="icon-user">
                                    <a className="btn btn-success btn-md btn-rounded" href="# " data-toggle="modal" onClick={() => this.openModal('login')}>Login</a>
                                    </li>
                                   
                                    <li className="icon-user-plus">
                                        <a className="btn btn-outline-success btn-md btn-rounded" href="# " data-toggle="modal" onClick={() => this.openModal('signup')}>Register</a>
                                    </li>
                                    {jobpost_button}

                                    {admin_dashboard}

                                    {user_dashboard}
                                </ul>


        }else{
            authenticatebutton = <ul className="navbar-nav ml-auto nav-right-cont">
                                    <li className="nav-item">
                                        <a className="btn btn-success btn-md btn-rounded" href="# "  onClick={() => this.logout()}>logout</a>
                                    </li>
                                    {jobpost_button}

                                    {admin_dashboard}

                                    {user_dashboard}
                                </ul>
        }
        let browsejobs = ''
        if ( window.sessionStorage.getItem('user_role') !== 'recruiter' ) { 
            browsejobs=    <ul className="navbar-nav browse-job-ul">
                                <li className="nav-item">
                                    <Link to="/jobs" className="nav-link">Find Jobs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/errror/page" className="nav-link">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/errror/page" className="nav-link">Recruiter</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/errror/page" className="nav-link">Jobseeker</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/errror/page" className="nav-link">Events</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/errror/page" className="nav-link">FAQ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link">Contact Us</Link>
                                </li>
                            </ul>
        }
        return (
        <div className="cmModalWidth">
                <div className="topListWrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 leftLit">
                            <ul className="list-inline">
                            <li className="list-inline-item">
                                Email - cloudpro@gmail.com
                            </li>
                            <li className="list-inline-item">
                                Address - Mirpur DOHS, Dhaka Bangladesh
                            </li>
                            <li className="list-inline-item">
                                Contact No - 01712872021
                            </li>
                        </ul>
                            </div>
                            <div className="col-md-3 rightLit">
                            <div className="headerSnsIcon">
                                    <a className="btn-floating btn-sm btn-sns" href=" " type="button" role="button"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn-floating btn-sm btn-sns" href=" " type="button" role="button"><i className="fab fa-instagram"></i></a>
                                    <a className="btn-floating btn-sm btn-sns" href=" " type="button" role="button"><i className="fab fa-twitter"></i></a>
                                    <a className="btn-floating btn-sm btn-sns" href=" " type="button" role="button"><i className="fab fa-pinterest-p"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-md navbar-inverse container-fluid" id="nav">
                    <div className="top-menu container">
                        <Link to='/' className="navbar-brand logo" style={navbarClass}>
                        Cloud <span className="logo-span">Job</span></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse right-item" id="navbarSupportedContent">
                            {browsejobs}
                            {authenticatebutton}
                        </div>
                    </div>
                </nav>
            <Modal visible={ this.state.show === 'login' ? true : false}>
            <div className="card">
                
                <form onSubmit = { this.loginSubmit }  id="loginForm" action="" method="post">
                    <h5 className="card-header light-green login-card white-text text-center py-3">
                        <a href=" s" className="active" id="login-form-link">Login</a>
                        <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                    <div className="form-wrapper-login">
                        <div className="md-form">
                            <i className={this.state.loginUsername ? "fas fa-envelope prefix  active" : "fas fa-envelope prefix"}></i>
                            <input type="text" id="mLoginFormUsername"  name="loginUsername" className="form-control" value={this.state.loginUsername} onChange={this.login}/>
                            <label htmlFor="mLoginFormUsername"  className= {this.state.loginUsername ? "active required":'required' }>Email Address</label>
                            
                            {this.state.inValidUsername  ? <span className="help-block text-danger error-message">{this.state.inValidUsername }</span>:'' }
                            {this.state.unauthorized  ? <span className="help-block text-danger error-message">{this.state.unauthorized }</span>:'' }
                        </div>
                        <div className="md-form has-error">
                            <i className={this.state.loginPassword ? "fas fa-key prefix  active" : "fas fa-key prefix"} ></i>
                            <input type="password" id="mLoginPassword" name="loginPassword" className="form-control"  value={this.state.loginPassword} onChange={this.login} />
                            <label htmlFor="mLoginPassword"  className= {this.state.loginPassword ? "active required":'required' }>Password</label>
                            
                            {this.state.inValidPassword ? <span className="help-block text-danger error-message"> {this.state.inValidPassword.replace(/"password"/g, 'Password')}</span>:'' }
                        </div>
                        <div className="d-flex justify-content-around">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" checked={this.state.remember_me} name ='remember_me' id="defaultUnchecked" onChange={this.loginCheckedChange} />
                                <label className="custom-control-label" htmlFor="defaultUnchecked">Remember Me</label>
                            </div>
                            <div className="forgetPassCl">
                                <a  href="# " data-toggle="modal" data-target="#ForgetPassword" id="forgetPass" onClick={() => this.openModal('forgot')}>Forget Password?</a>
                            </div>
                        </div>
                        <input type="submit" value='Sign in' className="btn btn-outline-success btn-rounded btn-block my-4"/>
                        <div className="row site-link">
                            <div className="col-md-12">
                                <p className="member-check">Not a member?
                                    <a  href="# " id="register_btn" onClick={() => this.openModal('signup')}>Register</a>
                                </p>
                                <p className="text-center">or sign in with:</p>
                                <div className="social-icon-wrapper">
                                    <a type="button" href="# " className="btn-floating btn-fb btn-sm">
                                    <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="# " type="button" className="btn-floating btn-tw btn-sm">
                                    <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="# " type="button" className="btn-floating btn-li btn-sm">
                                    <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="# " type="button" className="btn-floating btn-git btn-sm">
                                    <i className="fab fa-github"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </Modal>
            <Modal visible={ this.state.show ==='signup' ? true : false} onHide={(e) => this.closeModal(e)}>
                <div className="card">
                    <form  onSubmit={this.registerSubmit} id="signupForm"  method="post">
                        <h5 className="card-header light-green login-card white-text text-center py-3">
                        <a href="# " className="active" id="login-form-link">Registration</a>
                        <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </h5>
                       
                        <div className="form-wrapper-login">
                            <div className="form-row firstRow">
                           
                                <div className="col col-lg-4 col-md-4 col-12 ">
                                    <div className="md-form firstResname">
                                        <i className="fas fa-user prefix"></i>
                                        <input type="text" name = "firstName"  id="mRegisterFormUsername" className="form-control" value={this.state.firstName}  onChange={this.Register}/>
                                        <label htmlFor="mRegisterFormUsername"  className= {this.state.firstName ? "active required  first-namereg":'required  first-namereg' }>First Name</label>
                                        {this.state.inValidfirstname ? <span className="help-block text-danger error-message">{this.state.inValidfirstname.replace(/"firstname"/g, 'First name')} </span>:'' }
                                    </div>
                                </div>
                                <div className="col col-lg-4 col-md-4 col-12 ">
                                    <div className="md-form cmCommonname lastnameMd">
                                        <input type="text" name = "lastName"  id="mRegisterFormLastName" className="form-control" value={this.state.lastName}  onChange={this.Register}/>
                                        <label htmlFor="mRegisterFormLastName"  className="required">Last Name</label>
                                        {this.state.inValidlastname ? <span className="help-block text-danger error-message"> {this.state.inValidlastname.replace(/"lastname"/g, 'Last name')}</span>:'' }
                                    </div>
                                </div>
                                <div className="col col-lg-4 col-md-4 col-12 ">
                                    <div className="md-form cmCommonname middlenameMd">
                                        <input type="text" name = "middleName"  id="mRegisterFormMiddleName" className="form-control" value={this.state.middleName}  onChange={this.Register} />
                                        <label htmlFor="mRegisterFormMiddleName"  className=""> Middle Name</label>
                                    
                                    </div>
                                </div>
                            </div>
                            
                        <div className="md-form mt-0 emailMd">
                            <i className="fas fa-envelope prefix"></i>
                            <input type="email" name="email" id="mRegisterFormEmail" className="form-control" value={this.state.email} onChange={this.Register}/>
                            <label htmlFor="mRegisterFormEmail"  className= {this.state.email ? "active required":'required' }>Email Address</label>
                            {this.state.inValidEmail ? <span className="help-block text-danger error-message">{this.state.inValidEmail.replace(/"email"/g, 'Email')}</span>:'' }
                        </div>

                        <div className="md-form">
                            <i className="fas fa-key prefix"></i>
                            <input type="password" name="password" id="mRegisterFormPassword" className="form-control"  value={this.state.password} onChange={this.Register} />
                            <label htmlFor="mRegisterFormPassword" className= {this.state.password ? "active required":'required' }>Password</label>
                            {this.state.inValidPassword ? <span className="help-block text-danger error-message"> {this.state.inValidPassword.replace(/"password"/g, 'Password')}</span>:'' }
                        </div>

                        <div className="md-form">
                            <i className="fas fa-key prefix"></i>
                            <input type="password" name="confirmPassword" id="mRegisterFormConfirm-Password" className="form-control" value ={this.state.confirmPassword} onChange={this.Register} />
                            <label htmlFor="mRegisterFormConfirm-Password" className= {this.state.confirmPassword ? "active required":'required' }>Confirm Password</label>

                            {this.state.errorEmailMassage ? <span className="help-block text-danger error-message">{this.state.errorEmailMassage}</span>:'' }
                            {this.state.errorUsernameMassage ? <span className="help-block text-danger error-message">{this.state.errorUsernameMassage}</span>:'' }
                            {this.state.validConfirmPassword ? <span className="help-block text-danger error-message">This field is required</span>:'' }
                            {this.state.matchWithPassword ? <span className="help-block text-danger error-message">Password did not match </span>:'' }
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <p className="register-as">Register as</p>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" id="seeker" name="role" value='seeker' checked={this.state.role === 'seeker'} onChange={this.radioChange}  />
                                        <label className="custom-control-label" htmlFor="seeker">Jobseeker</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" id="recruiter" name="role" value='recruiter' checked={this.state.role === 'recruiter'} onChange={this.radioChange}/>
                                        <label className="custom-control-label" htmlFor="recruiter">Recruiter</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="form-group">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <input type="submit" value='Register Now' className="btn btn-outline-success btn-rounded btn-block register-now-btn"/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="member-check">Already have account?
                                <a  href="# " id="login_form_link" onClick={() => this.openModal('login')}>Login</a>
                            </p>
                        </div>
                    </form>
                    {errormassages}
                </div>
            </Modal>

            <Modal visible={ this.state.show ==='success' ? true : false}>
                <div className="card">
                    <form id="forgotForm" action="" method="post" >
                        <div className="alert alert-success user-success-message">
                            <strong>Success!</strong> A verification massage send to your email. Please confirm your verification    
                            <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            
            <div className="modal" id="ForgetPassword">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="card">
                            <form onSubmit={this.resetPasswordSubmit}  className="forgetpass" id="forget_pass_form" action="" method="post">
                                <h5 className="card-header light-green login-card white-text text-center py-3">
                                    <a  href="/forgot-password" className="active" id="login-form-link">Forget Password?</a>
                                    <button type="button" className="close common-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </h5>
                                <div className="form-wrapper-forgetpass">
                                    <div className="md-form">
                                        <i className="fas fa-envelope prefix"></i>
                                        <input type="email" name="addForgetEmail" id="AddForgetEmail" className="form-control" onChange={this.Register} />
                                        <label htmlFor="AddForgetEmail">Email Address</label>

                                        <span className="minchar_forgetpassword text-red"> {this.state.notHaveAnyMail ? this.state.notHaveAnyMail:''}</span>
                                    </div>
                                    
                                    <button type='submit' className="btn btn-outline-success btn-rounded btn-block my-4">Reset Password</button>
                                </div>
                                <div className="row site-link forgetpass-sitelink">
                                    <div className="col-md-12">
                                        <p className="member-check">Not a member?
                                            <a href="# " id="register_btn" onClick={() => this.openModalForReRegister('signup')}>Register</a>
                                        </p>
                                                <p className="text-center">or sign in with:</p>
                                        <div className="social-icon-wrapper">
                                            <a type="button" href="# " className="btn-floating btn-fb btn-sm">
                                            <i className="fab fa-facebook-f"></i>
                                            </a>
                                            <a href="# " type="button" className="btn-floating btn-tw btn-sm">
                                            <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="# " type="button" className="btn-floating btn-li btn-sm">
                                            <i className="fab fa-linkedin-in"></i>
                                            </a>
                                            <a href="# " type="button" className="btn-floating btn-git btn-sm">
                                            <i className="fab fa-github"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

           
        
            <Modal visible={ this.state.modal == 'success' ? true : false}>
                <div className="card">
                    <div className="alert alert-success user-success-message">
                        <strong>Password reset link has sent to your mail, Please check your mail ! </strong>   
                        <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </Modal>




            <Modal visible={ this.state.verify =='verify' ? true : false}>
                <div className="card">
                    <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                    </button>
                        <div className="alert alert-success user-success-message">
                            <strong> Please verify your account via your email. Thanks! </strong>   
                                <button type="button" className="close common-close success-close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>  
                        </div>
                </div>
            </Modal>
        
        </div>
        )
    }
}
export default withRouter(Navbar) ;