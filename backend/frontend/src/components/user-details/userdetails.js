import React,{useContext, useEffect} from 'react';
import './Update_user_profile.css';
import profileimg from '../../person.png'
import { UserContext } from '../../contexts/UserContext';
import CSRFtoken from '../csrftoken'
import { Button } from 'semantic-ui-react';
const UserDetails = () => {
    const [user,setUser]=useContext(UserContext);
    const fill = () => {
        document.getElementById('username').value= user.User_info.userdetails.user_name
        document.getElementById('email').value= user.User_info.userdetails.user_email
        document.getElementById('collegename').value= user.User_info.userdetails.college_name 
        document.getElementById('city').value= user.User_info.userdetails.city
        document.getElementById('fullname').value= user.User_info.userdetails.full_name 
        document.getElementById('country').value= user.User_info.userdetails.country 
    }
    useEffect(fill,[])
    const VerifyEmail =(e)=>{
        e.target.loading=true
        fetch('../api/send_mail').then(response => response.json()).then(result => {
            if(result.Email=='Sended'){
                alert("Email has been sended to your email account")
                e.target.loading=false
            }
        })
    }
    const Update = () => {
        var formdata = new FormData();
        formdata.append("collegename", document.getElementById('collegename').value);
        formdata.append("city", document.getElementById('city').value);
        formdata.append("fullname", document.getElementById('fullname').value);
        formdata.append("country", document.getElementById('country').value);
        formdata.append("profileimg", document.getElementById('uploadprofileimg').files[0]);
        formdata.append("csrfmiddlewaretoken", document.getElementById('csrftoken').value);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            //   redirect: 'follow'
        };
    
        fetch("/api/update/", requestOptions)
            .then(response => response.json())
            .then(result => {
                    localStorage.setItem('data',JSON.stringify(result));
                    window.location.reload()
                }
            )
            .catch(error =>  window.location.href='http://127.0.0.1:8000/login');
    
    }
    const emailverified = () =>
    {
        if(user.User_info.userdetails.varified_user){
            return(<><button type="button" class="btn btn-success" disabled>Verified</button></>)
        }
        return(<><Button onClick={(e)=>VerifyEmail(e)}>Verify</Button></>)
    }
    if(user.logged!=false){
        console.log(user)
    return (
        <React.Fragment>
        <div className="container" >
            <div className="view-account">
                <section className="module">
                    <div className="module-inner">
                        <div className="side-bar">
                            <div className="user-info">
                                <img className="img-profile img-circle img-responsive center-block" src={ user.User_info.userdetails.profile_img==null? profileimg:user.User_info.userdetails.profile_img } alt="" id='profileimg'/>
                                <ul className="meta list list-unstyled">
                                    <li className="name">{ user.User_info.userdetails.full_name }
                            </li>
                                    <li className="email"><p>{ user.User_info.userdetails.user_email }</p></li>
                                </ul>
                            </div>
                            <nav className="side-menu">
                                {/* <!-- <ul className="nav">
        					<li className="active"><a href="#"><span className="fa fa-user"></span> Profile</a></li>
        				</ul> --> */}
                            </nav>
                        </div>
                        <div className="content-panel">
                            <h2 className="title">Profile</h2>
                            <form className="form-horizontal">
                                <fieldset className="fieldset">
                                    <h3 className="fieldset-title">Personal Info</h3>
                                    <div className="form-group avatar">
                                        <figure className="figure col-md-2 col-sm-3 col-xs-12">
                                            <img className="img-rounded img-responsive" src="assits/person.png" alt="" />
                                        </figure>
                                        <div className="form-inline col-md-10 col-sm-9 col-xs-12">
                                            <input type="file" className="file-uploader pull-left" id='uploadprofileimg'  className="btn btn-sm btn-default-alt pull-left"/>
                                            {/* <button type="submit" className="btn btn-sm btn-default-alt pull-left">Update Image</button> */}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2 col-sm-3 col-xs-12 control-label">User Name</label>
                                        <div className="col-md-10 col-sm-9 col-xs-12">
                                            <input type="text" className="form-control" id='username' disabled/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-md-2 col-sm-3 col-xs-12 control-label">Full Name</label>
                                        <div className="col-md-10 col-sm-9 col-xs-12">
                                            <input type="text" className="form-control" id='fullname'  />
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className="fieldset">
                                    <h3 className="fieldset-title">Contact Info</h3>
                                    <div className="form-group">
                                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">Email</label>
                                        <div className="col-md-10 col-sm-9 col-xs-12 flex">
                                            <input type="email" className="form-control" id='email'  disabled/>
                                            {emailverified()}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">Collage Name</label>
                                        <div className="col-md-10 col-sm-9 col-xs-12">
                                            <input type="text" className="form-control" id='collegename' />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">City</label>
                                        <div className="col-md-10 col-sm-9 col-xs-12">
                                            <input type="text" className="form-control" id='city'/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">Country</label>
                                        <div className="col-md-10 col-sm-9 col-xs-12">
                                            <input type="text" className="form-control" id='country' />
                                        </div>
                                    </div>
                                </fieldset>
                                <hr/>
                                <CSRFtoken></CSRFtoken>
                                    <div className="form-group">
                                        <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                                            <input type="button" onClick={ Update } value="Update Profile" />
                                        </div>
                                    </div>
                    </form>
                </div>
                        </div>
        </section>
    </div>
            </div>
            <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
            <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            </React.Fragment>
    )
                    }else{
                       console.log(user)
                    }
}
export default UserDetails;