import React from 'react';
import { KeyboardAvoidingView, Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import * as firebase from 'firebase';
import { MaterialIcons } from '@expo/vector-icons';
import ChatMessage from './ChatMessage';
import ScrollableFeed from 'react-scrollable-feed'

class Chat extends React.Component {
    constructor() {
        super();
        this.abortSub = new AbortController();
        this.state = {
            name: '',
            cuid: '',
            uid: '',
            photoURL: '',
            message: '',
            messages: [],
            messagess: [],
        }
        this.styles = StyleSheet.create({
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
            screen: {
                width: '100%',
                height: '100%',
            },
            sentMessage: {
                backgroundColor: '#444',
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 15,
                borderTopLeftRadius: 15,
                marginRight: 4,
                marginLeft: 'auto',
                marginBottom: 5,
                width: 'auto',
                maxWidth: '75%',
                minWidth: '30%',
                height: 'auto',
            },
            receivedMessage: {
                backgroundColor: '#5238a4',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                marginLeft: 4,
                marginRight: 'auto',
                marginBottom: 5,
                width: 'auto',
                maxWidth: '75%',
                minWidth: '30%',
                height: 'auto',
            },
            message: {
                color: '#fff',
                fontSize: 18
            },
            messageList: {
                marginTop: 5,
                height: '100%',
                width: '100%',
            },
        })
    }

    componentDidMount() {
        const user = this.props.route.params.user;
        this.setState({
            name: user.name,
            cuid: user.cuid,
            uid: user.uid,
            photoURL: user.photoURL
        })
        this.props.navigation.setOptions({
            headerTitle: <Text>{user.name}</Text>
        })

        const setMessages = (mes) => {
            this.setState({
                messagess: mes,
            })

        }

        var currentUser = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref("chat/")
            .child(currentUser)
            .child(user.uid)
            .on("value", (dataSnapshot) => {
                let msgs = dataSnapshot.val();
                if (msgs != null && msgs != undefined) {
                    setMessages(Object.values(msgs));
                }
            });
    }


    recieverMsg = async () => {
        const currentUser = firebase.auth().currentUser.uid
        const guestUser = this.state.uid;
        const message = this.state.message;
        const time = new Date().getTime();
        try {
            return await firebase
                .database()
                .ref('chat/' + guestUser)
                .child(currentUser)
                .push({
                    messege: {
                        sender: currentUser,
                        reciever: guestUser,
                        message: message,
                        timeStamp: time,
                    },
                });
        } catch (error) {
            return error;
        }
    };

    senderMsg = async () => {
        const currentUser = firebase.auth().currentUser.uid
        const guestUser = this.state.uid;
        const message = this.state.message;
        const time = new Date().getTime();
        try {
            return await firebase
                .database()
                .ref('chat/' + currentUser)
                .child(this.state.uid)
                .push({
                    messege: {
                        sender: currentUser,
                        reciever: guestUser,
                        message: message,
                        timeStamp: time,
                    },
                });
        } catch (error) {
            return error;
        }
    };

    sendMessage = () => {
        if (this.state.message != '') {
            this.senderMsg()
                .then(() => { })
                .catch((err) => alert(err));


            this.recieverMsg()
                .then(() => { })
                .catch((err) => alert(err));


        }
        this.setState({ message: '' })
    }

    componentWillUnmount() {
        this.abortSub.abort();
    }


    render() {
        return (
            <KeyboardAvoidingView style={this.styles.screen}>
                <ScrollView 
                    scrollsToTop={true}
                    style={this.styles.messageList}>
                    {
                        this.state.messagess.map((t) => {
                            return (
                                <ChatMessage
                                    key={t.messege.timeStamp}
                                    timeStamp={t.messege.timeStamp}
                                    message={t.messege.message}
                                    uid={t.messege.uid}
                                    senderId={t.messege.sender}
                                />
                            )
                        })
                    }
                </ScrollView>
                <View style={this.styles.mapper}></View>
                <TextInput
                    label="Your Message"
                    mode='outlined'
                    value={this.state.message}
                    onChangeText={(message) => { this.setState({ message: message }) }}
                    style={this.styles.input}
                />
                <TouchableOpacity onPress={this.sendMessage} activeOpacity={0.8} style={this.styles.send}>
                    <MaterialIcons name="send" size={45} color="#5238a4" />
                </TouchableOpacity>
                <StatusBar style="dark" />
            </KeyboardAvoidingView>
        )
    }
}

export default Chat;