import { GET_ALL_USERS, GET_RECOMMENDED_USERS, SIGN_UP_USER } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    case SIGN_UP_USER:
      return action.payload;
    case GET_RECOMMENDED_USERS:
      return action.payload;
    default:
      return state;
  }
}
