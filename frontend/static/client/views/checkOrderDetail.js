import AbstractView from "./AbstractView.js";
import { checkStatus, getOrderByID } from "../../admin/data/order.js";
import { getOrderDetail } from "../../admin/data/orderDetail.js";
import { convertToVND } from "../../admin/data/connectData.js";
import { getProductByID } from "../../admin/data/product.js";
import { updateOrder } from "../../admin/data/order.js";
import { router } from "../index.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing detail Order");
  }

  async getHtml() {
    var id = this.postId;
    var info = await getInfo(id);
    let {
      customer_name,
      customer_address,
      customer_phone,
      customer_email,
      status,
      created_date,
    } = info;
    let products =await renderProduct(id);
    return `
    <div class="container px-5 pt-5 pb-10 mx-auto lg:w-4/5">
        <h2 class="pb-5 uppercase text-sm">Trang chủ  > Tra cứu đơn hàng > Chi tiết đơn hàng</h2>
        <div class="bg-repeat-x bg-contain bg-bottom rounded shadow-lg border">
            <h1 class="py-2 px-6 text-lg font-bold border-b text-gray-700">Chi tiết đơn hàng</h1>
            <div class=" flex py-4 px-6 justify-between flex-wrap">
                <div>
                    <p class="font-bold">Mã đơn hàng: ${id}</p>
                    <p>Đặt hàng: ${created_date}</p>
                    <p>Tình trạng đơn hàng: ${checkStatus(status)}</p>
                </div>
                <div class="flex items-center justify-center gap-12 lg:pr-7 pr-0">
                    <div class=" flex flex-col text-center items-center gap-2">
                        <div class=" relative w-10 h-10 flex justify-center items-center ${
                          status > 0 ? "bg-[--blue]" : "bg-gray-400"
                        } rounded-full">
                            <img class=" w-7" style="filter: brightness(0) invert(1);
                            -webkit-filter: brightness(0) invert(1);" src="https://cdn-icons-png.flaticon.com/512/714/714456.png?ga=GA1.1.1979104555.1696413295">
                            <div class=" absolute h-0.5 w-20 ${
                              status > 1 ? "bg-[--blue]" : "bg-gray-400"
                            } top-1/2 left-[120%]"></div>
                        </div>
                        <p class=" text-sm">Chờ xác nhận</p>
                    </div>
                    <div class=" flex flex-col text-center items-center gap-2 pl-2">
                        <div class=" relative w-10 h-10 flex justify-center items-center ${
                          status > 1 ? "bg-[--blue]" : "bg-gray-400"
                        } rounded-full">
                            <img class=" w-7" style="filter: brightness(0) invert(1);
                            -webkit-filter: brightness(0) invert(1);" src="https://cdn-icons-png.flaticon.com/512/1092/1092202.png?ga=GA1.1.1979104555.1696413295">
                            <div class=" absolute h-0.5 w-20 ${
                              status > 2 ? "bg-[--blue]" : "bg-gray-400"
                            } top-1/2 left-[120%]"></div>
                        </div>
                        <p class=" text-sm">Đã xác nhận</p>
                    </div>
                    <div class=" flex flex-col text-center items-center gap-2">
                        <div class=" relative w-10 h-10 flex justify-center items-center ${
                          status > 2 ? "bg-[--blue]" : "bg-gray-400"
                        } rounded-full">
                            <img class=" w-7" style="filter: brightness(0) invert(1);
                            -webkit-filter: brightness(0) invert(1);" src="https://cdn-icons-png.flaticon.com/512/709/709790.png?ga=GA1.1.1979104555.1696413295">
                            <div class=" absolute h-0.5 w-20 ${
                              status > 3 ? "bg-[--blue]" : "bg-gray-400"
                            } top-1/2 left-[120%]"></div>
                        </div>
                        <p class=" text-sm">Đang vận chuyển</p>
                    </div>
                    <div class=" flex flex-col text-center items-center gap-2">
                        <div class=" relative w-10 h-10 flex justify-center items-center ${
                          status > 3 ? "bg-[--blue]" : "bg-gray-400"
                        } rounded-full">
                            <img class=" w-7" style="filter: brightness(0) invert(1);
                            -webkit-filter: brightness(0) invert(1);" src="https://cdn-icons-png.flaticon.com/512/1337/1337232.png?ga=GA1.1.1979104555.1696413295">
                            <div class=" absolute h-0.5 w-20 ${
                              status > 3 ? "bg-[--blue]" : "bg-gray-400"
                            } top-1/2 left-[120%]"></div>
                        </div>
                        <p class=" text-sm">Đã giao hàng</p>
                    </div>

                    <div class=" flex flex-col text-center items-center gap-2 pl-5">
                        <div class=" relative w-10 h-10 flex justify-center items-center ${
                          status > 3 ? "bg-[--blue]" : "bg-gray-400"
                        } rounded-full">
                            <img class=" w-7" style="filter: brightness(0) invert(1);
                            -webkit-filter: brightness(0) invert(1);" src="https://cdn-icons-png.flaticon.com/512/7191/7191281.png?ga=GA1.1.1979104555.1696413295">
                        </div>
                        <p class=" text-sm">Hoàn tất</p>
                    </div>
                </div>
            </div>
            <div class=" py-4 px-6 border-t flex justify-between gap-5">
                
                <div class=" w-full">
                    <h2 class=" font-bold  pb-4">Thông tin khách hàng</h2>
                        <div class=" text-sm text-right  flex flex-col gap-1 w-full">
                            <p class=" flex">
                                <lable class=" flex items-center w-16">Tên:</lable> 
                                <input type="text" name="name" class="changeInfo py-1 w-full no-border-outline rounded-md" value="${customer_name}"  readonly>
                            </p>
                            <p class=" flex">
                                <lable class=" flex items-center w-16">Email:</lable> 
                                <input type="email" name="email"  class="changeInfo py-1  w-full  input no-border-outline rounded-md" value="${customer_email}"  readonly> 
                            </p>
                            <p class=" flex">
                                <lable class=" flex items-center w-16">Phone:</lable>  
                                <input type="text" name="phone"  class="changeInfo py-1  w-full  input no-border-outline rounded-md" value="${customer_phone}"  readonly>
                            </p>
                            <p class=" flex">
                                <lable class=" flex items-center w-16">Địa chỉ:</lable>
                                <input type="text"  name="address" class="changeInfo py-1 w-full input no-border-outline rounded-md" value="${customer_address}"  readonly> 
                            </p>
                            <input type="hidden" name="idOrder"  value="${id}"  readonly> 
                        </div>
                    <div class="  pt-6 pb-2">
                        <button class="${
                          status == 1
                            ? "hover:bg-gray-200 huy-don"
                            : "cursor-no-drop hover:bg-none"
                        }  py-2 px-4 rounded-md border ">Hủy đơn hàng</button>
                    </div>
                </div>
                <div class=" w-full flex flex-col items-end">
                    <h2 class="  font-bold pb-4">Thông tin sản phẩm</h2>
                    ${products}
                    <h2 class="sumTotal font-bold "> </h2>
                </div>
            </div>
        </div>
    </div>
        `;
  }
}

async function renderProduct(id) {
  var details = await getOrderDetail();
  var listDetals = details.filter((item) => {
    return item.order_id == id;
  });

  var total = listDetals.reduce((cout,item)=>{
    return cout = cout + (item.quantity * item.unit_price)
  },0)
  $('.sumTotal').html(`Tổng cộng : ${convertToVND(total)}`)

  var html = await Promise.all(
    listDetals.map((item) => {
      return getItemProduct(item);
    })
  )

    return html.join('')
}

async function getItemProduct(item) {
  var product = await getProductByID(item.product_id);
  var html = `<div class=" flex gap-2 pb-4  text-sm">
                    <div class=" w-[60px]">
                        <img class="w-full rounded shadow" src="/static/upload/${
                          product.thumb
                        }">
                    </div>
                    <p class=" font-semibold w-[160px] truncate">${
                      product.name
                    }</p>
                    <p class="">x ${item.quantity}</p>
                    <p class=" pl-4">${convertToVND(product.price)}</p>
                </div>`;
  return html;
}

async function getInfo(id) {
  var order = await getOrderByID(id);
  return order;
}

$(document).on("click", ".huy-don", async function () {
  let id = $('input[name="idOrder"]').val();
  var order = await getOrderByID(id);
  if (order.status == 1) {
    var formData = {
      status: 0,
    };
    updateOrder(id, formData);
    alert("thanh cong");
    history.pushState(null, null, "/check-order/" + id);
    router();
  } else {
    alert("Thất bại");
  }
});

$(document).on('click','input.changeInfo',function(){
    $(this).removeAttr('readonly')
    $(this).removeClass('no-border-outline')
})

$(document).on('blur','input.changeInfo',function(){
    $(this).prop('readonly', true);
    $(this).addClass('no-border-outline')
})

$(document).on('change','input.changeInfo',function(){
    $(this).prop('readonly', true);
    $(this).addClass('no-border-outline')

    var name = $(this).attr('name')
    var key = `customer_${name}`
    var value = $(`input[name=${name}]`).val()
    let id = $('input[name="idOrder"]').val();

    var formatDate ={
        [key]: value
    }

    updateOrder(id, formatDate);
})