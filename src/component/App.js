import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Freeart from '../route/Freeart';
import Mypage from  '../route/Mypage';
import Mainpage from '../route/mainpage';
import NaverCallback from '../route/social/NaverCallback';
import ViewContents from '../route/ViewContents';

import {useCookies} from 'react-cookie';
import MyActivity from '../route/MyActivity';
import Search from '../route/Search';
import ErrorPage from '../route/ErrorPage';
import HackChild from '../route/HackChild';

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  //console.log('cookie =',cookies.access_token)
  useEffect(() => {
    if(cookies.access_token){
    //console.log('is access token? :',localStorage.getItem('access_token'))
    //if(localStorage.getItem('access_token')){
      setLogin(true);
      console.log("login ok");
    }else{
      setLogin(false);
    }
  }, []);
  return (
    <Router>
      <Routes>

            <Route exact path="/" element = {<Mainpage isLoggedIn={isLoggedIn}/>}/>
            <Route path="/NaverCallback" element ={<NaverCallback />}></Route>
            <Route exact path="/freeart" element = {<Freeart isLoggedIn={isLoggedIn}/>}/>
            <Route exact path="/Mypage" element = {<Mypage isLoggedIn={isLoggedIn}/>}/>

            <Route exact path="/freeart/:id" element ={<ViewContents isLoggedIn={isLoggedIn}/>} />
            <Route exact path="/HackChild" element = {<HackChild isLoggedIn={isLoggedIn}/>}/>
            <Route exact path="/MyActivity" element = {<MyActivity isLoggedIn={isLoggedIn}/>}/>
            <Route exact path="/Search" element = {<Search isLoggedIn={isLoggedIn}/>}/>
            <Route exact path="/Error" element = {<ErrorPage isLoggedIn={isLoggedIn}/>}/>


       
      </Routes>
    </Router>
  );
}

export default App;
