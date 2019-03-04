const PRODUCTS_CREATE='PRODUCTS_CREATE'; //записываем информацию "Бренды" полученную из базы данных
const PRODUCTS_SEARCH='PRODUCTS_SEARCH'; 

const products_create=function(info) {
  return {
    type: PRODUCTS_CREATE,
    info:info,
  };
}

const products_search=function(info) {
  return {
    type: PRODUCTS_SEARCH,
    info:info,
  };
}

export {
  products_create,PRODUCTS_CREATE,
  products_search,PRODUCTS_SEARCH,
}
