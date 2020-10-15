import React, { useContext } from 'react';
import Main from '../main-component/maincomponent';
import Navmenu from '../nav_component/nav_component';
import Footer from '../Footer/footer';
import Slider from '../Slider_component/slider_component';
import './main_page.css'
import { UserContext } from '../../contexts/UserContext';
// import Auth from '../authcomponent/auth';
// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const Mainindexpage = () => {
    const [user,setUser]=useContext(UserContext)
    const ver = () => {if(user.logged){
        return(user.User_info.userdetails.varified_user) 
    }else{return(false)}}
    return (<>
    <div id='main_page'>
            <Navmenu />
            <Slider />
            <Main verified={ver()}/>
            <Footer />
            </div>
            </>
            
    )
}
export default Mainindexpage;