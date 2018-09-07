import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import moment from 'moment'

export class MonthSwitcher extends React.Component {

  state = { month: moment().month(), year: moment().year() }

  render() {
    return (
      <View>
        <Button
          onPress={this.prevMonth}
          title="<"
          buttonStyle={{backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 1}} titleStyle={{color: 'rgba(78, 116, 289, 1)'}} />
        <Text>
          {moment(this.state.month + 1, 'MM').format('MMMM')}
          {' '}
          {this.state.year}
        </Text>
        <Button onPress={this.nextMonth} title=">" />
      </View>
    );
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
    this.props.onMonthSwitch(nextY, nextM);
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
    this.props.onMonthSwitch(prevY, prevM);
    // this.loadWorkouts(prevY, prevM);
    this.setState({ month: prevM, year: prevY });  }
}

const styles = StyleSheet.create({});

export default MonthSwitcher;
