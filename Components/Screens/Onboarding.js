import React from  'react';
import {StatusBar} from "expo-status-bar";
import {View, Text, ImageBackground, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as firebase from 'firebase';

class Onboarding extends React.Component {
    constructor(){
        super();
        this.abortSub = new AbortController();
        this.styles = StyleSheet.create({
            background:{
                width:'100%',
                height:'100%',
            },
            heading: {
                flex:1,
                marginLeft: 30,
                marginTop: 140,
                flexDirection: 'row',
            },
            onboardingLogo: {
                width: 58,
                height: 58,
            },
            onboardingName: {
                color: '#fff',
                fontSize: 40,
                fontWeight: 'bold',
            },
            onboardingTitle:{
                color: '#fff',
                fontSize: 27,
                marginLeft: 55,
                fontWeight: '500',
            },
            onboardingpara: {
                color: '#fff',
                opacity: 0.8,
                fontSize: 17,
                marginLeft: 55,
                fontWeight: '400',
            },
            btnGroup: {
                flex: 1,
                flexDirection: "column",
                alignSelf: 'center',
                justifyContent: 'flex-end',
                textAlign:'center',
            },
            startedbtn:{
                width: 300,
                padding:14,
                marginBottom: 30,
                borderRadius: 4,
                fontWeight :'bold',
                textAlign: 'center',
                fontSize: 16,
            },
            loginbtn:{
                color: '#181818',
                backgroundColor:'#fff',
            },
            signupbtn: {
                color: '#fff',
                backgroundColor: 'slateblue',
            }
        });
    }

    componentWillUnmount() {
        //this.abortSub = new AbortController();
        this.abortSub.abort();
    }

    render(){
        return (
            <ImageBackground source={require('../Asset/Onboard.png')} style={this.styles.background}>
                <View style={this.styles.heading}>
                    <Image source={require('../Asset/icon.png')} style={this.styles.onboardingLogo}/>
                    <Text style={this.styles.onboardingName}>CU Tell</Text>
                </View>
                <View>
                    <Text style={this.styles.onboardingTitle}>Connect Your Peers!</Text>
                    <Text style={this.styles.onboardingpara}>Ready! Steady! Connect!</Text>
                </View>
                <View style={this.styles.btnGroup}>
                    <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Login')}} ><Text style={[this.styles.startedbtn, this.styles.loginbtn]}>Login</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Signup')}}><Text style={[this.styles.startedbtn, this.styles.signupbtn]}>Get Started!</Text></TouchableOpacity>
                </View>
                <StatusBar style="light" />
            </ImageBackground>
        );
    }
}



export default Onboarding;