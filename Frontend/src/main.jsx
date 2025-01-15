import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import AdminRoute from "./pages/Admin/AdminRoute";
import Profile from "./pages/User/Profile";
import UserList from "./pages/Admin/UserList";

import CategoryList from "./pages/Admin/CategoryList";

import ProductList from "./pages/Admin/ProductList";
import AllProducts from "./pages/Admin/AllProducts";
import ProductUpdate from "./pages/Admin/ProductUpdate";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ProductCarousel from "./pages/Products/ProductCarousel.jsx";
import ShopContextProvider from "./contexts/ShopContext.jsx";
import RelatedProducts from './pages/Products/RelatedProducts.jsx';
import UserReviewContainer from './pages/Products/userReviewContainer.jsx';
import AllReviews from './pages/Products/AllReviews.jsx'
import ResetPassword from './pages/Auth/ResetPassword.jsx'
import TopProducts from './pages/Admin/TopProducts.jsx'
import MyOrders from './pages/User/MyOrders.jsx'
import AddProduct from './pages/Admin/AddProduct.jsx'
import BrandList from './pages/Admin/BrandList.jsx'
function createProductCarousel(product){
  const path = 'productCarousel'+product._id;
  return <Route path={path} element={<ProductCarousel src1={product.src1} src2={product.src2} src3={product.src3} title={product.name} price={product.price} description={product.description} brand={product.brand} rating={product.rating} quantity={product.quantity} stock={product.stock} id={product._id}/>}/>
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/" element={<Home />}/>
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/product/:_id" element={<ProductDetails />} >
        <Route path='' element={<UserReviewContainer />}/>
        <Route path='relatedproducts' element={<RelatedProducts/>} />
        <Route path='allreviews' element={<AllReviews/>} />
        <Route path='userReviewContainer' element={<UserReviewContainer />}/>
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/myOrders" element={<MyOrders />}/>
      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:_id" element={<Order />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path='brandList' element={<BrandList/>}/>
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path='top-5' element={<TopProducts />}/>
        <Route path="orderlist" element={<OrderList />} />
        <Route path="" element={<AdminDashboard />} />
        <Route path="addproduct" element={<AddProduct />}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
        <ShopContextProvider>
          <RouterProvider router={router} />
        </ShopContextProvider>
    </PayPalScriptProvider>
  </Provider>
);
