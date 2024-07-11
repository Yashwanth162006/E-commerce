import React,{useContext, useState} from 'react'
import './Shipping.css'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ShopContext } from '../../contexts/ShopContext';
const Shipping = () => {
  const [address,setAddress] = useState("");
  const [city,setCity] = useState("");
  const [postalCode,setPostalCode] = useState("");
  const [country,setCountry] = useState("");
  const [payment,setPayment] = useState("");
  const {setShippingAddress} = useContext(ShopContext);
  function handleAddressChange(event){
      setAddress(event.target.value)
  }
  function handleCityChange(event){
    setCity(event.target.value)
  }
  function handlePostalCodeChange(event){
    setPostalCode(event.target.value)
  }
  function handleCountryChange(event){
    setCountry(event.target.value)
  }
  function handlePaymentChange(event){
    setPayment("done");
  }
  function isFormValid(){
    if(address&&city&&postalCode&&country&&payment){
      setShippingAddress(address+", "+city+" "+postalCode+", "+country);
      return true;
    }else{
      return false;
    }
  }
  function createPopouts(){
    if(address===""){
      toast('fill address');
      return;
    }
    if(city===""){
      toast('fill city');
      return;
    }
    if(postalCode===""){
      toast('fill Postal Code');
      return;
    }
    if(country===""){
      toast('fill country');
      return;
    }
    if(payment===""){
      toast('Select Payment method');
      return;
    }
  }
  return (
    <div className='shipping-details-container'>
      <h1>Shipping</h1>
      <p>Address</p>
      <input type='text' placeholder='Enter address' onChange={handleAddressChange} value={address}/>
      <p>City</p>
      <input type='text' placeholder='Enter city' onChange={handleCityChange} value={city}/>
      <p>Postal Code</p>
      <input type='text' placeholder='Enter postal code' onChange={handlePostalCodeChange} value={postalCode} />
      <p>Country</p>
      <input type='text' placeholder='Enter country' onChange={handleCountryChange} value={country} />
      <p>Payment Method</p>
      <div>
        <input type='radio' value='PayPal' id='PayPal' onClick={handlePaymentChange}/><label htmlFor='PayPal' className='button'>PayPal or Credit card</label>
      </div>
      <NavLink to={isFormValid()?'/placeorder':null}><button onClick={createPopouts}>Continue</button></NavLink>
    </div>
  )
}

export default Shipping
