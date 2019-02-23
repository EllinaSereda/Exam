import { PROD_INFO_CREATE } from './ProdInfo';

const initState={

  // ключ - идентификатор счётчика, значение - число нажатий
  products: [],

}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер

function prodInfoReducer(state=initState,action) {
  console.log('action:',action.info);
  switch (action.type) {

    case PROD_INFO_CREATE: {
      // надо создать новый счётчик
      // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
      console.log('action:',action.info);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
        products:action.info,
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    


    default:
      return state;
  }
}

export default prodInfoReducer;
