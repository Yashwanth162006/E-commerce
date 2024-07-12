import React, { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContext';
import { toast } from 'react-toastify';
import './Admin.css';
import { useNavigate } from 'react-router';
import Ratings from '../Products/Ratings';
const ProductList = (props) => {
  const navigate = useNavigate()
  const {addToCart,removeFromCart} = useContext(ShopContext);
  function createArray(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(i);
    }
    return arr;
  }
  function createOption(value){
    return <option value={value}>{value}</option>
  }
  function handleQuantity(event){
    let newNum = Number(event.target.value);
    addToCart(props.id,newNum);
  }
  function removeItem(){
    removeFromCart(props.id);
    toast('Removed From cart');
  }
  return (
    <div className='product-for-cart'>
      <img src={props.src} />
      <div>
        <h4 className='cart-item-name'>{props.name}</h4>
        <div style={{fontSize: '0.75rem'}}><Ratings rating={props.rating} className='rat'/></div>
        <p style={{fontFamily: 'poppins',color: 'white',fontWeight:'500'}}>{props.brand}</p>
        <p style={{fontFamily: 'poppins',color: 'white',fontWeight:'500'}}>${props.price}</p>
      </div>
      
      <p id="quantity-of-products" style={{display: 'flex',justifyContent:'center',alignItems:'center',fontFamily:'poppins'}}>{createOption(props.quantityChosen)}</p>
      <i class="fa-solid fa-circle-info" style={{color: 'white',fontSize: 'large'}} onClick={()=>navigate(`/product/${props.id}`)}></i>
      <i class="fa-solid fa-pen-to-square" style={{color: 'white',fontSize: 'large'}} onClick={()=>navigate(`/admin/product/update/${props.id}`)}></i>
    </div>
  )
}

export default ProductList
