//const BRAND_SORT_CREATE='BRAND_SORT_CREATE';
const BRAND_SORT_CHANGE='BRAND_SORT_CHANGE';
const FORM_CHANGESAVE='FORM_CHANGESAVE';
const MINPRICE_CHANGE='MINPRICE_CHANGE';
const MAXPRICE_CHANGE='MAXPRICE_CHANGE';
const MINVOL_CHANGE='MINVOL_CHANGE';
const MAXVOL_CHANGE='MAXVOL_CHANGE';
const RESET_CREATE='RESET_CREATE';
const SEX_CHANGE='SEX_CHANGE'

const reset_create=function(info) {
  return {
    type: RESET_CREATE,
    brands:info,
  };
}

const brandSort_change=function(info) {
  console.log(info);
  return {
    type: BRAND_SORT_CHANGE,
    info:info,
  };
}
const minPrice_change=function(info) {
  console.log(info);
  return {
    type: MINPRICE_CHANGE,
    info:info,
  };
}
const maxPrice_change=function(info) {
  console.log(info);
  return {
    type: MAXPRICE_CHANGE,
    info:info,
  };
}
const minVol_change=function(info) {
  console.log(info);
  return {
    type: MINVOL_CHANGE,
    info:info,
  };
}
const maxVol_change=function(info) {
  console.log(info);
  return {
    type: MAXVOL_CHANGE,
    info:info,
  };
}
const form_changeSave=function(info) {
  console.log(info);
  return {
    type: FORM_CHANGESAVE,
    info:info,
  };
}
const sex_change=function(info) {
  console.log(info);
  return {
    type: SEX_CHANGE,
    info:info,
  };
}

export {
  //brandSort_create,BRAND_SORT_CREATE,
  brandSort_change,BRAND_SORT_CHANGE,
  form_changeSave,FORM_CHANGESAVE,
  minPrice_change,MINPRICE_CHANGE,
  maxPrice_change,MAXPRICE_CHANGE,
  minVol_change,MINVOL_CHANGE,
  maxVol_change,MAXVOL_CHANGE,
  reset_create,RESET_CREATE,
  sex_change,SEX_CHANGE,
}
