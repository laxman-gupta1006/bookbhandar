import React,{useContext} from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Profiled from '../profile.name.block/profile.name.block'
import login from '../../../icons/login.png'
import './acc.css'
const Accinfo = () => {
    const [user,setUser]=useContext(UserContext);
//         const Login = () => {
//  window.location.href='/login';
//     }
    if(user.logged===true)
    {
    return(
        <Profiled /> )
    }
    else{
    return(<>
        <button class="btn btn-light" onClick={() => window.location.href='/login'}>Login</button></>)
    // <div onClick={Login} id='loginb'>Login<img height='40px' width='40px' src={login}></img></div>)
    }
}
export default Accinfo;