import AbstractView from "./AbstractView.js";
import { renderDanhThu } from "./chart/detailChart.js";
import { getOrder } from "../data/order.js";
import { getOrderDetail } from "../data/orderDetail.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
      
      renderDanhThu()
      var sumOrder = await getSumOrder()
      var sumProduct = await getSoLuongSanPhamBanRa()
        return `
        <div class="container-fluid">
        <!--  Row 1 -->
        <div class="row">
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row alig n-items-start">
                      <div class="col-8">
                        <h4 class="sumChart fw-semibold mb-3">Tổng số danh thu 999.999.999 VND</h4>
                        <div class="d-flex align-items-center pb-1">
                          <span
                            class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                            <i class="ti ti-arrow-down-right text-danger"></i>
                          </span>
                          <a data-link href="/chart/danh-thu" class="fs-3 mb-0">Xem chi tiết</a>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="d-flex justify-content-end">
                          <div
                            class="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                            <i class="ti ti-currency-dollar fs-6"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row alig n-items-start">
                      <div class="col-8">
                      <h4 class="sumOrder fw-semibold mb-3">Tổng số đơn hàng hoàn thành: ${sumOrder.length} đơn</h4>
                        <div class="d-flex align-items-center pb-1">
                          <span
                            class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                            <i class="ti ti-arrow-down-right text-danger"></i>
                          </span>
                          <a data-link href="/order"  class="fs-3 mb-0">Xem chi tiết</a>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="d-flex justify-content-end">
                          <div
                            class="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                            <i class="fa fa-check fs-6"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row alig n-items-start">
                      <div class="col-8">
                        <h4 class="fw-semibold mb-3">Tổng sản phẩm đã được bán ra: 
                        ${sumProduct} </h4>
                        <div class="d-flex align-items-center pb-1">
                          <span
                            class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                            <i class="ti ti-arrow-down-right text-danger"></i>
                          </span>
                          <a data-link href="/chart/so-luong-ban-ra"  class="fs-3 mb-0">Xem chi tiết</a>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="d-flex justify-content-end">
                          <div
                            class="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                            <i class="fa fa-shopping-bag fs-6"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 d-flex align-items-strech">
            <div class="card w-100">
              <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div class="mb-3 mb-sm-0">
                    <h5 class="card-title fw-semibold">Thống kê thu nhập trong tuần</h5>
                  </div>
                  <div>
                    <select class="form-select">
                      <option value="1">March 2023</option>
                      <option value="2">April 2023</option>
                      <option value="3">May 2023</option>
                      <option value="4">June 2023</option>
                    </select>
                  </div>
                </div>
                <canvas id="myChart" style="width:100%"></canvas>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="card p-0">
                  <div class="card-body p-0">
                    <div class=" alig n-items-start d-flex my-3 mx-3 ">
                        <h4 class="col-lg-8 fw-semibold card-title text-xl">Bình luận mới nhất </h4>
                        <a href="/comments"> Xem chi tiết</a>
                    </div>
                    <div>
                      <div class="border p-3">
                        <h6>hùng thành</h6>
                        <span>Quá đẹp</span>
                      </div>
                      <div class="border p-3">
                        <h6>lâm</h6>
                        <span>sản phẩm đẹp quá</span>
                      </div>
                      <div class="border p-3">
                        <h6>hii</h6>
                        <span>z sao</span>
                      </div>
                      <div class="border p-3">
                        <h6>Yến</h6>
                        <span>dễ thương quá trời</span>
                      </div>
                      <div class="border p-3">
                        <h6>Như</h6>
                        <span>Gấu này đẹp quá</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
        `;
    }
}


async function getSumOrder(){
  var orders = await getOrder()
  orders = orders.filter(item=>{
    return item.status == 4;
  })
  return orders
}

async function getSoLuongSanPhamBanRa(){
  var orders = await getSumOrder()
  var orderDetail = await getOrderDetail()
  var newOrder = orderDetail.filter(item=>{
    var found = false
    orders.forEach(element => {
      if(element.id == item.order_id){
        found = true
      }
    });
    return found;
  })
  var quantity = newOrder.reduce((result,item)=>{
    return result = result + Number(item.quantity)
  },0)
  return quantity
}
