import React,{ useState } from 'react'
import {  Menu, Segment,Button } from 'semantic-ui-react'
import Books from '../yourbook/books'
import ReqBooks from '../yourrequest/books'
import Navmenu from '../nav_component/nav_component';
import UserDetails from '../user-details/userdetails';
import './profilesection.css'
import { BrowserRouter, Route } from 'react-router-dom';
import Addbook from '../addbook/addbook';

const ProfilePageManager = ()=> {
  const [profile,setProfile]=useState({ activeItem: 'profile' })
  const Logout = () => {
    console.log('logged out')
    fetch('/api/logout').then(data => data.json()).then(response => {
        if (response.Logout == 'successfull') {
            localStorage.clear()
            window.location.href = '/'
        } else (alert('unable to logout'))
    })



}
  const handleItemClick = ( name ) => {
    setProfile({ activeItem: name })
    // window.location.href='/account/'+name+'/'
  }
  const profile_page = ()=> {
  
    if(profile.activeItem==='profile'){
      return <UserDetails></UserDetails>
    }
    else if(profile.activeItem==='yourbook'){
      return <Books></Books>
    }else if(profile.activeItem==='sentrequest'){
      return <ReqBooks></ReqBooks>
    }}
    // <BrowserRouter>
    // <Route exact path="/account/profile/">
    // <UserDetails></UserDetails>
    // </Route>
    // <Route exact path="/account/yourbook/">
    // <Books></Books>
    // </Route>
    // <Route exact path="/account/sentrequest/">
    // <ReqBooks></ReqBooks>
    // </Route>
    // <Route exact path="/account/">
    // <UserDetails></UserDetails>
    // </Route>
    // </BrowserRouter>)

  

    return (<>
      <Navmenu></Navmenu>
      <div id='ProfileSection'>
        <Menu attached='top' tabular >
          <Menu.Item
            name='Profile'
            active={profile.activeItem === 'profile'}
            onClick={()=>handleItemClick('profile')}
          />
          <Menu.Item
            name='Your Books'
            active={profile.activeItem === 'yourbook'}
            onClick={()=>handleItemClick('yourbook')}
          />
           <Menu.Item
            name='Sent Requests'
            active={profile.activeItem === 'sentrequest'}
            onClick={()=>handleItemClick('sentrequest')}
          />
                  <Menu.Menu position='right'>
            <Menu.Item>
              <Button onClick={()=>Logout()}>Log Out</Button>
            </Menu.Item>
            <Menu.Item>
              <Addbook></Addbook>
            </Menu.Item>
          </Menu.Menu>
        </Menu>


        <Segment attached='bottom' className='ContentProfile'>
{profile_page()}
        </Segment>
      </div></>
    )
  }
export default ProfilePageManager;