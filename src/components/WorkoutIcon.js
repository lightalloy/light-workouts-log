import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

const images = {
  jogging: require('../../img/jogging.png'),
  gym: require('../../img/gym.png'),
  bicycle: require('../../img/bicycle.png'),
  stopwatch: require('../../img/stopwatch.png'),
  kettlebell: require('../../img/kettlebell.png')
}

export class WorkoutIcon extends React.Component {
  render() {
    return (
      <Image
        source={images[this.props.workoutType]}
      />
    );
  }
}


const styles = StyleSheet.create({
});

export default WorkoutIcon;

