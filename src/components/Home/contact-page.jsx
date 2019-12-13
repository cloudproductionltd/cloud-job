import React, { Component } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';


class ContactPage extends Component {
    

    
    render() {
        return (
            <div>
                <Navbar/>
                
                <div id="map-container-google-2" className="z-depth-1-half map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d246693.25784818627!2d139.68370989351536!3d35.66961809735265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sjp!4v1569830177636!5m2!1sen!2sjp" frameborder="0"
                    allowfullscreen></iframe>
                </div>
               
                
                <section className="counting-section contactPage-Section">
            <div className="container">
                <div className="page-info page-info-lite rounded">
                   
                        <div className="row contactPageInside">
                           
                            <div className="col-sm-12 col-12 col-md-4 col-lg-4">
                                <div className="iconbox-wrap cm-iconbox">
                                    <div className="iconbox">
                                        <div className="iconbox-wrap-icon cm-iconboxInside">
                                            <i className="fas fa-map-marker"></i>
                                        </div>
                                        <div className="iconbox-wrap-content leftContIcon">
                                           
                                            <div className="iconbox-wrap-text">Address</div>
                                            <p>Mirpur DOHS, Road No: 12, Avenue: 03, House No: 854</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12 col-md-4 col-lg-4">
                                <div className="iconbox-wrap cm-iconbox">
                                    <div className="iconbox">
                                    <div className="iconbox-wrap-icon cm-iconboxInside">
                                        <i className="fas fa-phone-volume"></i>
                                    
                                        </div>
                                        <div className="iconbox-wrap-content leftContIcon">
                                            <div className="iconbox-wrap-text">Phone No<p>01712872021</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12 col-md-4 col-lg-4">
                                <div className="iconbox-wrap cm-iconbox">
                                    <div className="iconbox">
                                        <div className="iconbox-wrap-icon cm-iconboxInside">
                                        <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="iconbox-wrap-content leftContIcon">
                                            
                                            <div className="iconbox-wrap-text">Email Address<p>Cloud854@gmail.com</p></div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                
            </div>
        </section>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="titleconWrap" align="center">
                        <h3>Contact Us</h3>
                        <p>Feel free to contact with us. We are here always at your service.</p>
                    </div>
                <form className="contactFormCont">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="name">
                                Name</label>
                            <input type="text" className="form-control" id="" placeholder="Example : Tanaka Daro" required="required" />
                        </div>
                        <div className="form-group">
                            <label for="email">
                                Email Address</label>
                            <div className="input-group">
                                <span className="input-group-addon"></span>
                                
                                <input type="email" className="form-control" id="email" placeholder="Example: abcd@gmail.com" required="required" /></div>
                        </div>
                        <div className="form-group">
                            <label for="email">
                                Company/Institute</label>
                            <div className="input-group">
                                <span className="input-group-addon"><span className="glyphicon glyphicon-envelope"></span>
                                </span>
                                <input type="text" className="form-control" id="" placeholder="Please enter your Company/Institute name" required="required" /></div>
                        </div>
                        <div className="form-group">
                            <label for="email">
                                Designation</label>
                            <div className="input-group">
                                <span className="input-group-addon"><span className="glyphicon glyphicon-envelope"></span>
                                </span>
                                <input type="text" className="form-control" id="" placeholder="Please enter your Designation" required="required" /></div>
                        </div>
                        <div className="form-group">
                            <label for="subject">
                                Subject</label>
                            <select id="subject" name="subject" className="form-control" required="required">
                                <option value="na" selected="">Purpose</option>
                                <option value="service">General Customer Service</option>
                                <option value="Inquiry">Inquiry</option>
                                <option value="product">Appointment</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="name">
                                Message</label>
                            <textarea name="message" id="message" className="form-control" rows="14" cols="25" required="required"
                                placeholder="Message....."></textarea>
                        </div>
                        <button type="submit" className="btn  btn-light pull-right">
                            Reset</button>
                        <button type="submit" className="btn nextStep pull-right">
                            Send</button>
                     </div>
                    
                </div>
                </form>

                </div>
            </div>
        </div>	
       
       
                

              
  

   
                <Footer/>
            </div>
            
        );
    }
}
export default ContactPage;