import React, { Component } from 'react';

class RecruiterProfile extends Component {
    render() { 
      console.log('helooo',this.props)
        return (
            <div>
              <div class={this.props.fields.visible ? 'show card':'card hide'}>
                <div className="card-header">
                  <h4>Company Profile</h4>
                  <span className="EdWrapper"><button onClick={this.props.toggleProfile} className="btn btn-primary btn-xs adminEdIcon"><i className="fas fa-pencil-alt"></i></button>
                  </span>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                  <table className="table table-bordered companyProfileView">
                      <tbody>
                        <tr>
                          <td>
                            <p><b>Company Name:</b></p>
                            <p>{this.props.fields.name}</p>
                          </td>
                          <td>
                          <p><b>Email:</b></p>
                            <p>{this.props.fields.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p><b>Web Address</b></p>
                            <p>{this.props.fields.web}</p>
                          </td>
                          <td>
                            <p><b>Address</b></p>
                            <p>{this.props.fields.address}</p>
                          </td>
                        </tr>
                        <tr>
                        <td>
                          <p><b>Zip Code</b></p>
                          <p>{this.props.fields.zip}</p>
                        </td>
                          <td>
                          <p><b>City</b></p>
                            <p>{this.props.fields.city}</p>
                          </td>
                         </tr>
                        <tr>
                        <td>
                           <p><b>State</b></p>
                            <p>{this.props.fields.state}</p>
                        </td>
                        <td>
                        <p><b>Country</b></p>
                        <p>{this.props.fields.country}</p>
                        </td>
                          
                        </tr>
                        <tr>
                          
                          <td>
                          <p><b>Contact Number</b></p>
                            <p>{this.props.fields.emergency_contact}</p>
                          </td>
                          <td>
                          <p><b>Company Type</b></p>
                            <p>{this.props.fields.type}</p>
                          </td>
                         
                        </tr>
                        <tr>
                        <td className="viewAbout"><p><b>About</b></p></td>
                          <td><p>{this.props.fields.about}</p></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
export default RecruiterProfile
