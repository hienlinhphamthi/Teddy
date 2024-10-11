import { getProduct } from "../../admin/data/product.js";
import { removeVietnameseTones } from "../../admin/data/connectData.js";
import { getUserByID } from "../../admin/data/user.js";
import { router } from "../index.js";
import $ from "jquery";

export default function header() {
        var userLogin = sessionStorage.getItem('idUserLogin')
        if(userLogin){
          let user = getUserByID(userLogin)
          user.then(x=>{
            $('.itemLogin').html('<i class="pr-1 fa fa-user-circle-o" aria-hidden="true"></i>'+x.name)
            $('.itemLogin').attr('href','/detail-user')
          })
        }
        return `
        <header>
          <div class="bg-white py-4">
            <div class="container lg:w-4/5 m-auto">
              <div class=" flex justify-between items-center gap-10">
                <div class="flex items-center">
                  <a href="/home" data-link><img class="w-[100px]" src="https://gaubongonline.vn/wp-content/uploads/2022/04/GBO_Original-120x80-1.png"></a>
                  <h2 class=" text-2xl font-bold text-[--blue]">GẤU BÔNG CU TE HẠT ME</h2>
                </div>
                <div class=" flex-1">
                  <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input type="search" name="search" id="default-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#FDAFBC] focus:border-[#FDAFBC] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FDAFBC] dark:focus:border-[#FDAFBC]" placeholder="Search Mockups, Logos..." required>
                      <button type="submit" class="btn-search text-white absolute right-0 top-0 bg-[#FDAFBC] hover:bg-[#FF6683] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 h-full dark:bg-blue-600 dark:hover:bg-[#FDAFBC] dark:focus:ring-[#FF6683]">Search</button>
                      <div>
                        <div class="z-[99] search absolute top-full left-0 py-1  w-full">
                          
                        </div>
                      </div>
                  </div>
                </div>
                <div class=" text-2xl font-bold text-[#FDAFBC]">
                  <i class="fa fa-phone" aria-hidden="true"></i>
                  0888999999
                </div>
              </div>
            </div>
          </div>
          <div class=" bg-[#FDAFBC] py-2 text-base uppercase ">
            <nav class="container lg:w-4/5 m-auto flex justify-between">
              <a href="/home" class="text-white relative hover:bg-[--rose-2]  hover:text-white px-4 rounded-md shadow-md py-1" data-link><i class="fa fa-home" aria-hidden="true"></i> trang chủ</a>
              <a href="/list-products/search=teddy" class="text-white relative hover:bg-[--rose-2]  hover:text-white px-4 rounded-md shadow-md py-1" data-link>bộ sưu tập gấu teddy</a>
              <a href="/list-products" class="text-white relative hover:bg-[--rose-2]  hover:text-white px-4 rounded-md shadow-md py-1" data-link>bộ sưu tập</a>
              <a href="/cart" class="text-white relative hover:bg-[--rose-2]  hover:text-white px-4 rounded-md shadow-md py-1" data-link>
                giỏ hàng <i class="fa fa-shopping-cart pl-2 text-xl" aria-hidden="true"></i> 
                <p class="countCart absolute top-[-10px] border right-[-20px] hover:bg-white h-6 w-6 rounded-full flex items-center justify-center bg-[white] text-[--rose-2]">0</p>
              </a>
              <a href="/check-order" class="text-white relative hover:bg-[--rose-2]  hover:text-white px-4 rounded-md shadow-md py-1" data-link>Tra cứu đơn hàng</a>
              <a href="/login" class="itemLogin text-white relative hover:bg-[--rose-2]  hover:text-white px-4 rounded-md shadow-md py-1" data-link>Đăng nhập</a>
            </nav>
          </div>
        </header>
        `;
}

$(document).on('keyup keyon','input[name=search]', async function(){
  var value = $(this).val()
  if(value){
    var products = await getProduct()
    products = products.filter(item=>{
      return removeVietnameseTones(item.name).includes(removeVietnameseTones(value))
    })
    if(products.length == 0){
      $('.search').html('')
      return
    }

    var itemProducts = '' 
    for (let i = 0; i < products.length; i++) {
      itemProducts = itemProducts + `<a href="/detail-product/${products[i].id}" data-link class=" items-center py-2 px-4 border-y flex gap-4">
      <img class=" w-[40px]" src="/static/upload/${products[i].thumb}">
      <span class="truncate">${products[i].name}</span>
    </a>`
    if(i==3) break
    }
    var html = `
          <div class=" bg-white border flex flex-col gap-1 p-2 w-full z-50">
          ${itemProducts}
        </div>
  `
    $('.search').html(html)
  }else{
    $('.search').html('')
  }
})

$(document).on('click','.btn-search',function(){
  var value = $('input[name=search]').val()
  value = removeVietnameseTones(value)
  $('.search').html('')
  $('input[name=search]').val('')
  history.pushState(null, null, '/list-products/search='+value);
  router();
})

window.onscroll = function(){
  $('.search').html('')
}