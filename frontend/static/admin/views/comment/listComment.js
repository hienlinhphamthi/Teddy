import AbstractView from "../AbstractView.js";
import { getComments } from "../../data/comment.js";
import { getProductByID } from "../../data/product.js";
import $ from "jquery"
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Comment");
  }

  async getHtml() {
    var htmlComment = await rederComment()
    return `
        <table class="table">
            <thead  class=" align-center">
                <tr>
                    <th class="align-middle text-center" scope="col">Name product</th>
                    <th class="align-middle text-center" scope="col">number of comments</th>
                    <th class="align-middle text-center" scope="col">Medium Star</th>
                    <th class="align-middle text-center" scope="col"></th>
                </tr>
            </thead>
            <tbody id="listComment">
                ${htmlComment}
            </tbody>
        </table>

        `;
  }
}

async function rederComment() {
  $('.loadAdmin').css('display','block')

  let comments = await getComments();

  var arr = []
  for (let i = 0; i < comments.length; i++) {
    let element = comments[i]
    let check = 0
    if(arr.length !=0){
        for (let j = 0; j < arr.length; j++) {
            let item = arr[j];
            if(item.product_id == element.product_id){
                item.quantity = item.quantity + 1;
                if(element.star){
                    item.quantityStar = item.quantityStar + 1;
                    item.star = Number(item.star) +  Number(element.star)
                }
                check = 1
            }
        }
    }
    if(check == 0){
        let data ={
            id: element.id,
            product_id: element.product_id,
            quantity: 1,
            quantityStar:1,
            star: Number(element.star)
        }
        arr.push(data)
    }
  }
  var html = await listComment(arr);
  $('.loadAdmin').css('display','none')

  return html
}

async function listComment(comments) {
  var element =await Promise.all(comments.map(async (item) => {
        var html = await itemComment(item)
        return html
    })
  )
  
  return element.join('')
}

async function itemComment(item) {
    var { id,  product_id, quantity,quantityStar, star } = item;

    var product = await getProductByID(product_id)
    return `<tr class="idComment${id} align-center"> 
                <td class="align-middle text-center">${product.name}</td>
                <td class="align-middle text-center">${quantity}</td>
                <td class="align-middle text-center">${renderStarComment(star/quantityStar)}</td>
                <td class="align-middle text-center">
                    <a href="/comment/${product_id}" data-link type="button" class=" btn btn-success">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        Detail
                    </a>
                </td>
            </tr>`;
}

export function renderStarComment(star) {
    star = Math.round(star)
    console.log(star);
    var html = ``;
    for (let i = 0; i < Number(star); i++) {
      html += `<span><i class="fa fa-star pl-1 text-warning text-xs" aria-hidden="true"></i></span>`;
    }
    for (Number(star); star < 5; star++) {
      html += `<span><i class="fa fa-star-o pl-1 text-warning text-xs" aria-hidden="true"></i></span>`;
    }
    return html;
  }