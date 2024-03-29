
import React from 'react'


//import LogOut from './LogOut';
import "../css/mainpage.css"
import "../css/login.css"
import { Grid } from '@mui/material';

import NaverLogin from './social/NaverLogin';
import KakaoLoginFunc from './social/Kakao_Login';
import GoogleLoginFunc from './social/Google_Login';

function Login(props) {
    return (
        <>
        <div>
            <div className="title-login">로그인</div>
            <div className="login-form">
                <Grid container>
                    <KakaoLoginFunc/>
                    <NaverLogin></NaverLogin>
                    <GoogleLoginFunc />
                </Grid>
            </div>
        </div>
        </>
    );
}

export default Login