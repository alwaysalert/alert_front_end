import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import ModeIcon from '@mui/icons-material/Mode';
import { Link } from 'react-router-dom';
import "../css/mainpage.css"
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import { GoogleLogout } from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';

//import {useCookies} from 'react-cookie';

function LogOut(props) {
  // const dispatch = useDispatch();
  // const login = useSelector((state)=>state.login);
  let google = null;

  const handle = () =>{
    setLogin(false);
    google = null
  }

  const [login, setLogin] = useState(props.isLoggedIn);
  // console.log("로그아웃 컴포넌트임");
  // console.log(login);
  // console.log(document.cookie);
  const [cookies, , removeCookie] = useCookies('token');
  if (login === false) {
//    localStorage.removeItem("access_token")
    //localStorage.removeItem('refresh_token')
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

  return (
    <div className="mypage-box" >
      <div className="mypage-box-title">
        프로필
      </div>
      <img className="mypage-box-profile-image" src="/img/boho/mypageboho.png" />
      <div className="mypage-box-nickname">{"조승현"}</div>
      <div className="mypage-box-hi"> 님, 안녕하세요</div>
      <ModeIcon className="penicon"></ModeIcon>
      <Grid container>
      <Link to={'/Mypage'}>
        <Box sx={{

          width: '8.18rem',
          height: '0.6rem',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#E9E8E8'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 0.3,
          borderRadius: 0.2,
          textAlign: 'center',
          fontSize: '0.6rem',
          fontWeight: '700',
        }}>마이페이지</Box></Link>
        <Box sx={{

          width: '8.18rem',
          height: '0.6rem',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#E9E8E8'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 0.3,
          borderRadius: 0.2,
          textAlign: 'center',
          fontSize: '0.6rem',
          fontWeight: '700',
        }}>댓글</Box>
        <Box sx={{

          width: '8.18rem',
          height: '0.6rem',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#E9E8E8'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 0.3,
          borderRadius: 0.2,
          textAlign: 'center',
          fontSize: '0.6rem',
          fontWeight: '700',
        }}>좋아요</Box>
        <Box sx={{

          width: '8.18rem',
          height: '0.6rem',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#E9E8E8'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 0.3,
          borderRadius: 0.2,
          textAlign: 'center',
          fontSize: '0.6rem',
          fontWeight: '700',
        }}>스크랩</Box>
      </Grid>
      <div className="mypage-box-etc">
        <div>개인정보동의약관</div>
        <div>고객센터</div>
        {/* <div onClick={(event) => {setLogin(false)}}>로그아웃</div> */}
        {/* <GoogleLogout
          clientId="803239834488-48ardhc03rvd229mppei0bpu2k91t6f3.apps.googleusercontent.com"
          buttonText="Logout"
          render={renderProps => (
            <div onClick={renderProps.onClick} >
              로그아웃
            </div>
          )}
          onLogoutSuccess={(event)=>{
            console.log('logout');
            // dispatch({type :"LogOut"})
            handle();
          }}
        >
        </GoogleLogout> */}
      
        
          <GoogleLogout
          clientId="803239834488-48ardhc03rvd229mppei0bpu2k91t6f3.apps.googleusercontent.com"
          buttonText="Logout"
          render={renderProps => (
            <div onClick={renderProps.onClick} >
                로그아웃
            </div>
          )}
          onLogoutSuccess={(event)=>{
            console.log('logout');
            // dispatch({type :"LogOut"})
            handle();
          }}
        >
        </GoogleLogout>
      
        </div>
    </div>
  )
}

export default LogOut;