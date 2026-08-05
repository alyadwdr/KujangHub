import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function SplashScreen({ navigation }) {
    const translateY = useRef(new Animated.Value(-150)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 700,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() => {
            navigation.replace("Login");
        });
    }, [translateY, opacity]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateY }], opacity }}>
                <View style={styles.bell} />
            </Animated.View>
            <Text style={[typography.h1, styles.title]}>Kujang Hub</Text>
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
    bell: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: colors.primary,
    },
    title: {
        marginTop: spacing.md,
        color: colors.primary,
    },
});