import React, { useEffect } from 'react'
import KakaoLogin from "react-kakao-login";
import "../../css/login.css"
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Register from '../Register';
function Kakao_Login() {
  const baseURL1 = "http://127.0.0.1:8000";

  const kakaoClientId ="cb5886c97fbfdcb48c2d87a880d04304";
  const [cookies, setCookie,] = useCookies(['access_token']);
  const [open, setOpen] = React.useState(false);
  const [token,setToken] = React.useState(null);
  const [token2,setToken2] = React.useState(null);
  const [flag,setFlag] = React.useState(null);
  
  const drfClientId = 'fdrtpI9Oxd5v5nfqWD5jjWgxBBrMztLj2Gjzdo3T';
  const drfClientSecret = 'n1eCuYarioCEzskYOU4vK3t6NRpuOqPagOqJE76cHi8fr1NbeF1HeZeMVUKzsYcU1xtZAwFbQBwp2gI4M18OeZi4HP8dHo9tqGUYOUXvc8VoDPr0bZEaTO1ZK2eTCq91';
  // const drfClientId = 'WJ6yp1akpyABDsl5yoguzFhoYjuCFYd1bii1yVDW'
  // const drfClientSecret = 'bSE5NeIGiD8BivFkXx86PIEXwH3UGBQlN5s7YUvuimNQ8CNX71UVWLe5Fn3sWzWnLIEntHHikDOFErOB7G2IpqHdyw57tW0ZGqPNISwu27x23GzLvf2mSHefD6T5i6QA'

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
        }).catch((err) => {
          console.log("Error check", err);
        });
  
  }
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
        const { access_token, refresh_token } = res.data;

        setToken(access_token);
        setToken2(refresh_token)
      //setFlag(false);
        CheckUser(access_token);
        
        
      })
      .catch(err => {
        console.log("Error Kakao login",err);
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
  <KakaoLogin
      jsKey={"cb5886c97fbfdcb48c2d87a880d04304"}
      render={renderProps => (
                            <>
                              <Register open={open} setOpen={setOpen} setFlag={setFlag} token={token}/>
                              <button onClick={renderProps.onClick} className="login-container" id="kakao">
                                <img className="loginlogo" src="/img/kakaocorp.png" />
                                <div className="loginword"><strong>카카오 로그인</strong></div>
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

export default Kakao_Login