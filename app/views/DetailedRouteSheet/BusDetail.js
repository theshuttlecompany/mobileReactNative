import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import moment from 'moment';
import BRTS from '../../statics/BRTS'
import styles from './styles';

export default class BusDetail extends Component {
  constructor(props) {
	super(props);
	this.state = {
	};
  }

  getData = () => {
	  const {intermediateStops, to} = this.props.item;
	  const data = intermediateStops.map((stop) => {
		const time = moment(stop.arrival)
		return {
			title: time.format('h:mm a'),
			description: stop.name
		}
	  })
	  const time = moment(to.arrival)
	  data.push({
			title: time.format('h:mm a'),
			description: to.name
		});
	return data;
  }

  render() {
	return (
	  <View>
		<View
			style={styles.busDetailHeader}
		>
			<BRTS height="50" width="60"/>
				<Text style={styles.busDetailHeaderText}>{this.props.item.from.name}</Text> 
		</View>
		<Timeline 
			data={this.getData()}
			showTime={false}
			innerCircle={'dot'}
			titleStyle={{color: 'grey', fontSize: 14, padding: 0}}
			descriptionStyle={{color:'gray'}}
			listViewStyle={{marginHorizontal: 10,}}
			detailContainerStyle={{marginVertical: 0}}
		/>
	  </View>
	);
  }
}