import {RESET_CREATE, SEX_CHANGE, BRAND_SORT_CHANGE,MINPRICE_CHANGE,MAXPRICE_CHANGE,MINVOL_CHANGE,MAXVOL_CHANGE,FORM_CHANGESAVE } from './FormSortAC';

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

      return newState;
    }
    
    case MINPRICE_CHANGE: {

      let newState={...state,
       minprice:action.info,
      };

      return newState;
    }
    case MAXPRICE_CHANGE: {

      let newState
      if (state.minprice<=action.info){
        newState={...state,
          maxprice:action.info,
         };
      }
      else newState={...state,
        maxprice:state.minprice,
       };
      
 
      return newState;
    }

    case MINVOL_CHANGE: {

      let newState={...state,
       minvolume:action.info,
      };

      return newState;
    }
    case SEX_CHANGE: {

      let newS = [...state.sex];
      newS.some(v=>v==action.info)?
      newS=newS.filter(v=>v!=action.info)
      :newS.push(action.info);
      let newState={...state,
        sex:newS,
      };
   
      return newState;
    }
    case MAXVOL_CHANGE: {

      let newState
      if (state.minvolume<=action.info){
        newState={...state,
          maxvolume:action.info,
         };
      }
      else newState={...state,
        maxvolume:state.minvolume,
       };
      
  
      return newState;
    }

    case BRAND_SORT_CHANGE: {

      let newBr = [...state.brands];
      newBr.some(v=>v==action.info)?
      newBr=newBr.filter(v=>v!=action.info)
      :newBr.push(action.info);
      let newState={...state,
        brands:newBr,
      };
      return newState;
    }


    case FORM_CHANGESAVE: {
      
      let newState={...state,
        savedBrands:action.info,
        sminprice:state.minprice,
        smaxprice:state.maxprice,
        sminvolume:state.minvolume,
        smaxvolume:state.maxvolume,
        ssex:state.sex,
      };
      return newState;
    }

    default:
      return state;
  }
}

export default formSortReducer;
