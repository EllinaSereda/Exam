import { ABOUT_CREATE } from './AboutAC';

const initState={

  about: {},

}


function aboutReducer(state=initState,action) {
  switch (action.type) {

    case ABOUT_CREATE: {

      let newState={...state,
        about:action.info,
      };
 
      return newState;
    }
    

    default:
      return state;
  }
}

export default aboutReducer;
