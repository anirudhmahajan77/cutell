import React from "react";
import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Avatar, Title, Paragraph, TextInput, Badge } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import * as firebase from 'firebase';

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            uuid: '',
            image: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
            name: 'Loading...',
            cuid: 'Loading...',
            email: 'Loading...',
            imageName: '',
            imageLink: '',
        }
        this.styles = StyleSheet.create({
            background: {
                height: '100%',
                width: '100%',
            },
            container: {
                flex: 1,
                alignContent: 'center',
            },
            me: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '24%',
                marginBottom: '6%',
            },
            badge: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '-10%',
                backgroundColor: 'slateblue',
            },
            input: {
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '7%',
            },
            passwordBtn: {
                width: '80%',
                fontWeight: "bold",
                borderRadius: 4,
                textAlign: "center",
                textAlignVertical: 'center',
                color: '#fff',
                marginTop: 40,
                height: 50,
                fontSize: 20,
                backgroundColor: 'slateblue',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            loginBtn: {
                width: '80%',
                fontWeight: "bold",
                borderRadius: 4,
                textAlign: "center",
                textAlignVertical: 'center',
                color: '#fff',
                marginTop: 20,
                height: 50,
                fontSize: 20,
                backgroundColor: 'slateblue',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        })
    }



    componentDidMount() {
        var updateVal = (uname, uimage, uemail, ucuid) => {
            this.setState({
                name: uname,
                image: uimage,
                email: uemail,
                cuid: ucuid,
            })
        }
        var help = Date.now();
        this.setState({ imageName: help });
        const uid = firebase.auth().currentUser.uid;
        var userProfile = {
            uuid: '',
            image: '',
            name: '',
            cuid: '',
            email: '',
        }
        var user = firebase.database().ref('users/' + uid);
        user.on('value', (snapshot) => {
            const data = snapshot.val();
            updateVal(data.name, data.photoURL, data.email, data.cuid);
        })
    }



    updateProfile = () => {
        const uid = firebase.auth().currentUser.uid;
        let user = firebase.database().ref('users/' + uid);
        user.update({
            name: this.state.name,
            cuid: this.state.cuid,
        })
    }

    setImage = (image) => {
        const uid = firebase.auth().currentUser.uid;
        let user = firebase.database().ref('users/' + uid);

        const imageLink = this.uploadImage(image);
        /*user.update({
            photoURL: link,
        })*/
    }

    onImgTap = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need file permissions to make this work!');
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setImage(result.uri);
            }
        }
    }

    setLink = (url) => {
        this.setState({ imageLink: url })
    }

    uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var name = Date.now();
        var ref = firebase.storage().ref().child("photos/" + this.state.imageName);
        await ref.put(blob).then(data => {
            data.ref.getDownloadURL().then(url => {
                const uid = firebase.auth().currentUser.uid;
                let user = firebase.database().ref('users/' + uid);
                console.log("Response: " + url);
                user.update({
                    photoURL: url,
                })
            });
        });;
    }

    render() {
        return (
            <ImageBackground source={require('../Asset/about.png')} style={this.styles.background}>
                <KeyboardAvoidingView style={this.styles.background}>

                    <View style={this.styles.container}>
                        <TouchableOpacity onPress={this.onImgTap} activeOpacity={0.8} >
                            <Avatar.Image size={150} source={{ uri: this.state.image }} style={this.styles.me} />
                            <Badge
                                style={this.styles.badge}
                                size={33}

                            ><Feather name="edit-2" size={18} color="#fff" /></Badge>
                        </TouchableOpacity>
                        <TextInput
                            label="Name"
                            mode='flat'
                            value={this.state.name}
                            onChangeText={(newText) => { this.setState({ name: newText }) }}
                            style={this.styles.input}
                        />
                        <TextInput
                            label="UID"
                            mode='flat'
                            value={this.state.cuid}
                            onChangeText={(newText) => { this.setState({ cuid: newText }) }}
                            style={this.styles.input}
                        />
                        <TextInput
                            label="Email"
                            mode='flat'
                            value={this.state.email}
                            disabled={true}
                            onChangeText={(newText) => { this.setState({ email: newText }) }}
                            style={this.styles.input}
                        />
                        <Text style={this.styles.passwordBtn} onPress={() => { this.props.navigation.push('Password') }}>Update Password</Text>
                        <Text style={this.styles.loginBtn} onPress={() => { this.updateProfile() }}>Update Profile</Text>
                    </View>
                    <StatusBar style="light" />
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

export default UserProfile;