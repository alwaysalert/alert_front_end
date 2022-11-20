import React, { useEffect} from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Register from '../Register';



function NaverCallback({logged}) {
    
    const token = window.location.href.split('=')[1].split('&')[0];

    const drfClientId = process.env.REACT_APP_GIVEN_DRF_TOKEN;
    const drfClientSecret = process.env.REACT_APP_GIVEN_DRF_SECRET_TOKEN;
    const baseURL = process.env.REACT_APP_BACK_BASE_URL;
    
    const [, setCookie,] = useCookies(['token']);
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
              
              if(res.data.id > 0)
              {
                setFlag(true);
              }
              else if(res.data.is_existing === false)
              { 
                setFlag(false);
              }
            }).catch((err) => {
                alert('로그인이 필요합니다.')
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
        
        if(flag === true)
        {
            
            setCookie('access_token',accessToken);
            setCookie('refresh_token',refreshToken);
            document.location='/'
        }
        else if(flag === false)
        {
            
            setOpen(true);
  
  
        }
        
        //document.location='/'

        
    }else{
        console.log("no..")
        //document.location.href='/'
    }
}
    doLogin();

//eslint-disable-next-line
}, [flag,])
return(
    <Register open={open} setOpen={setOpen} setFlag={setFlag} token={accessToken}/>
)
}

export default NaverCallback;