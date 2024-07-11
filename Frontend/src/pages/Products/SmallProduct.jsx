import React, { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContext';
import { toast } from 'react-toastify';

const SmallProduct = (props) => {
  
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
        <p>{props.brand}</p>
        <p>${props.price}</p>
      </div>
      <select name="qty" id="quantity-of-products" defaultValue={props.quantityChosen} onClick={handleQuantity}>
        {createArray(props.quantity).map(createOption)}
      </select>
      <i class="fa-solid fa-trash-can" onClick={removeItem}></i>
    </div>
  )
}

export default SmallProduct
