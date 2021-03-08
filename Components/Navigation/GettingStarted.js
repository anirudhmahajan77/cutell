import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Onboarding from '../Screens/Onboarding';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Dashboard from './Dashboard';

const Stack = createStackNavigator();

function GettingStarted(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Starting">
                <Stack.Screen 
                    name="Starting" 
                    component={Onboarding}
                    options={{
                        title:'',
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Login" 
                    component={Login}
                    options={{
                        title:'',
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Signup" 
                    component={Signup}
                    options={{
                        title:'',
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Dashboard" 
                    component={Dashboard}
                    options={{
                        title:'',
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default GettingStarted;