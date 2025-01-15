import React, { useContext } from 'react'
import Ratings from './Ratings'
import { NavLink } from 'react-router-dom'
import  { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'
const Product = (props) => {
  const {addToCart,favouriteItems,addToFavourites,removeFromFavourites} = useContext(ShopContext)
  function handleAddToCart(){
    addToCart(props.id,1);
    toast("Added to Cart");
  }
  function toggleFromFavourites(){
    if(favouriteItems.find(item => item.productId === props.id).fav){
      removeFromFavourites(props.id)
    }else{
      addToFavourites(props.id)
    }
  }
  return (
    <div className = 'special-product'>
      <img src={props.src}/>
      <NavLink to={`/product/${props.id}`} className='sp-nav-link'><h3>{props.name}</h3></NavLink>
      <div className='special-product-info'>
        <div className='special-product-info-left'>
          <p>{props.brand}</p>
          <div className='special-product-rating'><Ratings rating={props.rating}/></div>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
        <div className='special-product-info-right'>
          <button>${props.price}</button>
        </div>
      </div>
      {favouriteItems.find(item => item.productId === props.id).fav?<i class='fa-solid fa-heart' onClick={toggleFromFavourites}></i>:<i class='fa-regular fa-heart' onClick={toggleFromFavourites} style={{color:'#f1069b'}}></i>}
    </div>
  )
}

export default Product
