import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors, typography, spacing } from "../theme";
import { dummyApps } from "../data/dummyApps";

export default function PendingPerAppScreen() {
    return (
        <View style={styles.container}>
            <Text style={[typography.h2, styles.title]}>Pending per Aplikasi</Text>
            <FlatList
                data={dummyApps}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={[styles.dot, { bakgroundColor: item.color }]} />
                        <Text style={typography.body}>{item.name}</Text>
                        <Text style={styles.pendingText}>{item.pendingCount} pending</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: spacing.lg,
    },
    title: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    list: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: spacing.sm,
    },
    pendingtext: {
        marginLeft:"auto",
        color: colors.textSecondary,
    }
});