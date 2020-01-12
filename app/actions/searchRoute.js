import { SEARCH_ROUTE } from '../actions/actionTypes'

export function setStart(data) {
	return {
		type: SEARCH_ROUTE.SET_START,
		data,
	}
}
export function setEnd(data) {
	return {
		type: SEARCH_ROUTE.SET_END,
		data,
	}
}
export function reset() {
	return {
		type: SEARCH_ROUTE.RESET,
	}
}

export function resetStart() {
	return {
		type: SEARCH_ROUTE.RESET_START,
	}
}

export function resetEnd() {
	return {
		type: SEARCH_ROUTE.RESET_END,
	}
}
