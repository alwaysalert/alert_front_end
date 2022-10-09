import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/myactivity.css'
import Nav from './Nav'
import TagIcon from '@mui/icons-material/Tag';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { dbService } from '../firebase'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import axios from 'axios'
import BoardProfile from './BoardProfile'
import { useCookies } from 'react-cookie';

import { useLocation } from "react-router-dom"

function MyActivity(props) {
    const [whatPost1, setWhatPost1] = useState(false); 
    const [whatPost2, setWhatPost2] = useState(false); 
    const [whatPost3, setWhatPost3] = useState(false); 
    const [whatPost4, setWhatPost4] = useState(false); 
    const location = useLocation();
    console.log(location.state.id)

    const [isHover1, setIsHover1] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isHover4, setIsHover4] = useState(false);

    


    //어떤 버튼을 누르고 들어왔냐에 따라서 스테이트 다르게
    useEffect(() => {
        if(location.state.id === 1){
            setWhatPost1(true)
            setWhatPost2(false)
            setWhatPost3(false)
            setWhatPost4(false)
        }else if(location.state.id === 2){
            setWhatPost1(false)
            setWhatPost2(true)
            setWhatPost3(false)
            setWhatPost4(false)
        }else if(location.state.id === 3){
            setWhatPost1(false)
            setWhatPost2(false)
            setWhatPost3(true)
            setWhatPost4(false)
        }else if(location.state.id === 4){
            setWhatPost1(false)
            setWhatPost2(false)
            setWhatPost3(false)
            setWhatPost4(true)
        }
        //console.log('a:', newUserInfot);
      }, []);

    //스테이트에 따라서 
    // useEffect(() => {
    //     if(whatPost1 === true){
    //         setWhatPost2(false)
    //         setWhatPost3(false)
    //         setWhatPost4(false)
    //     }else if(whatPost2 === true){
    //         setWhatPost1(false)
    //         setWhatPost2(true)
    //         setWhatPost3(false)
    //         setWhatPost4(false)
    //     }else if(whatPost3 === true){
    //         setWhatPost1(false)
    //         setWhatPost2(false)
    //         setWhatPost3(true)
    //         setWhatPost4(false)
    //     }else if(whatPost4 === true){
    //         setWhatPost1(false)
    //         setWhatPost2(false)
    //         setWhatPost3(false)
    //         setWhatPost4(true)
    //     }
    //     //console.log('a:', newUserInfot);
    //   }, [whatPost1,whatPost2,whatPost3,whatPost4 ]);

      

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
    <>

      
      <Nav />
      <div className="freeart-content">
        <div className="freeart-content-head">
          <div className="freeart-content-head-title">나의 활동</div>
          <div className="freeart-content-head-content"><strong>너네가 쓴 글이에요</strong></div>
        </div>
        <div className='myactivity-content-activity'>
            <div className = "myactivity-content-head"><strong>나의 활동</strong></div>
            <div>
                <button  
                    style={boxStyle1}
                    onMouseEnter={()=>{setIsHover1(true)}}
                    onMouseLeave={()=>{setIsHover1(false)}}
                    onClick={()=>{
                        setWhatPost1(true)
                        setWhatPost2(false)
                        setWhatPost3(false)
                        setWhatPost4(false)
                    }}
                    className = 'myactivity-button1'><strong>
                        작성한 글
                    </strong>
                </button>
                <button 
                    style={boxStyle2}
                    onMouseEnter={()=>{setIsHover2(true)}}
                    onMouseLeave={()=>{setIsHover2(false)}}
                    onClick={()=>{
                        setWhatPost1(false)
                        setWhatPost2(true)
                        setWhatPost3(false)
                        setWhatPost4(false)
                    }}
                    className = 'myactivity-button2'><strong>스크랩한 글</strong></button>
                <button 
                    style={boxStyle3}
                    onMouseEnter={()=>{setIsHover3(true)}}
                    onMouseLeave={()=>{setIsHover3(false)}}
                    onClick={()=>{
                        setWhatPost1(false)
                        setWhatPost2(false)
                        setWhatPost3(true)
                        setWhatPost4(false)
                    }}
                    className = 'myactivity-button3'><strong>좋아요한 글</strong></button>
                <button 
                    style={boxStyle4}
                    onMouseEnter={()=>{setIsHover4(true)}}
                    onMouseLeave={()=>{setIsHover4(false)}}
                    onClick={()=>{
                        setWhatPost1(false)
                        setWhatPost2(false)
                        setWhatPost3(false)
                        setWhatPost4(true)
                    }}
                    className = 'myactivity-button4'><strong>댓글</strong></button>
            </div>
            
          </div>
          <div className='myactivity-content-background'>
                <div className='myactivity-content-post' >
                    프로필 알어니ㅏㅁ러ㅣㅏㄴㅇ러ㅏㅣㄴㅁㄹ
                </div>
                <div className='myactivity-content-post' >
                    프로필 알어니ㅏㅁ러ㅣㅏㄴㅇ러ㅏㅣㄴㅁㄹ
                </div>
          </div>
        
      </div>
    </>
  )
}

export default MyActivity;