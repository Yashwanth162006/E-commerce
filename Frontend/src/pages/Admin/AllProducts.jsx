import React from 'react'
import Product_List from '../../All_Products'
import ProductList from './ProductList'

function createProduct(product){
  return <ProductList id={product._id} src={product.src1} brand={product.brand} price={product.price} name={product.name} quantityChosen={product.quantity} quantity={product.quantity} rating={product.rating}/>
}
const AllProducts = () => {
  return (
    <div className='all-products-container'>
      <h1>All products-{Product_List.length}</h1>
      {Product_List.map(createProduct)}
    </div>
  )
}

export default AllProducts
