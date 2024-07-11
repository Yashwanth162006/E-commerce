import React,{useState} from 'react'
import './ResetPassword.css'
import LoginImg from "../../Images/Login.png"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'

function ResetPassword(){
    const [form,setForm] = useState({})
    const navigate = useNavigate()
    function handleForm(event){
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    async function handleSubmit(event){
        event.preventDefault()
        const response = await fetch('http://127.0.0.1:3000/api/v1/users/resetPassword',{
            method: 'PATCH',
            body: JSON.stringify(form),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.text()
          const dataObj = JSON.parse(data)
          if(dataObj.status === 'success'){
            toast('Password Updated Successfully')
            setTimeout(()=>toast('Login With new password'),1000)
            navigate('/login')
          }
          if(dataObj.status === 'fail'){
            toast(dataObj.message)
          }
    }
    return (
        <div className='password-reset-container'>
      <div className='password-reset-form'>
        <form className='password-reset-content' onChange={handleForm} onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <div className="text-input-bar">
            <label>Reset Token</label>
            <input type='text' placeholder='Enter password reset token' name='resetToken'></input>
          </div>
          <div className="text-input-bar">
            <label>Password</label>
            <input type='password' placeholder='Enter new password' name='newPassword'></input>
          </div>
          <div className="text-input-bar">
            <label>Confirm Password</label>
            <input type='password' placeholder='Enter new password' name='confirmNewPassword'></input>
          </div>
          <button>Update Password</button>
        </form>
        <div className='login-img'>
          <img src= {LoginImg}/>
        </div>
      </div>
    </div>
    );
}

export default ResetPassword