import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './components/Home/Index';

import IndexAfterRedirectAuthentication from './components/Home/IndexAfterRedirectAuthentication';
import ErrorPage from './components/Home/errorpage';

import ContactPage from './components/Home/contact-page';

import AuthenticatedComponent from './components/AuthenticatedComponent';
import login from './components/login';
import SignUp from './components/SignUp';
import Protected from './components/Protected';
import ProfileUser from './components/Profile/ProfileOfUsers';

import ProfileUserDetailsAdmin from './components/Profile/ProfileUserDetailsAdmin';
import Profile from './components/Profile/ProfileOfAuthenticate';
import ProfileEdit from './components/Profile/ProfileEdit';
import Alljobs from './components/AllJob/Index';

import CompanyJobs from './components/AllJob/Companyjobs';
import Seejobs from './components/AllJob/jobs';

import RecuirterPendingJobList from '../src/components/Admin/RecuirterPendingJobList';
import RecuirterDeclinedJobList from '../src/components/Admin/RecuirterdisapproveJobList';
import RecuirterDeclinedJob from '../src/components/Admin/RecuirterDisapproveJob';

import RecuirterPendingJob from '../src/components/Admin/RecuirterPendingJob';
import RecuirterDetailsJob from '../src/components/Admin/RecuirterDetailsJob';
import ApprovedJobDetailsByAdmin from '../src/components/Admin/ApprovedJobDetailsByAdmin';
import RecuirterPendingCompanyProfile from '../src/components/Admin/ViewRecruiterPendingProfileInfo';
import DetailsOfPendingJob from './components/Admin/SuperAdminHome/DetailsOfPendingJob';
import DetailsOfPendingCompany from './components/Admin/SuperAdminHome/DetailsOfPendingCompany';
import DetailsOfApprovedCompany from './components/Admin/SuperAdminHome/DetailsOfApprovedCompany';

import DetailsOfCompany from './components/Admin/SuperAdminHome/DetailsOfCompany';
import AdminDashboard from './components/Admin/SuperAdminHome/index';

import AllApprovedUsersInfoWithTab from './components/Admin/SuperAdminHome/AllApprovedUsersInfoWithTab';
import AllDisapproveApprovedUsersInfoWithTab from './components/Admin/SuperAdminHome/AllDisapproveApprovedUsersInfoWithTab';
import AdminDashboardPage from './components/Admin/SuperAdminHome/adminDashboard';
import AdminAllCompanyList from './components/Admin/SuperAdminHome/AdminAllCompanyList';
import AddNewUserByAdmin from './components/Admin/SuperAdminHome/addNewUserByAdmin';


import AdminPendingJobsToApprove from './components/Admin/SuperAdminHome/AdminPendingJobsToApprove';
import AdminPendingCompaniesToApprove from './components/Admin/SuperAdminHome/AdminPendingCompanyForApprove';
import Singlejob from './components/SingleJob/Job';
import Admin from './components/Admin/index';
import Adminform from './components/Admin/form';
import testComponent from './components/testComponent';

import Companies from './components/Company/AllCompanies';

import RecruiterDashboard from './components/Company/recruiterdashboard';

import CompanyAdd from './components/Admin/CreateCompanyProfile';
import CompanyUpdate from './components/Admin/UpdateCompanyProfile';
import CompanyApprovedDetails from './components/Admin/CompanyApprovedDetailsFromRecruiter';
import Userlist from './components/UserList';
import RecruiterJobs from './components/Admin/RecruiterJobs';
import Jobpost from './components/Admin/Jobpost';


import AddNewJobPostNew from './components/Admin/AddNewJobPostNew';

import RecruiterPendingJob from './components/Admin/recruiterPendingJobList';

import RecruiterDisapprovalList from './components/Admin/recruiterDisapprovalList';

import AdminDisapprovalListofJobs from './components/Admin/AdminDisapprovalListofJobs';
import RecruiterAllJobList from './components/Admin/recruiterAllJobList';

import RecruiterAllCompanyJobList from './components/Admin/recruiterAllCompanyList';

import JobPostEdit from './components/Admin/JobPostEdit';
import DisapproveJobPostEdit from './components/Admin/DisapproveJobPostEdit';
import Applylist from './components/OnlineApplication';
import Applicants from './components/Admin/Applicants';
import SelectedApplicants from './components/Admin/SelectedApplicants';
import ApplicantslistByJob from './components/Admin/ApplicantslistByJob';
import CompanyProfile from './components/Profile/CompanyProfile';
import Reset from './components/Profile/reset';
import UserDashboard from './components/Profile/userDashboard';

import CompanyWizardProfile from './components/Admin/companyProfile';

import allUserListSeeRecruAdmin from './components/Admin/SuperAdminHome/allUserListSeeRecruAdmin';
import PendingUserListFromAdmin from './components/Admin/SuperAdminHome/PendingUserListFromAdmin';
import PendingListAppByAdmin from './components/Admin/SuperAdminHome/pendingListAppByAdmin';
import DisapprovalListByAdmin from './components/Admin/SuperAdminHome/disapprovalListByAdmin';

import DetailsOfDesapproveJob from './components/Admin/SuperAdminHome/DetailsOfDesapproveJob';
import ApplicableListByAdmin from './components/Admin/SuperAdminHome/applicableByAdmin';

import JobSeekerProfile from './components/Profile/JobSeekerWizerd';
import Error from './components/Error';
// import JobSeekerProfile from './components/Profile/jobSeekerProfile';
import UserSidebar from './components/Profile/userSidebar';
import ApplicableJobList from './components/Profile/applicableJobList';
import PendingJobList from './components/Profile/pendingJobList';
import DisapprovedJobList from './components/Profile/disapprovedJobList';
import CompareList from './components/Profile/compareList';
import VerifyAccountEmail from './components/Home/VerifyAccountEmail';
import AllPendingUsers from './components/Admin/SuperAdminHome/AllUserList';
import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:5000/';
//Axios.defaults.baseURL = 'https://cloudjobs.herokuapp.com/';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component ={ Index }/>  
            <Route path="/errror/page" exact component ={ ErrorPage }/> 
            <Route path="/contact" exact component ={ ContactPage }/> 

            <Route path="/auth/reset-password/:token" component ={login}/>
            <Route path="/signup" component ={SignUp}/>
            <Route path="/reset" component ={Reset}/>
            
            <Route path="/auth/verify/:token" component ={ IndexAfterRedirectAuthentication }/>
            {/* <Route path="/jobSeekerProfile" component ={JobSeekerProfile}/>\ */}
            <Route path="/userSidebar" component ={UserSidebar}/>

            {/* <Route path="/wizerd" component ={Wized}/>\ */}

            {/* <Route path="/usersprofile" exact component ={ ProfileUser}/> */}
            <Route path="/jobs/:id/:slug" exact component ={ Singlejob }/>
            <Route path="/jobs" exact component ={ Alljobs }/>
            {/* <Route path="/jobs/company/:name" exact component ={ Alljobs }/> */}
            <Route path="/admin" exact component ={ Admin }/>
            <Route path="/userlist" exact component ={ Userlist }/>
            <Route path="/admin/form" exact component ={ Adminform }/>
            <Route path="/companies" exact component ={ Companies }/>
            <Route path="/company-profile/:id" exact component ={ CompanyProfile }/>
          
            <Route path="/nopage" exact component ={ Error }/>

            <AuthenticatedComponent>

              {/* Admin Routes */}

              {/* <Route path="/admindashboard" exact component ={ AdminDashboard }/> */}

              <Route path="/admindashboard" exact component = { AdminDashboardPage }/>

              <Route path="/recruiter/dashboard" exact component = { RecruiterDashboard }/>

              <Route path="/addNewUserByAdmin" exact component = { AddNewUserByAdmin }/>

              <Route path="/AllUserListSeeRecruAdmin" exact component ={ allUserListSeeRecruAdmin }/>
              <Route path="/pending/user/list" exact component ={ PendingUserListFromAdmin }/>
             
              <Route path="/admin/pending" exact component ={ PendingListAppByAdmin }/>
              <Route path="/disapprovallistbyadmin" exact component ={ DisapprovalListByAdmin }/>
              <Route path="/applicablebyadmin" exact component ={ ApplicableListByAdmin }/>
              <Route path="/admin-pending-jobs" exact component ={ AdminPendingJobsToApprove }/>
              <Route path="/admin/all/users" exact component ={ AllApprovedUsersInfoWithTab }/>
              <Route path="/admin/disapprove/users" exact component ={ AllDisapproveApprovedUsersInfoWithTab }/>
              {/* Admin routes */}
              <Route path="/admin/company" exact component={ AdminAllCompanyList } />
              <Route path="/admin/company/pending" exact component ={ AdminPendingCompaniesToApprove }/>
              <Route path="/pendingjobsdetails/:id" exact component ={ DetailsOfPendingJob }/>
              <Route path="/admin/compamy/pending/:id" exact component ={ DetailsOfPendingCompany }/>
              <Route path="/admin/company/:id" exact component ={ DetailsOfCompany }/>
              <Route path="/admin/approved/company/:id" exact component ={ DetailsOfApprovedCompany }/>
              <Route path="/admin/jobs/disapprovallist" exact component ={ AdminDisapprovalListofJobs }/>
              <Route exact path="/admin/approved/job/details/:id" exact component ={ ApprovedJobDetailsByAdmin }/>
              <Route exact path="/admin/disapprove/job/details/:id" exact component ={ DetailsOfDesapproveJob }/>  
              <Route exact path="/pending/" exact component ={ AllPendingUsers }/>  
              <Route exact path="/pending/user/approval" exact component ={ AllPendingUsers }/> 
              <Route exact path="/pending/company/approval" exact component ={ AllPendingUsers }/> 
              {/* Recruiter routes */}
              <Route path="/applicants" exact component ={ Applicants }/>
              <Route path="/selected-applicants" exact component ={ SelectedApplicants }/>
              <Route path="/applicantslistbyid/:id" exact component ={ ApplicantslistByJob }/>

              <Route path="/recruiter/company/add" exact component ={ CompanyWizardProfile }/>
              <Route path="/recruiter/company" exact component ={ RecruiterAllCompanyJobList }/>
              <Route path="/recruiter/company/pending" exact component ={ RecuirterPendingCompanyProfile }/>
              <Route path="/recruiter/company/pending/:id" exact component ={ CompanyUpdate }/>
              <Route path="/recruiter/company/pending/:id/edit" exact component ={ CompanyWizardProfile }/>
              <Route path="/recruiter/company/approved/:id" exact component ={ CompanyApprovedDetails }/>


              
              <Route path="/admin/recruiterAllJobList" exact component ={ RecruiterAllJobList }/>

              <Route path="/recruiter/recruiterPendingJobList" exact component ={ RecruiterPendingJob }/>
              <Route path="/recruiter/recruiterDisapprovalList" exact component ={ RecruiterDisapprovalList }/>

              <Route path="/recruiter/jobs/add" exact component ={ AddNewJobPostNew }/>
              <Route path="/recruiter/jobs/update/:id" exact component ={ JobPostEdit }/>

              
              <Route exact path="/recruiter/disapprovejobs/update/:id" exact component ={ DisapproveJobPostEdit }/>
              <Route path="/recruiterjobs" exact component ={ RecruiterJobs }/>
              <Route exact path="/recruiter-pending-jobs" exact component ={ RecuirterPendingJobList }/>

              <Route exact path="/recruiter/pending/jobslist/dashboard/:id" exact component ={ RecuirterPendingJob }/>  
              <Route exact path="/recruiter/job/details/:id" exact component ={ RecuirterDetailsJob }/> 
              <Route exact path="/recruiter-decline-jobs" exact component ={ RecuirterDeclinedJobList }/>
              <Route exact path="/recruiter-decline-job/:id" exact component ={ RecuirterDeclinedJob }/>
              

              
              {/* User routes */}
              <Route path="/userDashboard" component ={UserDashboard}/>
              <Route path="/profile" exact component ={ Profile }/>
              <Route path="/userinfo/:id" exact component ={ ProfileUser }/>
              <Route path="/userinfo/admin/:id" exact component ={ ProfileUserDetailsAdmin }/>
              <Route path="/profile-edit" exact component ={ ProfileEdit }/>
              <Route path="/profile-create" exact component ={ JobSeekerProfile }/>
              <Route path="/applications" exact component ={ Applylist }/>
              <Route path="/Protected" exact component ={Protected}/>
              <Route path="/test-component" exact component ={testComponent}/>
              <Route path="/applicableJobList" exact component ={ ApplicableJobList }/>
              <Route path="/pendingJobList" exact component ={ PendingJobList }/>
              <Route path="/disapprovedJobList" exact component ={ DisapprovedJobList }/>
              <Route path="/compareList" exact component ={ CompareList }/>
            </AuthenticatedComponent>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;