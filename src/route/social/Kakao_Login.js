import React, { useEffect } from 'react'
import KakaoLogin from "react-kakao-login";
import "../../css/login.css"
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Register from '../Register';
import * as glob from '../../global';


function KakaoLoginFunc() {
  const baseURL = glob.BACK_BASE_URL;

  const kakaoClientId =glob.KAKAO_CLIENT_ID;
  const [, setCookie,] = useCookies(['access_token']);
  const [open, setOpen] = React.useState(false);
  const [token,setToken] = React.useState(null);
  const [token2,setToken2] = React.useState(null);
  const [flag,setFlag] = React.useState(null);
  
  const drfClientId = glob.GIVEN_DRF_TOKEN;
  const drfClientSecret = glob.GIVEN_DRF_SECRET_TOKEN;
  if (!window.Kakao.isInitialized()) {
    // JavaScript key를 인자로 주고 SDK 초기화
    window.Kakao.init(glob.KAKAO_CLIENT_ID);
    // SDK 초기화 여부를 확인하자.
    console.log(window.Kakao.isInitialized());
  }
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
          console.log("Error check", err);
        });
  
  }
  const handleKakaoLogin = (response) => {
    
    axios
      .post(`${baseURL}/auth/convert-token`, {
        
        token: response.response.access_token,
        backend: 'kakao',
        grant_type: 'convert_token',
        client_id: drfClientId,
        client_secret: drfClientSecret
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data;

        setToken(access_token);
        setToken2(refresh_token)
      //setFlag(false);
        CheckUser(access_token);
        
        
      })
      .catch(err => {
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
  <KakaoLogin
      jsKey={kakaoClientId}
      render={renderProps => (
                            <>
                              <Register open={open} setOpen={setOpen} setFlag={setFlag} token={token}/>
                              <button onClick={renderProps.onClick} className="login-container" id="kakao">
                                <img className="loginlogo" src="/img/kakaocorp.png" alt="kakaologo"/>
                                <div className="loginword">카카오로 로그인</div>
                              </button>
                            </>
                            )}
                          onSuccess={(response) => handleKakaoLogin(response)}
                          onFailure={(err) => console.log("Kakao Login failed ", err)}
                          className="KakaoLogin"
                          scope="account_email"
                      />
)
}

export default KakaoLoginFunc