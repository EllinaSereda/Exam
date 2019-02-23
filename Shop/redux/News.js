const NEWS_CREATE='NEWS_CREATE'; //записываем информацию "Новости" полученную из базы данных

const news_create=function(info) {
  return {
    type: NEWS_CREATE,
    info: info,
  };
}

export {
  news_create,NEWS_CREATE,
}
