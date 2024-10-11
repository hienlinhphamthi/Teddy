import AbstractView from "../AbstractView.js";
import { getOrder, checkStatus } from "../../data/order.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Order");
  }

  async getHtml() {
    var htmlListOrder = await rederOrder()
    return `
      <div class="d-flex gap-2">
        <label for="countries" class="block mb-2 text-sm ">Xem theo tình trạng: </label>
        <select class=" px-2 py-1 rounded chooseStatus" aria-label="Default select example">
          <option value="99">Tất cả</option>
          <option value="1">Đang chờ xác nhận</option>
          <option value="2">Đơn hàng đã được xác nhận</option>
          <option value="3">Đang gửi đến khách hàng</option>
          <option value="4">Đã gửi thành công</option>
          <option value="0">Đơn hàng đã bị hủy</option>
        </select>
        <button class="px-2 py-1 btnRenderOrder rounded bg-success border-0 text-white">Xác nhận</button>
      </div>
        <table class="table">
            <thead  class=" align-center">
                <tr>
                    <th class="align-middle" scope="col">Name</th>
                    <th class="align-middle text-center" scope="col">Email</th>
                    <th class="align-middle text-center" scope="col">Created_date</th>
                    <th class="align-middle px-5" scope="col">Status</th>
                    <th class="align-middle text-center" scope="col"></th>
                </tr>
            </thead>
            <tbody id="listOrder">
                ${htmlListOrder}
            </tbody>
        </table>

        `;
  }
}

async function rederOrder(index = 99) {
  $('.loadAdmin').css('display','block')
  let orders = await getOrder();
  if(index != 99){
    orders = orders.filter(item=>{
      return Number(item.status) == Number(index)
    })
  }
  var html =  listOrder(orders);
  $('.loadAdmin').css('display','none')
  return html
}

function listOrder(orders) {
  var element = orders.map((item) => {
    return itemOrder(item);
  });
  return element.join('')
}

function itemOrder(item) {
  var { id, customer_name, customer_email, created_date, status } = item;
  return `<tr class="idOrder${id} align-center">

                <td class="align-middle">${customer_name}</td>
                <td class="align-middle text-center">${customer_email}</td>
                <td class="align-middle text-center">${created_date}</td>
                <td class="align-middle ">${checkStatus(status)}</td>
                <td class="align-middle text-center">
                    <a href="/order/${id}" data-link type="button" class=" btn btn-success">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        Detail
                    </a>
                </td>
                
            </tr>`;
}

$(document).on('click','.btnRenderOrder',async function(){
  var startus = $('.chooseStatus').val()
  var html = await rederOrder(startus)
  console.log(html);

  $('#listOrder').html(html)
})