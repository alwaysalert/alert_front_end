
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/freeart.css'
import '../css/mypage.css'
import Nav from './Nav'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

import MypageEdit from './MypageEdit'

//util.js
import * as util from '../util/util';

function Mypage() {
  //수정 or 그냥 마이페이지
  //state
  //편집상태
  const [isEdit, setIsEdit] = useState(false);  
  //userInfo
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
  //수정할 때 미리 옮겨둘 객체
  let newUserInfo = {...userInfo};
  //function CheckUser(access_token)
  const CheckUser = (access_token) => {
    const baseurl= 'http://127.0.0.1:8000'
    
    axios.get(`${baseurl}/users/check_user`, {
        params: {
          token : access_token,
          format: 'json',
        }}).then(async (res) => {
          newUserInfo ={...res.data};
          setUserInfo(newUserInfo);
        }).catch(err => {
          document.location="/Error";
        });
  
  }
  

  const [cookies, ,] = useCookies(['access_token']);
  // 쿠키를 확인했을때 access_token이 없으면 되돌려 보내기
  if(cookies.access_token === undefined){
    alert('로그인 먼저해!')
    document.location = '/';
  }
  useEffect(() => {
    CheckUser(cookies.access_token);
      //eslint-disable-next-line
  }, []);
  



//button style css util.js에 있는 hexcolor를 사용한다.
const button_style={
  background : util.hexcolor(newUserInfo.profile_color_id)
}
/**
 * 편집 버튼 누르면 EditMode로 바뀜 
 */
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
              프로필 <img alt ='hello' src ='/img/Vector.png' className='profile-edit-button' onClick ={EditMode}></img>
              <div className="mypage-content-profile-content"> 
                <div className='mypage-profile-image1' >
                  
                  <div className ='mypage-profile-image3' style ={button_style}>
                    <img 
                      alt='test2'
                      className = 'mypage-profile-image2'
                      src={util.image_route(userInfo.profile_picture_id)}
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
                 <strong>신&nbsp;&nbsp;분</strong> 
                </div>
                <div className = 'mypage-profile-job1'>
                  <strong>{util.userJob(userInfo.user_job)}</strong>
                </div>
                <div className = 'mypage-profile-belong'>
                  <strong>Email</strong>
                </div>
                <div className = 'mypage-profile-belong1'>
                  <strong>{util.userBelong(userInfo.user_email)}</strong>
                </div>
                
                
              </div>
              
            </div>
            
          </div>
        ) }
          
          
          <div className='mypage-content-activity'>
          <Link to ={`/MyActivity`} state = {{ id : 1}}>
            <div className = "mypage-content-profile-head">나의 활동</div>
          </Link>
            <div className = "mypage-content-acitivity-text">
              Alert에서 회원님이 활동하신 내역을 확인해보세요.
              
              <div style={{marginLeft:'-30px'}}>
              <Link to ={`/MyActivity`} state = {{ id : 1}}>
                <button className ='mypage-content-acitvity-button'><strong>작성한 글</strong></button>
              </Link>
              <Link to ={`/MyActivity`} state = {{ id : 3}}>
                <button className ='mypage-content-acitvity-button'><strong>좋아요한 글</strong></button>
              </Link>
              <Link to ={`/MyActivity`} state = {{ id : 2}}>
                <button className ='mypage-content-acitvity-button'><strong>스크랩한 글</strong></button>
              </Link>
              <Link to ={`/MyActivity`} state = {{ id : 4}}>
                <button className ='mypage-content-acitvity-button'><strong>댓글</strong></button>
              </Link>
              </div>
              
            </div>
            
          </div>
          <div className='mypage-content-useInfo'>
            <div className = "mypage-content-profile-head">이용 문의</div>
            <div className = "mypage-content-acitivity-text">Alert의 중요한 정보들, 개인정보처리방침 등을 확인해보세요.</div>
          </div>
        </div>
      </>
    )
}

export default Mypage