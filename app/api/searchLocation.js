const endPoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const apiKey =
	'access_token=pk.eyJ1IjoibWFudXBhbmRheTE5OTgiLCJhIjoiY2syd3dtdDRoMGs2YzNxbzk3cWx5N2s2NyJ9.M210B6H1BoIn9rl2G5q1Xw'

const bbox = '72.428,22.9156,72.7078,23.2829' //minLon,minLat,maxLon,maxLat

export default searchLocation = async location => {
	if (!location) {
		return
	}
	const url = `${endPoint}${location}.json?${apiKey}&bbox=${bbox}`
	try {
		const res = await fetch(url)
		return await res.json()
	} catch (e) {
		console.log(e)
	}
}
