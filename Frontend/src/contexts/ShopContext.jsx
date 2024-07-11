import React,{createContext,useState,useEffect} from "react";
import Product_List from "../All_Products.js";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const loadFromLocalStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultValue;
  };

export const ShopContext = createContext(null);
function getDefaultCart(){
    let cart = [];
    for(let i=0;i<Product_List.length;i++){
        const obj = {
          productId: Product_List[i]._id,
          qty: 0
        }
        cart.push(obj)
    }
    return cart;
}
function getDefaultFavourites(){
  let fav = [];
  for(let i=0;i<Product_List.length;i++){
    const obj = {
      productId: Product_List[i]._id,
      fav: false
    }
    fav.push(obj)
}
  return fav;
}

function ShopContextProvider(props){
    const [selectedProduct, setSelectedProduct] = useState(loadFromLocalStorage('selectedProduct',null));
    const [cartItems, setCartItems] = useState(loadFromLocalStorage('cartItems',getDefaultCart()));
    const [favouriteItems,setFavouriteItems] = useState(loadFromLocalStorage('favItems',getDefaultFavourites()));
    const [shippingAddress,setShippingAddress] = useState(null);
    const [isLogedIn,setIsLogedIn] = useState(loadFromLocalStorage('loginState',0));
    const [loginToken,setLoginToken] = useState(loadFromLocalStorage('loginToken',null));
    const [userName,setUserName] = useState(loadFromLocalStorage('userName',null));
    const [isAdmin,setIsAdmin] = useState(loadFromLocalStorage('adminState',false))
    useEffect(()=>{
      saveToLocalStorage('cartItems',cartItems);
    },[cartItems])
    useEffect(()=>{
      saveToLocalStorage('favItems',favouriteItems)
    },[favouriteItems])
    useEffect(()=>{
        saveToLocalStorage('selectedProduct',selectedProduct);
      },[selectedProduct]);
      useEffect(()=>{
        saveToLocalStorage('loginState',isLogedIn);
      },[isLogedIn]);
      useEffect(()=>{
        saveToLocalStorage('loginToken',loginToken)
      },[loginToken])
      useEffect(()=>{
        saveToLocalStorage('userName',userName)
      },[userName])
      useEffect(()=>{
        saveToLocalStorage('adminState',isAdmin)
      },[isAdmin])
    function addToCart(_id,qty){
        let items = [...cartItems];
        items.find(product => product.productId === _id).qty = qty
        setCartItems(items);
    }
    function removeFromCart(_id){
        let items = [...cartItems];
        items.find(product => product.productId === _id).qty = 0
        setCartItems(items);
    }
    function addToFavourites(_id) {
        let favourites = [...favouriteItems];
        favourites.find(product => product.productId === _id).fav = true
        setFavouriteItems(favourites);
    }

    function removeFromFavourites(_id) {
      let favourites = [...favouriteItems];
      favourites.find(product => product.productId === _id).fav = false
      setFavouriteItems(favourites);
    }
    function clearCart(){
      setCartItems(getDefaultCart());
    }
    const contextValue = {Product_List,selectedProduct,setSelectedProduct,cartItems,setCartItems,favouriteItems,setFavouriteItems,addToCart,removeFromCart,addToFavourites,removeFromFavourites,shippingAddress,setShippingAddress,isLogedIn,setIsLogedIn,clearCart,loginToken,setLoginToken,userName,setUserName,isAdmin,setIsAdmin};
    return <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
}

export default ShopContextProvider;