import AbstractView from "../AbstractView.js";
import { createProduct } from "../../data/product.js";
import { uploadFile } from "../../data/connectData.js";
import { getCategory } from "../../data/category.js";
import { router } from "../../index.js";
import Validator from "../../data/validate.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("create product");
  }

  async getHtml() {
    return `
            <div class="d-flex gap-4 form-row pb-3">
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Name product</label>
                    <input type="text" name="name" class="name form-control"  placeholder="Name product">
                </div>

            </div>
            <div class="d-flex gap-4 form-group pb-3">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Category</label>
                    <select name="category" class="form-select" aria-label="Default select example">
                        ${category()}
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail4">price</label>
                    <input type="number" name="price" class="form-control" placeholder="99999">
                </div>
            </div>
            <div class="d-flex gap-4 form-group pb-3">
                <div class="form-group col-md-12">
                    <label for="inputEmail4">Detail</label>
                    <textarea name="detail" id="editor1" ></textarea>
                </div>
            </div>
            <div class="mb-3 ">
                <input class="form-control" name="formFile" type="file" id="formFile">
            </div>
            <div  class="mb-3">
                <img id="previewImage" class="d-none" height="200" alt="Image preview...">
            </div>
            <span  class="createProduct btn btn-primary">Create product</span>
        `;
  }
}

async function category() {
  $('.loadAdmin').css('display','block')
  let category = await getCategory();
  let html = category.map((x) => {
    return `<option value="${x.id}">${x.name}</option>`;
  });
  $(".form-select").html(html.join(""));
  loadCK5()
  $('.loadAdmin').css('display','none')

}


$(document).ready(function () {
  $(document).on("change", "#formFile", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var preview = document.getElementById("previewImage");
      preview.classList.remove("d-none"); // hiển thị hình ảnh được chọn.
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

function loadCK5(){
  var editor1 = document.querySelector('#editor1');
  if (editor1) {
    ClassicEditor
		.create( document.querySelector( '#editor1' ) )
		.catch( error => {
			console.error( error );
		} );
  }

}

$(document).on("click", ".createProduct", async function (e) {
  $('.loadAdmin').css('display','block')
  e.preventDefault();
  // // Lấy giá trị của các trường nhập và các phần tử HTML từ DOM.
  let name = $(`input[name="name"]`);
  let category = $('select[name="category"]');
  let price = $('input[name="price"]');
  var detail = document.querySelector('.ck-editor__editable').innerHTML;
  var fileInput =  document.querySelector("#formFile");
  // // Kiểm tra điều kiện hợp lệ về dữ liệu nhập từ người dùng.
  if(Validator.valNull(name) && Validator.valSelect(category) &&
   Validator.valNumber(price) && Validator.valUploadFile(fileInput)){
    //// Nếu dữ liệu hợp lệ, tiến hành tạo một FormData object để chứa dữ liệu upload.
    var upload = new FormData();
    upload.append("formFile", fileInput.files[0]); 
    uploadFile(upload).then(async (res) => {  // Gọi hàm uploadFile() để tải lên file.
      // // Sau khi tải lên thành công, lấy đường dẫn của file được tải lên và tạo dữ liệu sản phẩm.
      let formData = {
        name: name.val(),
        cate_id:category.val(),
        price: Number(price.val()),
        detail: detail,
        thumb: res,
      };
      await createProduct(formData); // // Gọi hàm createProduct() để tạo sản phẩm mới trong cơ sở dữ liệu.
      history.pushState(null, null, "/product"); // // Thay đổi URL của trình duyệt để chuyển hướng người dùng đến trang danh sách sản phẩm.
      $('.loadAdmin').css('display','none')
      router();
    });
  }

  
});
