import { NEWS_CREATE } from './NewsAC';

const initState={

  news: [],

}


function newsReducer(state=initState,action) {
  switch (action.type) {

    case NEWS_CREATE: {

      let newState={...state,
        news:action.info.news,
      };

      return newState;
    }
    

    default:
      return state;
  }
}

export default newsReducer;
