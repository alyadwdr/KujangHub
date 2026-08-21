import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import { colors, spacing, typography } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
    const dropY = useRef(new Animated.Value(-150)).current;
    const appearOpacity = useRef(new Animated.Value(1)).current;
    const titleOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(dropY, {
                    toValue: 0,
                    duration: 700,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(appearOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(100),
            Animated.timing(titleOpacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            ]).start(async () => {
                const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

                if (isLoggedIn === "true") {
                    navigation.replace("MainTabs", {
                        screen: "Home",
                        params: { playBellIntro: true },
                    });
                } else {
                    navigation.replace("Login", { playBellIntro: true });
                }
            });
        }, []);

        return (
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ translateY: dropY }], opacity: appearOpacity }}>
                    <Image
                        source={require("../assets/images/bell-icon.png")}
                        style={styles.bell}
                        resizeMode="contain"
                    />
                </Animated.View>
                <Animated.Text style={[typography.h1, styles.title, { opacity: titleOpacity }]}>Kujang Hub</Animated.Text>
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
        },
        title: {
            marginTop: spacing.md,
            color: colors.primary,
        },
    });