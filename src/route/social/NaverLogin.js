import React from 'react'
import {useEffect} from 'react'
import "../../css/login.css"
import "../../css/mainpage.css"
import * as glob from '../../global';

function NaverLogin() {
    
    const { naver } = window
	const NAVER_CLIENT = glob.NAVER_CLIENT_ID // 발급 받은 Client ID 입력 
	const NAVER_CALLBACK = glob.NAVER_CALLBACK_URL // 작성했던 Callback URL 입력




	

	const initializeNaverLogin = () => {

		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT,
			callbackUrl: NAVER_CALLBACK,     
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 40},
			callbackHandle: true,
		})
		
		naverLogin.init()

      
      naverLogin.getLoginStatus(async function (status) {
			if (status) {
              // 아래처럼 선택하여 추출이 가능하고, 
				//const userid = naverLogin.user.getEmail()
				//const username = naverLogin.user.getName()
              // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
              // setUserInfo(naverLogin.user)
              
			}
		})     
	}
   
	   
        
	useEffect(() => {
		initializeNaverLogin()
		//eslint-disable-next-line
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
				<img className="loginlogo" src="/img/Naverlogo.png" alt="naver_logo"/>
                <div className="loginword" style={{color:'white'}}>네이버로 로그인</div>
			</button>
      		<div id="naverIdLogin" style={{ display: "none" }}/>
		</>
	)
}

export default NaverLogin