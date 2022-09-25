import React from 'react'
import KakaoLogin from "react-kakao-login";
import "../../css/login.css"
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Kakao_Login() {
  const baseURL1 = "http://127.0.0.1:8000";

  const kakaoClientId ="cb5886c97fbfdcb48c2d87a880d04304";
  const [cookies, setCookie,] = useCookies(['access_token']);

  
  //const drfClientId = 'E8OnwQW68N9XKGqifO9N9MM6bYi0nEoZhIkCG0ea';
  const drfClientId = 'OmAsECfljwnln9BVsao1iAxOEfFSZvw2lPRxcnA3'
  //const drfClientSecret = '1P3H0iMt6RIGktsFfESorhFCvYOvv5jcwCokCAZlYvFoG4pGB5HRqNh19aouSCQxFTKp9EdGBkBpNeV0ibak0eLIR4nIdVZSv9UVj95kCrOI7KqEnXwDhSGsb8xBYoK2';
  const drfClientSecret = 'qMkPeWwMmPO9eKAEnf47oka0kyWu6NE6yK3t6UyO4QwnPnXtjSX6TRuBMtaOgaXnBoM0zxESbnCi2trVuBz7mzIB4DH4EfzmYqhixvlk2c73MciFNbvEQKCnEda2vcVx'
  
  const handleKakaoLogin = (response) => {
    console.log(response);
    axios
      .post(`${baseURL1}/auth/convert-token`, {
        
        token: response.response.access_token,
        backend: 'kakao',
        grant_type: 'convert_token',
        client_id: drfClientId,
        client_secret: drfClientSecret
      })
      .then((res) => {
        console.log('hi it is kakao')
        console.log(res);
        const {access_token, refresh_token} = res.data;
        console.log({access_token, refresh_token});
        
        setCookie('access_token',access_token);
        setCookie('refresh_token',refresh_token);
        //localStorage.setItem('access_token', access_token);
        //localStorage.setItem('refresh_token', refresh_token);
        document.location.reload();
      })
      .catch(err => {
        console.log("Error Kakao login",err);
      });
  };
return (
  <KakaoLogin
      jsKey={"cb5886c97fbfdcb48c2d87a880d04304"}
      render={renderProps => (
                              <button onClick={renderProps.onClick} className="login-container" id="kakao">
                                <img className="loginlogo" src="/img/kakaocorp.png" />
                                <div className="loginword"><strong>카카오 로그인</strong></div>
                              </button>
                            )}
                          onSuccess={(response) => handleKakaoLogin(response)}
                          onFailure={(err) => console.log("Kakao Login failed ", err)}
                          className="KakaoLogin"
                          scope="account_email"
                      />
)
}

export default Kakao_Login