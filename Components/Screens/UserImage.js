import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Avatar} from 'react-native-paper';

class UserImage extends React.Component{
    constructor(){
        super();
        this.abortSub = new AbortController();
        this.state = {
            name: '',
            photoURL: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
        }
        this.styles = StyleSheet.create({
            image:{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '33%',
            },
            back: {
                backgroundColor: '#333',
                height: '100%',
            }
        })
    }

    componentDidMount(){
        const user = this.props.route.params.user;
        this.setState({
            name: user.name,
            photoURL: user.photoURL
        })
        this.props.navigation.setOptions({
            headerTitle:<Text>{user.name}</Text>
        })
    }

    componentWillUnmount() {
        //this.abortSub = new AbortController();
        this.abortSub.abort();
    }

    render(){
        return(
            <View style={this.styles.back}>
                <Avatar.Image size={400} source={{ uri: this.state.photoURL }} style={this.styles.image} />
                <StatusBar style='dark' />
            </View>
        )
    }
}

export default UserImage;