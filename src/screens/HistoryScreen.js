import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors, spacing, typography } from "../theme";
import { useRequests } from "../context/RequestsContext";

export default function HistoryScreen() {
    const { requests } = useRequests();
    const historyRequests = requests.filter(
        (item) => item.status === "approved" || item.status === "rejected"
    );

    return (
        <View style={styles.container}>
            <Text style={[typography.h1, styles.title]}>History</Text>
            <FlatList
                data={historyRequests}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.empty}>Tidak ada history</Text>}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardTopRow}>
                            <View style={[styles.badge, { backgroundColor: `${item.badgeColor}22 `}]}>
                                <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.sourceApp}</Text>
                            </View>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                        <Text style={[typography.body, styles.itemTitle]}>{item.title}</Text>
                        <Text
                            style={[
                                styles.statusText,
                                { color: item.status === "approved" ? colors.primary : colors.danger },
                            ]}
                        >
                            {item.status === "approved" ? "✓ Telah disetujui" : "✕ Telah ditolak"}
                        </Text>
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
        color: colors.primary,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    list: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    empty: {
        textAlign: "center",
        color: colors.textSecondary,
        marginTop: spacing.xl,
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
        color: colors.textSecondary
    },
    date: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    itemTitle: {
        marginTop: spacing.xs
    },
    statusText: {
        marginTop: spacing.sm,
        textAlign: "right",
        fontWeight: "700",
        fontSize: 12,
    }
});