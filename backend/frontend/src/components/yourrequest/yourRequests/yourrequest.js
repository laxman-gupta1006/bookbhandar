import React, { useContext, useEffect } from 'react'
import './yourrequest.css'
import { Comment } from 'semantic-ui-react'
import Chats from '../chats/chats'
// import Request from '../show_request/request'
import { RequestContext } from '../../../contexts/BookRequest'
// import person from '../../../person.png'
import SendButton from '../sendtext/send';

const YourRequests = () => {

    const [book, setBook] = useContext(RequestContext)
    return(
        book.Yourbooks.map(books => 
                <div className='your_books' key={books.request_book_details.book_id}>
                    <div className='bookcont'>
                        <div className='bookimg'>
                            <img src={books.request_book_details.book_img} className='boimg'></img>
                        </div>
                        <div className='bookdet'>
                            <span className='bookname'><b>{books.request_book_details.book_name}</b></span>
                            <span className='book_added_data'>{books.request_book_details.user_name}</span>
                            <span className='book_added_data'>{books.request_book_details.time}</span>
                            <span className='book_added_data'>{books.request_book_details.college+','+books.request_book_details.city}</span>
                        </div>
                        <button className='delete'>Delete</button>
                    </div>
                    <div className='comment'>
                        <div className='chat_container' id={books.request_book_details.book_id + '_container'}>
                            <div className='chat_msg'>
                            <Comment.Group minimal>
                                <Chats bookdet={books}></Chats>
                                </Comment.Group>
                            </div>
                        </div>
                        <SendButton books={books}></SendButton>
                    </div>
                </div>))}

   
     
export default YourRequests;
