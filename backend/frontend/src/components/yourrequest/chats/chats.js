import React from 'react'
import './chats.css'
import { Comment } from 'semantic-ui-react'
const Chats = ({bookdet}) =>{
if(bookdet.request_details.accepted){
    if(bookdet.status.chats==null){
        return(<p>No chats</p>)
    }else{
        console.log(bookdet.status.chats)
   return(Object.entries(bookdet.status.chats).map(([key, value]) =>
    <Comment>
   <Comment.Avatar as='a' src={'../images/profile_image/'+value[0]+'/'+value[0]+'.jpg'} className='chatavatar' />
   <Comment.Content>
     <Comment.Author as='a'>{value[0]}</Comment.Author>
     <Comment.Metadata>
       <span>{key.substring(11, 19)+' | '+key.substring(5, 10)}</span>
     </Comment.Metadata>
     <Comment.Text>{value[1]}</Comment.Text>
   </Comment.Content>
   </Comment>
    )
)}
}else{
    return(<p>Hello</p>)
}

}
export default Chats;

