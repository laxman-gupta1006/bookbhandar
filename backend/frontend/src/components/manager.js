import React from 'react';
import { Route } from 'react-router-dom';
import Mainindexpage from './main-page/main_page';
import { UserProvider} from '../contexts/UserContext';
import Login from './authcomponent/login';
import Signin from './authcomponent/signin';
import Addbook from './addbook/addbook'
import ProfilePageManager from './Profile_page_manager/manager'
import 'semantic-ui-css/semantic.min.css'
// import YourRequests from './yourbook/yourRequests/yourrequest';
const Webmanager = () => {
    return(
        <div>
        <UserProvider>
        <Route exact path='/' component={Mainindexpage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/addbook' component={Addbook} />
        <Route path='/account' component={ProfilePageManager} />
        </UserProvider>
        </div>
    )
}
export default Webmanager;