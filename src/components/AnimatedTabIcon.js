import React, { useEffect, useRef } from "react";
import { Alert, Animated, Image } from "react-native";

export default function AnimatedTabIcon({ source, color, size, focused }) {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (focused) {
            scale.setValue(1);
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 5,
                    tension: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [focused]);

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <Image
                source={source}
                style={{ width: size, height: size, tintColor: color }}
                resizeMode="contain"
            />
        </Animated.View>
    );
}