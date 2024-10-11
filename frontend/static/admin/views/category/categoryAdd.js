import AbstractView from "../AbstractView.js";
import { createCategory } from "../../data/category.js";
import { router } from "../../index.js"; 
import Validator from "../../data/validate.js";
import $ from "jquery";


export default class extends AbstractView { 
  constructor(params) {
    super(params);
    this.setTitle("create Category"); 
  }

  async getHtml() {
    return `
            <div class="d-flex gap-4 form-row">
                <div class="form-group col-md-8">
                    <label for="inputPassword4"> name category</label>
                    <input type="text" name="name" class="name form-control"  placeholder="name category">
                </div>
            </div>
            <div class="pt-4">
                <span  class="createCategory btn btn-primary">Create category</span>
            </div>
        `;
  }
}

$(document).on("click", ".createCategory", async function (e) {  
  // $('.loadAdmin').css('display','block')
  e.preventDefault(); 
  let name = $(".name"); 

  if(Validator.valName(name)){
    let formData = {
      name: name.val(),
    };
    await createCategory(formData); 
    history.pushState(null, null, "/category"); 
    router();   
  }
  // $('.loadAdmin').css('display','block')
  
});
