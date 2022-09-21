
import React from 'react'


//import LogOut from './LogOut';
import "../css/mainpage.css"
import "../css/login.css"
import { Grid } from '@mui/material';

import NaverLogin from './social/NaverLogin';

import Kakao_Login from './social/Kakao_Login';
import Google_Login from './social/Google_Login';

function Login(props) {
    return (
        <>
        <div>
            <div className="title-login">로그인</div>
            <div className="login-form">
                <Grid container>
                    <Kakao_Login/>
                    <NaverLogin></NaverLogin>
                    <Google_Login />
                </Grid>
            </div>
        </div>
        </>
    );
}

export default Login