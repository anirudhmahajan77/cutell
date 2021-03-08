import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Chat from '../Screens/Chat';
import Message from '../Screens/Message';
import UserImage from '../Screens/UserImage';


const Stack = createStackNavigator();

function Chatter(){
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Message">
                <Stack.Screen 
                    name="Message" 
                    component={Message}
                    options={{
                        title:'',
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Chat" 
                    component={Chat}
                    options={{
                        title:'',
                        headerShown: true,
                    }}
                />
                <Stack.Screen 
                    name="UserImage" 
                    component={UserImage}
                    options={{
                        title:'',
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Chatter;