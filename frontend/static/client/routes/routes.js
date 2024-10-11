import home from "../views/home.js";
import detailProduct from "../views/detailProduct.js";
import listProducts from "../views/listProducts.js";
import cart from "../views/cart.js";
import checkOut from "../views/checkOut.js";
import thanks from "../views/thanks.js";
import checkOrder from "../views/checkOrder.js";
import checkOrderDetail from "../views/checkOrderDetail.js";
import login from "../views/login.js";
import detailUser from "../views/detailUser.js";
const routes = [
    { path: "/", view: home },
    { path: "/detail-product/:id", view: detailProduct },
    { path: "/list-products", view: listProducts },
    { path: "/list-products/idCategory=:idCategory", view: listProducts },
    { path: "/list-products/search=:search", view: listProducts },
    { path: "/cart", view: cart },
    { path: "/check-out", view: checkOut },
    { path: "/thanks", view: thanks },
    { path: "/check-order", view: checkOrder },
    { path: "/check-order/:id", view: checkOrderDetail },
    { path: "/login", view: login },
    { path: "/detail-user", view: detailUser },
];

export default routes