
export default (state = {}, action) => {
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