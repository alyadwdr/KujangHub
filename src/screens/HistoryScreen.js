import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "../theme";

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
            <Text style={typography.h2}>History screen</Text>
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