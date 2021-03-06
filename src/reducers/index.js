import { combineReducers } from 'redux';

import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './usersReducer';
import ProfileReducer from './profileReducer';
import AuthReducer from './authReducer';
import ActionsReducer from './actionsReducer';
import MessagesReducer from './messagesReducer';
import BadgesReducer from './badgesReducer';
import LeftNavReducer from './leftNavReducer';
import FilterInputsReducer from './filterInputsReducer';
import LocationReducer from './locationReducer';
import ExpandCardReducer from './expandCardReducer';

const RootReducer = combineReducers({
  location: LocationReducer,
  leftNavToggle: LeftNavReducer,
  form: FormReducer,
  users: UsersReducer,
  profile: ProfileReducer,
  auth: AuthReducer,
  actions: ActionsReducer,
  messages: MessagesReducer,
  filterInputs: FilterInputsReducer,
  card: ExpandCardReducer,
  badges: BadgesReducer,
});

export default RootReducer;
