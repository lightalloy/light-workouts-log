import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

import Emoji from 'react-native-emoji';
import WorkoutIcon from './WorkoutIcon';
import moment from 'moment';

export class WorkoutItem extends React.Component {

  state = {}

  render() {
    let date = moment(this.props.workout.time*1000);
    let month = date.month() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.date();
    day = day < 10 ? `0${day}` : day;
    return (
      <View style={styles.item}>
        <Text>
          <Text style={styles.caption}>{`${day}.${month}`} </Text>
          <Text style={{ fontSize: 15, color: 'red' }} onPress={() => { this.props.handleDelete(this.props.workout.id) }}>x</Text>
        </Text>
        <WorkoutIcon workoutType={this.props.workout.workoutType} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    width: 50,
    height: 50,
    margin: 10
  },
  caption: {
    fontSize: 15,
    textAlign: 'center'
  }
});

export default WorkoutItem;

