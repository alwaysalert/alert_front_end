import React, {useEffect, useState} from 'react'
import "../css/mainpage.css"

import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';
// import Calendarpg from './social/googlecalendar';
import Nav from './Nav';
import Profile from './Profile';
import MainSlide from './MainSlide';




function Mainpage(props) {
  //box css
  const box ={
    boxShadow: 2,
    width: '18rem',
    height: '18rem',
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#f6f6f6'),
    color: (theme) =>
    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
    p: 1,
    m: 1,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: '0.875rem',
    };

    const baseurl= process.env.REACT_APP_BACK_BASE_URL;
    let xnews=[];
    const [new1, setNews1] =useState({});
    const [new2, setNews2] =useState({});
    const [new3, setNews3] =useState({});

    const [hotArticles,setHotArticles] = useState([]);
    function formatDate(date) {
      return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
        date.getDate().toString().padStart(2, '0')  + ' ' 
    }

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACK_BASE_URL}/mainpage/boards`).then(res => {
        setHotArticles(res.data);
      }).catch(res => {
  
      })
      // 보안 뉴스
        axios.get(`${process.env.REACT_APP_BACK_BASE_URL}/boannews`)
            .then(async (res) => {
              // eslint-disable-next-line react-hooks/exhaustive-deps
              xnews = [...res.data];
             
              // eslint-disable-next-line react-hooks/exhaustive-deps
              setNews1(xnews[0]);
              // eslint-disable-next-line react-hooks/exhaustive-deps
              setNews2(xnews[1]);
              // eslint-disable-next-line react-hooks/exhaustive-deps
              setNews3(xnews[2]);
            }).catch(err => {
            //   document.location="/Error";
            });
  
    },[])
    const [freeTime,setFreeTime] = useState('');
    const [hackTime,setHackTime] = useState('');
    //
    
    
    useEffect(() => {
      if(hotArticles[0])
      {
       
        const val1 = new Date(hotArticles[0].freeboard.date)
        const val2 = new Date(hotArticles[0].hackchildren.date)
        setFreeTime(formatDate(val1))
        setHackTime(formatDate(val2))
      }
    },[hotArticles,new1,new2,new3,]);
    
  return (
    <>
        <Nav isLoggedIn={props.isLoggedIn} />
        {/* 자유게시판 */}
        <div className="contents">
          <Grid container>
            <Box
              sx={box}
            >
              <Link to={'/freeart'}>
                <Box
                  className={"box-high"}>
                    <img alt ='freeboho' src="/img/boho/freeboho.png" className="freeboho"/>
                  <div className="box-high-title" style={{color:"#E56262"}}>
                    자유<br/>게시판
                  </div>
                  
                  <div className="box-high-contents" style={{color:"#711010"}}>
                    여러분의 이야기를<br/>들려주세요
                  </div>
                  
                </Box>
              </Link>
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  지금 뜨는 이야기
                </div>
                {hotArticles[0] ?
                <> 
                <Link to={`/freeart/${hotArticles[0].freeboard.id}`}>
                <div className="box-low-contents">
                  {hotArticles[0].freeboard.title}
                </div>
                <div className="box-low-contents-time">
                  {freeTime ? freeTime  : '로딩중,,,'}
                </div>
                </Link>
                </> 
                : <></>}
              </Box>
                
            </Box>
          
            {/* 취업 게시판 */}
            <Link to={'/Error'}>
            <Box
              sx={box}
            >
              <Box
                 className={"box-high-job"}>
                  <img alt = 'jobboho'src="/img/boho/jobboho.png" className="jobboho"/>
                <div className="box-high-title" style={{color:"#E3AF2A"}}>
                  취업<br/>게시판
                </div>
                
                <div className="box-high-contents" style={{color:"color: #554408"}}>
                  취업 정보부터<br/>선배들의 이야기까지<br/>들어보세요
                </div>
                
              </Box>
              
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  지금 뜨는 이야기
                </div>
                <div className="box-low-contents">
                  <p>준비중</p>
                </div>
                <div className="box-low-contents-time">
                  00/00
                </div>
              </Box>
            </Box>
            </Link>
            {/* 핵린이 핵핵 */}
            <Box
              sx={box}
            >
              <Link to={'/HackChild'}>
                <Box
                  className={"box-high-whowe"}>
                    <img alt='whoweboho' src="/img/boho/whoweboho.png" className="whoweboho"/>
                  <div className="box-high-title" style={{color: "#509B3D"}}>
                    핵린이<br/>게시판
                  </div>
                  
                  <div className="box-high-contents" style={{color:"#0E451D"}}>
                    해킹이 처음인 당신을<br/>위해 준비했어요
                  </div>
                  
                </Box>
              </Link>
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  지금 뜨는 이야기
                </div>
                {/* 핵린이 게시판 지금 뜨는 이야기 */}
                {hotArticles[0] ?
                <> 
                <Link to={`/HackChild/${hotArticles[0].freeboard.id}`}>         
                  <div className="box-low-contents">
                    {hotArticles[0].hackchildren.title}
                  </div>
                  <div className="box-low-contents-time">
                    {hackTime ? hackTime  : '로딩중,,,'}
                  </div>
                </Link>
                </> 
                : <></>}
              </Box>
            </Box>
            {/* 프로필 */}
            <Box
              sx={box}
            >
                
                {/* <Login isLoggedIn={props.isLoggedIn}></Login> */}
                <Profile isLoggedIn={props.isLoggedIn}></Profile>
                
            </Box>
            {/* 달력 */}
            <Box
              sx={box}
            >
              <img alt='calender' src ='/img/calender.png' style={{width:'18rem'}} />
            </Box>
            <Box
              sx={box}
            >
              <a href="http://home.sejong.ac.kr/~isdpt/6.html"
              target="_blank" rel="noreferrer"
              >
                <Box
                  className={"box-high-major"}>
                    <img alt ='majorboho' src="/img/boho/majorboho.png" className="majorboho"/>
                  <div className="box-high-title" style={{color:"#9050E3"}}>
                    우리<br/>학과는
                  </div>
                  
                  <div className="box-high-contents" style={{color:"#3A1072"}}>
                    정보보호학과<br/>공지사항을 확인하세요
                  </div>
                  
                </Box>
              </a>
              
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  지금 뜨는 이야기
                </div>
                <div className="box-low-contents">
                  <p>준비중입니다</p>
                </div>
                <div className="box-low-contents-time">
                  00/00
                </div>
              </Box>
            </Box>
            <Box
              sx={{
                
                boxShadow: 2,
                width: '38rem',
                height: '18rem',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                p: 1,
                m: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                
                }}
            >
              <MainSlide new1 = {new1} new2 = {new2} new3 = {new3}></MainSlide>
              {/*
              
               <Box
                 className={"box-high-outside"}
                 >
                  <img alt='advertise'src="https://www.boannews.com/media/upFiles2/2022/11/20221105hack-s.jpg" className="advertise"/>
                  <div className='advertise-back' ><img alt='advertise'src="https://www.boannews.com/media/upFiles2/2022/11/20221105hack-s.jpg" className="advertise-div-back"/></div>
              </Box>
              <Box
                 className={"box-low"} style={{textAlign:"left"}}>
                <div className="box-low-title">
                  {new1.title}
                </div>
                <div className="box-low-contents" style={{textIndent:'15px'}}>
                  <p> 한국정보보호산업협회에서 주관하는 AI 보안 네트워크반 교육생 모집</p>
                </div>
              </Box> */}
            </Box>
            
          </Grid>
        </div>
    </>
  )
}

export default Mainpage;