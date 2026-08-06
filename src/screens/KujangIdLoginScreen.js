import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { colors, spacing, typography } from "../theme";

const SSO_PROVIDERS = [
    { label: "Sign in with ESS/MSS/SAP", icon: require("../assets/images/sap-icon.png") },
    { label: "Sign in with PISMART/Identik", icon: require("../assets/images/identik-icon.png") },
    { label: "Sign in with DOF (Digital Office)", icon: require("../assets/images/dof-icon.png") },
    { label: "Sign in with DEMPLON", icon: require("../assets/images/demplon-logo.png") },
];

export default function KujangIdLoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[typography.h1, styles.brand]}>KUJANG ID</Text>
            <Text style={styles.subtitle}>Identify Provider</Text>

            <View style={styles.card}>
                <Image
                    source={require("../assets/images/demplon-logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={typography.h2}>Sign in to</Text>
                <Text style={[typography.h1, { color: colors.kujangIdBlue }]}>DEMPLON</Text>
                <Text style={styles.helperText}>Please enter your credentials below</Text>

                {SSO_PROVIDERS.map((provider) => (
                    <TouchableOpacity key={provider.label} style={styles.ssoButton}>
                        <Image source={provider.icon} style={styles.ssoIcon} resizeMode="contain" />
                        <Text style={typography.body}>{provider.label}</Text>
                    </TouchableOpacity>
                ))}

                <View style={styles.orRow}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.divider} />
                </View>

                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.signInButton} onPress={() => navigation.replace("MainTabs")}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.terms}>
                    By continuing, you agree to our {" "}
                    <Text style={styles.termsLink}>Terms of Service</Text> and {" "}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#F4F4F4",
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
        marginTop: spacing.xs,
        marginBottom: spacing.xl,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: spacing.lg,
    },
    logo: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.primary,
        marginBottom: spacing.md,
    },
    helperText: {
        color: colors.textSecondary,
        marginTop: spacing.xs,
        marginBottom: spacing.md,
    },
    ssoButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    ssoIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: spacing.sm,
    },
    orRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: spacing.md,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB"
    },
    orText: {
        marginHorizontal: spacing.sm,
        color: colors.textSecondary,
    },
    inputLabel: {
        fontWeight: "700",
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    signInButton: {
        backgroundColor: colors.kujangIdBlue,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
        marginTop: spacing.xs,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    signInButtonText: {
        color: colors.white,
        fontWeight: "700",
    },
    terms: {
        textAlign: "center",
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: spacing.md,
    },
    termsLink: {
        color: colors.kujangIdBlue,
    }
});