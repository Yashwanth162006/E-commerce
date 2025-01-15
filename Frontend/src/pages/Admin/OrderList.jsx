import React,{useState,useEffect, useContext} from 'react'
import Order from './Order'
import './Order.css'
import { ShopContext } from '../../contexts/ShopContext'

const OrderList = () => {
  const [orderList,setOrderList] = useState([])
  const [name,setName] = useState('')
  const {loginToken} = useContext(ShopContext)
  useEffect(()=>{
    fetch('http://127.0.0.1:3000/api/v1/orders/admin',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    }).then(response => response.text())
    .then(data => JSON.parse(data))
    .then(dataObj => setOrderList(dataObj.data.orders))
  },[])
  function createOrder(order){
    fetch(`http://127.0.0.1:3000/api/v1/users/getUserByAdmin/${order.refToUser}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    }).then(response => response.text())
    .then(data => JSON.parse(data)).then(dataObj=>setName(dataObj.name.split(' ')[0].toLowerCase()))
    return <Order Order={order.refToProducts} name={name} address={`${order.address.address},${order.address.city},${order.address.postalCode},${order.address.country}`}/>
  }
  return (
    <div className='all-the-orders'>
      {orderList.length===0?<h1 style={{color: 'white',fontFamily:'poppins',textAlign:'center',fontSize:'2.5rem',fontWeight:'400'}}>No orders</h1>:orderList.map(createOrder)}
    </div>
  )
}

export default OrderList
