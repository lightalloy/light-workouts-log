import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Emoji from 'react-native-emoji';

import Realm from 'realm';
import WorkoutEntry from './../models/WorkoutEntry';
import WorkoutItem from './../components/WorkoutItem'

var _ = require('lodash');

import {
  StackNavigator,
} from 'react-navigation';

export class IndexScreen extends React.Component {

  state = { workouts: [], realm: null }

  componentWillMount() {

  }

  componentDidMount() {
    Realm.open({ schema: [WorkoutEntry] }).then(realm => { // here is realm
      this.setState({ realm: realm });  // set it to state
      this.loadWorkouts();
    });
  }

  // loadWorkouts = async() => {
  loadWorkouts = () => {
    let realm = this.state.realm;
    this.setState({ workouts: realm.objects('WorkoutEntry') });
  }

  deleteWorkout = (id) => {
    let realm = this.state.realm;
    let workoutEntry = realm.objectForPrimaryKey('WorkoutEntry', id);
    realm.write(() => {
      realm.delete(workoutEntry);
      this.setState({ workouts: realm.objects('WorkoutEntry') });
    })
  }

  render() {
    let rows = _.chunk(this.state.workouts, 5);
    let workoutsRows = rows.map((row, index) => {
        return (<View key={index} style={styles.row}>
          {row.map((workout, j) => {
            return (<WorkoutItem key={j} handleDelete={this.deleteWorkout} workout={workout} />)
          })}
        </View>);
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You've done {this.state.workouts.length} workouts!
        </Text>
        {workoutsRows}
        <ActionButton
          buttonColor="#6698FF"
          onPress={() => { this.props.navigation.navigate("New") }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'flex-start'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default IndexScreen;

