import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme"

export default function ErrorState({ message, onRetry }) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={[typography.body, styles.message]}>{message}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                <Text style={styles.retryText}>Coba Lagi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.lg,
    },
    icon: {
        fontSize: 32,
        marginBottom: spacing.sm,
    },
    message: {
        textAlign: "center",
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    retryButton: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    retryText: {
        color: colors.white,
        fontFamily: "Inter-Bold",
    },
});


















