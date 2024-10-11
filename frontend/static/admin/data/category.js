import {
    getData,
    createData,
    deleteData,
    getDataByID,
    updateData,
  } from "./connectData.js";
  
  const table = "category";
  export async function getCategory() { 
    let result = await getData(table); 
    return result;
  }
  
  export async function getCategoryByID(id) { 
    let result = await getDataByID(table, id);
    return result;
  }
  
  export async function createCategory(data) { 
    let result = await createData(table, data);
    return result;
  }
  
  export async function updateCategory(id, data) {
    let result = await updateData(table + "/" + id, data);
    return result;
  }
  
  export async function deleteCategory(data) { 
    let result = await deleteData(table, data);
    return result;
  }
  
  
  