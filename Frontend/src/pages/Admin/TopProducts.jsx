import React, { useState,useEffect } from 'react'
import Product_List from '../../All_Products'
import ProductList from './ProductList'

function createProduct(product){
  return <ProductList id={product._id} src={product.src1} brand={product.brand} price={product.price} name={product.name} quantityChosen={product.quantity} quantity={product.quantity} rating={product.rating}/>
}
const AllProducts = () => {
    const [productList,setProductList] = useState([])
    useEffect(()=>{
        fetch('http://127.0.0.1:3000/api/v1/products/top-5')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        .then(dataObj => {
            setProductList(dataObj.products)
        }).catch(err => {toast(err.message)})
    },[])
  return (
    <div className='all-products-container'>
      <h1>Top Rated Products</h1>
      {productList.map(createProduct)}
    </div>
  )
}

export default AllProducts