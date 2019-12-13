import React, { Component } from 'react';
const $ = window.$;

class upcomingEvents extends Component {
    
    componentDidMount () {
        $('.cmSlicker').slick({
            dots: true,
            // infinite: false,
            arrows: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            
         
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
          });
    }

    render() {
        return (

            <section className="trending-search upcmgEvntContainer">
                <div className="container">
                    <div className="row trend-inner">
                        <div className="col-md-12">
                            <div className="inner-trend-border1">
                                <h3>Upcoming Events</h3>
                                <div className="cmSlicker">
                                    {/* <div className="container"> */}
                                    {/* <div className="row inner-row-trend upcmContainer"> */}
                                            <div className="cmWidth">
                                                <div className="card poscd">
                                                    <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                    <div className="overCmImg">
                                                        <h4>Migration Seminar</h4>
                                                        <date>July 29-30</date>
                                                    </div>
                                                    <div className="freeEvnt">Free</div>
                                                    <div className="evntIconWrap">
                                                        <div className="inner-evntIconWrap">
                                                            <i className="far fa-heart"></i>
                                                        </div>
                                                        <div className="inner-evntIconWrap">
                                                            <i className="fas fa-download"></i>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row upcomInside">
                                                        <div className="dateWrp">
                                                            <div className="upcMonth">JUL 29</div>
                                                            <div className="card-title uevntTitle">Migration Seminar</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            
                                            <div className="cmWidth">
                                                <div className="card">
                                                    <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                    <div className="overCmImg">
                                                        <h4>Migration Seminar</h4>
                                                        <date>July 29-30</date>
                                                    </div>
                                                    <div className="freeEvnt">Free</div>
                                                    <div className="evntIconWrap">
                                                        <div className="inner-evntIconWrap">
                                                            <i className="far fa-heart"></i>
                                                        </div>
                                                        <div className="inner-evntIconWrap">
                                                            <i className="fas fa-download"></i>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row upcomInside">
                                                            <div className="dateWrp">
                                                                <div className="upcMonth">JUL 29</div>
                                                                <div className="card-title uevntTitle">Migration Seminar</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cmWidth">
                                                <div className="card">
                                                    <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                    <div className="overCmImg">
                                                        <h4>Migration Seminar</h4>
                                                        <date>July 29-30</date>
                                                    </div>
                                                    <div className="freeEvnt">Free</div>
                                                    <div className="evntIconWrap">
                                                        <div className="inner-evntIconWrap">
                                                            <i className="far fa-heart"></i>
                                                        </div>
                                                        <div className="inner-evntIconWrap">
                                                            <i className="fas fa-download"></i>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row upcomInside">
                                                            <div className="dateWrp">
                                                                <div className="upcMonth">JUL 29</div>
                                                                <div className="card-title uevntTitle">Migration Seminar</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cmWidth">
                                                <div className="card">
                                                    <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                    <div className="overCmImg">
                                                        <h4>Migration Seminar</h4>
                                                        <date>July 29-30</date>
                                                    </div>
                                                    <div className="freeEvnt">Free</div>
                                                    <div className="evntIconWrap">
                                                        <div className="inner-evntIconWrap">
                                                            <i className="far fa-heart"></i>
                                                        </div>
                                                        <div className="inner-evntIconWrap">
                                                            <i className="fas fa-download"></i>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row upcomInside">
                                                            <div className="dateWrp">
                                                                <div className="upcMonth">JUL 29</div>
                                                                <div className="card-title uevntTitle">Migration Seminar</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cmWidth">
                                                <div className="card">
                                                    <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                    <div className="overCmImg">
                                                        <h4>Migration Seminar</h4>
                                                        <date>July 29-30</date>
                                                    </div>
                                                    <div className="freeEvnt">Free</div>
                                                    <div className="evntIconWrap">
                                                        <div className="inner-evntIconWrap">
                                                            <i className="far fa-heart"></i>
                                                        </div>
                                                        <div className="inner-evntIconWrap">
                                                            <i className="fas fa-download"></i>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row upcomInside">
                                                            <div className="dateWrp">
                                                                <div className="upcMonth">JUL 29</div>
                                                                <div className="card-title uevntTitle">Migration Seminar</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cmWidth">
                                                <div className="card">
                                                    <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                    <div className="overCmImg">
                                                        <h4>Migration Seminar</h4>
                                                        <date>July 29-30</date>
                                                        
                                                    </div>
                                                    <div className="freeEvnt">Free</div>
                                                    <div className="evntIconWrap">
                                                        <div className="inner-evntIconWrap">
                                                            <i className="far fa-heart"></i>
                                                        </div>
                                                        <div className="inner-evntIconWrap">
                                                            <i className="fas fa-download"></i>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row upcomInside">
                                                            <div className="dateWrp">
                                                                <div className="upcMonth">JUL 29</div>
                                                                <div className="card-title uevntTitle">Migration Seminar</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    
                                    
                                    
                                    {/* <div className="container">
                                        <div className="row">
                                        <div className="col-md-3">
                                            <div className="card">
                                                <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                <div className="overCmImg">
                                                    <h4>Migration Seminar</h4>
                                                    <date>July 29-30</date>
                                                    <p>Organized by Educares</p>
                                                </div>
                                                <div className="freeEvnt">Free</div>
                                                <div className="evntIconWrap">
                                                    <div className="inner-evntIconWrap">
                                                        <i className="far fa-heart"></i>
                                                    </div>
                                                    <div className="inner-evntIconWrap">
                                                        <i className="fas fa-download"></i>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row upcomInside">
                                                        <div className="col-md-3 dateWrp">
                                                            <div className="upcMonth">JUL</div>
                                                            <div className="upcDate">29</div>
                                                        </div>
                                                        <div className="col-md-9 upcmDesc">
                                                            <h5 className="card-title uevntTitle">Migration Seminar</h5>
                                                            <date>Mon,Jul 29, 7:00pm</date>
                                                            <p className="card-text">Educares,Bijaynagar,Paltan,Dhaka<br />Free</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card">
                                                <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                <div className="overCmImg">
                                                    <h4>Migration Seminar</h4>
                                                    <date>July 29-30</date>
                                                    <p>Organized by Educares</p>
                                                </div>
                                                <div className="freeEvnt">Free</div>
                                                <div className="evntIconWrap">
                                                    <div className="inner-evntIconWrap">
                                                        <i className="far fa-heart"></i>
                                                    </div>
                                                    <div className="inner-evntIconWrap">
                                                        <i className="fas fa-download"></i>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row upcomInside">
                                                        <div className="col-md-3 dateWrp">
                                                            <div className="upcMonth">JUL</div>
                                                            <div className="upcDate">29</div>
                                                        </div>
                                                        <div className="col-md-9 upcmDesc">
                                                            <h5 className="card-title uevntTitle">Migration Seminar</h5>
                                                            <date>Mon,Jul 29, 7:00pm</date>
                                                            <p className="card-text">Educares,Bijaynagar,Paltan,Dhaka<br />Free</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card">
                                                <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                <div className="overCmImg">
                                                    <h4>Migration Seminar</h4>
                                                    <date>July 29-30</date>
                                                    <p>Organized by Educares</p>
                                                </div>
                                                <div className="freeEvnt">Free</div>
                                                <div className="evntIconWrap">
                                                    <div className="inner-evntIconWrap">
                                                        <i className="far fa-heart"></i>
                                                    </div>
                                                    <div className="inner-evntIconWrap">
                                                        <i className="fas fa-download"></i>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row upcomInside">
                                                        <div className="col-md-3 dateWrp">
                                                            <div className="upcMonth">JUL</div>
                                                            <div className="upcDate">29</div>
                                                        </div>
                                                        <div className="col-md-9 upcmDesc">
                                                            <h5 className="card-title uevntTitle">Migration Seminar</h5>
                                                            <date>Mon,Jul 29, 7:00pm</date>
                                                            <p className="card-text">Educares,Bijaynagar,Paltan,Dhaka<br />Free</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card">
                                                <img className="card-img-top" src="../assets/images/4.jpg" alt="Card image cap" />
                                                <div className="freeEvnt">Free</div>
                                                <div className="evntIconWrap">
                                                    <div className="inner-evntIconWrap">
                                                        <i className="far fa-heart"></i>
                                                    </div>
                                                    <div className="inner-evntIconWrap">
                                                        <i className="fas fa-download"></i>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row upcomInside">
                                                        <div className="col-md-3 dateWrp">
                                                            <div className="upcMonth">JUL</div>
                                                            <div className="upcDate">29</div>
                                                        </div>
                                                        <div className="col-md-9 upcmDesc">
                                                            <h5 className="card-title uevntTitle">Migration Seminar</h5>
                                                            <date>Mon,Jul 29, 7:00pm</date>
                                                            <p className="card-text">Educares,Bijaynagar,Paltan,Dhaka<br />Free</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                        </div>
                                    </div> */}
                                </div>
                                    <div className="center view-more-ctnlink1">
                                        <a className="trend-link-cta btn btn-seemore btn-md" href="/errror/page">See More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
	        </section>

            );
    }
}
export default upcomingEvents;