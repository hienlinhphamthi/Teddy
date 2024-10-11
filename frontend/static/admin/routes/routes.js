import Dashboard from "../views/Dashboard.js";

import userList from "../views/user/userList.js";
import userView from "../views/user/userUpdate.js";
import createUser from "../views/user/userAdd.js";

import categoryList from "../views/category/categoryList.js";
import categoryAdd from "../views/category/categoryAdd.js";
import categoryUpdate from "../views/category/categoryUpdate.js";

import productsList from "../views/product/productsList.js";
import productAdd from "../views/product/productAdd.js";
import productUpdate from "../views/product/productUpdate.js";

import orderList from "../views/order/orderList.js";
import orderDetail from "../views/order/orderDetail.js";

import chart from "../views/chart/listChart.js";
import detailChart from "../views/chart/detailChart.js";

import listComment from "../views/comment/listComment.js";
import detailComment from "../views/comment/detailComment.js";

import menuMess from "../views/messenger/menuMess.js";
const routes = [
    { path: "/", view: Dashboard },
    { path: "/user", view: userList },
    { path: "/user/:id", view: userView },
    { path: "/createUser", view: createUser },
    { path: "/category", view: categoryList },
    { path: "/createCategory", view: categoryAdd },
    { path: "/category/:id", view: categoryUpdate },
    { path: "/product", view: productsList },
    { path: "/createProduct", view: productAdd },
    { path: "/product/:id", view: productUpdate },
    { path: "/order", view: orderList },
    { path: "/order/:id", view: orderDetail },
    { path: "/chart", view: chart },
    { path: "/chart/:name", view: detailChart },
    { path: "/comments", view: listComment },
    { path: "/comment/:id", view: detailComment },
    { path: "/message", view: menuMess },
    { path: "/message/:id", view: menuMess },
];

export default routes