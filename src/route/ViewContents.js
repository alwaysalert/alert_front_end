import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import Checkbox from '@mui/material/Checkbox';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import { FormControlLabel } from '@mui/material';

import BoardProfile from './BoardProfile'
import { useCookies } from 'react-cookie';


function ViewContents(props) {
    const baseURL = 'http://127.0.0.1:8000';
    //쿠키에서 access_token받아오기
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const [userInfo, setUserInfo] = useState({
      auth_user_id : 2,
      id : 1,
      is_existing : true,
      nickname : 'name',
      profile_color_id : 3,
      profile_picture_id : 1,
      user_email:'',
      user_job : 1
    });
    let newUserInfo = {...userInfo};
  
    const CheckUser = (access_token) => {
      const baseurl= 'http://127.0.0.1:8000'
      
      axios.get(`${baseurl}/users/check_user`, {
          params: {
            token: access_token,
            format: 'json',
          }}).then(async (res) => {
            //console.log('data =',res.data);
            newUserInfo ={...res.data};
            setUserInfo(newUserInfo);
            //console.log('state:',userInfot);
          })
    
    }
  
  
    useEffect(() => {
      CheckUser(cookies.access_token);
      
      // console.log('a:', userInfo);
    }, []);
    
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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const label2 = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <>

      
      <Nav />
      <div className="freeart-content">
        <div className="freeart-content-head">
          <div className="freeart-content-head-title">자유게시판</div>
          <div className="freeart-content-head-content"><strong>자유게시판에서 여러분의 이야기를 자유롭게 들려주세요</strong></div>
        </div>
        <div className="freeart-content-profile">
        <BoardProfile isLoggedIn = {props.isLoggedIn} uInfo = {userInfo}></BoardProfile>
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
                  
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A'}}>
                    신고하기
                  </div>
            </div>
            <div className='fmc-title' style={{fontFamily: 'apple-font-EB'}}>{DATA.title}</div>
            <div className='fmc-contents'>{DATA.body}</div>
            <div className='fmc-icon'>
            
            <FormControlLabel style={{border:'none', width:'20px',marginTop: '-15px'}}
            control={
              <Checkbox
                {...label}
                icon={<ThumbUpAltIcon sx={{ color: 'grey',width:'23px',height:'23px' }}/>}
                checkedIcon={<ThumbUpAltIcon sx={{ color: 'red',width:'23px',height:'23px' }}/>}
                
              />
            }
            
          />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
            23
          </span>
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            <ChatIcon sx={{ color: 'grey',width:'23px',height:'23px',marginTop:'10px' }}/>
          </div>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',marginRight:'-5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
            3
          </span>
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            <StarIcon sx={{ color: 'grey',width:'23px',height:'23px',marginTop:'10px' }}/>
          </div>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
            3
          </span>
          
               
                
              
            
          
              
            
            </div>
        </div>
        <div className="freeart-comment">
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
                  
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    대댓글
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    좋아요
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    신고하기
              </div>
            </div>
            <div className='fmc-contents'>{DATA.body}</div>
        </div>
        <div className="freeart-comment">
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
                  
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    대댓글
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    좋아요
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    신고하기
              </div>
            </div>
            <div className='fmc-contents'>{DATA.body}</div>
            <div className='freeart-comcomment'>
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
                  
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    좋아요
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    신고하기
              </div>
            </div>
            <div className='fmc-contents'>{DATA.body}</div>
            </div>
        </div>
        <div className='fmc-comment-input'>
          <textarea  className='write-comment' placeholder="댓글을 입력하세요." ></textarea>
          
          <FormControlLabel style={{border:'none', display: 'inline-block', width:'25px',verticalAlign:'top',marginTop:'-2px',marginLeft:'3px'}} control={<Checkbox coler="default" />} />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'12.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>익명</span>
          <div className="fmc-comment-submit">
            <CreateIcon sx={{marginLeft:'10px' ,width:'25px',heigth:'25px' ,color:'white',marginTop:'5px',marginLeft:'7px'}}/>
          </div>
        </div>
        </div>
        
        
      </div>
    </>
  )
}

export default ViewContents