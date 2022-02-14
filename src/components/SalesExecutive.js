import React,{useState,useEffect} from 'react'
import SalesModal from './SalesModal'
import { useSelector,useDispatch } from 'react-redux';
import { userActions } from '../store/userSlice';
import { toast } from 'react-toastify';

const SalesExecutive = () => {
  
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    const users = useSelector(state=>state.users);
    const dispatch = useDispatch();

 

    const toggleModalHandler = () => {
      setShowModal((prevModal) => !prevModal);
    setCurrentUser(null);

    };

    const deleteUserHandler=(id)=>{
        dispatch(userActions.deleteUser(id));
        toast.info('User Deleted Successfully')
      }

    return (
   <>
   {showModal && <SalesModal onToggle={toggleModalHandler} user={currentUser}/>}

    <section className='inventory'>
        <h1>Sales Executive</h1>
        <button className='btn' onClick={toggleModalHandler}>Add Sales Executive</button>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                    <th>Gender</th>
                    <th>Experience(in Years)</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user=> {
                    if(user.role==='sales'){
                    return (
                        <tr key={user.id}>
                        <td>{user.fName}</td>
                        <td>{user.lName}</td>
                        <td>{user.dob}</td>
                        <td>{user.gender}</td>
                        <td>{user.experience}</td>
                        <td>
                           <button className="btn2 primary" onClick={()=>{toggleModalHandler(); setCurrentUser(user)}}>Edit</button>
                            <button className='btn2 danger'  onClick={()=>deleteUserHandler(user.id)}>Delete</button>
                        </td>
                    </tr>
                       
                    )
                    }
                }
                )}
             
        
            </tbody>
        </table>
    </section>
    </>
  )
}

export default SalesExecutive