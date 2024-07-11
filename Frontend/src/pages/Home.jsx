import React, { useContext,useEffect,useRef,useState } from 'react'
import ProductCard from './Products/ProductCard';
import ProductCarousel from './Products/ProductCarousel';
import { NavLink} from 'react-router-dom';
import Product_List from '../All_Products';
import Product from './Products/Product';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
  

  function createProductCard(product){
    const link = 'productCarousel'+product.id;
    return <ProductCard src={product.src1} name={product.name} rating={product.rating} brand={product.brand} price={product.price} link={link} id={product._id}/>
  }
  function createSpecialProduct(product){
    return <Product src={product.src1} name={product.name} brand={product.brand} rating={product.rating} price={product.price} id={product._id}/>
  }
  function createProductCarousel(product){
    return <ProductCarousel src1={product.src1} src2={product.src2} src3={product.src3} title={product.name} price={product.price} description={product.description} brand={product.brand} rating={product.rating} quantity={product.quantity} stock={product.stock} id={product._id}/>
  }
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1
    }
  };
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group">
        <button onClick={() => previous()} className='prev-button'><i className='fa-solid fa-chevron-left'></i></button>
        <button onClick={() => next()} className='next-button'><i className='fa-solid fa-chevron-right'></i></button>
      </div>
    );
  };
  return (
    <div className='home-container'>
      <div className='home-container-top'>
        <div className='product-cards-container'>
          {Product_List.slice(0,4).map(createProductCard)}
        </div>
        <div className='product-carousel-container'>
          <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />} removeArrowOnDeviceType={["desktop"]}
          >
            {Product_List.slice(0,4).map(createProductCarousel)}
          </Carousel>
        </div>
      </div>
      <div className='home-container-mid'>
        <h2>Welcome to our e-commerce platform! </h2>
        <p>Explore a diverse selection of high-quality products and exclusive deals tailored to your needs. Enjoy a seamless shopping experience with us.</p>
      </div>
      <div className='home-container-lower-mid'>
        <h1>Special Products</h1>
        <NavLink to='/shop'><button>Shop</button></NavLink>
      </div>
      <div className='home-container-bottom'>
        {Product_List.slice(4,10).map(createSpecialProduct)}
      </div>
    </div>
  )
}

export default Home
