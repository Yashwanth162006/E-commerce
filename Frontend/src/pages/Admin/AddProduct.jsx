import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './ProductUpdate.css'
import { useContext } from 'react'
import {ShopContext} from '../../contexts/ShopContext'
import { toast } from 'react-toastify'

const AddProduct = () => {
  const {loginToken,favouriteItems,setFavouriteItems,cartItems,setCartItems} = useContext(ShopContext)
  const navigate = useNavigate()
  const [form,setForm] = useState({})
  const handleChange = (event) => {
    setForm({...form,
        [event.target.name]:event.target.value
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(form)
    const response = await fetch(`http://127.0.0.1:3000/api/v1/products/`,{
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    let favItems = [...favouriteItems]
    favItems.push({productId: dataObj.productId,fav: false})
    setFavouriteItems(favItems)
    let ctItems = [...cartItems]
    ctItems.push({productId: dataObj.productId,qty: 0})
    setCartItems(ctItems)
    fetch('http://127.0.0.1:3000/api/v1/categories/',{
      method: 'POST',
      body: JSON.stringify({category: form.category}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    })
    toast(dataObj.message)
    setTimeout(()=>{
      navigate('/shop')
      location.reload()
    },3000)
  }
  return (
    <div className='product-update-container'>
      <form className='product-update-form' onSubmit={handleSubmit} onChange={handleChange}>
          <h2>Create Product</h2>
          <div className="product-update-input">
            <label>Image</label>
            <input type='url'  name='src1' placeholder='Enter Image URL' required></input>
          </div>
          <div className="product-update-input">
            <label>Name</label>
            <input type='text' name='name' placeholder='Enter name' required></input>
          </div>
          <div className="product-update-input">
            <label>Brand</label>
            <input type='text'  name='brand' placeholder='Enter brand' required></input>
          </div>
          <div className="product-update-input">
            <label>Description</label>
            <input type='text'  name='description' placeholder='Enter description' required></input>
          </div>
          <div className="product-update-input">
            <label>Price</label>
            <input type='number'  name='price' placeholder='Enter price' required></input>
          </div>
          <div className="product-update-input">
            <label>Stock</label>
            <input type='number'  name='stock' placeholder='Enter stock' required></input>
          </div>
          <div className="product-update-input">
            <label>Quantity</label>
            <input type='number'  name='quantity' placeholder='Enter Quantity' required></input>
          </div>
          <div className="product-update-input">
            <label>Category</label>
            <input type='text' name='category' placeholder='Enter category' required></input>
          </div>
          <button>Create</button>
      </form>
    </div>
  )
}

export default AddProduct
