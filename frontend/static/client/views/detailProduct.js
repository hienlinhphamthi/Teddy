import AbstractView from "./AbstractView.js";
import {
  getProductByID,
  getProductByIDCategory,
} from "../../admin/data/product.js";
import { rederRowProduct } from "./home.js";
import { convertToVND, getDateNow } from "../../admin/data/connectData.js";
import {
  getComments,
  createComment,
  getCommentByID,
} from "../../admin/data/comment.js";
import Validator from "../../admin/data/validate.js";
import $ from "jquery";
import { getUserByID } from "../../admin/data/user.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing detail Product");
  }

  async getHtml() {
    var listComment = await rederFirstComment(this.postId);
    var product = await getProductByID(this.postId);
    var similar = await rederSimilar(product.cate_id);
    rederSecondComment(this.postId)
    rederStar(this.postId)
    return `
    <!-- component -->
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-5 mx-auto lg:w-4/5">
        <h2 class="pb-10">Trang chủ > Chi tiết sản phẩm ${product.name}</h2>
        <div class=" mx-auto flex flex-wrap">
            <div class="w-1/2 m-auto">
            <img alt="ecommerce" class="lg:w-4/5 m-auto w-full object-cover object-center rounded border border-gray-200" src="/static/upload/${
              product.thumb
            }">
            </div>
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">${
              product.name
            }</h1>
            <div class="flex mb-4">
              <span class="flex items-center showReviews">
                
                
              </span>
              <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a class="text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <div class="flex flex-col gap-3">
              <p class="title-font font-medium text-2xl text-red-600">${convertToVND(
                product.price
              )}</p>
              <button data="${
                product.id
              }" class="addCart text-white bg-[--rose-2] border-0 py-2 px-6 text-center focus:outline-none hover:bg-[--rose-1] rounded">Thêm vào giỏ hàng</button>
              <button class="addCart text-white bg-[--rose-2] border-0 py-2 px-10 focus:outline-none hover:bg-[--rose-1] rounded">Mua ngay</button>
            </div>

            <div class="flex gap-3 py-4">
                <div class=" flex flex-col gap-3">
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> 100% bông trắng tinh khiết</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Bảo hành đường chỉ trọn đời</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Miễn phí Gói quà</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Miễn phí Nén chân không gấu</p>
                </div>
                <div class=" flex flex-col gap-3">
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> 100% ảnh chụp tại shop</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Bảo hành Bông gấu 6 tháng</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Miễn phí Tặng thiệp</p>
                </div>
            </div>
          </div>
        </div>
        <div class=" py-5 ">
            <h2 class=" pb-2 uppercase text-xl border-b border-b-[--blue]">Thông tin sản phẩm</h2>
            <div class="detailProduct">${product.detail}</div>
        </div>
      </div>
    </section>
    <div class=" py-4 container lg:w-4/5 m-auto">
      <div class=" border border-gray-400 rounded-lg  p-4 lg:w-3/5 w-full">
        <h2 class="font-semibold text-lg py-2">Bình luận</h2>
        <div class="flex border border-gray-300 rounded-md py-2 px-4 items-center">
          <div class="w-1/3 border-r text-center items-center">
            <div class=" flex gap-3 justify-center text-yellow-400 text-xl">
              <span><i data="1" class="fa fa-star-o cursor-pointer danh-gia " aria-hidden="true"></i></span>
              <span><i data="2" class="fa fa-star-o cursor-pointer danh-gia " aria-hidden="true"></i></span>
              <span><i data="3" class="fa fa-star-o cursor-pointer danh-gia " aria-hidden="true"></i></span>
              <span><i data="4" class="fa fa-star-o cursor-pointer danh-gia " aria-hidden="true"></i></span>
              <span><i data="5" class="fa fa-star-o cursor-pointer danh-gia " aria-hidden="true"></i></span>
            </div>
            <div class=" text-center py-2 text-xl font-semibold text-yellow-500">
              <p class="star"></p>
            </div>
          </div>
          <div class="starProduct w-2/3 px-4">
            
          </div>
        </div>
        
        ${ await rederFrameComment(0)}
        
        <div class="listComment py-2 border-t border-t-gray-400 mt-5">
          ${listComment}
        </div>
      </div>
    </div>
    <div class="container lg:w-4/5 m-auto ">
    ${similar}
    </div>
        `;
  }
}

async function rederSimilar(id) {
  var products = await getProductByIDCategory(id);
  var html = await rederRowProduct(products);
  return html;
}

$(document).on("click", ".danh-gia", function () {
  $(".danh-gia").addClass("fa-star-o");
  $(".danh-gia").removeClass("fa-star");
  $(".danh-gia").removeClass("choose-star");

  $(this).addClass("choose-star");
  var star = $(this).attr("data");
  var text = checkStar(star);
  $(".star").html(text);

  for (let i = 1; i < 6; i++) {
    if (star >= i) {
      $(`.danh-gia[data=${i}]`).addClass("fa-star");
      $(`.danh-gia[data=${i}]`).removeClass("fa-star-o");
    }
  }
});

$(document).on("click", ".rederFrameComment", async function () {
  var id = $(this).attr("data");
  var html = await rederFrameComment(id);
  $(".frameComment").html("");
  $(this).parent().next().html(html);
});

async function rederFrameComment(id) {
  var idUser = sessionStorage.getItem("idUserLogin");
  var name ='';var phone= "";var email = ''; var hidden = '';
  console.log(name);
  if(idUser){
    var user = await getUserByID(idUser)
    var {name,phone,email} = user
    hidden = 'hidden'
  }
  var html = `<div class="py-4">
                  <textarea class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gray-200 px-3 py-2.5 " placeholder="Mời bạn bình luận hoặc đặt câu hỏi.."></textarea>
                  <div class=" grid grid-cols-2 py-2 gap-4">
                    <input type="text" name="name" class="${hidden} w-full border border-gray-200 py-2.5 rounded-[7px] px-3" placeholder="Họ và tên" value="${name}">
                    <input type="text" name="phone" class="${hidden}  w-full border border-gray-200 py-2.5 rounded-[7px] px-3"  placeholder="Số điện thoại" value="${phone}">
                    <input type="text" name="email" class=${hidden} " w-full border border-gray-200 py-2.5 rounded-[7px] px-3" placeholder="Email" value="${email}">
                    <button idComment="${id}" class="create-comment font-bold text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-[7px]">Gửi</button>
                  </div>
                </div>`;
  return html;
}

async function rederFirstComment(id) {
  var comments = await getComments();
  var commentsFirst = comments.filter((item) => {
    return (item.product_id == id && item.comment_id == 0);
  });

  var newArr = commentsFirst.reverse()
  var html = newArr.map((item) => {
    return rederItemComment(item);
  });
  return html.join("");
}

 async function rederSecondComment(id){
    var comments = await getComments();
    var commentsSecond = comments.filter((item) => {
      return (item.product_id == id && item.comment_id != 0);
    });
    commentsSecond.map((item) => {
      var html = rederItemComment(item , 
        "rounded-md bg-gray-100 border py-2 px-4 ml-10");
      $(`.comment-${item.comment_id}`).append(html)
    });
  }

function rederItemComment(item, classEle = "") {
  var html = `
    <div class="comment-${item.id} py-2">
      <div class="${classEle}">
        <h4 class=" font-semibold text-lg">${item.name}
          ${renderStarComment(item.star)}
        </h4>
        <p class=" py-2">${item.comment}</p>
        <span class="text-xs">${item.created_date}  |  </span>
        <button data="${
          item.id
        }" class="rederFrameComment text-xs">Trả lời<button>
      </div>
      <div class="frameComment"></div>
    </div>
  `;
  return html;
}

function checkStar(index) {
  var text = "";
  switch (index) {
    case "1":
      text = "Rất tệ";
      break;
    case "2":
      text = "Tệ";
      break;
    case "3":
      text = "Tạm ổn";
      break;
    case "4":
      text = "Tốt";
      break;
    case "5":
      text = "Rất tốt";
      break;
    default:
      break;
  }
  return text;
}

$(document).on("click", ".create-comment", async function () {
  var idProduct = $(".addCart").attr("data");
  var idComment = $(this).attr("idComment");
  var star;
  if (idComment == 0) {
    star = $(".choose-star").attr("data");
  }
  var parent = $(this).parent();
  var comment = parent.prev();
  var name = parent.children("input[name=name]");
  var email = parent.children("input[name=email]");
  var phone = parent.children("input[name=phone]");
  if( Validator.valNull(comment ) && Validator.valName(name) 
  && Validator.valEmail(email) && Validator.valPhone(phone)){
    var dataForm = {
      product_id: idProduct,
      comment_id: idComment,
      comment: comment.val(),
      name: name.val(),
      email: email.val(),
      phone: phone.val(),
      star: star,
      created_date: getDateNow(),
    };
    var newIdComment = await createComment(dataForm);
    var newComment = await getCommentByID(newIdComment.id);
  
    var html 
    if (idComment == 0) {
      html = rederItemComment(newComment);
      $(".listComment").prepend(html);
      rederStar(idProduct)
      comment.val('')
      name.val('')
      email.val('')
      phone.val('')
      $(".star").html('');
      $(".danh-gia").removeClass("fa-star");
      $(".danh-gia").removeClass("choose-star");
      $(".danh-gia").addClass("fa-star-o");
  
    } else {
      $(".frameComment").html("");
      html = rederItemComment(
        newComment,
        "rounded-md bg-gray-100 border py-2 px-4 ml-10"
      );
      $(`.comment-${idComment}`).append(html);
    }
  }
  
});

function renderStarComment(star) {
  var html = ``;
  for (let i = 0; i < Number(star); i++) {
    html += `<span><i class="fa fa-star pl-1 text-yellow-400 text-xs" aria-hidden="true"></i></span>`;
  }
  for (Number(star); star < 5; star++) {
    html += `<span><i class="fa fa-star-o pl-1 text-yellow-400 text-xs" aria-hidden="true"></i></span>`;
  }
  return html;
}

async function rederStar(id){
  var commets = await getComments()
  var commetProduct = commets.filter(item=>{
    return (item.product_id == id && item.star>=0)
  })
  var itemStar = ''
  for (let i = 1; i < 6; i++) {
    let stars = commetProduct.filter(item=>{
      return item.star == i
    })
    let percent = stars.length * 100 / commetProduct.length
    if(!percent){
      percent = 0
    }
    var element = `<div class="flex gap-2 items-center ">
                    <p class="">${i}<i class="fa fa-star " aria-hidden="true"></i></p>
                    <div class=" w-3/5 h-1.5 bg-gray-100 rounded-xl relative">
                      <div class=" absolute h-1.5 top-0 left-0 rounded-xl bg-yellow-400 w-[${percent}%]"></div>
                    </div>
                    <p class="w-1/5">${percent.toFixed(2)}%</p>
                  </div>`

    itemStar +=element
  }
  var mediumStar = commetProduct.reduce((count,item)=>{
    return count = count + Number(item.star)},0) / commetProduct.length
  if(commetProduct.length == 0){
    mediumStar =0
  }
  var html = `<h3 class=" text-xl font-bold text-yellow-400">
              ${mediumStar.toFixed(1)}
                 ${renderStarComment(mediumStar)}
                </h3>
                <div class=" text-xs flex flex-col gap-1">
                  ${itemStar}
                </div>`
  $('.starProduct').html(html)

  var reviews = `
    ${renderStarComment(mediumStar)}
    <span class="text-gray-600 ml-3">${commets.filter(item=>{
      return (item.product_id == id)
    }).length} Reviews</span>
  `
  $('.showReviews').html(reviews)
}