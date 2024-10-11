import AbstractView from "../AbstractView.js";
import { getComments,deleteComment } from "../../data/comment.js";
import { renderStarComment } from "./listComment.js";
import $ from "jquery";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Detail Comment");
  }

  async getHtml() {
    let id = this.postId;
    var htmlComment = await renderComment(id)
    return `
        <table class="table">
            <thead  class=" align-center">
                <tr>
                    <th class="align-middle text-center" scope="col">Commentator</th>
                    <th class="align-middle text-center" scope="col">Comment</th>
                    <th class="align-middle text-center" scope="col">Star</th>
                    <th class="align-middle text-center" scope="col">Date created</th>
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

async function renderComment(id){
  $('.loadAdmin').css('display','block')

    var comments = await getComments()
    comments = comments.filter(item=>{
        return item.product_id == id
    })
    var html = comments.map(item=>{
        return rederItemComment(item)
    })
  $('.loadAdmin').css('display','none')

    return html.join('')
}
function rederItemComment(item){
    return `
    <tr class="idComment-${item.id} align-center"> 
        <td class="align-middle text-center">${item.name}</td>
        <td class="align-middle text-center">${item.comment}</td>
        <td class="align-middle text-center">${renderStarComment(item.star)}</td>
        <td class="align-middle text-center">${item.created_date}</td>
        <td class="align-middle text-center">
            <button data="${item.id}" type="button" class="deleteComment btn btn-danger">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
                Delete
            </button>
        </td>
    </tr>
    `
}

$(document).on('click','.deleteComment',function(){
    var id = $(this).attr('data')
    deleteComment(id)
    $(`.idComment-${id}`).remove()
})

