
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

   export const store = (state = {}, action) => {
    switch (action.type) {
     case 'STORE_ACTION':
      return {
       store: action.store
      }
     default:
      return state
    }
   }

   export const login = (state = {}, action) => {
    switch (action.type) {
     case 'LOGIN_ACTION':
     console.log(action.result)
      return {
       email: action.result
      }
     default:
      return state
    }
   }