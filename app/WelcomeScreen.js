import React, { Component } from 'react';


import channels from './ChannelScreen';

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
import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';



var REQUEST_URL = 'http://apis.is/tv/';


class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {page:'second'};

        
    }
   
    render() {
    const goToPage = () => Actions.scarlet(); 
        
    return (
         <View style={styles.container}>
         <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
            <Text name="first">First</Text>
            <Text name="second" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
            <Text name="third">Third</Text>
            <Text name="fourth" selectedStyle={{color:'green'}}>Fourth</Text>
            <Text name="fifth">Fifth</Text>
        </Tabs>
      <Text style={styles.welcome}>
        Sjónvarpsstöðva app!
      </Text>
      <Text style={styles.instructions}>
              Selected page: {this.state.page}
          </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={goToPage}>
        <View>
          <Text style={styles.buttonText}>Áfram!</Text>
        </View>
      </TouchableOpacity>        
    </View>
    
    );    
    }

    
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCCCC'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 7,
  }
});
module.exports = Welcome;
