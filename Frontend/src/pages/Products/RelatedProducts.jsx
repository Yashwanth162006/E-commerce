import React,{useContext} from 'react'
import ProductCard from './ProductCard'
import { ShopContext } from '../../contexts/ShopContext'

function RelatedProducts(){
    const {Product_List,selectedProduct} = useContext(ShopContext)
    const related_list = Product_List.filter((product)=>(product.category===selectedProduct.category)&&(selectedProduct.id!==product.id));
    if (related_list.length === 0) return <div className='no-related-products-found'>No related products found</div>;

    function createProductCard(product){
        console.log(related_list)
        return <ProductCard src={product.src1} name={product.name} rating={product.rating} brand={product.brand} price={product.price} id={product.id} />
    }
    return(
        
        <div className='related-products-div'>
            {related_list.map(createProductCard)}
        </div>
    );
}

export default RelatedProducts