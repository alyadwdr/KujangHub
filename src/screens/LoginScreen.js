import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors, spacing, typography } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await AsyncStorage.setItem("isLoggedIn", "true");
        navigation.replace("MainTabs");
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBackground} />

            <View style={styles.content}>
                <Text style={[typography.h1, styles.brand]}>Kujang Hub</Text>
                <Text style={[typography.body, styles.subtitle]}>
                    Enter your credentials below to <Text style={styles.subtitleHighlight}>login</Text>
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.orRow}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                <TouchableOpacity
                    style={styles.kujangIdButton}
                    onPress={() => navigation.navigate("KujangIdLogin")}
                >
                    <Text style={styles.kujangIdButtonText}>Login with KUJANG ID</Text>
                </TouchableOpacity>

                <Text style={styles.privacy}>Privacy & Policy</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerBackground: {
        height: 260,
        backgroundColor: colors.primaryDark,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    },
    content: {
        paddingHorizontal: spacing.lg,
    },
    brand: {
        color: colors.primary,
        textAlign: "center",
        marginTop: spacing.lg,
    },
    subtitle: {
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: spacing.xs,
        marginBottom: spacing.lg,
    },
    subtitleHighlight: {
        color: colors.primary,
    },
    input: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    loginButton: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
        marginTop: spacing.xs,
        // shadow untuk ios
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // shadow untuk android
        elevation: 3,
    },
    loginButtonText: {
        color: colors.white,
        fontFamily: "Inter-Bold",
    },
    orRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: spacing.md,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB",
    },
    orText: {
        marginHorizontal: spacing.sm,
        color: colors.textSecondary,
    },
    kujangIdButton: {
        backgroundColor: colors.kujangIdBlue,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
        // shadow untuk ios
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // shadow untuk android
        elevation: 3,
    },
    kujangIdButtonText: {
        color: colors.white,
        fontFamily: "Inter-Bold",
    },
    privacy: {
        textAlign: "center",
        color: colors.textSecondary,
        marginTop: spacing.md,
    },
});