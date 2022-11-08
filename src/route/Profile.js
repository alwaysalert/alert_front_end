import React from 'react'

import LogOut from './LogOut';
import Login from './Login';


/**
 * Profile Component in mainpage 
 * @param {*} props 
 * @returns 로그인 되었는지에 따라 다름
 */
function Profile(props) {
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