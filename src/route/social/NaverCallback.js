import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom'
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux"; // redux

function NaverCallback({logged}) {
    const login = useSelector((state)=>state.login);
    const dispatch = useDispatch();
    const token = window.location.href.split('=')[1].split('&')[0];

   //const drfClientId = 'E8OnwQW68N9XKGqifO9N9MM6bYi0nEoZhIkCG0ea';
  const drfClientId = 'aYvyQ1SMvUAi6W3J60cwmMRG6ZwxorWSTY3Y00Hl'
  //const drfClientSecret = '1P3H0iMt6RIGktsFfESorhFCvYOvv5jcwCokCAZlYvFoG4pGB5HRqNh19aouSCQxFTKp9EdGBkBpNeV0ibak0eLIR4nIdVZSv9UVj95kCrOI7KqEnXwDhSGsb8xBYoK2';
  const drfClientSecret = 'tZ78DGY9qyR94RiKba2uY9JhUUvWEihEio5FqpuM9W69HBxj2s67DSPhDzMQASIfaEn60eAR60WItie3XsNtOuAE4HTaCdYzCWLmCFuwdcdx92pH7kr4QJ57DqVavUBJ'


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