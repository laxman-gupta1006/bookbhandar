import React from 'react'
import './request.css'
const Request = ({status}) =>Object.entries(status.chats).map(([key, value]) =>
 <div className='text'>
        <div className='time_user'>
            <div className='user'>{value[0]}</div>
            <div className='time'>{key.substring(11, 19)+' | '+key.substring(5, 10)}</div>
        </div>
        <p className='text_msg'>{value[1]}</p>
    </div >
)


export default Request;

