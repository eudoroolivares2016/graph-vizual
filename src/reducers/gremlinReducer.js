import { ACTIONS } from '../constants'

const initialState = {
  host: 'localhost',
  port: '8182',
  query: 'g.V()',
  error: null
}
// Set the next state equal to the value of what the payload has
export const reducer =  (state=initialState, action)=>{
  switch (action.type){
    case ACTIONS.SET_HOST: {
      return { ...state, host: action.payload }
    }
    case ACTIONS.SET_PORT: {
      return { ...state, port: action.payload }
    }
    // Error in case the query fails to retrieve data from gremlin-server
    case ACTIONS.SET_QUERY: {
      return { ...state, query: action.payload, error: null }
    }
    case ACTIONS.SET_ERROR: {
      return { ...state, error: action.payload }
    }
    default:
      return state
  }
}
