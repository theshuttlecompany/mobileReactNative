import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { Icon } from 'react-native-elements'

import styles from './styles';

export default class WalkDetail extends Component {
  constructor(props) {
	super(props);
	this.state = {
	};
  }
  getData = () => {
	  const { item } = this.props;
	  const { steps } = item;
	  const data = [];
	  data.push({
			title: `${steps[0].distance.toFixed(2)} meter`,
			description: `start on ${steps[0].streetName} heading ${steps[0].absoluteDirection}`
	  })
	  for(let i =1; i < steps.length; i++) {

		 data.push({
			title: `${steps[1].distance.toFixed(2)} meter`,
			description: `${steps[0].relativeDirection} on to ${steps[0].streetName}`
		 }) 
	  }
	  return data;

  }

  render() {
	return (
	<View>
		<View style={styles.walkDetailHeader}>
			<Icon name="walk" size={40} type="material-community" color={'grey'} />
		</View>
		<Timeline 
			data={this.getData()}
			showTime={false}
			innerCircle={'dot'}
			circleColor='grey'
			lineColor='grey'
			titleStyle={{color: 'grey', fontSize: 14, padding: 0}}
			descriptionStyle={{color:'gray'}}
			listViewStyle={{marginHorizontal: 10,}}
			detailContainerStyle={{marginVertical: 0}}
		/>
	</View>
	);
  }
}
