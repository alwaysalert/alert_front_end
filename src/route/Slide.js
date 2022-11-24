import React, { useRef, useState }from 'react'

import '../css/whowe.css'

function Box(props){
  const route = props.imgsrc.toString();
  return (
    <div className='slide-Box-area'>
      <div className='slide-Box'>
            <img id ='slide-logo' alt ='hi' src = {'/img/slideshow/'+route+'.jpeg'}></img>
      </div>
    </div>
  )
}


function Slide() {
  
  const [currentIndex, setCurrentIndex]=useState(3);
  
  const moveRight = () => {
    if(currentIndex === 1){
      setCurrentIndex(5)
    }else{
      setCurrentIndex(currentIndex-1);
    }
  }
  const moveLeft = () => {
    if(currentIndex === 5){
      setCurrentIndex(1)
    }else{
      setCurrentIndex(currentIndex+1);
    }
  }

  setTimeout(() => {
    moveRight();
  }, 5000)

  return (
    <div>
      <div className ='slide-window'>
        <button onClick={moveRight}>오른쪽</button>
        <button onClick={moveLeft}>왼쪽</button>
        <div  style={{ transition : '0.5s ease-in-out', transform : `translateX(${ 850*(currentIndex-3)}px)`}}className='slide-container'>
          <Box num = {1} imgsrc ={1}></Box>
          <Box num = {2} imgsrc ={2}></Box>
          <Box num = {3} imgsrc ={3}></Box>
          <Box num = {4} imgsrc ={4}></Box>
          <Box num = {5} imgsrc ={5}></Box>
        </div>
      </div>
    </div>
  )
}

export default Slide