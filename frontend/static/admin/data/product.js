import {
    getData,
    createData,
    deleteData,
    getDataByID,
    updateData,
  } from "./connectData.js";
  
  const table = "products";
  export async function getProduct() {
    let result = await getData(table); 
    return result;
  }
  
  export async function getProductByID(id) {
    let result = await getDataByID(table, id); 
    return result;
  }
  
  export async function getProductByIDCategory(id) {
    let products = await getData(table); 
    var result = products.filter(item=>{  
      return item.cate_id == id 
    })
    return result;
  }

  export async function createProduct(data) {
    let result = await createData(table, data);
    return result;
  }
  
  export async function updateProduct(id, data) { 
    let result = await updateData(table + "/" + id, data); 
    return result; 
  }
  
  export async function deleteProduct(data) {
    let result = await deleteData(table, data);
    return result;
  }
  
  
  