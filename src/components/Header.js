import React from 'react';
import { GiHospitalCross } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { currentUserActions } from '../store';

const Header = ({isLogin,logoutUser}) => {

  const dispatch = useDispatch();
  const logoutHandler = ()=>{
    dispatch(currentUserActions.removeCurrentUser());
    localStorage.removeItem('currentUser')
    logoutUser();
  }

  return (<>
    <header className='header'>
        <div className="logo">
              <GiHospitalCross/>
        </div>
        {isLogin && <button className='btn' onClick={logoutHandler}>Logout</button>}
    </header>

    </>
  )
}

export default Header;
