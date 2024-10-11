import AbstractView from "../AbstractView.js";
import { getOrderByID, updateOrder } from "../../data/order.js";
import { getOrderDetail } from "../../data/orderDetail.js";
import { getProductByID } from "../../data/product.js";
import { convertToVND,formatDate } from "../../data/connectData.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Order detail");
  }

  async getHtml() {
    let id = this.postId;
    let order = await getOrderByID(id);
    let {
      id: idOrder,
      customer_name,
      customer_address,
      customer_phone,
      customer_email,
      status, created_date
    } = order;

    created_date =  created_date.split("-");
    created_date = created_date[2] + "-" + created_date[1] + "-" + created_date[0];

    var htmlStatus = rederStatus(status);
    let order_detail = await getOrder(id);
    let html = await htmlProduct(order_detail);
    let sum = sumTotal(order_detail, id);
    return `
    <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="border p-3 mb-3">
          <h3>Thông tin người mua</h3>
          <div class="d-flex gap-2 py-1 align-items-center">
            <p class=" mb-0">Tên: </p>
            <input type="text"  name="name"  style="background-color:white" class="form-control  w-75  input no-border-outline" value=" ${customer_name} "  readonly>
          </div>
          <div class="d-flex gap-2 py-1 align-items-center">
            <p class=" mb-0">Email: </p>
            <input type="text" name="email"  style="background-color:white" class="form-control  w-75  input no-border-outline" value=" ${customer_email} "  readonly> 
          </div>
          <div class="d-flex gap-2 py-1 align-items-center">
            <p class=" mb-0">Số điện thoại: </p>
            <input type="text" name="phone"  style="background-color:white" class="form-control  w-75  input no-border-outline" value=" ${customer_phone} "  readonly> 
          </div>
          <div class="d-flex gap-2 py-1 align-items-center">
            <p class=" mb-0">Địa chỉ:</p> 
            <input type="text"  name="address" style="background-color:white" class="form-control w-75 input no-border-outline" value=" ${customer_address}"  readonly> 
          </div>
          <div class="d-flex gap-2 py-1 align-items-center">
            <p class=" mb-0">Ngày mua:</p> 
            <input type="date"  name="date" style="background-color:white" class="form-control w-75 input no-border-outline"  value="${created_date}" readonly> 
          </div>
          <div class=" d-flex py-2 items-center justify-content-center">
            <button class="btn btn-warning edit-order" type="button">
              <i class="fa fa-wrench" aria-hidden="true"></i> Edit
            </button>
          </div>
          
        </div>
        <div class="border p-3">
          <h3>Chi tiết đơn hàng</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
              </tr>
            </thead>
            <tbody>
                ${html}
              <tr>
                <td colspan="3">Tổng cộng</td>
                <td class="fw-bold"><p class="fw-bold fs-4">${convertToVND(
                  sum
                )}</p></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border p-3">
          <h3 class="pb-3">Tình trạng đơn hàng</h3>
            <div id="status">
                ${htmlStatus}
            </div>

        </div>
      </div>
      <input type="hidden" name="idOrder" value="${idOrder}">
    </div>
  </div>
        `;
  }
}

async function getOrder(id) {
  $('.loadAdmin').css('display','block')
  var orders = await getOrderDetail();
  orders = orders.filter((item) => item.order_id == id);
  $('.loadAdmin').css('display','none')
  return orders;
}

async function htmlProduct(item) {
  $('.loadAdmin').css('display','block')
  var html = await Promise.all(
    item.map(async (x) => {
      console.log(x);
      var product = await getProductByID(x.product_id);
      return `<tr class=" align-center">
                    <td class="align-middle"><img src="/static/upload/${
                      product.thumb
                    }" alt="image" width="50"></td>
                    <td class="align-middle">${product.name}</td>
                    <td class="align-middle">${x.quantity}</td>
                    <td class="align-middle">${convertToVND(x.unit_price)}</td>
                </tr>`;
    })
  );
  $('.loadAdmin').css('display','none')
  return html;
}

function rederStatus(status) {
  var html = `
    <div class="pb-3">
        <p>1. Đơn hàng đang chờ được xác nhận</p>
        <button data="2" name="status" class=" cursor-not-allowed btn btn${
          status > 1 ? "" : "-outline"
        }-primary mb-2"> ${
    status > 1 ? "Đã xác nhận" : "Xác nhận đơn hàng"
  }</button>
    </div>
    <div class="pb-3">
        <p>2. Đơn hàng đã được gửi đi</p>
        <button name="status" data="3"class="btn btn${
          status > 2 ? "" : "-outline"
        }-warning mb-2">${
    status > 2 ? "Đã gửi hàng đi" : "Gửi hàng cho shipper"
  }</button>
    </div>
    <div class="pb-3">
        <p>3. Đơn hàng đã được gửi đến tay khách hàng</p>
        <button name="status" data="4" class="btn btn${
          status > 3 ? "" : "-outline"
        }-success mb-2">Khách hàng đã nhận được hàng</button>
    </div>
    <div class="pb-3">
        <p>4. Đơn hàng đã bị hủy</p>
        <button name="status" data="0" class="btn btn${
          status == 0 ? "" : "-outline"
        }-dark mb-2"> ${
    status == 0 ? "Đơn hàng đã bị hủy" : "Xác nhận hủy đơn hàng"
  } </button>
    </div>
    <input type="hidden" name="status" value="${status}">
    `;

  return html;
}

function sumTotal(items, id) {
  let total = items.reduce((sum, item) => {
    if (item.order_id == id) {
      return sum + item.quantity * item.unit_price;
    } else {
      return sum;
    }
  }, 0);
  return total;
}

$(document).on("click", 'button[name="status"]', async function () {
  let id = $('input[name="idOrder"]').val();
  let status = $(this).attr("data");
  let formData = getValueUserOrder()
  formData.status = Number(status)
  var htmlStatus
  if (
    $('input[name="status"]').val() != 0 &&
    status == Number($('input[name="status"]').val()) + 1
  ) {
    htmlStatus = rederStatus(status);
    $(document).ready(function () {
      $("#status").html(htmlStatus);
    });
    updateOrder(id, formData);
  } else if ($('input[name="status"]').val() <= 2 && status == 0) {
    htmlStatus = rederStatus(status);
    $(document).ready(function () {
      $("#status").html(htmlStatus);
    });
    updateOrder(id, formData);
  }
});


$(document).on('click','.edit-order',function(){
  var elemetInput = document.querySelectorAll('.input')
  for (let i = 0; i < elemetInput.length; i++) {
    const element = elemetInput[i];
    element.classList.remove('no-border-outline')
    element.removeAttribute('readonly')
  }
  $(this).removeClass('edit-order').removeClass('btn-warning').addClass('update-order').addClass('btn-success')
  $(this).html('<i class="fa fa-wrench" aria-hidden="true"></i> Update')
})

$(document).on('click','.update-order',function(){
  var elemetInput = document.querySelectorAll('.input')
  for (let i = 0; i < elemetInput.length; i++) {
    const element = elemetInput[i];
    element.classList.add('no-border-outline')
    element.setAttribute('readonly',true)
  }
  $(this).removeClass('update-order').removeClass('btn-success').addClass('edit-order').addClass('btn-warning')
  $(this).html('<i class="fa fa-wrench" aria-hidden="true"></i> Edit')

  let id = $('input[name="idOrder"]').val();
  let formData = getValueUserOrder()
  updateOrder(id, formData);
})

function getValueUserOrder(){
  let formData = {
    customer_name: $('input[name="name"]').val(),
    customer_address: $('input[name="address"]').val(),
    customer_phone: $('input[name="phone"]').val(),
    customer_email: $('input[name="email"]').val(),
    created_date: formatDate($('input[name="date"]').val()),
    status: Number($('input[name="status"]').val()) 
  };
  return formData
}