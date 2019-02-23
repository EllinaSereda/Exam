const PROD_INFO_CREATE='PROD_SORT_CREATE';

const prodInfo_create=function(info) {
  return {
    type: PROD_INFO_CREATE,
    info:info,
  };
}


export {
    prodInfo_create,PROD_INFO_CREATE,
}
