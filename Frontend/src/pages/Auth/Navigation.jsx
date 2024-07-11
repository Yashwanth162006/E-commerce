import React, { useContext } from 'react'
import './Navigation.css'
import {NavLink,useNavigate} from 'react-router-dom'
import { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'


const Navigation = () => {
  
  const {cartItems,favouriteItems,isLogedIn,setIsLogedIn,userName,isAdmin} = useContext(ShopContext);
  const navigate = useNavigate();
  function length(arr){
    let sum = 0;
    for(let i=0;i<arr.length;i++){
      sum=sum+arr[i].qty;
    }
    return sum;
  }
  function length1(arr){
    let sum = 0;
    for(let i=0;i<arr.length;i++){
      if(arr[i].fav) sum = sum+1
    }
    return sum;
  }
  function handleLogout(){
    setIsLogedIn(0)
    toast("Successfully Loged Out");
    navigate('/login');
  }
  return (
    <div className="main-div">
      <nav className='menu-bar'>
          <div className='top'>
            <div className='menu-items'>
              <NavLink to='/' className="nav-links">
                <i class="fa-solid fa-house"></i>
                <span>- Home</span>
              </NavLink>
            </div>
            <div className='menu-items'>
              <NavLink to='/shop'className="nav-links">
                <i class="fa-solid fa-bag-shopping"></i>
                <span>- Shop</span>
              </NavLink>
            </div>
            <div className='menu-items'>
              {length(cartItems)===0?null:<div className='nav-cart-count'>{length(cartItems)}</div>}
              <NavLink to='/cart'className="nav-links">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>- Cart</span>
              </NavLink>
            </div>
            <div className='menu-items'>
              {length1(favouriteItems)===0?null:<div className='nav-like-count'>{length1(favouriteItems)}</div>}
              <NavLink to='favorites'className="nav-links">
                <i class="fa-solid fa-heart"></i>
                <span>- Liked</span>              
              </NavLink>
            </div>
          </div>
          <div className='bottom'>
          {
              isLogedIn&&isAdmin?<div className='logout-profile'>
              <NavLink to='/admin'><button className='profile-button'>Admin</button></NavLink>
              </div>:null
            }
            {isLogedIn?<div className='logout-profile'>
              <button onClick={handleLogout} className='logout-button'>Logout</button>
              <NavLink to='/profile'><button className='profile-button'>Profile</button></NavLink>
              </div>:<div className='menu-items'>
              <NavLink to='/login'className="nav-links">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                <span>- Login</span>
              </NavLink>
            </div>}
            <div className='menu-items'>
              {isLogedIn?<NavLink to='/profile' className="nav-links">
                <i class="fa-solid fa-user"></i>
                <span>{userName}</span>
                </NavLink>:<NavLink to='/register'className="nav-links">
                <i class="fa-solid fa-user-plus"></i>
                <span>- Register</span>
              </NavLink>}
            </div>
          </div>
      </nav>
    </div>
  )
}

export default Navigation
