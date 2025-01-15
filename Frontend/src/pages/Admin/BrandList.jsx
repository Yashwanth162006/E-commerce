import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../../contexts/ShopContext'
import './BrandList.css'

const BrandList = () => {
  const [brandList,setBrandList] = useState([])
  const {loginToken} = useContext(ShopContext)
  useEffect(()=>{
    fetch('https://e-com-backend-4zqj.onrender.com/api/v1/brands',{
      method: "GET",
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    }).then(response => response.text())
    .then(data => JSON.parse(data))
    .then(dataObj => setBrandList(dataObj.brandList))
  },[])
  function createBrand(brand){
    return <li className='brand-name'><h3>{brand.brand}</h3></li>
  }
  return (
    <div className='brand-list-container'>
      <h2>Brands-{brandList.length}</h2>
      <ul>
        {brandList.map(createBrand)}
      </ul>
    </div>
  )
}

export default BrandList
