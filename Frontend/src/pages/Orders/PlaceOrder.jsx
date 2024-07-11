import React, { useContext } from 'react'
import './PlaceOrder.css'
import Products from '../Products/Products'
import product_list from '../../All_Products'
import { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
const PlaceOrder = () => {
  const {cartItems,shippingAddress,clearCart} = useContext(ShopContext);
  const navigate = useNavigate();
  function createOrderProduct(qty,i){
    if(qty === 0){
      return;
    }
    const product = product_list[i];
    return <Products src={product.src1} name={product.name} quantity={qty} price={product.price} total={qty*(product.price)} />
  }
  function calculateTotal(arr){
    let p=0;
    for(let i=0;i<arr.length;i++){
      const product = product_list[i];
      p=p+(product.price)*arr[i];
    }
    return p;
  }
  function placeOrder(){
    toast('order placed successfully');
    navigate('/cart');
    setTimeout(()=>{
      clearCart();
      toast('Cart Cleared');
    },1500);
  }
  return (
    <div className='final-summary'>
      <div className='order-summary'>
        <h2>Order Summary</h2>
        <div className='order-summary-headings'>
          <div>Image</div>
          <div>Product</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Total</div>
        </div>
        <div className='order-products'>
          {cartItems.map(createOrderProduct)}
        </div>
      </div>
      <h2>Summary Details</h2>
      <div className='order-details'>
        <div className='order-amount'>
          <h3>Items:  ${calculateTotal(cartItems)}</h3>
          <h3>Shipping:  ${0}</h3>
          <h3>Taxes:  ${calculateTotal(cartItems)/5}</h3>
          <h3>Total:  ${6*calculateTotal(cartItems)/5}</h3>
        </div>
        <div className='shipping-address'>
          <h2>Shipping</h2>
          <p>Address: {shippingAddress}</p>
        </div>
        <div className='Payment Method'>
          <h2>Payment Method</h2>
          <p>Method: PayPal</p>
        </div>
      </div>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  )
}

export default PlaceOrder
