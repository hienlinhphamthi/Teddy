import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing Thank you");
  }

  async getHtml() {

    return `
    <div class=" container lg:w-4/5 m-auto py-8">
      <div class=" w-3/5 m-auto text-center border rounded-lg shadow-md py-6">
       <div class=" w-[150px] m-auto">
        <img src="https://static.vecteezy.com/system/resources/previews/002/743/514/non_2x/green-check-mark-icon-in-a-circle-free-vector.jpg">
       </div>
       <h2 class=" text-lg font-bold">Đặt hàng thành công</h2>
       <p>Cảm ơn quý khách đã mua hàng tại cửa hàng của chúng tôi</p>
       <p>Quý khách có thể kiểm tra tình trạng đơn hàng tại <a class=" text-green-500" data-link href="/check-order">đây</a></p>
      </div>
    </div>
        `;
  }
}
