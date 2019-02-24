import {RESET_CREATE, SEX_CHANGE, BRAND_SORT_CHANGE,MINPRICE_CHANGE,MAXPRICE_CHANGE,MINVOL_CHANGE,MAXVOL_CHANGE,FORM_CHANGESAVE } from './FormSort';

const initState={

  // ключ - идентификатор счётчика, значение - число нажатий
  brands: [],
  minprice:null,
  minvolume:null,
  maxvolume:null,
  maxprice:null,
  savedBrands:[],
  sminprice:null,
  sminvolume:null,
  smaxvolume:null,
  smaxprice:null,
  sex:[],
  ssex:[],
  reset:null,
  

}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер

function formSortReducer(state=initState,action) {
  switch (action.type) {

    case RESET_CREATE: {
      // надо создать новый счётчик
      console.log('action:','SAVE');
      // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
        brands:[],
        savedBrands:[],
        minprice:null,
        minvolume:null,
        maxvolume:null,
        maxprice:null,
        sminprice:null,
        sminvolume:null,
        smaxvolume:null,
        smaxprice:null,
        ssex:[],
        sex:[],
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    
    case MINPRICE_CHANGE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
       minprice:action.info,
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    case MAXPRICE_CHANGE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState
      if (state.minprice<=action.info){
        newState={...state,
          maxprice:action.info,
         };
      }
      else newState={...state,
        maxprice:state.minprice,
       };
      
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }

    case MINVOL_CHANGE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
       minvolume:action.info,
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    case SEX_CHANGE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newS = [...state.sex];
      newS.some(v=>v==action.info)?
      newS=newS.filter(v=>v!=action.info)
      :newS.push(action.info);
      let newState={...state,
        sex:newS,
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    case MAXVOL_CHANGE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState
      if (state.minvolume<=action.info){
        newState={...state,
          maxvolume:action.info,
         };
      }
      else newState={...state,
        maxvolume:state.minvolume,
       };
      
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }

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


    case FORM_CHANGESAVE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      
      let newState={...state,
        savedBrands:action.info,
        sminprice:state.minprice,
        smaxprice:state.maxprice,
        sminvolume:state.minvolume,
        smaxvolume:state.maxvolume,
        ssex:state.sex,
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }

    default:
      return state;
  }
}

export default formSortReducer;
