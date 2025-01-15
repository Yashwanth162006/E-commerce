import React,{useContext, useState} from 'react'
import './Shipping.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ShopContext } from '../../contexts/ShopContext';
const Shipping = () => {
  const [form,setForm] = useState({})
  const [payment,setPayment] = useState("");
  const {addr,setAddr} = useContext(ShopContext);
  const navigate = useNavigate()
  function handlePaymentChange(event){
    setPayment("done");
  }
  function handleChange(event){
    setForm({...form,[event.target.name]: event.target.value})
  }
  function handleSubmit(event){
    event.preventDefault()
    let new_addr = []
    new_addr.push(form.address)
    new_addr.push(form.city)
    new_addr.push(form.postalCode)
    new_addr.push(form.country)
    setAddr(new_addr)
    navigate('/placeorder')
  }
  return (
    <form className='shipping-details-container' onSubmit={handleSubmit}>
      <h1>Shipping</h1>
      <p>Address</p>
      <input type='text' placeholder='Enter address' name='address' onChange={handleChange} value={form.address} required/>
      <p>City</p>
      <input type='text' placeholder='Enter city' name='city' onChange={handleChange} value={form.city} required/>
      <p>Postal Code</p>
      <input type='text' placeholder='Enter postal code' name='postalCode' onChange={handleChange} value={form.postalCode} required/>
      <p>Country</p>
      <input type='text' placeholder='Enter country' name='country' onChange={handleChange} value={form.country} required/>
      <p>Payment Method</p>
      <div>
        <input type='radio' value='PayPal' id='PayPal' onClick={handlePaymentChange} required/><label htmlFor='PayPal' className='button'>PayPal or Credit card</label>
      </div>
      <button>Continue</button>
    </form>
  )
}

export default Shipping
