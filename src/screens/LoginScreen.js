import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions, Image } from "react-native";
import { colors, spacing, typography } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const BELL_MAIN_ASPECT = 65 / 90;
const OVERLAY_BELL_WIDTH = 90;

const HEADER_BELL_WIDTH = width * 1.8;
const HEADER_BELL_HEIGHT = HEADER_BELL_WIDTH * BELL_MAIN_ASPECT;
const HEADER_PEEK_HEIGHT = 280;
const HEADER_MARGIN_TOP = -(HEADER_BELL_HEIGHT - HEADER_PEEK_HEIGHT);

export default function LoginScreen({ navigation, route }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showBellIntro, setShowBellIntro] = useState(route?.params?.playBellIntro === true);
    const introY = useRef(new Animated.Value(0)).current;
    const introScale = useRef(new Animated.Value(1)).current;
    const bottomOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!showBellIntro) return;

        const targetCenterY = HEADER_PEEK_HEIGHT - HEADER_BELL_HEIGHT / 2;
        const OFFSET = -40;
        const targetY = targetCenterY - height / 2 + OFFSET;
        const targetScale = HEADER_BELL_WIDTH / OVERLAY_BELL_WIDTH;

        Animated.parallel([
            Animated.timing(introY, {
                toValue: targetY,
                duration: 800,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(introScale, {
                toValue: targetScale,
                duration: 800,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(bottomOpacity, {
                toValue: 0,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowBellIntro(false);
        });
    }, []);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setError("Username dan password wajib diisi");
            return;
        }

        setError(null);
        setIsLoading(true);

        setTimeout(async () => {
            await AsyncStorage.setItem("isLoggedIn", "true");
            setIsLoading(false);
            navigation.replace("MainTabs");
        }, 600);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.bellHeaderWrapper} pointerEvents="none">
                <Image
                    source={require("../assets/images/bell-main.png")}
                    style={styles.bellHeaderImage}
                    resizeMode="contain"
                />
            </View>

            {showBellIntro && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.bellOverlayWrapper,
                        {
                            transform: [
                                { translateY: introY },
                                { scale: introScale },
                            ],
                        },
                    ]}
                >
                    <Image
                        source={require("../assets/images/bell-main.png")}
                        style={styles.bellMain}
                        resizeMode="contain"
                    />
                    <Animated.Image
                        source={require("../assets/images/bell-bottom.png")}
                        style={[styles.bellBottom, { opacity: bottomOpacity }]}
                        resizeMode="contain"
                    />
                </Animated.View>
            )}

            <View style={styles.content}>
                {/* Brand & Subtitle */}
                <Text style={[typography.h1, styles.brand]}>Kujang Hub</Text>
                <Text style={[typography.body, styles.subtitle]}>
                    Enter your credentials below to <Text style={styles.subtitleHighlight}>login</Text>
                </Text>

                {/* Login Form */}
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

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity 
                    style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text style={styles.loginButtonText}>
                        {isLoading ? "Logging in..." : "Log In"}
                    </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.orRow}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                {/* Kujang ID Login */}
                <TouchableOpacity
                    style={styles.kujangIdButton}
                    onPress={() => navigation.navigate("KujangIdLogin")}
                >
                    <Text style={styles.kujangIdButtonText}>Log In with KUJANG ID</Text>
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
    bellHeaderWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        overflow: "hidden",
        height: HEADER_PEEK_HEIGHT,
    },
    bellHeaderImage: {
        width: HEADER_BELL_WIDTH,
        height: HEADER_BELL_HEIGHT,
        marginTop: HEADER_MARGIN_TOP,
    },
    bellOverlayWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    bellMain: {
        width: 90,
        height: 65,
    },
    bellBottom: {
        width: 0,
        height: 0,
        marginTop: -2,
    },
    content: {
        paddingHorizontal: spacing.lg,
        marginTop: HEADER_PEEK_HEIGHT + spacing.sm,
    },
    brand: {
        color: colors.primary,
        textAlign: "center",
        marginTop: spacing.md,
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
    errorText: {
        color: colors.danger,
        fontSize: 14,
        marginBottom: spacing.sm,
        textAlign: "center",
    },
    loginButtonDisabled: {
        opacity: 0.6,
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