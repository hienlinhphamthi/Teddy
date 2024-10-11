import AbstractView from "../AbstractView.js";
import { getProductByID, updateProduct } from "../../data/product.js";
import { getCategory } from "../../data/category.js";
import { uploadFile,deleteFile } from "../../data/connectData.js";
import { router } from "../../index.js";
import Validator from "../../data/validate.js";
import $ from "jquery";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing Product");
  }

  async getHtml() {
    
    let product = await getProductByID(this.postId);
    let { id, name, cate_id, price, thumb, detail } = product;
    category(cate_id);
    return `
            <div class="d-flex gap-4 form-row pb-3">
            <div class="form-group col-md-6">
                <label for="inputPassword4">Name product</label>
                <input type="text" name="name" class="name form-control"  placeholder="Name product" value="${name}">
            </div>

        </div>
        <div class="d-flex gap-4 form-group pb-3">
            <div class="form-group col-md-6">
                <label for="inputEmail4">Category</label>
                <select name="category" class="form-select" aria-label="Default select example">
                    
                </select>
            </div>
            <div class="form-group col-md-6">
                <label for="inputEmail4">price</label>
                <input type="number" name="price"  class="form-control" placeholder="99999" value="${price}">
            </div>
        </div>
        <div class="d-flex gap-4 form-group pb-3">
            <div class="form-group col-md-12">
                <label for="inputEmail4">Detail</label>
                <div name="editor2" id="editor2" class="form-control" rows="5" cols="80">${detail}</div>
            </div>
        </div>
            <div class="mb-3 ">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" name="formFile" type="file" id="formFile">
            </div>
            <div  class="mb-3">
                <img  id="previewImage"  style="width:300px" class=" rounded-5" src="/static/upload/${thumb}" alt="">
            </div>
            <span  class="updateProduct btn btn-primary">Update Product</span>
            <input type="hidden" name="idProduct" value="${id}">
            <input type="hidden" name="thumbOld" value="${thumb}">
        `;
  }
}

async function category(id) {
  $('.loadAdmin').css('display','block')
  let category = await getCategory();
  let html = category.map((x) => {
    if (x.id == id) {
      return `<option value="${x.id}" selected>${x.name}</option>`;
    } else {
      return `<option value="${x.id}">${x.name}</option>`;
    }
  });
  $(".form-select").html(html.join(""));
  loadCK5();
  $('.loadAdmin').css('display','none')
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

$(document).on("click", ".updateProduct", async function (e) {
  e.preventDefault();
  let name = $(".name");
  let category =$('select[name="category"]');
  let price = $('input[name="price"]');
  let idProduct = $('input[name="idProduct"]').val();
  var detail = document.querySelector(".ck-editor__editable").innerHTML;
  var thumb = $('input[name="thumbOld"]').val();
  var fileInput = document.querySelector("#formFile");
  
  if(Validator.valNull(name) && Validator.valSelect(category) &&
   Validator.valNumber(price)){
    if (fileInput.files[0]) {
      if( Validator.valUploadFile(fileInput)){
        var upload = new FormData();
        upload.append("formFile", fileInput.files[0]);
        deleteFile(thumb)
        uploadFile(upload).then(async (res) => {
          update(idProduct, name, category, price, detail, res);
        });
      }
    } else {
      update(idProduct, name, category, price, detail, thumb);
    }
   }
  
});

async function update(idProduct, name, category, price, detail, thumb) {
  let formData = {
    name: name.val(),
    cate_id: category.val(),
    price: Number(price.val()),
    detail: detail,
    thumb: thumb,
  };
  await updateProduct(idProduct, formData);
  history.pushState(null, null, "/product");
  router();
}

function loadCK5() {
    var editor2 = document.querySelector("#editor2");
    if (editor2) {
      ClassicEditor.create(document.querySelector("#editor2")).catch(
        (error) => {
          console.error(error);
        }
      );
    }
}
