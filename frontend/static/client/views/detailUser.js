import AbstractView from "./AbstractView.js";
import errPage from "../components/errPage.js";
import { getUserByID,updateUser } from "../../admin/data/user.js";
import { uploadFile } from "../../admin/data/connectData.js";
import Validator from "../../admin/data/validate.js";
import { router } from "../index.js";

import $ from "jquery";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing User");
  }

  async getHtml() {
    var idUser = sessionStorage.getItem("idUserLogin");
    if(!idUser){   
        return errPage()
    }
    var user = await getUserByID(idUser)
    return `
          <div class="container lg:w-4/5 m-auto py-8">
            <div class="flex gap-2">
              <div class=" w-1/3 border shadow-md rounded-md py-6">
                <div class="flex gap-3 items-center pb-2 border-b px-8">
                  <img class="w-[40px] shadow-lg rounded-xl" src="/static/upload/${user.thumb}">
                  <p>${user.name}</p>
                </div>
                <div class="px-8 flex flex-col gap-3 pt-4 ">
                  <p class="btn-info-user cursor-pointer hover:text-[--rose-2]">Cập nhật tài khoản</p>
                  <p class="btn-change-pass cursor-pointer hover:text-[--rose-2]">Đổi mật khẩu</p>
                  <p class="btn-logn-out cursor-pointer hover:text-[--rose-2]">Đăng xuất</p>
                </div>
              </div>
              <div class="w-2/3  border shadow-md rounded-md py-6 form-info-user">
                ${formUpdateUser(user)}
              </div>
              <input type="hidden" name="idUser" value="${user.id}">
            </div>
          </div>
        `;
  }
}

$(document).on('click','.btn-info-user',async function(){
  var idUser =  $('input[name="idUser"]').val();
  var user = await getUserByID(idUser)
  $('.form-info-user').html(formUpdateUser(user))
})

$(document).on('click','.btn-change-pass',function(){
  $('.form-info-user').html(formUpdatePass())
})

$(document).on('click','.btn-forgot-pass',function(){
  $('.form-info-user').html(formForgotPass())
})

$(document).on('click','.btn-logn-out',function(){
  sessionStorage.removeItem('idUserLogin')
  sessionStorage.removeItem('emailMess')
  $('.itemLogin').html('<i class="pr-1 fa fa-user-circle-o" aria-hidden="true"></i> Đăng nhập')
  $('.itemLogin').attr('href','/login')
  history.pushState(null, null, '/home');
  router();
})

function formUpdateUser(user){
  return `
  <h2 class=" border-b pb-2 text-lg font-semibold px-8 uppercase">Cập nhật tài khoản</h2>
  <div class=" px-8 py-2">
    <div class="flex gap-3">
      <div class="w-1/2">
        <lable>Full name</lable>
        <input class="block py-1 px-2 mt-2 w-full border rounded-md" name="name" value="${user.name}">
      </div>
      <div class="w-1/2">
        <lable>Email</lable>
        <input class="block py-1 px-2 mt-2 w-full border rounded-md" name="email" value="${user.email}">
      </div>
    </div>
    <div class="w-1/2 pt-4">
      <lable>Phone</lable>
      <input class="block py-1 px-2 mt-2 w-full border rounded-md" name="phone" value="${user.phone}">
    </div>
    <div class="pt-4">
      <lable>Upload avata</label>
      <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" name="formFile" type="file" id="formFile">
    </div>
    <img  id="previewImage" class="my-2 w-[100px] shadow-lg rounded-xl" src="/static/upload/${user.thumb}">
    <div class="pt-4"> 
      <button type="button" class="update-user text-white bg-[--rose-1] hover:bg-[--rose-2] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Update</button>
    </div>
    <input type="hidden" name="thumbOld" value="${user.thumb}">
  </div>
  `
}

function formUpdatePass(){
  return `
  <h2 class=" border-b pb-2 text-lg font-semibold px-8 uppercase">Cập nhật mật khẩu</h2>
  <h2 class="susess-change-pass my-2 mx-8 text-white bg-green-400 rounded-md"></h2>
  <div class=" px-8 py-2 flex flex-col gap-3">
      <div class="w-2/3">
        <lable>Mật khẩu cũ</lable><span class="check-pass-old text-red-400 mx-2 px-2 font-light"></span>
        <input type="password" class="block py-1 px-2 mt-2 w-full border rounded-md" name="pass-old" value="">
      </div>
      <div class="w-2/3">
        <lable>Mật khẩu mới</lable><span class="check-pass-new text-red-400 mx-2 px-2 "></span>
        <input type="password" class="block py-1 px-2 mt-2 w-full border rounded-md" name="pass-new" value="">
      </div>
      <div class="w-2/3">
        <lable>Nhập lại mật khẩu mới</lable><span class="check-rePass-new text-red-400 mx-2 px-2 "></span>
        <input type="password" class="block py-1 px-2 mt-2 w-full border rounded-md" name="rePass-new" value="">
      </div>
      <span class="btn-forgot-pass cursor-pointer">Quên mật khẩu</span>
      <div class="pt-4"> 
        <button type="button" class="update-pass-user  text-white bg-[--rose-1] hover:bg-[--rose-2] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Update</button>
      </div>
  </div>
  `
}

function formForgotPass(){
  return `
  <h2 class=" border-b pb-2 text-lg font-semibold px-8 uppercase">Quên mật khẩu</h2>
  <h2 class="susess-change-pass my-2 mx-8 text-white bg-green-400 rounded-md"></h2>
  <div class=" px-8 py-2 flex flex-col gap-3">
      <div class="w-2/3">
        <lable>Mật khẩu đã quên</lable><span class="check-pass-old text-red-400 mx-2 px-2 font-light"></span>
        <input type="password" class="block py-1 px-2 mt-2 w-full border rounded-md" name="pass-old" value="">
      </div>
      <div class="w-2/3">
        <lable>Mật khẩu mới</lable><span class="check-pass-new text-red-400 mx-2 px-2 "></span>
        <input type="password" class="block py-1 px-2 mt-2 w-full border rounded-md" name="pass-new" value="">
      </div>
      <div class="w-2/3">
        <lable>Nhập lại mật khẩu mới</lable><span class="check-rePass-new text-red-400 mx-2 px-2 "></span>
        <input type="password" class="block py-1 px-2 mt-2 w-full border rounded-md" name="rePass-new" value="">
      </div>
      <div class="pt-4"> 
        <button type="button" class="update-pass-user  text-white bg-[--rose-1] hover:bg-[--rose-2] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Update</button>
      </div>
  </div>
  `
}

$(document).ready(function () {
  $(document).on("change", "#formFile", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var preview = document.getElementById("previewImage");
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

$(document).on("click", ".update-user", async function (e) {
  e.preventDefault();
  let name = $(`input[name="name"]`);
  let email = $(`input[name="email"]`);
  let phone = $(`input[name="phone"]`);
  var fileInput = document.querySelector("#formFile");
  let idUser = $('input[name="idUser"]').val();
  if(Validator.valName(name) && Validator.valEmail(email) 
  && Validator.valPhone(phone) && Validator.valUploadFile(fileInput)){

    var thumb = $('input[name="thumbOld"]').val();
    if (fileInput.files[0]) {
      var upload = new FormData();
      upload.append("formFile", fileInput.files[0]);
      uploadFile(upload).then(async (res) => {
        update(idUser, name.val(), email.val(), phone.val(), res);
      });
    } else {
      update(idUser, name.val(), email.val(), phone.val(), thumb);
    }
  }
  
});

async function update(idUser, name, email, phone, thumb) {
  let formData = {
    name: name,
    email: email,
    phone: phone,
    thumb: thumb,
  };

  await updateUser(idUser, formData);
  history.pushState(null, null, '/detail-user');
  router();
}

$(document).on("click", ".update-pass-user", async function (e) {
  e.preventDefault();
  let passOld = $(`input[name="pass-old"]`);

  var idUser =  $('input[name="idUser"]').val();
  var user = await getUserByID(idUser)
  if(user.password != passOld.val()){
    $('.check-pass-old').html('Mật khẩu cũ không chính sát')
  }else{
    $('.check-pass-old').html('')
    let passNew = $(`input[name="pass-new"]`);
    if(Validator.valPassword(passNew)){
      let rePassNew = $(`input[name="rePass-new"]`);
      if( Validator.valPassword(rePassNew)){
        if( passNew.val() != rePassNew.val()){
          $('.check-rePass-new').html('Mật khẩu không giống')
        }else{
          updateUser(idUser,{password: passNew.val()})
          $('.check-rePass-new').html('')
          $('.susess-change-pass').addClass(' p-2 ')
          $('.susess-change-pass').html('cập nhật mật khẩu thành công')
          passOld.val('')
          passNew.val('')
          rePassNew.val('')
        }
      }
    }
  }


});