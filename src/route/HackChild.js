import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import '../css/hackchild.css'
//import { useLocation } from "react-router-dom"
import HackChildContent from './HackChildContent';
import BoardProfile from './BoardProfile';

import axios from 'axios'
import { useCookies } from 'react-cookie';




function HackChild(props) {
    //버튼
    const [whatNum, setWhatNum] = useState(0);
    const [whatPost0, setWhatPost0] = useState(true); 
    const [whatPost1, setWhatPost1] = useState(false); 
    const [whatPost2, setWhatPost2] = useState(false); 
    const [whatPost3, setWhatPost3] = useState(false); 
    const [whatPost4, setWhatPost4] = useState(false); 

    
    const [isHover0, setIsHover0] = useState(false);
    const [isHover1, setIsHover1] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isHover4, setIsHover4] = useState(false);

    

    //쿠키에서 access_token받아오기
  const [cookies,,] = useCookies(['access_token']);
  
  // 쿠키를 확인했을때 access_token이 없으면 되돌려 보내고, 아니면 checkUser
  
  const [userInfo, setUserInfo] = useState({
    auth_user_id : null,
    id : null,
    is_existing : null,
    nickname : null,
    profile_color_id : null,
    profile_picture_id : null,
    user_email:null,
    user_job : null
  });
  let newUserInfo = {...userInfo};

  const CheckUser = (access_token) => {
    const baseurl= process.env.REACT_APP_BACK_BASE_URL
    
    axios.get(`${baseurl}/users/check_user`, {
        params: {
          token: access_token,
          format: 'json',
        }}).then(async (res) => {
          
          newUserInfo ={...res.data};
          
          setUserInfo(newUserInfo);
         
        })
  
  }


  useEffect(() => {
    CheckUser(cookies.access_token);
    
   
  }, []);

    //어떤 버튼을 누르고 들어왔냐에 따라서 스테이트 다르게
    useEffect(() => {
        
      }, []);

    
      // box css
      const boxStyle0 ={
        color: isHover0 ? '#4285F4' : 'black',
        borderBottom : whatPost0 ? 'solid 5px #4285F4' : 'white'
      }
      const boxStyle1 ={
        color: isHover1 ? '#4285F4' : 'black',
        borderBottom : whatPost1 ? 'solid 5px #4285F4' : 'white'
      }
      const boxStyle2 ={
        color: isHover2 ? '#4285F4' : 'black',
        borderBottom : whatPost2 ? 'solid 5px #4285F4' : 'white'
      }
      const boxStyle3 ={
        color: isHover3 ? '#4285F4' : 'black',
        borderBottom : whatPost3 ? 'solid 5px #4285F4' : 'white'
      }
      const boxStyle4 ={
        color: isHover4 ? '#4285F4' : 'black',
        borderBottom : whatPost4 ? 'solid 5px #4285F4' : 'white'
      }

  return (
    <div>
        <Nav />
        
        <div className="freeart-content">
        <div className="hackChild-content-head1">
          <div className="hackChild-content-head-title">핵린이 게시판</div>
          <div className="hackChild-content-head-content"><strong>해킹이 처음인 당신을 위해 준비했어요</strong></div>
          
        </div>
        <BoardProfile isLoggedIn = {props.isLoggedIn} uInfo ={userInfo} board ='핵린이 게시판'></BoardProfile>
        <div className='hackChild-content-activity'>
            <div className = "myactivity-content-head">For 핵린이</div>
            <button  
                    style={boxStyle0}
                    onMouseEnter={()=>{setIsHover0(true)}}
                    onMouseLeave={()=>{setIsHover0(false)}}
                    onClick={()=>{
                        setWhatPost0(true)
                        setWhatPost1(false)
                        setWhatPost2(false)
                        setWhatPost3(false)
                        setWhatPost4(false)
                        setWhatNum(0);
                    }}
                    className = 'hackChild-button0'>
                        Q&A
                    
                </button>
            <button  
                    style={boxStyle1}
                    onMouseEnter={()=>{setIsHover1(true)}}
                    onMouseLeave={()=>{setIsHover1(false)}}
                    onClick={()=>{
                        setWhatPost0(false)
                        setWhatPost1(true)
                        setWhatPost2(false)
                        setWhatPost3(false)
                        setWhatPost4(false)
                        setWhatNum(1);
                    }}
                    className = 'hackChild-button1'>
                        시스템 해킹
                    
                </button>
                <button 
                    style={boxStyle2}
                    onMouseEnter={()=>{setIsHover2(true)}}
                    onMouseLeave={()=>{setIsHover2(false)}}
                    onClick={()=>{
                        setWhatPost0(false)
                        setWhatPost1(false)
                        setWhatPost2(true)
                        setWhatPost3(false)
                        setWhatPost4(false)
                        setWhatNum(2);
                    }}
                    className = 'hackChild-button2'>웹 해킹</button>
                <button 
                    style={boxStyle3}
                    onMouseEnter={()=>{setIsHover3(true)}}
                    onMouseLeave={()=>{setIsHover3(false)}}
                    onClick={()=>{
                        setWhatPost0(false)
                        setWhatPost1(false)
                        setWhatPost2(false)
                        setWhatPost3(true)
                        setWhatPost4(false)
                        setWhatNum(3);
                    }}
                    className = 'hackChild-button3'>리버싱</button>
                <button 
                    style={boxStyle4}
                    onMouseEnter={()=>{setIsHover4(true)}}
                    onMouseLeave={()=>{setIsHover4(false)}}
                    onClick={()=>{
                        setWhatPost0(false)
                        setWhatPost1(false)
                        setWhatPost2(false)
                        setWhatPost3(false)
                        setWhatPost4(true)
                        setWhatNum(4);
                    }}
                    className = 'hackChild-button4'>기타</button>
                    {/* 게시물 Component */}
                    <HackChildContent num ={whatNum}></HackChildContent>
          </div>
          
          
        </div>
        
    </div>
    
  )
}

export default HackChild