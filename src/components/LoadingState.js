import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";

export default function LoadingState({ message = "Loading..."}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
            {message ? <Text style={styles.text}>{message}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: spacing.xl,
        gap: spacing.sm,
    },
    text: {
        color: colors.textSecondary,
        fontSize: 14,
    },
});