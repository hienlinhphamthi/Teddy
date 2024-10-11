import AbstractView from "../AbstractView.js";
import { getCategoryByID ,updateCategory} from "../../data/category.js";
import { router } from "../../index.js";
import Validator from "../../data/validate.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id; 
    this.setTitle("Viewing Category");
  }

  async getHtml() {
    let category = await getCategoryByID(this.postId); 
    let { id, name } = category; 
    return `
            <div class="d-flex gap-4 form-row">
                <div class="form-group col-md-8">
                    <label for="inputPassword4"> name category</label>
                    <input type="text" name="name" class="name form-control"  placeholder="name category" value="${name}">
                </div>
            </div>
            <div class="pt-4">
                <span  class="updateCategory btn btn-primary">Update Category</span>
            </div>
            <input type="hidden" name="idCategory" value="${id}">
        `;
  }
}

$(document).on("click", ".updateCategory", async function (e) {
  $('.loadAdmin').css('display','block')
  e.preventDefault();
  let name = $(`input[name="name"]`);
  if(Validator.valName(name)){ // kiểm tra xem tên danh mục nhập vào có hợp lệ không bằng cách sử dụng hàm valName từ lớp Validator
    let idCategory = $('input[name="idCategory"]').val();
    let formData = {
      name: name.val(),
    };
    await updateCategory(idCategory, formData);
    history.pushState(null, null, "/category");
    router();
  }else{
    console.log(name);
  }
  $('.loadAdmin').css('display','none')
});


