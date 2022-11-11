import { height } from '@mui/system';
import React, { useState, useRef, useEffect } from 'react'
import '../css/hackchild.css'


function QnaBox(props){



    return (
        <div className={props.class} style ={{height:'350px', top:'100px'}} >
            <div className ='hackchild-qna-box-head'>
                <span className ='hackchild-qna-box-head-text'>지금 뜨는 질문</span>
                <div className='circle1'> </div>
                <div className='circle2'> </div>
                <div className='circle3'> </div>
            </div>
            <div className ='hackchild-qna-box-title' style ={{fontSize:'20px', top:'80px'}} >
                <strong>정보보호학과 공부순서 어떻게 해야할까요?</strong><span>(tag)</span>
                <div className ='hackchild-qna-box-content' style ={{fontSize:'16px', top:'80px'}}>
                {props.content}
                </div>
            </div>
            <div className='hackchild-qna-box-answer1' style ={{top:'220px'}}>
                (프사) (댓글 내용)
            </div>
            <div className='hackchild-qna-box-answer2' style ={{top:'270px'}}>
                <textarea className='hackchild-qna-box-answer-input' rows='1' cols='40' placehoder ='(닉네임)님, 해킹이 처음인 핵린이를 위해 답변을 달아주세요.' ></textarea>
            </div>
            <div className='hackchild-qna-box-answer-button' style ={{top:'270px'}}>답변 달기</div>
            
        </div>
    )
}
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
            <div className ='hackchild-qna-box-title'>
                <strong>정보보호학과 공부순서 어떻게 해야할까요?</strong><span>(tag)</span>
                <div className ='hackchild-qna-box-content'>
                {props.content}
                </div>
            </div>
            <div className='hackchild-qna-box-answer1'>
                (프사) (댓글 내용)
            </div>
            <div className='hackchild-qna-box-answer2'>
                <textarea className='hackchild-qna-box-answer-input' rows='1' cols='40' placehoder ='(닉네임)님, 해킹이 처음인 핵린이를 위해 답변을 달아주세요.' ></textarea>
            </div>
            <div className='hackchild-qna-box-answer-button'>답변 달기</div>
            
        </div>
    )
}



function Qna() {
    // https://ye-yo.github.io/react/2022/01/21/infinite-carousel.html 시발 이거보고 하자

    // q&a 받아와서 array에 저장
    const QNA = [0,1,2,3,4,5,6,7,8,9];//일단 이게 article이라고 생각
    const [whatnum, setWhatNum] = useState(2);//가운데 박스 번호, 0, 1, 2, 3, 4
    // const style = [{display :'none',left:'-1000px',height:'350px', top:'100px'},{left:'-500px',height:'350px', top:'100px'},{left:'144px'},{left:'844px',height:'350px', top:'100px'},{display :'none',left :'900px',height:'350px', top:'100px'}];

    //contain객체 -> className :qna-container인 div DOM
    const contain = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [beforeIndex, setBeforeIndex] = useState(1);

    const [transit, setTransition] =useState('0.5s ease-in-out')
    const [boxscale, setBoxccale] = useState([1,1,1.2,1,1,1,1,1])
    
    let newboxscale =[...boxscale];
    console.log(newboxscale);
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

    


  return (
  <div>
    {/* <button onClick={lonclick}>왼</button>
    <button onClick={ronclick}>오</button> */}
    
    {/* <div>current : {currentIndex}</div>
    <div>before : {beforeIndex}</div> */}
    <div className ='hackchild-qna'>
        <div className ='cloudleft' onClick={lonclick} ></div>
        <div className ='cloudright' onClick={ronclick}></div>
        <div ref={contain} style = {style} className='qna-container'>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[0]} content = {QNA[3]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[1]} content = {QNA[4]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[2]} content = {QNA[0]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[3]} content = {QNA[1]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[4]} content = {QNA[2]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[5]} content = {QNA[3]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[6]} content = {QNA[4]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[7]} content = {QNA[0]}></CenterQnaBox>
            <CenterQnaBox class = 'hackchild-qna-box2' boxScale = {boxscale[8]} content = {QNA[1]}></CenterQnaBox>
        </div>
        
    </div>
    <div className='filter-box'>
        <div className='qna-filter'>
            <img alt ='1' src="/img/boho/majorboho.png" className="qna-findBoho"/>
            <div className='qna-filter-text'>
                <strong>이용하려는 태그를 설정하세요.</strong>
                <div className='qna-filter-text2'>
                    분야별 태그를 활용해, 원하는 정보를 손쉽게 찾아가세요.
                </div>
            </div>
        </div>
    </div>
     
    

  </div>
    
    
  )

}

export default Qna