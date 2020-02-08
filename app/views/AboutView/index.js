import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Rickshaw from '../../statics/Rikshaw';
import styles from './styles';

export default class AboutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Rickshaw height={70} width={80} />
        </View>
        <Text
          style={styles.title}
        > Shuttle Kar LE </Text>
      <Text style={styles.description}>
        Our company aims to bring all Public Transportation service available in india under one platform and want to create a unified experience for a user{'\n'}
        Our Product will enable user to travel with any public transport with using only one ticket,{'\n'}
        We try to provide use with most accurate timeline of his journey with help of real-time tracking and our state of the art ETA predictor 
      </Text>
      <Text style={styles.info}>
        For More information kindly visit our website
      </Text>
      <Text style={styles.website}>
      https://github.com/theshuttlecompany
      </Text>
      </View>
    );
  }
}
