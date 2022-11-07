import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom'
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux"; // redux
import Register from '../Register';

import * as glob from '../../global';

function NaverCallback({logged}) {
    const login = useSelector((state)=>state.login);
    const dispatch = useDispatch();
    const token = window.location.href.split('=')[1].split('&')[0];

    const drfClientId = glob.GIVEN_DRF_TOKEN;
    const drfClientSecret = glob.GIVEN_DRF_SECRET_TOKEN;

    const baseURL = "http://localhost:8000";
    
    const [cookies, setCookie,] = useCookies(['token']);
    const [open, setOpen] = React.useState(false);
    const [accessToken,setToken] = React.useState(null);
    const [refreshToken,setToken2] = React.useState(null);
    const [flag,setFlag] = React.useState(null);
    
    //여기서 DB랑 연결해서 기존 사용자인지 아닌지 구분해서 기존 사용자가 아니면 회원가입 페이지로 넘어가게하고 기존 사용자면 홈페이지로 돌아가게 만들기
    

    const CheckUser = (access_token) => {
  
  
  
        axios.get(`${baseURL}/users/check_user`, {
            params: {
              token: access_token,
              format: 'json',
            }}).then(async (res) => {
              console.log('data =',res.data.id)
              if(res.data.id > 0)
              {
                console.log('data2 =',res.data.id)
                setFlag(true);
              }
              else if(res.data.is_existing == false)
              {
                console.log('falsseeeee')
                setFlag(false);
              }
            }).catch((err) => {
              document.location="/Error";
            });
      
      }

    async function handleNaverLogin(token){
    await axios.post(`${baseURL}/auth/convert-token`, {
        token: token,
        backend: "naver",
        grant_type: "convert_token",
        client_id: drfClientId,
        client_secret: drfClientSecret,
    })
    .then((res) => {

        
        const { access_token, refresh_token } = res.data;
        
        
        setToken(access_token);
        setToken2(refresh_token)
      //setFlag(false);
        CheckUser(access_token);
        
        
        return true;
        
    })
    .catch((err) => {
        document.location="/Error";
        ///document.location.href='/';
    });
}	



useEffect(() => {
    const doLogin = async () => {
    if(token){

        const data = await handleNaverLogin(token)
        console.log('datadata',data)
        if(flag === true)
        {
            console.log('check_one');
            setCookie('access_token',accessToken);
            setCookie('refresh_token',refreshToken);
            document.location='/'
        }
        else if(flag === false)
        {
            console.log('check_two');
            setOpen(true);
  
  
        }
        
        //document.location='/'

        
    }else{
        console.log("no..")
        //document.location.href='/'
    }
}
    doLogin();
    
    
}, [flag,])
return(
    <Register open={open} setOpen={setOpen} setFlag={setFlag} token={accessToken}/>
)
}

export default NaverCallback;