import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/myactivity.css'
import '../css/hackchild.css'
import axios from 'axios'

function HackChildContent(props) {
    const baseURL = "http://127.0.0.1:8000"; 

    //article 받아오기
    const [articleArray, setArticle] = useState(null)
    useEffect(() => {
        axios.get(`${baseURL}/hackchildren/?format=json`).then((res) => {
            setArticle(res.data);
            console.log(res.data);
            
            }).catch((err) => {
              console.log("Error check", err);
            });
    },[]);


  return (
    <div className='hackchild-content-background'>
        
    </div>
  )
}

export default HackChildContent