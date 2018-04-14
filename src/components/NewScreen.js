import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


import Emoji from 'react-native-emoji';

import Realm from 'realm';
import WorkoutEntry from './../models/WorkoutEntry'

import {
  StackNavigator,
} from 'react-navigation';

const workoutTypes = ['athletic_shoe', 'ice_skate', 'ski', 'dancer', 'basketball'];

export class NewScreen extends React.Component {

  state = { workoutType: 'athletic_shoe', realm: null }

  componentWillMount() {
    Realm.open({ schema: [WorkoutEntry] }).then(realm => { // here is realm
      this.setState({ realm: realm });  // set it to state
    });
  }

  saveWorkout = () => {
    let realm = this.state.realm;
    realm.write(() => {
      const time_entry = realm.create(WorkoutEntry, { id: 3, workoutType: this.state.workoutType, time: new Date().getTime(), comment: 'test' }); // this.nextId()
      alert('truly saved');
      this.props.navigation.navigate("Index");
    });
  }

  render() {
      let workoutOptions = workoutTypes.map((option, index) => {
        return (
          <View style={styles.item}>
            <Text style={{textAlign: 'center', fontSize: 40, backgroundColor: ( option == this.state.workoutType ? 'skyblue' : '#F5FCFF')}} onPress={() => { this.setState( { workoutType: option } ) } }>
              <Emoji name={option} />
            </Text>
          </View>
        )
      });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>I've done a workout!!!</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {workoutOptions}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            color="#6698FF"
            title="Yeah!"
            onPress={this.saveWorkout}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  item: {
    width: 50,
    height: 50,
    margin: 10
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    textAlign: 'center',
    color: 'grey',
    marginBottom: 5,
  },
});




export default NewScreen;
