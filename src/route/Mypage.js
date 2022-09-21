import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/freeart.css'
import '../css/mypage.css'
import Nav from './Nav'
import axios from 'axios';
import { useCookies } from 'react-cookie';

import Button from '@mui/material/Button';

function Mypage() {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  console.log('cookie =',cookies.access_token);
  // 쿠키를 확인했을때 access_token이 없으면 되돌려 보내기

  const [userInfo, setUserInfo] = useState({id : "givensik" ,identity :1, character : '/img/profile/profile1.png', background : 1 });
  console.log(userInfo);
  const newUserInfo = {...userInfo};


  if(cookies.access_token === undefined){
    document.location = '/';
  }else{
    //여기에 mypage 정보를 가져와야할 듯?
    

  }

    return (
      <>
  
        <Nav />
        <div className="freeart-content">
          <div className="mypage-content-head">
            <div className="mypage-content-head-title"><strong>마이페이지</strong></div>
            <div className="mypage-content-head-content"><strong>Alert에서 사용하게 될 다양한 정보 등을 수정 및 확인할 수 있어요</strong></div>
          </div>
          <div className ="mypage-content-profile-correct">
            <div className = "mypage-content-profile-head"><strong>프로필 수정</strong></div>
            <div className = "mypage-content-profile-text">프로필 사진 배경, 닉네임 등의 프로필을 수정할 수 있어요</div>
            <div className='mypage-content-profile-content-position'>
              <div className="mypage-content-profile-content"><strong>닉네임</strong></div>
              <form>
                <input 
                className = "mypage-nickname-input" 
                name="id" 
                placeholder='사용하실 닉네임을 입력하세요' 
                onChange ={(e)=>{
                  const { value } = e.target;
                  newUserInfo.id = value;
                  setUserInfo(newUserInfo);
                }} >

                </input>
                <button className = "mypage-nickname-button" type="submit"><strong className="button-color">중복 확인</strong></button>
                {/* 중복확인 api 사용 */}
              </form>
            </div>
            <div className ="mypage-content-profile-content-position">
              <div className="mypage-content-profile-content"><strong>신분</strong></div>
              {/* 체크박스는 다음에 작업 이거 버튼으로 바꾸면 될듯*/}
              <Button variant="text"  onClick ={(e)=>{
                newUserInfo.identity= 1;
                setUserInfo(newUserInfo);
              }}>중고등학생</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.identity = 2;
                setUserInfo(newUserInfo);
              }}>대학생</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.identity = 3;
                setUserInfo(newUserInfo);
              }}>졸업생</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.identity = 4;
                setUserInfo(newUserInfo);
              }}>교수님</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.identity = 5;
                setUserInfo(newUserInfo);
              }}>현직 종사자</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.identity = 6;
                setUserInfo(newUserInfo);
              }}>기타</Button>

            </div>
            <div className='mypage-content-profile-content-position'>
              <div className="mypage-content-profile-content"><strong>소속</strong></div>
              <form>
                <input className = "mypage-nickname-input" name="id" placeholder='소속을 입력하세요. 학교인증을 통해 학교게시판을 이용할 수 있습니다.'/>
                <button className = "mypage-nickname-button" type="submit"><strong className="button-color">인증하기</strong></button>
              </form>
            </div>
            <div className ="mypage-content-profile-content-position">
              <div className="mypage-content-profile-content"> 
                <div className='test'>
                  <div className ='test3'>
                    <img 
                      alt='test2'
                      className = 'test2'
                      src={userInfo.character}
                    />
                  </div>
                  
                </div>
                <strong>프로필</strong>
                
              </div>
              <div className ="mypage-content-character-text">프로필 사진으로 사용할 캐릭터를 설정하세요.
                <div className ='mypage-profile-img'>
                  <img 
                  alt = 'character1' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile1.png' 
                  onClick ={(e)=>{
                  newUserInfo.character = '/img/profile/profile1.png';
                  setUserInfo(newUserInfo);
                }} >
                    
                  </img>
                  <img 
                  alt = 'character2' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile2.png' 
                  onClick ={(e)=>{
                  newUserInfo.character = '/img/profile/profile2.png' ;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character3' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile3.png' 
                  onClick ={(e)=>{
                  newUserInfo.character = '/img/profile/profile3.png';
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character4' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile4.png' 
                  onClick ={(e)=>{
                  newUserInfo.character = '/img/profile/profile4.png';
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character5' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile5.png' 
                  onClick ={(e)=>{
                  newUserInfo.character = '/img/profile/profile5.png' ;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character6' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile6.png' 
                  onClick ={(e)=>{
                  newUserInfo.character = '/img/profile/profile6.png' ;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character7' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile7.png' 
                  onClick ={(e)=>{
                  newUserInfo.character = '/img/profile/profile7.png';
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  
                </div>
                <div className ='mypage-profile-color'>
                  <div className ="mypage-content-color-text2">
                    프로필 사진의 배경색을 설정하세요
                  </div>
                  <div>
                    <button 
                      className = 'mypage-color-button mypage-color-button1'
                      onClick ={(e)=>{
                        newUserInfo.background = 1;
                        setUserInfo(newUserInfo);
                      }}
                      > 
                      </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button2'
                      onClick ={(e)=>{
                       newUserInfo.background = 2;
                       setUserInfo(newUserInfo);
                      }}> </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button3'
                      onClick ={(e)=>{
                        newUserInfo.background = 3;
                        setUserInfo(newUserInfo);
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button4'
                      onClick ={(e)=>{
                        newUserInfo.background = 4;
                        setUserInfo(newUserInfo);
                      }}> </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button5'
                      onClick ={(e)=>{
                        newUserInfo.background = 5;
                        setUserInfo(newUserInfo);
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button6'
                      onClick ={(e)=>{
                        newUserInfo.background = 6;
                        setUserInfo(newUserInfo);
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button7'
                      onClick ={(e)=>{
                          newUserInfo.background = 7;
                          setUserInfo(newUserInfo);
                        }}> 
                      </button>
                  </div>

                </div>
                
              </div>
            
            </div>
            

            
          </div>
          <div className='mypage-content-activity'>
            <div className = "mypage-content-profile-head"><strong>나의 활동</strong></div>
            <div className = "mypage-content-acitivity-text">Alert에서 회원님이 활동하신 내역을 확인해보세요.</div>
            
          </div>
          <div className='mypage-content-useInfo'>
            <div className = "mypage-content-profile-head"><strong>이용 문의</strong></div>
            <div className = "mypage-content-acitivity-text">Alert의 중요한 정보들, 개인정보처리방침 등을 확인해보세요.</div>
          </div>
        </div>
      </>
    )
}

export default Mypage