import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Adminform from './components/Admin/form'
import Companies from './components/Company/AllCompanies'
import Userlist from './components/UserList'


class Admin extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/userlist" exact component ={ Userlist }/>
            <Route path="/admin/form" exact component ={ Adminform }/>
            <Route path="/companies" exact component ={ Companies }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Admin;
