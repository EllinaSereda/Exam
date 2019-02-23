import {  BRAND_SORT_CHANGE,BRAND_SORT_CHANGESAVE } from './BrandSort';

const initState={

  // ключ - идентификатор счётчика, значение - число нажатий
  brands: [],
  savedBrands:[],
  amount:null,

}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер

function brandsSortReducer(state=initState,action) {
  switch (action.type) {

    /*case BRAND_SORT_CREATE: {
      // надо создать новый счётчик
      // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
        brands:[...state.brands],
        savedBrands:[...savedBrands],
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }*/
    
    case BRAND_SORT_CHANGE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newBr = [...state.brands];
      newBr.some(v=>v==action.info)?
      newBr=newBr.filter(v=>v!=action.info)
      :newBr.push(action.info);
      let newState={...state,
        brands:newBr,
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    case BRAND_SORT_CHANGESAVE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      
      let newState={...state,
        savedBrands:action.info,
        amount:action.info.length
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }

    default:
      return state;
  }
}

export default brandsSortReducer;
