import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  CameraRoll,
  ToastAndroid,
  ScrollView
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Emoji from 'react-native-emoji';

import ViewShot from "react-native-view-shot";

import Realm from 'realm';
import WorkoutEntry from './../models/WorkoutEntry';
import WorkoutItem from './../components/WorkoutItem'

import moment from 'moment'

const _ = require('lodash');

import {
  StackNavigator,
} from 'react-navigation';

export class IndexScreen extends React.Component {

  state = { workouts: [], month: moment().month(), year: moment().year(), realm: null }

  componentWillMount() {

  }

  componentDidMount() {
    Realm.open({ schema: [WorkoutEntry] }).then(realm => { // here is realm
      this.setState({ realm: realm });  // set it to state
      this.loadWorkouts(this.state.year, this.state.month);
    });
  }

  loadWorkouts = (year, month) => {
    // TODO - move to repository - find workouts for the specified month andyear
    // input -- current month
    let now = moment();
    let time = moment(new Date(year, month, 1))
    let start = time.startOf('month').unix();
    let finish = time.endOf('month').unix();

    // alert(this.state.realm.objects('WorkoutEntry').map(w => w.time));
    this.setState({ workouts: this.state.realm.objects('WorkoutEntry').filtered('time > $0 AND time < $1', start, finish).sorted('time', false) });
  }

  deleteWorkout = (id) => {
    let realm = this.state.realm;
    let workoutEntry = realm.objectForPrimaryKey('WorkoutEntry', id);
    realm.write(() => {
      realm.delete(workoutEntry);
      this.loadWorkouts(this.state.month);
    })
  }

  share = () => {
    this.refs.viewShot.capture().then(uri => {
      CameraRoll.saveToCameraRoll(uri).then(
        ToastAndroid.show('Screenshot saved to CameraRoll', ToastAndroid.SHORT),
        error => { alert(error) });
    },
    error => {
      alert(error);
    });
  }

  nextMonth = () => {
    let nextM, nextY;
    if (this.state.month === 11){
      nextM = 0;
      nextY = this.state.year + 1;
    }
    else {
      nextM = this.state.month + 1;
      nextY = this.state.year;
    }
    this.loadWorkouts(nextY, nextM);
    this.setState({ month: nextM, year: nextY });
  }

  prevMonth = () => {
    let prevM, prevY;
    if (this.state.month === 0){
      prevM = 11;
      prevY = this.state.year - 1;
    }
    else {
      prevM = this.state.month - 1;
      prevY = this.state.year;
    }
    this.loadWorkouts(prevY, prevM);
    this.setState({ month: prevM, year: prevY });  }

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Button
          onPress={this.prevMonth}
          title="<"
          buttonStyle={{backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 1}} titleStyle={{color: 'rgba(78, 116, 289, 1)'}} />
        <Text>{moment(this.state.month + 1, 'MM').format('MMMM, YYYY')}</Text>
        <Button onPress={this.nextMonth} title=">" />

        <View style={styles.container}>
          <View>
            <Button onPress={this.share} title="Share" />
          </View>
          <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
            <View style={{ backgroundColor: '#F5FCFF' }}>
              <Text style={styles.welcome}>
                You've done {this.state.workouts.length} workouts!
              </Text>
              {workoutsRows}
            </View>
          </ViewShot>
          <ActionButton
            buttonColor="#6698FF"
            onPress={() => { this.props.navigation.navigate("New") }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
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

