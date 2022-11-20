import React, { useRef, useEffect } from 'react'
import '../css/whowe.css'
import Nav from './Nav';
import Slide from './Slide';


function WhoAreWe() {
    const boho1 = useRef();
    const WeAlert = useRef();
    const AlertLogo = useRef();
    

    const handleScroll = () => {
      
        if(window.scrollY>100){
            boho1.current.style.animation= "slideboho1 2s ease-out";
            boho1.current.style.opacity=1;
            WeAlert.current.style.animation= "slideWeAlert 2.5s ease-out";
            WeAlert.current.style.opacity=1;

            AlertLogo.current.style.animation= "appearlogo 1s ease-out";
            AlertLogo.current.style.opacity=1;
        }else if(window.scrollY<100){
            boho1.current.style.animation= "slidebackboho1 2s ease-out";
            boho1.current.style.opacity=0;
            WeAlert.current.style.animation= "slidebackWeAlert 1.5s ease-out";
            WeAlert.current.style.opacity=0;
            AlertLogo.current.style.animation= "disappearlogo 1s ease-out";
            AlertLogo.current.style.opacity=0;
        }
       
    }
    useEffect(() => {    
        // 0.1초마다 scroll 이벤트 검사
        const timer = setInterval(() => {
          window.addEventListener("scroll", handleScroll);//scroll 이벤트가 발생할때마다 handleScroll 실행
        }, 100);
        return () => {
          clearInterval(timer);
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
  return (
    <div>
        <Nav></Nav>
        <div className ='whoAreWE'>
        <div className='block1'>
          <Slide></Slide>
        </div>
        <span className='question'>Who Are We?</span>
        <section ref = {WeAlert} className='we-alert'><strong>We are 
        </strong></section>
        <img ref = {AlertLogo} alt ='logo' src ="/logo192.png"className='alertLogo'></img>
        
        <img ref = {boho1} alt='whoweboho' className='boho1' src="/img/boho/whoweboho.png" />

    </div>
    </div>
    
  )
}

export default WhoAreWe