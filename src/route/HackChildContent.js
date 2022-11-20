import React, { useEffect, useState} from 'react'
import { useCookies } from 'react-cookie';
import '../css/mainpage.css'
import '../css/myactivity.css'
import '../css/hackchild.css'
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBox from './CheckBox';
import { Link } from 'react-router-dom'
//util.js
import * as util from '../util/util';
import Qna from './Qna'


/**
 * Component Tag
 * @param {*} props Hot Q&A에 있는 게시물의 tag값
 * @returns tag 값에 해당하는 tag 명을 반환
 */
 function Tag(props){
  let tcolor = '';
  let tag = '가나다라';
  const style = {
      color : {tcolor},
      borderColor: {tcolor}
  }
  if(props.tag===1){
      tag = '시스템 해킹';
      style.color = '#4285F4'
  }else if(props.tag===2){
     tag ='웹 해킹';
     style.color = '#34A853'
  }else if(props.tag===3){
     tag = '리버싱'
     style.color = '#FBBC05'
  }else if(props.tag===4){
      tag = '기타'
      style.color = '#F85858'
  }
 

  return (<div className='hackchild-tag' style = {style}>
      {tag}
  </div>)
}


function HackChildContent(props) {
   
    const baseURL = process.env.REACT_APP_BACK_BASE_URL; 
    const contentsPlaceholder = '글 내용을 입력하세요\nAlert는 누구나 자유롭게 참여가능한 커뮤니티를 형성하기 위해 정치, 사회 관련 행위, 홍보 및 판매 관련 행위, 그 밖의 타인의 권리를 침해하거나 불쾌함을 주는 모든 행위를 금하고 있으며, 이를 위반할 시 게시물이 삭제되고 Alert 서비스 이용에 제한이 생길 수 있습니다.'
    const [cookies,,] = useCookies(['access_token']);
    const [qnaCheck, setQnaCheck] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleClickOpen2 = () => { //작성하시겠습니까?
       
      setOpen2(true);
      };
      const CancelButton = () => {
        
        setOpen2(false);
      }
    const handleClickOpen = () => { //글쓰기 dialog 열기
      setOpen(true);
      
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    
    //article 받아오기
    const [articleArray, setArticle] = useState(null);

    function CreateAriticle(){                          //useState를 사용하기 위해 함수 안으로 집어 넣음

      return (
        <div className="hackchild-create-article">
          <span className='hackchild-create-text'>
            <strong>
              이 분야를 공부하며 모르는 부분은 질문을 통해 해결하세요! 공유하고 싶은 정보도 나눠보아요! 
              </strong>
          </span>
         
          <span className='hackChild-create-button' onClick={handleClickOpen}>
            <EditIcon className='hackChild-create-button-edit' sx={{width:15, height:15, marginLeft:'5px',marginTop:'6.5px'}} />
             {'   글 작성하기'}
          </span>
          
        </div>
      )
    } 

    useEffect(() => {
      //Q&A
      if(props.num === 0){
        //axios -> Q&A
      }else{
        axios.get(`${baseURL}/hackchildren/?tag=${props.num}&format=json`).then((res) => {
          setArticle(res.data);
          
          
          }).catch((err) => {
            
          });
      }
        
    },[props.num]);
    const createContents = () => {          //글 생성
    const title1 = document.getElementById('hackchild-title').value;
    const contents1 = document.getElementById('hackchild-contents').value;
    if(title1.length === 0)
    {
      alert('제목을 입력하세요.')
    }
    else if(title1.length > 19)
    {
      alert('제목은 19글자를 넘길 수 없습니다.')
    }
    else if(contents1.length === 0)
    {
      alert('글 내용을 입력하세요')
    }
    else{
     
      axios.post(`${baseURL}/hackchildren/create`,{
        token: cookies.access_token,
        title: title1,
        body: contents1,
        isqna: qnaCheck,
        tag: props.num,
      }).then((res) => {
        document.location.reload()
      })
    }
    setOpen2(false);


  }
  // props.num이 0이면 Q&A 게시판 띄우기(default가 Q&A)
  if(props.num === 0){
    return (
      <div className='hackchild-content-background'>
        <Qna></Qna>
      </div>
    )
  }else{
    return (
      <div className='hackchild-content-background'>
        <div className='floating-editbutton' onClick={handleClickOpen}>
          <EditIcon  sx={{width:50, height:50, marginLeft:'5px',marginTop:'6.5px'}} />
        </div>
        
        <CheckBox Open={open2} cancelButton={CancelButton} checkButton={createContents} contents={"정말 작성하시겠습니까?"}/>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={'paper'}
          PaperProps={{ sx: { width: '200%',height:'500px' } }}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
                <input type="text" className="hackchild-form-title" id='hackchild-title' placeholder="글 제목을 입력하세요" ></input>
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              
              tabIndex={-1}
            >
            <textarea className="hackchild-form-contents" id='hackchild-contents' placeholder={contentsPlaceholder} ></textarea>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <FormGroup className="question-check" >
            <FormControlLabel sx={{border:'0',outline:'0',width:'80px'}} control={<Checkbox onChange={e => {
            setQnaCheck(e.target.checked);
            
          }}/>} label={<Typography sx={{fontWeight: 700,marginTop: '3px'}}>질문</Typography>} />
            </FormGroup>
            <div className="hackchild-submit" onClick={handleClickOpen2}>작성완료</div>
          </DialogActions>
        </Dialog>
        <CreateAriticle></CreateAriticle>
          {articleArray && articleArray.map(article =>{
            if(article.tag === props.num){
              function formatDate(date) {
                return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                  date.getDate().toString().padStart(2, '0')  + ' ' +
                  date.getHours().toString().padStart(2, '0') + ':' + 
                  date.getMinutes().toString().padStart(2, '0')
              }
              var time = new Date(article.created_time);
             
              
              return (<div  key={article.id} name={article.id} id="hackchild-arts-grid" >
                      <Link to={'/HackChild/'+article.id} style={{width:'930px',height:'130px', backgroundColor:'red'}}>
                      <div>
                      
                      
                      <div className= "myactivity-arts-profile-circle" style ={{background : util.hexcolor(article.author_info.profile_color_id)}} ><img alt = 'freeartprofile'className="myactivity-arts-profile" src={util.image_route(article.author_info.profile_picture_id)}/></div>
                        <div className="hackchild-arts-title"><strong>{article.title}</strong></div>
                        <div className="tagplace">
                          <Tag tag = {article.tag}></Tag>
                        </div>
                        <div className = 'hackchild-arts-text'>{article.body.split('\n').length < 3 ? article.body.length > 100 ? article.body.substr(0,100) + '...' : article.body : article.body.split('\n')[0] + '\n...'}</div> 
                      
                      
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
            }
            
  })}
      </div>
    )
  }
  
}

export default HackChildContent