import AbstractView from "../AbstractView.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Chart");
    }

    async getHtml() {
        return `
        <table class="table">
            <thead>
                <tr class="align-center">
                    <th class="align-middle text-center" scope="col">name</th>
                    <th class="align-middle text-center" scope="col"><a type="button" data-link href="/createCategory" class="btn btn-secondary">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="">
                <tr>
                    <th class="align-middle text-center py-3" scope="col">Thống kê số lượng sản phẩm bán ra</th>
                    <th class="align-middle text-center py-3" scope="col"><a href="/chart/so-luong-ban-ra" data-link type="button" class="edit btn btn-success">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        Detail
                    </a></th>
                </tr>
                <tr>
                    <th class="align-middle text-center py-3" scope="col">Thống kê danh thu theo ngày</th>
                    <th class="align-middle text-center py-3" scope="col"><a href="/chart/danh-thu" data-link type="button" class="edit btn btn-success">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        Detail
                    </a></th>
                </tr>
            </tbody>
        </table>

        `;
    }
}
