import React, { Component } from 'react'
import { View, Text, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Icon, Divider } from 'react-native-elements'
import Spinner from 'react-native-spinkit'

import EventEmitter from '../../utils/events'

import styles from './styles'
import searchLocation from '../../api/searchLocation'
import debounce from '../../utils/debounce'

export const LISTENER = 'SEARCH_SHEET'

export default class ActionSheet extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: '',
			searchResult: [],
			fetching: false,
			onOptionSelect: () => {},
		}

		this.modalRef = React.createRef()
	}

	componentDidMount() {
		EventEmitter.addEventListener(LISTENER, this.handleDisplay)
	}
	componentWillUnmount() {
		EventEmitter.removeListener(LISTENER)
	}

	clearText = () => {
		this.setState({
			searchText: '',
			searchResult: [],
		})
	}
	handleDisplay = ({ onOptionSelect }) => {
		if (this.modalRef.current) {
			this.modalRef.current.open()
			this.setState({
				onOptionSelect: onOptionSelect,
			})
		}
	}

	hideActionSheet = () => {
		this.modalRef.current.close()
	}

	onChangeText = text => {
		this.setState({ searchText: text, fetching: true })
		this._onChangeText(text)
	}

	_onChangeText = debounce(async text => {
		const res = await searchLocation(text)
		this.setState({ searchResult: res.features, fetching: false })
	}, 1000)

	renderHeader = () => {
		const { searchText, fetching } = this.state
		let left = null
		if (searchText) {
			left = (
				<Icon
					type="antdesign"
					name="close"
					color={'#444'}
					containerStyle={styles.searchIconContainer}
					size={20}
					onPress={this.clearText}
				/>
			)
		}
		if (fetching) {
			left = (
				<Spinner
					type="ThreeBounce"
					size={30}
					color="#aaa"
					size={25}
					style={styles.searchIconContainer}
				/>
			)
		}
		return (
			<View style={styles.textInputContainer}>
				<Icon
					type="antdesign"
					name="search1"
					color={'#aaa'}
					containerStyle={styles.searchIconContainer}
					size={20}
				/>
				<TextInput
					placeholder="Enter Destination"
					onChangeText={text => this.onChangeText(text)}
					value={searchText}
					style={{ flex: 1 }}
					selectionColor="#000"
				/>
				{left}
			</View>
		)
	}

	onPressItem = item => {
		const { onOptionSelect } = this.state
		onOptionSelect({
			name: item.text,
			location: item.center,
		})
		this.clearText()
		Keyboard.dismiss()
		this.modalRef.current.close()
	}

	renderItem = item => {
		return (
			<TouchableOpacity
				onPress={() => this.onPressItem(item)}
				style={{ marginHorizontal: 10 }}
				activeOpacity={0.3}
				key={item.id}
			>
				<View style={styles.itemContainer}>
					<Icon
						type="entypo"
						name="location-pin"
						color={'#aaa'}
						containerStyle={styles.locationIconContainer}
						size={25}
					/>
					<View style={{ flex: 1 }}>
						<View style={styles.itemTextContainer}>
							<Text style={styles.itemText}>{item.text}</Text>
							<Text style={styles.subHeading}>
								{item.place_name}
							</Text>
						</View>
						<Divider style={{ backgroundColor: '#ddd' }} />
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	renderResult = () => {
		const { searchResult } = this.state
		return searchResult.map(item => {
			return this.renderItem(item)
		})
	}

	render() {
		return (
			<Modalize
				ref={this.modalRef}
				withHandle={false}
				HeaderComponent={this.renderHeader()}
				keyboardAvoidingBehavior="padding"
				scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
			>
				{this.renderResult()}
			</Modalize>
		)
	}
}
