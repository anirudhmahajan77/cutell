import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ActivityIndicator, Colors, Headline } from 'react-native-paper';
import {StatusBar} from "expo-status-bar";
import * as firebase from 'firebase';

class LoadingScreen extends React.Component {
    constructor() {
        super();
        this.abortSub = new AbortController();
        this.styles = StyleSheet.create({
            background: {
                width: '100%',
                height: '100%',
                backgroundColor: '#172243',
            },
            tinyLogo: {
                width: 200,
                height: 200,
                position: 'absolute',
                top: 90,
                left: 110,
            },
            text: {
                color: '#ffffff',
                fontSize: 60,
                position: 'absolute',
                top: 280,
                left: 102,
            },
            loader:{
                position: 'absolute',
                top: 420,
                left: 180,
            }
        })
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.props.navigation.replace("Dashboard");
            } else {
                this.props.navigation.replace("Starting");
            }
          });
    }

    componentWillUnmount() {
        //this.abortSub = new AbortController();
        this.abortSub.abort();
    }

    render() {
        return (
            <View style={this.styles.background}>
                <Image
                    style={this.styles.tinyLogo}
                    source={require('../Asset/icon.png')}
                />
                <ActivityIndicator animating={true} style={this.styles.loader} color={Colors.white} size={'large'} />
                <StatusBar style='light' />
            </View>
        )
    }
}

export default LoadingScreen;