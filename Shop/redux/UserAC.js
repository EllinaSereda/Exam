const USER_CREATE='USER_CREATE'; //записываем информацию о пользователе
const USER_LOGOUT='USER_LOGOUT';
const USER_IMAGE='USER_IMAGE';
const PRODUCT_ADDTOBUSKET='PRODUCT_ADDTOBUSKET';
const PRODUCT_DELETE='PRODUCT_DELETE';
const PRODUCT_UPDATE='PRODUCT_UPDATE';
const MAKE_ORDER='MAKE_ORDER';


const user_create=function(info) {
  return {
    type: USER_CREATE,
    info:info,
  };
}
const user_logout=function(info) {
    return {
      type: USER_LOGOUT,
      info:info,
    };
  }
const product_addtobusket=function(info) {
    return {
      type: PRODUCT_ADDTOBUSKET,
      info:info,
    };
}
const product_delete=function(info) {
    return {
      type: PRODUCT_DELETE,
      info:info,
    };
}
const product_update=function(info) {
    return {
      type: PRODUCT_UPDATE,
      info:info,
    };
}
const make_order=function(info) {
  return {
    type: MAKE_ORDER,
    info:info,
  };
}
const user_img=function(info) {
  return {
    type: USER_IMAGE,
    info:info,
  };
}


export {
  user_create,USER_CREATE,
  user_logout,USER_LOGOUT,
  user_img,USER_IMAGE,
  product_addtobusket,PRODUCT_ADDTOBUSKET,
  product_delete, PRODUCT_DELETE,
  product_update,PRODUCT_UPDATE,
  make_order,MAKE_ORDER,
}
