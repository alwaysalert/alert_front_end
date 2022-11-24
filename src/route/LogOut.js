import React from 'react'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom';
import "../css/mainpage.css"
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import { GoogleLogout } from 'react-google-login';


import axios from 'axios';

import * as util from '../util/util'

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
    const baseurl= process.env.REACT_APP_BACK_BASE_URL;
    axios.get(`${process.env.REACT_APP_BACK_BASE_URL}/users/check_user`, {
        params: {
          token: access_token,
          format: 'json',
        }}).then(async (res) => {
          newUserInfo ={...res.data};
          setUserInfo(newUserInfo);
          
        }).catch(err => {
          document.location="/Error";
        });
  
  }

  useEffect(() => {
    CheckUser(cookies.access_token);
  //eslint-disable-next-line
  }, []);

  //프로필 사진
  

const button_style={
  background : util.hexcolor(newUserInfo.profile_color_id)
}


//box css
const box = {
  width: '8.18rem',
  height: '0.5rem',
  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#FFFFFF'),
  color: (theme) =>
    theme.palette.mode === 'dark' ? 'grey.300' : '#000000',
  p: 1,
  m: 0.3,
  borderRadius: 0.2,
  textAlign: 'center',
  
  fontSize: '0.8rem',
  fontWeight: 'bold',
  lineHeight: '11px',
  fontFamily: 'apple-font-M',
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
              src={util.image_route(userInfo.profile_picture_id)}
          />
      </div>
      <div>
        <br></br>
        <br></br>
      </div>
      <Grid container>
      <Link to={'/Mypage'} >
        <Box sx={box} className='mypagehover'>마이페이지</Box></Link>
        <Link>
        <Box sx={box} className="mypagehover">
            <GoogleLogout
          clientId="803239834488-48ardhc03rvd229mppei0bpu2k91t6f3.apps.googleusercontent.com"
          buttonText="Logout"
          render={renderProps => (
            <div onClick={renderProps.onClick} >
                로그아웃
            </div>
          )}
          onLogoutSuccess={(event)=>{
           
            // dispatch({type :"LogOut"})
            handle();
          }}
        >
        </GoogleLogout>
          </Box>
        </Link>
        <Link to ={`/MyActivity`} state = {{ id : 2}}>
        <Box sx={box} className="mypagehover">스크랩한 글</Box>
        </Link>
        <Link to ={`/MyActivity`} state = {{ id : 3}}>
        <Box sx={box} className="mypagehover">+</Box>
        </Link>
      </Grid>
      <div className="mypage-box-etc">
        <div className="document">개인정보동의약관</div>
        <div className="document">고객센터</div>
        <div className="document">환경 설정</div>
        </div>
    </div>
  )
}

export default LogOut;