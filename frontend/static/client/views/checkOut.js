import AbstractView from "./AbstractView.js";
import { getCity, getDistrict,getWard,getDateNow } from "../../admin/data/connectData.js";
import {   getLocal ,deleteLocal } from "../components/localstorage.js";
import { convertToVND,formatDate } from "../../admin/data/connectData.js";
import { sumTotal } from "./cart.js";
import { createOrder } from "../../admin/data/order.js";
import { createOrder_detail } from "../../admin/data/orderDetail.js";
import { router } from "../index.js";
import errPage from "../components/errPage.js";
import $ from "jquery";
import Validator from "../../admin/data/validate.js";
import { getUserByID } from "../../admin/data/user.js";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing Check out");
  }
  async getHtml() {

    var htmlCart = rederListCart()
    if(!htmlCart){
        return errPage()
    }
    renderValueUser()
    var total = sumTotal()

    return `
    <!-- Component Start -->
    <div class="container px-5 pt-5 pb-10 mx-auto lg:w-4/5">
    <h2 class="pb-5 uppercase text-sm">Trang chủ  > Cart >  Check out</h2>
    <h1 class="mb-5 text-center text-2xl font-bold"> Check out</h1>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg m-auto">
		<div class="lg:col-span-2">
			<div class="bg-white rounded-md mt-4 shadow-lg border px-4 pb-6 pt-2 flex flex-col gap-2">
                <h2 class=" text-xl font-bold py-4">Payment information</h2>
                <div class=" grid grid-cols-2 gap-4">
                    <div>
                        <label for="customer_name" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <div class="mt-2">
                        <input type="text" name="customer_name" id="customer_name" autocomplete="customer_name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <label for="customer_email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2">
                        <input type="text" name="customer_email" id="customer_email" autocomplete="customer_email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
                        </div>
                    </div>
                </div>
                <div class=" grid grid-cols-2 gap-4">
                    <div>
                        <label for="customer_phone" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                        <div class="mt-2">
                        <input type="text" name="customer_phone" id="customer_phone" autocomplete="customer_phone" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <label for="" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                        <div class="mt-2">
                            <select id="city" name="city" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
                                <option value="" selected>Chọn tỉnh thành</option>           
                            </select>
                        </div>
                    </div>
                </div>
                <div class=" grid grid-cols-2 gap-4">
                    <div>
                        <label for="" class="block text-sm font-medium leading-6 text-gray-900">District</label>
                        <div class="mt-2">
                            <select id="district" name="district" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
                                <option value="" selected>Chọn quận huyện</option>           
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="" class="block text-sm font-medium leading-6 text-gray-900">Ward</label>
                        <div class="mt-2">
                            <select id="ward" name="ward" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
                                <option value="" selected>Chọn phường xã</option>           
                            </select>
                        </div>
                    </div>
                </div>
                <div class=" ">
                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <div class="mt-2">
                        <input type="text" name="customer_address" id="customer_address" autocomplete="customer_address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class=" ">
                    <h2 class="block text-sm font-medium leading-6 text-gray-900">Payment method</h2>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input class="" type="radio" name="payment" id="radioDefault01"  />
                        <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault01">
                            Payment on delivery
                        </label>
                        <div data="hihi"  class="hidden">
                        </div>
                    </div>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input class="" type="radio" name="payment" id="radioDefault02"  />
                        <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault02">
                            Online payment
                        </label>
                        <div class="hidden border-t py-2 my-2 item-payment1">
                            <a href="" data-link><img class="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"></a>
                        </div>
                    </div>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input class="" type="radio" name="payment" id="radioDefault03"  />
                        <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault03">
                            Credit card payment
                        </label>
                        <div data="item-payment2" class="hidden border-t py-2 my-2 item-payment2">
                            <a href="" data-link><img class="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"></a>
                        </div>
                    </div>
                </div>
			</div>
		</div>
		<div>
			<div class="bg-white  rounded-md mt-4 shadow-lg py-2 px-4 border">
                <h2 class=" text-xl font-bold py-4">Order Sumary</h2>
                <div class="flex flex-col gap-3">
                    ${htmlCart}
                    
                </div>
                <div class=" border-t mt-4 py-4">
                    <div class="flex justify-between">
                        <p class="text-lg font-bold">Total</p>
                        <div class="">
                            <p class="text-lg font-bold  text-gray-700 sumTotal">${total}</p>
                        </div>
                    </div>
                    <button class="pay-now block text-center mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Pay now</button>
                </div>
			</div>
		</div>
	</div>
	<!-- Component End  -->
    </div>
	
        `;
  }
}

async function renderValueUser(){
    var idUser = sessionStorage.getItem("idUserLogin");
    if(idUser){   
        var user = await getUserByID(idUser);
        $('input[name="customer_name"]').val(user.name)
        $('input[name="customer_email"]').val(user.email)
        $('input[name="customer_phone"]').val(user.phone)
    }
}


async function callAPIAddress(){
    var citis = await getCity()
    rederAddress(citis,'city')
}
callAPIAddress()

function rederAddress(items, select){
    var row =' <option disable value="">Chọn</option>';
    items.forEach(element => {
        row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`
    });
    $(document).ready(function(){
        $(`#${select}`).html(row)
    })
}

$(document).on('change','#city',async function(){
    var id = $("#city").find(':selected').data('id')
    var districts = await getDistrict(id)
    rederAddress(districts,'district')
})

$(document).on('change','#district',async function(){
    var id = $("#district").find(':selected').data('id')
    var ward = await getWard(id)
    rederAddress(ward,'ward')
})

function rederListCart(){
    var itemCart = getLocal() 
    if(!itemCart){
        return ``
    }
    var html = itemCart.map(item=>{
        return `<div class="flex gap-2">
                    <div class="w-1/4 flex-1">
                        <img class="w-full" src="/static/upload/${item.thumb}">
                    </div>
                    <div class="w-3/4">
                        <p class="  truncate w-full font-semibold">${item.name}</p>
                        <p class=" text-sm text-gray-500">x${item.quantity}</p>
                        <p class=" ">${convertToVND(item.price * item.quantity)}</p>
                    </div>
                </div>`
    })
    return html.join('')
}


$(document).on('change','input[name="payment"]',function(){
    var elemet = $(this).next().next()
    if(elemet.attr('data') == 'item-payment2'){
        $('.item-payment2').slideDown();
        $('.item-payment1').slideUp();
    }else if(elemet.attr('data') == 'hihi'){
        $('.item-payment2').slideUp();
        $('.item-payment1').slideUp();
    }else{
        $('.item-payment2').slideUp();
        $('.item-payment1').slideDown();
    }
})

$(document).on('change','select[name="city"], select[name="district"], select[name="ward"]',function(){
    var value = $(this)
    Validator.valSelect(value)
})

$(document).on('keyup','input[name="customer_name"]',function(){
    var value = $(this)
    Validator.valName(value)
})

$(document).on('keyup','input[name="customer_email"]',function(){
    var value = $(this)
    Validator.valEmail(value)
})

$(document).on('keyup','input[name="customer_phone"]',function(){
    var value = $(this)
    Validator.valPhone(value)
})

$(document).on('keyup','input[name="customer_address"]',function(){
    var value = $(this)
    Validator.valNull(value)
})

$(document).on('click','.pay-now',async function(){
    var name = $('input[name="customer_name"]')
    var email = $('input[name="customer_email"]')
    var phone = $('input[name="customer_phone"]')
    var city = $('select[name="city"]')
    var district = $('select[name="district"]')
    var ward = $('select[name="ward"]')
    var address = $('input[name="customer_address"]')
    if(Validator.valName(name) && Validator.valEmail(email) && Validator.valPhone(phone)
    && Validator.valSelect(city) && Validator.valSelect(district) 
&& Validator.valSelect(ward) && Validator.valNull(address)){
        address = `${address.val()} , ${ward.val()}, ${district.val()} , ${city.val()}`
        let date =  getDateNow();
        date= formatDate(date)
        var dataOrder = {
            customer_name: name.val(),
            customer_email: email.val(),
            customer_phone: phone.val(),
            customer_address: address,
            created_date: date,
            status: 1,
        }
        var order = await createOrder(dataOrder)
        var listCart = await getLocal()
        for (let i = 0; i < listCart.length; i++) {
            var dataOrder_detail = {
                order_id: order.id,
                product_id: listCart[i].id,
                quantity: listCart[i].quantity,
                unit_price: listCart[i].price
            }
            createOrder_detail(dataOrder_detail)
        }
        await deleteLocal()
        $('.countCart').html('0')
        history.pushState(null, null, '/thanks');
        router();
    }
})