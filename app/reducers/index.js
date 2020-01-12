import { combineReducers } from 'redux'

import searchRoute from './searchRoute'
import route from './route'

const rootReducer = combineReducers({
	searchRoute,
	route,
})
export default rootReducer
