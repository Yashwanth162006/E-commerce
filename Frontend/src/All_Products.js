
async function importProducts(){
    const response = await fetch('https://e-com-backend-4zqj.onrender.com/',{
        method: 'GET'
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    const products_list = dataObj.products
    return products_list
}
const products_list = await importProducts()
export default products_list
