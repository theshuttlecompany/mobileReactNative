import { ROUTE } from '../actions/actionTypes'

const initialState = []

export default function route(state = initialState, action) {
	switch (action.type) {
		case ROUTE.SET:
			return action.data
		case ROUTE.RESET:
			return initialState
		default:
			return state
	}
}
