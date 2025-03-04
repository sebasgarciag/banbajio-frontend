import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "@/pages/Home/HomePage";
import MainPage from "@/pages/Main/MainPage";
import SelectUsuarioPage from "@/pages/Usuario/SelectUsuarioPage";
import { StatusBar } from "react-native";
import { BANBAJIO_PURPLE } from "@/constants/colors";
import { UsuarioProvider } from "@/wrapper/UsuarioContext";
import TwoFA from "@/components/2FA/2FA";

import "react-native-reanimated";

export default function RootLayout() {
  const Stack = createStackNavigator();

  return (
    <>
      <UsuarioProvider>
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
          <Stack.Screen
            name="2FA"
            component={TwoFA}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </UsuarioProvider>
    </>
  );
}
