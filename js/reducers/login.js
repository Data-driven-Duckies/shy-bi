export default function (state = [], action) {
  console.log('reducers/login action.payload : ', action.payload);
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
    console.log('reducers/login login_user_success action.payload: ', action.payload);
      return action.payload;
    // case 'UNAUTH_USER':
    //   return { authenticated: false };
    // case 'LOGIN_USER_FAILURE':
    //   return { error: action.payload }
    default:
      return state;
  }
}
