import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import { Searchbar, Appbar, Card, Avatar} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as firebase from "firebase";

class Message extends React.Component {
    constructor() {
        super();
        this.abortSub = new AbortController();
        this.state = {
            searchUID: '',
            users:[],
        }
        this.styles = StyleSheet.create({
            appbar: {
                backgroundColor: '#5238a4',
                paddingBottom: 5,
                height: 60,
            },
            title:{
                fontSize: 18,
            },
            desc: {
                opacity: 1,
                fontSize: 18,

            },
            card:{
                width: '95%',
            }
        })
    }


    componentDidMount() {
        let user = firebase.database().ref('users');
        var updateUserList = (reg) => {
            let user = firebase.auth().currentUser.uid;
            var userList = reg.filter(x => {
                return x.uid != user;
              })
            this.setState({
                users: userList,
            })
        }

        user.on('value', datasnap=>{
            let regUsers = Object.values(datasnap.val());
            updateUserList(regUsers);
        })
    }

    componentWillUnmount() {
        //this.abortSub = new AbortController();
        this.abortSub.abort();
    }

    render() {
        return (
            <View>
                <Appbar.Header style={this.styles.appbar}>
                    <Appbar.Content title="Private Chat" subtitle="Student Level" />
                </Appbar.Header>
                <Searchbar
                    placeholder="Search UID"
                    onChangeText={(uid)=>{this.setState({searchUID: uid})}}
                    value={this.state.searchUID}
                />
                <ScrollView style={this.styles.holder}>
                        {
                            this.state.users.filter((val)=>{
                                if(this.state.searchUID == ''){
                                    return val;
                                } else if(val.cuid.toLowerCase().includes(this.state.searchUID.toLowerCase())){
                                    return val;
                                }
                            }).map((user) => {
                                return (
                                    <TouchableOpacity key={user.cuid} onPress={()=>{this.props.navigation.navigate("Chat",{user});}} activeOpacity={0.8}>
                                    <Card.Title
                                        key={user.cuid}
                                        title={user.name}
                                        subtitle={user.cuid}
                                        style={this.styles.card}
                                        titleStyle={this.styles.title}
                                        subtitleStyle={this.styles.desc}
                                        subtitleNumberOfLines={20}
                                        left={props =>
                                            <TouchableOpacity key={user.uid} onPress={()=>{this.props.navigation.navigate("UserImage",{user});}} activeOpacity={0.8}>
                                            <Avatar.Image key={user.uid} size={20} source={{uri: user.photoURL}} {...props} />
                                            </TouchableOpacity>}
                                    />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                <StatusBar style="light" />
            </View>
        )
    }
}

export default Message;