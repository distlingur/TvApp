'use strict';
import React, { Component } from 'react';


import channels from './ChannelScreen';

import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  View,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
import Actions from 'react-native-router-flux';
import moment from 'moment';






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
    handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
    fetchData() {
        var REQUEST_URL = 'http://apis.is' + this.props.endpoints;

        fetch(REQUEST_URL)
            .then(this.handleErrors)

            .then((response) => response.json())
            .then((responseData) => {
                

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.results),
                    isLoading: false
                });
            }).catch( (error) => {
                Alert.alert(
            'Gögn ekki til',
            'Göngn fyrir þessa stöð hafa ekki verið uppfærð :/',
          )

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
                    <Text style={styles.subtitle}> {data.originalTitle}</Text>
                    <Text style={styles.subtitle}>Tímalengd: {data.duration}</Text>
                </View>

            </View>
            <View style={styles.separator} />
        </View>
           
         );
    }

    renderLoadingView() {
        return (

            <View style={styles.loading}>
            <ActivityIndicator
            style={[styles.centering, {transform: [{scale: 1.5}]}]}
            size="large"
            />    
                <Text>
                    Loading Tv Stations information...
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
  subtitle: {
    textAlign: 'center',
  },
  loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
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
module.exports = ChannelList;
