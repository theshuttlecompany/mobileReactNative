import { ROUTE } from './actionTypes'

export function setRoute(route) {
	return {
		type: ROUTE.SET,
		data: route,
	}
}

export function resetRoute() {
	return {
		type: ROUTE.RESET,
	}
}
