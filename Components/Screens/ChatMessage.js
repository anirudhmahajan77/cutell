import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import * as firebase from 'firebase';

class ChatMessage extends React.Component {
    constructor() {
        super();
        this.abortSub = new AbortController();
        this.state = {
            cuid: '',
        }
        this.styles = StyleSheet.create({
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
        })
    }

    componentDidMount() {
        var user = firebase.auth().currentUser.uid;
        this.setState({cuid: user});
    }

    componentWillUnmount() {
        this.abortSub.abort();
    }

    render() {
        const user = (this.state.cuid == this.props.senderId)
        return (
            <Card style={!user? this.styles.receivedMessage : this.styles.sentMessage} key={this.props.timestamp}>
                <Card.Content >
                    <Paragraph style={this.styles.message}>{this.props.message}</Paragraph>
                </Card.Content>
            </Card>
        )
    }
}

export default ChatMessage;