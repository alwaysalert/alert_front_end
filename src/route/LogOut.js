import React from 'react'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import ModeIcon from '@mui/icons-material/Mode';
import { Link } from 'react-router-dom';
import "../css/mainpage.css"
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import { GoogleLogout } from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';

import axios from 'axios';
import * as glob from '../global';

function LogOut(props) {
  let google = null;

  const handle = () =>{
    setLogin(false);
    google = null
  }
  
  const [login, setLogin] = useState(props.isLoggedIn);
  
  const [cookies, , removeCookie] = useCookies('token');
  if (login === false) {
    setLogin(null)
    removeCookie('access_token');
    removeCookie('refresh_token');
    removeCookie('isgoogle');
    document.location.reload();
  }
  const isgoogle = cookies.isgoogle;
  
  if(isgoogle === 'true'){
     google = true;
     console.log("google : ",google)
  }
  //프로필

  const [userInfo, setUserInfo] = useState({
    auth_user_id : 0,
    id : 0,
    is_existing : true,
    nickname : 'name',
    profile_color_id : 0,
    profile_picture_id : 0,
    user_email:'',
    user_job : 0
  });
  let newUserInfo = {...userInfo};

  const CheckUser = (access_token) => {
    const baseurl= glob.BACK_BASE_URL;
    axios.get(`${baseurl}/users/check_user`, {
        params: {
          token: access_token,
          format: 'json',
        }}).then(async (res) => {
          newUserInfo ={...res.data};
          setUserInfo(newUserInfo);
          
        })
  
  }

  useEffect(() => {
    CheckUser(cookies.access_token);
  }, []);

  //프로필 사진
  
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

//box css
const box = {
  width: '8.18rem',
  height: '0.6rem',
  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#FFFFFF'),
  color: (theme) =>
    theme.palette.mode === 'dark' ? 'grey.300' : '#000000',
  p: 1,
  m: 0.3,
  borderRadius: 0.2,
  textAlign: 'center',
  fontSize: '0.8rem',
  fontWeight: '700',
};

  return (
    <div className="mypage-box" >
      <div className="mypage-box-title">
        {userInfo.nickname}<span className='nim'> 님</span>
      </div>
      <div className ='profile4' style ={button_style}>
          <img 
              alt='profile3'
              className = 'profile3'
              src={image_route(userInfo.profile_picture_id)}
          />
      </div>
      <div>
        <br></br>
        <br></br>
      </div>
      <Grid container>
      <Link to={'/Mypage'}>
        <Box sx={box}><strong>마이페이지</strong></Box></Link>
        <Link>
        <Box sx={box}>
            <GoogleLogout
          clientId="803239834488-48ardhc03rvd229mppei0bpu2k91t6f3.apps.googleusercontent.com"
          buttonText="Logout"
          render={renderProps => (
            <div onClick={renderProps.onClick} >
                <strong>로그아웃</strong>
            </div>
          )}
          onLogoutSuccess={(event)=>{
            console.log('logout');
            // dispatch({type :"LogOut"})
            handle();
          }}
        >
        </GoogleLogout>
          </Box>
        </Link>
        <Link to ={`/MyActivity`} state = {{ id : 2}}>
        <Box sx={box}>스크랩한 글</Box>
        </Link>
        <Link to ={`/MyActivity`} state = {{ id : 3}}>
        <Box sx={box}>+</Box>
        </Link>
      </Grid>
      <div className="mypage-box-etc">
        <div>개인정보동의약관</div>
        <div>고객센터</div>
        <div>환경 설정</div>
        </div>
    </div>
  )
}

export default LogOut;