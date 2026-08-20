import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, spacing } from "../theme";
import { Text, Image, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
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

function CustomTabBar({ state, navigation }) {
    const { pendingRequests } = useRequests();

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                const showBadge = route.name === "Inbox" && pendingRequests.length > 0;

                return (
                    <TouchableWithoutFeedback key={route.key} onPress={onPress}>
                        <View style={styles.tabItem}>
                            <View>
                                <AnimatedTabIcon
                                    source={ICONS[route.name]}
                                    color={isFocused ? colors.primary : colors.textSecondary}
                                    size={24}
                                    focused={isFocused}
                                />
                                {showBadge && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{pendingRequests.length}</Text>
                                    </View>
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.label,
                                    { color: isFocused ? colors.primary : colors.textSecondary },
                                ]}
                            >
                                {route.name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
}

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Inbox" component={InboxScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 13,
        marginTop: 4,
        fontFamily: "Inter-Bold",
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -8,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 3,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontFamily: "Inter-Bold",
    },
});