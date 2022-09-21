import React from 'react'
import "../css/mainpage.css"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Login from './Login';
import { Link } from 'react-router-dom';
import Calendarpg from './social/googlecalendar';
import Nav from './Nav';
import Profile from './Profile';


function Mainpage(props) {
 
  
  return (
    <>
        <Nav />
        <div className="contents">
          <Grid container>
          <Link to={'/freeart'}>
            <Box
              sx={{
              boxShadow: 2,
              width: '18rem',
              height: '18rem',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
              }}
            >
              
              <Box
                 className={"box-high"}>
                  <img src="/img/boho/freeboho.png" className="freeboho"/>
                <div className="box-high-title">
                  자유<br/>게시판
                </div>
                
                <div className="box-high-contents">
                  여러분의 이야기를<br/>들려주세요
                </div>
                
              </Box>
              
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  <h3>지금 뜨는 이야기</h3>
                </div>
                <div className="box-low-contents">
                  <p>갑자기 옛날 학원쌤 생각난다</p>
                </div>
                <div className="box-low-contents-time">
                  07/09
                </div>
              </Box>
                
              
            </Box>
            </Link>
            <Box
              sx={{
              boxShadow: 2,
              width: '18rem',
              height: '18rem',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
              }}
            >
              <Box
                 className={"box-high-job"}>
                  <img src="/img/boho/jobboho.png" className="jobboho"/>
                <div className="box-high-title-job">
                  취업<br/>게시판
                </div>
                
                <div className="box-high-contents-job">
                  취업 정보부터<br/>선배들의 이야기까지<br/>들어보세요
                </div>
                
              </Box>
              
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  <h3>지금 뜨는 이야기</h3>
                </div>
                <div className="box-low-contents">
                  <p>KISA 합격수기 올리는 화석</p>
                </div>
                <div className="box-low-contents-time">
                  07/09
                </div>
              </Box>
            </Box>
            <Box
              sx={{
              boxShadow: 2,
              width: '18rem',
              height: '18rem',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
              }}
            >
              <Box
                 className={"box-high-whowe"}>
                  <img src="/img/boho/whoweboho.png" className="whoweboho"/>
                <div className="box-high-title-whowe">
                  우리가<br/>누구
                </div>
                
                <div className="box-high-contents-whowe">
                  우리의 이야기를<br/>들려줄게요
                </div>
                
              </Box>
              
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  <h3>김준식의 이야기~~~</h3>
                </div>
                <div className="box-low-contents">
                  <p>Alert가 만들어지게 된 탄생비화</p>
                </div>
                <div className="box-low-contents-time">
                  07/09
                </div>
              </Box>
            </Box>
            <Box
              sx={{
              boxShadow: 1,
              width: '18rem',
              height: '18rem',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
              }}
            >
                
                {/* <Login isLoggedIn={props.isLoggedIn}></Login> */}
                <Profile isLoggedIn={props.isLoggedIn}></Profile>

            </Box>
            <Box
              sx={{
              boxShadow: 1,
              width: '18rem',
              height: '18rem',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
              }}
            >
              <Calendarpg />
            </Box>
            <Box
              sx={{
              boxShadow: 2,
              width: '18rem',
              height: '18rem',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
              }}
            >
              <Box
                 className={"box-high-major"}>
                  <img src="/img/boho/majorboho.png" className="majorboho"/>
                <div className="box-high-title-major">
                  우리<br/>학과는
                </div>
                
                <div className="box-high-contents-major">
                  정보보호학과에<br/>대한 모든 것
                </div>
                
              </Box>
              
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  <h3>What is INFOSEC</h3>
                </div>
                <div className="box-low-contents">
                  <p>22학번 신입생 공학인증과목</p>
                </div>
                <div className="box-low-contents-time">
                  07/09
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
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
              }}
            >
              <Box
                 className={"box-high-outside"}
                 >
                  <img src="img/advertise.png" className="advertise"/>
                
                
                
                
              </Box>
              
              <Box
                 className={"box-low"}>
                <div className="box-low-title">
                  <h3>지금 모집 중인 대외활동</h3>
                </div>
                <div className="box-low-contents">
                  <p> 한국정보보호산업협회에서 주관하는 AI 보안 네트워크반 교육생 모집</p>
                </div>
                <div className="box-low-contents-time">
                  07/09
                </div>
              </Box>
              
            </Box>
          </Grid>
        </div>
    </>
  )
}

export default Mainpage;