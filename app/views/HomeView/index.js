import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableHighlight } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { MapView } from 'tangram-es-react-native';
import { connect } from 'react-redux';

import styles from './styles';
import {MID_BULE_COLOR, GREEN, RED} from '../../constants/color';
import debounce from '../../utils/debounce';
import stopMarkerBitMap from '../../constants/stopMarker';
import startMarkerBitMap from '../../constants/startMarker';
import { ponitStyle } from '../../constants/markerStyles';
import { LISTENER } from '../ActionSheet';
import EventEmitter from '../../utils/events';

const OPTION = {
	START: 'start',
	END: 'end',
	NONE: 'none',
}


const g = {latitude: 23.022477262781923, longitude: 72.58875296435085}

class HomeView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			geo : {
				longitude: 72.5714,
				latitude: 23.0225,
			},
			selection: OPTION.NONE,
			startLngLat: null,
			endLagLat: null
		};
		this.mapRef = React.createRef()
		this.startMarker = null;
		this.endMarker = null;
	}
	
	handlePanGesture = (e) => {
		const {selection} = this.state;
		if(selection === OPTION.NONE){
			return;
		}
		if(selection === OPTION.START) {
			return this.setPickUpLocation();
		}
		return this.setDropoffLocation();
		
	}

	initializeMap = () => {
		const { geo } = this.state;
		this.mapRef.setGeoPosition(geo);
		this.initializeMarker();
	}

	initializeMarker = () => {
		this.mapRef.addMarker().then(marker => {
			this.startMarker = marker;
			marker.setVisible(false);
			marker.setBitmap(startMarkerBitMap);
			marker.setStylingFromString(ponitStyle);
		});

		this.mapRef.addMarker().then( marker => {
			this.endMarker = marker;
			marker.setVisible(false);
			marker.setBitmap(stopMarkerBitMap);
			marker.setStylingFromString(ponitStyle);
		});
	}
	
	onDrawerPressed = () => {
		const { navigation } = this.props;
		navigation.openDrawer(); 
	}
	
	onPickupPinSelect = () => {
		const { selection } = this.state;
		if(selection == OPTION.START) {
			this.setState({ selection: OPTION.NONE })
		} else {
			this.setState({ selection: OPTION.START})
			this._setPickUpLocation()
		}
	}
	
	onDropOffPinSelect = () => {
		const { selection } = this.state;
		if(selection == OPTION.END) {
			this.setState({ selection: OPTION.NONE })
		} else {
			this.setState({ selection: OPTION.END})
			this._setDropoffLocation()
		}
	}

	showActionSheet = () => {
		EventEmitter.emit(LISTENER);
	}


	_setPickUpLocation = () => {
		this.mapRef.getGeoPosition().then( LonLat => {
			this.setState({
				startLngLat: LonLat
			});
			this.startMarker.setPoint(LonLat);
			this.startMarker.setVisible(true);
		})
	}

	setPickUpLocation = debounce(this._setPickUpLocation, 300);
	
	_setDropoffLocation = () => {
		this.mapRef.getGeoPosition().then( LonLat => { 
			this.setState({
				endLagLat: LonLat
			});
			this.endMarker.setPoint(LonLat);
			this.endMarker.setVisible(true);
		})
	}

	setDropoffLocation = debounce(this._setDropoffLocation, 300);
	
	renderSelectionPin = () => {
		const { selection } = this.state;
		if (selection != OPTION.NONE) {
			return(<Icon 
				iconStyle={styles.selectionPin}
				name='map-pin'
				type='font-awesome'
				color={selection == OPTION.START ? GREEN : RED}
				size={26}
				/>)
		}
	}
		
	renderPickMenu = () => {
		const { selection, startLngLat, endLagLat } = this.state;
		let startText = 'Your Pick Up Location'
		let endText = 'Your destination Location'
		if (startLngLat) {
			startText = startLngLat.longitude.toFixed(4) + ' ' +  startLngLat.latitude.toFixed(4);
		}
		
		if(endLagLat) {
			endText = endLagLat.longitude.toFixed(4) + ' ' +  endLagLat.latitude.toFixed(4);
		}
		
		return(
			<View
			style={styles.pickMenu}
			>
				<View style= {styles.pickItemContainer}>
					<Icon
						name='location'
						type='evilicon'
						color={MID_BULE_COLOR}
					/>
					<View style={{flex: 1, marginHorizontal: 10}}>
						<Text style={styles.pickSubtitle}>Pick-up</Text>
						<Text style={styles.pickTitle}>{startText}</Text>
					</View>
					<Icon 
					iconStyle={styles.icon}
					name='map-pin'
					type='font-awesome'
					color={selection == OPTION.START ? GREEN : MID_BULE_COLOR}
					size={16}
					onPress={this.onPickupPinSelect}
					/>
				</View>
				<View style= {styles.pickItemContainer}>
					<Icon
					name='location'
					type='evilicon'
					color={RED}
					
					/>
					<View style={{flex: 1, marginHorizontal: 10}}>
						<Text style={styles.pickSubtitle}>Drop-off</Text>
						<Text style={styles.pickTitle}> {endText}</Text>
					</View>
					<Icon 
						iconStyle={styles.icon}
						name='map-pin'
						type='font-awesome'
						color={selection == OPTION.END ? RED : MID_BULE_COLOR}
						size={16}
						onPress={this.onDropOffPinSelect}
					/>
				</View>
			</View>
			)
		}

		renderFindRouteButton = () => {
			const { startLngLat, endLagLat } = this.state;
			if(startLngLat && endLagLat ) {
				return(
					<Text 
						style={styles.findRouteButton}
						onPress={this.showActionSheet}	
					>
						Find Route
					</Text>
				)
			}
			return null;
		}
		
		render() {
			return (
			<SafeAreaView
				style={{flex:1}}
			>
				<MapView
					ref={(r) =>this.mapRef =r}
					style={styles.map}
					scenePath={'./scene.yaml'}
					zoom={14}
					maxZoom={16}
					minZoom={11}
					onPan={this.handlePanGesture}
					onSceneReady={this.initializeMap}
					handleFling={false}
				/>
				<Icon
					containerStyle = {styles.drawerButton}
					name='menuunfold'
					type='antdesign'
					color={MID_BULE_COLOR}
					raised
					onPress={this.onDrawerPressed}
					size={20}
				/>
				<Icon
					containerStyle = {styles.myLocationButton}
					name='my-location'
					type='material'
					color={MID_BULE_COLOR}
					raised
					onPress={this.pick}
					size={20}
				/>
				{this.renderSelectionPin()}
				{this.renderPickMenu()}
				{this.renderFindRouteButton()}
			</SafeAreaView>
			);
		}
}
			
const mapStateToProps = state => ({
	
	
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
			