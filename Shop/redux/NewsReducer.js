import { NEWS_CREATE } from './News';

const initState={

  news: [],

}


function newsReducer(state=initState,action) {
  switch (action.type) {

    case NEWS_CREATE: {
     /* console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      console.log(action.info);*/
      let newState={...state,
        news:action.info.news,
      };
      //console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    

    default:
      return state;
  }
}

export default newsReducer;
