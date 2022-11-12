import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/myactivity.css'
import '../css/hackchild.css'
import axios from 'axios'

import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Link } from 'react-router-dom'
//util.js
import * as util from '../util/util';
import Qna from './Qna'


function CreateAriticle(){

  return (
    <div className="hackchild-create-article">
      <span className='hackchild-create-text'>
        <strong>
          이 분야를 공부하며 모르는 부분은 질문을 통해 해결하세요! 공유하고 싶은 정보도 나눠보아요! 
          </strong>
      </span>
     
      <span className='hackChild-create-button'>
      <EditIcon className='hackChild-create-button-edit' sx={{width:18, height:18}} />
          <span className ='hackChild-create-button-text'> 
            글 작성하기 
          </span>
      </span>
      
    </div>
  )

}


function HackChildContent(props) {
    const baseURL = "http://127.0.0.1:8000"; 

    //article 받아오기
    const [articleArray, setArticle] = useState(null);

    useEffect(() => {
      //Q&A
      if(props.num === 0){
        //axios -> Q&A
      }else{
        axios.get(`${baseURL}/hackchildren/?format=json`).then((res) => {
          setArticle(res.data);
          console.log(res.data);
          
          }).catch((err) => {
            console.log("Error check", err);
          });
      }
        
    },[props.num]);

  
  if(props.num === 0){
    return (
      <div className='hackchild-content-background'>
        <Qna></Qna>
      </div>
    )
  }else{
    return (
      <div className='hackchild-content-background'>
        <CreateAriticle></CreateAriticle>
          {articleArray && articleArray.map(article =>{
            if(article.tag === props.num){
              function formatDate(date) {
                return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                  date.getDate().toString().padStart(2, '0')  + ' ' +
                  date.getHours().toString().padStart(2, '0') + ':' + 
                  date.getMinutes().toString().padStart(2, '0')
              }
              var time = new Date(article.created_time);
              console.log("article=",article)
              
              return (<div  key={article.id} name={article.id} id="hackchild-arts-grid" >
                      <Link to={'/HackChild/'+article.id} style={{width:'930px',height:'130px', backgroundColor:'red'}}>
                      <div>
                      <div className= "myactivity-arts-profile-circle" style ={{background : util.hexcolor(article.author_info.profile_color_id)}} ><img alt = 'freeartprofile'className="myactivity-arts-profile" src={util.image_route(article.author_info.profile_picture_id)}/></div>
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
            }
            
  })}
      </div>
    )
  }
  
}

export default HackChildContent