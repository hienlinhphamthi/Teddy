import {
    getData,
    createData,
    getDataByID,
    updateData,
  } from "./connectData.js";
  
  const table = "order_details";
  export async function getOrderDetail() {
    let result = await getData(table);
    return result;
  }
  
  export async function getOrderDetailByIdOrder(id) {
    let result = await getDataByID(table, id);
    return result;
  }
  
  export async function updateOrderDetail(id, data) {
    let result = await updateData(table + "/" + id, data);
    return result;
  }
  export async function createOrder_detail(data) {
    let result = await createData(table, data);
    return result;
  }
  
  export function checkStatus(data) {
    var result;
    switch (data) {
      case 0:
        result = `
        <span  class="btn text-white btn-secondary">Đơn hàng đã bị hủy</span>`;
        break;
      case 1:
        result = `<span class="btn text-white bg-primary">Đang chờ xác nhận </span>`;
        break;
      case 2:
        result = `<span class="btn text-white bg-warning">Đang được vận chuyển</span>`;
        break;
      case 3:
        result = `<span class="btn text-white bg-success">Đã nhận hàng</span>`;
        break;
  
      default:
        break;
    }
    return result;
  }
  