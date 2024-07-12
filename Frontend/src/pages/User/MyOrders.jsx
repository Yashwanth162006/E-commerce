import React,{useState,useEffect, useContext} from 'react'
import Order from '../Admin/Order'
import '../Admin/Order.css'
import { ShopContext } from '../../contexts/ShopContext'

const MyOrders = ()=>{
  const [orderList,setOrderList] = useState([])
  const {loginToken} = useContext(ShopContext)
  useEffect(()=>{
    fetch('http://127.0.0.1:3000/api/v1/orders/user',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    }).then(response => response.text())
    .then(data => JSON.parse(data))
    .then(dataObj => setOrderList(dataObj.orders))
  },[])
  function createOrder(order){
    return <Order Order={order.refToProducts} address={`${order.address.address},${order.address.city},${order.address.postalCode},${order.address.country}`}/>
  }
    return <div className='user-profile-container'>
        <h2 style={{fontFamily:'poppins',fontWeight:'400',color:'white'}}>All Orders-{orderList.length}</h2>
        {orderList.length===0?<h1 style={{color: 'white',fontFamily:'poppins',textAlign:'center',fontSize:'2.5rem',fontWeight:'400'}}>No orders</h1>:orderList.map(createOrder)}
    </div>
}

export default MyOrders