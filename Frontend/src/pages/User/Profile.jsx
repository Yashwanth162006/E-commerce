import React, { useContext, useState } from 'react'
import './Profile.css'
import { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const Profile = () => {
  const [form1,setForm1] = useState({})
  const [form2,setForm2] = useState({})
  const [form3,setForm3] = useState({})
  const {setIsLogedIn} = useContext(ShopContext)
  const {loginToken,setLoginToken} = useContext(ShopContext)
  const navigate = useNavigate()
  function handleForm1(event){
    setForm1({...form1,
      [event.target.name]: event.target.value
    })
  }
  function handleForm2(event){
    setForm2({...form2,
      [event.target.name]: event.target.value
    })
  }
  function handleForm3(event){
    setForm3({...form3,
      [event.target.name]: event.target.value
    })
  }
  async function onSubmit1(event){
    event.preventDefault()
    const tempForm1 = form1
    if(!form1.name){
      delete tempForm1.name
    }
    if(!form1.email){
      delete tempForm1.email
    }
    if(!form1.name && !form1.email){
      return toast('Nothing to update')
    }
    setForm1(tempForm1)
    console.log(form1)
    const response = await fetch('http://127.0.0.1:3000/api/v1/users/',{
      method: 'PATCH',
      body: JSON.stringify(form1),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    toast(dataObj.message)
  }
  async function onSubmit2(event){
    event.preventDefault()
    const response = await fetch('http://127.0.0.1:3000/api/v1/users/updatePassword',{
      method: 'PATCH',
      body: JSON.stringify(form2),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    toast(dataObj.message)
    if(dataObj.status === 'success'){
      setLoginToken(dataObj.token)
      location.reload()
    }
  }
  async function onSubmit3(event){
    event.preventDefault()
    const response = await fetch('http://127.0.0.1:3000/api/v1/users/',{
      method: 'DELETE',
      body: JSON.stringify(form3),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    toast(dataObj.message)
    if(dataObj.status === 'success'){
      setIsLogedIn(0)
      navigate('/')
    }
  }
  function navigateToMyOrders(){
    
  }
  return (
    <div className='user-profile-container'>
      <form className='user-profile' onChange={handleForm1} onSubmit={onSubmit1}>
        <h1>Update Profile</h1>
        <p>Name</p>
        <input type='text' placeholder='Enter name' name='name'/>
        <p>Email Address</p>
        <input type='email' placeholder='Enter email' name='email'/>
        <div>
            <button>Update</button>
          </div>
      </form>
      <form className='user-profile' onChange={handleForm2} onSubmit={onSubmit2}>
        <h1>Update Password</h1>
        <p>Enter Current Password</p>
        <input type='password' placeholder='Enter password' name='currentPassword' required/>
        <p>Enter New Password</p>
        <input type='password' placeholder='Enter password' name='newPassword' required/>
        <p>Confirm Password</p>
        <input type='password' placeholder='Confirm password' name='confirmNewPassword' required/>
          <div>
            <button>Update Password</button>
          </div>
      </form>
      <form className='user-profile' onChange={handleForm3} onSubmit={onSubmit3}>
        <h1>Delete Account</h1>
        <p>Enter Current Password</p>
        <input type='password' placeholder='Enter password' name='currentPassword' required/>
          <div>
            <button>Delete Account</button>
          </div>
      </form>
      <div>
            <button onClick={navigateToMyOrders}>My Orders</button>
          </div>
    </div>
  )
}

export default Profile
