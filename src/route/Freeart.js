
import React, { useEffect, useState } from 'react'
import '../css/mainpage.css'
import '../css/freeart.css'
import Nav from './Nav'
import AttachFileIcon from '@mui/icons-material/AttachFile';

import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import { Link } from 'react-router-dom'
import BoardProfile from './BoardProfile'
import { useCookies } from 'react-cookie';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

//util.js
import * as util from '../util/util';
import * as glob from '../global'
import CheckBox from './CheckBox';

function Freeart(props) {
  const baseURL = glob.BACK_BASE_URL; 
  const contentsPlaceholder = '글 내용을 입력하세요\nAlert는 누구나 자유롭게 참여가능한 커뮤니티를 형성하기 위해 정치, 사회 관련 행위, 홍보 및 판매 관련 행위, 그 밖의 타인의 권리를 침해하거나 \n불쾌함을 주는 모든 행위를 금하고 있으며, 이를 위반할 시 게시물이 삭제되고 Alert 서비스 이용에 제한이 생길 수 있습니다.'
  //쿠키에서 access_token받아오기
  const [cookies, , ] = useCookies(['access_token']);
  //console.log('cookie =',cookies.access_token);
  // 쿠키를 확인했을때 access_token이 없으면 되돌려 보내고, 아니면 checkUser
  const [open2, setOpen2] = useState(false);
    const handleClickOpen = () => {
        setOpen2(true);
      };
   
      const CheckButton = () => {
        const title = document.getElementById('freeart-title').value;
      const contents = document.getElementById('freeart-contents').value;
        if(title.length === 0 || title.length > 20)
        {
          alert("제목은 1글자부터 20글자까지입니다.")
        }
        else if(contents.length === 0)
        {
          alert("본문을 입력하세요.")
        }
        else if(cookies.access_token)
        {
          console.log(cookies.access_token)
          axios.post(`${baseURL}/freeboards/create`, {
        
            token: cookies.access_token,
            title: title,
            body: contents,
          
          }).then((res) => {
          
            document.location.reload();
          }).catch(err => {
            console.log(err)
          });
        }
        else{
          alert("로그인 후 이용 바랍니다")
        }
        setOpen2(false);
      }
      const CancelButton = () => {
        
        setOpen2(false);
      }

  const [userInfo, setUserInfo] = useState({
    auth_user_id : null,
    id : null,
    is_existing : false,
    nickname : null,
    profile_color_id : null,
    profile_picture_id : null,
    user_email:null,
    user_job : null
  });
  let newUserInfo = {...userInfo};

  const CheckUser = (access_token) => {
   
    
    axios.get(`${baseURL}/users/check_user`, {
        params: {
          token: access_token,
          format: 'json',
        }}).then(async (res) => {
          //console.log('data =',res.data);
          newUserInfo ={...res.data};
          //console.log(newUserInfo);
          setUserInfo(newUserInfo);
          //console.log('state:',userInfot);
        })
  
  }


  useEffect(() => {
    CheckUser(cookies.access_token);
    
    //eslint-disable-next-line
  }, []);



  const [articleArray,setArticle] = useState(null)
  
  useEffect(() => {
  
  axios.get(`${baseURL}/freeboards/?format=json`).then((res) => {
 
    setArticle(res.data);
    //console.log(res.data);
    
    }).catch((err) => {
      console.log("Error check", err);
    });
  //eslint-disable-next-line
},[])
useEffect(() => {
  console.log('state',articleArray);
},[articleArray])

 const[title, setWriteTitle] = useState("");
 const[text, setWriteContents] = useState("");
 
 const onSubmit = async(event) => {
    event.preventDefault();
   
    handleClickOpen();   
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
      <CheckBox Open={open2} cancelButton={CancelButton} checkButton={CheckButton} contents={"정말 작성하시겠습니까?"}/>
      <div className="freeart-content">
        <div className="freeart-content-head">
          <div className="freeart-content-head-title">자유게시판</div>
          <div className="freeart-content-head-content"><strong>자유게시판에서 여러분의 이야기를 자유롭게 들려주세요</strong></div>
        </div>
        <BoardProfile isLoggedIn = {props.isLoggedIn} uInfo = {userInfo} board ='자유게시판'></BoardProfile>
        
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
              <button className="form-submit" style={{fontSize:'20px'}} type="submit" onClick={(event) => {onSubmit(event);}}>작성완료</button>
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
                  <div className= "freeart-arts-profile-circle" style ={{background : util.hexcolor(article.author_info.profile_color_id)}} ><img alt = 'freeartprofile'className="freeart-arts-profile" src={util.image_route(article.author_info.profile_picture_id)}/></div>
                  
                
                
                  <h4 className="freeart-arts-title"><strong>{article.title}</strong></h4>
                  <p className="freeart-arts-content">{article.body.split('\n').length < 3 ? article.body.length > 100 ? article.body.substr(0,100) + '...' : article.body : article.body.split('\n')[0] + '\n...'}</p>
                  <span className="freeart-arts-whenwho">{formatDate(time)}&nbsp;&nbsp;|&nbsp;&nbsp;{article.author_info.nickname}</span>
                  <span className="count-container">
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            
            <ThumbUpAltIcon sx={{ color: '#b9b9b9',width:'23px',height:'23px',marginTop:'3' }}/>
          </div>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'10.5px',fontFamily:'apple-font-EB',color:'#b9b9b9'}}>
            {article.like_users.length}
          </span>
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            <ChatIcon sx={{ color: '#b9b9b9',width:'23px',height:'23px',marginTop:'3px' }}/>
          </div>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'10.5px',marginRight:'-5px',fontFamily:'apple-font-EB',color:'#b9b9b9'}}>
          
          {article.comment_count}
          </span>
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            <StarIcon sx={{ color: '#b9b9b9',width:'23px',height:'23px',marginTop:'3px' }}/>
          </div>
          <span style={{display:'inline-block',width:'3px',fontSize:'11px',verticalAlign:'top',marginTop:'10.5px',fontFamily:'apple-font-EB',color:'#b9b9b9'}}>
          {article.bookmark ? article.bookmark.length : "0"}
          </span>
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