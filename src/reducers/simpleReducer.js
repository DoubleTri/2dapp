
export const simpleReducer = (state = {}, action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
      return {
       result: action.payload.result,
       pastColor: action.payload.pastColor   
      }
     default:
      return state
    }
   }

   export const login = (state = {}, action) => {
    switch (action.type) {
     case 'LOGIN_ACTION':
      return {
       email: action.payload  
      }
     default:
      return state
    }
   }