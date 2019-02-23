import { PRODUCTS_CREATE } from './Products';

const initState={

  products: [],

}


function productsReducer(state=initState,action) {
  switch (action.type) {

    case PRODUCTS_CREATE: {
      /*console.log('action:',action);
      console.log('state до обработки редьюсером:',state);*/
      let newState={...state,
        products:action.info.goods,
      };
      //console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    

    default:
      return state;
  }
}

export default productsReducer;
