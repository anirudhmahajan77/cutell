import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import UserProfile from '../Screens/UserProfile';
import Password from "../Screens/Password";


const Stack = createStackNavigator();

function Profile(){
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="UserProfile">
                <Stack.Screen 
                    name="UserProfile" 
                    component={UserProfile}
                    options={{
                        title:'',
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Password" 
                    component={Password}
                    options={{
                        title:'Update Password',
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Profile;