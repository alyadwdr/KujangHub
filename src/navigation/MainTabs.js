import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme";

import HomeScreen from "../screens/HomeScreen";
import InboxScreen from "../screens/InboxScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
        }}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Inbox" component={InboxScreen}/>
            <Tab.Screen name="History" component={HistoryScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}