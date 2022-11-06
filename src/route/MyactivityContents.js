import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/myactivity.css'

import { useCookies } from 'react-cookie';


import '../css/freeart.css'
import Nav from './Nav'
import AttachFileIcon from '@mui/icons-material/AttachFile';

import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import { Link } from 'react-router-dom'
import BoardProfile from './BoardProfile'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { accordionDetailsClasses } from '@mui/material';

function MyactivityContents(props) {
  //baseURL
  const baseURL = "http://127.0.0.1:8000"; 
  //articleArray
  const [articleArray,setArticle] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  console.log('cookie',cookies.access_token);
  useEffect(() => {
    //1 => 작성한글
    if(props.num === 1){
      axios.get(`${baseURL}/freeboards/?format=json`).then(async (res) => {
        setArticle(res.data);
        console.log(res.data);
        
        }).catch((err) => {
          console.log("Error check", err);
        });
    }
    
  }, []);

//auther 프로필 수정
const image_route = (num) => {
  
  if(num === 1){
    return '/img/profile/profile1.png'
  }else if(num === 2){
    return '/img/profile/profile2.png'
  }else if(num === 3){
    return '/img/profile/profile3.png'
  }else if(num === 4){
    return '/img/profile/profile4.png'
  }else if(num === 5){
    return '/img/profile/profile5.png'
  }else if(num === 6){
    return '/img/profile/profile6.png'
  }else if(num === 7){
    return '/img/profile/profile7.png'
  }
}
const hexcolor = (num) =>{
  if(num === 1){
    return '#c5e0b4'
  }else if(num === 2){
    return '#ffe699'
  }else if(num === 3){
    return '#bdd7ee'
  }else if(num === 4){
    return '#f8cbad'
  }else if(num === 5){
    return '#ffc5cd'
  }else if(num === 6){
    return '#dfc2ec'
  }else if(num === 7){
    return '#adb9ca'
  }
}

  return (
    <div className='myactivity-content-background'>
                {articleArray && articleArray.map(article =>{
          function formatDate(date) {
            return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
              date.getDate().toString().padStart(2, '0')  + ' ' +
              date.getHours().toString().padStart(2, '0') + ':' + 
              date.getMinutes().toString().padStart(2, '0')
          }
          var time = new Date(article.created_time);
          console.log("article=",article)
          
          return (<div  key={article.id} name={article.id} id="myactivity-arts-grid" >
                  <Link to={'/freeart/'+article.id} style={{width:'930px',height:'130px', backgroundColor:'red'}}>
                  <div>
                  <div className= "myactivity-arts-profile-circle" style ={{background : hexcolor(article.author_info.profile_color_id)}} ><img alt = 'freeartprofile'className="myactivity-arts-profile" src={image_route(article.author_info.profile_picture_id)}/></div>
                  
                
                
                  <h4 className="myactivity-arts-title"><strong>{article.title}</strong></h4>
                  <p className = 'myactivity-arts-text'><strong>{article.body.length > 100 ? article.body.substr(0,100) + '...' : article.body}</strong></p>
                  <span className="freeart-arts-whenwho">{formatDate(time)}&nbsp;&nbsp;|&nbsp;&nbsp;{article.author_info.nickname}</span>
                  <span className="count-container">
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            
            <ThumbUpAltIcon sx={{ color: '#b9b9b9',width:'23px',height:'23px',marginTop:'3' }}/>
          </div>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'10.5px',fontFamily:'apple-font-EB',color:'#b9b9b9'}}>
            {article.like_users.length}
          </span>
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            <ChatIcon sx={{ color: '#b9b9b9',width:'23px',height:'23px',marginTop:'3px' }}/>
          </div>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'10.5px',marginRight:'-5px',fontFamily:'apple-font-EB',color:'#b9b9b9'}}>
          
          {article.comment_count}
          </span>
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            <StarIcon sx={{ color: '#b9b9b9',width:'23px',height:'23px',marginTop:'3px' }}/>
          </div>
          <span style={{display:'inline-block',width:'3px',fontSize:'11px',verticalAlign:'top',marginTop:'10.5px',fontFamily:'apple-font-EB',color:'#b9b9b9'}}>
          {article.bookmark ? article.bookmark.length : "0"}
          </span>
                  </span>                  
                  </div>
                  
                  </Link>
                  </div>)
})}
                </div>
  )
}

export default MyactivityContents