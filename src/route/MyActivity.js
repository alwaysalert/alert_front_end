import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/myactivity.css'
import Nav from './Nav'

import { useLocation } from "react-router-dom"
import MyactivityContents from './MyactivityContents'

function MyActivity(props) {
    const [whatNum, setWhatNum] = useState(1);
    const [whatPost1, setWhatPost1] = useState(false); 
    const [whatPost2, setWhatPost2] = useState(false); 
    const [whatPost3, setWhatPost3] = useState(false); 
    const [whatPost4, setWhatPost4] = useState(false); 
    const location = useLocation();
    //console.log(location.state.id)

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
            setWhatNum(1);
        }else if(location.state.id === 2){
            setWhatPost1(false)
            setWhatPost2(true)
            setWhatPost3(false)
            setWhatPost4(false)
            setWhatNum(2);
        }else if(location.state.id === 3){
            setWhatPost1(false)
            setWhatPost2(false)
            setWhatPost3(true)
            setWhatPost4(false)
            setWhatNum(3);
        }else if(location.state.id === 4){
            setWhatPost1(false)
            setWhatPost2(false)
            setWhatPost3(false)
            setWhatPost4(true)
            setWhatNum(4);
        }
        //console.log('a:', newUserInfot);
         //eslint-disable-next-line
      }, []);

    //마우스 올렸을때 색깔 다르게
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
        <div className="myactivity-content-head1">
          <div className="myactivity-content-head-title">나의 활동</div>
          <div className="myactivity-content-head-content"><strong>Alert에서 사용하게 될 다양한 정보 등을 수정 및 확인할 수 있어요</strong></div>
        </div>
        <div className="myactivity-content-activity">
        <div className='myactivity-content-activity-header'>
            <div className = "myactivity-content-head">나의 활동</div>
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
                        setWhatNum(1);
                    }}
                    className = 'myactivity-button1'>
                        작성한 글
                    
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
                        setWhatNum(2);
                    }}
                    className = 'myactivity-button2'>스크랩한 글</button>
                <button 
                    style={boxStyle3}
                    onMouseEnter={()=>{setIsHover3(true)}}
                    onMouseLeave={()=>{setIsHover3(false)}}
                    onClick={()=>{
                        setWhatPost1(false)
                        setWhatPost2(false)
                        setWhatPost3(true)
                        setWhatPost4(false)
                        setWhatNum(3);
                    }}
                    className = 'myactivity-button3'>좋아요한 글</button>
                <button 
                    style={boxStyle4}
                    onMouseEnter={()=>{setIsHover4(true)}}
                    onMouseLeave={()=>{setIsHover4(false)}}
                    onClick={()=>{
                        setWhatPost1(false)
                        setWhatPost2(false)
                        setWhatPost3(false)
                        setWhatPost4(true)
                        setWhatNum(4);
                    }}
                    className = 'myactivity-button4'>댓글</button>
            </div>
            
          </div>
          <MyactivityContents num = {whatNum}></MyactivityContents>
        </div>
      </div>
    </>
  )
}

export default MyActivity;