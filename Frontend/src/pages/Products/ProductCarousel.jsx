import React, { useContext } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Ratings from './Ratings';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';
import { toast } from 'react-toastify'
const ProductCarousel = (props) => {
  const {addToCart} = useContext(ShopContext);
  function handleAddToCart(){
    addToCart(props.id,1);
    toast("Added to Cart");
  }
  return (
      <div className='product-carousel'>
        <NavLink to={`product/${props.id}`}><img src={props.src1}/></NavLink>
        <div className='product-carousel-bottom'>
          <div className='product-carousel-bottom-left'>
              <h2>{props.title}</h2>
              <h3>${props.price}</h3>
              <p>{props.description}</p>
          </div>
          <div className='product-carousel-bottom-right'>
            <p>Brand: {props.brand}</p>
            <Ratings rating={props.rating}/>
            <p>Quantity: {props.quantity}</p>
            <p className='stock'>In Stock: {props.stock}</p>
            <button onClick={handleAddToCart}><i class='fa-solid fa-cart-shopping'></i></button>
          </div>
        </div>
      </div>
  )
}

export default ProductCarousel
