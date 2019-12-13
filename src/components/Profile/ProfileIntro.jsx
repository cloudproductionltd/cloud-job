import React, { Component } from 'react';

class ProfileIntro extends Component {


    constructor(props) {
		super(props);

		// console.log('sdfsdf',this.props.data)

	}
    componentDidMount() {
      
    //   console.log('propps',props.data)
        // this.setState({
        //     user_id : props.userid
        // })
    }
  
    render() {
        
        return (
            <div>
                <header className="profile-intro">
                    <div className="container profile-intro-inner">
                        <div className="row">
                            <div className="col-md-7 left-profile-intro">
                                <div className="media profile-media">
                                   
                                <img className="img-responsive img-rounded" height="150px" width="150px" src={`http://localhost:5000/public/uploads/profile/${this.props.data}.jpg`} alt=""/> 
                                   {/* <div className="media-body profile-media-left">
                                        <button  type="button" className="btn btn-sm btn-outline-gray btn-rounded view-more waves-effect waves-light">Webdesign</button>
                                        <button type="button" className="btn btn-sm btn-outline-gray btn-rounded view-more waves-effect waves-light">WordPress</button>
                                        <button type="button" className="btn btn-sm btn-outline-gray btn-rounded view-more waves-effect waves-light">Webdevelopment</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-md-5 right-profile-intro">
                                <div className="action-inner">
                                    <button  type="button" className="btn btn-sm btn-primary btn-rounded view-more waves-effect waves-light"><i className="fas fa-user-edit"></i> Edit</button>
                                    <button type="button" className="btn btn-sm btn-danger btn-rounded view-more waves-effect waves-light"><i className="fas fa-trash-alt"></i> Delete</button>
                                    <button type="button" className="btn btn-sm btn-warning btn-rounded view-more waves-effect waves-light"><i className="fas fa-download"></i> View</button>
                                    <button type="button" className="btn btn-sm btn-info btn-rounded view-more waves-effect waves-light"><i className="fas fa-download"></i> Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </header>
            </div>
        );
    }
}
export default ProfileIntro;