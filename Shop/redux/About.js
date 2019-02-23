const ABOUT_CREATE='ABOUT_CREATE'; //записываем информацию "Бренды" полученную из базы данных

const about_create=function(info) {
  return {
    type: ABOUT_CREATE,
    info:info,
  };
}

export {
  about_create,ABOUT_CREATE,
}
