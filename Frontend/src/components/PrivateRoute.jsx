import React, { useContext } from 'react'
import { Navigate,Outlet } from 'react-router'
import ProgressSteps from './ProgressSteps'
import { ShopContext } from '../contexts/ShopContext'

const PrivateRoute = () => {
  const {isLogedIn} = useContext(ShopContext);
  return (
    isLogedIn?<div className='place-order-container'>
    <ProgressSteps />
    <Outlet />
</div>: <Navigate to='/login' />
  )
}

export default PrivateRoute
