import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Emoji from 'react-native-emoji';

export class WorkoutItem extends React.Component {

  state = {}

  render() {
    let date = new Date(this.props.workout.time);
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return (
      <View>
        <Text>{`${day}.${month}`}</Text>
        <Text style={{fontSize: 40}}>
          <Emoji name={this.props.workout.workoutType} />
        </Text>
      </View>
    );
  }
}

export default WorkoutItem;

