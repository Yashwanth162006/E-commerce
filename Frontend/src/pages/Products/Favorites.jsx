import React, { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContext'
import Product from './Product'
import './Favourites.css'
import Product_List from '../../All_Products'

const Favorites = () => {
  const {favouriteItems} = useContext(ShopContext)
  function length(arr){
    let sum = 0;
    for(let i=0;i<arr.length;i++){
      if(arr[i].fav) sum = sum+1
    }
    return sum;
  }
  function createFavourite(favourite){
    if(!favourite.fav){
      return;
    }else{
      const product = Product_List.find(product => product._id === favourite.productId);
      return <Product key={product._id} src={product.src1} name={product.name} brand={product.brand} rating={product.rating} price={product.price} id={product._id}/>
    }
  }
  return (
    <div className='favourites-container'>
      <div>
        <h1>Favourite Products</h1>
        {length(favouriteItems)===0?<p>You have no favourites</p>:null}
        <div>{favouriteItems.map(createFavourite)}</div>
      </div>
    </div>
  )
}

export default Favorites
