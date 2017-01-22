'use strict';

var React = require('react-native');
var BookList = require('./index');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  Image
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Featured extends Component {
    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{
            title: 'Featured Books',
            component: BookList
        }}/>
        );
    }
}

module.exports = Featured;