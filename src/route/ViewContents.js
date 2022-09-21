import React from 'react'
import { useParams } from 'react-router-dom';
import Nav from './Nav';


function ViewContents() {
    const {id} = useParams();
    
  return (
    <>

      
      <Nav />
      <div className="freeart-content">
        <div className="freeart-content-head">
          <div className="freeart-content-head-title"><strong>자유게시판</strong></div>
          <div className="freeart-content-head-content"><strong>자유게시판에서 여러분의 이야기를 자유롭게 들려주세요</strong></div>
        </div>
        <div className="freeart-content-profile">
          <div className="freeart-content-profile-name"><strong>{'조승현'}</strong></div>
          <div className="freeart-content-profile-nim"><strong>님</strong></div>
          <img className="freeart-content-profile-boho" src='/img/boho/mypageboho.png' />
          <div className="freeart-activity"><strong>자유게시판에서 조승현님의 활동</strong></div>
          <div className="freeart-buttonBoxes">
            <div><strong>작성글</strong></div>
            <div><strong>댓글</strong></div>
            <div><strong>좋아요</strong></div>
            <div><strong>스크랩</strong></div>
          </div>  
        </div>
        
      </div>
    </>
  )
}

export default ViewContents