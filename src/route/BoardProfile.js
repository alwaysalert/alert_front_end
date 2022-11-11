import React from 'react'

// css import
import '../css/mainpage.css'
import '../css/freeart.css'
import '../css/mypage.css'

import { Link } from 'react-router-dom';
import "../css/mainpage.css"
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

// Component import
import Login from './Login';

//util.js
import * as util from '../util/util';

function BoardProfile(props) {
    /**
     * button_style
     * util에 있는 hexcolor를 이용해서 쓴다.
     */
    const button_style={
      background : util.hexcolor(props.uInfo.profile_color_id)
    }

    //box css
    const box ={
        width: '8.18rem',
        height: '0.6rem',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#FFFFFF'),
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : '#000000',
        p: 1,
        m: 0.3,
        borderRadius: 0.2,
        textAlign: 'center',
        lineHeight:'15px',
        fontSize: '0.85rem',
        fontWeight: '700',
        fontFamily: 'apple-font-EB'
      
    }

  return (
    <>
    {/* 로그인 됐는지에 따라 다르게 */}
        {props.isLoggedIn ? (
        <div className="freeart-content-profile">
            <div className="freeart-content-profile-name"><strong>{props.uInfo.nickname}</strong></div>
            <div className="freeart-content-profile-nim">님</div>
            
            <div className ='profile2' style ={button_style}>
                <img 
                    alt='profile3'
                    className = 'profile3'
                    src={util.image_route(props.uInfo.profile_picture_id)}
                />
            </div>
                
            <div className="freeart-activity"><strong>{props.board}에서 {props.uInfo.nickname}님의 활동</strong></div>
            <Grid container>
            <Link to ={`/MyActivity`} state = {{ id : 1}}>
                <Box sx={box}>작성한 글</Box>
            </Link>
            <Link to ={`/MyActivity`} state = {{ id : 4}}>
              <Box sx={box}>댓글</Box></Link>
          <Link to ={`/MyActivity`} state = {{ id : 3}}>
            <Box sx={box}>좋아욧</Box>
          </Link>
          <Link to ={`/MyActivity`} state = {{ id : 2}}>
            <Box sx={box}>스크랩한 글</Box>
          </Link>
        
            </Grid>
            </div>
            
             
        
  ) :( <div className="freeart-content-profile">
    <Login ></Login>
  </div>) }
    </>
    
    
        
  )
}

export default BoardProfile

