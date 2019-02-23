//const BRAND_SORT_CREATE='BRAND_SORT_CREATE';
const BRAND_SORT_CHANGE='BRAND_SORT_CHANGE';
const BRAND_SORT_CHANGESAVE='BRAND_SORT_CHANGESAVE';

/*const brandSort_create=function(info) {
  return {
    type: BRAND_SORT_CREATE,
    brands:info,
  };
}*/

const brandSort_change=function(info) {
  console.log(info);
  return {
    type: BRAND_SORT_CHANGE,
    info:info,
  };
}
const brandSort_changeSave=function(info) {
  console.log(info);
  return {
    type: BRAND_SORT_CHANGESAVE,
    info:info,
  };
}

export {
  //brandSort_create,BRAND_SORT_CREATE,
  brandSort_change,BRAND_SORT_CHANGE,
  brandSort_changeSave,BRAND_SORT_CHANGESAVE,
}
