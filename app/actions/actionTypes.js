function createRequestTypes(base, types = defaultTypes) {
	const res = {}
	types.forEach(type => (res[type] = `${base}_${type}`))
	return res
}

export const SEARCH_ROUTE = createRequestTypes('SEARCH_ROUTE', [
	'SET_START',
	'SET_END',
	'RESET',
	'RESET_START',
	'RESET_END',
])

export const ROUTE = createRequestTypes('ROUTE', ['SET', 'RESET'])
