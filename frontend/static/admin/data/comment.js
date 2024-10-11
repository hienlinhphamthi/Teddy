import {
    getData,
    createData,
    deleteData,
    getDataByID,
    updateData,
  } from "./connectData.js";

  const table = "comments";
  export async function getComments() { // Sử dụng getData từ connectData.js để lấy dữ liệu từ bảng comments.
    let result = await getData(table); // Trả về kết quả của getData một cách bất đồng bộ (asynchronously).
    return result;
  }
  
  export async function getCommentByID(id) { // Sử dụng getDataByID từ connectData.js để lấy dữ liệu từ bảng comments dựa trên một id cụ thể.
    let result = await getDataByID(table, id);
    return result;
  }
  
  export async function createComment(data) { // Sử dụng createData từ connectData.js để tạo mới một dòng dữ liệu trong bảng comments với dữ liệu được cung cấp.
    let result = await createData(table, data);
    return result;
  }
  
  export async function updateComment(id, data) { // ử dụng updateData từ connectData.js để cập nhật một dòng dữ liệu trong bảng comments dựa trên id và dữ liệu được cung cấp.
    let result = await updateData(table + "/" + id, data);
    return result;
  }
  
  export async function deleteComment(data) {
    let result = await deleteData(table, data);
    return result;
  }
  
  
  