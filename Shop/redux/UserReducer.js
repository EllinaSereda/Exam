import { USER_CREATE } from './UserAC';
import { USER_LOGOUT } from './UserAC';
import { USER_IMAGE } from './UserAC';
import { PRODUCT_ADDTOBUSKET } from './UserAC';
import { PRODUCT_DELETE } from './UserAC';
import { PRODUCT_UPDATE } from './UserAC';
import { MAKE_ORDER } from './UserAC';
const initState={

  info: null,

}


function userReducer(state=initState,action) {
  switch (action.type) {

    case USER_CREATE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      console.log(action.info);
      let newState={...state,
        info:action.info,
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
  
    case USER_LOGOUT: {
        console.log('action:',action);
        console.log('state до обработки редьюсером:',state);
        console.log(action.info);
        let newState={...state,
          info:null,
        };
        console.log('state после обработки редьюсером:',newState);
        return newState;
      }
    case USER_IMAGE: {
        console.log('action:',action);
        console.log('state до обработки редьюсером:',state);
        console.log(action.info);
        let newState={...state,
          info:{...state.info,
          picture:action.info},
        };
        console.log('state после обработки редьюсером:',newState);
        return newState;
      }
    case PRODUCT_ADDTOBUSKET: {
        console.log('action:',action);
        console.log('state до обработки редьюсером:',state);
        console.log(action.info);
        let newState={...state,
          info:{...state.info,
            order:{...action.info}
            
          }
        };
        console.log('state после обработки редьюсером:',newState);
        return newState;
      }
      case PRODUCT_UPDATE: {
        console.log('action:',action);
        console.log('state до обработки редьюсером:',state);
        console.log(action.info);
        let newState={...state,
          info:{...state.info,
            order:action.info,
            
          }
        };
        console.log('state после обработки редьюсером:',newState);
        return newState;
      }
    /*case PRODUCT_DELETE: {
        console.log('action:',action);
        console.log('state до обработки редьюсером:',state);

        let order={...state.info.order};
        console.log(order);
        delete order[action.info[0]][action.info[1]];
        let i=0;
        for (let key in order[action.info[0]]){
          i++;
          
        }
        
        if (i==0){
          delete order[action.info[0]];
        }
        let newState={...state,
          info:{...state.info,
            order:order,
            
          }
        };
        console.log('state после обработки редьюсером:',newState);
        return newState;
      }*/

    case MAKE_ORDER: {
        console.log('action:',action);
        console.log('state до обработки редьюсером:',state);
        console.log(state.info.buy)
        let newState={...state,
          info:{...state.info,
            order:{},
            buy:[...state.info.buy,{...state.info.order}]
          }
        };
        console.log('state после обработки редьюсером:',newState);
        return newState;
      }

    default:
      return state;
  }
}

export default userReducer;
