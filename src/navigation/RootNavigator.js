import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import KujangIdLoginScreen from "../screens/KujangIdLoginScreen";
import DetailRequestScreen from "../screens/DetailRequestScreen";
import PendingPerAppScreen from "../screens/PendingPerAppScreen";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ animation: "none" }}/>
                <Stack.Screen name="KujangIdLogin" component={KujangIdLoginScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} options={{ animation: "none"}} />
                <Stack.Screen name="DetailRequest" component={DetailRequestScreen} />
                <Stack.Screen name="PendingPerApp" component={PendingPerAppScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}