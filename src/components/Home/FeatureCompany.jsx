import React, { Component } from 'react';
import Axios from 'axios'
import {  Link } from 'react-router-dom';
const $ = window.$;

class FeatureCompany extends Component {
	
	state = {
        companies :[],
    }
    componentDidMount(){
        Axios.post(`/companies`)
        .then(response => {
			console.log('resdfsdfsdfsd',response.data.companies)
            this.setState({ companies:response.data.companies })
		})
		
		$('.ftrCompSlicker').slick({
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
				]
			});
		}
    
    render() {
		// const companies = this.state.companies.map((company,key) =>
		// 	<li className="col-sm-4 col-md-3"> 
		// 		<Link to= {`/jobs?company=${company.name}`}>
		// 			<img src={`assets/images/logo${Math.floor(Math.random() * 11)+1 }.jpg`} alt="" />
		// 		</Link>
		// 	</li>
        //     )
        return (
            <section id="companies" className="common-section">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="feature-border1">
								<div className="headline">
									<h3 className="featureCompanies1">Featured Companies</h3>
								</div>
								<div className="ftrCompSlicker">
									
									<div className="col-12"> 
										<img src="./assets/images/logo1.jpg" alt="logo"/>
									</div>
									
									
									<div className="col-12"> 
										<img src="./assets/images/logo2.jpg" alt="logo"/>
									</div>
									
									
									<div className="col-12"> 
										<img src="./assets/images/logo3.jpg" alt="logo"/>
									</div>
									
									
									<div className="col-12"> 
										<img src="./assets/images/logo4.jpg" alt="logo"/>
									</div>
									
									
									<div className="col-12"> 
										<img src="./assets/images/logo5.jpg" alt="logo"/>
									</div>
									
									
									<div className="col-12"> 
										<img src="./assets/images/logo6.jpg" alt="logo"/>
									</div>
									
									
									<div className="col-12"> 
										<img src="./assets/images/logo7.jpg" alt="logo"/>
									</div>
									
									<div className="col-12"> 
										<img src="./assets/images/logo8.jpg" alt="logo"/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center view-more-ctnlink1">
						<a className="trend-link-cta btn btn-seemore btn-md" href="/errror/page">See More</a>
					</div>
				</div>
		</section>
        );
    }
}
export default FeatureCompany;