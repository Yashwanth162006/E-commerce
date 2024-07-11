import React from 'react'
import { NavLink} from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='admin-panel'>
      <h2>Hello, Welcome To Admin Panel</h2>
      <NavLink to='allproductslist' className='button'>All products</NavLink>
      <NavLink to='userlist' className='button'>Users</NavLink>
      <NavLink to='product/update/:_id' className='button'>Product Update</NavLink>
      <NavLink to='orderlist' className='button'>Orders</NavLink>
      <NavLink to='categorylist' className='button'>Categories</NavLink>
    </div>
  )
}

export default AdminDashboard
