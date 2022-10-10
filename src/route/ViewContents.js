import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import Checkbox from '@mui/material/Checkbox';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


import { FormControlLabel } from '@mui/material';






function ViewContents() {
    const baseURL = 'http://127.0.0.1:8000';
    
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const {id} = useParams();
    const [DATA,datafunc] = useState({})
    
    useEffect(() => {
      
      axios.get(`${baseURL}/freeboards/${id}/?format=json`).then((res) => {
        console.log(res.data)
        datafunc(res.data);
        console.log('move! =',DATA);
        
        }).catch((err) => {
          console.log("Error check", err);
        });
      
    },[])
    function formatDate(date) {
      return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
        date.getDate().toString().padStart(2, '0')  + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' + 
        date.getMinutes().toString().padStart(2, '0')
    }
    const newTime = new Date(DATA.created_time);
    
  return (
    <>

      
      <Nav />
      <div className="freeart-content">
        <div className="freeart-content-head">
          <div className="freeart-content-head-title">자유게시판</div>
          <div className="freeart-content-head-content"><strong>자유게시판에서 여러분의 이야기를 자유롭게 들려주세요</strong></div>
        </div>
        <div className="freeart-content-profile">
          <div className="freeart-content-profile-name"><strong>{'조승현'}</strong></div>
          <div className="freeart-content-profile-nim"><strong>님</strong></div>
          <img className="freeart-content-profile-boho" src='/img/boho/mypageboho.png' />
          <div className="freeart-activity"><strong>자유게시판에서 조승현님의 활동</strong></div>
          <div className="freeart-buttonBoxes">
            <div><strong>작성글</strong></div>
            <div><strong>댓글</strong></div>
            <div><strong>좋아요</strong></div>
            <div><strong>스크랩</strong></div>
          </div>  
        </div>
        <div className="freeart-form-div">
        <div className="freeart-maincontents" >
            <div className="freeart-maincontents-header">
              <div className="fmh-left">
                <div className='fm-img-background'>
                  <img src='/img/profile/profile4.png' className="fm-img"></img>
                </div>
              </div>
              <div className="fmh-right">
                  <div style={{display:"inline-block"}}>
                    <p style={{fontFamily:'apple-font-EB', fontWeight:'bold'}}>{DATA.author_nickname}</p>
                    <p style={{fontFamily:'apple-font-M',color:'#8A8A8A'}}>{formatDate(newTime)}</p>
                  </div>
                  <div className="fmc-report" style={{color:'#8A8A8A'}}>
                    신고하기
                  </div>
              </div>
            </div>
            <div className='fmc-title' style={{fontFamily: 'apple-font-EB'}}>{DATA.title}</div>
            <div className='fmc-contents'>{DATA.body}</div>
            <div className='fmc-icon'>
            
            <FormControlLabel style={{border:'none'}}
            control={
              <Checkbox
                {...label}
                icon={<ThumbUpOffAltIcon sx={{ color: 'black' }}/>}
                checkedIcon={<ThumbUpAltIcon sx={{ color: 'black' }}/>}
                
              />
            }
            
          />
              
            
            </div>
        </div>
        </div>
        
        
      </div>
    </>
  )
}

export default ViewContents