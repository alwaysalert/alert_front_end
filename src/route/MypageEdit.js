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
    
      if(props.isSame === true ){
        return (
          <div style ={red}>사용 불가능한 닉네임입니다.</div>
        )
      }else{
        return (
          <div style = {blue}>사용 가능한 닉네임입니다.</div>
        )
      }
  }

function MypageEdit() {
//중복 확인 state
const [isSame, setIsSame] =useState(true);
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

//회원 정보 수정 api = /users/edit_profile


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
//setButton();
useEffect(() => {
  setButton();
  //console.log('a:', newUserInfot);
}, [userInfo.user_job]);

//버튼
const [button1, setButton1] = useState('outlined');
const [button2, setButton2] = useState('outlined');
const [button3, setButton3] = useState('outlined');
const [button4, setButton4] = useState('outlined');
const [button5, setButton5] = useState('outlined');
const [button6, setButton6] = useState('outlined');
const [jobbb,setjobbb] = useState(6)
const setButton = (event) =>{
    if(userInfo.user_job === 1)
    {
      
    if(button1 === 'contained')
    {
      setButton1('outlined');
      setjobbb(6)
    }
    else
    {
      setButton1('contained');
      setButton2('outlined');
      setButton3('outlined')
      setButton4('outlined')
      setButton5('outlined')
      setButton6('outlined')
      setjobbb(1)
    }
  }
  if(userInfo.user_job === 2)
    {
    if(button2 === 'contained')
    {
      setButton2('outlined');
      setjobbb(6)
    }
    else
    {
      setButton1('outlined');
      setButton2('contained');
      setButton3('outlined')
      setButton4('outlined')
      setButton5('outlined')
      setButton6('outlined')
      setjobbb(2)
    }
  }
  if(userInfo.user_job === 3)
    {
    if(button3 === 'contained')
    {
      setButton3('outlined');
      setjobbb(6)
    }
    else
    {
      setButton1('outlined');
      setButton2('outlined');
      setButton3('contained')
      setButton4('outlined')
      setButton5('outlined')
      setButton6('outlined')
      setjobbb(3)
    }
  }
  if(userInfo.user_job === 4)
    {
    if(button4 === 'contained')
    {
      setButton4('outlined');
      setjobbb(6)
    }
    else
    {
      setButton1('outlined');
      setButton2('outlined');
      setButton3('outlined')
      setButton4('contained')
      setButton5('outlined')
      setButton6('outlined')
      setjobbb(4)
    }
  }
  if(userInfo.user_job === 5)
    {
    if(button5 === 'contained')
    {
      setButton5('outlined');
      setjobbb(6)
    }
    else
    {
      setButton1('outlined');
      setButton2('outlined');
      setButton3('outlined')
      setButton4('outlined')
      setButton5('contained')
      setButton6('outlined')
      setjobbb(5)
    }
  }
  if(userInfo.user_job === 6)
    {
    if(button6 === 'contained')
    {
      setButton6('outlined');
      setjobbb(6)
    }
    else
    {
      setButton1('outlined');
      setButton2('outlined');
      setButton3('outlined')
      setButton4('outlined')
      setButton5('outlined')
      setButton6('contained')
      setjobbb(6)
    }
  }
  
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
//프로필 수정 api
const updateUserInfo = () => {
  const baseURL= 'http://127.0.0.1:8000'
  const config = {"Content-Type": 'application/json'};
  axios.get(`${baseURL}/users/check_nickname`, userInfo, config )
  .then((res) => {
    alert('수정 성공');
  })
  .catch((err) => {
    alert(err);
  });

}


  return (
    <div>

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
              <Button variant={button1} id='button1' onClick ={(e)=>{
                newUserInfo.user_job= 1;
                setUserInfo(newUserInfo);
                setButton(e);
              }}>중고등학생</Button>
              <Button variant={button2} id='button2' onClick ={(e)=>{
                newUserInfo.user_job = 2;
                setUserInfo(newUserInfo);
                setButton(e);
              }}>대학생</Button>
              <Button variant={button3} id='button3' onClick ={(e)=>{
                newUserInfo.user_job = 3;
                setUserInfo(newUserInfo);
                setButton(e);
              }}>졸업생</Button>
              <Button variant={button4} id='button4' onClick ={(e)=>{
                newUserInfo.user_job = 4;
                setUserInfo(newUserInfo);
                setButton(e);
              }}>교수님</Button>
              <Button variant={button5} id='button5' onClick ={(e)=>{
                newUserInfo.user_job = 5;
                setUserInfo(newUserInfo);
                setButton(e);
              }}>현직 종사자</Button>
              <Button variant={button6} id='button6' onClick ={(e)=>{
                newUserInfo.user_job = 6;
                setUserInfo(newUserInfo);
                setButton(e);
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
                <div className ='name'>미리보기</div>
                <button className ='mypage-content-correct-button1' onClick ={ updateUserInfo }>수정</button>
                <button className ='mypage-content-correct-button2' onClick ={()=>{
                    document.location.reload();
                }}>취소</button>
                
                
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
              
                        
            </div>
            

            
          </div>

    </div>
  )
}

export default MypageEdit