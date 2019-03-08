import { ABOUT_CREATE } from './AboutAC';

const initState={

  about: {},

}


function aboutReducer(state=initState,action) {
  switch (action.type) {

    case ABOUT_CREATE: {
      /*console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      console.log(action.info);*/
      let newState={...state,
        about:action.info,
      };
      //console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    

    default:
      return state;
  }
}

export default aboutReducer;
