import React, {Component} from "react";
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, AsyncStorage, Alert} from "react-native";
import { Feather } from '@expo/vector-icons';
import {TextInput, HelperText} from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import * as firebase from  'firebase';

class Login extends Component {
    constructor(){
        super();
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
                height: 250,
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
                marginLeft: -110,
                marginTop: -10,
                marginBottom: -8,
            },
            emptyPasswordHelper:{
                marginLeft: -85,
                marginTop: -20,
                marginBottom: -8,
            },
        });
        this.state= {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            role: 'user',
            status: 'active',
            emailHelper: false,
            emptyEmailHelper: false,
            passwordHelper: false,
            emptyPasswordHelper: false,
        }
    }

    loginSubmit = async(navigation) => {
        
        try{
            let foundUser = {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                password: '',
                role: 'user',
                status: 'active',
            };
            if(this.state.email == ''){
                throw 1;
            }
            if(this.state.password == ''){
                throw 2;
            }
            /*let jsonUsers = await AsyncStorage.getItem("loggedUser")
            let users = JSON.parse(jsonUsers);
            for (let i=0 ; i < users.length ; i++){
                if ((users[i].email == this.state.email)){
                    foundUser.email = users[i].email;
                    foundUser.password = users[i].password;
                    foundUser.firstName = users[i].firstName;
                    foundUser.lastName = users[i].lastName;
                    foundUser.phoneNumber = users[i].phoneNumber;
                    foundUser.role = users[i].role;
                    foundUser.status = users[i].status;
                    break;
                }
            }
            
            if(foundUser.email != ''){
                if(foundUser.password != this.state.password.trim()){
                    throw 3;
                }
                await AsyncStorage.setItem('loadedUser',JSON.stringify(foundUser))
                navigation.navigate('Dashboard')
            }else{
                this.setState({emailHelper:true, emptyEmailHelper:false, emptyPasswordHelper: false})
            }*/
            const email = this.state.email;
            const password = this.state.password
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(()=>{
                    this.props.navigation.replace("Dashboard"); 
                })
                .catch((error)=>{
                    Alert.alert(error.message);
                })
            
        }
        catch(err) {
            if(parseInt(err) == 1){
                this.setState({emptyEmailHelper:true});
            }
            if(parseInt(err) == 2){
                this.setState({emptyPasswordHelper:true, emptyEmailHelper: false});
            }
            if(parseInt(err) == 3){
                this.setState({passwordHelper:true, emailHelper: false, emptyEmailHelper: false, emptyPasswordHelper: false});
            }
            
        }
    }

    render(){
        return(
            <SafeAreaView> 
            <ImageBackground source={require('../Asset/log.png')} style={this.styles.background}>
                <Feather name="arrow-left" onPress={()=>{this.props.navigation.pop()}} size={30} color="white" style={this.styles.nav} />
                <View style={this.styles.container}>
                    <Text style={this.styles.heading}>Welcome</Text>
                    <Text style={this.styles.title}>Login To Your Existing Account</Text>
                    <View style={this.styles.formContainer}>
                        <HelperText style={this.styles.emailHelper} type="error" visible={this.state.emailHelper}>
                            Error: Email Not Found!
                        </HelperText>
                        <HelperText style={this.styles.emptyEmailHelper} type="error" visible={this.state.emptyEmailHelper}>
                            Error: Email Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="Email"
                            mode='outlined'
                            keyboardType="email-address"
                            onChangeText={(newText)=> {this.setState({email:newText.toLowerCase()})}}
                            style={this.styles.input}
                        />
                        <HelperText style={this.styles.passwordHelper} type="error" visible={this.state.passwordHelper}>
                            Error: Password Did Not Match!
                        </HelperText>
                        <HelperText style={this.styles.emptyPasswordHelper} type="error" visible={this.state.emptyPasswordHelper}>
                            Error: Password Cannot Be Empty!
                        </HelperText>
                        <TextInput 
                            label="Password"
                            mode='outlined'
                            secureTextEntry={true}
                            onChangeText={(newPass)=> {this.setState({password:newPass})}}
                            style={this.styles.input}
                        />
                        <Text style={this.styles.newUser}>Don't Have an account? <Text onPress={()=>{this.props.navigation.navigate('Signup')}} style={this.styles.newUserLink}>Sign Up!</Text></Text>
                    </View>
                    <Text style={this.styles.loginBtn} onPress={()=>{this.loginSubmit(this.props.navigation)}}>Login</Text>
                </View>
            </ImageBackground>
            
            </SafeAreaView>
        );
    }
}

export default Login;