import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginImg from "../../Images/Login.png"
import { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [form,setForm] = useState({})
  const {setUserName} = useContext(ShopContext);
  const {setIsLogedIn,setLoginToken,isAdmin,setIsAdmin} = useContext(ShopContext)
  const navigate = useNavigate();
  function handleForm(event){
    setForm({...form,
      [event.target.name]: event.target.value
    })
  }
  async function handleSubmit(event){
    event.preventDefault()
    const response = await fetch('https://e-com-backend-4zqj.onrender.com/api/v1/users/login',{
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    const token = dataObj.token
    toast(dataObj.message)
    if(token){
      setLoginToken(token)
      setIsLogedIn(1)
      setUserName(dataObj.userName)
      setIsAdmin(false)
      if(dataObj.role === "admin"){
        console.log('hello')
        setIsAdmin(true)
      }
      navigate('/')
    }
  }
  async function sendMail(event){
    const response = await fetch('https://e-com-backend-4zqj.onrender.com/api/v1/users/forgotPassword',{
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    if(dataObj.status === 'success'){
      toast(dataObj.message)
      navigate('/resetPassword')
    }
    if(dataObj.status === 'fail'){
      toast(dataObj.message)
    }
    console.log(dataObj)
  }
  return (
    <div className='login-container'>
      <div className='login-form'>
        <form className='login-content' onChange={handleForm} onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="text-input-bar">
            <label>Email Address</label>
            <input type='email' placeholder='Enter email' name='email' required></input>
          </div>
          <div className="text-input-bar">
            <label>Password</label>
            <input type='password' placeholder='Enter password' name='password' required></input>
          </div>
          <button>Sign In</button>
          <p>New customer?<NavLink className="reg" to='/register'>Register</NavLink></p>
          <p><NavLink className="reg" onClick={sendMail}>Forgot Password</NavLink></p>
        </form>
        <div className='login-img'>
          <img src= {LoginImg}/>
        </div>
      </div>
    </div>
  )
}

export default Login
