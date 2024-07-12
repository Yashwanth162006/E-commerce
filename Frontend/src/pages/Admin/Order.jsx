import React, { useContext} from 'react'
import { ShopContext } from '../../contexts/ShopContext'
import product_list from '../../All_Products'
import Products
 from '../Products/Products'
const OrderList = (props) => {
    const {userName} = useContext(ShopContext)
    function createOrderProduct(orderProduct){
        if(orderProduct.qty === 0){
          return;
        }
        const product = product_list.find(product => product._id===orderProduct.productId)
        return <Products src={product.src1} name={product.name} quantity={orderProduct.qty} price={product.price} total={orderProduct.qty*(product.price)} />
      }
      function calculateTotal(orderProducts){
        let p=0;
        for(let i=0;i<orderProducts.length;i++){
          const product = product_list.find(product => product._id===orderProducts[i].productId);
          p=p+(product.price)*orderProducts[i].qty;
        }
        return p;
      }
      function totalItems(orderProducts){
        let q=0
        for(let i=0;i<orderProducts.length;i++){
            q+=orderProducts[i].qty
        }
        return q;
      }
    return (
        <div className='final-summary' style={{marginBottom:'20px'}}>
            <div className='order-summary'>
                <h4 style={{color: 'white',fontFamily:'poppins',fontWeight:'400',marginLeft:'10px',marginBottom:'0px'}}>Order by- {userName}</h4>
                <div className='order-summary-headings' style={{marginTop:'10px'}}>
                    <div>Image</div>
                    <div>Product</div>
                    <div>Quantity</div>
                    <div>Price</div>
                    <div>Total</div>
                </div>
                <div className='order-products'>
                    {props.Order.map(createOrderProduct)}
                </div>
                <h4 style={{margin:'15px 0 5px 10px',color:'white',fontFamily:'poppins',fontWeight:'400'}}>Total Items: {totalItems(props.Order)}</h4>
                <h4 style={{margin:'5px 0 5px 10px',color:'white',fontFamily:'poppins',fontWeight:'400'}}>Order Total: ${calculateTotal(props.Order)}</h4>
                <h4 style={{color: 'white',fontFamily:'poppins',fontWeight:'400',marginLeft:'10px',marginTop:'10px'}}>Delivery-address: {props.address}</h4>
            </div>
        </div>
    )
}

export default OrderList