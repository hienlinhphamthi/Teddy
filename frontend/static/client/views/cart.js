import AbstractView from "./AbstractView.js";
import $ from "jquery";

import { convertToVND} from "../../admin/data/connectData.js";
import {
  getItemLocal,
  getLocal,
  updateLocal,
  deleteItemCart,
} from "../components/localstorage.js";
import { getCoutCart } from "./home.js";
import { errPageCart } from "../components/errPage.js";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.params = params;
    this.setTitle("Viewing cart");
  }

  async getHtml() {
    var htmlListCart = renderCart();
    if (!htmlListCart) {
      return errPageCart();
    }
    sumTotal();
    var parma = "GIỎ hàng";
    return `
      <div class="container px-5 pt-5 pb-10 mx-auto lg:w-4/5">
        <h2 class="pb-5 uppercase text-sm">Trang chủ  >  ${parma}</h2>
        <h1 class="mb-5 text-center text-2xl font-bold">Cart Items</h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg md:w-2/3">
            ${htmlListCart}
        </div>
        <!-- Sub total -->
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700 sumTotal">0</p>
            </div>
            <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="text-gray-700">0</p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
                  <p class="text-sm text-gray-700 sumTotal">including VAT</p>
              </div>
            </div>
            <a data-link href="/check-out" class=" block text-center mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</a>
        </div>
        </div>
      </div>

        `;
  }
}

function renderCart() {
  var carts = getLocal();
  if (!carts) {
    return "";
  }
  var html = carts.map((item) => {
    var htmlItem = rederItemCart(item);
    return `
        <div class="idItemCart-${item.id} justify-between mb-4 border rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            ${htmlItem}
            </div>
        `;
  });
  return html.join("");
}
renderCart();

function rederItemCart(item) {
  return `
    
        <img src="/static/upload/${
          item.thumb
        }" alt="product-image" class="w-full rounded-lg sm:w-[110px]" />
        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
            <h2 class="text-lg font-bold text-gray-900">${item.name}</h2>
            <p class="mt-1 text-xs text-gray-700">${convertToVND(
              item.price
            )}</p>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div class="flex items-center border-gray-100">
                <span  data="${item.id}" class="uncrease cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input  data="${item.id}"  class="valueInput h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="${item.quantity}" min="1" max="9"/>
                <span   data="${item.id}" class="increase cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
            </div>
            <div class="flex items-center space-x-4">
                <p class="text-sm">${convertToVND(item.price * item.quantity)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data="${item.id}" class="deleteItemCart h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            </div>
        </div>
    
    `;
}

$(document).on("click", ".uncrease", async function () {
  var id = $(this).attr("data");
  var input = $(this).next();
  var value = Number(input.val());
  if (value > 1) {
    input.val(value - 1);
    await updateLocal(id, value - 1);
    var item = await getItemLocal(id);
    var htmlItem = rederItemCart(item);
    $(`.idItemCart-${id}`).html(htmlItem);
  } else {
    $(this).next().val(1);
  }
  sumTotal();
});

$(document).on("click", ".increase", async function () {
  var id = $(this).attr("data");
  var input = $(this).prev();
  var value = Number(input.val());
  if (value < 9) {
    input.val(value + 1);
    await updateLocal(id, value + 1);
    var item = await getItemLocal(id);
    var htmlItem = rederItemCart(item);
    $(`.idItemCart-${id}`).html(htmlItem);
  }
  sumTotal();
});

$(document).on("change", ".valueInput", async function () {
  var id = $(this).attr("data");
  var value = $(this).val();
  if (value > 0 && value < 10) {
    value
  } else if (value > 9) {
    $(this).val(9);
    value = 9;
  } else {
    $(this).val(1);
    value = 1;
  }

  await updateLocal(id, value);
  var item = await getItemLocal(id);
  var htmlItem = rederItemCart(item);
  $(`.idItemCart-${id}`).html(htmlItem);
  sumTotal();
});

$(document).on("click", ".deleteItemCart", function () {
    var id = $(this).attr("data");
    deleteItemCart(id)
    sumTotal();
    $(`.idItemCart-${id}`).remove()
    getCoutCart()
});

export function sumTotal() {
  var cart = getLocal();
  var total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
  $(document).ready(function () {
    var eleTotal = document.getElementsByClassName("sumTotal");
    eleTotal[0].innerHTML = convertToVND(total);

    if(eleTotal[1]){
        eleTotal[1].innerHTML = convertToVND(total);
    }
  });
  if(!total){
    $(document).ready(function(){
        $('#main').html(errPageCart())
    })
  }
  return total
}
