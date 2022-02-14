import React,{useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { currentUserActions } from '../store';

const LoginForm = ({loginUser}) => {

  const users = useSelector(state=>state.users);
  const dispatch = useDispatch();

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler =(e)=>{
      e.preventDefault();
      const username = usernameInputRef.current.value;
      const password = passwordInputRef.current.value;

     const currentUser =  users.find(user =>{
      return  user.username === username && user.password ===password
      })

      if(username.trim().length == 0 || password.trim().length ==0 ){
        return toast.warning("Fields can't be empty")
      }


      if(currentUser){
        localStorage.setItem('currentUser',JSON.stringify(currentUser))
        dispatch(currentUserActions.setCurrentUser(currentUser));
        loginUser();
      } 
      else{
        return toast.error("No user Found")
      }
     
  }

  return (
    <section className='form-section'>
        <div className='formBx'>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder='Username' ref={usernameInputRef}/>
                <input type="password" placeholder='Password' ref={passwordInputRef}/>
                <button className='btn' type='submit' >Login</button>
            </form>
        </div>
    </section>
  )
}

export default LoginForm