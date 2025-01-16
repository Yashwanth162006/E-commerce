import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../../contexts/ShopContext'
import { toast } from 'react-toastify'

const UserList = () => {
  const [userList,setUserList] = useState([])
  const {loginToken} = useContext(ShopContext)
  async function deleteUser(id){
    const confirmation = confirm('Do you want to delete this user?')
    const obj = {
      id: id
    }
    if(confirmation){
      const response = await fetch('https://e-com-backend-4zqj.onrender.com/api/v1/users/adminDelete',{
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken}`
        }
      })
      const data = await response.text()
      console.log(data)
      const dataObj = JSON.parse(data)
      toast(dataObj.message)
      setTimeout(()=>location.reload(),1500)
    }else{
      return
    }
  }
  function createUser(user){
    return <div className='user-data'>
      <h1>{user.name.slice(0,1).toUpperCase()}</h1>
      <h4 className='name'>Name - {user.name}</h4>
      <h4 className='email'>Email: {user.email}</h4>
      <h4 className='role'>Role: {user.role}</h4>
      {user.role==='admin'?null:<i className='fa-solid fa-trash-can' onClick={()=>deleteUser(user._id)}></i>}
    </div>
  }
  useEffect(()=>{
    fetch('https://e-com-backend-4zqj.onrender.com/api/v1/users/',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    })
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .then(dataObj=>{
      if(dataObj.status === 'success'){
        setUserList(dataObj.data.users)
      }
    })
  },[])
  return (
    <div className='user-list-container'>
      <h2>All Users-{userList.length}</h2>
      {userList.map(createUser)}
    </div>
  )
}

export default UserList
