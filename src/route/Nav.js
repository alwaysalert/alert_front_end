import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "../css/mainpage.css"
import { Link } from 'react-router-dom';

function Nav(props) {
    
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      const movePage = (link) => {

        document.location.replace(link)
 
    }
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          
        >
          <List>
            {[{name:'자유게시판',link:'/freeart'}, {name:'취업게시판',link:'/Error'}, {name:'핵린이 게시판',link:'/HackChild'}, {name:'우리 학과는',link:'/Error'},{name:'캘린더',link:'/Error'},{name:'지금 모집중인 대외활동',link:'/Error'}].map((text, index) => (
              <ListItem key={text.name} sx={{fontFamily:'apple-font-B'}} disablePadding>
                 
                    <ListItemButton onClick={() => {movePage(text.link)}}>
                  
                        <ListItemText primaryTypographyProps={{ style: {fontFamily:'apple-font-B',fontWeight:'bold'} }} primary={text.name} />
                    
                    </ListItemButton>
                
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[{name:'마이페이지',link:'/Mypage'}, {name:'고객센터',link:'/Error'}, {name:'shop',link:'/Error'}].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => {movePage(text.link)}}>

                    <ListItemText primaryTypographyProps={{ style: {fontFamily:'apple-font-B',fontWeight:'bold'} }} primary={text.name} />
                  
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
  return (
    <div className="navbar">
          <div className="draw">
            {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton onClick={toggleDrawer(anchor, true)}><MenuIcon /></IconButton>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
            ))}
          </div>
          <a href="/"><img src="/img/logo.png" className="logo" alt="main_logo"/></a>
          <div className="searchtool">
          <Link to ={'/Search'}>
            <SearchIcon size="large" />
          </Link>
          </div>
          <div className="notification">
            <NotificationsNoneIcon />
          </div>
        </div>
  )
}

export default Nav