import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import HomePage from "@/pages/Home/HomePage";
import MainPage from "@/pages/Main/MainPage";
import SelectUsuarioPage from "@/pages/Usuario/SelectUsuarioPage";
import { StatusBar } from "react-native";
import { BANBAJIO_PURPLE } from "@/constants/colors";

import "react-native-reanimated";


export default function RootLayout() {
  const Stack = createStackNavigator();
  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={BANBAJIO_PURPLE} />
      <Stack.Navigator initialRouteName="selectUsuario">
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
        <Stack.Screen
          name="selectUsuario"
          component={SelectUsuarioPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
