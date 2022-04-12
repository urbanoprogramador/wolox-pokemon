import { IFetchingState, Ierror } from "./interfaceReducer";

export const reduceReducers = <T>(...reducers: Function[]) => (state: any, action: any): T =>
  reducers.reduce((acc, el) => el(acc, action), state);



export const makeFetchingReducer = (actions: String[]) => {

  const initialFetching: IFetchingState = { loading: 'idle', error: null };
  return (state: IFetchingState = initialFetching, action: any): IFetchingState => {
    switch (action.type) {
      case actions[0]: {
        return {
          ...state, loading: 'pending', error: null
        }
      }
      case actions[1]: {
        return { ...state, loading: 'rejected', error: action.payload }

      }
      case actions[2]: {

        return { ...state, loading: 'succeded', error: null }
      }
      default:
        return state;
    }
  }
}

export const makeRemoveReducer = <T>(staticAction: string) => (state: T, action: any): T | null => {
  switch (action.type) {
    case staticAction: {
      return null;
    }
    default: {
      return state
    }
  }
}




export const makeSetReducer = <T>({ actions, initialState }: { actions: string, initialState: T }) => (state = initialState, action: any): T => {
  switch (action.type) {
    case actions: {
      return action.payload;
    }
    default:
      return state
  }
}
export const makeCrudReducer = <T>(actions: string[], init: T[]) => (state: T[]  = init, action: any): T[]  => {
  
  switch (action.type) {
    case actions[0]: {
      
      return action.payload;
    }
    case actions[1]: {
        const newTodos = state.map((todo: any) => {
          if (todo.id === action.payload.id) {
            return { ...action.payload }
          }
          return todo
        })
        return newTodos;
    }
    case actions[2]: {
        const newEntities = state.filter((entities: any) => {
          return entities.id !== action.payload
        });
        return newEntities;
      
    }
    case actions[3]: {
        return state.concat({ ...action.payload });
      
    }
    default: {
      return state;
    }
  }
}



export const mac = <T>(type: String/* ,...argNames:any[] */) => (args: T) => {
  const action: {} = { type, ...args };
  /*   argNames.forEach((...[,index])=>{
        action[argNames[index]]=args[index];
    });
    console.log(action,args); */
  return action;
}

export const mat = (entity: String): String[] => ([
  `${entity} pending`,
  `${entity} rejected`,
  `${entity} success`
]);




export const asyncMac = (asyncTypes: String[]): Function[] => ([
  mac(asyncTypes[0]),
  mac<Ierror>(asyncTypes[1]/* ,'payload' */),
  mac(asyncTypes[2]/* ,'payload' */)
]);

