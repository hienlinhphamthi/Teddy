import AbstractView from "./AbstractView.js";
import { getOrder, checkStatus  } from "../../admin/data/order.js";
import { getOrderDetail  } from "../../admin/data/orderDetail.js";
import { convertToVND } from "../../admin/data/connectData.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("viewing check order");
  }

  async getHtml() {
    return `
    <div class="container px-5 pt-5 pb-10 mx-auto lg:w-4/5">
    <h2 class="pb-5 uppercase text-sm">Trang chủ  > Tra cứu đơn hàng</h2>
        <div class="bg-repeat-x bg-contain bg-bottom text-center p-10 rounded shadow-lg bg-[url('https://thuthuatnhanh.com/wp-content/uploads/2022/02/Anh-nen-We-Bare-Bear-xanh-ombre.jpg')]">
            <h1 class="mb-6 text-3xl font-bold text-gray-700">Tra cứu đơn hàng</h1>
            <input type="text" name="email" placeholder="Nhập email của bạn..." class="mb-4 w-full px-3 py-2 border border-gray-300 rounded">
            <input type="text" name="phone" placeholder="Nhập số điện thoại của bạn..." class="mb-4 w-full px-3 py-2 border border-gray-300 rounded">
            <button class="getOrderByEmail w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Tra cứu</button>
            <div class="mt-6 border p-20 border-gray-300 rounded list-order">
                <div class=" flex flex-col  bg-white">
                    
                </div>
            </div>
        </div>
    </div>
        `;
  }
}

$(document).on('click','.getOrderByEmail',async function(){
    var orders =await getOrder()
    var email = $('input[name=email]').val();
    var phone = $('input[name=phone]').val();
    var listOrders = orders.filter(item=>{
        return (item.customer_email.trim() == email.trim() 
        && item.customer_phone.trim() == phone.trim() )
    })
    if(listOrders.length == 0){
        $('.list-order').addClass('bg-white bg-opacity-40')
        $('.list-order').html('<h2 class="mb-4 text-2xl font-bold text-black">Không tìm thấy đơn hàng nào</h2>')
    }else{
        $('.list-order').addClass('bg-white  bg-opacity-90').removeClass('p-20')
        var table =await getTable(listOrders)
        $('.list-order').html(table)
    }
    
})

async function getTable(listOrders){
    var eleTr = ''
    for (let i = 0; i < listOrders.length; i++) {
        const item = listOrders[i];
        var html= await getEleTr(item)
        eleTr = eleTr+html
    }
    var eleTale = `
    <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Mã đơn hàng
                </th>
                <th scope="col" class="px-6 py-3">
                    Biên nhận
                </th>
                <th scope="col" class="px-6 py-3">
                    Tổng chi phí
                </th>
                <th scope="col" class="px-6 py-3">
                    Ngày đặt
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            ${eleTr}
        </tbody>
    </table>
    `
    return eleTale
}

async function getEleTr(item){
    var totail = await getTotal(item)
    var eleTr = `<tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <p class=" text-blue-500 font-semibold">${item.id}</p>
                        <p class=" text-orange-400">${checkStatus(item.status)}</p>
                    </th>
                    <td class="px-6 py-4">
                        <p class=" text-blue-500">${item.customer_name}</p>
                        <p class="">${item.customer_phone}</p>
                    </td>
                    <td class="px-6 py-4">
                        ${convertToVND(totail)}
                    </td>
                    <td class="px-6 py-4">
                        ${item.created_date}
                    </td>
                    <td class="px-6 py-4 ">
                        <a href="/check-order/${item.id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chi tiết</a>
                    </td>
                </tr>`
    return eleTr
}

async function getTotal(order){
    var orderDetals = await getOrderDetail()
    orderDetals = orderDetals.filter(item=>{
        return item.order_id == order.id
    })
    var totail = orderDetals.reduce((res,item)=>{
        return res = res + (item.quantity * item.unit_price)
    },0)
    return totail
}