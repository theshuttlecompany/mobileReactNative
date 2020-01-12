const endPoint = 'http://localhost:8801/otp/routers/default/plan?'
// mode = TRANSIT,WALK
// maxWalkDistance = 1000m
// arrivedBy=false
// wheelChair=false
// local = endPoint
// showIntermediateStops=true
const params =
	'mode=TRANSIT%2CWALK&maxWalkDistance=804.672&arriveBy=false&wheelchair=false&locale=en&showIntermediateStops=true'

//fromPlace LAT,LON
//toPlace
//time 9:02am
//date mm-dd-yyyy

const getCurrentDate = () => {
	const date = new Date()
	let dateSting = ''
	let mm = date.getMonth() + 1
	if (mm < 10) {
		mm = '0' + mm
	}
	let dd = date.getDate()
	if (dd < 10) {
		dd = '0' + dd
	}

	let yyyy = date.getFullYear()

	return `${mm}-${dd}-${yyyy}`
}

const getCurrentTime = () => {
	const date = new Date()
	return date.getTime()
}

export default fetchRoute = async (from, to) => {
	const fromPlace = `fromPlace=${from[1].toFixed(8)},${from[0].toFixed(8)}`
	const toPlace = `toPlace=${to[1].toFixed(8)},${to[0].toFixed(8)}`
	const date = getCurrentDate()
	const time = getCurrentTime()
	const url = `${endPoint}${fromPlace}&${toPlace}&date=${date}&time=${time}&${params}`
	console.log(url)
	try {
		const res = await fetch(url)
		const resJSON = await res.json()
		return resJSON
	} catch (e) {
		console.log('reerer', e)
	}
}
