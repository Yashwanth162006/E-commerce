import React,{useState,useEffect, useContext} from 'react'
import ProductTabs from './Products/ProductTabs'
import DSLR_1 from '../Images/DSLR/DSLR-1.png'
import Product_List from '../All_Products.js';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext.jsx';


const Shop = () => {
  const [brandFilteredList,setBrandFilteredList] = useState(Product_List);
  const [categoryFilteredList,setCategoryFilteredList] = useState(Product_List);
  const [displayList,setDisplayList] = useState(Product_List);
  const [categoryList,setCategoryList] = useState([]);
  const [allBrands,setAllBrands] = useState([])
  const [brandList,setBrandList] = useState([]);
  const [inputValue,setInputValue] = useState("");
  const [allCategories,setAllCategories] = useState([])
  const {loginToken} = useContext(ShopContext)
  useEffect(()=>{
    fetch('https://e-com-backend-4zqj.onrender.com/api/v1/categories/',{
      method: "GET",
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    }).then(response => response.text())
    .then(data => JSON.parse(data))
    .then(dataObj => setAllCategories(dataObj.categoryList))
  },[])
  useEffect(()=>{
    fetch('https://e-com-backend-4zqj.onrender.com/api/v1/brands/',{
      method: "GET",
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    }).then(response => response.text())
    .then(data => JSON.parse(data))
    .then(dataObj => {
      setAllBrands(dataObj.brandList)
      setBrandList(dataObj.brandList)
  })
  },[])
  useEffect(() => {
    brandOptions();
  }, [categoryFilteredList]);
  
  useEffect(() => {
    if (inputValue === "") {
      setDisplayList(categoryFilteredList);
    } else {
      const filteredByPrice = categoryFilteredList.filter(product => product.price <= Number(inputValue));
      setDisplayList(filteredByPrice);
    }
  }, [inputValue,categoryFilteredList]);
  function createCategory(category){
    return <div><input type='checkbox' value={category.category} onClick={handleInputChange}/> {category.category}</div>
  }
  function createProduct(product){
    return <ProductTabs src1={product.src1} brand={product.brand} name={product.name} description={product.description} price={product.price} id={product._id}/>
  }
  function handleInputChange(event){
    const currCategory = event.target.value;
    const catItems = Product_List.filter((product)=>product.category === currCategory);

    if(categoryList.length === 0 && categoryFilteredList.length === Product_List.length){
      setCategoryFilteredList(catItems);
      setCategoryList([...categoryList,currCategory]);
      setDisplayList(catItems);
      return;
    }
    if(categoryList.includes(currCategory) && categoryList.length === 1){
      setCategoryFilteredList(Product_List);
      setCategoryList([]);
      setDisplayList(Product_List);
      return;
    }
    if(categoryList.includes(currCategory)){
      setCategoryFilteredList(categoryFilteredList.filter((product)=>product.category!==currCategory));
      setDisplayList(categoryFilteredList.filter((product)=>product.category!==currCategory))
      setCategoryList(categoryList.filter((category)=>category!==currCategory));
    }else{
      setCategoryFilteredList([...categoryFilteredList,...catItems]);
      setDisplayList([...categoryFilteredList,...catItems]);
      setCategoryList([...categoryList,currCategory]);
    }
  }
  function brandOptions() {
    const updatedBrandList = allBrands.filter((brand) =>
      categoryFilteredList.some((product) => product.brand === brand)
    );
    setBrandList(updatedBrandList);
  }
  function handleBrandFilter(event){
    const currBrand = event.target.value;
    setDisplayList(categoryFilteredList.filter((product)=>product.brand === currBrand))
  }
  function createOption(brand){
    return <div><input type='radio' value={brand.brand} name="brand-filter" id={brand.brand} onClick={handleBrandFilter}/> <label for={brand.brand}>{brand.brand}</label></div>
  }
  function handlePriceChange(event){
      setInputValue(event.target.value);
  }
  return (
    <div className='shop-container'>
      <div className='filter-panel'>
        <div className='filter-by-categories'>
          <div className='filter-name'>
            <p>Filter By Categories</p>
          </div>
          <div className='filter-options'>
            <form>
              {allCategories.map(createCategory)}
            </form>
          </div>
        </div>
        <div className='filter-by-brands'>
          <div className='filter-name'>
            <p>Filter By Brands</p>
          </div>
          <div className='filter-options'>
            <form>
                {brandList.map(createOption)}
            </form>
          </div>
        </div>
        <div className='filter-by-price'>
          <div className='filter-name'>
            <p>Filter By Price</p>
          </div>
          <div className='price-input-bar-div'>
            <input type='text' onChange={handlePriceChange}placeholder='Enter price' value={inputValue}/>
          </div>
        </div>
        <button className='reset-button' onClick={()=>window.location.reload()}>Reset Filters</button>
      </div>
      <div className='All-products-container'>
        <h4>{displayList.length} Products</h4>
        <div>
          {displayList.map(createProduct)}
        </div>
      </div>
    </div>
  )
}

export default Shop
