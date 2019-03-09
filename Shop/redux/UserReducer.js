import { USER_CREATE } from './UserAC';
import { USER_LOGOUT } from './UserAC';

import { PRODUCT_ADDTOBUSKET } from './UserAC';

import { PRODUCT_UPDATE } from './UserAC';
import { MAKE_ORDER } from './UserAC';
const initState={

  info: null,

}


function userReducer(state=initState,action) {
  switch (action.type) {

    case USER_CREATE: {

      let newState={...state,
        info:action.info,
      };

      return newState;
    }
  
    case USER_LOGOUT: {

        let newState={...state,
          info:null,
        };
        return newState;
      }

    case PRODUCT_ADDTOBUSKET: {
  
        let newState={...state,
          info:{...state.info,
            order:{...action.info}
            
          }
        };
        return newState;
      }
      case PRODUCT_UPDATE: {

        let newState={...state,
          info:{...state.info,
            order:action.info,
            
          }
        };
        return newState;
      }
    
    case MAKE_ORDER: {

        let newState={...state,
          info:{...state.info,
            order:{},
            buy:[...state.info.buy,{...state.info.order}]
          }
        };
        return newState;
      }

    default:
      return state;
  }
}

export default userReducer;
