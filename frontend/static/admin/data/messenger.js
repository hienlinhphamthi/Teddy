import {
    getData,
    createData,
    deleteData,
    getDataByID,
    updateData,
  } from "./connectData.js";
  
  const table = "messengers";
  export async function getMessengers() {
    let result = await getData(table);
    return result;
  }
  
  export async function getMessengerByID(id) {
    let result = await getDataByID(table, id);
    return result;
  }

  export async function getMessengerDetailByID(idMess,idDetail) {
    let result = await getDataByID(table + "/" + idMess + "/mess", idDetail);
    return result;
  }
  
  export async function createMessenger(data) {
    let result = await createData(table, data);
    return result;
  }
  
  export async function updateMessenger(id, data) {
    let result = await createData(table + "/" + id + "/mess", data);
    return result;
  }

  export async function updateSeeMess(id, data) {
    let result = await updateData(table + "/" + id , data);
    return result;
  }
  
  export async function deleteMessenger(id) {
    let result = await deleteData(table, id);
    return result;
  }
    
  export async function deleteMessengerItem(idMess,idDetail) {
    let result = await deleteData(table + "/" + idMess + "/mess", idDetail);
    return result;
  }
  
  
  