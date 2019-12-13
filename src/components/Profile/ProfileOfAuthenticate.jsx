import React, { Component } from 'react';
import ProfileIntro from './ProfileIntro';
import ProfileSubheaderAuth from './ProfileSubheaderAuth';
import ProfileMenu from './ProfileMenuAuth';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';

class ProfileOfAuthenticate extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <ProfileIntro />
                <ProfileSubheaderAuth />
                <ProfileMenu/>
                <Footer/>
            </div>
            
        );
    }
}
export default ProfileOfAuthenticate;