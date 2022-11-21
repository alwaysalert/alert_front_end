import React, { useEffect} from 'react'
import {gapi} from 'gapi-script';
import axios from "axios";
import GoogleLogin from "react-google-login";
import "../../css/login.css"
import { useCookies } from 'react-cookie';
import Register from '../Register';



function GoogleLoginFunc() {
    
    const [, setCookie,] = useCookies(['access_token']);
    const [open, setOpen] = React.useState(false);
    const [token,setToken] = React.useState(null);
    const [token2,setToken2] = React.useState(null);
    const [flag,setFlag] = React.useState(null);
    
    
    


  const drfClientId = process.env.REACT_APP_GIVEN_DRF_TOKEN;
  const drfClientSecret = process.env.REACT_APP_GIVEN_DRF_SECRET_TOKEN;
  
  
  
  
    const baseURL = process.env.REACT_APP_BACK_BASE_URL; 

    
    gapi.load('auth2', function () {
    gapi.auth2.init({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
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
        
        if(res.data.id > 0)
        {
          
          setFlag(true);
        }
        else if(res.data.is_existing === false)
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
      
      
      const { access_token, refresh_token } = res.data;

      setToken(access_token);
      setToken2(refresh_token)
      //setFlag(false);
      CheckUser(access_token);
      
     
    })
    .catch((err) => {
        document.location="/Error";
    });
};

useEffect(() => {
if(flag === true)
{
 
  setCookie('access_token',token);
  setCookie('refresh_token',token2);
  document.location.reload();
}
else if(flag === false)
{

  setOpen(true);
  
  //eslint-disable-next-line
}}, [flag,]);
  return (
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="LOGIN WITH GOOGLE"
        render={renderProps => (
          <>
            <Register open={open} setOpen={setOpen} setFlag={setFlag} token={token}/>
            <button onClick={renderProps.onClick} className="login-container" id="google">
              
                <img className="loginlogo" src="/img/Googlelogo.png" alt="googlelogo"/>
                <div className="loginword">Google로 로그인</div>
              
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

export default GoogleLoginFunc