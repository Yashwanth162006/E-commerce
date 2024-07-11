import React from 'react'
import './Products.css'

const Products = (props) => {
  const {product} = props
  return (
    <div className='product-for-order-summary'>
      <div><img src={props.src} /></div>
      <h4>{props.name}</h4>
      <p>{props.quantity}</p>
      <p>${props.price}</p>
      <p>${props.total}</p>
    </div>
  )
}

export default Products
