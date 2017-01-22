import React, { Component } from 'react';


import channels from './ChannelScreen';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
var moment = require('moment');




var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

        padding: 1,
    },
    thumbnail: {
        width: 53,
        height: 1,
        marginRight: 0
    },
    rightContainer: {
        flex: 1,


    },
    content: {
        fontSize: 20,
        marginBottom: 8,
        flex: 1,

    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class BookList extends Component {

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
    _renderScene(route, navigator) {
    if (route.id === 2) {
      return <channels navigator={navigator} />
        }
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
            })
            .done();
    }

    render() {
        <Navigator
        initialRoute={{id: 1, }}
        renderScene={this._renderScene}
         />
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderBook.bind(this)}
                style={styles.listView}
                />
        );
    }

    renderBook(book) {


        return(
             <View>
                    <Text style={styles.content}>Dagsetning: {moment(book.startTime).format('MM/DD/YYYY')}</Text>

                    <View style={styles.container}>
                        
                        <View style={styles.loading}>

                            <Text style={styles.content}>{book.title}</Text>
                            <Text style={styles.content}> {book.originalTitle}</Text>
                            <Text style={styles.content}>Klukkan: {moment(book.startTime).format('hh : mm ')}</Text>
                            <Text style={styles.content}>Tímalengd: {book.duration}</Text>



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

    showBookDetail() {

            this.navigator.push({id: 2,});

    }


}

module.exports = BookList;
