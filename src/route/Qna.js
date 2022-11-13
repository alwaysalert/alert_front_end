import { height } from '@mui/system';
import React, { useState, useRef, useEffect } from 'react'
import '../css/hackchild.css'
import axios from 'axios';
import * as util from '../util/util';

import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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

    return (<div className='qna-tag' style = {style}>
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
                <div className='hackchild-qna-box-title'>{props.content.title}
                </div>
                <Tag tag = {props.content.tag}></Tag>
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
                <textarea className='hackchild-qna-box-answer-input' rows='1' cols='40' placehoder ='(닉네임)님, 해킹이 처음인 핵린이를 위해 답변을 달아주세요.' ></textarea>
            </div>
            <div className='hackchild-qna-box-answer-button'>답변 달기</div>
            
        </div>
    )
}

/**
 * Component FilterBox
 * @returns 
 */
function FilterBox(){

    

    return (
        <div className='filter-box'>
                  <div className='qna-filter'>
                      <img alt ='1' src="/img/boho/majorboho.png" className="qna-findBoho"/>
                      <div className='qna-filter-text'>
                          <strong>이용하려는 태그를 설정하세요.</strong>
                          <div className='qna-filter-text2'>
                              분야별 태그를 활용해, 원하는 정보를 손쉽게 찾아가세요.
                          </div>
                          <div className='qna-filter-checkboxs'>
                          <div className='qna-filter-checkbox'></div>
                            <div className='qna-filter-name'>
                                시스템 해킹
                            </div>
                            <div className='qna-filter-checkbox'></div>
                            <div className='qna-filter-name'>
                                웹 해킹
                            </div>
                            <div className='qna-filter-checkbox'></div>
                            <div className='qna-filter-name'>
                                리버싱
                            </div>
                            <div className='qna-filter-checkbox'></div>
                            <div className='qna-filter-name'>
                                기타
                            </div>

                          </div>
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
    
    const [hotqna, setHotQna] = useState();
    
    const baseurl= 'http://127.0.0.1:8000'
    useEffect(() => {
        axios.get(`${baseurl}/hackchildren/hotqna`).then(async (res) => {
            console.log('qna',res.data);
            setHotQna(res.data);
        })
    },[])


    //contain객체 -> className :qna-container인 div DOM
    const contain = useRef();

    const [currentIndex, setCurrentIndex] = useState(0); //현재 가운데꺼 인덱스
    const [beforeIndex, setBeforeIndex] = useState(1); //이전에 눌렀던 인덱스

    const [transit, setTransition] = useState('0.5s ease-in-out')
    // box크기를 배열로 조절하는디.. 가운데 있는 애를 1.2배 크게 만들었는데, 이거말고 다른 방법이 생각이 안나요..
    const [boxscale, setBoxccale] = useState([1,1,1.2,1,1,1,1,1])
    
    let newboxscale =[...boxscale];
    
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

    if(hotqna){
        return (
            <div>
            {/* 무한 슬라이드인데 구현을 좀 억지로함 나중에 제대로 공부하고 해야할 듯 */}
              <div className ='hackchild-qna'>
                  <div className ='cloudleft' onClick={lonclick} ></div>
                  <div className ='cloudright' onClick={ronclick}></div>
                  <div ref={contain} style = {style} className='qna-container'>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[0]} content = {hotqna[3]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[1]} content = {hotqna[4]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[2]} content = {hotqna[0]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[3]} content = {hotqna[1]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[4]} content = {hotqna[2]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[5]} content = {hotqna[3]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[6]} content = {hotqna[4]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[7]} content = {hotqna[0]}></CenterQnaBox>
                      <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[8]} content = {hotqna[1]}></CenterQnaBox>
                  </div>
                  
              </div>
              <FilterBox></FilterBox>
               
              
          
            </div>
              
              
            )
    }else{
        return (
            <div>
                gg
            </div>
        )
    }

  

}

export default Qna