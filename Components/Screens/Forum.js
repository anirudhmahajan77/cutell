import React from "react";
import { KeyboardAvoidingView, Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { List, Avatar, Appbar, TextInput, Card } from 'react-native-paper';

class Forum extends React.Component {
    constructor() {
        super();
        this.abortSub = new AbortController();
        this.state = {
            messages: [],
            newMessage: '',
            name: 'Ani',
            dummymessage: 'Hello',
        }
        this.styles = StyleSheet.create({
            screen: {
                width: '100%',
                height: '100%',
            },
            view: {
                width: '100%',
                height: '100%',
            },
            appbar: {
                backgroundColor: '#5238a4',
                paddingBottom: 5,
                height: 60,
            },
            input: {
                width: '84%',
                marginLeft: 7,
                position: 'absolute',
                bottom: 7,
            },
            send: {
                position: 'absolute',
                bottom: 13,
                right: 8,
            },
            mapper: {
                height: 75,
            },
            title: {
                fontSize: 18,
            },
            desc: {
                opacity: 1,
                fontSize: 18,

            },
            card: {
                width: '95%',
            }
        })
    }

    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        var updateVal = (uname, uimage,) => {
            this.setState({
                name: uname,
                image: uimage,
            })
        }
        var updateMessages = () => { }
        const forumMessages = firebase.database().ref('forum');
        forumMessages.on('value', datasnap => {
            if(datasnap.val() != null && datasnap.val() != undefined){
                let mes = Object.values(datasnap.val());
            this.setState({
                messages: mes,
            })
            }
        })
        var user = firebase.database().ref('users/' + uid);
        user.on('value', (snapshot) => {
            const data = snapshot.val();
            updateVal(data.name, data.photoURL, data.email, data.cuid);
        })
    }

    componentWillUnmount() {
        this.abortSub.abort();
    }

    sendMessage = () => {
        const user = firebase.auth().currentUser;
        const time = new Date().getTime();
        const forumMessages = firebase.database().ref('forum');
        forumMessages.push().set({
            sender: this.state.name,
            message: this.state.newMessage,
            photo: this.state.image,
            timeStamp: time
        })

        this.setState({ newMessage: '' })
    }



    render() {

        return (
            <KeyboardAvoidingView style={this.styles.screen}>
                <Appbar.Header style={this.styles.appbar}>
                    <Appbar.Content title="Forum" subtitle="University Level" />
                </Appbar.Header>
                <ScrollView style={this.styles.holder}>
                    {
                        this.state.messages.map((user) => {
                            return (
                                <Card.Title
                                    key={user.timeStamp}
                                    title={user.sender}
                                    subtitle={user.message}
                                    style={this.styles.card}
                                    titleStyle={this.styles.title}
                                    subtitleStyle={this.styles.desc}
                                    subtitleNumberOfLines={20}
                                    left={props => <Avatar.Image size={20} source={{ uri: user.photo }} {...props} />}
                                />
                            )
                        })
                    }
                </ScrollView>
                <View style={this.styles.mapper}></View>
                <TextInput
                    label="Your Message"
                    mode='outlined'
                    value={this.state.newMessage}
                    onChangeText={(message) => { this.setState({ newMessage: message }) }}
                    style={this.styles.input}
                />
                <TouchableOpacity onPress={this.sendMessage} activeOpacity={0.8} style={this.styles.send}>
                    <MaterialIcons name="send" size={45} color="#5238a4" />
                </TouchableOpacity>
                <StatusBar style="light" />
            </KeyboardAvoidingView>
        )
    }
}

export default Forum;