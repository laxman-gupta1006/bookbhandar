import React,{Component} from 'react'
import './books.css'
import Yourbooks from './yourbooks/yourbooks'
import Navmenu from '../nav_component/nav_component'
import { BookProvider } from '../../contexts/BookDetails';
import {Button} from 'semantic-ui-react'
import Addbook from '../addbook/addbook';
const Books = () => {
        return(
            <>
        <div className='contentbook'>
            <div className='content-container'>
                <BookProvider>
                <Yourbooks/>
                <Addbook></Addbook>
                </BookProvider>
                </div>
        </div>
        </>
        )
}
export default Books