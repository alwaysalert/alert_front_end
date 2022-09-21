import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/freeart.css'
import Nav from './Nav'
import TagIcon from '@mui/icons-material/Tag';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { dbService } from '../firebase'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

function Freeart() {
  const contentsPlaceholder = '글 내용을 입력하세요\nAlert는 누구나 자유롭게 참여가능한 커뮤니티를 형성하기 위해 정치, 사회 관련 행위, 홍보 및 판매 관련 행위, 그 밖의 타인의 권리를 침해하거나 불쾌함을 주는 모든 행위를 금하고 있으며, 이를 위반할 시 게시물이 삭제되고 Alert 서비스 이용에 제한이 생길 수 있습니다.'
  const [nweets, setNweets] = useState([]);
  const getNweets = async() =>{
    const dbNweets =  await dbService.collection("freeart").get()                  //서버(firebase)로부터 게시글이 저장되어있는 폴더를 연결한다
    setNweets([]);
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      }
      
      setNweets((prev) => {
        
        return([nweetObject, ...prev])
      });
  });
};
useEffect(() =>{
  getNweets();
  
 },[])

 const[title, setWriteTitle] = useState("");
 const[text, setWriteContents] = useState("");
 const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection("freeart").add({
      title,
      text,
      createdAt: Date.now(),
    });
    setWriteTitle("");
    setWriteContents("");
    window.location.reload();
 }
 const onChangeTitle = (event) => {
    const {
      target: { value,}
    } = event;
    setWriteTitle(value);

 }
 const onChangeContents = (event) => {
  const {
    target: { value,}
  } = event;
  setWriteContents(value);

}
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
        <div className="freeart-form-div">
        <form className="freeart-form" onSubmit={onSubmit}>
          
            <input value={title} onChange={onChangeTitle} type="text" className="form-title" placeholder="글 제목을 입력하세요" ></input>
         
         
            <textarea value={text} onChange={onChangeContents} className="form-contents" placeholder={contentsPlaceholder} ></textarea>
            <div className="form-last">
              <TagIcon className="tag-icon" sx={{ fontSize: 30, color: '#B7B7B7' }}/>
              <AttachFileIcon className="clip-icon" sx={{ fontSize: 30,color: '#B7B7B7' }}/>
              <input className="form-submit" type="submit" value="작성완료"></input>
            </div>
        </form>
        </div>
        <div className="freeart-arts-container">
        {nweets && nweets.map(nweet => 
          <div key={nweet._id} id="#freeart-arts-grid">
                
                  <img className="freeart-arts-profile" src="/img/boho/mypageboho.png"/>
                
                
                  <h4 className="freeart-arts-title"><strong>{nweet.title}</strong></h4>
                  <p><strong>{nweet.text.length > 100 ? nweet.text.substr(0,100) + '...' : nweet.text}</strong></p>
                  <span className="freeart-arts-whenwho">17:56 | 익명</span>
                  <span className="count-container">
                    <ThumbUpOffAltIcon />
                    <span className="count">30</span>
                    <ChatBubbleOutlineIcon />
                    <span className="count">30</span>
                    <StarOutlineOutlinedIcon />
                    <span className="count">30</span>
                  </span>                  
                  
                  
                
          </div>
          )}
        
        </div>
      </div>
    </>
  )
}

export default Freeart;