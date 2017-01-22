import React, { Component } from 'react';


import TvScreen from './TvScreen';

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

class App extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      moviesData: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    this.fetchMoviesData();
  }
  
  renderRow(rowData){
   
    var chats = rowData.channels.map(function(d){
        return d.name
    });
    
      return (
        <TouchableHighlight onPress={() => this.showBookDetail(rowData)}
                                underlayColor='#dddddd'>
        <View style={styles.thumb}>
        
          <Text style={styles.txt}>{chats[0]} </Text>
          <Text style={styles.txt}>{chats[1]} </Text>

          

      </View>
                  </TouchableHighlight>

      );
  }
  showBookDetail(rowData) {

        this.props.navigator.push({
            title: rowData.channels,
            component: TvScreen,
            passProps: {rowData}
        });
        
    }

  fetchMoviesData() {
    var url = 'http://apis.is/tv/';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
            
        
        this.setState({
          moviesData: this.state.moviesData.cloneWithRows(jsonData.results),
          loaded: true,

        });
      })
    .catch( error => console.log('Error fetching: ' + error) );
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading TV Channels...
        </Text>
      </View>
    );
  }
  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      
     
      <ListView
        dataSource={this.state.moviesData}
        renderRow={this.renderRow}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
  thumb: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    elevation: 1
  },
  img: {
    height: 300
  },
  txt: {
    margin: 10,
    fontSize: 16,
    textAlign: 'left'
  }
});
export default App;
export default app