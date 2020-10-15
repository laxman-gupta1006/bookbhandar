import React,{useContext} from 'react'
import { RequestContext } from '../../../contexts/BookRequest'
const SendButton = ({books}) =>{
    const send = (book_id, msg) => {
        fetch('http://127.0.0.1:8000/api/' + book_id + '/' + msg + '/addchat/').then(response => response.json()).then(result => console.log(result)).then(
        fetch('http://127.0.0.1:8000/api/your_sended_request/')
        .then(data => data.json())
        .then(data => {
            setBook({ Yourbooks: data})
        }).catch(err => console.log(err)))
            }
            const [book, setBook] = useContext(RequestContext)
    if(books.request_details.accepted){
    return(
        <>
         <div class="input-group mb-3"  id={books.request_book_details.book_id+'_sendbutton'}>
                    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" id={books.request_book_details.book_id} />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button"  onClick={() => send(books.request_book_details.book_id, document.getElementById(books.request_book_details.book_id).value)}>Send</button>
                    </div>
                </div>
 <button
className='show_hide_char' onClick={(e) => {
document.getElementById(books.request_book_details.book_id + '_container').style.height = document.getElementById(books.request_book_details.book_id + '_container').style.height != 'auto' ? 'auto' : '0px';
document.getElementById(books.request_book_details.book_id+'_sendbutton').style.display = document.getElementById(books.request_book_details.book_id+'_sendbutton').style.display != 'flex' ? 'flex' : 'none';
e.target.innerHTML = e.target.innerHTML == 'Show Chat' ? 'Hide Chat' : 'Show Chat'
}}>Show Chat</button>
</>
 ) 
}
else if(books.request_book_details.availibility){
    return(<div id='waiting'><p>Waiting to accept your request</p></div>)
}
else{
return(<div id='unavailable'><p>Book Has been Given to Someone Else</p></div>)
}
}
export default SendButton