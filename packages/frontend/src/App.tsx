import React from "react"
import { Platform} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { registerRootComponent } from 'expo';
import FullInvView from './ui/pages/view/inventoryView'
import { NavigationContainer } from '@react-navigation/native';
import HomePage from "./ui/pages/view/homePage";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./ui/pages/view/loginPage";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    name: 'test',
    cache: new InMemoryCache(),
    version: '0'
});

  const myTheme = {
    dark: false,
    colors: {
      primary: '#E6E6E6B0',
      background: '#373737',

      card: '#373737',
      text: '#E6E6E6B0',
      border: '#373737',
      notification: 'rgb(255, 69, 58)',
    },
  };





/**
  * @name App
  * @returns Component containing entire application
  */
const App = () => (
    <ApolloProvider client={client}>
      <NavigationContainer theme={myTheme}>
        <MyTabs/>
      </NavigationContainer>

    </ApolloProvider>
  );


  const Tab = createNativeStackNavigator();


  /**
  * @name MyTabs
  * @returns Component to display and navigate between the home page, calendar page (not implemented yet) and notifications page (not implemented yet)
  */
  const MyTabs=()=>{
    return (
      <HomePage/>
    );
  }




export default registerRootComponent(App)
