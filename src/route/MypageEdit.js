
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/freeart.css'
import '../css/mypage.css'

import axios from 'axios';
import { useCookies } from 'react-cookie';

/**
 * function AlertSame
 * @param {props} props for get isSame state
 * @returns jsx 
 */


function MypageEdit() {
//중복 확인 state
const baseURL = 'http://127.0.0.1:8000'
const [clickme,setClickme] = useState(false);
const [nicknameCheck, setnicknameCheck] = useState(true)
const [isSame, setIsSame] = useState(0);
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
//userInfo before correction
const [olduserInfo, setOldUserInfo] = useState({
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
function AlertSame(props){
    
  const visible = clickme ? 'visible' : 'none'
  if(props.isSame === 2)
  {
    return (
      <div style ={{color:'blue',display:visible,textAlign:'center' ,marginTop:'3px'}}>기존 닉네임입니다.</div>
    )
  }
  else if(props.isSame === true){
    return (
      <div style ={{color:'red',display:visible,textAlign:'center' ,marginTop:'3px'}}>사용 불가능한 닉네임입니다.</div>
    )
  }else if(props.isSame === false){
    return (
      <div style = {{color:'blue',display:visible,textAlign: 'center',marginTop:'3px'}}>사용 가능한 닉네임입니다.</div>
    )
  }
  else{
    return(<></>)
  }
}
const CheckNickName = (name) => {
        
        
  if(name.length === 0)
  {
    setIsSame(true);
  }
  else if(name.length > 12)
  {
    alert("닉네임은 12글자를 넘길 수 없습니다.")
  }
  else{
    
  axios.get(`${baseURL}/users/check_nickname`, {
    params: {
      nickname : name
    }
  })
  .then((res) => {
    
     
    if(res.data.is_existing === true){
      setIsSame(true);
    }else{
      setIsSame(false);
      setnicknameCheck(true);
    }
  })
  .catch(err => {
    
  });
  }
}
const onChangeNickname = (event) => {
  const {
    target: { value,}
  } = event;
 
  
    setUserInfo(
      {...userInfo,
      nickname: value}
    )
    setnicknameCheck(false);
    setIsSame(null);
  
}


const CheckUser = (access_token) => {
  const baseurl= 'http://127.0.0.1:8000'
  
  axios.get(`${baseurl}/users/check_user`, {
      params: {
        token: access_token,
        format: 'json',
      }}).then(async (res) => {
        
        setOldUserInfo(res.data);
        setUserInfo(res.data);
      }).catch(err => {
        document.location="/Error";
      });

}

/**
 * CheckNickName
 * @param {*} name
 * axios for 중복확인 
 */


const [cookies,,] = useCookies(['access_token']);

if(cookies.access_token === undefined){
  document.location = '/';
}
useEffect(() => {
  CheckUser(cookies.access_token);
    //eslint-disable-next-line
}, []);

//userInfo 객체의 user_job이 바뀔때마다 setButton 실행
useEffect(() => {
  setButton();
    //eslint-disable-next-line
}, [userInfo.user_job]);

//버튼
const [button1, setButton1] = useState('button-test');
const [button2, setButton2] = useState('button-test');
const [button3, setButton3] = useState('button-test');
const [button4, setButton4] = useState('button-test');
const [button5, setButton5] = useState('button-test');
const [button6, setButton6] = useState('button-test');
const [jobbb,setjobbb] = useState(6)
const setButton = (event) =>{
    if(userInfo.user_job === 1)
    {
      if(button1 === 'button-test2')
      {
        setButton1('button-test');
      }
      else
      {
        setButton1('button-test2');
        setButton2('button-test');
        setButton3('button-test')
        setButton4('button-test')
        setButton5('button-test')
        setButton6('button-test')
        setjobbb(1)
      }
    }
    if(userInfo.user_job === 2)
    {
      if(button2 === 'button-test2')
      {
        setButton2('button-test');
        setjobbb(6)
      }
      else
      {
        setButton1('button-test');
        setButton2('button-test2');
        setButton3('button-test')
        setButton4('button-test')
        setButton5('button-test')
        setButton6('button-test')
        setjobbb(2)
      }
    }
    if(userInfo.user_job === 3)
    {
    if(button3 === 'button-test2')
    {
      setButton3('button-test');
      setjobbb(6)
    }
    else
    {
      setButton1('button-test');
      setButton2('button-test');
      setButton3('button-test2')
      setButton4('button-test')
      setButton5('button-test')
      setButton6('button-test')
      setjobbb(3)
    }
  }
  if(userInfo.user_job === 4)
    {
    if(button4 === 'button-test2')
    {
      setButton4('button-test');
      setjobbb(6)
    }
    else
    {
      setButton1('button-test');
      setButton2('button-test');
      setButton3('button-test')
      setButton4('button-test2')
      setButton5('button-test')
      setButton6('button-test')
      setjobbb(4)
    }
  }
  if(userInfo.user_job === 5)
    {
    if(button5 === 'button-test2')
    {
      setButton5('button-test');
      setjobbb(6)
    }
    else
    {
      setButton1('button-test');
      setButton2('button-test');
      setButton3('button-test')
      setButton4('button-test')
      setButton5('button-test2')
      setButton6('button-test')
      setjobbb(5)
    }
  }
  if(userInfo.user_job === 6)
    {
    if(button6 === 'button-test2')
    {
      setButton6('button-test2');
      setjobbb(6)
    }
    else
    {
      setButton1('button-test');
      setButton2('button-test');
      setButton3('button-test')
      setButton4('button-test')
      setButton5('button-test')
      setButton6('button-test2')
      setjobbb(6)
    }
  }
  
  }




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
// const circle_style={
//   background : '#F0F0F0'
// }
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
/**
 * updateUserInfo
 * axios for update user information
 */
const updateUserInfo = () => {
  const baseURL= 'http://127.0.0.1:8000'
  const newNickname = document.getElementById("nickname");
  if(nicknameCheck === false){
    alert('닉네임 중복확인을 해주세요')
  }else{
    axios.put(`${baseURL}/users/edit_profile`, {
      token:  cookies.access_token,
      nickname : userInfo.nickname,
      user_job : userInfo.user_job,
      user_email : userInfo.user_email,
      profile_picture_id : userInfo.profile_picture_id,
      profile_color_id : userInfo.profile_color_id,
      auth_user_id : userInfo.auth_user_id
    })
    .then((res) => {
      console.log(res)
      document.location.reload();
    }).catch(err => {
      
    });
  }

  
  

}

// console.log(olduserInfo);
  return (
    <div>

<div className ="mypage-content-profile-correct">
            <div className = "mypage-content-profile-head">프로필 수정</div>
            <div className = "mypage-content-profile-text">프로필 사진 배경, 닉네임 등의 프로필을 수정할 수 있어요</div>
            <div className='mypage-content-profile-content-position'>
              <div className="mypage-content-profile-content"><strong>닉네임</strong></div>
              <form>
                <input 
                className = "mypage-nickname-input" 
                name="id" 
                id="nickname"
                placeholder={userInfo.nickname}
                onChange ={(e)=>{
                  onChangeNickname(e)
                }} >

                </input>
                <button className = "mypage-nickname-button" onClick ={(e)=>{
                  e.preventDefault();
                  setClickme(true)
                  const value = document.getElementById("nickname").value
                 
                  if(userInfo.nickname === olduserInfo.nickname){
                    setnicknameCheck(true);
                    setIsSame(2);
                    return 0;
                  }
                  CheckNickName(value)
                 
                  }}><strong className="button-color">중복확인</strong></button><AlertSame isSame ={isSame}></AlertSame>
                {/* 중복확인 api 사용 */}
              </form>
            </div>
            <div className ="mypage-content-profile-content-position">
              <div className="mypage-content-profile-content"><strong>신 분</strong></div>
              <button className ={button1} onClick ={(e)=>{
                
                setUserInfo({...userInfo,user_job:1});
                setButton(e);}}><strong>중고등학생</strong></button>
              <button className ={button2} onClick ={(e)=>{
                setUserInfo({...userInfo,user_job:2});
                setButton(e);
              }}><strong>대학생</strong></button>
              <button className ={button3} onClick ={(e)=>{
                setUserInfo({...userInfo,user_job:3});
                setButton(e);
              }}><strong>졸업생</strong></button>
              <button className ={button4} onClick ={(e)=>{
                setUserInfo({...userInfo,user_job:4});
                setButton(e);
              }}><strong>교수님</strong></button>
              <button className ={button5} onClick ={(e)=>{
                setUserInfo({...userInfo,user_job:5});
                setButton(e);
              }}><strong>현직 종사자</strong></button>   
              <button className ={button6} onClick ={(e)=>{
                setUserInfo({...userInfo,user_job:6});
                setButton(e);
              }}><strong>기타</strong></button>              

            </div>
            <div className='mypage-content-profile-content-position'>
              <div className="mypage-content-profile-content"><strong>소 속</strong></div>
              <form>
                <input className = "mypage-nickname-input" name="id" placeholder='소속을 입력하세요. 학교인증을 통해 학교게시판을 이용할 수 있습니다.'/>
                <button className = "mypage-nickname-button" type="submit" onClick={(e) => {e.preventDefault();alert("준비중이에요")}}><strong className="button-color">인증하기</strong></button>
              </form>
            </div>
            <div className ="mypage-content-profile-content-position">
              <div className="mypage-content-profile-content"> 
                <div className='test' >
                <div className ='name'>미리보기</div>
                  <div className ='test3' style ={button_style}>
                    <img 
                      alt='test2'
                      className = 'test2'
                      src={image_route(userInfo.profile_picture_id)}
                    />
                  </div>
                  
                </div>
                
                <button className ='mypage-content-correct-button1' onClick ={ updateUserInfo }>수정</button>
                <button className ='mypage-content-correct-button2' onClick ={()=>{
                    document.location.reload();
                }}>취소</button>
                
                
                <strong>프로필</strong>
                
              </div>
              <div className ="mypage-content-character-text">프로필 사진으로 사용할 캐릭터를 설정하세요.
                <div className ='mypage-profile-img'>
                  
                  <div className ='gray-circle'>
                  <img 
                    alt = 'character1' 
                    className ='mypage-profile-img-in' 
                    src='/img/profile/profile1.png' 
                    onClick ={(e)=>{
                    
                    setUserInfo({...userInfo,profile_picture_id:1});
                  }} >
                    </img>
                  </div>
                  <div className ='gray-circle'>
                  <img 
                  alt = 'character2' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile2.png' 
                  onClick ={(e)=>{
                    setUserInfo({...userInfo,profile_picture_id:2});
                }} >
                  </img>
                  </div>
                  <div className ='gray-circle'>
                  <img 
                  alt = 'character3' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile3.png' 
                  onClick ={(e)=>{
                    setUserInfo({...userInfo,profile_picture_id:3});
                }} >
                  </img>
                  </div>
                  <div className ='gray-circle'>
                  <img 
                  alt = 'character4' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile4.png' 
                  onClick ={(e)=>{
                    setUserInfo({...userInfo,profile_picture_id:4});
                }} >
                  </img>
                  </div>
                  <div className ='gray-circle'>
                  <img 
                  alt = 'character5' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile5.png' 
                  onClick ={(e)=>{
                    setUserInfo({...userInfo,profile_picture_id:5});
                }} >
                  </img>
                  </div>
                  <div className ='gray-circle'>
                  <img 
                  alt = 'character6' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile6.png' 
                  onClick ={(e)=>{
                    setUserInfo({...userInfo,profile_picture_id:6});
                }} >
                  </img>
                  </div>
                  <div className ='gray-circle'>
                  <img 
                  alt = 'character7' 
                  className ='mypage-profile-img-in' 
                  src='/img/profile/profile7.png' 
                  onClick ={(e)=>{
                    setUserInfo({...userInfo,profile_picture_id:7});
                }} >
                  </img>
                  </div>
                
                  
                </div>
                <div className ='mypage-profile-color'>
                  <div className ="mypage-content-color-text2">
                    프로필 사진의 배경색을 설정하세요
                  </div>
                  <div className="profile-background-container">
                    <button 
                      className = 'mypage-color-button mypage-color-button1'
                      onClick ={(e)=>{
                        setUserInfo({...userInfo,profile_color_id:1});
                      }}
                      > 
                      </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button2'
                      onClick ={(e)=>{
                        setUserInfo({...userInfo,profile_color_id:2});
                      }}> </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button3'
                      onClick ={(e)=>{
                        setUserInfo({...userInfo,profile_color_id:3});
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button4'
                      onClick ={(e)=>{
                        setUserInfo({...userInfo,profile_color_id:4});
                      }}> </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button5'
                      onClick ={(e)=>{
                        setUserInfo({...userInfo,profile_color_id:5});
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button6'
                      onClick ={(e)=>{
                        setUserInfo({...userInfo,profile_color_id:6});
                      }}
                      > </button>
                    <button 
                      className = 'mypage-color-button mypage-color-button7'
                      onClick ={(e)=>{
                        setUserInfo({...userInfo,profile_color_id:7});
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