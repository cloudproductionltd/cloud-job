import React, { Component } from 'react';
import { getJwt } from '../helpers/jwt';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class AuthenticatedComponent extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            user: undefined
        }
    }
    
    componentDidMount(){
        const jwt =getJwt();
        if(!jwt){
            this.props.history.push('./')
        }
    }
    
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }

}

export default withRouter(AuthenticatedComponent);
