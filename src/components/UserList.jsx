import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter} from 'react-router';
import { Link } from "react-router-dom";

class Userlist  extends Component {

    state ={
        users:[]
    }
    componentDidMount(){
        Axios.get(`/users/`)
            .then(response => {

                this.setState({users: response.data.response.users})
            })
            .catch(error => {
                console.log('error: ', error.response)
            })
    }

    render() { 
        let  { users } =this.state
        const userlist = users.map((user) =>
            <tr>
                <td> <Link to={{ pathname: '/usersprofile', state: { user } }}> <b>{user.local.username} </b> </Link> </td>
                <td>{user.local.email} </td>
                <td>{user.local.role} </td>
                <td>{user.local.verified ?  'yes':'no'} </td>
                <td>{user.local.status ?  'yes':'no'} </td>
            </tr>
        );
        return (
        <div className="col-lg-10  mx-auto">
            <div className="card">
                <div className="card-header">
                    <h4>User List</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-sm table-hover">
                            <thead>
                                <tr>
                                    <th>user name  </th>
                                    <th>email</th>
                                    <th>roll</th>
                                    <th>verified</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userlist}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default withRouter(Userlist);