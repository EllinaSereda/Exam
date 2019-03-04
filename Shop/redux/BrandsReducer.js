import { BRANDS_CREATE } from './BrandsAC';

const initState={

  brands: [],
  brandsMain: [],

}


function brandsReducer(state=initState,action) {
  switch (action.type) {

    case BRANDS_CREATE: {
      /*console.log('action:',action);
      console.log('state до обработки редьюсером:',state);*/
      let newState={...state,
        brands:action.info.brands,
        brandsMain:action.info.brands.slice(0,6),
      };
      //console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    

    default:
      return state;
  }
}

export default brandsReducer;
