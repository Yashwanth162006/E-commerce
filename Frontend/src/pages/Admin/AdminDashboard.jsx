import React from 'react'
import { NavLink} from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='admin-panel'>
      <h2>Hello, Welcome To Admin Panel</h2>
      <NavLink to='allproductslist' className='button'>All products</NavLink>
      <NavLink to='userlist' className='button'>Users</NavLink>
      <NavLink to='top-5' className='button'>Top Products</NavLink>
      <NavLink to='addproduct' className='button'>Add Product</NavLink>
      <NavLink to='orderlist' className='button'>Orders</NavLink>
      <NavLink to='categorylist' className='button'>Categories</NavLink>
      <NavLink to='brandList' className='button'>Brands</NavLink>
    </div>
  )
}

export default AdminDashboard
