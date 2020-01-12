import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import MapboxGL from '@react-native-mapbox-gl/maps'

import store from './store'
import SideBarView from './views/SidebarView'
import ActionSheet from './views/ActionSheet/index'
import SearchPlaceView from './views/SearchPlaceView'

const InsideStack = createDrawerNavigator(
	{
		HomeView: {
			getScreen: () => require('./views/HomeView').default,
		},
		AboutView: {
			getScreen: () => require('./views/AboutView').default,
		},
		NewRouteView: {
			getScreen: () => require('./views/NewRouteView').default,
		},
		SettingsView: {
			getScreen: () => require('./views/SettingsView').default,
		},
	},
	{
		contentComponent: SideBarView,
	}
)

const InsideStackModal = createStackNavigator(
	{
		InsideStack: InsideStack,
	},
	{
		mode: 'modal',
		headerMode: 'none',
	}
)

class CustomInsideStack extends React.Component {
	static router = InsideStackModal.router

	render() {
		const { navigation } = this.props
		return (
			<React.Fragment>
				<InsideStackModal navigation={navigation} />
				<ActionSheet />
				<SearchPlaceView />
			</React.Fragment>
		)
	}
}

const App = createAppContainer(CustomInsideStack)

export default class Root extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		MapboxGL.setAccessToken(
			'pk.eyJ1IjoibWFudXBhbmRheTE5OTgiLCJhIjoiY2syd3dtdDRoMGs2YzNxbzk3cWx5N2s2NyJ9.M210B6H1BoIn9rl2G5q1Xw'
		)
	}

	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}
