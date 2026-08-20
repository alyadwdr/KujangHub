import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme";
import { Image } from "react-native";
import { useRequests } from "../context/RequestsContext";
import AnimatedTabIcon from "../components/AnimatedTabIcon";

import HomeScreen from "../screens/HomeScreen";
import InboxScreen from "../screens/InboxScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const ICONS = {
    Home: require("../assets/images/home-icon.png"),
    Inbox: require("../assets/images/inbox-icon.png"),
    History: require("../assets/images/history-icon.png"),
    Profile: require("../assets/images/profile-icon.png"),
}

export default function MainTabs() {
    const { pendingRequests } = useRequests();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarIcon: ({ color, size, focused }) => (
                    <AnimatedTabIcon
                        source={ICONS[route.name]}
                        color={color}
                        size={size}
                        focused={focused}
                    />
                ),
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen 
                name="Inbox" 
                component={InboxScreen} 
                options={{
                    tabBarBadge: pendingRequests.length > 0 ? pendingRequests.length : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: colors.primary,
                        color: colors.white,
                        minWidth: 18,
                        height: 18,
                        borderRadius: 9,
                        fontSize: 14,
                        lineHeight: 22,
                        textAlign: "center",
                        paddingHorizontal: 0,
                    },
                }}
            />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}