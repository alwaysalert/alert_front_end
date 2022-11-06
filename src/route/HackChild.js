import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import '../css/hackchild.css'
import { useLocation } from "react-router-dom"
import HackChildContent from './HackChildContent';

function HackChild(props) {
    //버튼
    const [whatNum, setWhatNum] = useState(1);
    const [whatPost0, setWhatPost0] = useState(true); 
    const [whatPost1, setWhatPost1] = useState(false); 
    const [whatPost2, setWhatPost2] = useState(false); 
    const [whatPost3, setWhatPost3] = useState(false); 
    const [whatPost4, setWhatPost4] = useState(false); 

    //console.log(location.state.id)
    const [isHover0, setIsHover0] = useState(true);
    const [isHover1, setIsHover1] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isHover4, setIsHover4] = useState(false);

    


    //어떤 버튼을 누르고 들어왔냐에 따라서 스테이트 다르게
    useEffect(() => {
        
      }, []);

    
      
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
          <div className="hackChild-content-head-content"><strong>응애 나 핵린이</strong></div>
        </div>
        <div className='myactivity-content-activity'>
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
                    className = 'myactivity-button1'><strong>
                        Q&A
                    </strong>
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
                    className = 'myactivity-button1'><strong>
                        시스템 해킹
                    </strong>
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
                    className = 'myactivity-button2'><strong>웹 해킹</strong></button>
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
                    className = 'myactivity-button3'><strong>리버싱</strong></button>
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
                    className = 'myactivity-button4'><strong>기타</strong></button>
          </div>
          <HackChildContent></HackChildContent>
        
        </div>
        
    </div>
    
  )
}

export default HackChild