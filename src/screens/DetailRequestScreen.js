import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../theme";

export default function DetailRequestScreen({ route }) {
    const { requestId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={typography.h2}>Detail request screen</Text>
            <Text style={styles.subtitle}>Request ID: {requestId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    subtitle: {
        marginTop: spacing.md,
        color: colors.textSecondary,
    }
});