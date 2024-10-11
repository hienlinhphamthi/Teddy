import AbstractView from "../AbstractView.js";
import { getTimeNow } from "../../data/connectData.js";
import {
  getMessengers,
  getMessengerByID,
  updateMessenger,
  updateSeeMess,
  getMessengerDetailByID,
  deleteMessengerItem
} from "../../data/messenger";
import Validator from "../../data/validate.js";

import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.id = params.id;
    this.setTitle("Message");
  }

  async getHtml() {
  $('.loadAdmin').css('display','block')

    var listMess = await renderListMess();
    if (!this.id) {
      this.id = 0;
    } else {
      var mess = await getMessengerByID(this.id);
      if (!mess.email) {
        this.id = 0;
      }
    }
    var detailMess = await renderDetailMESS(this.id);
  $('.loadAdmin').css('display','none')

    return `
    <section style="background-color: #F1F3FA;">
    <div class="container py-3">
  
      <div class="row">
  
        <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
  
          <div class="card" style="height:80vh">
            <div class="card-body p-3">
              <div class=" d-flex justify-content-between align-items-center  pb-2">
                <img src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/283302657_1459052971180634_6189845710225168496_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=yhJqDpkVpHgAX8Hgb8g&_nc_ht=scontent.fdad2-1.fna&oh=00_AfBovA01csLzFoiH-w6UXHjZ7Jnf1k2qosJ95k-ygp8epQ&oe=65266EB1" alt="avatar"
                class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="40">
                <div class=" ml-full">
                  <i class=" fs-5 fa fa-ellipsis-h" aria-hidden="true"></i>
                </div>
              </div>
              <div class="py-2 mb-2">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"><i class="fa fa-search" aria-hidden="true"></i></span>
                  <input type="text" class="form-control" placeholder="Tìm kiếm trên messenger ... " aria-label="Username" aria-describedby="addon-wrapping">
                </div>
              </div>
              <ul class="list-unstyled listMessenger mb-0">
                ${listMess}
                
              </ul>
  
            </div>
          </div>
  
        </div>
  
        <div class="col-md-6 col-lg-7 col-xl-8">
          <div class="card shadow-sm" style="height:80vh">
            <div class="card-body p-0 d-flex flex-column">
              ${detailMess}
                <div  id="chat2" class="card-footer text-muted d-flex justify-content-start align-items-center p-3 gap-3 pe-4 ">
                  <img src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/283302657_1459052971180634_6189845710225168496_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=yhJqDpkVpHgAX8Hgb8g&_nc_ht=scontent.fdad2-1.fna&oh=00_AfBovA01csLzFoiH-w6UXHjZ7Jnf1k2qosJ95k-ygp8epQ&oe=65266EB1"
                    alt="avatar 3" style="width: 40px; height: 100%; border-radius:100%">
                  <input type="text" name="input-mess-admin" class="form-control " 
                    placeholder="Type message">
                  <div class="d-flex gap-3 fs-5">
                    <i class="fa fa-camera" aria-hidden="true"></i>
                    <i class="fa fa-smile-o" aria-hidden="true"></i>
                    <i style="cursor:pointer" class="fa fa-paper-plane sendMessAdmin" aria-hidden="true"></i>
                  </div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
  
    </div>
  </section>
        `;
  }
}

async function renderListMess() {

  var listMess = await getMessengers();
  if (listMess.length == 0) {
    return ``;
  }
  listMess.sort((a, b) => {
    return (
      new Date(b.recent_change).getTime() - new Date(a.recent_change).getTime()
    );
  });
  var html = listMess.map((item) => {
    if (item.see == 0) {
      item.see = "";
    }

    var keys = Object.keys(item.mess);
    var lastKey = keys[keys.length - 1];
    var lastValue = item.mess[lastKey];

    return `<li class="idMess-${item.id} p-2 border-bottom my-1" style="${
      item.see > 0 ? "background:#F0F0F4" : ""
    }">
              <a href="/message/${
                item.id
              }" data-link class="d-flex justify-content-between">
                <div class="d-flex flex-row">
                  <img src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg" alt="avatar"
                    class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="40">
                  <div class="pt-1">
                    <p class="fw-bold mb-0 ">${item.name}</p>
                    <p class="small text-muted m-0">${lastValue.message.slice(
                      0,
                      20
                    )} ...</p>
                  </div>
                </div>
                <div class="pt-1">
                  <p class="small text-muted mb-1">${lastValue.created_time}</p>
                  <span class=" float-end">${item.see}</span>
                </div>
              </a>
            </li>`;
  });
  return html.join("");
}

setInterval(async function () {
  var newList = await renderListMess();
  $(".listMessenger").html(newList);
}, 1000);

async function renderDetailMESS(IDMess = 0) {

  var listMess = await getMessengers();

  if (!listMess) {
    return `<div class="d-flex justify-content-between align-items-center border-bottom p-2 Small shadow">
    <div class="d-flex gap-2">
      <img src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="50">
    </div>
    <div class=" d-flex gap-4 fs-6 pe-4">
      <i style="cursor:pointer" class="fa fa-repeat repeat-messUser" aria-hidden="true"></i>
      <i class="fa fa-phone" aria-hidden="true"></i>
      <i class="fa fa-video-camera" aria-hidden="true"></i>
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </div>
  </div>
  <div class="detail-chat-box flex-grow-1 px-4 pt-3 overflow-y-scroll" style="background:#E5E4EE;height: 50vh;">
  </div>
`;
  } else {
    var mess = listMess[0];
    if (IDMess != 0) {
      mess = listMess.find((item) => {
        return item.id == IDMess;
      });
    }
    updateSeeMess(mess.id, { see: 0 });
    var itemMess = ``;
    var messDetail = mess.mess;
    for (const key in messDetail) {
      if (Object.hasOwnProperty.call(messDetail, key)) {
        const element = messDetail[key];
        itemMess += renderItemMess(element,key);
      }
    }
  }

  var html = `<div class="d-flex justify-content-between align-items-center border-bottom p-2 Small shadow">
      <div class="d-flex gap-2">
        <img src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="50">
        <div>
          <h5>${mess.name}</h5>
          <span>last seen today at 09:15 PM</span>
        </div>
      </div>
      <div class=" d-flex gap-4 fs-6 pe-4">
        <i style="cursor:pointer" class="fa fa-repeat repeat-messUser" aria-hidden="true"></i>
        <i class="fa fa-phone" aria-hidden="true"></i>
        <i class="fa fa-video-camera" aria-hidden="true"></i>
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
      </div>
    </div>
    <div class="detail-chat-box flex-grow-1 px-4 pt-3 overflow-y-scroll" style="background:#E5E4EE;height: 50vh;">
      ${itemMess}
    </div>
    <input type="hidden" name="idMess" value="${mess.id}">
    `;
  return html;
}

function renderItemMess(item,key) {
  if (item.role == "admin") {
    return `
    <div class="idMessDetail-${key} d-flex gap-2 align-items-center" style="margin-left: auto;max-width:60%; width: fit-content">
      <i data="${key}" style="cursor:pointer" title="xóa" class="fa fa-trash delete-item-mess" aria-hidden="true"></i>
      <p class="text-wrap text-break py-2 px-3 rounded text-white" style="background: #3588C6;">
      ${item.message} </p> 
     </div> `;
  }
  if (item.role == "user") {
    return `
    <div class="idMessDetail-${key} d-flex gap-2 align-items-center">
      <p class=" text-wrap text-break py-2 my-2 px-3 bg-white rounded" style="max-width:60%; width: fit-content;">${item.message} </p>
      <i data="${key}" title="xóa" style="cursor:pointer" class="fa fa-trash delete-item-mess" aria-hidden="true"></i>
    </div> `;
  }
}

$(document).on("click", ".sendMessAdmin", function () {
  addMessAdmin();
});

$(document).on("click", ".repeat-messUser", async function () {
  var id = $(`input[name="idMess"]`).val();
  var listMess = await getMessengers();
  var mess = listMess.find((item) => {
    return item.id == id;
  });
  var itemMess = ``;
  var messDetail = mess.mess;
  for (const key in messDetail) {
    if (Object.hasOwnProperty.call(messDetail, key)) {
      const element = messDetail[key];
      itemMess += renderItemMess(element,key);
    }
  }
  $(".detail-chat-box ").html(itemMess);
  $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
});

$(document).on(
  "keypress",
  `input[name="input-mess-admin"]`,
  async function (event) {
    $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      addMessAdmin();
    }
  }
);

async function addMessAdmin() {
  $('.loadAdmin').css('display','block')
  var idMess = $('input[name="idMess"]').val();
  var message = $('input[name="input-mess-admin"]');
  if(Validator.valNull(message)){
    var data = {
      role: "admin",
      message: message.val(),
      created_time: getTimeNow(),
    };

    $('input[name="input-mess-admin"]').val("");
    var id = await updateMessenger(idMess, data);
    var newMess = await getMessengerDetailByID(idMess,id.id)
    var html = renderItemMess(newMess,id.id);
    $(".detail-chat-box").append(html);
    $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
  }
  $('.loadAdmin').css('display','none')
}

$(document).on("click", ".delete-item-mess",async function () {
  if(confirm('xác nhận xóa chứ')){
    $('.loadAdmin').css('display','block')
    var idMess = $('input[name="idMess"]').val();
    var idMessDetail = $(this).attr('data');
    await deleteMessengerItem(idMess,idMessDetail)
    $(`.idMessDetail-${idMessDetail}`).remove()
    $('.loadAdmin').css('display','none')
  }
});