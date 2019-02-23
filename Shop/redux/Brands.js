const BRANDS_CREATE='BRANDS_CREATE'; //записываем информацию "Бренды" полученную из базы данных

const brands_create=function(info) {
  return {
    type: BRANDS_CREATE,
    info:info,
  };
}

export {
  brands_create,BRANDS_CREATE,
}
