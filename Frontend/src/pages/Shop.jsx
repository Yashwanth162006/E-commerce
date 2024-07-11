import React,{useState,useEffect, useContext} from 'react'
import ProductTabs from './Products/ProductTabs'
import DSLR_1 from '../Images/DSLR/DSLR-1.png'
import Product_List from '../All_Products.js';
import { NavLink } from 'react-router-dom';


const Shop = () => {
  const [brandFilteredList,setBrandFilteredList] = useState(Product_List);
  const [categoryFilteredList,setCategoryFilteredList] = useState(Product_List);
  const [displayList,setDisplayList] = useState(Product_List);
  const [categoryList,setCategoryList] = useState([]);
  const allBrands = ['Apple','Dell','Sketchers','Canon','One plus','Hp','Campus'];
  const [brandList,setBrandList] = useState(allBrands);
  const [inputValue,setInputValue] = useState("");

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
    return <div><input type='radio' value={brand} name="brand-filter" id={brand} onClick={handleBrandFilter}/> <label for={brand}>{brand}</label></div>
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
              <div><input type='checkbox' value='Tablets' onClick={handleInputChange}/> Tablets</div>
              <div><input type='checkbox' value='Laptops' onClick={handleInputChange}/> Laptops</div>
              <div><input type='checkbox' value='Camera' onClick={handleInputChange}/> Camera</div>
              <div><input type='checkbox' value='Shoes' onClick={handleInputChange}/> Shoes</div>
              <div><input type='checkbox' value='Mobiles' onClick={handleInputChange}/> Mobiles</div>
              <div><input type='checkbox' value='Drones' onClick={handleInputChange}/> Drones</div>
              <div><input type='checkbox' value='Earpods' onClick={handleInputChange}/> Earpods</div>
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
