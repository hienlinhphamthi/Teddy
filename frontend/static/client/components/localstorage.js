import { getProductByID } from "../../admin/data/product";

export async function setLocalstorage(idProduct) {
  var product = await getProductByID(idProduct);
  product = {
    quantity: 1,
    ...product,
  };
  var value 
  if (!localStorage.getItem("product")) {
    var arr = [];
    arr.push(product);
    value = JSON.stringify(arr);
    localStorage.setItem("product", value);
  } else {
    var jsonLocal = localStorage.getItem("product");
    var valueLocal = JSON.parse(jsonLocal);

    let itemExists = false;

    for (let item of valueLocal) {
      if (item.id === product.id) {
        item.quantity += product.quantity;
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      valueLocal.push(product);
    }
    value = JSON.stringify(valueLocal);
  }
  localStorage.setItem("product", value);
}

export async function updateLocal(idProduct, quantity) {
  var product = await getProductByID(idProduct);
  product = {
    quantity: quantity,
    ...product,
  };

  var value
  if (!localStorage.getItem("product")) {
    var arr = [];
    arr.push(product);
    value = JSON.stringify(arr);
    localStorage.setItem("product", value);
  } else {
    var jsonLocal = localStorage.getItem("product");
    var valueLocal = JSON.parse(jsonLocal);

    let itemExists = false;

    for (let item of valueLocal) {
      if (item.id === product.id) {
        item.quantity = product.quantity;
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      valueLocal.push(product);
    }
    value = JSON.stringify(valueLocal);
  }
  localStorage.setItem("product", value);
}

export function getLocal() {
  try {
    var jsonLocal = localStorage.getItem("product");
    var valueLocal = JSON.parse(jsonLocal);
  } catch (error) {
    console.log(error);
  }
  return valueLocal;
}

export function getItemLocal(id) {
  try {
    var jsonLocal = localStorage.getItem("product");
    var valueLocal = JSON.parse(jsonLocal);
  } catch (error) {
    console.log(error);
  }
  valueLocal = valueLocal.find((item) => {
    return item.id == id;
  });
  return valueLocal;
}

export function deleteItemCart(id) {
  var jsonLocal = localStorage.getItem("product");
  var valueLocal = JSON.parse(jsonLocal);
  var value = valueLocal.filter((item) => {
    return item.id != id;
  });

  value = JSON.stringify(value);
  localStorage.setItem("product", value);
}

export function deleteLocal() {
  localStorage.removeItem('product')
}
