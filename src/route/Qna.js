import React from 'react'
import '../css/hackchild.css'

function Qna() {


    
  return (
    <div className='hackchild-qna-box'>
        <div className ='hackchild-qna-box-head'>
            <span className ='hackchild-qna-box-head-text'>지금 뜨는 질문</span>
            <div className='circle1'> </div>
            <div className='circle2'> </div>
            <div className='circle3'> </div>
        </div>
        <div className ='hackchild-qna-box-title'>
            <strong>정보보호학과 공부순서 어떻게 해야할까요?</strong><span>(tag)</span>
            <div className ='hackchild-qna-box-content'>
            정보보호학과 공부순서 어떻게 해야 할까요? 제 학과가 정보보호학과인데… 솔직히 대학교만 다니고 이런공부를 안하다가    시작할려고하는데요 ㅠㅠ 그래서 시작한게 웹해킹쪽이나 네트워크 보안...
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

export default Qna