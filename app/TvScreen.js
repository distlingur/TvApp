'use strict';

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




class Tvstations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            
            })
        };
    }

    componentDidMount() {
        this.fetchData();
    }
   
    fetchData() {
        var REQUEST_URL = 'http://apis.is/tv/';

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                var myData = responseData.results;
                var length = myData.length;
                var data;
                for(var i=0;i<length;i++) {
                    data = myData[i];
                    var getChannels = data.channels;     
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(getChannels),
                    isLoading: false
                });
            }).catch( (error) => {
              console.warn('Actions - fetchJobs - recreived error: ', error)
    })
    }

    render() {
        
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderData.bind(this)}
                style={styles.listView}
                />
            );
        }

    renderData(mydata) {
        var data = mydata.endpoint;
        const goToPageTwo = () => Actions.gray({data}); 
        
        return(
            <View>
               

        
            <TouchableOpacity  onPress={goToPageTwo}>

            <View style={styles.container}>
                <Image
                    source={{uri: 'http://www.kiodev.com/wp-content/uploads/2016/03/react-logo.png'}}
                    style={styles.thumbnail} />
        
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{mydata.name}</Text>
        </View>
      </View>
              </TouchableOpacity>

                                  <View style={styles.separator} />

        </View>
     
         );
 
    }

    renderLoadingView() {
        return (
            <View style={styles.loading}>
                
                <Text>
                    Loading Tv Stations...
                </Text>
            </View>
        );
    }

}
var styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
        marginBottom: 5,

  },
  header: {
        flex: 1,
        marginTop:10,

        alignItems: 'center',
        justifyContent: 'center'
    },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: -40,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
module.exports = Tvstations;
