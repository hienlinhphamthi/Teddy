import AbstractView from "../AbstractView.js";
import { getProduct, deleteProduct } from "../../data/product.js";
import { convertToVND } from "../../data/connectData.js";
import $ from "jquery";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Product");
    }

    async getHtml() {
        var htmlListProducts = await rederProduct()
        var soTrang = await phanTrang()
        return `
        <table class="table">
            <thead>
                <tr class=" align-center">
                    <th class="align-middle text-center" scope="col">ảnh</th>
                    <th class="align-middle text-center" scope="col">name</th>
                    <th class="align-middle text-center" scope="col">Giá</th>
                    <th class="align-middle text-center" scope="col"></th>
                    <th class="align-middle text-centerscope="col"><a data-link type="button" href="/createProduct" class="btn btn-secondary">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="listProduct">
                ${htmlListProducts}
            </tbody>
        </table>
        <div class="">
        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li   class="page-item "><button data="prev" class="page-link phan-trang" >Trước</button></li>
          ${soTrang}
          <li  class="page-item "><button data="next"  class="page-link phan-trang" >Tiếp theo</button></li>
        </ul>
      </nav>
        </div>
        `;
    }
}

var soSP = 4;

async function rederProduct(){
  $('.loadAdmin').css('display','block')

    let products = await getProduct();  // Lấy danh sách sản phẩm từ cơ sở dữ liệu bằng cách gọi hàm getProduct().
    var html =  listProduct(products)
  $('.loadAdmin').css('display','none') // biểu tượng tải hoặc thông báo được ẩn đi.

    return html
}

function listProduct(products,index = 1){
    var html = ''
    var soTrang = Math.round(products.length / soSP) // Tính số trang dựa trên số lượng sản phẩm và số sản phẩm mỗi trang
    if(index<1){
        index = 1
    }else if(index>soTrang){
        index = soTrang
    }
    
    var max =( index -1 ) * soSP + 5;
    if(soTrang == index){
        max = products.length
    }
    var min =( index -1 ) * soSP; // Chỉ mục sản phẩm bắt đầu (min) được tính bằng cách nhân chỉ mục trang với số sản phẩm mỗi trang.

    for (let i = min; i < max; i++) {
        const element = products[i];
        html += itemProduct(element)
    }

    return html
}

function itemProduct(item){
    var {id,name,price,thumb} = item
    return `<tr class="idProduct${id} align-center">
                <td class="align-middle text-center" style="width:120px;height:120px" scope="row">
                    <img  class="img-fluid rounded-5" src="/static/upload/${thumb}" alt="">
                </td>
                <td class="align-middle text-center">${name}</td>
                <td class="align-middle text-center">${convertToVND(price)}</td>
                <td class="align-middle text-center"><a href="product/${id}" data-link  type="button" class="edit btn btn-success">Edit</a></td>
                <td class="align-middle text-center"><button type="button" idProduct="${id}" class="delete btn btn-danger">Delete</button></td>
            </tr>`
}

$(document).on('click','.delete', function(){
    let id = $(this).attr('idProduct')
    $(`.idProduct${id}`).remove()
    deleteProduct(id)
})


async function phanTrang(soTrang){
  $('.loadAdmin').css('display','block')

    var products = await getProduct()
    soTrang = Math.round(products.length / soSP)
    var html = ''
    for (let i = 0; i < soTrang; i++) {
        html += `<li class="page-item"><button data="${i+1}"  class="page-link phan-trang">${i+1}</button></li>`
    }
  $('.loadAdmin').css('display','none')

    return html
}

var index = 1;
$(document).on('click','.phan-trang',async function(){
  $('.loadAdmin').css('display','block')

    var data = $(this).attr('data')
    if(data == "prev"){
        index  = index-1
    }else if(data == "next"){
        index  = index+1
    }else{
        index = data
    }
    var products = await getProduct()
    var html = listProduct(products,index)
    $('#listProduct').html(html)
  $('.loadAdmin').css('display','none')

})