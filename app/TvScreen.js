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

var REQUEST_URL = 'http://apis.is/tv/';



var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

        padding: 10,
    },
    cellContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop:60,

        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
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

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                var organizations = responseData.results;
                var length = organizations.length;
                var organization;
                for(i=0;i<length;i++) {
                    organization = organizations[i];
                    users = organization.channels;
                    userLength = users.length;

                    
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(users),
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
        var data = book.endpoint;
        const goToPageTwo = () => Actions.gray({data}); 

        return(
        <View>
                    <TouchableOpacity  onPress={goToPageTwo}>

                    <View style={styles.cellContainer}>
                        <Image
                            source={{uri: 'http://www.kiodev.com/wp-content/uploads/2016/03/react-logo.png'}}
                            style={styles.thumbnail} />
                        <View style={styles.loading}>

                            <Text style={styles.content}>{book.name}</Text>



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

    showBookDetail() {

            this.navigator.push({id: 2,});

    }


}

module.exports = BookList;
