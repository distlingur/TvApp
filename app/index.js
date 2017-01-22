import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import TvScreen from './TvScreen';
import ChannelScreen from './ChannelScreen';
import Welcome from './WelcomeScreen';



export default class App extends Component {
  render() {
    return (
      <Router>
      <Scene key="root">
        <Scene key="scarlet"
          component={TvScreen}
          title="Sjónvarpsstöðvar"
          initial
        />
        <Scene key="scarlet"
          component={TvScreen}
          title="Sjónvarpsstöðvar"
        />
        <Scene
          key="gray"
          component={ChannelScreen}
          title="Channels"

        />
      </Scene>
    </Router>
    )
  }
}

