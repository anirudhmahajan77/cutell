import React from "react";
import {View, Text} from "react-native";
import GettingStarted from "./Components/Navigation/GettingStarted";

class Application extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <GettingStarted />
        )
    }
}

export default Application;