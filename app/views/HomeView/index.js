import React, { Component } from 'react'
import {
	View,
	Text,
	SafeAreaView,
	TouchableWithoutFeedback,
	Image,
} from 'react-native'
import { Icon, Divider } from 'react-native-elements'
import MapboxGL from '@react-native-mapbox-gl/maps'
import { connect } from 'react-redux'
import polyline from '@mapbox/polyline'

import styles, { lineStyle } from './styles'
import { MID_BULE_COLOR, GREEN, RED } from '../../constants/color'
import { LISTENER as LISTENER_ACTIONSHEET } from '../ActionSheet'
import { LISTENER as LISTENER_SEARCH_PLACE } from '../SearchPlaceView'
import { LISTENER as LISTENER_DETAIL } from '../DetailedRouteSheet'
import EventEmitter from '../../utils/events'
import {
	setStart,
	setEnd,
	resetEnd,
	resetStart,
} from '../../actions/searchRoute'
import startIcon from '../../statics/start.png'
import endIcon from '../../statics/end.png'
import fetchRoute from '../../api/fetchRoutes'
import { resetRoute } from '../../actions/route'
import { TouchableOpacity } from 'react-native-gesture-handler'

const layerStyles = {
	origin: {
		circleRadius: 5,
		circleColor: 'white',
	},
	destination: {
		circleRadius: 5,
		circleColor: 'white',
	},
	route: {
		lineColor: '#000000',
		lineWidth: [
			'interpolate',
			['linear'],
			['zoom'],
			10,
			0.5,
			11,
			1,
			12,
			2,
			13,
			5,
			16,
			10,
		],
		lineDasharray: [1, 3],
		lineCap: 'round',
		lineOpacity: 0.5,
	},
	progress: {
		lineColor: '#314ccd',
		lineWidth: 3,
	},
}

const OPTION = {
	START: 'start',
	END: 'end',
	NONE: 'none',
}

const MAX_ZOOM = 17
const MIN_ZOOM = 10

const MAP_BOUNDS = {
	ne: [72.7078, 23.2829],
	sw: [72.428, 22.9156],
}

const startStyle = {
	iconImage: startIcon,
	iconSize: 0.2,
	iconAnchor: 'bottom',
	iconAllowOverlap: true,
}

const endStyle = {
	iconImage: endIcon,
	iconSize: 0.2,
	iconAnchor: 'bottom',
	iconAllowOverlap: true,
}

const CENTER = [72.5714, 23.0225]

class HomeView extends Component {
	constructor(props) {
		super(props)

		this.state = {
			geo: {
				longitude: 72.5714,
				latitude: 23.0225,
			},
			selection: OPTION.NONE,
		}
		this.mapRef = React.createRef()
		this.startMarker = null
		this.endMarker = null
	}

	onDrawerPressed = () => {
		const { navigation } = this.props
		navigation.openDrawer()
	}

	showStartSearchSheet = () => {
		EventEmitter.emit(LISTENER_SEARCH_PLACE, {
			onOptionSelect: this.props.setStart,
		})
	}

	showEndSearchSheet = () => {
		EventEmitter.emit(LISTENER_SEARCH_PLACE, {
			onOptionSelect: this.props.setEnd,
		})
	}

	onStartPinSelect = () => {
		const { selection } = this.state
		this.props.resetStart()
		if (selection == OPTION.START) {
			this.setState({ selection: OPTION.NONE })
			this.setStartLocation()
		} else if (selection == OPTION.END) {
			this.setState({ selection: OPTION.START })
			this.setEndLocation()
		} else {
			this.setState({ selection: OPTION.START })
		}
	}

	onEndPinSelect = () => {
		const { selection } = this.state
		this.props.resetEnd()
		if (selection == OPTION.END) {
			this.setState({ selection: OPTION.NONE })
			this.setEndLocation()
		} else if (selection == OPTION.START) {
			this.setState({ selection: OPTION.END })
			this.setStartLocation()
		} else {
			this.setState({ selection: OPTION.END })
		}
	}

	showActionSheet = () => {
		EventEmitter.emit(LISTENER_ACTIONSHEET)
	}

	showDetailActionSheet = () => {
		EventEmitter.emit(LISTENER_DETAIL)
	}

	setEndLocation = async () => {
		const LonLang = await this.mapRef.getCenter()
		this.props.setEnd({
			name: `${LonLang[0].toFixed(4)} ${LonLang[1].toFixed(4)}`,
			location: LonLang,
		})
	}

	setStartLocation = async () => {
		const LonLang = await this.mapRef.getCenter()
		this.props.setStart({
			name: `${LonLang[0].toFixed(4)} ${LonLang[1].toFixed(4)}`,
			location: LonLang,
		})
	}

	renderSelectionPin = () => {
		const { selection } = this.state
		if (selection == OPTION.START) {
			return <Image source={startIcon} style={styles.selectionPin} />
		} else if (selection == OPTION.END) {
			return <Image source={endIcon} style={styles.selectionPin} />
		} else {
			return null
		}
	}

	renderPickMenu = () => {
		const { selection } = this.state
		const { start, end } = this.props
		return (
			<View style={styles.pickMenu}>
				<TouchableWithoutFeedback onPress={this.showStartSearchSheet}>
					<View style={styles.pickItemContainer}>
						<Icon
							name="location"
							type="evilicon"
							color={MID_BULE_COLOR}
						/>
						<View style={{ flex: 1, marginHorizontal: 10 }}>
							<Text style={styles.pickSubtitle}>Pick-up</Text>
							<Text style={styles.pickTitle}>{start.name}</Text>
						</View>
						<Icon
							iconStyle={styles.icon}
							name="map-pin"
							type="font-awesome"
							color={
								selection == OPTION.START
									? GREEN
									: MID_BULE_COLOR
							}
							size={16}
							onPress={this.onStartPinSelect}
						/>
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback onPress={this.showEndSearchSheet}>
					<View style={styles.pickItemContainer}>
						<Icon name="location" type="evilicon" color={RED} />
						<View style={{ flex: 1, marginHorizontal: 10 }}>
							<Text style={styles.pickSubtitle}>Drop-off</Text>
							<Text style={styles.pickTitle}> {end.name}</Text>
						</View>
						<Icon
							iconStyle={styles.icon}
							name="map-pin"
							type="font-awesome"
							color={
								selection == OPTION.END ? RED : MID_BULE_COLOR
							}
							size={16}
							onPress={this.onEndPinSelect}
						/>
					</View>
				</TouchableWithoutFeedback>
			</View>
		)
	}

	renderFindRouteButton = () => {
		const { start, end } = this.props
		if (start.location && end.location) {
			return (
				<Text
					style={styles.findRouteButton}
					onPress={this.showActionSheet}
				>
					Find Route
				</Text>
			)
		}
		return null
	}
	renderResetRouteButton = () => {
		const { route } = this.props

		if (!route.length) {
			return null
		}
		return (
			<Icon
				name="cross"
				type="entypo"
				color={RED}
				containerStyle={styles.resetRoute}
				reverse
				raised
				onPress={this.props.resetRoute}
				size={20}
			/>
		)
	}

	renderOpenDetailbutton = () => {
		const { route } = this.props

		if (!route.length) {
			return null
		}
		return (
			<Icon
				name="map-marker-path"
				type="material-community"
				color={MID_BULE_COLOR}
				containerStyle={styles.openDetail}
				reverse
				raised
				onPress={this.showDetailActionSheet}
				size={20}
			/>
		)
	}

	renderRoute = () => {
		const { route } = this.props

		if (!route.length) {
			return null
		}
		return route.map((leg, i) => {
			let geoJSON = polyline.toGeoJSON(leg.legGeometry.points)
			const feture = MapboxGL.geoUtils.makeFeature(geoJSON)
			return (
				<MapboxGL.ShapeSource id={'routeSource' + i} shape={feture}>
					<MapboxGL.LineLayer
						id={'routeFill' + i}
						style={lineStyle[leg.mode]}
					/>
				</MapboxGL.ShapeSource>
			)
		})
	}

	renderStartPin = () => {
		const { start } = this.props
		if (!start.location) {
			return null
		}

		const feture = MapboxGL.geoUtils.makeFeature({
			type: 'Point',
			coordinates: start.location,
		})
		return (
			<MapboxGL.ShapeSource id="shapeStartPin" shape={feture}>
				<MapboxGL.SymbolLayer
					id="symbolLayerStartPin"
					minZoomLevel={1}
					style={startStyle}
				/>
			</MapboxGL.ShapeSource>
		)
	}

	renderEndPin = () => {
		const { end } = this.props
		if (!end.location) {
			return null
		}

		const feture = MapboxGL.geoUtils.makeFeature({
			type: 'Point',
			coordinates: end.location,
		})
		return (
			<MapboxGL.ShapeSource id="shapeEndPin" shape={feture}>
				<MapboxGL.SymbolLayer
					id="symbolLayerEndPin"
					minZoomLevel={1}
					style={endStyle}
				/>
			</MapboxGL.ShapeSource>
		)
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<MapboxGL.MapView
					ref={c => (this.mapRef = c)}
					styleURL={MapboxGL.StyleURL.Street}
					style={styles.map}
					logoEnabled={false}
					attributionEnabled={false}
					regionWillChangeDebounceTime={100}
				>
					<MapboxGL.Camera
						zoomLevel={12}
						maxBounds={MAP_BOUNDS}
						maxZoomLevel={MAX_ZOOM}
						minZoomLevel={MIN_ZOOM}
						animationMode={'flyTo'}
						animationDuration={1000}
						centerCoordinate={CENTER}
					/>
					{this.renderRoute()}
					{this.renderEndPin()}
					{this.renderStartPin()}
				</MapboxGL.MapView>
				<Icon
					containerStyle={styles.drawerButton}
					name="menuunfold"
					type="antdesign"
					color={MID_BULE_COLOR}
					raised
					onPress={this.onDrawerPressed}
					size={20}
				/>
				<Icon
					containerStyle={styles.myLocationButton}
					name="my-location"
					type="material"
					color={MID_BULE_COLOR}
					raised
					onPress={this.pick}
					size={20}
				/>
				{this.renderSelectionPin()}
				{this.renderPickMenu()}
				{this.renderFindRouteButton()}
				{this.renderResetRouteButton()}
				{this.renderOpenDetailbutton()}
			</SafeAreaView>
		)
	}
}

const mapStateToProps = state => ({
	start: state.searchRoute.start,
	end: state.searchRoute.end,
	route: state.route,
})

const mapDispatchToProps = dispatch => ({
	setStart: data => dispatch(setStart(data)),
	setEnd: data => dispatch(setEnd(data)),
	resetEnd: () => dispatch(resetEnd()),
	resetStart: () => dispatch(resetStart()),
	resetRoute: () => dispatch(resetRoute()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
