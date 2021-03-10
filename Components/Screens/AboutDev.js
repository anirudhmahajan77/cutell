import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, BackHandler} from 'react-native';
import { Avatar, Title, Paragraph} from 'react-native-paper';
import { Feather, AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as firebase from "firebase";

class AboutDev extends React.Component {
    constructor(){
        super();
        this.abortSub = new AbortController();
        this.styles = StyleSheet.create({
            background:{
                height: '100%',
                width: '100%',
            },
            container:{
                flex: 1,
                alignContent: 'center',
            },
            head:{
                height: 100,
                width: '100%',
                alignContent: 'center',
                justifyContent: "center",
            },
            heading:{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 24,
                top: 80,
            },
            intro:{
                width: '86%',
                height: 280,
                marginLeft: '7%',
                alignItems: 'center',
                borderRadius: 4,
                top: 170,
                backgroundColor: '#fff',
            },
            note:{
                width: '80%',
            },
            me: {
                marginTop: -55,
            },
            contact:{
                width: '86%',
                height: 100,
                marginLeft: '7%',
                alignItems: 'center',
                borderRadius: 4,
                top: 190,
                marginTop: 20,
                backgroundColor: '#fff',
            },
            contactList:{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 8,
                alignContent: 'space-around',
            },
            contactOptions:{
                marginLeft: 10,
                marginRight: 10,
            },
            logout:{
                position: 'absolute',
                right: 20,
                top: 40,
            },
        });
    }

    componentWillUnmount() {
        this.abortSub.abort();
    }


    openInstagram = () => {
        WebBrowser.openBrowserAsync('https://instagram.com/anirudhmahajan77');
      };
    
    openLinedin = () => {
       WebBrowser.openBrowserAsync('https://linkedin.com/anirudhmahajan77');
    };
    
    openMail = () => {
        WebBrowser.openBrowserAsync('mailto: anirudhmahajan18@gmail.com');
    };

    openTel = () => {
        WebBrowser.openBrowserAsync('tel:+91-7006204432');
    };

    
    logOut = () => {
        firebase.auth().signOut()
            .then(()=>{
                BackHandler.exitApp();
            })
            .catch((error) => {
                Alert.alert(error.message)
            })
    }

    render(){
        return(
            <ImageBackground source={require('../Asset/about.png')} style={this.styles.background}>
                <View style={this.styles.container}>
                <View>
                    <Text style={this.styles.heading}>About Developer</Text>
                    <TouchableOpacity onPress={this.logOut} style={this.styles.logout}>
                            <Feather name="log-out" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={this.styles.intro}>
                    <Avatar.Image size={110} source={require('../Asset/ani.jpg')} style={this.styles.me}/>
                    <Title>Anirudh Mahajan</Title>
                    <Paragraph>18BCA1244</Paragraph>
                    <Paragraph style={this.styles.note}>Hello There! I am Anirudh Mahajan. The creator of CU Tell. I am a certified full-stack developer and
                        I can build other things like backends, front-ends, prototypes, logos, Dynamic WebApps and a lot more!
                    </Paragraph>
                </View>
                <View style={this.styles.contact}>
                    <Title>Let's Connect!</Title>
                    <View style={this.styles.contactList}>
                        <TouchableOpacity onPress={this.openInstagram} style={this.styles.contactOptions}>
                            <Feather name="instagram" size={30} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openLinedin} style={this.styles.contactOptions}>
                            <AntDesign name="linkedin-square" size={30} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openMail} style={this.styles.contactOptions}>
                            <Feather name="mail" size={30} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openTel} style={this.styles.contactOptions}>
                            <Feather name="phone" size={30} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                <StatusBar style="light" />
            </ImageBackground>
        );
    }
}

export default AboutDev;