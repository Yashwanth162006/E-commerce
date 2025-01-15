import React,{useState,useContext,useEffect} from 'react'
import SmallProduct from './Products/SmallProduct'
import DSLR_1 from '../Images/DSLR/DSLR-1.png'
import Product_List from '../All_Products'
import { ShopContext } from '../contexts/ShopContext'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  const {cartItems,isLogedIn} = useContext(ShopContext);
  const state = isLogedIn;
  function createCartItem(item){
    const product = Product_List.find(product => product._id === item.productId);
    if(item.qty !== 0){
      return <SmallProduct key={product._id} src={product.src1} name={product.name} brand={product.brand} price={product.price} id={product._id} quantity={product.quantity} quantityChosen={item.qty}/>
    }
  }
  function priceCalculator(cartItems){
    let p = 0;
    console.log(cartItems)
    for(let i=0;i<cartItems.length;i++){
      const product = Product_List.find(product => product._id === cartItems[i].productId)
      if(cartItems[i].qty){
        p = p + (cartItems[i].qty)*(product.price)
      }
    }
    return p;
  }
  function itemCalculator(cartItems){
    let it = 0;
    for(let i=0;i<cartItems.length;i++){
      it = it + (cartItems[i].qty)
    }
    return it;
  }
  return (
    <div className='shopping-container'>
        <div className='shopping-cart'>
          <div className='products-in-cart'>
            < p>Shopping Cart</p>
            {console.log(cartItems)}
            {itemCalculator(cartItems)===0?<div className='Empty-Cart'><p>Your cart is empty. <NavLink to='/shop' className='cart-to-shop-link'> Go to Shop</NavLink></p></div>:<div className='cart-products-div'>
              {cartItems.map(createCartItem)}
            </div>}
          </div>
          {itemCalculator(cartItems)===0?null:<div className='cart-summary'>
              <h5>Summary</h5>
              <h6>Items: {itemCalculator(cartItems)}</h6>
              <h4>Total: ${priceCalculator(cartItems)}</h4>
              <NavLink to='/shipping'><button>Proceed To Checkout</button></NavLink>
          </div>}
      </div>
    </div>
  )
}

export default Cart
