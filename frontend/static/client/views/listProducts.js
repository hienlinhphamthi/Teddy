import AbstractView from "./AbstractView.js";
import {
  getProduct,
  getProductByIDCategory,
} from "../../admin/data/product.js";
import { getCategory, getCategoryByID } from "../../admin/data/category.js";
import { rederItemProduct } from "./home.js";
import { convertToVND, removeVietnameseTones } from "../../admin/data/connectData.js";
import errPage from "../components/errPage.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.params = params;
    this.setTitle("Viewing detail Product");
  }

  async getHtml() {
    var htmlProducts = "",
      parma = "Tất cả sản phẩm";
    if (this.params.idCategory) {
      htmlProducts = await rederProduct({ id: this.params.idCategory });
      var category = await getCategoryByID(this.params.idCategory);
      parma = category.name;
    } else if (this.params.search) {
      htmlProducts = await rederProduct({ search: String(this.params.search) });
      parma = this.params.search;
    } else {
      htmlProducts = await rederProduct();
    }
    if (!htmlProducts) {
      return errPage();
    }
    var htmlCategory = await rederCategory();
    rangeInput()
    return `
    <!-- component -->
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 pt-5 pb-10 mx-auto lg:w-4/5">
        <h2 class="pb-10 uppercase text-sm">Trang chủ  >  ${parma}</h2>
        <div class="flex gap-3">
          <div class="w-3/12 border-r border-r-[--rose-1]">
            <div class="flex flex-col gap-4">
              <h2 class="pb-2 text-2xl font-bold text-[--rose-2]">DANH MỤC SẢN PHẨM</h2>
              <a href="/list-products" class=" hover:text-[--rose-1]" data-link>Tất cả sản phẩm<i class="fa fa-chevron-right pl-2" aria-hidden="true"></i></a>
              ${htmlCategory}
            </div>
            <div>
              <h2 class="pb-2 text-xl pt-10">Lọc sản phẩm theo giá</h2>
              <div class=" relative my-4 h-3 w-[80%] ">
                <div class=" absolute top-0 h-3 bg-gray-400 left-2 right-2 rounded-lg pl-2">
                  <div class="line absolute left-0 right-0 top-0 h-3 bg-[--blue] rounded-lg" id="line" ></div>
                  <span class="thumb absolute z-10 text-left border bg-white shadow-md outline-none top-[-2px] h-4 w-4 ml-[-10] rounded-full left-[0px]" id="thumbMin" ></span>
                  <span class="thumb absolute z-10 text-left border bg-white shadow-md outline-none top-[-2px] h-4 w-4 ml-[-10] rounded-full left-[94%]" id="thumbMax" ></span>
                </div>
                <input id="rangeMin" class="input-range absolute appearance-none pointer-events-none z-20 h-1 top-0 w-full opacity-0 m-0" type="range" max="100" min="0" step="1" value="0">
                <input id="rangeMax" class="input-range absolute appearance-none pointer-events-none z-20 h-1 top-0 w-full opacity-0 m-0" type="range" max="100" min="0" step="1" value="100">
              </div>
              <div class="input-display my-4 w-60 flex justify-between">
                <span id="min">0 VND</span>
                <span id="max">1.000.000 VND</span>
              </div>
              <div>
                <button  class="renderRangeInput px-4 py-2 rounded-md shadow text-white bg-[--blue] hover:bg-[--rose-1]">Đồng ý</button>
              </div>
            </div>
          </div>
          <div class="w-9/12">
            <div class="grid grid-cols-4 gap-5" id="list-products">
              ${htmlProducts}
            </div>
          </div>
        </div>

      </div>
    </section>

        `;
  }
}

var newObjProduct =[]
async function rederCategory() {
  var products = await getProduct();
  var categorys = await getCategory();
  var list = categorys.filter((itemCate) => {
    var item = products.find((itemPro) => {
      return itemCate.id == itemPro.cate_id;
    });
    return item;
  });
  var html = list.map((item) => {
    return `<a href="/list-products/idCategory=${item.id}" class=" hover:text-[--rose-1]" data-link>${item.name} <i class="fa fa-chevron-right pl-2" aria-hidden="true"></i></a>`;
  });
  return html.join("");
}

async function rederProduct(value = 0) {
  var products = await findProducts(value)
  newObjProduct = products
  var html = products.map((item) => {
    return rederItemProduct(item);
  });
  return html.join("");
}

async function findProducts(value){
  var products = [];
  if (value == 0) {
    products = await getProduct();
  } else if (value.id) {
    products = await getProductByIDCategory(value.id);
  } else if (value.search) {
    products = await getProduct();
    products = products.filter((item) => {
      var name = removeVietnameseTones(item.name);
      return name.includes(value.search);
    });
  }
  return products
}

// async function checkparmas(value){
//   var products = [];
//   if (value == 0) {
//     products = await getProduct();
//   } else if (value.id) {
//     products = await getProductByIDCategory(value.id);
//   } else if (value.search) {
//     products = await getProduct();
//     products = products.filter((item) => {
//       var name = removeVietnameseTones(item.name);
//       return name.includes(value.search);
//     });
//   }
//   return products
// }

function rangeInput() {
  $(document).ready(function () {
    let min = 0;
    let max = 94;

    const calcLeftPosition = (value) => (100 / (100 - 0)) * (value - 0);
    $("#rangeMin").on("input", function (e) {
      const newValue = parseInt(e.target.value);
      if (newValue > max) return;
      min = newValue;
      $("#thumbMin").css("left", calcLeftPosition(newValue) + "%");
      $("#min").html(convertToVND(newValue * 10000));
      $("#line").css({
        left: calcLeftPosition(newValue) + "%",
        right: 94 - calcLeftPosition(max) + "%",
      });
    });

    $("#rangeMax").on("input", function (e) {
      const newValue = parseInt(e.target.value);
      if (newValue < min) return;
      max = newValue;
      $("#thumbMax").css("left", calcLeftPosition(newValue) + "%");
      $("#max").html(convertToVND(newValue * 10000));
      $("#line").css({
        left: calcLeftPosition(min) + "%",
        right: 94 - calcLeftPosition(newValue) + "%",
      });
    });
  });
}

$(document).on('click','.renderRangeInput',async function(){
  var min = Number( $('#rangeMin').val()) * 10000
  var max = Number( $('#rangeMax').val()) * 10000

  var newProducts = newObjProduct.filter(item=>{
    return (item.price > min && item.price < max)
  })
  var html = newProducts.map(item=>{
    return rederItemProduct(item)
  })
  $('#list-products').html(html.join(''))
})