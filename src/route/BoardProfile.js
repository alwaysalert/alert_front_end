import React from 'react'

// css import
import '../css/mainpage.css'
import '../css/freeart.css'
import '../css/mypage.css'


// Component import
import Login from './Login';

function BoardProfile(props) {
    // console.log(props.isLoggedIn);
    console.log('profile:',props.uInfo);

    //프로필 사진 숫자 -> 사진으로 바꾸기
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
        background : hexcolor(props.uInfo.profile_color_id)
      }
  return (
    <>
        {props.isLoggedIn ? (
        <div className="freeart-content-profile">
            <div className="freeart-content-profile-name"><strong>{props.uInfo.nickname}</strong></div>
            <div className="freeart-content-profile-nim"><strong>님</strong></div>
            
            <div className ='profile2' style ={button_style}>
                <img 
                    alt='profile3'
                    className = 'profile3'
                    src={image_route(props.uInfo.profile_picture_id)}
                />
            </div>
                
            <div className="freeart-activity"><strong>{props.board}에서 {props.uInfo.nickname}님의 활동</strong></div>
            <div className="freeart-buttonBoxes">
            <div><strong>작성글</strong></div>
            <div><strong>댓글</strong></div>
            <div><strong>좋아요</strong></div>
            <div>알람 설정</div>
            </div>  
        </div>
  ) :(<div className="freeart-content-profile">
    <Login ></Login>
  </div>) }
    </>
    
    
        
  )
}

export default BoardProfile

