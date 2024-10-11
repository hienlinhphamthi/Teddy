import AbstractView from "../AbstractView.js";
import { getOrderDetail } from "../../data/orderDetail.js";
import { getOrder } from "../../data/order.js";
import { getProduct } from "../../data/product.js";
import { convertToVND } from "../../data/connectData.js";

import $ from "jquery";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.name;
    this.setTitle("Viewing Chart");
  }

  async getHtml() {
    var parma = "Thống kê số lượng sản phẩm đã bán";
    if (this.postId == "so-luong-ban-ra") {
      renderSoLuong();
    } else if (this.postId == "danh-thu") {
      renderDanhThu();
      parma = "Thống kê danh thu theo ngày";
    }

    return `
        <h2>${parma}</h2>
        <canvas id="myChart" style="width:100%;max-width:800px"></canvas>
        <div class="listChart py-3">
          
        </div>
        <h4 class="sumChart"></h4>
        `;
  }
}

function rederChartDanhThu(xValues, yValues) {
  $(document).ready(function () {
    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues,
          },
        ],
      },
      options: {
        legend: { display: false },
        scales: {},
      },
    });
  });
}

function rederChart(xValues, yValues) {
  $(document).ready(function () {
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145",
      "#ed7445",
      "#evd445",
      "#abc445",
      "#2is445",
      "#cs1445",
    ];

    new Chart("myChart", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: {
        title: {
          display: true,
        },
      },
    });
  });
}

async function getValueOrderDetail() {
  var orders = await getOrder();
  //Lấy ra những order đã được xác nhận
  orders = orders.filter((item) => {
    return item.status > 1;
  });
  var orderDetail = await getOrderDetail();
  let matchingOrderDetails = [];

  //Lấy ra những order-detail thuộc những phần tử của bảng order đã đc xác nhận
  for (let order of orders) {
    for (let detail of orderDetail) {
      if (order.id === detail.order_id) {
        detail = {
          created_date: order.created_date,
          ...detail,
        };
        matchingOrderDetails.push(detail);
      }
    }
  }

  //Thêm tên sản phẩm vào mảng
  var data = [];
  var produts = await getProduct();
  matchingOrderDetails.map((item) => {
    produts.forEach((element) => {
      if (element.id == item.product_id) {
        item = {
          name: element.name,
          ...item,
        };
        data.push(item);
      }
    });
  });
  return data;
}

async function renderSoLuong() {
  $('.loadAdmin').css('display','block')

  var details = await getValueOrderDetail();
  //Gọp những sản phẩm giống id
  let quantityByProductId = {};
  let newData = [];
  let seenProductId = {};

  for (let item of details) {
    if (quantityByProductId[item.product_id]) {
      quantityByProductId[item.product_id] += item.quantity;
    } else {
      quantityByProductId[item.product_id] = item.quantity;
    }
  }

  for (let item of details) {
    if (!seenProductId[item.product_id]) {
      let newItem = { ...item };
      newItem.quantity = quantityByProductId[item.product_id];
      newData.push(newItem);
      seenProductId[item.product_id] = true;
    }
  }

  $('.loadAdmin').css('display','none')

  //reder giao diện
  var name = newData.reduce((resu, item) => {
    resu.push(item.name);
    return resu;
  }, []);
  var value = newData.reduce((resu, item) => {
    resu.push(item.quantity);
    return resu;
  }, []);
  var sumChart = 0;
  var eleTr = newData.map((item, index) => {
    sumChart += item.quantity;
    return `<tr>
              <th scope="row">${index + 1}</th>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
            </tr>
          `;
  });
  var table = `<table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng bán ra</th>
                  </tr>
                </thead>
                <tbody>
                  ${eleTr.join("")}
                </tbody>
              </table>`;
  document.querySelector(".listChart").innerHTML = table;
  document.querySelector(
    ".sumChart"
  ).innerHTML = `Tổng số lượng sản phẩm bán ra: ${sumChart}`;
  rederChart(name, value);
}
 
export async function renderDanhThu() {
  $('.loadAdmin').css('display','block')

  var orders = await getValueOrderDetail();
  //thêm tổng số tiền và xóa đi những phần tử có ngày giống nhau
  let newData = orders.reduce((accumulator, current) => {
    current = {
      sum: current.unit_price * current.quantity,
      ...current,
    };
    let existingItem = accumulator.find(
      (item) => item.created_date === current.created_date
    );
    if (existingItem) {
      existingItem.quantity += current.quantity;
      existingItem.sum += current.unit_price * current.quantity;
    } else {
      accumulator.push({ ...current });
    }
  $('.loadAdmin').css('display','none')

    return accumulator;
  }, []);

  //Xếp xếp giảm dần ngày
  newData = newData.sort((a, b) => {
    let dateA = new Date(formatDate2(a.created_date));
    let dateB = new Date(formatDate2(b.created_date));

    return dateB - dateA;
  });

  //render giao dien
  var eleTr = newData.map((item, index) => {
    return `<tr>
              <th scope="row">${index + 1}</th>
              <td>${item.created_date}</td>
              <td>${convertToVND(item.sum)}</td>
            </tr>
    `;
  });
  var table = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ngày mua</th>
          <th scope="col">Số tiền</th>
        </tr>
      </thead>
      <tbody>
        ${eleTr.join("")}
      </tbody>
    </table>
  `;
  $(".listChart").html(table);

  var sum = newData.reduce((cur, item) => {
    return (cur += item.sum);
  }, 0);
  $(".sumChart").html(`Tổng số danh thu: ${convertToVND(sum)}`);

  //Lấy 7 ngày đầu tiên,
  newData = newData.slice(0, 6);
  newData = newData.sort((a, b) => {
    let dateA = new Date(formatDate2(a.created_date));
    let dateB = new Date(formatDate2(b.created_date));

    return dateA - dateB;
  });
  var arrDate = newData.map((item) => {
    return item.created_date;
  });
  var arrPirce = newData.map((item) => {
    return item.sum;
  });
  rederChartDanhThu(arrDate, arrPirce);
}

function formatDate2(dateString) {
  var dateParts = dateString.split("-");
  return dateParts[1] + "-" + dateParts[0] + "-" + dateParts[2];
}
