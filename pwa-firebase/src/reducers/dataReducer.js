import { FETCH_TODOS } from '../actions/types'
import initialState from '../store'

export default (state=initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload;
    default:
      return state
  }
}