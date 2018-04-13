import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// import Realm from 'realm'
// import WorkoutEntry from './../models/WorkoutEntry'

import Emoji from 'react-native-emoji';

import {
  StackNavigator,
} from 'react-navigation';

export class NewScreen extends React.Component {

  state = { workoutType: 'athletic_shoe', realm: null }

  // componentWillMount() {
  //   Realm.open({ schema: [WorkoutEntry] }).then(realm => { // here is realm
  //     this.setState({ realm: realm });  // set it to state
  //   });
  // }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>I've done a workout!!!</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 50, height: 50}}>
            <Text style={{fontSize: 30}} onPress={() => { alert('select!'); this.setState( { workoutType: 'athletic_shoe' } ) } }>
              <Emoji name="athletic_shoe" />
            </Text>
          </View>
          <View style={{width: 50, height: 50}}>
            <Text style={{fontSize: 30}} onPress={() => { alert('select!'); this.setState( { workoutType: 'ice_skate' } ) } }>
              <Emoji name="ice_skate" />
            </Text>
          </View>
          <View style={{width: 50, height: 50}}>
            <Text style={{fontSize: 30}} onPress={() => { alert('select!'); this.setState( { workoutType: 'ski' } ) } }>
              <Emoji name="ski" />
            </Text>
          </View>
          <View style={{width: 50, height: 50}}>
            <Text style={{fontSize: 30}} onPress={() => { alert('select!'); this.setState( { workoutType: 'dancer' } ) } }>
              <Emoji name="dancer" />
            </Text>
          </View>
        </View>
        <Button
          color="#6698FF"
          title="Yeah!"
          onPress={() => { this.saveWorkout }}
        />
      </View>
    );
  }

  // saveWorkout = () => {
  //   alert('Saved!');
  //   let realm = this.state.realm;
  //   realm.write(() => {
  //     const time_entry = realm.create(WorkoutEntry, { id: 1, workoutType: this.state.workoutType, time: new Date().getTime() }); // this.nextId()
  //     alert('truly saved');
  //     this.props.navigation.navigate("Index");
  //   });
  // }
}

export default NewScreen;
