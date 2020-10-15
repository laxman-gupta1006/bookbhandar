import React from 'react';
import Accinfo from './account_information/acc_info';
// import Profiled from './profile.name.block/profile.name.block';
import logo from '../../logo.png';
import './nav_component.css'
// window.onscroll = function() {myFunction()};
// function myFunction() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//   var scrolled = (winScroll / height) * 100;
//   document.getElementById("myBar").style.width = scrolled + "%";}
const Navmenu = () => {
    
    // const Login = () => {
    //     // this.setState({
    //     //     logged: true, User_details: {
    //     //         username: 'Laxman Gupta',
    //     //         userid: 'laxman1006',
    //     //     }
    //     // })
    // }
    // const Logout = () => {
    //     // this.setState({ logged: false, User_details: {} })
    // }
    return(
    <React.Fragment>
        <div id="header">
        <div id="navitem">
            <a href='/'><img alt='Logo' src={ logo } height="60" width="150" id='logo'/></a>
            <Accinfo />
        </div>
        {/* <div className="progress-container">
            <div className="progress-bar" id="myBar"></div>
        </div> */}
        </div>
    </React.Fragment >)
}
export default Navmenu;