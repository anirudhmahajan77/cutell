import React, {Component} from "react";
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Alert} from "react-native";
import { Feather } from '@expo/vector-icons';
import {TextInput, HelperText} from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import * as firebase from  'firebase';

class Login extends Component {
    constructor(){
        super();
        this.abortSub = new AbortController();
        this.styles = StyleSheet.create({
            background:{
                width:'100%',
                height:'100%',
            },
            nav:{
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
                height: 300,
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
            loginBtn: {
                width: 352,
                fontWeight: "bold",
                borderRadius: 4,
                textAlign:"center",
                textAlignVertical: 'center',
                color: '#fff',
                fontSize: 18,
                marginTop: 50,
                height: 50,
                backgroundColor: 'slateblue',
            },
            newUser: {
                opacity: 0.8,
            },
            newUserLink: {
                color: 'dodgerblue',
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
                textDecorationColor: 'dodgerblue',
            },
            emailHelper:{
                marginLeft: -152,
                marginTop: -10,
                marginBottom: -8,
            },
            passwordHelper:{
                marginLeft: -100,
                marginTop: -10,
                marginBottom: -8,
            },
            emptyEmailHelper:{
                marginLeft: 20,
                marginTop: -10,
                marginBottom: -8,
            },
            emptyPasswordHelper:{
                marginLeft: -60,
                marginTop: -20,
                marginBottom: -8,
            },
        });
        this.state= {
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
            passwordHelper: false,
            newPasswordHelper: false,
            emptyPasswordHelper: false,
        }
    }

    reauthenticate = () => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldpassword);
        return user.reauthenticateWithCredential(cred);
      }

    updatePass = () => {
        try{
            if(this.state.oldpassword.trim() == ''){
                throw 1;
            }
            if(this.state.newpassword.trim() == ''){
                throw 2;
            }
            if(this.state.newpassword != this.state.confirmpassword){
                throw 3;
            }
            this.setState({passwordHelper: false});
            this.reauthenticate().then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(this.state.newpassword).then(() => {
                  Alert.alert("Password was changed Successfully");
                }).catch((error) => { console.log(error.message); });
              }).catch((error) => { console.log(error.message) });
        }
        catch(err){
            if(parseInt(err) == 1){
                this.setState({emptyPasswordHelper: true})
            }
            if(parseInt(err) == 2){
                this.setState({newPasswordHelper: true, emptyPasswordHelper: false})
            }
            if(parseInt(err) == 3){
                this.setState({passwordHelper: true, emptyPasswordHelper: false, newPasswordHelper: false})
            }
        }
        
    }

    componentWillUnmount() {
        //this.abortSub = new AbortController();
        this.abortSub.abort();
    }


    render(){
        return(
            <KeyboardAvoidingView> 
            <ImageBackground source={require('../Asset/log.png')} style={this.styles.background}>
                <View style={this.styles.container}>
                    <View style={this.styles.formContainer}>
                        <HelperText style={this.styles.emptyPasswordHelper} type="error" visible={this.state.emptyPasswordHelper}>
                            Error: Old Password Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="Old Password"
                            mode='outlined'
                            secureTextEntry={true}
                            onChangeText={(newText)=> {this.setState({oldpassword:newText})}}
                            style={this.styles.input}
                        />
                        <HelperText style={this.styles.emptyPasswordHelper} type="error" visible={this.state.newPasswordHelper}>
                            Error: New Password Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="New Password"
                            mode='outlined'
                            secureTextEntry={true}
                            onChangeText={(newPass)=> {this.setState({newpassword:newPass})}}
                            style={this.styles.input}
                        />
                        <TextInput 
                            label="Confirm New Password"
                            mode='outlined'
                            secureTextEntry={true}
                            onChangeText={(newPass)=> {this.setState({confirmpassword:newPass})}}
                            style={this.styles.input}
                        />
                        <HelperText style={this.styles.passwordHelper} type="error" visible={this.state.passwordHelper}>
                            Error: Password Did Not Match!
                        </HelperText>
                    </View>
                    <Text style={this.styles.loginBtn} onPress={()=>{this.updatePass()}}>Update Password</Text>
                </View>
            </ImageBackground>
            <StatusBar style="dark" />
            </KeyboardAvoidingView>
        );
    }
}

export default Login;