
async function importProducts(){
    const response = await fetch('http://127.0.0.1:3000/api/v1/products',{
        method: 'GET'
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    const products_list = dataObj.products
    return products_list
}
const products_list = await importProducts()
export default products_list