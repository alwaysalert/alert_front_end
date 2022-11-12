import React from 'react'
import Nav from './Nav';
import "../css/mainpage.css"
import { Link} from 'react-router-dom';

function ErrorPage(props) {
  return (
    <div>
        <Nav isLoggedIn={props.isLoggedIn} />
        <div className ='error'>
            <img src ='/img/blacklogo.png' alt = 'lgogo' className ='errorImg'></img>
            <div className ='errormessage'>불편을 드려 죄송합니다.<br></br>
            요청하는 페이지가 존재하지 않습니다. </div>
            <Link to ='/'><button className ='errorbutton'>
                홈 화면으로 이동
            </button></Link>
            <button className ='errorbutton' onClick={()=>{
                window.history.go(-1)
            }}>
                이전 화면으로 이동
            </button>
            
        </div>
    </div>
  )
}

export default ErrorPage