import React, { Component, useState } from 'react'
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react'
import './add_book.css'
import CSRFToken from '../csrftoken'
import Navmenu from '../nav_component/nav_component'
import Footer from '../Footer/footer'

const Addbook = () => {
  const [state,setState]=useState({open: false})
  const handleClick = () => setState({ open: !state.open })
  const handleClose = () => setState({ open: false })
        const Addbookdata = () => {
            var formdata = new FormData();
            formdata.append("bookname", document.getElementById('book_name').value);
            // formdata.append("price", document.getElementById('price').value);
            formdata.append("about", document.getElementById('about_book').value);
            // formdata.append("category", document.querySelector('input[name="cat"]:checked').value);
            formdata.append("bookimg", document.getElementById('bookimg').files[0]);
            formdata.append("csrfmiddlewaretoken", document.getElementById('csrftoken').value);
            var requestOptions = {
                method: 'POST',
                body: formdata,
                //   redirect: 'follow'
            };
        
            fetch("/api/addbook/", requestOptions).then(data => data.json()).then(data => {
                if(data.book='added'){
                    alert('Book Added')
                }
                window.location.reload()
            })
                .catch(error =>  window.location.href='http://127.0.0.1:8000/login');
                }
    return (
      <div>
        <Button
          content={state.open ? 'Close' : 'Add Book'}
          negative={state.open}
          positive={!state.open}
          onClick={()=>handleClick()}
          color={"blue"}
        />

        <TransitionablePortal onClose={()=>handleClose()} open={state.open}>
          <Segment
            style={{ left: '30%', position: 'fixed', top: '30%', zIndex: 1000 }}
          >
        <CSRFToken></CSRFToken>
    <div id="book">
    <div id='box'>
    <div id="book_img">
        {/* <input type="image" src="assits/logo.png" id='image'/> */}
        {/* <input type="file"/> */}
        <input type="file" accept="image/*;capture=camera" id='bookimg'></input>
    </div>
    <div id="book_details">
        <form id="add_book_details">
            <div class="fields">
            <label>Name Of book</label>  
            <input type="text" name="book_name" id='book_name' class="form-control" placeholder="Harry Potter"/>  
        </div>
         <div class="fields">
            <label>About book</label>  
            <textarea name="about_book" id='about_book' placeholder="The book is based on ****"></textarea>
        </div>
    <input type="button" onClick={Addbookdata} value='submit'/> 
        </form>
    </div>
</div>
<Footer></Footer>
</div>


          </Segment>
        </TransitionablePortal>
      </div>
    )
  }


export default Addbook;



// import React from 'react'
// import './add_book.css'
// import CSRFToken from '../csrftoken'
// import Navmenu from '../nav_component/nav_component'
// import Footer from '../Footer/footer'
// const Addbook = () => {
//         const Addbookdata = () => {
//             var formdata = new FormData();
//             formdata.append("bookname", document.getElementById('book_name').value);
//             // formdata.append("price", document.getElementById('price').value);
//             formdata.append("about", document.getElementById('about_book').value);
//             // formdata.append("category", document.querySelector('input[name="cat"]:checked').value);
//             formdata.append("bookimg", document.getElementById('bookimg').files[0]);
//             formdata.append("csrfmiddlewaretoken", document.getElementById('csrftoken').value);
//             var requestOptions = {
//                 method: 'POST',
//                 body: formdata,
//                 //   redirect: 'follow'
//             };
        
//             fetch("/api/addbook/", requestOptions).then(data => data.json()).then(data => {
//                 if(data.book='added'){
//                     alert('Book Added')
//                 }
//                 window.location.reload()
//             })
//                 .catch(error =>  window.location.href='http://127.0.0.1:8000/login');
//                 }
    

//     return(   
//         <> 
//         <Navmenu></Navmenu>
//         <CSRFToken></CSRFToken>
//     <div id="book">
//     <div id='box'>
//     <div id="book_img">
//         {/* <input type="image" src="assits/logo.png" id='image'/> */}
//         {/* <input type="file"/> */}
//         <input type="file" accept="image/*;capture=camera" id='bookimg'></input>
//     </div>
//     <div id="book_details">
//         <form id="add_book_details">
//             <div class="fields">
//             <label>Name Of book</label>  
//             <input type="text" name="book_name" id='book_name' class="form-control" placeholder="Harry Potter"/>  
//         </div>
//          <div class="fields">
//             <label>About book</label>  
//             <textarea name="about_book" id='about_book' placeholder="The book is based on ****"></textarea>
//         </div>
//     <input type="button" onClick={Addbookdata} value='submit'/> 
//         </form>
//     </div>
// </div>
// <Footer></Footer>
// </div>
// </>
// )
// }
// export default Addbook