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
import axios from 'axios'
import { Link } from 'react-router-dom'
import BoardProfile from './BoardProfile'
import { useCookies } from 'react-cookie';



function Freeart(props) {
  const baseURL = "http://127.0.0.1:8000"; 
  const contentsPlaceholder = '글 내용을 입력하세요\nAlert는 누구나 자유롭게 참여가능한 커뮤니티를 형성하기 위해 정치, 사회 관련 행위, 홍보 및 판매 관련 행위, 그 밖의 타인의 권리를 침해하거나 \n불쾌함을 주는 모든 행위를 금하고 있으며, 이를 위반할 시 게시물이 삭제되고 Alert 서비스 이용에 제한이 생길 수 있습니다.'
  //쿠키에서 access_token받아오기
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  //console.log('cookie =',cookies.access_token);
  // 쿠키를 확인했을때 access_token이 없으면 되돌려 보내고, 아니면 checkUser
  
  const [userInfo, setUserInfo] = useState({
    auth_user_id : 2,
    id : 1,
    is_existing : true,
    nickname : 'name',
    profile_color_id : 3,
    profile_picture_id : 1,
    user_email:'',
    user_job : 1
  });
  let newUserInfo = {...userInfo};

  const CheckUser = (access_token) => {
    const baseurl= 'http://127.0.0.1:8000'
    
    axios.get(`${baseurl}/users/check_user`, {
        params: {
          token: access_token,
          format: 'json',
        }}).then(async (res) => {
          //console.log('data =',res.data);
          newUserInfo ={...res.data};
          setUserInfo(newUserInfo);
          //console.log('state:',userInfot);
        })
  
  }


  useEffect(() => {
    CheckUser(cookies.access_token);
    
    // console.log('a:', userInfo);
  }, []);



  const [articleArray,setArticle] = useState(null)
  
  useEffect(() => {
  
  axios.get(`${baseURL}/freeboards/?format=json`).then((res) => {
 
    setArticle(res.data);
    
    
    }).catch((err) => {
      console.log("Error check", err);
    });
  
},[])

 const[title, setWriteTitle] = useState("");
 const[text, setWriteContents] = useState("");
 
 const onSubmit = async(event) => {
    event.preventDefault();
    const title = document.getElementById('freeart-title').value;
    const contents = document.getElementById('freeart-contents').value;
    
    axios.post(`${baseURL}/freeboards/create`, {
      
        token: cookies.access_token,
        title: title,
        body: contents,
        
      }).then((res) => {
        console.log(res.data)
        document.location.reload();
      })
    
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
          <div className="freeart-content-head-title">자유게시판</div>
          <div className="freeart-content-head-content"><strong>자유게시판에서 여러분의 이야기를 자유롭게 들려주세요</strong></div>
        </div>
        <BoardProfile isLoggedIn = {props.isLoggedIn} uInfo = {userInfo}></BoardProfile>
        
        {props.isLoggedIn ? <div className="freeart-form-div">
        <form className="freeart-form" onSubmit={onSubmit}>
            <div className="form-title-div">
              <input value={title} onChange={onChangeTitle} type="text" className="form-title" id='freeart-title' placeholder="글 제목을 입력하세요" ></input>
            </div>
            <div className="form-contents-div">
              <textarea value={text} onChange={onChangeContents} className="form-contents" id='freeart-contents' placeholder={contentsPlaceholder} ></textarea>
            </div>
            <div className="form-last">
              
              <AttachFileIcon className="clip-icon" sx={{ fontSize: 30,color: '#B7B7B7' }}/>
              <button className="form-submit" type="submit" onClick={(event) => {onSubmit(event);}}>작성 완료</button>
            </div>
        </form>
        </div> : <></>}
        <div className="freeart-arts-container">
        {articleArray && articleArray.map(article =>{
          function formatDate(date) {
            return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
              date.getDate().toString().padStart(2, '0')  + ' ' +
              date.getHours().toString().padStart(2, '0') + ':' + 
              date.getMinutes().toString().padStart(2, '0')
          }
          var time = new Date(article.created_time);
          
          
          return (<div  key={article.id} name={article.id} id="freeart-arts-grid" >
                  <Link to={'/freeart/'+article.id} style={{width:'945px',height:'130px', backgroundColor:'red'}}>
                  <div>
                  <img className="freeart-arts-profile" src="/img/boho/mypageboho.png"/>
                
                
                  <h4 className="freeart-arts-title"><strong>{article.title}</strong></h4>
                  <p><strong>{article.body.length > 100 ? article.body.substr(0,100) + '...' : article.body}</strong></p>
                  <span className="freeart-arts-whenwho">{formatDate(time)} | {article.author_nickname}</span>
                  <span className="count-container">
                    <ThumbUpOffAltIcon />
                    <span className="count">30</span>
                    <ChatBubbleOutlineIcon />
                    <span className="count">30</span>
                    <StarOutlineOutlinedIcon />
                    <span className="count">30</span>
                  </span>                  
                  </div>
                  
                  </Link>
                  </div>)
})}
        
        </div>
      </div>
    </>
  )
}

export default Freeart;