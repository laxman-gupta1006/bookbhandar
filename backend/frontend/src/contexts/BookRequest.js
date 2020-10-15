import React,{createContext,useState,useEffect} from 'react';

export const RequestContext = createContext();
export const RequestProvider = props =>{
    const [ book,setBook ] = useState({
        Yourbooks:[],
        status:[]
    })
    const fet = () => {
        fetch('http://127.0.0.1:8000/api/your_sended_request/')
        .then(data => data.json())
        .then(data => {
        setBook({ Yourbooks: data })})
    }
    useEffect(fet,[])
    return(
        <RequestContext.Provider value={[ book,setBook ] }>
            { props.children } 
        </RequestContext.Provider>
 
 )
}