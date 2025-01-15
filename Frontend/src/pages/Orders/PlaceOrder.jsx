import React, { useContext } from 'react'
import './PlaceOrder.css'
import Products from '../Products/Products'
import product_list from '../../All_Products'
import { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
const PlaceOrder = () => {
  const {cartItems,addr,clearCart,loginToken} = useContext(ShopContext);
  const navigate = useNavigate();
  function createOrderProduct(cartProduct){
    if(cartProduct.qty === 0){
      return;
    }
    const product = product_list.find(product => product._id===cartProduct.productId)
    return <Products src={product.src1} name={product.name} quantity={cartProduct.qty} price={product.price} total={cartProduct.qty*(product.price)} />
  }
  function calculateTotal(cartProducts){
    let p=0;
    for(let i=0;i<cartProducts.length;i++){
      const product = product_list.find(product => product._id===cartProducts[i].productId);
      p=p+(product.price)*cartProducts[i].qty;
    }
    return p;
  }
  async function placeOrder(cartItems){
    const refToProducts = []
    for(let i=0;i<cartItems.length;i++){
      if(cartItems[i].qty === 0) {
        continue
      }
      refToProducts.push(cartItems[i])
    }
    const address = {address: addr[0],city: addr[1],postalCode: addr[2],country: addr[3]}
    const response1 = await fetch('http://127.0.0.1:3000/api/v1/orders/user',{
      method: 'POST',
      body: JSON.stringify({refToProducts: refToProducts,address: address}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    })
    const data1 = await response1.text()
    const dataObj1 = JSON.parse(data1)
    if(dataObj1.status === 'success'){
      toast('Order Placed Successfully')
      setTimeout(()=>toast('Cart cleared'),1000)
      clearCart()
      navigate('/cart')
    }else{
      toast('Error placing the order')
    }
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
          <p>Address: {`${addr[0]},${addr[1]},${addr[2]},${addr[3]}`}</p>
        </div>
        <div className='Payment Method'>
          <h2>Payment Method</h2>
          <p>Method: PayPal</p>
        </div>
      </div>
      <button onClick={() => placeOrder(cartItems)}>Place Order</button>
    </div>
  )
}

export default PlaceOrder
