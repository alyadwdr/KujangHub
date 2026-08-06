import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "../theme";

export default function ProfileScreen() {
    return (
        <View style={StyleSheet.container}>
            <Text style={typography.h2}>Profile Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    }
});