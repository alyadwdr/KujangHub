import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";

function ToastPill({ text, color }) {
    return (
        <View style={styles.pill}>
            <Text style={[styles.text, { color }]}>{text}</Text>
        </View>
    );
}

export const toastConfig = {
    success: (props) => <ToastPill text={props.text1} color={colors.primaryDark} />,
    error: (props) => <ToastPill text={props.text1} color={colors.danger} />,
    info: (props) => <ToastPill text={props.text1} color={colors.kujangIdBlue} />,
};

const styles = StyleSheet.create({
    pill: {
        backgroundColor: colors.white,
        borderRadius: 999,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    text: {
        fontFamily: "Inter-ExtraBold",
        fontSize: 14,
        textAlign: "center",
    },
});