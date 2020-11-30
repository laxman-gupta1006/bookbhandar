import React, { useContext } from 'react';
import './profile_name_block.css';
import profileimg from '../../../person.png';
import { UserContext } from '../../../contexts/UserContext';
// import login from '../../../icons/login.png'
import logout from '../../../icons/login.png'
import profile from '../../../icons/profile.png'
import bookico from '../../../icons/books.png'
import request from '../../../icons/request.png'
import dropdown from '../../../icons/dropdown.png'
import { Dropdown, Image } from 'semantic-ui-react'
const Profiled = () => {
    const [user, setUser] = useContext(UserContext);
    const Logout = () => {
        console.log('logged out')
        fetch('/api/logout').then(data => data.json()).then(response => {
            if (response.Logout == 'successfull') {
                localStorage.clear()
                window.location.href = '/'
            } else (alert('unable to logout'))
        })



    }
    // const expand = () => {
    //     var x = document.getElementById('profile_log');
    //     if (x.style.display === 'none' || x.style.display === '') {
    //         x.style.display = 'flex';
    //     } else {
    //         x.style.display = 'none';
    //     }
    // }
    const trigger = (
        <span>
          <Image avatar src={user.User_info.userdetails.profile_img == null ? profileimg : user.User_info.userdetails.profile_img} /> {user.User_info.userdetails.user_name}
        </span>
      )
     
      const options = [
        { key: 'user', text: 'Account', icon: 'user',onClick:()=> window.location.href='/account/profile' },
        { key: 'sign-out', text: 'Sign Out', icon: 'sign out' ,onClick: Logout },
      ]
    if (user.logged===true) {
        console.log(user)
        return (
  <Dropdown
    trigger={trigger}
    options={options}
    pointing='top right'
    icon={null}
  />
)

            // <React.Fragment>

            //     <div id="profile_name" onClick={expand}>
            //         <div id="profile_img">
            //             <img src={user.User_info.userdetails.profile_img == null ? profileimg : user.User_info.userdetails.profile_img} height="40px" width='40px' id='profileimage' alt='profile' />
            //         </div>
            //         <div>
            //             <img src={dropdown} height="20px" width='20px' id='dropdown' alt='dropdown' />
            //         </div>
            //     </div>
            //     <div id='profile_log'>
            //         <span onClick={() => window.location.href = "/profile"}>Profile <img id='ico' src={profile}></img></span>
            //         <span onClick={() => Logout()}>Logout<img id='ico' src={logout}></img></span>
            //     </div>
            // </React.Fragment>
            
    }
    else {
        return null;
    }
}
export default Profiled;