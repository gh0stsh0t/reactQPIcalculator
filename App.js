/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{

  constructor() {
    super()
    this.state = {
      display: "",
      answer: "0",
      next: false
    }
  }

  calculate = () => {
    const text = this.state.display
    const arr = [0, ...text.split(' | ')]
    const values = { 'A':4, 'B+':3.5, 'B':3, 'C+': 2.5, 'C':2, 'D':1, 'F/FD':0, '':0 }
    const total = arr.reduce((acc, letter)=>acc=acc+values[letter])/(arr.length-2)
    this.setState({
      answer: total.toFixed(2),
      next: true
    })
  }

  keypressed = (letter) => {
    const { display, next, answer } = this.state
    if(letter === 'E') {
      if(display !== "") {
        this.calculate()
      } else {
        this.setState({
          next: true,
          display: "Please enter grades"
        })
      }
    } else {
      this.setState({
        next: false,
        answer: next || letter === 'R' ? 0 : answer,
        display: letter === 'R' ? "" : (next ? "" : display)+ letter + ' | '
      })
    }
  }

  render() {
    const { answer, display } = this.state
    const { container, view_answer, view_display, view_keypad, row } = styles
    return (
      <View style={container}>
        <View style={view_answer}>
          <Text style={styles.answer}> {answer} </Text>
        </View>
        <View style={view_display}>
          <Text style={styles.display}> {display} </Text>
        </View>
        <View style={view_keypad}>
          <View style={row}>
            <KeyButton onPress={()=>this.keypressed('A')} letter="A" version={1} />
            <KeyButton onPress={()=>this.keypressed('B+')} letter="B+" version={1} />
            <KeyButton onPress={()=>this.keypressed('B')} letter="B" version={1} />
          </View>
          <View style={row}>
            <KeyButton onPress={()=>this.keypressed('C+')} letter="C+" version={1} />
            <KeyButton onPress={()=>this.keypressed('C')} letter="C" version={1} />
            <KeyButton onPress={()=>this.keypressed('D')} letter="D" version={1} />
          </View>
          <View style={row}>
            <KeyButton onPress={()=>this.keypressed('F/FD')} letter="F/FD" version={1} />
            <KeyButton onPress={()=>this.keypressed('R')} letter="CE" version={2} />
            <KeyButton onPress={()=>this.keypressed('E')} letter="=" version={2} />
          </View>
        </View>
      </View>
    );
  }
}

const KeyButton = (props) => {
    const textStyle = props.version === 2 ? styles.lettergrades_text2 : styles.lettergrades_text
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.lettergrades_btn}>
            <Text style={textStyle}> {props.letter} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  display: {
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  answer: {
    fontSize: 80,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  view_display: {
    flex: 2,
    backgroundColor: '#1e90ff',
  },
  view_answer: {
    flex: 3,
    backgroundColor: '#1e90ff',
  },
  view_keypad: {
    flex: 10,
    backgroundColor: '#cbcbc9',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  lettergrades_text: {
    flex: 1,
    fontSize: 30,
    fontFamily: 'Roboto',
    textAlign: 'center',
    textAlignVertical: 'center',
    color:'#1e90ff',
  },
  lettergrades_text2: {
    flex: 1,
    fontSize: 45,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#1e90ff',
  },
  lettergrades_btn: {
    flex: 1,
  },
});
