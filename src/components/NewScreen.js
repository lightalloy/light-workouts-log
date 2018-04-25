import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image
} from 'react-native';


import Emoji from 'react-native-emoji';

import Realm from 'realm';
import WorkoutEntry from './../models/WorkoutEntry'

import WorkoutIcon from './WorkoutIcon'

// const images = {
//   jogging: require('../../img/jogging.png'),
//   gym: require('../../img/gym.png'),
//   bicycle: require('../../img/bicycle.png'),
//   stopwatch: require('../../img/stopwatch.png'),
//   muscle: require('../../img/muscle.png')
// }

import {
  StackNavigator,
} from 'react-navigation';

const workoutTypes = {
                       jogging: 'Jogging',
                       gym: 'Gym',
                       bicycle: 'Cycling',
                       // dancer: 'Dancing',
                       stopwatch: '5-min warmup',
                       kettlebell: 'Kettlebell workout'
                     };

export class NewScreen extends React.Component {

  state = { workoutType: 'jogging', realm: null }

  componentWillMount() {
    Realm.open({ schema: [WorkoutEntry] }).then(realm => { // here is realm
      this.setState({ realm: realm });  // set it to state
      // this.prepopulate();
    });
  }

  nextWorkoutId = () => {
    let entries = this.state.realm.objects('WorkoutEntry').sorted('id', true)
    return (entries.length > 0 ? entries[0].id + 1 : 1)
  }

  saveWorkout = () => {
    let realm = this.state.realm;
    realm.write(() => {
      const wEntry = realm.create(WorkoutEntry, { id: this.nextWorkoutId(), workoutType: this.state.workoutType, time: new Date().getTime(), comment: 'test' });
      this.props.navigation.navigate("Index");
    });
  }

  render() {
      // let workoutOptions = Object.keys(workoutTypes).map((option, index) => {
      //   return (
      //     <View key={index} style={styles.item}>
      //       <Text style={{textAlign: 'center', fontSize: 40, backgroundColor: ( option == this.state.workoutType ? 'skyblue' : '#F5FCFF')}} onPress={() => { this.setState( { workoutType: option } ) } }>
      //         <Emoji name={option} />
      //       </Text>
      //     </View>
      //   )
      // });

      let workoutOptions = Object.keys(workoutTypes).map((option, index) => {
        return (
          <TouchableHighlight key={index}
                              onPress={() => { this.setState( { workoutType: option } ) } }
style={{margin: 10, backgroundColor: ( option == this.state.workoutType ? 'skyblue' : '#F5FCFF')}}
                          >
            <WorkoutIcon workoutType={option}/>

          </TouchableHighlight>
        )
      });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>I've done a workout!!!</Text>
        <View style={styles.row}>
          {workoutOptions}
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10}}>
          <Text style={styles.text}>{workoutTypes[this.state.workoutType]}</Text>
        </View>
        <View style={styles.row}>
          <Button
            color="#6698FF"
            title="Done!"
            accessibilityLabel="Add the Workout"
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  bottomRow: {
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});




export default NewScreen;
