import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import store from './store';
import SideBarView from './views/SidebarView';
import ActionSheet from './views/ActionSheet/index'

const InsideStack = createDrawerNavigator({
	
	HomeView: {
		getScreen: () => require('./views/HomeView').default
    },
    AboutView: {
		getScreen: () => require('./views/AboutView').default
	},
	NewRouteView: {
		getScreen: () => require('./views/NewRouteView').default
	},
	SettingsView: {
		getScreen: () => require('./views/SettingsView').default
	}
},{
    unmountInactiveRoutes: true,
    contentComponent: SideBarView
})

const InsideStackModal = createStackNavigator({
	InsideStack: InsideStack
},{
    mode: 'modal',
    headerMode: 'none'
});

class CustomInsideStack extends React.Component {
	static router = InsideStackModal.router;

	render() {
		const { navigation } = this.props;
		return (
			<React.Fragment>
				<InsideStackModal navigation={navigation} />
			    <ActionSheet />
			</React.Fragment>
		);
	}
}


const App = createAppContainer(CustomInsideStack);

export default class Root extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
} 



