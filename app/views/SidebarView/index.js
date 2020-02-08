import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {SafeAreaView} from 'react-native';
import { Icon } from 'react-native-elements';

import SidebarItem from './SidebarItem';
import {MID_BULE_COLOR} from '../../constants/color'
import styles from './styles';

export default class SidebarView extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	sidebarNavigate = (route) => {
		const { navigation } = this.props;
		navigation.navigate(route);
	}
	
	renderNavigation = () => {
		const { activeItemKey } = this.props;
		return(
			<React.Fragment>
				<SidebarItem
					text={'Home'}
					left={
						<Icon
							name='map-signs'
							type='font-awesome'
							color={MID_BULE_COLOR}
							size={16}
						/>
					}
					onPress={() => this.sidebarNavigate('HomeView')}
					current={activeItemKey === 'HomeView'}
				/>
				<SidebarItem
					text={'My Walt'}
					left={
						<Icon
							name='wallet'
							type='antdesign'
							color={MID_BULE_COLOR}
							size={16}
						/>
					}
					onPress={() => this.sidebarNavigate('MyWaltView')}
					current={activeItemKey === 'NewRouteView'}
				/>
				<SidebarItem
					text={'Settings'}
					left={
						<Icon
							name='setting'
							type='antdesign'
							color={MID_BULE_COLOR}
							size={16}
						/>
					}
					onPress={() => this.sidebarNavigate('SettingsView')}
					current={activeItemKey === 'SettingsView'}
				/>
				<SidebarItem
					text={'About'}
					left={
						<Icon
							name='info'
							type='feather'
							color={MID_BULE_COLOR}
							size={16}
						/>
					}
					onPress={() => this.sidebarNavigate('AboutView')}
					current={activeItemKey === 'AboutView'}
				/>
			
			</React.Fragment>
			)
		}
		
		render() {
			return (
				<SafeAreaView>
					<View
						style={styles.headerContainer}
					>
						<Icon
							reverse
							name='user'
							type='feather'
							color='#517fa4'
							size={27}
						/>
						<View>
							<Text> Pranav Pandey</Text>
							<Text> 7017451797</Text>
						</View>
					</View>
					{this.renderNavigation()}
				</SafeAreaView>
				);
			}
		}
		