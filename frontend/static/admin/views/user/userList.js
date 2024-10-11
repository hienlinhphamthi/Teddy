import AbstractView from "../AbstractView.js";
import { getUser, deleteUser } from "../../data/user.js";
import $ from "jquery";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("User");
    }

    async getHtml() {
        var htmlListUser = await rederUser()
        return `
        <table class="table">
            <thead>
                <tr  class=" align-center">
                    <th class="align-middle text-center" scope="col">ảnh</th>
                    <th class="align-middle text-center" scope="col">name</th>
                    <th class="align-middle text-center" scope="col">email</th>
                    <th class="align-middle text-center" scope="col">phone</th>
                    <th class="align-middle text-center" scope="col"></th>
                    <th class="align-middle text-center" scope="col"><a type="button" data-link href="/createUser" class="btn btn-secondary">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="listUser">
                ${htmlListUser}
            </tbody>
        </table>

        `;
    }
}

async function rederUser(){
    let users = await getUser();
    var html = listUser(users)
    return html.join('')
}

function listUser(users){
    var element = users.map(item=>{
        return itemUser(item)
    })

    return element
}

function itemUser(item){
    var {id,name,email,phone,thumb} = item
    return `<tr class="idUser${id} align-center">
                <td class="align-middle text-center" style="width:120px;height:120px" scope="row">
                    <img  class="img-fluid rounded-5" src="/static/upload/${thumb}" alt="">
                </td>
                <td class="align-middle text-center">${name}</td>
                <td class="align-middle text-center">${email}</td>
                <td class="align-middle text-center">${phone}</td>
                <td class="align-middle text-center"><a href="user/${id}" data-link type="button" class="edit btn btn-success">Edit</a></td>
                <td class="align-middle text-center"><button type="button" idUser="${id}" class="delete btn btn-danger">Delete</button></td>
            </tr>`
}

$(document).on('click','.delete', function(){
    let id = $(this).attr('idUser')
    $(`.idUser${id}`).remove()
    deleteUser(id)
})
