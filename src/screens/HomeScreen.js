import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import { colors, spacing, typography } from '../theme';
import { useRequests } from '../context/RequestsContext';
import dummyApps from '../data/dummyApps';
import dummyUser from '../data/dummyUser';

export default function HomeScreen({ navigation }) {
    const { pendingRequests } = useRequests();
    const appsWithPending = dummyApps.filter((app) => app.pendingCount > 0);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
            <View style={styles.header}>
                <Text style={[typography.h1, { color: colors.primary }]}>Kujang Hub</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.greeting}>
                Halo, <Text style={{ fontWeight: "700" }}>{dummyUser.name}</Text>
            </Text>
            <View style={styles.divider} />

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("PendingPerApp")}>
                <View style={styles.cardHeaderRow}>
                    <Text style={typography.h2}>Aplikasi Terintegrasi</Text>
                    <Text style={styles.lihatSemua}>Lihat Semua &gt;</Text>
                </View>
                
                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                </View>

                <View style={styles.dotsRow}>
                    {appsWithPending.map((app) => (
                        <View key={app.id} style={styles.dotItem}>
                            <View style={[styles.dot, { backgroundColor: app.color }]} />
                            <Text style={typography.small}>{app.name}</Text>
                            <Text style={[typography.small, { fontWeight: "700" }]}> {app.pendingCount}</Text>
                        </View>
                    ))}
            </View>
        </TouchableOpacity>

        <View style={styles.card}>
            <Text style={[typography.h2, { marginBottom: spacing.sm }]}>
                {pendingRequests.length} request terbaru
            </Text>
            {pendingRequests.map((item, index) => (
                <View
                    key={item.id}
                    style={[styles.requestRow, index > 0 && styles.requestRowDivider]}
                >
                    <View style={[styles.avatar, { backgroundColor: item.badgeColor }]}>
                        <Text style={styles.avatarText}>{item.sourceApp[0]}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                        <Text style={typography.body} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text style={[typography.small, { color: colors.textSecondary }]}>
                            {item.sourceApp} | {item.date}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.prosesButton}
                        onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                    >
                        <Text style={{ color: colors.primary, fontWeight: "700" }}>Proses</Text>
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bellIcon: {
        width: 28,
        height: 28,
    },
    greeting: {
        color: colors.textSecondary, 
        marginTop: spacing.sm,
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginTop: spacing.md,
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
    progressBar: {
        height: 4,
        backgroundColor: "#E5E7EB",
        borderRadius: 2,
        marginTop: spacing.sm,
    },
    progressFill: {
        width: "30%",
        height: 4,
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    dotsRow: {
        flexDirection: 'row',
        marginTop: spacing.sm,
        gap: spacing.md,
        flexWrap: "wrap",
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
        paddingVertical: spacing.sm,
    },
    requestRowDivider: {
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
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