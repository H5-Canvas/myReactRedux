
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const defaultState = {
    name: 'zsj',
    age: 25
}
function reducer(state = defaultState, action){
    switch(action.type){
        case 'CHANGE_NAME':
            state.name = action.data;
            return state
        default:
            return state    
    }
}
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store