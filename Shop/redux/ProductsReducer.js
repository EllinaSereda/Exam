import { PRODUCTS_CREATE } from './ProductsAC';
import { PRODUCTS_SEARCH } from './ProductsAC';


const initState={

  products: [],
  search:[],

}


function productsReducer(state=initState,action) {
  switch (action.type) {

    case PRODUCTS_CREATE: {

      let newState={...state,
        products:action.info.goods,
      };
      return newState;
    }
    case PRODUCTS_SEARCH: {
      let prod=state.products;
      let reg=new RegExp('' + action.info+'','i');
      prod=prod.filter(v=>(v.name.search(reg)!=(-1)||v.brand.search(reg)!=(-1))?true:false);

      let newState={...state,
        search:prod,
      };

      return newState;
    }
    

    default:
      return state;
  }
}

export default productsReducer;
