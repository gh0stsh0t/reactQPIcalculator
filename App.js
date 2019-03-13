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

  constructor(){
    super()
    this.state = {
      display: "",
      answer: "0",
      next: false
    }
  }

  calculate = () => {
    const text = this.state.display
    const arr = text.split(' | ')
    sum = 0
    eq = 0
    for(i = 0; i < arr.length; i++){
      if(arr[i] == 'A'){
        eq = 4
      }
      else if(arr[i] == 'B+'){
        eq = 3.5
      }
      else if(arr[i] == 'B'){
        eq = 3
      }
      else if(arr[i] == 'C+'){
        eq = 2.5
      }
      else if(arr[i] == 'C'){
        eq = 2
      }
      else if(arr[i] == 'D'){
        eq = 1
      }
      else if(arr[i] == 'F/FD'){
        eq = 0
      }

      sum = sum + eq
      eq = 0
    }

    result = sum/(arr.length-1)
    this.setState({
      answer: result.toFixed(2)
    })
    this.state.next = true
  }

  keypressed = (letter) => {
    if(letter == 'E'){
      if(this.state.display != ""){
        return this.calculate()
      }
      else{
        alert('Please enter grades')
      }
    }
    else if (letter == 'R'){
      this.refresh_all()
    }else{
      if(this.state.next == true){
        this.refresh_all()
        this.state.next = false
        this.state.display = ""
      }
        this.setState({
          display: this.state.display + letter + ' | '
        })
    }
  }

  refresh_all = () => {
    this.setState({
      display: "",
      answer: "0"
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.view_answer}>
          <Text style={styles.answer}> {this.state.answer} </Text>
        </View>
        <View style={styles.view_display}>
          <Text style={styles.display}> {this.state.display} </Text>
        </View>
        <View style={styles.view_keypad}>
          <View style={styles.row}>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'A')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text}> A </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'B+')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text}> B+ </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'B')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text}> B </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'C+')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text}> C+ </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'C')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text}> C </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'D')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text}> D </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'F/FD')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text}> F/FD </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'R')} style={styles.lettergrades_btn}>
            <Text style={styles.lettergrades_text2}> CE </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.keypressed.bind(this, 'E')} style={styles.lettergrades_btn}>
              <Text style={styles.lettergrades_text2}> = </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
