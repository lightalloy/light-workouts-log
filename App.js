/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Realm from 'realm';

import {
  StackNavigator,
} from 'react-navigation';

// import ActionButton from 'react-native-action-button';
// import Emoji from 'react-native-emoji';
import { NewScreen } from './src/components/NewScreen';
import { IndexScreen } from './src/components/IndexScreen'

const RootStack = StackNavigator(
  {
    Index: {
      screen: IndexScreen,
    },
    New: {
      screen: NewScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}