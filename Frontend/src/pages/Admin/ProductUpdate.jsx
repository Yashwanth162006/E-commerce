import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './ProductUpdate.css'
import { useContext } from 'react'
import {ShopContext} from '../../contexts/ShopContext'
import { toast } from 'react-toastify'

const ProductUpdate = () => {
  const {_id} = useParams()
  const {loginToken} = useContext(ShopContext)
  const navigate = useNavigate()
  const [form,setForm] = useState({
    _id: '',
    src1: '',
    name: '',
    brand: '',
    description: '',
    price: '',
    stock: '',
    quantity: '',
    category: ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(form => ({
      ...form,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(`http://127.0.0.1:3000/api/v1/products/${_id}`,{
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    console.log(dataObj)
    toast(dataObj.message)
    if(dataObj.status === 'success'){
      navigate(`/product/${_id}`)
      location.reload()
    }
  }
  useEffect(()=>{
    fetch(`http://127.0.0.1:3000/api/v1/products/${_id}`,{
      method: 'GET'
    }).then(response => response.text()).then(data => JSON.parse(data)).then(dataObj => setForm(dataObj.product))
  },[])
  return (
    <div className='product-update-container'>
      <form className='product-update-form' onSubmit={handleSubmit}>
          <h2>Update Product</h2>
          <div className="product-update-input">
            <label>Image</label>
            <input type='url'  name='src1' placeholder='Enter Image URL' required value={form.src1} onChange={handleChange}></input>
          </div>
          <div className="product-update-input">
            <label>Name</label>
            <input type='text' name='name' placeholder='Enter name' required value={form.name} onChange={handleChange}></input>
          </div>
          <div className="product-update-input">
            <label>Brand</label>
            <input type='text'  name='brand' placeholder='Enter brand' required value={form.brand} onChange={handleChange}></input>
          </div>
          <div className="product-update-input">
            <label>Description</label>
            <input type='text'  name='description' placeholder='Enter description' required value={form.description} onChange={handleChange}></input>
          </div>
          <div className="product-update-input">
            <label>Price</label>
            <input type='number'  name='price' placeholder='Enter price' required value={form.price} onChange={handleChange}></input>
          </div>
          <div className="product-update-input">
            <label>Stock</label>
            <input type='number'  name='stock' placeholder='Enter stock' required value={form.stock} onChange={handleChange}></input>
          </div>
          <div className="product-update-input">
            <label>Quantity</label>
            <input type='number'  name='quantity' placeholder='Enter Quantity' required value={form.quantity} onChange={handleChange}></input>
          </div>
          <div className="product-update-input">
            <label>Category</label>
            <input type='text' name='category' placeholder='Enter category' required value={form.category} onChange={handleChange}></input>
          </div>
          <button>Update</button>
      </form>
    </div>
  )
}

export default ProductUpdate
