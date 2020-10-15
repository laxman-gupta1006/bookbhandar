import React from 'react';
import CSRFtoken from '../csrftoken'
const Signin = (e) => {
    const ValidateEmail = (mail) =>
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
  document.getElementById('email').style.boxShadow = '0 0 5px red';
  document.getElementById('signin').disabled = false;
    return (false)
}
    const checkuser = () => {
        if(document.getElementById('s_username').value.length > 8)
        {
        document.getElementById('error').innerHTML=''
        var formdata = new FormData();
        formdata.append("username", document.getElementById('s_username').value);
        formdata.append("csrfmiddlewaretoken", document.getElementById('csrftoken').value);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            //   redirect: 'follow'
        };
        fetch("/api/usercheck/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 'exist') {
                    document.getElementById('s_username').style.boxShadow = '0 0 5px red';
                    document.getElementById('error').innerHTML='Username Exist'
                    document.getElementById('error').style.display='block'
                }
                else if (result.status == 'notexist') {
                    document.getElementById('s_username').style.boxShadow = '0 0 5px green';
                    document.getElementById('error').innerHTML=''
                    document.getElementById('signin').disabled = false;
                    document.getElementById('error').style.display='none'
                }
            })
            .catch(error => console.log('error', error));
        }
        else{
            document.getElementById('s_username').style.boxShadow = '0 0 5px red';
            document.getElementById('error').innerHTML='Username should be greater then 8 letters'
            document.getElementById('signin').disabled = true;
            document.getElementById('error').style.display='block'
    
        }
    }
    const checkemail = () => {
        if(ValidateEmail(document.getElementById('email').value)){
        var formdata = new FormData();
        formdata.append("useremail", document.getElementById('email').value);
        formdata.append("csrfmiddlewaretoken", document.getElementById('csrftoken').value);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            //   redirect: 'follow'
        };
        fetch("/api/useremailcheck/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 'exist') {
                    document.getElementById('email').style.boxShadow = '0 0 5px red';
                    document.getElementById('error').innerHTML='Email Taken'
                    document.getElementById('error').style.display='block'
                }
                else if (result.status == 'notexist') {
                    document.getElementById('email').style.boxShadow = '0 0 5px green';
                    document.getElementById('error').innerHTML=''
                    document.getElementById('signin').disabled = false;
                    document.getElementById('error').style.display='none'
                }
            })
            .catch(error => console.log('error', error));
        }
    }
    const sign = () => {
        localStorage.clear()
        var formdata = new FormData();
        if (document.getElementById('password').value != document.getElementById('c_password').value) {
            document.getElementById('error').style.display='block';
            return document.getElementById('error').innerHTML = 'confirm password does not match';
        }
        formdata.append("username", document.getElementById('s_username').value);
        formdata.append("fullname", document.getElementById('fullname').value);
        formdata.append("password", document.getElementById('password').value);
        formdata.append("email", document.getElementById('email').value);
        formdata.append("college_name", document.getElementById('college_name').value);
        formdata.append("city", document.getElementById('city').value);
        formdata.append("country", document.getElementById('country').value);
        formdata.append("csrfmiddlewaretoken", document.getElementById('csrftoken').value);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            //   redirect: 'follow'
        };
    
        fetch("/api/signin/", requestOptions)
            .then(response => response.json())
            .then(result => {
               if (result.status == 'created') {
                    window.location.href = '../login';
                }
            })
            .catch(error => console.log('error', error));
        }
    return (
        <div id="focus_form">
            <div className="section" id="signin_section">
                {/* <button onClick='form_out("signin_section")' id='close'></button> */}
                <div class="alert alert-primary" role="alert">
If you are not a student don't fill college !
</div>
                <h1 align='center'>SignIn</h1><br />
                <center>
                <div class="alert alert-danger" id='error' role="alert">
</div>
                    <form id='signin_form' method='POST' onSubmit={sign}>
                    <CSRFtoken></CSRFtoken>
                        <input type='text' id='fullname' name='fullname' placeholder='Fullname' autocomplete="off"
                            required /><br />
                        <input type='text' id='s_username' name='username' placeholder='usermame' autocomplete="off"
                            required onChange={checkuser}/><br />
                        <input type='email' id='email' name='email' placeholder='abcd@xyz.com' autocomplete="off"
                            required onChange={checkemail}/><br />
                            <input type='text' id='college_name' name='college_name' placeholder='College Name' autocomplete="off"
                            /><br />
                            <input type='text' id='city' name='city' placeholder='City Name' autocomplete="off"
                            required /><br />
                            <input type='text' id='country' name='country' placeholder='country' autocomplete="off"
                            required /><br />
                        <input type='password' name='password' id='password' placeholder="password" required /><br />
                        <input type='password' name='c_password' id='c_password' placeholder="Confirm password" required /><br />
                        <center>
                            <input type='submit' id='signin'  value='Signin' /><br />
                            <p>You have account?</p>
                            <input type='button' name='login' id='login' value="Login"
                                onClick={() =>window.location.href='../login'} />
                        </center>
                    </form>
                </center>
            </div>
        </div>
    )
}
export default Signin;