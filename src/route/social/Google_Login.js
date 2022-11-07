import React, { useEffect, useState } from 'react'
import {gapi} from 'gapi-script';
import axios from "axios";
import GoogleLogin from "react-google-login";
import "../../css/login.css"

import {useSelector, useDispatch} from "react-redux"; // redux
import { useCookies } from 'react-cookie';

import Register from '../Register';

import * as glob from '../../global';

//let flag = null
function Google_Login() {
    //const login = useSelector((state)=>state.login);
    //const dispatch = useDispatch();
    const [cookies, setCookie,] = useCookies(['access_token']);
    const [open, setOpen] = React.useState(false);
    const [token,setToken] = React.useState(null);
    const [token2,setToken2] = React.useState(null);
    const [flag,setFlag] = React.useState(null);
    
    const googleClientId = "803239834488-48ardhc03rvd229mppei0bpu2k91t6f3.apps.googleusercontent.com";
    


  const drfClientId = glob.GIVEN_DRF_TOKEN;
  const drfClientSecret = glob.GIVEN_DRF_SECRET_TOKEN;
  // const drfClientId = 'NDhVLFJEul6091zuCB7nQCNgcVDd4EvONETHKfOP'
  // const drfClientSecret = '7SiuDr5cULJIss8IkmvyGW9ouyfyR6U78QfFQuCDxQfTz4GbIVk2dOeEbSAvZ8TcPsUQW6lTtheor67jsECmGuWgMfsuVTkpDAigoYGtyAtbkS61utCocQC7esyDcmA6'
  
  
  
  
    const baseURL = "http://127.0.0.1:8000"; 

    var googleAuth
    gapi.load('auth2', function () {
    googleAuth = gapi.auth2.init({
    client_id: '803239834488-48ardhc03rvd229mppei0bpu2k91t6f3.apps.googleusercontent.com',
    scope: 'email',
    fetch_basic_profile: false
    })
    
})


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
        console.log("Error check", err);
      });

}
const handleGoogleLogin = (response) => {
  
  console.log('it is google');
  
   axios.post(`${baseURL}/auth/convert-token`, {
      token: response.accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: drfClientId,
      client_secret: drfClientSecret,
    })
    .then((res) => {
      
      //console.log("google res =",res);
      const { access_token, refresh_token } = res.data;

      setToken(access_token);
      setToken2(refresh_token)
      //setFlag(false);
      CheckUser(access_token);
      
      //dispatch({type :"Login"});
    })
    .catch((err) => {
        document.location="/Error";
    });
};

useEffect(() => {
if(flag === true)
{
  console.log('check_one');
  setCookie('access_token',token);
  setCookie('refresh_token',token2);
  document.location.reload();
}
else if(flag === false)
{
  console.log('check_two');
  setOpen(true);
  
  
}}, [flag,]);
  return (
    <GoogleLogin
        clientId={googleClientId}
        buttonText="LOGIN WITH GOOGLE"
        render={renderProps => (
          <>
            <Register open={open} setOpen={setOpen} setFlag={setFlag} token={token}/>
            <button onClick={renderProps.onClick} className="login-container" id="google">
              
                <img className="loginlogo" src="/img/Googlelogo.png" />
                <div className="loginword"><strong>Google 로그인</strong></div>
              
            </button>
          </>
          )}
        onSuccess={(response) => handleGoogleLogin(response)}
        onFailure={(err) => console.log("Google Login failed ", err)}
        cookiePolicy={'single_host_origin'}
        scope="email"
        isSignedIn={true}
      />
  )
}

export default Google_Login