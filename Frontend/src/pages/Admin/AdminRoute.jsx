import React from 'react'
import {Outlet} from 'react-router-dom'
import './Admin.css'

const AdminRoute = () => {
  return (
    <div className='admin-route-container'>
      <Outlet />
    </div>
  )
}

export default AdminRoute
