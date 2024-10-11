import AbstractView from "../AbstractView.js";
import {getCategory, deleteCategory} from "../../data/category.js";
import $ from "jquery";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("category");
    }

    async getHtml() {
        var htmlListCategory = await rederCategory(); 
        return `
        <table class="table">
            <thead>
                <tr class="align-center">
                    <th class="align-middle " scope="col">name</th>
                    <th class="align-middle text-center" scope="col"></th>
                    <th class="align-middle text-center" scope="col"><a type="button" data-link href="/createCategory" class="btn btn-success ">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="listCategory">
                ${htmlListCategory}
            </tbody>
        </table>

        `;
    }
}

async function rederCategory(){
  $('.loadAdmin').css('display','block') // hiển thị phần tử có lớp loadAdmin, 
                                          // thông báo cho người dùng biết rằng dữ liệu đang được tải.
    let categorys = await getCategory() // gọi hàm getCategory() để lấy danh sách các danh mục từ cơ sở dữ liệu. Với từ khóa await, 
                                       //nó đợi hàm này hoàn thành và trả về kết quả 
    var html = listCategory(categorys) //gọi hàm listCategory() với danh sách danh mục đã lấy được để tạo HTML của danh sách này.
  $('.loadAdmin').css('display','none') // ẩn phần tử có lớp loadAdmin sau khi dữ liệu đã được tải và xử lý xong.
    return html
}

function listCategory(item){ //  chuyển đổi một mảng các danh mục thành một chuỗi HTML chứa các phần tử danh mục, để hiển thị danh sách này trên giao diện người dùng.
    var element = item.map(item=>{
        return itemCategory(item)
    })
    return element.join('')
}

function itemCategory(item){
    var {id,name} = item // sử dụng cú pháp destructuring để trích xuất hai thuộc tính id và name từ đối tượng item.
    return `<tr class="idCategory${id} align-center">

                <td class="align-middle">${name}</td>
                <td class="align-middle text-center"><a href="category/${id}" data-link type="button" class="edit btn btn-warning">Edit</a></td>
                <td class="align-middle text-center"><button type="button" idCategory="${id}" class="delete btn btn-danger">Delete</button></td>
            </tr>`
}

$(document).on('click','.delete', function(){
    let id = $(this).attr('idCategory') // lấy giá trị của thuộc tính để biết id của danh mục cần xóa
    $(`.idCategory${id}`).remove() // xóa phần tử có lớp là idCategory kèm theo id của danh mục cần xóa khỏi giao diện người dùng. 
                                // Điều này dẫn đến việc xóa dòng tương ứng trong bảng danh sách danh mục.
    deleteCategory(id) // gọi hàm deleteCategory(id) để xóa danh mục có id tương ứng từ cơ sở dữ liệu. Điều này đảm bảo rằng 
                      //danh mục sẽ bị xóa không chỉ trên giao diện người dùng mà còn trong dữ liệu lưu trữ.
})