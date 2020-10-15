import React, { useContext } from 'react'
import './yourbook.css'
import Chats from '../chats/chats'
import { Comment } from 'semantic-ui-react'
import { BookContext } from '../../../contexts/BookDetails'

const Yourbooks = () => {
    const [book, setBook] = useContext(BookContext)
    const send = (book_id, msg) => {
        fetch('http://127.0.0.1:8000/api/' + book_id + '/' + msg + '/addchat/').then(response => response.json()).then(result => console.log(result)).then(
            fetch('http://127.0.0.1:8000/api/user_booklist/')
                .then(data => data.json())
                .then(data => {
                    setBook({ Yourbooks: data })
                }))
    }
    console.log(book.Yourbooks);
    const show_hide = (book) => {
        if (book.bookdetails.availibility) {
            return ('Show Request')
        } else {
            return ('Show Chat')
        }
    }
    const sendbox = (book) => {
        if (book.bookdetails.availibility) {
            return
        } else {
            return (
                <div class="input-group mb-3" id={book.bookdetails.book_id + '_sendbutton'}>
                    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" id={book.bookdetails.book_id} />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={() => send(book.bookdetails.book_id, document.getElementById(book.bookdetails.book_id).value)}>Send</button>
                    </div>
                </div>)
            {/* <div className='text_send' id={book.bookdetails.book_id+'_sendbutton'}><input type='text' className='msg' id={book.bookdetails.book_id}></input>
            <input type='button' className='sendbutton' value='send' onClick={() => send(book.bookdetails.book_id, document.getElementById(book.bookdetails.book_id).value)}></input>
        </div>) */}
        }
    }
    return (
        book.Yourbooks.map(book =>
            <div className='your_books' key={book.bookdetails.book_id}>
                <div className='bookcont'>
                    <div className='bookimg'>
                        <img src={book.bookdetails.book_img} className='boimg'></img>
                    </div>
                    <div className='bookdet'>
                        <span className='bookname'>{book.bookdetails.book_name}</span>
                        <span className='book_added_data'>{book.bookdetails.time}</span>
                    </div>
                    <button className='delete'>Delete</button>
                </div>
                <div className='comment'>
                    <div className='chat_container' id={book.bookdetails.book_id + '_container'}>
                        <div className='chat_msg'>
                            
                        <Comment.Group minimal>
                            <Comment>
                            <Chats status={book.status}></Chats>
                            </Comment>
                            </Comment.Group>
                        </div>
                    </div>
                    {
                        sendbox(book)
                    }
                    <button
                        className='show_hide_char' onClick={(e) => {
                            document.getElementById(book.bookdetails.book_id + '_container').style.height = document.getElementById(book.bookdetails.book_id + '_container').style.height != 'auto' ? 'auto' : '0px';
                            document.getElementById(book.bookdetails.book_id + '_sendbutton').style.display = document.getElementById(book.bookdetails.book_id + '_sendbutton').style.display != 'flex' ? 'flex' : 'none';
                            if (e.target.innerHTML == 'Show Chat') { e.target.innerHTML = 'Hide Chat' }
                            else if (e.target.innerHTML == 'Hide Chat') { e.target.innerHTML = 'Show Chat' }
                            else if (e.target.innerHTML == 'Show Request') { e.target.innerHTML = 'Hide Request' }
                            else if (e.target.innerHTML == 'Hide Request') { e.target.innerHTML = 'Show Request' }

                        }}>{show_hide(book)}</button>
                </div>
            </div>))
}



export default Yourbooks;
