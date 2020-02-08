import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { connect } from 'react-redux'
import Spinner from 'react-native-spinkit'

import EventEmitter from '../../utils/events'
import RouteItem from './routeItem'
import { HEIGHT } from '../../utils/deviceInfo'
import fetchRoutes from '../../api/fetchRoutes'
import styles from './styles'
import { setRoute } from '../../actions/route'
import {LISTENER as DETAILED_ROUTE} from '../DetailedRouteSheet';

export const LISTENER = 'ActionSheet'

class ActionSheet extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isFetching: true,
			data: {},
			showError: false,
		}

		this.modalRef = React.createRef()
	}

	componentDidMount() {
		EventEmitter.addEventListener(LISTENER, this.handleDisplay)
	}
	componentWillUnmount() {
		EventEmitter.removeListener(LISTENER)
	}

	handleDisplay = () => {
		Keyboard.dismiss()
		const { start, end } = this.props
		this.setState({ isFetching: true, showError: false })
		if (this.modalRef.current) {
			this.modalRef.current.open()
			fetchRoutes(start.location, end.location)
				.then(res => {
					if (res.error) {
						return this.setState({
							isFetching: false,
							showError: true,
						})
					}
					this.setState({
						data: res.plan.itineraries,
						isFetching: false,
					})
				})
				.catch(e => {})
		}
	}

	hideActionSheet = () => {
		this.modalRef.current.close()
	}

	handleItemPress = (route) => {
		EventEmitter.emit(DETAILED_ROUTE);
		this.props.setRoute(route);
		this.reset();
	}

	reset = () => {
		this.setState({
			isFetching: true,
			data: {},
		})
		this.hideActionSheet();
	}

	renderInner = () => {
		const { isFetching, data, showError } = this.state
		if (isFetching) {
			return (
				<View style={styles.spinner}>
					<Spinner
						type="ThreeBounce"
						color="#aaa"
						size={70}
					/>
				</View>
			)
		}
		if (showError) {
			return (
				<Text>
					Oops Looks like we don't have any route available right now
				</Text>
			)
		}
		return data.map((item, i) => {
			return (
				<RouteItem item={item} onPress={this.handleItemPress} keys={i} />
			)
		})
	}

	render() {
		return (
			<Modalize ref={this.modalRef} modalHeight={HEIGHT / 2 - 100}>
				{this.renderInner()}
			</Modalize>
		)
	}
}

const mapStateToProps = state => ({
	start: state.searchRoute.start,
	end: state.searchRoute.end,
})

const mapDispatchToProps = dispatch => ({
	setRoute: route => dispatch(setRoute(route)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionSheet)
