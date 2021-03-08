import React from 'react';
import {SafeAreaView} from 'react-native';
import * as firebase from 'firebase';
import {firebaseConfig} from "./config";
import Application from "./Application";


export default function App() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
  }

  return (
      <Application />
  );
}