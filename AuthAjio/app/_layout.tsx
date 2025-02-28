import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import HomePage from "@/pages/Home/HomePage";
import { StatusBar } from "react-native";

import "react-native-reanimated";

export default function RootLayout() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={HomePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
