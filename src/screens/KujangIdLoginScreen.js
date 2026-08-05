import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors, spacing, typography } from "../theme";

const SSO_PROVIDERS = [
    "Sign in with ESS/MSS/SAP",
    "Sign in with PISMART/Identik",
    "Sign in with DOF (Digital Office)",
    "Sign in with DEMPLON",
];

export default function KujangIdLoginScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[typography.h1, styles.brand]}>Kujang ID</Text>
            <Text style={styles.subtitle}>Identify Provider</Text>

            <View style={styles.card}>
                <Text style={typography.h2}>Sign in to</Text>
                <Text style={[typography.h1, { color: colors.kujangIdBlue }]}>DEMPLON</Text>

                {SSO_PROVIDERS.map((provider, index) => (
                    <TouchableOpacity key={label} style={styles.ssoButton}>
                        <Text style={typography.body}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
    },
    brand: {
        textAlign: "center",
        color: colors.kujangIdBlue,
        marginTop: spacing.lg,
    },
    subtitle: {
        textAlign: "center",
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.lg,
        ssoButton: {
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 8,
            padding: spacing.md,
            marginBottom: spacing.sm,
        },
    },
});