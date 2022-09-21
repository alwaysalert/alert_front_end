import React from 'react'

import LogOut from './LogOut';
import Login from './Login';

import {useSelector, useDispatch} from 'react-redux';

function Profile(props) {
  const login = useSelector((state)=>state.login);
  return (
    <>
        {props.isLoggedIn ? (
        <div>
            <LogOut ></LogOut>
        </div>
        ) : (
          <div>
            <Login ></Login>
          </div>
        ) }
        </>
  )
}

export default Profile