import AbstractView from "./AbstractView.js";
import slide from "../components/slide.js";
import { getProduct } from "../../admin/data/product.js";
import { getCategoryByID } from "../../admin/data/category.js";
import { convertToVND } from "../../admin/data/connectData.js";
import { getLocal, setLocalstorage } from "../components/localstorage.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
     rederProducts();
    return `${slide()}
            <div class=" container w-4/5 m-auto py-8" id="productsHome"> 
            </div>
        `;
  }
}

async function rederProducts() {
  var product = await getProduct();
  let groupedItem = product.reduce((result, item) => {
    (result[item.cate_id] = result[item.cate_id] || []).push(item);
    return result;
  }, []);
  var html = ''

  for (const key in groupedItem) {
    if (Object.hasOwnProperty.call(groupedItem, key)) {
      const element = groupedItem[key];
      var item = await rederRowProduct(element)
      html += item
    }
  }

  $(document).ready(function(){
    $('#productsHome').html(html)
  })
}


export async function rederRowProduct(items){
    if(!items){
        return  ``
    }else{
        var category = await getCategoryByID(items[0].cate_id)
        var htmlProduct = ''
        for (let i = 0; i < items.length; i++) {
                htmlProduct = htmlProduct + await rederItemProduct(items[i])
            if(i==3) break;
        }
        var btn ='';
        if(items.length>3){
            btn = `<div class=" text-center pt-3">
            <a data-link href="/list-products/idCategory=${items[0].cate_id}" class=" bg-[--rose-2] hover:bg-[--rose-1] text-white font-bold text-xl py-2 px-4 rounded-md">Xem tất cả ${category.name}</a>
            </div>`
        }
        var html = `<div class=" py-5">
                        <h2 class=" text-2xl font-extrabold text-[--rose-2] text-center pb-4 border-b border-[--blue]">${category.name}</h2>
                        <div class=" grid grid-cols-4 gap-8 py-5">
                            ${htmlProduct}
                        </div>
                        ${btn}
                    </div>`
        return html
    }
    
}

export function rederItemProduct(item){
    var html = `
    <div class=" flex flex-col hover:shadow-xl w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a data-link href="/detail-product/${item.id}">
                <img class="rounded-t-lg" src="/static/upload/${item.thumb}" alt="product image" />
            </a>
            <div class="px-5 pb-5 flex-1 flex flex-col pt-2">
                <a data-link href="/detail-product/${item.id}" class=" text-gray-900 block flex-1 text-center">
                    <h5 class=" text-base font-semibold tracking-tight dark:text-white">${item.name}</h5>
                </a>
                <div class="flex flex-col items-center justify-between pt-2">
                    <span class="text-base pb-2 font-bold text-[--rose-2] dark:text-white">${convertToVND(item.price)}</span>
                    <button  data="${item.id}" class="addCart text-white bg-[--rose-1] hover:bg-[--rose-2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[--rose-1] dark:focus:ring-[--rose-2]">Add to cart</button>
                </div>
            </div>
        </div>`
        return html
}

$(document).on('click','.addCart',async function(){
  var id = $(this).attr('data')
  await setLocalstorage(id)
  getCoutCart()
})

export function getCoutCart(){
  $(document).ready(async function(){
    var valueLocal = await getLocal()
    if(valueLocal){
      $('.countCart').html(valueLocal.length)
    }
  })
}
getCoutCart()