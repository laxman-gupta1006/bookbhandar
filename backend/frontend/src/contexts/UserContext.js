import React,{createContext,useState,useEffect} from 'react';

export const UserContext = createContext();
export const UserProvider = props =>{
        const [ user,setUser ] = useState({
        logged:false,
        User_info: {
        }
    })
    var userr;
    fetch("http://127.0.0.1:8000/api/check/")
            .then(response => response.json())
            .then(result => {
                if(!user.logged && !result.logged){
                    localStorage.clear()
                    console.log('logged out')
                }else if(result.logged && !localStorage.getItem('data')){ fetch("http://127.0.0.1:8000/api/logout/")}
            })
            console.log(user) 
    if(!user.logged && localStorage.getItem('data'))
        {
        setUser({logged:true,User_info:JSON.parse(localStorage.getItem('data'))})
    }

    
    return(
        <UserContext.Provider value={[ user,setUser ] }>
            { props.children } 
        </UserContext.Provider>
    )
}  