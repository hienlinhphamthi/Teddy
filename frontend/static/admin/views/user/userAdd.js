import AbstractView from "../AbstractView.js";
import { createUser } from "../../data/user.js";
import { uploadFile } from "../../data/connectData.js";
import { router } from "../../index.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("create User");
  }

  async getHtml() {
    return `
            <div class="d-flex gap-4 form-row">
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Full name</label>
                    <input type="text" name="name" class="name form-control"  placeholder="full name">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email"  name="email" class="form-control" placeholder="Email">
                </div>
            </div>
            <div class="d-flex gap-4 form-group">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Phone</label>
                    <input type="number" name="phone"  class="form-control" placeholder="Phone">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail4">password</label>
                    <input type="password"  name="password" class="form-control"  placeholder="Password">
                </div>
            </div>
            <div class="mb-3 ">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" name="formFile" type="file" id="formFile">
            </div>
            <div  class="mb-3">
                <img id="previewImage" class="d-none" height="200" alt="Image preview...">
            </div>
            <span  class="create btn btn-primary">Create user</span>
        `;
  }
}

$(document).ready(function () {
  $(document).on("change", "#formFile", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var preview = document.getElementById("previewImage");
      preview.classList.remove("d-none");
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

$(document).on("click", ".create", async function (e) {
  e.preventDefault();
  let name = $(".name").val();
  let email = document.querySelector('input[name="email"]').value;
  let phone = document.querySelector('input[name="phone"]').value;
  let password = document.querySelector('input[name="password"]').value;

  var upload = new FormData();
  var fileInput = document.querySelector("#formFile");

  upload.append("formFile", fileInput.files[0]);
  uploadFile(upload).then(async res=>{
      let formData = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        thumb: res
      };
      await createUser(formData);
      history.pushState(null, null, "/user");
      router();
  })
});
