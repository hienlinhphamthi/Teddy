import AbstractView from "../AbstractView.js";
import { getUserByID, updateUser } from "../../data/user.js";
import { uploadFile } from "../../data/connectData.js";
import { router } from "../../index.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing User");
  }

  async getHtml() {
    let user = await getUserByID(this.postId);
    let { id, name, email, phone, thumb, password } = user;
    return `
        <div class="d-flex gap-4 form-row">
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Full name</label>
                    <input type="text" name="name" class="name form-control"  placeholder="full name" value="${name}">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email"  name="email" class="form-control" placeholder="Email"  value="${email}">
                </div>
            </div>
            <div class="d-flex gap-4 form-group">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Phone</label>
                    <input type="number" name="phone"  class="form-control" placeholder="Phone" value="${phone}">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail4">password</label>
                    <input type="password"  name="password" class="form-control"  placeholder="Password"  value="${password}">
                </div>
            </div>
            <div class="mb-3 ">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" name="formFile" type="file" id="formFile">
            </div>
            <div  class="mb-3">
                <img  id="previewImage"  style="width:120px" class=" rounded-5" src="/static/upload/${thumb}" alt="">
            </div>
            <span  class="update btn btn-primary">Update user</span>
            <input type="hidden" name="idUser" value="${id}">
            <input type="hidden" name="thumbOld" value="${thumb}">
        `;
  }
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

$(document).on("click", ".update", async function (e) {
  e.preventDefault();
  let name = $(".name").val();
  let email = document.querySelector('input[name="email"]').value;
  let phone = document.querySelector('input[name="phone"]').value;
  let password = document.querySelector('input[name="password"]').value;
  let idUser = $('input[name="idUser"]').val();

  var thumb = $('input[name="thumbOld"]').val();
  var fileInput = document.querySelector("#formFile");
  if (fileInput.files[0]) {
    var upload = new FormData();
    upload.append("formFile", fileInput.files[0]);
    uploadFile(upload).then(async (res) => {
      update(idUser, name, email, phone, password, res);
    });
  } else {
    update(idUser, name, email, phone, password, thumb);
  }
});

async function update(idUser, name, email, phone, password, thumb) {
  let formData = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    thumb: thumb,
  };
  await updateUser(idUser, formData);
  history.pushState(null, null, "/user");
  router();
}
