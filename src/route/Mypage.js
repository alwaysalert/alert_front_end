import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/freeart.css'
import '../css/mypage.css'
import Nav from './Nav'
import axios from 'axios';
import { useCookies } from 'react-cookie';

import Button from '@mui/material/Button';

function AlertSame(props){
  const red ={
    color:"red"
  }
  const blue = {
    color : "blue"
  }
  
    if(props.isSame === true){
      return (
        <div style ={red}>사용 불가능한 닉네임입니다.</div>
      )
    }else{
      return (
        <div style = {blue}>사용 가능한 닉네임입니다.</div>
      )
    }
}


function Mypage() {
  //axios
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
  //컬러 숫자 -> ##머시기로 바꾸는 함수
  const hexcolor = (num) =>{
    if(num === 1){
      return '#FF6767'
    }else if(num === 2){
      return '#FFA767'
    }else if(num === 3){
      return '#FFF067'
    }else if(num === 4){
      return '#4ABD2D'
    }else if(num === 5){
      return '#14BBE0'
    }else if(num === 6){
      return '#144DE0'
    }else if(num === 7){
      return '#AC43FF'
    }
  }
  //닉네임 중복확인 axios 요청
  const CheckNickName = (name) => {
    const baseURL= 'http://127.0.0.1:8000'
    
    axios.get(`${baseURL}/users/check_nickname`, {
      params: {
        nickname : name
      }
    })
    .then((res) => {
      console.log('성공');
      //console.log(res.data);   
      if(res.data.is_existing === true){
        setIsSame(true);
      }else{
        setIsSame(false);
      }
    })
    .catch((err) => {
      console.log('실패');
    });
  
  }

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  console.log('cookie =',cookies.access_token);
  // 쿠키를 확인했을때 access_token이 없으면 되돌려 보내기
  console.log('state:',userInfo);
  // const [userInfo, setUserInfo] = useState({id : "givensik" ,identity :1, character : '/img/profile/profile1.png', background : '#FF6767'});
  //console.log(userInfo);


  // const newUserInfo = {...userInfo};

  

  if(cookies.access_token === undefined){
    document.location = '/';
  }
  //여기에 mypage 정보를 가져와야할 듯?
  useEffect(() => {
    CheckUser(cookies.access_token);
    
    //console.log('a:', newUserInfot);
  }, []);
  
  
  const [isSame, setIsSame] =useState(true);
  
  const button_style={
    background : hexcolor()
  }
  const image_route = (num) => {
    
    if(num === 1){
      return '/img/profile/profile1.png'
    }else if(num === 2){
      return '/img/profile/profile2.png'
    }else if(num === 3){
      return '/img/profile/profile3.png'
    }else if(num === 4){
      return '/img/profile/profile4.png'
    }else if(num === 5){
      return '/img/profile/profile5.png'
    }else if(num === 6){
      return '/img/profile/profile6.png'
    }else if(num === 7){
      return '/img/profile/profile7.png'
    }
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
                placeholder={userInfo.nickname}
                onChange ={(e)=>{
                  const { value } = e.target;
                  newUserInfo.nickname = value;
                  setUserInfo(newUserInfo);
                }} >

                </input>
                <button className = "mypage-nickname-button" onClick ={(e)=>{
                  e.preventDefault();
                  CheckNickName(userInfo.nickname)
                  }}><strong className="button-color">중복 확인</strong></button><AlertSame isSame ={isSame}></AlertSame>
                {/* 중복확인 api 사용 */}
              </form>
            </div>
            <div className ="mypage-content-profile-content-position">
              <div className="mypage-content-profile-content"><strong>신분</strong></div>
              <Button variant="text"  onClick ={(e)=>{
                newUserInfo.user_job= 1;
                setUserInfo(newUserInfo);
              }}>중고등학생</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.user_job = 2;
                setUserInfo(newUserInfo);
              }}>대학생</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.user_job = 3;
                setUserInfo(newUserInfo);
              }}>졸업생</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.user_job = 4;
                setUserInfo(newUserInfo);
              }}>교수님</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.user_job = 5;
                setUserInfo(newUserInfo);
              }}>현직 종사자</Button>
              <Button variant="text" onClick ={(e)=>{
                newUserInfo.user_job = 6;
                setUserInfo(newUserInfo);
              }}>기타</Button>

            </div>
            <div className='mypage-content-profile-content-position'>
              <div className="mypage-content-profile-content"><strong>소속</strong></div>
              <form>
                <input className = "mypage-nickname-input" name="id" placeholder='소속을 입력하세요. 학교인증을 통해 학교게시판을 이용할 수 있습니다.'/>
                <button className = "mypage-nickname-button" type="submit" ><strong className="button-color">인증하기</strong></button>
              </form>
            </div>
            <div className ="mypage-content-profile-content-position">
              <div className="mypage-content-profile-content"> 
                <div className='test' >
                  <div className ='test3' style ={button_style}>
                    <img 
                      alt='test2'
                      className = 'test2'
                      src={image_route(userInfo.profile_picture_id)}
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
                  newUserInfo.profile_picture_id = 1;
                  setUserInfo(newUserInfo);
                }} >
                    
                  </img>
                  <img 
                  alt = 'character2' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile2.png' 
                  onClick ={(e)=>{
                  newUserInfo.profile_picture_id = 2 ;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character3' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile3.png' 
                  onClick ={(e)=>{
                  newUserInfo.profile_picture_id = 3;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character4' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile4.png' 
                  onClick ={(e)=>{
                  newUserInfo.profile_picture_id = 4;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character5' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile5.png' 
                  onClick ={(e)=>{
                  newUserInfo.profile_picture_id = 5 ;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character6' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile6.png' 
                  onClick ={(e)=>{
                  newUserInfo.profile_picture_id = 6 ;
                  setUserInfo(newUserInfo);
                }} >
                  </img>
                  <img 
                  alt = 'character7' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile7.png' 
                  onClick ={(e)=>{
                  newUserInfo.profile_picture_id = 7;
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
                        newUserInfo.profile_color_id = 1;
                        setUserInfo(newUserInfo);
                      }}
                      > 
                      </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button2'
                      onClick ={(e)=>{
                       newUserInfo.profile_color_id = 2;
                       setUserInfo(newUserInfo);
                      }}> </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button3'
                      onClick ={(e)=>{
                        newUserInfo.profile_color_id = 3;
                        setUserInfo(newUserInfo);
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button4'
                      onClick ={(e)=>{
                        newUserInfo.profile_color_id = 4;
                        setUserInfo(newUserInfo);
                      }}> </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button5'
                      onClick ={(e)=>{
                        newUserInfo.profile_color_id = 5;
                        setUserInfo(newUserInfo);
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button6'
                      onClick ={(e)=>{
                        newUserInfo.profile_color_id = 6;
                        setUserInfo(newUserInfo);
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button7'
                      onClick ={(e)=>{
                          newUserInfo.profile_color_id = 7;
                          setUserInfo(newUserInfo);
                        }}> 
                      </button>
                      
                  </div>

                </div>
                
                
              </div>  
              <button className ='mypage-content-correct-button'>수정</button>
                        
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