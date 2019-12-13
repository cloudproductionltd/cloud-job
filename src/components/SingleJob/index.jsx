import React, { Component } from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import Singlejob from './Job';


class index extends Component {

    state ={
        id : ''
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        
    }
    
    render() {
        return (
            <div>
                <Navbar/>
                <Singlejob job = { params.id }/>
                <Footer/>
            </div>
            
        );
    }
}
export default index;