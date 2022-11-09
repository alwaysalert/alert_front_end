import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import "../css/register.css";
import axios from "axios";
function Register(props) {
   
    const baseURL = 'http://127.0.0.1:8000'
    const [isSame, setIsSame] =useState(true);
  const [clickme,setClickme] = useState(false);
  const [nicknameCheck, setnicknameCheck] = useState(false)
  const[nickname, setNickname] = useState("");
    const [button1, setButton1] = useState('outlined');
    const [button2, setButton2] = useState('outlined');
    const [button3, setButton3] = useState('outlined');
    const [button4, setButton4] = useState('outlined');
    const [button5, setButton5] = useState('outlined');
    const [button6, setButton6] = useState('outlined');
    const [jobbb,setjobbb] = useState(6)
    const buttonClick = (event) =>{
        if(event.target.id === 'button1')
        {
        if(button1 === 'contained')
        {
          setButton1('outlined');
          setjobbb(6)
        }
        else
        {
          setButton1('contained');
          setButton2('outlined');
          setButton3('outlined')
          setButton4('outlined')
          setButton5('outlined')
          setButton6('outlined')
          setjobbb(1)
        }
      }
      if(event.target.id === 'button2')
        {
        if(button2 === 'contained')
        {
          setButton2('outlined');
          setjobbb(6)
        }
        else
        {
          setButton1('outlined');
          setButton2('contained');
          setButton3('outlined')
          setButton4('outlined')
          setButton5('outlined')
          setButton6('outlined')
          setjobbb(2)
        }
      }
      if(event.target.id === 'button3')
        {
        if(button3 === 'contained')
        {
          setButton3('outlined');
          setjobbb(6)
        }
        else
        {
          setButton1('outlined');
          setButton2('outlined');
          setButton3('contained')
          setButton4('outlined')
          setButton5('outlined')
          setButton6('outlined')
          setjobbb(3)
        }
      }
      if(event.target.id === 'button4')
        {
        if(button4 === 'contained')
        {
          setButton4('outlined');
          setjobbb(6)
        }
        else
        {
          setButton1('outlined');
          setButton2('outlined');
          setButton3('outlined')
          setButton4('contained')
          setButton5('outlined')
          setButton6('outlined')
          setjobbb(4)
        }
      }
      if(event.target.id === 'button5')
        {
        if(button5 === 'contained')
        {
          setButton5('outlined');
          setjobbb(6)
        }
        else
        {
          setButton1('outlined');
          setButton2('outlined');
          setButton3('outlined')
          setButton4('outlined')
          setButton5('contained')
          setButton6('outlined')
          setjobbb(5)
        }
      }
      if(event.target.id === 'button6')
        {
        if(button6 === 'contained')
        {
          setButton6('outlined');
          setjobbb(6)
        }
        else
        {
          setButton1('outlined');
          setButton2('outlined');
          setButton3('outlined')
          setButton4('outlined')
          setButton5('outlined')
          setButton6('contained')
          setjobbb(6)
        }
      }
      
      }
      
    function AlertSame(props){
    
        const visible = clickme ? 'visible' : 'none'
        if(props.isSame === true){
          return (
            <div style ={{color:'red',display:visible,textAlign:'center' ,marginTop:'3px'}}>사용 불가능한 닉네임입니다.</div>
          )
        }else if(props.isSame === false){
          return (
            <div style = {{color:'blue',display:visible,textAlign: 'center',marginTop:'3px'}}>사용 가능한 닉네임입니다.</div>
          )
        }
        else{
          return(<></>)
        }
    }

    const CheckNickName = (name) => {
        
        
        if(name.length === 0)
        {
         
          setIsSame(true);
        }
        else{
          
        axios.get(`${baseURL}/users/check_nickname`, {
          params: {
            nickname : name
          }
        })
        .then((res) => {
          
          //console.log(res.data);   
          if(res.data.is_existing === true){
            setIsSame(true);
          }else{
            setIsSame(false);
            setnicknameCheck(true);
          }
        })
        .catch(err => {
          document.location="/Error";
        });
        }
      }
    const handleClose = () => {
        const name = document.getElementById("name");
        if(nicknameCheck === true || name.value.length === 0)
        {
        
        axios.post(`${baseURL}/users/register`, {
          token: props.token,
          nickname:name.value,
          user_job: jobbb,
        })
        .then((res) => console.log('post =',res))
        .catch(err => {
          document.location="/Error";
        });
        props.setOpen(false);
        props.setFlag(true);
      }
      else if(nicknameCheck === false)
      {
        alert('닉네임 중복확인을 해주세요')
      }
      
      };
      const onChangeNickname = (event) => {
        const {
          target: { value,}
        } = event;
       
        
          setNickname(value);
          setnicknameCheck(false);
          setIsSame(null);
        
      }
  return (
    <Dialog open={props.open} sx={{minWidth: "1200px"}} onClose={handleClose}>
          <DialogTitle><div style={{fontFamily:'apple-font-EB',fontWeight: 'bold',fontSize: '30px'}}>Alert에 처음 방문하셨나요?</div></DialogTitle>
          <DialogContent>
            
            <div style={{fontFamily:'apple-font-M',fontWeight: '400', fontSize:'13px'}}>보다 나은 사용을 위해 아래와 같은 정보를 입력해주세요<br/>필수로 적어야 하는 정보는 아니니 다음에 입력하셔도 됩니다.</div>
            
            <div className='classnickname'>
              <div className='nickname-title'>닉네임</div><input 
                className = "register-nickname-input"
                id='name'
                name="id" 
                placeholder='사용하실 닉네임을 입력하세요'
                onChange={(event) => {onChangeNickname(event)}}
                value={nickname}
                maxLength="12"
                type='text'
               >
                  
                </input>
                <button className = "register-nickname-button" onClick = {(e) => {
                  e.preventDefault();
                  setClickme(true);
                  CheckNickName(document.getElementById("name").value);
                }} 
                type="submit"><strong className="button-color">중복 확인</strong></button>
                <AlertSame isSame ={isSame} ></AlertSame>
            </div>
            <div className='job'>
            <div className='job-title' >
              신분
            </div>
            <div className='job-content'>
            <div>
            <Stack direction="row" spacing={1.5}>
              <Button variant={button1} id='button1' sx={{minWidth: "110px"}} onClick={(event)=>{buttonClick(event)}}>중고등학생</Button>
              <Button variant={button2} id='button2' sx={{minWidth: "110px"}} onClick={(event)=>{buttonClick(event)}}>대학생</Button>
              <Button variant={button3} id='button3' sx={{minWidth: "110px"}} onClick={(event)=>{buttonClick(event)}}>졸업생</Button>
            </Stack>
            </div>
            <div>
            <Stack direction="row" spacing={1.5}> 
              <Button variant={button4} id='button4' sx={{minWidth: "110px"}} onClick={(event)=>{buttonClick(event)}}>교수님</Button>
              <Button variant={button5} id='button5' sx={{minWidth: "110px"}} onClick={(event)=>{buttonClick(event)}}>현직 종사자</Button>
              <Button variant={button6} id='button6' sx={{minWidth: "110px"}} onClick={(event)=>{buttonClick(event)}}>기타</Button>
            </Stack>
            </div>
            </div>
            </div>
          </DialogContent>
  
          <DialogActions>
            
            <Button onClick={handleClose}>완료</Button>
          </DialogActions>
        </Dialog>
  )
}

export default Register