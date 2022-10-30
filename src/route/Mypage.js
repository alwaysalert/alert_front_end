import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/freeart.css'
import '../css/mypage.css'
import Nav from './Nav'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';
import MypageEdit from './MypageEdit'



function Mypage() {
  //수정 or 그냥 마이페이지
  //state
  const [isEdit, setIsEdit] = useState(false);  
  
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
          token : access_token,
          format: 'json',
        }}).then(async (res) => {
          //console.log('data =',res.data);
          newUserInfo ={...res.data};
          setUserInfo(newUserInfo);
          //console.log('state:',userInfot);
        })
  
  }
  
  //회원 정보 수정 api = /users/edit_profile

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
  


  //profile
  //컬러 숫자 -> ##머시기로 바꾸는 함수
const hexcolor = (num) =>{
  if(num === 1){
    return '#c5e0b4'
  }else if(num === 2){
    return '#ffe699'
  }else if(num === 3){
    return '#bdd7ee'
  }else if(num === 4){
    return '#f8cbad'
  }else if(num === 5){
    return '#ffc5cd'
  }else if(num === 6){
    return '#dfc2ec'
  }else if(num === 7){
    return '#adb9ca'
  }
}

const button_style={
  background : hexcolor(newUserInfo.profile_color_id)
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

//신분
const userJob = (num) =>{
  if(num === 1){
    return '중고등학생'
  }else if(num === 2){
    return '대학생'
  }else if(num === 3){
    return '졸업생'
  }else if(num === 4){
    return '교수님'
  }else if(num === 5){
    return '현직 종사자'
  }else if(num === 6){
    return '기타'
  }

}

const userBelong = (info) =>{
  if(info){
    return info
  }else{
    return '이메일 인증 바랍니다.'
  }

}

const EditMode = () =>{
  setIsEdit(true)

}

    return (
      <>
  
        <Nav />
        <div className="freeart-content">
          <div className="mypage-content-head">
            <div className="mypage-content-head-title">마이페이지</div>
            <div className="mypage-content-head-content">Alert에서 사용하게 될 다양한 정보 등을 수정 및 확인할 수 있어요</div>
          </div>
          {isEdit ? (
        <div>
            <MypageEdit ></MypageEdit>
        </div>
        ) : (
          <div className = 'mypage-profile'>
            <div className ='mypage-profile-head'>
              프로필<img alt ='hello' src ='/img/Vector.png' className='profile-edit-button' onClick ={EditMode}></img>
              <div className="mypage-content-profile-content"> 
                <div className='mypage-profile-image1' >
                  
                  <div className ='mypage-profile-image3' style ={button_style}>
                    <img 
                      alt='test2'
                      className = 'mypage-profile-image2'
                      src={image_route(userInfo.profile_picture_id)}
                    />
                  </div>
                  
                </div>
                <div className = 'mypage-profile-name'>
                  <strong>닉네임</strong>
                </div>
                <div className = 'mypage-profile-name1'>
                  <strong>{userInfo.nickname}</strong>
                </div>
                <div className = 'mypage-profile-job'>
                 <strong>신&nbsp;&nbsp;&nbsp;분</strong> 
                </div>
                <div className = 'mypage-profile-job1'>
                  <strong>{userJob(userInfo.user_job)}</strong>
                </div>
                <div className = 'mypage-profile-belong'>
                  <strong>Email</strong>
                </div>
                <div className = 'mypage-profile-belong1'>
                  <strong>{userBelong(userInfo.user_email)}</strong>
                </div>
                
                
              </div>
              
            </div>
            
          </div>
        ) }
          
          
          <div className='mypage-content-activity'>
          <Link to ={`/MyActivity`} state = {{ id : 1}}>
            <div className = "mypage-content-profile-head"><strong>나의 활동</strong></div>
          </Link>
            <div className = "mypage-content-acitivity-text">
              Alert에서 회원님이 활동하신 내역을 확인해보세요.
              
              <div>
              <Link to ={`/MyActivity`} state = {{ id : 1}}>
                <button className ='mypage-content-acitvity-button'><strong>작성한 글</strong></button>
              </Link>
              <Link to ={`/MyActivity`} state = {{ id : 2}}>
                <button className ='mypage-content-acitvity-button'><strong>좋아요한 글</strong></button>
              </Link>
              <Link to ={`/MyActivity`} state = {{ id : 3}}>
                <button className ='mypage-content-acitvity-button'><strong>스크랩한 글</strong></button>
              </Link>
              <Link to ={`/MyActivity`} state = {{ id : 4}}>
                <button className ='mypage-content-acitvity-button'><strong>댓글</strong></button>
              </Link>
              </div>
              
            </div>
            
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