import React from 'react'
import {useEffect} from 'react'
import "../../css/login.css"
import "../../css/mainpage.css"


function NaverLogin() {
    
    const { naver } = window
	const NAVER_CLIENT_ID = "Juptoue4aKw3paUHGszw" // 발급 받은 Client ID 입력 
	const NAVER_CALLBACK_URL = "http://localhost:3000/NaverCallback" // 작성했던 Callback URL 입력

//const drfClientId = 'E8OnwQW68N9XKGqifO9N9MM6bYi0nEoZhIkCG0ea';
const drfClientId = 'OmAsECfljwnln9BVsao1iAxOEfFSZvw2lPRxcnA3'
//const drfClientSecret = '1P3H0iMt6RIGktsFfESorhFCvYOvv5jcwCokCAZlYvFoG4pGB5HRqNh19aouSCQxFTKp9EdGBkBpNeV0ibak0eLIR4nIdVZSv9UVj95kCrOI7KqEnXwDhSGsb8xBYoK2';
const drfClientSecret = 'qMkPeWwMmPO9eKAEnf47oka0kyWu6NE6yK3t6UyO4QwnPnXtjSX6TRuBMtaOgaXnBoM0zxESbnCi2trVuBz7mzIB4DH4EfzmYqhixvlk2c73MciFNbvEQKCnEda2vcVx'
	const baseURL = "http://127.0.0.1:8000";

	const initializeNaverLogin = () => {

		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,     
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 40},
			callbackHandle: true,
		})
		
		naverLogin.init()

      
      naverLogin.getLoginStatus(async function (status) {
			if (status) {
              // 아래처럼 선택하여 추출이 가능하고, 
				const userid = naverLogin.user.getEmail()
				const username = naverLogin.user.getName()
              // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
              // setUserInfo(naverLogin.user)
              
			}
		})     
	}
   
	   
        
	useEffect(() => {
		initializeNaverLogin()
		
	}, [])
	
	const handleNaverClick = () => {
		const naverLoginButton = document.getElementById(
		  "naverIdLogin_loginButton"
		);
		if (naverLoginButton) naverLoginButton.click();
		
	  };

	return (
		<>
			<button onClick={handleNaverClick} className="login-container" id="naver">
				<img className="loginlogo" src="/img/Naverlogo.png" />
                <div className="loginword"><strong>네이버 로그인</strong></div>
			</button>
      		<div id="naverIdLogin" style={{ display: "none" }}/>
		</>
	)
}

export default NaverLogin