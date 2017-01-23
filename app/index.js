import React, { Component } from 'react';
import { Router, Scene,TabBar } from 'react-native-router-flux';

import TvScreen from './TvScreen';
import ChannelScreen from './ChannelScreen';
import Welcome from './WelcomeScreen';
import searching from './SearchScreen.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,

  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
var moment = require('moment');

export default class App extends Component {
  render() {
    return (
      <Router>

      <Scene key="root">
        
        <Scene key="home"
          component={Welcome}
          title="Sjónvarp"
          
        />

        <Scene key="scarlet"
          component={TvScreen}
          title="Sjónvarpsstöðvar"
          initial
        />
        <Scene
          key="gray"
          component={ChannelScreen}
          title= {'Dagskrá: ' + moment(new Date()).format('DD/MM/YYYY')}

        />
        <Scene
          key="search"
          component={searching}
          title="Leita af Sjónvarpsstöð"

        />
      </Scene>
    </Router>
    )
  }
}
let style = StyleSheet.create({
        tabBarStyle: {
            borderTopWidth : .5,
            borderColor    : '#b7b7b7',
            backgroundColor: 'white',
            opacity        : 1
        }
    });
