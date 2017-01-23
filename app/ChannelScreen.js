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
import Actions from 'react-native-router-flux';
import moment from 'moment';




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

        alignItems: 'center',
        justifyContent: 'center'
    },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
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

class ChannelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,

            })
        };
    }

    componentDidMount() {
        this.fetchData();
    }
    loadError(){
    console.log('loaded');
    return (
    <View>
    <Text>
    something goes wrong.
    </Text>
    </View>
    )
    }   
    fetchData() {
        var REQUEST_URL = 'http://apis.is' + this.props.data;

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.results),
                    isLoading: false
                });
            }).catch( (error) => {
                console.warn('Það vantar gögn hér!!', error)
    })
            .done();
    }

    render() {
      
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderChannelData.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                renderError={this.loadError.bind(this)}

                style={styles.listView}
                />
           
        );
    }
    renderHeader() {
    return (<View style={styles.header}>
        <Text style={styles.title}>Dagsetning: {moment(new Date()).format('DD/MM/YYYY')}</Text></View>);

    }
    renderChannelData(data) {
       
        return(
        <View>
         <View style={styles.header}>


                    </View>
            <View style={styles.container}>
                <Text style={styles.content}>{moment(data.startTime).format('HH : mm ')}</Text>

        
        <View style={styles.rightContainer}>
            <Text style={styles.title}>{console.log(data)}</Text>

          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.year}> {data.originalTitle}</Text>
          <Text style={styles.year}>Tímalengd: {data.duration}</Text>
        </View>

      </View>
                                  <View style={styles.separator} />

        </View>
           
         );
    }

    renderLoadingView() {
        return (
            <View style={styles.loading}>
                
                <Text>
                    Loading Tv Stations information...
                </Text>
            </View>
        );
    }
}

module.exports = ChannelList;
