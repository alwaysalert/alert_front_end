import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom'
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux"; // redux

function NaverCallback({logged}) {
    const login = useSelector((state)=>state.login);
    const dispatch = useDispatch();
    const token = window.location.href.split('=')[1].split('&')[0];

   //const drfClientId = 'OmAsECfljwnln9BVsao1iAxOEfFSZvw2lPRxcnA3';
  const drfClientId = 'ZkWDAanC1QkxPkdAY73HScls5ANgitbcqWdFvtT9'
  //const drfClientSecret = 'qMkPeWwMmPO9eKAEnf47oka0kyWu6NE6yK3t6UyO4QwnPnXtjSX6TRuBMtaOgaXnBoM0zxESbnCi2trVuBz7mzIB4DH4EfzmYqhixvlk2c73MciFNbvEQKCnEda2vcVx';
  const drfClientSecret = 'zm4HOISwrpeehXfw6QreMG6OGaC5nEfC3Zp49jkbU1FwDJK6QmpbQSLd28qQdpK4IkxYtPDywQWW4KwwgOv5fk53gaBCynyCNL30GTCFGC0m1znr80kzUfYQ5buGdxBg'


    const baseURL = "http://localhost:8000";
    
    const [cookies, setCookie,] = useCookies(['token']);

    console.log(cookies.token);
    //여기서 DB랑 연결해서 기존 사용자인지 아닌지 구분해서 기존 사용자가 아니면 회원가입 페이지로 넘어가게하고 기존 사용자면 홈페이지로 돌아가게 만들기
    
    async function handleNaverLogin(token){
    await axios.post(`${baseURL}/auth/convert-token`, {
        token: token,
        backend: "naver",
        grant_type: "convert_token",
        client_id: drfClientId,
        client_secret: drfClientSecret,
    })
    .then((res) => {

        console.log('it is naver');
        const { access_token, refresh_token } = res.data;
        console.log({ access_token, refresh_token });
        
        setCookie('access_token',access_token)
        setCookie('refresh_token',refresh_token)
        
        
        return res.data;
        
    })
    .catch((err) => {
        console.log("Error Naver login", err)
        return false;
        ///document.location.href='/';
    });
}	



useEffect(async () => {
    if(token){

        const data = await handleNaverLogin(token)
        console.log('datadata',data)
        
        
        document.location='/'

        
    }else{
        console.log("no..")
        //document.location.href='/'
    }
    
    
}, [])
}

export default NaverCallback;