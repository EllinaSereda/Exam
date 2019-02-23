const PRODUCTS_CREATE='PRODUCTS_CREATE'; //записываем информацию "Бренды" полученную из базы данных

const products_create=function(info) {
  return {
    type: PRODUCTS_CREATE,
    info:info,
  };
}

export {
  products_create,PRODUCTS_CREATE,
}
