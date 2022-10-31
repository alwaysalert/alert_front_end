import React from 'react'
import Nav from './Nav';
import "../css/mainpage.css"

function Search(props) {
  return (
    
    <div>
        <Nav isLoggedIn={props.isLoggedIn} />
        <img src ='/img/logo.png' alt = 'lgogogo' className ='sLogo'></img>
        <input className ='sinput' placeholder="찾으시려는 검색어를 입력하세요."></input>
        <img src = '/img/Vector1.png' alt ='search' className ="sicon"></img>
    </div>
  )
}

export default Search