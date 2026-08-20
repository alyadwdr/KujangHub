import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image, Dimensions } from "react-native";
import { colors, spacing, typography } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
    // fase 1: bell muncul dari atas
    const dropY = useRef(new Animated.Value(-150)).current;
    const appearOpacity = useRef(new Animated.Value(1)).current;

    //fase 2
    const moveX = useRef(new Animated.Value(0)).current;
    const moveY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
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
            Animated.delay(400),
            ]).start(async () => {
                const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
                if (isLoggedIn === "true") {
                    const targetX = width / 2 - 40;
                    const targetY = -(height / 2) + 60;

                    navigation.replace("MainTabs");

                    Animated.parallel([
                        Animated.timing(moveX, {
                            toValue: targetX,
                            duration: 500,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(moveY, {
                            toValue: targetY,
                            duration: 500,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(scale, {
                            toValue: 0.3,
                            duration: 500,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(titleOpacity, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true,
                        }),
                    ]).start();
                } else {
                    navigation.replace("Login");
                }
            });
        }, []);

        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        transform: [
                            { translateY: dropY }, 
                            { translateX: moveX },
                            { translateY: moveY },
                            { scale },
                        ],
                        opacity: appearOpacity,
                    }}
                >
                    <Image
                        source={require("../assets/images/bell-icon.png")}
                        style={styles.bellIcon}
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
        bellIcon: {
            width: 90,
            height: 90,
        },
        title: {
            marginTop: spacing.md,
            color: colors.primary,
        },
    });