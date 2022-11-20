import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import Checkbox from '@mui/material/Checkbox';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import { FormControlLabel } from '@mui/material';
import { useCookies } from 'react-cookie';

import CheckBox from './CheckBox';
import BoardProfile from './BoardProfile'

import * as util from '../util/util'

import '../css/hackchildview.css'

function HackViewContents(props) {
    const baseURL = process.env.REACT_APP_BACK_BASE_URL;

    
   

    //쿠키에서 access_token받아오기
    const [likeColor, setLikeColor] = useState('thumbutton1')
    const [open2,setOpen2] = useState(false)
    const [scrapColor, setScrapColor] = useState('scrapbutton1')
    const [commentLikeLib,setCommentLikeLib] = useState({});
    const [commentFlag,setCommentFlag] = useState(false) 
      const commentClick = () => {
        setCommentFlag(!commentFlag)
      }
    const [cookies, , ] = useCookies(['access_token']);
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
    const [checkAuthor, setcheckAuthor] = useState(false)
    let newUserInfo = {...userInfo};
    const handleClickOpen = () => {
      setOpen2(true);
    };
    const CheckUser = (access_token) => {
    
      
      axios.get(`${baseURL}/users/check_user`, {
          params: {
            token: access_token,
            format: 'json',
          }}).then(async (res) => {
           
            newUserInfo ={...res.data};
            setUserInfo(newUserInfo);
            
          })
    
    }
    const checkScrapColor = (bookmark,userInfo) => {
      
      if(bookmark.includes(userInfo.auth_user_id) === false)
      {
        setScrapColor('scrapbutton1')
      }
      else{
       
        setScrapColor('scrapbutton2')
      }
    }
    const checkLikeColor = (like_users,userInfo) => {
      if(like_users.includes(userInfo.auth_user_id) === false)
      {
        setLikeColor('thumbutton1')
      }
      else{
       
        setLikeColor('thumbutton2')
      }
    }
  


    
    const {id} = useParams();
    const [DATA,datafunc] = useState({})
    const [COMMENT, setCOMMENT] = useState([])
    
    const [likeCount, setLikeCount] = useState(null);
    const [scrapCount, setScrapCount] = useState(null);
    const [checkEdit,setCheckEdit] = useState(false);
    const [title,setTitle] = useState("")
    const [text,setText] = useState("")
    

    useEffect(() => {
      CheckUser(cookies.access_token);
      axios.get(`${baseURL}/hackchildren/${id}/?format=json`)
      .then(async (res) => {
      
  
      datafunc(res.data);
      
      }).catch(err => {
        // document.location="/Error";
      });
      axios.get(`${baseURL}/hackchildren/${id}/comment?format=json`)
      .then((res) => {
          
          const commentIndex2 = []
          res.data.map(comment => {
            setCommentLikeLib((prev) => {
              const tmp = prev;
              const tmpid = comment.id
              tmp[tmpid] = comment.like_users.length;
              return tmp;
            })
            if(comment.parent_comment === null)
            {
              
              comment.child = [];
              setCOMMENT(prev => [...prev, comment]);
              commentIndex2[commentIndex2.length] = comment.id
             
            }
            else
            {
              const parent = comment.parent_comment;
              const index = commentIndex2.indexOf(parent)

              setCOMMENT(prev => {
                const arr = prev
                
                arr[index].child[arr[index].child.length] = comment
                return arr
              })
            }
            return 0;
          }
          )
          
          
          
          })
          //eslint-disable-next-line
    },[])
    function formatDate(date) {
      return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
        date.getDate().toString().padStart(2, '0')  + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' + 
        date.getMinutes().toString().padStart(2, '0')
    }
  
    useEffect(() => {
    

    if(DATA.author_info && userInfo.auth_user_id)
    {
      
      if(userInfo.nickname === DATA.author_info.nickname)
      {
        setcheckAuthor(true)
      }
      checkLikeColor(DATA.like_users,userInfo);
      checkScrapColor(DATA.bookmark,userInfo);
      setLikeCount(DATA.like_users.length);
      setScrapCount(DATA.bookmark.length);
      setTitle(DATA.title);
      setText(DATA.body);
    }
    //eslint-disable-next-line
  },[DATA.like_users, userInfo.auth_user_id,COMMENT])

    const newTime = new Date(DATA.created_time);

    
    const commentLike = (event) => {
      if(cookies.access_token)
      {
      const comment_id = event.target.parentElement.parentElement.id
      axios.post(`${baseURL}/hackchildren/${id}/comment/${comment_id}/like_user`,{
        token: cookies.access_token,
      }).then((res) => {
          const value =  commentLikeLib[comment_id]
          if(res.data.message === "like upload")
          {
            
            setCommentLikeLib({
              ...commentLikeLib,
              [comment_id]: value + 1
            })
           
          }
          else if(res.data.message === "like deleted")
          {
            
            setCommentLikeLib({
              ...commentLikeLib,
              [comment_id]: value - 1
            })
            
          }
      }).catch(err => {
        alert("오류 발생")
      });
    }else{
      alert("로그인 후 이용 바랍니다.")
    }
    }
    
    const like = () => {
      if(cookies.access_token)
      {
      axios.post(`${baseURL}/hackchildren/${id}/like_user`, {
        
          token: cookies.access_token
          
        }).then(async (res) => {
          
          if(res.data.message === "like upload")
          {
              setLikeCount(likeCount + 1)
              
              setLikeColor('thumbutton2')
          }
          else if(res.data.message ==="like deleted")
          {
             setLikeCount(likeCount - 1);
             
             setLikeColor('thumbutton1')
          }
        }).catch(err => {
          alert("오류 발생");
        });
      }else{
        alert("로그인 후 이용 바랍니다.")
      }
    }
    const scrap = () => {
      if(cookies.access_token)
      {
      axios.post(`${baseURL}/hackchildren/${id}/bookmark`, {
        
          token: cookies.access_token
          
        }).then(async (res) => {
          
          if(res.data.message === "bookmark upload")
          {
              setScrapCount(scrapCount + 1)
              setScrapColor('scrapbutton2')
              
          }
          else if(res.data.message ==="bookmark deleted")
          {
             setScrapCount(scrapCount - 1);
             setScrapColor('scrapbutton1')
          }
        }).catch(err => {
          alert("오류 발생");
        });
      }else{
        alert("로그인 후 이용 바랍니다.")
      }
    }
    const onEditSubmit = async(event) => {
      event.preventDefault();
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
          axios.post(`${baseURL}/hackchildren/${id}/update`, {
        
            token: cookies.access_token,
            title: title,
            body: contents,
            
          }).then((res) => {
           
            setCheckEdit(false)
            document.location.reload();
          }).catch(err => {
            alert("오류 발생");
          });
        }
    
      
   }
   const onWriteComment = () => {
      const val = document.getElementById("writeComment").value;
      if(val.length === 0)
      {
        alert("댓글을 입력하세요")
      }
      else if(cookies.access_token)
      {
      axios.post(`${baseURL}/hackchildren/${id}/comment/create`,{
          token: cookies.access_token,
          text: val,
        }).then((res) => {
          
           document.location.reload()
        }).catch(err => {
          alert("오류 발생")
        });
      }
      else{
        alert('로그인 후 이용 바랍니다.')
      }

   }
   const onWriteComcomment = (event) => {
    let val = null
   
 
    if(event.target.id === 'submittt')
    {
      val = event.target.parentElement;
    }
    else if(event.target.tagName === 'svg')
    {
      val = event.target.parentElement.parentElement;
    }
    else{
      val = event.target.parentElement.parentElement.parentElement;
    }
    const inputVal = val.firstChild.value;
    if(inputVal.length === 0)
    {
      alert('댓글을 입력해주세요')
    }
    else if(cookies.access_token)
    {
      axios.post(`${baseURL}/hackchildren/${id}/comment/${val.id}/ccomment/create`,{
        token: cookies.access_token,
        text: inputVal,
        }).then(res => {
        if(res.data.message === "Comment create successfully")
        {
          document.location.reload();
        }
        }).catch(err => {
        alert("오류 발생")
      });
    }else{
      alert("로그인 후 이용 바랍니다.")
    }


 }
   const onChangeTitle = (event) => {
    const {
      target: { value,}
    } = event;
    setTitle(value);

 }
 const onChangeContents = (event) => {
  const {
    target: { value,}
  } = event;
  setText(value);
}
const CheckButton = () => {
 
  
  if(cookies.access_token)
  {
    axios.delete(`${baseURL}/hackchildren/${id}/delete`, {
        
      data:{token: cookies.access_token}
      
    }).then((res) => {
      
      
      document.location.replace("/hackchildren");
    }).catch(err => {
      alert("오류 발생")
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
const onDelete = () => {
    
    handleClickOpen()
  }
  const onCcommentClick = (event) => {
    if(event.target.parentElement.parentElement.lastChild.name === "true")
    {
      event.target.parentElement.parentElement.lastChild.name = "false"
      event.target.parentElement.parentElement.lastChild.style.display = 'none'
    }
    else{
      event.target.parentElement.parentElement.lastChild.name = "true"
      event.target.parentElement.parentElement.lastChild.style.display = 'block'
    }
  }
    return (
    <>

      
      <Nav />
      <CheckBox Open={open2} cancelButton={CancelButton} checkButton={CheckButton} contents={"정말 삭제하시겠습니까?"}/>
      <div className="freeart-content">
        <div className="hackChild-content-head1">
          <div className="hackChild-content-head-title">핵린이 게시판</div>
          <div className="hackChild-content-head-content"><strong>해킹이 처음인 당신을 위해 준비했어요</strong></div>
          
        </div>
      <BoardProfile isLoggedIn = {props.isLoggedIn} uInfo ={userInfo} board ='핵린이 게시판'></BoardProfile>
        <div className="freeart-form-div">
        {checkEdit ?
        <> 
        <div className="freeart-form" style={{marginLeft:'0px'}}>
        <form className="freeart-edit-form" onSubmit={onEditSubmit}>
            <div className="form-title-div">
              <input value={title} onChange={onChangeTitle} type="text" className="form-title" id='freeart-title'  ></input>
            </div>
            <div className="form-contents-div">
              <textarea value={text} onChange={onChangeContents} className="form-contents" id='freeart-contents' ></textarea>
            </div>
            <div className="form-last">
              
              <AttachFileIcon className="clip-icon" sx={{ fontSize: 30,color: '#B7B7B7' }}/>
              <button className="form-submit" type="submit" style={{fontSize:'20px'}} onClick={(event) => {onEditSubmit(event)}}>작성완료</button>
            </div>
        </form>
        </div>
        </> : <>
        <div className="hackview-maincontents" >
          <div className ='hackview-header'>
                <div className='circle1'> </div>
                <div className='circle2'> </div>
                <div className='circle3'> </div>
          </div>
            <div className="freeart-maincontents-header">
              <div className="fmh-left">
              {DATA.author_info ? (
                <div className='fm-img-background' style={{background : util.hexcolor(DATA.author_info.profile_color_id)}}>
                  <img src={util.image_route(DATA.author_info.profile_picture_id)} className="fm-img" alt="owner_profile"></img>
                </div>
                ) : <></>
                }
              </div>
              <div className="fmh-right">
                  <div style={{display:"inline-block"}}>
                    <p style={{fontFamily:'apple-font-EB', fontWeight:'bold'}}>{DATA.author_info ? checkAuthor  ? DATA.author_info.nickname + '(글쓴이)' : DATA.author_info.nickname : '알수없음'}</p>
                    <p style={{fontFamily:'apple-font-M',color:'#8A8A8A'}}>{formatDate(newTime)}</p>
                  </div>
                  
              </div>
              {checkAuthor ? (
                <>
                  <div className="fmc-report" onClick={() => alert("준비중입니다.")} >
                    신고하기
                  </div>
                  <div className="fmc-report" onClick={() => onDelete()}>
                    삭제하기
                  </div>
                  <div className="fmc-report" onClick={() => setCheckEdit(true)} >
                    수정하기
                  </div>
                  </>
                  ) : (
                  <div className="fmc-report" onClick={() => alert("준비중입니다.")}>
                    신고하기
                  </div>
                  )}
              
            </div>
            <div className = 'hackview-body'>
              <div className='fmc-title' style={{fontFamily: 'apple-font-EB'}}>{DATA.title}</div>
              <div className='hackview-body-contents'>{DATA.body}</div>
            </div>
            
            <div className='hackview-icon'>
            
            
          <ThumbUpAltIcon onClick={like} sx={{shadow:1}}className={likeColor}/>
                
                
          
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
            {likeCount ? likeCount : "0"}
          </span>
          <a href='#writeComment' style={{display:'inline-block',marginTop:'10px',width:'20px',height:'20px',marginRight:'6px'}}>
            <ChatIcon onClick={commentClick} className="chatbutton"/>
          </a>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',marginRight:'-5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
            {DATA.comment_count}
          </span>
          <StarIcon onClick={scrap} className={scrapColor} sx={{ color: scrapColor.defaults,width:'23px',height:'23px' }}/>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
          {scrapCount ? scrapCount : "0"}
          </span>
          
               
                
              
            
          
            </div>
                    {/* map을 사용할때 루트요소가 <></>이면 오류가 나니까 조심하자. */}
        {COMMENT && COMMENT.map(comment =>  {
          var time = new Date(comment.created_time);
          return(<div key={Math.random()}>
            <div className="hackview-comment" id={comment.id} >
              <div className="freeart-maincontents-header">
                <div className="fmh-left">
                   <div className='fm-img-background' style ={{background : util.hexcolor(comment.author_info.profile_color_id)}}>
                      <img src={util.image_route(comment.author_info.profile_picture_id)} className="fm-img" alt="writer_profile"></img>
                  </div>
                </div>
              <div className="fmh-right">
                  <div style={{display:"inline-block"}}>
                    <p style={{fontFamily:'apple-font-EB', fontWeight:'bold'}}>{comment.author_info.nickname}</p>
                    <p style={{fontFamily:'apple-font-M',color:'#8A8A8A'}}>{formatDate(time)}</p>
                    
                  </div>
                  {commentLikeLib[comment.id] ?  
                  <div key={Math.random()} style={{marginTop:'10px',marginLeft:'10px',width:'30px',display:'inline'}}>
                    <ThumbUpAltIcon sx={{ color: 'red',height:'23px',width:'18px', verticalAlign:'bottom'}}/>
                    <span>{commentLikeLib[comment.id]}</span>
                  </div> 
                    : 
                    <></>}              
              </div>
              <div className="fmc-report" onClick={(event) => {onCcommentClick(event)}} style={{marginTop:'15px'}}>
                    대댓글
              </div>
              <div className="fmc-report" onClick={(event) => {commentLike(event)}} style={{marginTop:'15px'}}>
                    좋아요
              </div>
              <div className="fmc-report" onClick={() => alert("준비중입니다.")} style={{marginTop:'15px'}}>
                    신고하기
              </div>
              </div>
              <div className='hackview-contents'>{comment.text}</div>
                {comment.child && comment.child.map(child_comment => {
                  var time2 = new Date(child_comment.created_time);
                  return(<div key={Math.random()}>
                          <div className='freeart-comcomment' id={child_comment.id} >
                            <div className="freeart-maincontents-header">
                              <div className="fmh-left">
                                <div className='fm-img-background' style ={{background : util.hexcolor(child_comment.author_info.profile_color_id)}}>
                                  <img src={util.image_route(child_comment.author_info.profile_picture_id)} className="fm-img" alt="writer_profile"></img>
                                </div>
                              </div>
                              <div className="fmh-right">
                                  <div style={{display:"inline-block"}}>
                                    <p style={{fontFamily:'apple-font-EB', fontWeight:'bold'}}>{child_comment.author_info.nickname}</p>
                                    <p style={{fontFamily:'apple-font-M',color:'#8A8A8A'}}>{formatDate(time2)}</p>
                                  </div>

                                  {commentLikeLib[child_comment.id] ? <div style={{marginTop:'10px',marginLeft:'10px',width:'30px',display:'inline'}}>
                                    <ThumbUpAltIcon sx={{ color: 'red',height:'23px',width:'18px', verticalAlign:'bottom'}}/>
                                    <span>{commentLikeLib[child_comment.id]}</span>
                                  </div> : <></>}
                                  
                              </div>
                              <div className="fmc-report" onClick={(event) => commentLike(event)} style={{marginTop:'15px'}}>
                                    좋아요
                              </div>
                              <div className="fmc-report" onClick={() => alert("준비중입니다.")} style={{marginTop:'15px'}}>
                                    신고하기
                              </div>
                            </div>
                            <div className='hackview-contents'>{child_comment.text}</div>
                          </div>
                        </div>)
            })}
            <div style={{marginBottom:'15px'}}></div>
            <div id={comment.id} name="false" className='fmc-comment-input' style={{width:'97.65%',margin:'auto',marginBottom:'10px',display:"none"}}>
          <textarea  id='writeComcomment' className='write-comment' placeholder="댓글을 입력하세요." ></textarea>
          
          {/* <FormControlLabel style={{border:'none', display: 'inline-block', width:'25px',verticalAlign:'top',marginTop:'-2px',marginLeft:'3px'}} control={<Checkbox coler="default" />} />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'12.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>익명</span> */}
          <div className="fmc-comment-submit" id="submittt" onClick={onWriteComcomment}>
            <CreateIcon sx={{width:'25px',heigth:'25px' ,color:'white',marginTop:'5px',marginLeft:'7px'}}/>
          </div>
        </div>
        </div>
          </div>)
})}
        {commentFlag ? (<>
        <div className='fmc-comment-input'>
          <textarea  id='writeComment' className='write-comment' placeholder="댓글을 입력하세요." ></textarea>
          
          {/* <FormControlLabel style={{border:'none', display: 'inline-block', width:'25px',verticalAlign:'top',marginTop:'-2px',marginLeft:'3px'}} control={<Checkbox coler="default" />} />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'12.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>익명</span> */}
          <div className="fmc-comment-submit" onClick={(event) => onWriteComment(event)}>
            <CreateIcon sx={{width:'25px',heigth:'25px' ,color:'white',marginTop:'5px',marginLeft:'7px'}}/>
          </div>
        </div>
        </>) : <></>}
        </div>
        </>}
        
        <div style={{marginBottm:'50px'}}></div>
        </div>
       
        
        
      </div>
    </>
  )
}

export default HackViewContents