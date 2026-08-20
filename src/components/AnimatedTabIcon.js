import React, { useEffect, useRef } from "react";
import { Animated, Image } from "react-native";

export default function AnimatedTabIcon({ source, color, size, focused }) {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (focused) {
            Animated.sequence([
                Animated.spring(scale, {
                    toValue: 1.25,
                    friction: 4,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 4,
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