import "./App.css";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import { ToastContainer } from "react-toastify";
import {useDispatch} from 'react-redux'
import { currentUserActions } from "./store";
import { medicineActions } from "./store/medicineSlice";
import { userActions } from './store/userSlice';
import { orderActions } from "./store/orderSlice";



function App() {

  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    
    
    
    const currentUser= JSON.parse(localStorage.getItem("currentUser"));
    if(currentUser){
      dispatch(currentUserActions.setCurrentUser(currentUser));
      setIsLogin(true);
    }



    const meds = JSON.parse(localStorage.getItem('medicines'));
    const localUsers = JSON.parse(localStorage.getItem('users'));
    const localOrders = JSON.parse(localStorage.getItem('orders'));

   

    if(meds){
      dispatch(medicineActions.setLocalMeds(meds));
    }

    if(localUsers){
    
      dispatch(userActions.setLocalUsers(localUsers));
    }

    if(localOrders){
    
      dispatch(orderActions.setLocalOrders(localOrders));
    }
  },[])





  const loginUserHandler = () => {
    setIsLogin(true);
  };

  const logoutUserHandler = () => {
    setIsLogin(false);
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "16px" }}/>
      <Header isLogin={isLogin} logoutUser={logoutUserHandler} />
      {!isLogin && <LoginForm loginUser={loginUserHandler} />}
      {isLogin && <AdminPanel />}
    </>
  );
}

export default App;
