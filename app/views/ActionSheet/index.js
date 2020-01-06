import React, { Component } from 'react';
import { View, Text,  Keyboard } from 'react-native';
import {Modalize} from 'react-native-modalize';

import EventEmitter from '../../utils/events';
import RouteItem from './routeItem';

export const LISTENER = 'ActionSheet';

export default class ActionSheet extends Component {
	constructor(props) {
		super(props);
		this.state = {
		
		};
		
		this.modalRef = React.createRef();
	}
	
	componentDidMount() {
		EventEmitter.addEventListener(LISTENER, this.handleDisplay);
	}
	componentWillUnmount() {
		EventEmitter.removeListener(LISTENER);
	}

	handleDisplay = () => {
		Keyboard.dismiss();
		if(this.modalRef.current) {
			this.modalRef.current.open();
		}
	}

	hideActionSheet = () => {
		this.modalRef.current.close();
	}

	renderInner = () => {
		return (
			<View>
				<RouteItem />
				<RouteItem />
				<RouteItem />
				<RouteItem />
			</View>
		);
	}
	
	render() {
		return (
			<Modalize
				ref={this.modalRef}
				adjustToContentHeight
			>
				{this.renderInner()}
			</Modalize>
			);
		}
	}
	