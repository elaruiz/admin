import { combineReducers } from 'redux';
import user from './UserReducer';
import users from './UserAdminReducer';
import plans from './PlansAdminReducer';
import messages from './MessagesReducer';
import services from './ServicesReducer';

export default combineReducers({
    user,
    users,
    plans,
    messages,
    services
});