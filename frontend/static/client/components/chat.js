import { chatAI, getTimeNow } from "../../admin/data/connectData";
import {
  getMessengers,
  createMessenger,
  getMessengerByID,
  updateMessenger,
  updateSeeMess,
} from "../../admin/data/messenger";
import $ from "jquery";

export default function chat() {
  return `
        <div class=" fixed bottom-0 right-8  z-40 ">
            <div class=" absolute open-chat bottom-8 right-8 ">
                <div class="img-chat w-[72px] overflow-hidden relative py-2 px-4 cursor-pointer max-w-sm mx-auto border bg-white rounded-xl shadow-lg flex items-center space-x-4">
                    <div class="shrink-0">
                        <img class="h-10 w-10" src="https://www.iconpacks.net/icons/2/free-facebook-messenger-icon-2881-thumb.png" alt="ChitChat Logo">
                    </div>
                    <div class=" absolute left-full top-0">
                        <div class=" text-base font-medium text-black">ChitChat</div>
                        <p class=" truncate text-sm text-slate-500">You have a new message!</p>
                    </div>
                </div>
            </div>
            <div class=" hidden chat-box absolute  bottom-0 right-8 ">
                <div class="container lg:w-[300px]">
                    <div class=" border rounded-t-xl shadow-lg bg-white">
                        <div class="form-chat-box">
                            <div class="py-2 px-4 border-b flex justify-between items-center">
                                <div class="flex gap-2 items-center">
                                    <img class=" w-7 h-7 rounded-full" src="https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png">
                                    <span class=" text-base font-bold">Chat BOT</span>
                                </div>
                                <div class=" relative">
                                    <div class="open-chat-admin hidden absolute w-[140px] -top-1 right-10 py-2 px-4 border bg-gray-100 text-center rounded-md shadow-md cursor-pointer hover:bg-blue-400 hover:text-white ">Chat với admin</div>
                                    <i class="fa fa-ellipsis-h open-menu-chat cursor-pointer " aria-hidden="true"></i>
                                    <i class="fa fa-times pl-2 cursor-pointer close-chat-box" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class=" h-[350px] border-b detail-chat-box overflow-y-scroll">
                                <div class=" py-8 px-4">
                                    <img class=" m-auto w-[200px]" src="https://freelogopng.com/images/all_img/1681038628chatgpt-icon-logo.png">
                                    <h2 class=" text-center font-bold uppercase text-xl py-4">Chào mừng đến với chat GPT</h2>
                                </div>
                            </div>
                        </div>
                        <div class="py-2 px-4">
                            <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span class="text-gray-500 sm:text-sm"></span>
                                </div>
                                <input type="text" name="mess"  class=" input-mess-user block w-full rounded-md border-0 py-1.5 pl-7 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Hãy nói gì đó ....">
                                <div class="absolute inset-y-0 right-0 flex items-center">
                                    <button class=" pr-4 send-mess">
                                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    `;
}

function renderFormChatAdmin() {
  $(".send-mess").addClass("send-mess-user");
  var html = `
          <div class="py-2 px-4 border-b flex justify-between items-center">
              <div class="flex gap-2 items-center">
                  <img class=" w-7 h-7 rounded-full" src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/283302657_1459052971180634_6189845710225168496_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=V-YiRFMr-k0AX85edC2&_nc_ht=scontent.fdad2-1.fna&oh=00_AfDHwKMI9A6TNaPFOZaG3CYbI6Kw2LrHLEnjYWbzWiXIMQ&oe=65266EB1">
                  <span class=" text-base font-bold">Admin</span>
              </div>
              <div class=" relative">
                  <i class="fa fa-repeat repeat-messAdmin cursor-pointer" aria-hidden="true"></i>
                  <div class="open-chat-gpt hidden absolute w-[140px] -top-1 right-10 py-2 px-4 border bg-gray-100 text-center rounded-md shadow-md cursor-pointer hover:bg-blue-400 hover:text-white ">Chat với GPT</div>
                  
                  <i class="px-2 fa fa-ellipsis-h open-menu-chat cursor-pointer" aria-hidden="true"></i>
                  <i class="fa fa-times cursor-pointer close-chat-box" aria-hidden="true"></i>
              </div>
          </div>
          <input type="hidden" class="idMessUser" value="" >
          <div class=" h-[350px] border-b detail-chat-box overflow-y-scroll">
          <div class="px-4 py-4">
            <h2>Nhập tên và email của bạn để bắt đầu</h2>
              <div class="relative py-2">
                  <input type="text" name="name-chat-box" class="my-2 block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Hùng Thành" required>
                  <input type="email" name="email-chat-box" class="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="abd@gmail.com" required>
                  <button type="submit" class="sendEmailChat text-white absolute right-0 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Gửi</button>
              </div>
          </div>`;
  return html;
}

function renderFormChatGPT() {
  $(".send-mess").removeClass("send-mess-user");
  var html = `
      <div class="py-2 px-4 border-b flex justify-between items-center">
          <div class="flex gap-2 items-center">
              <img class=" w-7 h-7 rounded-full" src="https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png">
              <span class=" text-base font-bold">Chat BOT</span>
          </div>
          <div class=" relative">
            <div class="open-chat-admin hidden absolute w-[140px] -top-1 right-10 py-2 px-4 border bg-gray-100 text-center rounded-md shadow-md cursor-pointer hover:bg-blue-400 hover:text-white ">Chat với admin</div>
              
              <i class="fa fa-ellipsis-h cursor-pointer open-menu-chat" aria-hidden="true"></i>
              <i class="fa fa-times pl-2 cursor-pointer close-chat-box" aria-hidden="true"></i>
          </div>
      </div>
      <div class=" h-[350px] border-b detail-chat-box overflow-y-scroll">
          <div class=" py-8 px-4">
              <img class=" m-auto w-[200px]" src="https://freelogopng.com/images/all_img/1681038628chatgpt-icon-logo.png">
              <h2 class=" text-center font-bold uppercase text-xl py-4">Chào mừng đến với chat GPT</h2>
          </div>
      </div>`;
  return html;
}

$(document).on("click", ".open-chat", function () {
  $(".chat-box").css("display", "block");
});
$(document).on("click", ".open-chat-admin", function () {
  $(".form-chat-box").html(renderFormChatAdmin());
  var email = sessionStorage.getItem("emailMess");
  if (email) {
    getMessUser(email, "user");
  }
});

$(document).on("click", ".open-chat-gpt", function () {
  $(".form-chat-box").html(renderFormChatGPT());
});
$(document).on("click", ".close-chat-box", function () {
  $(".chat-box").css("display", "none");
});
$(document).on("click", ".open-menu-chat", function () {
  $(this).prev().toggleClass("hidden");
});

$(document).on("keypress", ".input-mess-user", async function (event) {
  $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    $(this).removeClass(" input-mess-user");
    renderMessUser();
    $(this).addClass(" input-mess-user");
  }
});

$(document).on("click", ".send-mess", async function () {
  $(this).removeClass("send-mess");
  renderMessUser();
  $(this).addClass("send-mess");
});

$(document).on("click", ".repeat-messAdmin", async function () {
  var email = sessionStorage.getItem("emailMess");
  if (email) {
    getMessUser(email, "user");
  }
});

async function renderMessUser() {
  var checkEmail = $('input[name="email-chat-box"]').val();
  if (checkEmail != undefined) {
    $('input[name="email-chat-box"]').addClass("border border-red-500");
    return ``;
  }

  var mess = $('input[name="mess"]').val();
  if (mess == "") return ``;
  //Load mess User
  var getMess = getItemMess(mess, "user");
  $(".detail-chat-box").append(getMess);
  $('input[name="mess"]').val("");

  if (!$(".send-mess-user").html()) {
    renderMessGPT(mess);
  } else {
    var idMess = $(".idMessUser").val();
    var data = {
      role: "user",
      message: mess,
      created_time: getTimeNow(),
    };
    updateMessenger(idMess, data);

    var listMess = await getMessengers();
    var messUser = listMess.find((item) => {
      return item.id == idMess;
    });
    var see = Number(messUser.see) + 1;
    updateSeeMess(idMess, { see: see, recent_change: new Date() });
  }
  $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
}
async function renderMessGPT(mess) {
  var itemMess = getItemMess(
    `<i class="fa fa-spinner fa-pulse fa-3x fa-fw text-sm"></i>`,
    "admin",
    "load-mess-bot"
  );
  $(".detail-chat-box").append(itemMess);
  $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
  //Load mess GPT
  var chatBot = await chatAI(mess);

  $(".load-mess-bot").html(chatBot.data.conversation.output);
  $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
  $(".load-mess-bot").removeClass("load-mess-bot");
}

function getItemMess(mess, role, id = 0) {
  if (role == "admin") {
    return `<p class="${id} text-sm px-4 py-2 mx-4 my-2 border rounded bg-gray-100 w-[190px]">${mess}</p> `;
  }
  if (role == "user") {
    return `<p class=" text-sm px-4  py-2 mx-4 my-2 ml-auto border rounded bg-[#12C296] text-white  w-[190px]">${mess}</p> `;
  }
}

$(document).on("click", ".sendEmailChat", function () {
  var email = $('input[name="email-chat-box"]').val();
  var name = $('input[name="name-chat-box"]').val();
  $(".detail-chat-box").html(
    `<div class="loadMessUserAndAdmin flex justify-center items-center py-10 text-xl"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>`
  );
  getMessUser(email, name);
  $(".loadMessUserAndAdmin").remove();

  sessionStorage.setItem("emailMess", email);
  sessionStorage.setItem("nameMess", name);
});

async function getMessUser(email, name) {
  $(".detail-chat-box").html("");
  var messAll = await getMessengers();
  var messUser = null;
  if(messAll){
    messUser = messAll.find((item) => {
      return item.email == email;
    });
  }
   
  if (messUser) {
    renderMessUserAndAdmin(messUser);
    $(".idMessUser").val(messUser.id);
  } else {
    var data = formDataCreateMessUser(name, email);
    var idNewMess = await createMessenger(data);
    var newMess = await getMessengerByID(idNewMess.id);

    renderMessUserAndAdmin(newMess);
    $(".idMessUser").val(idNewMess.id);
  }
  $(".detail-chat-box").scrollTop($(".detail-chat-box")[0].scrollHeight);
}

function renderMessUserAndAdmin(messUser) {
  var mess = messUser.mess;
  for (const key in mess) {
    if (Object.hasOwnProperty.call(mess, key)) {
      const element = mess[key];
      var itemMess = getItemMess(element.message, element.role);
      $(".detail-chat-box").append(itemMess);
    }
  }
}

function formDataCreateMessUser(name, email) {
  var data = {
    name: name,
    email: email,
    mess: {
      0: {
        role: "admin",
        message:
          "Chào mừng bạn đến với GẤU BÔNG CU TE HẠT ME, chúng tôi rất vui khi bạn sử dụng dịch vụ của chúng tôi, bạn có bất cứ câu hỏi nào cứ để lại ở đây, chúng tôi sẽ cố gắn trả lời bạn sớm nhất có thể.",
        created_time: getTimeNow(),
      },
    },
    see: 0,
  };
  return data;
}
