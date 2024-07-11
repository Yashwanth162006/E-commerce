import React, { useContext, useState } from 'react'
import Input from '../../components/Inputbar'
import {NavLink, useNavigate} from 'react-router-dom'
import RegisterImg from '../../Images/Register.png'
import { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'

const Register = () => {
  const [form,setForm] = useState({})
  const {setIsLogedIn,setLoginToken} = useContext(ShopContext);
  const {setUserName,isAdmin,setIsAdmin} = useContext(ShopContext)
  const navigate = useNavigate();
  
  function handleForm(event){
    setForm({...form,
      [event.target.name]: event.target.value
    })
  }
  async function handleSubmit(event){
    event.preventDefault()
    const response = await fetch('http://127.0.0.1:3000/api/v1/users/signup',{
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    const token = dataObj.token
    console.log(data)
    toast(dataObj.message)
    if(token){
      setLoginToken(token)
      setIsLogedIn(1)
      setUserName(dataObj.userName)
      setIsAdmin(false)
      console.log(dataObj.role)
      if(dataObj.role === 'admin') setIsAdmin(true)
      navigate('/')
    }
  }
  return (
    <div className='registration-container'>
      <div className='registration-form'>
        <form className='registration-content' onChange={handleForm} onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="text-input-bar">
            <label>Name</label>
            <input type='text' name='name' placeholder='Enter name' required></input>
          </div>
          <div className="text-input-bar">
            <label>Email Address</label>
            <input type='text'  name='email' placeholder='Enter email' required></input>
          </div>
          <div className="text-input-bar">
            <label>Enter Password</label>
            <input type='password' name='password' placeholder='Enter password' required></input>
          </div>
          <div className="text-input-bar">
            <label>Confirm Password</label>
            <input type='password'  name='confirmPassword' placeholder='Confirm password' required></input>
          </div>
          <button>Register</button>
          <p>Already have an account?<NavLink className="log" to='/login'>Login</NavLink></p>
        </form>
        <div className='registration-img'>
          <img src={RegisterImg}/>
        </div>
      </div>
    </div>
  )
}

export default Register
