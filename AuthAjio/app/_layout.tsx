import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import HomePage from "@/pages/Home/HomePage";
import MainPage from "@/pages/Main/MainPage";
import { StatusBar } from "react-native";

import "react-native-reanimated";

const BANBAJIO_PURPLE = '#7A40B9';

export default function RootLayout() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={BANBAJIO_PURPLE} />
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen
          name="home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={MainPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
