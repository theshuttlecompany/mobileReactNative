import { SEARCH_ROUTE } from '../actions/actionTypes'

const initialState = {
	start: {
		name: 'Your Pick Up Location',
		location: [72.5977, 23.0111],
	},
	end: {
		name: 'Your Destination Location',
		location: [72.5482, 23.009],
	},
}

function searchRoute(state = initialState, action) {
	switch (action.type) {
		case SEARCH_ROUTE.SET_START:
			return {
				...state,
				start: action.data,
			}
		case SEARCH_ROUTE.SET_END:
			return {
				...state,
				end: action.data,
			}
		case SEARCH_ROUTE.RESET:
			return initialState
		case SEARCH_ROUTE.RESET_START:
			return {
				...state,
				start: initialState.start,
			}
		case SEARCH_ROUTE.RESET_END:
			return {
				...state,
				end: initialState.end,
			}
		default:
			return state
	}
}

export default searchRoute
