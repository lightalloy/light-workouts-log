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
    return (
      <Text style={{fontSize: 30}}>
        <Emoji name={this.props.workout.workoutType} />
      </Text>
    );
  }
}

export default WorkoutItem;

