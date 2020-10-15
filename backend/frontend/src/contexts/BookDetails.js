import React,{createContext,useState,useEffect} from 'react';

export const BookContext = createContext();
export const BookProvider = props =>{
    const [ book,setBook ] = useState({
        Yourbooks:[]
        // BookRequested:[]
    })
    const fet = () => {
        fetch('http://127.0.0.1:8000/api/user_booklist/')
        .then(data => data.json())
        .then(data => {
        setBook({ Yourbooks: data })})
    }
    useEffect(fet,[])
    return(
        <BookContext.Provider value={[ book,setBook ] }>
            { props.children } 
        </BookContext.Provider>
 
 )
}