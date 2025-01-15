import React, { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContext';
import { toast } from 'react-toastify';
import './Admin.css';
import { useNavigate } from 'react-router';
import Ratings from '../Products/Ratings';
const ProductList = (props) => {
  const navigate = useNavigate()
  const {loginToken,favouriteItems,setFavouriteItems,cartItems,setCartItems} = useContext(ShopContext);
  function createArray(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(i);
    }
    return arr;
  }
  function createOption(value){
    return <option value={value}>{value}</option>
  }
  async function deleteProduct(){
    const confirmation = confirm('Do you want to delete this product?')
    if(confirmation){
      const response = await fetch(`http://127.0.0.1:3000/api/v1/products/${props.id}`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${loginToken}`
        }
      })
      const data = await response.text()
      const dataObj = JSON.parse(data)
      if(dataObj.status === 'success'){
        toast(dataObj.message)
        console.log('hello')
        let favItems = favouriteItems.filter(Item => Item.productId!==props.id)
        setFavouriteItems(favItems)
        let ctItems = cartItems.filter(Item => Item.productId!==props.id)
        setCartItems(ctItems)
        setTimeout(()=>location.reload(),1500)
      }else{
        toast('Failed to delete the product')
      }
    }
  }
  return (
    <div className='product-for-cart'>
      <img src={props.src} />
      <div>
        <h4 className='cart-item-name'>{props.name}</h4>
        <div style={{fontSize: '0.75rem'}}><Ratings rating={props.rating} className='rat'/></div>
        <p style={{fontFamily: 'poppins',color: 'white',fontWeight:'500'}}>{props.brand}</p>
        <p style={{fontFamily: 'poppins',color: 'white',fontWeight:'500'}}>${props.price}</p>
      </div>
      
      <p id="quantity-of-products" style={{display: 'flex',justifyContent:'center',alignItems:'center',fontFamily:'poppins'}}>{createOption(props.quantityChosen)}</p>
      <i class="fa-solid fa-circle-info" style={{color: 'white',fontSize: 'large'}} onClick={()=>navigate(`/product/${props.id}`)}></i>
      <i class="fa-solid fa-pen-to-square" style={{color: 'white',fontSize: 'large'}} onClick={()=>navigate(`/admin/product/update/${props.id}`)}></i>
      <i class="fa-solid fa-trash-can" style={{color: 'rgb(212, 53, 53)',fontSize: 'large'}} onClick={deleteProduct}></i>
    </div>
  )
}

export default ProductList
