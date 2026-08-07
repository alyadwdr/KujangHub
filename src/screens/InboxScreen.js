import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../theme";
import { useRequests } from "../context/RequestsContext";

export default function InboxScreen({ navigation }) {
    const { requests } = useRequests();
    const pendingRequests = requests.filter((item) => !item.status || item.status === "pending");

    return (
        <View style={styles.container}>
            <Text style={[typography.h1, styles.title]}>Inbox</Text>
            <FlatList
                data={pendingRequests}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                    >
                        <View style={styles.cardTopRow}>
                            <View style={[styles.badge, { backgroundColor: `${item.badgeColor}22` }]}>
                                <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.sourceApp}</Text>
                            </View>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                        <Text style={[typography.body, styles.itemTitle]}>{item.title}</Text>
                    </TouchableOpacity>
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
        color: colors.primary,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    list: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
    },
    cardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "700",
    },
    date: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    itemTitle: {
        marginTop: spacing.xs,
    }
});