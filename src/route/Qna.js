import { height } from '@mui/system';
import React, { useState, useRef, useEffect } from 'react'
import '../css/hackchild.css'
import axios from 'axios';
import * as util from '../util/util';
import CheckIcon from '@mui/icons-material/Check';

import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBox from './CheckBox';
import { Link } from 'react-router-dom'
import { NotificationsNone } from '@mui/icons-material';

import { useCookies } from 'react-cookie';
import * as glob from '../global'

/**
 * Component Tag
 * @param {*} props Hot Q&A에 있는 게시물의 tag값
 * @returns tag 값에 해당하는 tag 명을 반환
 */
function Tag(props){
    let tcolor = '';
    let tag = '';
    const style = {
        color : {tcolor},
        borderColor: {tcolor}
    }
    if(props.tag === 0){
        tag ='';
        style.color = '#FFFFFF'
    }else if(props.tag===1){
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
    // 태그 큰거 작은거 디자인 다르게해야할거같아서 classname도 props로 넣어줌
    return (<div className={props.classname} style = {style}>              
        {tag}
    </div>)                                     
}
/**
 * Component Comment
 * @param {*} props Comment, Comment쓴애 프로필 정보 
 * @returns 댓글 달린거
 */
function Comment(props){
    if(props.comment === 'does not exist'){
        return (
            <div className='qna-no-comment'>
                댓글이 없어요 빨리 써줘요.
            </div>
        )
    }else{
        return (
            <div className='qna-comment' >
                <div className='qna-comment-profile' style ={{background : util.hexcolor(props.commentProfileColor)}}>
                    <img className ='qna-comment-profile-image' alt ='1' src ={util.image_route(props.commentProfileCharacter)}></img>
                </div>
                {props.comment}
            </div>
        )
    }
}
/**
 * Component CenterQnaBox
 * @param props -> Q&A Box 관련 정보 
 * @returns 슬라이드에 있는 Q&A box
 */
function CenterQnaBox(props){
    // console.log(props.content);
    const [qcomment, setqComment] =useState();
    const [cookies, , ] = useCookies(['access_token']);
    const createComment = () =>{
        if(qcomment.length === 0){
            alert('댓글을 입력하세요.')
        }else if(cookies.access_token){
            axios.post(`${glob.BACK_BASE_URL}/hackchildren/${props.content.id}/comment/create`,{
                token: cookies.access_token,
                text: qcomment
              }).then((res) => {
                //console.log(res)
                document.location.reload()
                // setqComment('');
              }).catch(err => {
                alert("오류 발생")
              });
        }else{
            alert("로그인 후 이용 바랍니다.");
        }
        
    }
    const onChangeComment = (event) => {
        const {
          target: { value,}
        } = event;
        setqComment(value);
        
    }
    
    
    const boxstyle = {transform:`scale(${props.boxScale})`}
    return (
        <div className={props.class} style ={boxstyle}>
            <div className ='hackchild-qna-box-head'>
                <span className ='hackchild-qna-box-head-text'>지금 뜨는 질문</span>
                <div className='circle1'> </div>
                <div className='circle2'> </div>
                <div className='circle3'> </div>
            </div>
            
            <div className='hackchild-qna-box-body'>
            <Link to ={'/hackChild/'+props.content.id}>
                <div className='hackchild-qna-box-title'>{props.content.title}
                </div>

            </Link>
                <Tag tag = {props.content.tag} classname="qna-tag"></Tag>
                <div className='hackchild-qna-box-content'>
                    {props.content.body}
                </div>
            </div>
            
            <div className='hackchild-qna-box-answer1'>
                <Comment 
                comment = {props.content.comment} commentProfileCharacter ={props.content.comment_user_picture_id}
                commentProfileColor ={props.content.comment_user_color_id}
                ></Comment>
            </div>
            <div className='hackchild-qna-box-answer2'>
                <textarea className='hackchild-qna-box-answer-input' rows='1' cols='40' placehoder ='(닉네임)님, 해킹이 처음인 핵린이를 위해 답변을 달아주세요.'
                
                    onChange ={(e)=>{ onChangeComment(e)}}
                ></textarea>
            </div>
            <div className='hackchild-qna-box-answer-button' onClick={()=>{
                createComment();
            }}>답변 달기</div>
            
        </div>
    )
}

/**
 * Component FilterBox
 * @returns 
 */
function FilterBox(){

    // filtering 번호 관련
    const articleCheck = [1,2,3,4];
    const [isCheck1, setIsCheck1] = useState(0);
    const [isCheck2, setIsCheck2] = useState(0);
    const [isCheck3, setIsCheck3] = useState(0);
    const [isCheck4, setIsCheck4] = useState(0);

    //디자인 관련(hover, checked, unchecked)
    const [isHover1, setIsHover1] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isHover4, setIsHover4] = useState(false);

    let checkColor1 = isHover1 ? '#4285F4':'#FFFFFF';
    let checkColor2 = isHover2 ? '#4285F4':'#FFFFFF';
    let checkColor3 = isHover3 ? '#4285F4':'#FFFFFF';
    let checkColor4 = isHover4 ? '#4285F4':'#FFFFFF';

    let borderColor1 = isHover1 ? '#4285F4':'#FFFFFF';
    let borderColor2 = isHover2 ? '#4285F4':'#FFFFFF';
    let borderColor3 = isHover3 ? '#4285F4':'#FFFFFF';
    let borderColor4 = isHover4 ? '#4285F4':'#FFFFFF';
    
    let backgroundColor1 = isHover1 ? '#FFFFFF':'#4285F4';
    let backgroundColor2 = isHover2 ? '#FFFFFF':'#4285F4';
    let backgroundColor3 = isHover3 ? '#FFFFFF':'#4285F4';
    let backgroundColor4 = isHover4 ? '#FFFFFF':'#4285F4';

    backgroundColor1 = isCheck1 ? '#4285F4':'#FFFFFF';
    backgroundColor2 = isCheck2 ? '#4285F4':'#FFFFFF';
    backgroundColor3 = isCheck3 ? '#4285F4':'#FFFFFF';
    backgroundColor4 = isCheck4 ? '#4285F4':'#FFFFFF';
    
    if(isCheck1){
        backgroundColor1 = '#4285F4';
        borderColor1 = '#4285F4';
    }
    if(isCheck2){
        backgroundColor2 = '#4285F4';
        borderColor2 = '#4285F4';
    }
    if(isCheck3){
        backgroundColor3 = '#4285F4';
        borderColor3 = '#4285F4';
    }
    if(isCheck4){
        backgroundColor4 = '#4285F4';
        borderColor4 = '#4285F4';
    }
   
    let newfilter =[];
    // filter callback 함수
    const isCheck = (element) => {
        if(element === isCheck1){
            return true;
        }else if(element === isCheck2){
            return true;
        }else if(element === isCheck3){
            return true;
        }else if(element === isCheck4){
            return true;
        }
    }
    // Q&A 받아오기
    const [QnaArray, setArticle] = useState([]);
    const [checkedArray,SetChecked] = useState([]);
    const baseurl= 'http://127.0.0.1:8000';
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        newfilter = articleCheck.filter(isCheck);
        axios.post(`${baseurl}/hackchildren/qna`, {
                tags : newfilter
            }).then(async (res) => {
                // console.log(res.data);
                setArticle(res.data);
                SetChecked(newfilter);
            })
    },[isCheck1,isCheck2,isCheck3,isCheck4])
    // console.log(newfilter.length)
    
    return (
        <div>
            <div className='filter-box'>
                  <div className='qna-filter'>
                      <img alt ='1' src="/img/boho/majorboho.png" className="qna-findBoho"/>
                      <div className='qna-filter-text'>
                          <strong>이용하려는 태그를 설정하세요.</strong>
                          <div className='qna-filter-text2'>
                              분야별 태그를 활용해, 원하는 정보를 손쉽게 찾아가세요.
                          </div>
                          <div className='qna-filter-checkboxs'>
                            <div className='qna-filter-checkbox' 
                                style = {{background : backgroundColor1, color:borderColor1}}
                                onMouseEnter={()=>{
                                    setIsHover1(true);
                                }}
                                onMouseLeave={()=>{
                                    setIsHover1(false);
                                }}
                                onClick={()=>{
                                    if(isCheck1 === 1){
                                        setIsCheck1(0);
                                        borderColor1 = '#4285F4'
                                    }else{
                                        setIsCheck1(1); 
                                    }
                            }}>
                                <CheckIcon sx={{width:20, height:20, color :checkColor1}}></CheckIcon>
                            </div>
                                <div className='qna-filter-name'>
                                    시스템 해킹
                                </div>
                            <div className='qna-filter-checkbox' 
                                style = {{background : backgroundColor2, color:borderColor2}}
                                onMouseEnter={()=>{
                                    setIsHover2(true);
                                }}
                                onMouseLeave={()=>{
                                    setIsHover2(false);
                                }}
                                onClick={()=>{
                                if(isCheck2 === 2){
                                    setIsCheck2(0);
                                }else{
                                    setIsCheck2(2);
                                }
                                }}>
                                <CheckIcon sx={{width:20, height:20, color :checkColor2}}></CheckIcon>
                            </div>
                                <div className='qna-filter-name'>
                                    웹 해킹
                                </div>
                            <div className='qna-filter-checkbox' 
                                style = {{background : backgroundColor3, color:borderColor3}}
                                onMouseEnter={()=>{
                                    setIsHover3(true);
                                }}
                                onMouseLeave={()=>{
                                    setIsHover3(false);
                                }}
                                onClick={()=>{
                                if(isCheck3 === 3){
                                    setIsCheck3(0);
                                }else{
                                    setIsCheck3(3);
                                }
                            }}>
                                <CheckIcon sx={{width:20, height:20, color :checkColor3}}></CheckIcon>
                            </div>
                            <div className='qna-filter-name'>
                                    리버싱
                                </div>
                            <div className='qna-filter-checkbox' 
                                style = {{background : backgroundColor4, color:borderColor4}}
                                onMouseEnter={()=>{
                                    setIsHover4(true);  
                                }}
                                onMouseLeave={()=>{
                                    setIsHover4(false);
                                }}
                                onClick={()=>{
                                if(isCheck4 === 4){
                                    setIsCheck4(0);
                                }else{
                                    setIsCheck4(4);
                                }
                            }}>
                                <CheckIcon sx={{width:20, height:20, color :checkColor4}}></CheckIcon>
                            </div>
                                <div className='qna-filter-name'>
                                    기타
                                </div>

                          </div>
                      </div>
                  </div>
                <div className='qna-article-box'>
            {checkedArray.length>0 && QnaArray.length === 0 ? 
            <div id="hackchild-no-filter">
                <img id ='interest-boho'alt='interestboho' src ='/img/boho/interest_boho.png'>
                </img>
                <div id ='not-find'>
                    <strong>
                        앗! 찾으시려는 태그의 글이 존재하지 않아요.
                    </strong>
                    <div>
                        다른 태그를 이용해서 글을 찾아보세요.
                    </div>
                </div>
                
            </div> : <></>}
            {QnaArray && QnaArray.map(article =>{
                
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
                            <Tag tag = {article.tag} classname="hackchild-tag"></Tag>
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
        })}           
        
                    
                </div>
            </div>
            
        </div>
        
    )
}


/**
 * Component Qna
 * @returns qna 게시판임.
 */
function Qna() {
    // https://ye-yo.github.io/react/2022/01/21/infinite-carousel.html 시발 이거보고 하자
    const [cookies, , ] = useCookies(['access_token']);
    const [hotqna, setHotQna] = useState();
    let newHotqna;
    const baseurl= 'http://127.0.0.1:8000'
    //hotqna 받아오는 axios
    useEffect(() => {
        axios.get(`${baseurl}/hackchildren/hotqna`).then(async (res) => {
            // console.log('qna',res.data);
            setHotQna(res.data);
        })

    },[])


    //contain객체 -> className :qna-container인 div DOM
    const contain = useRef();

    const [currentIndex, setCurrentIndex] = useState(0); //현재 가운데꺼 인덱스
    const [beforeIndex, setBeforeIndex] = useState(1); //이전에 눌렀던 인덱스

    const [transit, setTransition] = useState('0.5s ease-in-out')
    // box크기를 배열로 조절하는디.. 가운데 있는 애를 1.2배 크게 만들었는데, 이거말고 다른 방법이 생각이 안나요..
    const [boxscale, setBoxccale] = useState([1,1,1.1,1,1,1,1,1])
    
    let newboxscale =[...boxscale];
    //빈 qna 정보, hotqna 게시물 없으면 이거로 채우기
    let emptyQna = {
        body :"게시물이 없어요",
        comment : 'does not exist',
        id : 0,
        tag :0,
        title :"게시물이 없어요"
    }
    /**
     * function changeSlide
     * @param {*} num에 해당하는 값으로 index를 고침
     */
    const changeSlide = (num) =>{
        setTransition('');
        setTimeout(() => {
            if(num === 4){
                setBeforeIndex(-1);
                setCurrentIndex(4);
            }else if(num === 0){
                setBeforeIndex(5);
                setCurrentIndex(0);
            }
        }, 10)
    }
    // lonclick, ronclick 함수 -> 슬라이드 움직일 때
    const lonclick = () =>{
        setBeforeIndex(currentIndex);
        setTransition('0.5s ease-in-out');
        setCurrentIndex(currentIndex-1);
        boxscale[currentIndex+2] = 1.2;
    }
    const ronclick = () =>{
        setBeforeIndex(currentIndex);
        setTransition('0.5s ease-in-out');
        setCurrentIndex(currentIndex+1);
    }
    
    // currentIndex가 바뀔 때, 슬라이드를 움직이게 하기
    useEffect(() => {
        setTimeout(() => {
            if(currentIndex-1 === -2){//-1일때
                changeSlide(4);
            }else if(currentIndex+1 === 6){//5일때
                changeSlide(0);
            }
        }, 400)
        newboxscale[currentIndex+2] = 1.2;
        newboxscale[beforeIndex+2] = 1;
        setBoxccale(newboxscale);

    },[currentIndex])

    // qna css for 무한 슬라이드
    const style ={transition : transit, transform :`matrix(1,0,0,1,${-705*currentIndex - 593 -703},0)`};
    // console.log(hotqna);
    if(hotqna){
        let len = hotqna.length;
        if(len === 0){
            hotqna.push(emptyQna);
            hotqna.push(emptyQna);
            len =2;
        }else if(len === 1){
            hotqna.push(emptyQna);
            len ++;
        }
        // hotqna 게시물이 5개보다 적을 때 -> 지금까지 온 애들로 5개를 채우기
            return (
                <div>
                {/* 무한 슬라이드인데 구현을 좀 억지로함 나중에 제대로 공부하고 해야할 듯 */}
                  <div className ='hackchild-qna'>
                      <div className ='cloudleft' onClick={lonclick} ></div>
                      <div className ='cloudright' onClick={ronclick}></div>
                      <div ref={contain} style = {style} className='qna-container'>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[0]} content = {hotqna[3%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[1]} content = {hotqna[4%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[2]} content = {hotqna[0%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[3]} content = {hotqna[1%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[4]} content = {hotqna[2%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[5]} content = {hotqna[3%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[6]} content = {hotqna[4%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[7]} content = {hotqna[0%len]}></CenterQnaBox>
                          <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[8]} content = {hotqna[1]}></CenterQnaBox>
                      </div>
                      
                  </div>
                  <FilterBox></FilterBox>
                   
                  
              
                </div>
                  
                  
                )
        

        
    }else{
        return (
            <div>
                지금 뜨는 질문이 없어요 ㅠ
            </div>
        )
    }

  

}

export default Qna