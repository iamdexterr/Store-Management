import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = ({onSectionChange}) => {
    const currentUser = useSelector(state=> state.currentUser);

    return (
        <nav className='navbar'>
            <ul>
                {currentUser.role==='admin' &&  
                <>             
                <li className='active' onClick={(event) => { onSectionChange(event, 'inventory') }}>Inventory</li>
                <li onClick={(event) => { onSectionChange(event, 'sales') }}>Sales Executives</li>
                </>                 
                }
                       
                <li className={currentUser.role=='sales' ? 'active': ""} onClick={(event) => { onSectionChange(event, 'createOrder') }}>Create Order</li>
                <li onClick={(event) => { onSectionChange(event, 'orders') }}>Orders</li>
                
            </ul>
        </nav>
    )
}

export default Navbar