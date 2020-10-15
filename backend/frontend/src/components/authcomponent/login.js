// eslint-disable-next-line 
import React, { useContext } from 'react';
import './form.css'
import CSRFtoken from '../csrftoken'
// eslint-disable-next-line 
import { UserContext } from '../../contexts/UserContext'
// componentDidMount(){

// }
const Login = (e) => {
    // eslint-disable-next-line
    // const [user,setUser]=useContext(UserContext);
    const log = () => {
        localStorage.clear()
        var formdata = new FormData();
        formdata.append("username", document.getElementById('username').value);
        formdata.append("password", document.getElementById('password').value);
        formdata.append("csrfmiddlewaretoken", document.getElementById('csrftoken').value);
        
        
        var requestOptions = {
            method: 'POST',
            body: formdata,
        };
    
  fetch("/api/login/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.user == 'exist' && result.password == 'invalid') {
                    document.getElementById('error').innerHTML = 'Incorrect Password';
                    document.getElementById('error').style.display = 'block';
                }
                else if (result.user == 'invalid' && result.password == 'invalid') {
                    document.getElementById('error').innerHTML = 'Incorrect Username';
                    document.getElementById('error').style.display = 'block';
                }
                else if (result.user == 'exist' && result.password == 'valid') {
                    localStorage.setItem('data',JSON.stringify(result));
                    window.location.href='/';
                }
            })
            .catch(error => console.log('error', error));
    
    }
    return (
        <div id="focus_form">

            <div className="section" id="login_section">
                {/* <button onClick='form_out("login_section")' id='close' >X</button> */}
                <h1 align='center'>Login</h1><br />
                <center>
                    <p id='error'></p>
                    <form id='login_form' >
                        <CSRFtoken></CSRFtoken>
                        <input type='text' id='username' name='username' placeholder='usermame' autoComplete="off"
                            required /><br />
                        <input type='password' id='password' name='password' placeholder="password" required /><br />
                        <center>
                            <input type='button' onClick={log} value='LogIn' /><br />
                            <p>If you are new here</p>

                            <input type='button' name='signin' id='signin' value="SignIn" onClick={()=>window.location.href='../signin'} />
                        </center>
                    </form>
                </center>
            </div >
        </div>
    )
}
export default Login;