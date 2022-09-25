import React, { useEffect } from 'react'
import {gapi} from 'gapi-script';
import axios from "axios";
import GoogleLogin from "react-google-login";
import "../../css/login.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector, useDispatch} from "react-redux"; // redux
import { useCookies } from 'react-cookie';
import { Stack } from '@mui/material';
import "../../css/register.css";

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
    

    //const drfClientId = 'OmAsECfljwnln9BVsao1iAxOEfFSZvw2lPRxcnA3';
  const drfClientId = 'ZkWDAanC1QkxPkdAY73HScls5ANgitbcqWdFvtT9'
  //const drfClientSecret = 'qMkPeWwMmPO9eKAEnf47oka0kyWu6NE6yK3t6UyO4QwnPnXtjSX6TRuBMtaOgaXnBoM0zxESbnCi2trVuBz7mzIB4DH4EfzmYqhixvlk2c73MciFNbvEQKCnEda2vcVx';
  const drfClientSecret = 'zm4HOISwrpeehXfw6QreMG6OGaC5nEfC3Zp49jkbU1FwDJK6QmpbQSLd28qQdpK4IkxYtPDywQWW4KwwgOv5fk53gaBCynyCNL30GTCFGC0m1znr80kzUfYQ5buGdxBg'
    const baseURL = "http://127.0.0.1:8000"; 

    var googleAuth
    gapi.load('auth2', function () {
    googleAuth = gapi.auth2.init({
    client_id: '803239834488-48ardhc03rvd229mppei0bpu2k91t6f3.apps.googleusercontent.com',
    scope: 'email',
    fetch_basic_profile: false
    })
    
})
const handleClose = () => {
  console.log(token);
  const name = document.getElementById("name");
  axios.post(`${baseURL}/users/register`, {
    token: token,
    nickname:name.value,
    user_job: 1,
  })
  .then((res) => console.log('post =',res))
  .catch((err) => {
    console.log("Error Register", err);
  });
  setOpen(false);
  setFlag(true);
  
};

const CheckUser = (access_token) => {
  const baseurl= 'http://127.0.0.1:8000'
  
  let flag;
  axios.get(`${baseurl}/users/check_user`, {
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
      })

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
      
      //dispatch({type :"Login"});
    })
    .catch((err) => {
      console.log("Error Google login", err);
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
          <Dialog open={open} sx={{minWidth: "700px"}} onClose={handleClose}>
          <DialogTitle>Alert에 처음 방문하셨나요?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              보다 나은 사용을 위해 아래와 같은 정보를 입력해주세요
            </DialogContentText>
            <div className='classnickname'>
              <div className='nickname-title'>닉네임</div><input 
                className = "register-nickname-input"
                id='name'
                name="id" 
                placeholder='사용하실 닉네임을 입력하세요' 
               >
                  
                </input>
                <button className = "register-nickname-button" type="submit"><strong className="button-color">중복 확인</strong></button>
             
            </div>
            <div className='job'>
            <div className='job-title' >
              신분
            </div>
            <div className='job-content'>
            <div>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined">중고등학생</Button>
              <Button variant="outlined">대학생</Button>
              <Button variant="outlined">졸업생</Button>
            </Stack>
            </div>
            <div>
            <Stack direction="row" spacing={2.45}> 
              <Button variant="outlined">교수님</Button>
              <Button variant="outlined">현직 종사자</Button>
              <Button variant="outlined">기타</Button>
            </Stack>
            </div>
            </div>
            </div>
          </DialogContent>
  
          <DialogActions>
            
            <Button onClick={handleClose}>완료</Button>
          </DialogActions>
        </Dialog>
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