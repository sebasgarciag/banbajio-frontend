import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import HomePage from "@/pages/Home/HomePage";
import MainPage from "@/pages/Main/MainPage";
import WelcomePage from "@/pages/Welcome/WelcomePage";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "react-native-reanimated";

const BANBAJIO_PURPLE = '#7A40B9';

export default function RootLayout() {
  const Stack = createStackNavigator();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset security method and always show welcome screen on app load
    const resetSecurityMethod = async () => {
      try {
        // Clear the security method from AsyncStorage
        await AsyncStorage.removeItem('securityMethod');
        
        // Set initial route to welcome screen
        setInitialRoute('welcome');
        setIsLoading(false);
      } catch (error) {
        console.error('Error resetting security method:', error);
        setInitialRoute('welcome');
        setIsLoading(false);
      }
    };

    resetSecurityMethod();
  }, []);

  if (isLoading) {
    return null; // Show nothing while loading
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={BANBAJIO_PURPLE} />
      <Stack.Navigator initialRouteName={initialRoute || 'welcome'}>
        <Stack.Screen
          name="welcome"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
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
