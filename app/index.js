import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import TvScreen from './TvScreen';
import ChannelScreen from './ChannelScreen';
import Welcome from './WelcomeScreen';


const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Welcome"
          component={Welcome}
          title="Sjónvarpsstöðvar App"
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
  );
}

export default App;




