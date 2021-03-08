import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Chatter from './Chatter';
import Forum from '../Screens/Forum';
import AboutDev from '../Screens/AboutDev';
import { Feather, AntDesign} from '@expo/vector-icons';



class AdminDashboard extends React.Component {
    constructor(){
        super();
        this.styles = StyleSheet.create({
            tab:{
                backgroundColor: '#000',
                color: '#5238a4',
            }
        })
    }

    render(){
        const Tab = createBottomTabNavigator();
        return (
            <NavigationContainer independent={true}>
              <Tab.Navigator tabBarOptions={
                  {
                    adaptive:true,
                    tabStyle:{
                        paddingTop: 15,
                    }
                  }
              }>
                <Tab.Screen name="Chatter" 
                            component={Chatter}
                            options={{
                                tabBarLabel: '',
                                tabBarColor: '#ccc',
                                tabBarIcon: ({focused }) => (
                                  <Feather name="message-square" color={focused? '#5238a4': '#bbb'} size={30} />
                                ),
                                
                              }} 
                />
                <Tab.Screen name="Forum" 
                            component={Forum}
                            
                            options={{
                                tabBarLabel: '',
                                tabBarColor: '#333',
                                tabBarIcon: ({focused}) => (
                                  <Feather name="archive" color={focused? '#5238a4': '#bbb'} size={30} />
                                ),
                              }} 
                              
                />
                <Tab.Screen name="Profile" 
                    component={Profile}
                    options={{
                        tabBarLabel: '',
                        tabBarColor: '#5238a4',
                        tabBarIcon: ({ focused }) => (
                            <Feather name="user" color={focused? '#5238a4': '#bbb'} size={30} />
                        ),
                        }}
                />
                <Tab.Screen name="About" 
                            component={AboutDev}
                            options={{
                                tabBarLabel: '',
                                tabBarColor: '#333',
                                tabBarIcon: ({focused}) => (
                                  <Feather name="info" color={focused? '#5238a4': '#bbb'} size={30} />
                                ),
                              }}
                            
                              
                />
              </Tab.Navigator>
            </NavigationContainer>
          );
    }
  
}

export default AdminDashboard;