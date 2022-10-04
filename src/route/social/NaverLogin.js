import React from 'react'
import {useEffect} from 'react'
import "../../css/login.css"
import "../../css/mainpage.css"


function NaverLogin() {
    
    const { naver } = window
	const NAVER_CLIENT_ID = "Juptoue4aKw3paUHGszw" // 발급 받은 Client ID 입력 
	const NAVER_CALLBACK_URL = "http://localhost:3000/NaverCallback" // 작성했던 Callback URL 입력


//const drfClientId = 's3PEa6tiC1IJuGnHq9Z0S3J39QxTWCS0Yxet9NzV';
const drfClientId = 'ZkWDAanC1QkxPkdAY73HScls5ANgitbcqWdFvtT9'
//const drfClientSecret = 'iHW0JAQEhKyhBqMapaBM4FNB93kStWNAHzjcD2Z1Yp3DmSVPciF4k0moOlVJEXLZI9vVfumo8ga5KebNWSgMQ90SOTYS3oOB4EtzeHPabFuRZHuSGNsFeG87zy4YkHUX';
const drfClientSecret = 'zm4HOISwrpeehXfw6QreMG6OGaC5nEfC3Zp49jkbU1FwDJK6QmpbQSLd28qQdpK4IkxYtPDywQWW4KwwgOv5fk53gaBCynyCNL30GTCFGC0m1znr80kzUfYQ5buGdxBg'

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