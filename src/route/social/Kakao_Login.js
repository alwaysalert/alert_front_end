import React from 'react'
import KakaoLogin from "react-kakao-login";
import "../../css/login.css"
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Kakao_Login() {
  const baseURL1 = "http://127.0.0.1:8000";

  const kakaoClientId ="cb5886c97fbfdcb48c2d87a880d04304";
  const [cookies, setCookie,] = useCookies(['access_token']);

  

  //const drfClientId = 'OmAsECfljwnln9BVsao1iAxOEfFSZvw2lPRxcnA3';
  const drfClientId = 'ZkWDAanC1QkxPkdAY73HScls5ANgitbcqWdFvtT9'
  //const drfClientSecret = 'qMkPeWwMmPO9eKAEnf47oka0kyWu6NE6yK3t6UyO4QwnPnXtjSX6TRuBMtaOgaXnBoM0zxESbnCi2trVuBz7mzIB4DH4EfzmYqhixvlk2c73MciFNbvEQKCnEda2vcVx';
  const drfClientSecret = 'zm4HOISwrpeehXfw6QreMG6OGaC5nEfC3Zp49jkbU1FwDJK6QmpbQSLd28qQdpK4IkxYtPDywQWW4KwwgOv5fk53gaBCynyCNL30GTCFGC0m1znr80kzUfYQ5buGdxBg'

  
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