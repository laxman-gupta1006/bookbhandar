import React,{useContext} from 'react'
import { BookContext } from '../../../contexts/BookDetails'
import { Comment } from 'semantic-ui-react'
import './chats.css'
const Chats = ({ status }) =>{
    const [book, setBook] = useContext(BookContext)
    const accept_request = (requestid) => {
        fetch('http://127.0.0.1:8000/api/' + requestid + '/accept_request/').then(response => response.json()).then(result => console.log(result)).then(
            fetch('http://127.0.0.1:8000/api/user_booklist/')
                .then(data => data.json())
                .then(data => {
                    setBook({ Yourbooks: data })
                }).catch(err => console.log(err)))
        
    }
if(status.accepted_request_id!=null){
    if(status.chats==null){
       return(<p>No chats</p>)
    }
    else{
        return(Object.entries(status.chats).map(([key, value]) =>
        <>
        <Comment.Avatar as='a' src={'../images/profile_image/'+value[0]+'/'+value[0]+'.jpg'} />
        <Comment.Content>
          <Comment.Author as='a'>{value[0]}</Comment.Author>
          <Comment.Metadata>
            <span>{key.substring(11, 19)+' | '+key.substring(5, 10)}</span>
          </Comment.Metadata>
          <Comment.Text>{value[1]}</Comment.Text>
        </Comment.Content>
        </>
    // <div className='textmsg'>
    //     <div className='time_user'>
    //         <div className='user'>{value[0]}</div>
    //         <div className='time'>{key.substring(11, 19)+' | '+key.substring(5, 10)}</div>
    //     </div>
    //     <p className='text_msg'>{value[1]}</p>
    // </div >
    )
)}}else{
    if(status.requests==null){
        return(<p>No request</p>)
    }
    else{
    return(Object.entries(status.requests).map(([key, value]) =>
    <div className='textmsg'>
        <div className='time_user'>
            <div className='user'>{key}</div>
            <div className='time'>{value[0].substring(11, 19)}</div>
        </div>
        <button id='Accept' onClick={()=>accept_request(value[1])}>Accept</button>
    </div >
))}

}
}
export default Chats;

