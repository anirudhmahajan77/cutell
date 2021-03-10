import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, AsyncStorage, Alert, LogBox } from "react-native";
import { Feather } from '@expo/vector-icons';
import { TextInput, HelperText } from 'react-native-paper';
import * as firebase from 'firebase';



class Signup extends Component {
    constructor() {
        super();
        this.abortSub = new AbortController();
        this.styles = StyleSheet.create({
            background: {
                width: '100%',
                height: '100%',
            },
            nav: {
                top: 44,
                left: 25,
            },
            container: {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            },
            heading: {
                color: '#fff',
                fontSize: 38,
            },
            title: {
                color: '#fff',
                opacity: 0.8,
                paddingBottom: 20,
            },
            formContainer: {
                width: '85%',
                height: 500,
                backgroundColor: '#f9f9f9',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
            },
            input: {
                width: '85%',
                marginBottom: 15,
                borderColor: "#ccc",
            },
            signupBtn: {
                width: 352,
                fontWeight: "bold",
                borderRadius: 4,
                textAlign: "center",
                textAlignVertical: 'center',
                color: '#fff',
                marginTop: 50,
                height: 50,
                backgroundColor: 'slateblue',
            },
            oldUser: {
                opacity: 0.8,
            },
            oldUserLink: {
                color: 'dodgerblue',
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
                textDecorationColor: 'dodgerblue',
            },
            firstNamehelper: {
                marginLeft: -80,
                marginTop: '-5%',
                marginBottom: -8,
            },
            lastNameHelper: {
                marginLeft: -80,
                marginBottom: -8,
                marginTop: -12,
            },
            emailHelper: {
                marginLeft: -70,
                marginBottom: -8,
                marginTop: -12,
            },
            emailExistHelper: {
                marginLeft: -95,
                marginBottom: -8,
                marginTop: -16,
            },
            phoneNumberHelper: {
                marginLeft: -55,
                marginBottom: -8,
                marginTop: -12,
            },
            passwordHelper: {
                marginLeft: -80,
                marginBottom: -8,
                marginTop: -12,
            },
        });
        this.state = {
            firstName: '',
            lastName: '',
            cuid: '',
            email: '',
            password: '',
            role: 'user',
            status: 'active',
            firstNameHelper: false,
            lastNameHelper: false,
            emailHelper: false,
            emailExistHelper: false,
            phoneNumberHelper: false,
            passwordHelper: false,
        }
    }

    componentWillUnmount() {
        //this.abortSub = new AbortController();
        this.abortSub.abort();
    }

    signUpSubmit = async (navigation) => {
        try {
            if (this.state.firstName == '') {
                throw 1;
            }
            if (this.state.lastName == '') {
                throw 2;
            }
            if (this.state.email == '') {
                throw 3;
            }
            if (this.state.cuid == '') {
                throw 4;
            }
            if (this.state.password == '') {
                throw 5;
            }
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((token) => {
                    var uuid = firebase.auth().currentUser.uid;
                    
                    firebase.database().ref('users/' + uuid)
                        .set({
                            uid: uuid,
                            cuid: this.state.cuid.toUpperCase(),
                            email: this.state.email,
                            name: this.state.firstName + " " + this.state.lastName,
                            photoURL: "https://firebasestorage.googleapis.com/v0/b/cutel-83.appspot.com/o/photos%2Flogo.png?alt=media&token=f06f74c7-05d9-48bc-9501-29ea34cac754",
                        })
                        .then(() => {
                            this.props.navigation.replace("Dashboard");
                        })
                        .catch(function (error) {
                            Alert.alert(error.message)
                        });
                })
        }
        catch (err) {
            if (parseInt(err) == 1) {
                this.setState({ firstNameHelper: true });
            }
            if (parseInt(err) == 2) {
                this.setState({
                    lastNameHelper: true,
                    firstNameHelper: false
                });
            }
            if (parseInt(err) == 3) {
                this.setState({
                    emailHelper: true,
                    lastNameHelper: false,
                });
            }
            if (parseInt(err) == 4) {
                this.setState({
                    phoneNumberHelper: true,
                    emailHelper: false,
                });
            }
            if (parseInt(err) == 5) {
                this.setState({
                    passwordHelper: true,
                    phoneNumberHelper: false,
                });
            }
            if (parseInt(err) == 6) {
                this.setState({
                    emailExistHelper: true,
                    passwordHelper: false,
                    phoneNumberHelper: false,
                    emailHelper: false,
                    lastNameHelper: false,
                    lastNameHelper: false
                });
            }
        }
    }

    render() {
        return (
            <SafeAreaView>
                <ImageBackground source={require('../Asset/log.png')} style={this.styles.background}>
                    <Feather name="arrow-left" onPress={() => { this.props.navigation.pop() }} size={30} color="white" style={this.styles.nav} />
                    <View style={this.styles.container}>
                        <Text style={this.styles.heading}>Welcome</Text>
                        <Text style={this.styles.title}>Create Your New Account</Text>
                        <View style={this.styles.formContainer}>
                            <HelperText style={this.styles.firstNamehelper} type="error" visible={this.state.firstNameHelper}>
                                Error: First Name Cannot Be Empty!
                        </HelperText>
                            <TextInput
                                label="First Name"
                                mode='outlined'
                                onChangeText={(newFirst) => { this.setState({ firstName: newFirst }) }}
                                style={this.styles.input}
                            />
                            <HelperText style={this.styles.lastNameHelper} type="error" visible={this.state.lastNameHelper}>
                                Error: Last Name Cannot Be Empty!
                        </HelperText>
                            <TextInput
                                label="Last Name"
                                mode='outlined'
                                onChangeText={(newLast) => { this.setState({ lastName: newLast }) }}
                                style={this.styles.input}
                            />
                            <HelperText style={this.styles.emailHelper} type="error" visible={this.state.emailHelper}>
                                Error: Email Name Cannot Be Empty!
                        </HelperText>
                            <HelperText style={this.styles.emailExistHelper} type="error" visible={this.state.emailExistHelper}>
                                Error: Email Already Registered!
                        </HelperText>
                            <TextInput
                                label="Email"
                                mode='outlined'
                                keyboardType="email-address"
                                onChangeText={(newMail) => { this.setState({ email: newMail.toLowerCase() }) }}
                                style={this.styles.input}
                            />
                            <HelperText style={this.styles.phoneNumberHelper} type="error" visible={this.state.phoneNumberHelper}>
                                Error: UID Cannot Be Empty!
                        </HelperText>
                            <TextInput
                                label="UID"
                                mode='outlined'
                                maxLength={13}
                                onChangeText={(newCUID) => { this.setState({ cuid: newCUID }) }}
                                style={this.styles.input}
                            />
                            <HelperText style={this.styles.passwordHelper} type="error" visible={this.state.passwordHelper}>
                                Error: Password Cannot Be Empty!
                        </HelperText>
                            <TextInput
                                label="Password"
                                mode='outlined'
                                secureTextEntry={true}
                                onChangeText={(newPass) => { this.setState({ password: newPass }) }}
                                style={this.styles.input}
                            />
                            <Text style={this.styles.oldUser}>Already Have an account? <Text onPress={() => { this.props.navigation.navigate('Login') }} style={this.styles.oldUserLink}>Sign In!</Text></Text>
                        </View>
                        <Text style={this.styles.signupBtn} onPress={() => { this.signUpSubmit(this.props.navigation) }}>Sign Up</Text>
                    </View>
                </ImageBackground></SafeAreaView>
        );
    }
}

export default Signup;