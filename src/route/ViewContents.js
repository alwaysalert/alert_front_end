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

import BoardProfile from './BoardProfile'



function ViewContents(props) {
    const baseURL = 'http://127.0.0.1:8000';

    
   

    //쿠키에서 access_token받아오기
    const [likeColor, setLikeColor] = useState({'default':'#b9b9b9', 'change':'red'})
    const [scrapColor, setScrapColor] = useState({'default':'#b9b9b9', 'change':'#FBD405'})
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
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
    const checkScrapColor = (bookmark,userInfo) => {
      console.log("check ",userInfo)
      if(bookmark.includes(userInfo.auth_user_id) === false)
      {
        setScrapColor({'default':'#b9b9b9', 'change':'yellow'})
      }
      else{
        //console.log('yes!')
        setScrapColor({'default':'yellow', 'change':'#b9b9b9'})
      }
    }
    const checkLikeColor = (like_users,userInfo) => {
      if(like_users.includes(userInfo.auth_user_id) === false)
      {
        setLikeColor({'default':'#b9b9b9', 'change':'red'})
      }
      else{
        //console.log('yes!')
        setLikeColor({'default':'red', 'change':'#b9b9b9'})
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
      axios.get(`${baseURL}/freeboards/${id}/?format=json`)
      .then(async (res) => {
      datafunc(res.data);
      
      
       
        
        }).catch((err) => {
          console.log("Error check", err);
        });
      axios.get(`${baseURL}/freeboards/${id}/comment?format=json`)
      .then((res) => {
          //console.log("comment",res)
          const commentIndex2 = []
          res.data.map(comment => {
            
            if(comment.parent_comment === null)
            {
              //console.log(comment)
              comment.child = [];
              setCOMMENT(prev => [...prev, comment]);
              commentIndex2[commentIndex2.length] = comment.id
              console.log("index",commentIndex2)
            }
            else
            {
              const parent = comment.parent_comment;
              const index = commentIndex2.indexOf(parent)

              setCOMMENT(prev => {
                const arr = prev
                //console.log("arr=",commentIndex)
                arr[index].child[arr[index].child.length] = comment
                return arr
              })
            }
            return 0;
          }
          )
          
          
          
          }).catch((err) => {
            console.log("Error check", err);
          });
    },[])
    function formatDate(date) {
      return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
        date.getDate().toString().padStart(2, '0')  + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' + 
        date.getMinutes().toString().padStart(2, '0')
    }
    // useEffect(() => {
      
      
    
      
      
    // },[])
    //console.log(typeof DATA.like_users)
    useEffect(() => {
    //console.log(DATA.like_users)
    console.log("DATA",DATA)
    //console.log("user",userInfo);
    
    console.log("comment =",COMMENT)
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
  },[DATA.like_users, userInfo.auth_user_id,COMMENT])

    const newTime = new Date(DATA.created_time);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    
    
    const like = () => {
      
      axios.post(`${baseURL}/freeboards/${id}/like_user`, {
        
          token: cookies.access_token
          
        }).then(async (res) => {
          
          if(res.data.message === "like upload")
          {
              setLikeCount(likeCount + 1)
          }
          else if(res.data.message ==="like deleted")
          {
             setLikeCount(likeCount - 1);
          }
        })
    }
    const scrap = () => {
      
      axios.post(`${baseURL}/freeboards/${id}/bookmark`, {
        
          token: cookies.access_token
          
        }).then(async (res) => {
          
          if(res.data.message === "bookmark upload")
          {
              setScrapCount(scrapCount + 1)
          }
          else if(res.data.message ==="bookmark deleted")
          {
             setScrapCount(scrapCount - 1);
          }
        })
    }
    const onEditSubmit = async(event) => {
      event.preventDefault();
      const title = document.getElementById('freeart-title').value;
      const contents = document.getElementById('freeart-contents').value;
      
      axios.post(`${baseURL}/freeboards/${id}/update`, {
        
          token: cookies.access_token,
          title: title,
          body: contents,
          
        }).then((res) => {
          console.log(res.data)
          setCheckEdit(false)
          document.location.reload();
        })
      
   }
   const onWriteComment = () => {
      const val = document.getElementById("writeComment").value;
      axios.post(`${baseURL}/freeboards/${id}/comment/create`,{
        token: cookies.access_token,
        text: val,
      }).then((res) => {
          //console.log(res)
          document.location.reload()
      })

   }
   const onWriteComcomment = (event) => {
    let val = null
    //console.log(event.target.parentElement)
    console.log(event.target)
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
    console.log("key =",val.id)
    console.log(cookies.access_token)
    axios.post(`${baseURL}/freeboards/${id}/comment/${val.id}/ccomment/create`,{
      token: cookies.access_token,
      text: inputVal,
    }).then(res => {
      if(res.data.message === "Comment create successfully")
      {
        document.location.reload();
      }
    }).catch((err) => {
      console.log("Error check", err);
    });

    
    
    // axios.post(`${baseURL}/freeboards/${id}/comment/create`,{
    //   token: cookies.access_token,
    //   text: val,
    // }).then((res) => {
    //     //console.log(res)
    //     document.location.reload()
    // })

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
const onDelete = () => {
    console.log('ok')
    console.log(cookies.access_token)
    axios.delete(`${baseURL}/freeboards/${id}/delete`, {
        
      data:{token: cookies.access_token}
      
    }).then((res) => {
      console.log(res.data)
      
      document.location.replace("/freeart");
    })
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
      <div className="freeart-content">
        <div className="freeart-content-head">
          <div className="freeart-content-head-title">자유게시판</div>
          <div className="freeart-content-head-content"><strong>자유게시판에서 여러분의 이야기를 자유롭게 들려주세요</strong></div>
        </div>
        <div className="freeart-content-profile">
        <BoardProfile isLoggedIn = {props.isLoggedIn} uInfo = {userInfo}></BoardProfile>
        </div>
        <div className="freeart-form-div">
        {checkEdit ?
        <> 
        <div className="freeart-form-div" style={{marginLeft:'0px'}}>
        <form className="freeart-form" onSubmit={onEditSubmit}>
            <div className="form-title-div">
              <input value={title} onChange={onChangeTitle} type="text" className="form-title" id='freeart-title'  ></input>
            </div>
            <div className="form-contents-div">
              <textarea value={text} onChange={onChangeContents} className="form-contents" id='freeart-contents' ></textarea>
            </div>
            <div className="form-last">
              
              <AttachFileIcon className="clip-icon" sx={{ fontSize: 30,color: '#B7B7B7' }}/>
              <button className="form-submit" type="submit" onClick={(event) => {onEditSubmit(event);}}>작성 완료</button>
            </div>
        </form>
        </div>
        </> : <>
        <div className="freeart-maincontents" >
            <div className="freeart-maincontents-header">
              <div className="fmh-left">
                <div className='fm-img-background'>
                  <img src='/img/profile/profile4.png' className="fm-img"></img>
                </div>
              </div>
              <div className="fmh-right">
                  <div style={{display:"inline-block"}}>
                    <p style={{fontFamily:'apple-font-EB', fontWeight:'bold'}}>{DATA.author_info ? checkAuthor  ? DATA.author_info.nickname + '(글쓴이)' : DATA.author_info.nickname : '알수없음'}</p>
                    <p style={{fontFamily:'apple-font-M',color:'#8A8A8A'}}>{formatDate(newTime)}</p>
                  </div>
                  
              </div>
              {checkAuthor ? (
                <>
                  <div className="fmc-report" style={{color:'#8A8A8A'}}>
                    신고하기
                  </div>
                  <div className="fmc-report" onClick={() => onDelete()} style={{color:'#8A8A8A'}}>
                    삭제하기
                  </div>
                  <div className="fmc-report" onClick={() => setCheckEdit(true)} style={{color:'#8A8A8A'}}>
                    수정하기
                  </div>
                  </>
                  ) : (
                  <div className="fmc-report" style={{color:'#8A8A8A'}}>
                    신고하기
                  </div>
                  )}
              
            </div>
            <div className='fmc-title' style={{fontFamily: 'apple-font-EB'}}>{DATA.title}</div>
            <div className='fmc-contents'>{DATA.body}</div>
            <div className='fmc-icon'>
            
            <FormControlLabel style={{border:'none', width:'20px',marginTop: '-15px'}}
            control={
              <Checkbox
                {...label}
                icon={<ThumbUpAltIcon onClick={like} sx={{ color: likeColor.default,width:'23px',height:'23px' }}/>}
                checkedIcon={<ThumbUpAltIcon onClick={like} sx={{ color: likeColor.change,width:'23px',height:'23px' }}/>}
                
              />
            }
            
          />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
            {likeCount ? likeCount : "0"}
          </span>
          <div style={{display:'inline-block',width:'20px',height:'20px',marginRight:'6px'}}>
            <ChatIcon sx={{ color: '#b9b9b9',width:'23px',height:'23px',marginTop:'10px' }}/>
          </div>
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',marginRight:'-5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
            {DATA.comment_count}
          </span>
          <FormControlLabel style={{border:'none', width:'20px',marginTop: '-15px'}}
            control={
              <Checkbox
                {...label}
                icon={<StarIcon onClick={scrap} sx={{ color: scrapColor.default,width:'23px',height:'23px' }}/>}
                checkedIcon={<StarIcon onClick={scrap} sx={{ color: scrapColor.change,width:'23px',height:'23px' }}/>}
                
              />
            }
            
          />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'16.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>
          {scrapCount ? scrapCount : "0"}
          </span>
          
               
                
              
            
          
              
            
            </div>
        </div>
        </>}
        {COMMENT && COMMENT.map(comment =>  {
          
          var time = new Date(comment.created_time);
          return(<>
            <div className="freeart-comment">
        <div className="freeart-maincontents-header">
              <div className="fmh-left">
                <div className='fm-img-background'>
                  <img src='/img/profile/profile4.png' className="fm-img"></img>
                </div>
              </div>
              <div className="fmh-right">
                  <div style={{display:"inline-block"}}>
                    <p style={{fontFamily:'apple-font-EB', fontWeight:'bold'}}>{comment.author_info.nickname}</p>
                    <p style={{fontFamily:'apple-font-M',color:'#8A8A8A'}}>{formatDate(time)}</p>
                  </div>
                  
              </div>
              <div className="fmc-report" onClick={(event) => {onCcommentClick(event)}} style={{color:'#8A8A8A',marginTop:'15px'}}>
                    대댓글
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    좋아요
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    신고하기
              </div>
            </div>
            <div className='fmc-contents'>{comment.text}</div>
            {comment.child && comment.child.map(child_comment => {
              
              var time2 = new Date(child_comment.created_time);
              return(<>
              <div className='freeart-comcomment'>
            <div className="freeart-maincontents-header">
              <div className="fmh-left">
                <div className='fm-img-background'>
                  <img src='/img/profile/profile4.png' className="fm-img"></img>
                </div>
              </div>
              <div className="fmh-right">
                  <div style={{display:"inline-block"}}>
                    <p style={{fontFamily:'apple-font-EB', fontWeight:'bold'}}>{child_comment.author_info.nickname}</p>
                    <p style={{fontFamily:'apple-font-M',color:'#8A8A8A'}}>{formatDate(time2)}</p>
                  </div>
                  
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    좋아요
              </div>
              <div className="fmc-report" style={{color:'#8A8A8A',marginTop:'15px'}}>
                    신고하기
              </div>
            </div>
            <div className='fmc-contents'>{child_comment.text}</div>
            </div>
              </>)
            })}
            <div style={{marginBottom:'15px'}}></div>
            <div id={comment.id} name="false" className='fmc-comment-input' style={{marginBottom:'-0.5px',display:"none"}}>
          <textarea  id='writeComcomment' className='write-comment' placeholder="댓글을 입력하세요." ></textarea>
          
          <FormControlLabel style={{border:'none', display: 'inline-block', width:'25px',verticalAlign:'top',marginTop:'-2px',marginLeft:'3px'}} control={<Checkbox coler="default" />} />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'12.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>익명</span>
          <div className="fmc-comment-submit" id="submittt" onClick={onWriteComcomment}>
            <CreateIcon sx={{marginLeft:'10px' ,width:'25px',heigth:'25px' ,color:'white',marginTop:'5px',marginLeft:'7px'}}/>
          </div>
        </div>
        </div>
          </>)
})}
        <div className='fmc-comment-input'>
          <textarea  id='writeComment' className='write-comment' placeholder="댓글을 입력하세요." ></textarea>
          
          <FormControlLabel style={{border:'none', display: 'inline-block', width:'25px',verticalAlign:'top',marginTop:'-2px',marginLeft:'3px'}} control={<Checkbox coler="default" />} />
          <span style={{display:'inline-block',width:'20px',fontSize:'11px',verticalAlign:'top',marginTop:'12.5px',fontFamily:'apple-font-EB',color:'#6B6B6B'}}>익명</span>
          <div className="fmc-comment-submit" onClick={(event) => onWriteComment(event)}>
            <CreateIcon sx={{marginLeft:'10px' ,width:'25px',heigth:'25px' ,color:'white',marginTop:'5px',marginLeft:'7px'}}/>
          </div>
        </div>
        </div>
        
        
      </div>
    </>
  )
}

export default ViewContents