import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import dummyApps from '../data/dummyApps';
import dummyRequests from '../data/dummyRequests';

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
            <Text style={[typography.h1, { color: colors.primary }]}>Kujang Hub</Text>
            <Text style={styles.greeting}>Halo, Tono Sartono</Text>

            <View style={styles.card}>
                <View style={styles.cardHeaderRow}>
                    <Text style={typography.h2}>Aplikasi Terintegrasi</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("PendingPerApp")}>
                        <Text style={styles.lihatSemua}>Lihat Semua &gt;</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dotsRow}>
                    {dummyApps.map((app) => (
                        <View key={app.id} style={styles.dotItem}>
                            <View style={[styles.dot, { backgroundColor: app.color }]} />
                            <Text style={typography.small}>{app.name}</Text>
                            <Text style={typography.small}>{app.pendingCount}</Text>
                        </View>
                    ))}
            </View>
        </View>

        <View style={styles.card}>
            <Text style={[typography.h2, { marginBottom: spacing.sm }]}>
            {dummyRequests.length} request terbaru
            </Text>
            {dummyRequests.map((item) => (
                <View key={item.id} style={styles.requestRow}>
                    <View style={[styles.avatar, { backgroundColor: item.badgeColor }]}>
                        <Text style={styles.avatarText}>{item.sourceApp}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                        <Text style={typography.body}>{item.title}</Text>
                        <Text style={[typography.small, { color: colors.textSecondary }]}>
                            {item.sourceApp} | {item.date}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.prosesButton}
                        onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                    >
                        <Text style={{ color: colors.primary }}>Proses</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    greeting: {
        color: colors.textSecondary, 
        marginTop: spacing.xs,
        marginBottom: spacing.md,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    cardHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    lihatSemua: {
        color: colors.primary,
        fontWeight: "700",
        fontSize: 12,
    },
    dotsRow: {
        flexDirection: 'row',
        marginTop: spacing.sm,
        gap: spacing.md,
    },
    dotItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    requestRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: colors.white,
        fontWeight: '700',
    },
    prosesButton: {
        backgroundColor: `${colors.primary}22`,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: 8,
    },
});