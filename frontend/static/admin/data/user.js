import {
  getData,
  createData,
  deleteData,
  getDataByID,
  updateData,
} from "./connectData.js";

const table = "user";
export async function getUser() {
  let result = await getData(table);
  return result;
}

export async function getUserByID(id) {
  let result = await getDataByID(table, id);
  return result;
}

export async function createUser(data) {
  let result = await createData(table, data);
  return result;
}

export async function updateUser(id, data) {
  let result = await updateData(table + "/" + id, data);
  return result;
}

export async function deleteUser(data) {
  let result = await deleteData(table, data);
  return result;
}


