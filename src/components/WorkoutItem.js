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
      <View style={styles.item}>
        <Text style={{fontSize: 15, textAlign: 'center'}}>{`${day}.${month}`}</Text>
        <Text style={{fontSize: 40}}>
          <Emoji name={this.props.workout.workoutType} />
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    width: 50,
    height: 50,
    margin: 10
  }
});

export default WorkoutItem;

