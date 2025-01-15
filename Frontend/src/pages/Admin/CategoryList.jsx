import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../../contexts/ShopContext'
import './CategoryList.css'
const CategoryList = () => {
  const [categoryList,setCategoryList] = useState([])
  const {loginToken} = useContext(ShopContext)
  useEffect(()=>{
    fetch('https://e-com-backend-4zqj.onrender.com/api/v1/categories',{
      method: "GET",
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    }).then(response => response.text())
    .then(data => JSON.parse(data))
    .then(dataObj => setCategoryList(dataObj.categoryList))
  },[])
  function createCategory(category){
    return <li className='category-name'><h3>{category.category}</h3></li>
  }
  return (
    <div className='category-list-container'>
      <h2>Categories-{categoryList.length}</h2>
      <ul>
        {categoryList.map(createCategory)}
      </ul>
    </div>
  )
}

export default CategoryList
