import React,{Component, useContext,useEffect} from 'react'
import './books.css'
import YourRequest from './yourRequests/yourrequest'
import Navmenu from '../nav_component/nav_component'
import { RequestProvider } from '../../contexts/BookRequest';
import { Route } from 'react-router-dom'
const ReqBooks = () => {
        return(
            <>
        <div className='contentbook'>
            <div className='content-container'>
                <RequestProvider>
                <YourRequest/>
                </RequestProvider>
                </div>
        </div>
        </>
        )

}
export default ReqBooks;