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

import {
  StackNavigator,
} from 'react-navigation';

export class IndexScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { this.props.navigation.navigate("New") }}
        />
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

