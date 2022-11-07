import React from 'react'
import Nav from './Nav';
import "../css/mainpage.css"
import { Link, useNavigate } from 'react-router-dom';

function ErrorPage(props) {
  return (
    <div>
        <Nav isLoggedIn={props.isLoggedIn} />
        <div className ='error'>
            <img src ='/img/blacklogo.png' alt = 'lgogo' className ='errorImg'></img>
            <div className ='errormessage'>불편을 드려 죄송합니다.<br></br>
            요청하는 페이지가 존재하지 않습니다.(사실 안만들음) </div>
            <Link to ='/'><button className ='errorbutton'>
                홈 화면으로 이동
            </button></Link>
            <button className ='errorbutton' onClick={()=>{
                History.goback()
            }}>
                이전 화면으로 이동(아직 안됨)
            </button>
            
        </div>
    </div>
  )
}

export default ErrorPage