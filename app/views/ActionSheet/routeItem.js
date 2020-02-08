import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment-timezone'

import styles from './styles'
import Bus from '../../statics/Bus'
import Train from '../../statics/Train'
import Van from '../../statics/Van'
import Rikshaw from '../../statics/Rikshaw'
import BRTS from '../../statics/BRTS'
import { Icon } from 'react-native-elements'

// const Bus = React.memo(() => {

// })

// const BRTS = React.memo(() => {

// })

// const Metro = React.memo(() => {

// })

// const Rikshaw = React.memo(() => {

// })

const Walk = React.memo(({ duration }) => {
	return (
		<View>
			<Icon name="walk" size={25} type="material-community" />
			<Text style={styles.walkTimeText}>{Math.ceil(duration / 60)}</Text>
		</View>
	)
})

const Seperator = React.memo(() => {
	return (
		<Icon
			containerStyle={styles.seperator}
			name="chevron-right"
			size={22}
			type="entypo"
		/>
	)
})

export default class RouteItem extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	renderInner = legs => {
		return legs.map((leg, i) => {
			let item = null
			switch (leg.mode) {
				case 'WALK':
					item = <Walk duration={leg.duration} key={i} />
					break
				case 'BUS':
					item = <Bus key={i} />
					break
			}
			if (i == legs.length - 1) {
				return item
			}
			return (
				<>
					{item}
					<Seperator />
				</>
			)
		})
	}

	render() {
		const { item, onPress, keys } = this.props
		let { duration, startTime, endTime, legs } = item
		// startTime = moment
		// 	.unix(startTime)
		// 	.tz('Asia/Kolkata')
		// 	.format('LT')
		// endTime = moment
		// 	.unix(endTime)
		// 	.tz('Asia/Kolkata')
		// 	.format('LT')
		duration = (duration / 60).toFixed()
		return (
			<TouchableOpacity onPress={() => onPress(item)} key={keys}>
				<View style={styles.routeItemContainer}>
					<View style={{ width: '80%' }}>
						<Text style={styles.recomText}>RECOMMENDED ROUTE</Text>
						<ScrollView
							horizontal
							contentContainerStyle={{ paddingHorizontal: 10 }}
							showsHorizontalScrollIndicator={false}
						>
							{this.renderInner(legs)}
						</ScrollView>
						{/* <Text style={styles.timerangeText}>
						{startTime} - {endTime}
					</Text> */}
					</View>
					<View style={styles.timeContainer}>
						<Text style={styles.timeText}>{duration} min</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}
