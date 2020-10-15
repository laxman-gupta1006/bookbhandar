import React from 'react';
import './booklist.css';
import { Card, Icon, Image } from 'semantic-ui-react'
const send = (book_id) => {
  fetch('http://127.0.0.1:8000/api/'+book_id+'/send_request/').then(response => response.json()).then(result => {
    if(result.Request=='sended'){
      alert("Your Request Has been sended")
    }
    if(result.Request=='already'){
      alert("You have sended request to this book before")
    }
    if(result.Request=='NotLogged'){
      window.location.href='/login';
    }
})}
const req_but = (logged,book,verified) =>{
  if(logged){
    if(verified.verified)
    {
      console.log(verified.verified)
        return <button className='request' onClick={()=>send(book.book_id)}>Request</button>
    }else{
      console.log(verified.verified)
    return (
      <button className='request' onClick={()=>alert('verify Your email')}>Request</button>
    )}}
  else{
      return( <button className='request' onClick={()=>window.location.href='/login'}>Request</button>)
    }
}
const Bookslist = ({ filterbooks,logged,verified }) => filterbooks.map(book =>
  // <div>
  // <Card key={book.book_id}>
  //   <Image src={book.book_img} wrapped ui={false} />
  //   <Card.Content>
  //     <Card.Header>{book.book_name}</Card.Header>
  //     <Card.Meta>
  //       <span className='date'>{book.user_name}</span>
  //     </Card.Meta>
  //     <Card.Description>
  //     {book.college+','+book.city}
  //     </Card.Description>
  //   </Card.Content>
  //   <Card.Content extra>
  //   {req_but(logged,book,verified)}
  //   </Card.Content>
  // </Card></div>
  <div className="share_book" key={book.book_id}>
    <div className="book_img_container">
      <img alt="HEllo" src={book.book_img} className="book_img_thumb" />
    </div>
    <div className="book_detail_container">
      <div className="book_title">{book.book_name}</div>
      <div className="book_owner">{book.user_name}</div>
      <div className="college">{book.college+','+book.city}</div>

      {/* <p className="about_book">{book.website}</p> */}
    </div>
    {req_but(logged,book,verified)}
  </div>
)
export default Bookslist;