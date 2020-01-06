import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles';
import Bus  from '../../statics/Bus';
import Train from '../../statics/Train';
import Van from '../../statics/Van';
import Rikshaw from '../../statics/Rikshaw';
import BRTS from '../../statics/BRTS';
import { Icon } from 'react-native-elements';

// const Bus = React.memo(() => {

// })

// const BRTS = React.memo(() => {

// })

// const Metro = React.memo(() => {

// })

// const Rikshaw = React.memo(() => {

// })

const Walk = React.memo(() => {
	return(
		<View>
			<Icon 
				name='walk'
				size={25}
				type='material-community'
			/>
			<Text style={styles.walkTimeText}>37</Text>
		</View>
	)
})

// const Van = React.memo(() => {

// })

const Seperator = React.memo (() => {
	return(
		<Icon
			containerStyle={styles.seperator}
			name='chevron-right'
			size={22}
			type='entypo'
      />
	)
})

export default class RouteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
		<View
			style={styles.routeItemContainer}
		>
			<View
				style={{width: '80%'}}
			>
				<Text style={styles.recomText}>RECOMMENDED ROUTE</Text>
				<ScrollView 
					horizontal
					contentContainerStyle={{paddingHorizontal: 10}}
					showsHorizontalScrollIndicator={false}
				>
					<Walk />
					<Seperator />
					<Bus height="35" width="45"/>
					<Seperator />
					<Train height="30" width="30"/>
					<Seperator />
					<Rikshaw height="32" width="32"/>
					<Seperator />
					<Van height="35" width="40"/>
					<Seperator />
					<BRTS height="35" width="40"/>
					<Seperator />
					<BRTS height="35" width="40"/>
				</ScrollView>
				<Text style={styles.timerangeText}>4:58 PM - 4:58 PM</Text>
			</View>
			<View style={styles.timeContainer}>
				<Text style={styles.timeText}>42 min</Text>
			</View>
		</View>
    );
  }
}

