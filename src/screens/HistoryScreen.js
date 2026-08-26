import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { colors, spacing, typography } from "../theme";
import { useRequests } from "../context/RequestsContext";
import { formatTimeInbox } from "../utils/formatDate";
import LoadingState from "../components/LoadingState";

const TABS = [
    { key: "all", label: "Semua" },
    { key: "approved", label: "Disetujui" },
    { key: "rejected", label: "Ditolak" },
    { key: "redirected", label: "Diproses" },
    { key: "expired", label: "Terlewat" },
]

export default function HistoryScreen({ navigation }) {
    const { historyRequests, isLoading } = useRequests();
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const counts = {
        all: historyRequests.length,
        approved: historyRequests.filter((item) => item.status === "approved").length,
        rejected: historyRequests.filter((item) => item.status === "rejected").length,
        redirected: historyRequests.filter((item) => item.status === "redirected").length,
        expired: 0,
    };

    const filteredRequests = historyRequests
    .filter((item) => (activeTab === "all" ? true : item.status === activeTab))
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[typography.h1, styles.title]}>History</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
                <Image
                    source={require("../assets/images/search-icon.png")}
                    style={styles.searchIcon}
                    resizeMode="contain"
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {isLoading ? (
                <LoadingState message="Loading..." />
            ) : (
                <>
                {/* Filter Tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabScroll}
                    contentContainerStyle={styles.tabRow}
                >
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={[styles.tabChip, isActive && styles.tabChipActive]}
                                onPress={() => setActiveTab(tab.key)}
                            >
                                <Text style ={[styles.tabText, isActive && styles.tabTextActive]}>
                                    {tab.label} {counts[tab.key]}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                
                {/* History List */}
                <FlatList
                    data={filteredRequests}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.empty}>Tidak ada history</Text>}
                    renderItem={({ item }) => {
                        const statusConfig = {
                            approved: { text: "✓ Telah disetujui", color: colors.primary },
                            rejected: { text: "✕ Telah ditolak", color: colors.danger },
                            redirected: { text: `↗ Telah diproses di ${item.sourceApp}`, color: colors.kujangIdBlue },
                        };
                        const status = statusConfig[item.status] || { text: "", color: colors.textSecondary };

                        return (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                            >
                                <View style={styles.cardTopRow}>
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.sourceApp}</Text>
                                    </View>
                                    <Text style={styles.date}>{formatTimeInbox(item.date)}</Text>
                                </View>

                                <Text style={[typography.body, styles.itemTitle]}>{item.title}</Text>
                                <Text style={styles.itemNote}>{item.note}</Text>

                                <View style={styles.requesterRow}>
                                    <Image
                                        source={require("../assets/images/person-icon.png")}
                                        style={styles.avatar}
                                        resizeMode="cover"
                                    />
                                    <Text style={styles.requesterText}>
                                        {item.requester.name} - Dept. {item.requester.dept}
                                    </Text>
                                </View>

                                <View style={styles.statusRow}>
                                    <Text style={[styles.statusText, { color: status.color }]}>
                                        {status.text}
                                    </Text>
                                    {item.confirmedAt && (
                                        <>
                                        <View style={styles.statusDot} />
                                        <Text style={styles.confirmedTime}>
                                            {new Date(item.confirmedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit"})} WIB
                                        </Text>
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                </>
            )}
        </View>
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
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
    },
    title: {
        color: colors.primary,
    },
    bellIcon: {
        width: 28,
        height: 28,
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:colors.surface,
        marginHorizontal: spacing.lg,
        marginTop: spacing.lg,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
    },
    searchIcon: { 
        width: 16,
        height: 16,
        marginRight: spacing.sm,
        tintColor: colors.textSecondary
    },
    searchInput: {
        flex: 1,
        paddingVertical: spacing.md,
    },
    tabScroll: {
        flexGrow: 0,
        flexShrink: 0,
        height: 60,
    },
    tabRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    tabChip: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 999,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        backgroundColor: colors.surface,
    },
    tabChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    tabText: {
        fontSize: 12,
        color: colors.textPrimary,
    },
    tabTextActive: {
        color: colors.white,
    },
    list: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
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
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    cardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badge: {
        backgroundColor: "#E5E7EB",
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: "Inter-Bold",
        color: colors.textSecondary
    },
    date: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    itemTitle: {
        marginTop: spacing.sm,
        fontFamily: "Inter-Bold",
    },
    itemNote: {
        fontSize: 12, 
        color: colors.textSecondary,
        marginTop: 2,
    },
    requesterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.sm,
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 999,
        backgroundColor: colors.textSecondary,
    },
    requesterText: {
        fontSize: 12,
        fontFamily: "Inter-Bold",
        marginLeft: spacing.xs,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: spacing.sm,
        gap: 6,
    },
    statusText: {
        fontFamily: "Inter-Bold",
        fontSize: 12,
    },
    statusDot: {
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: colors.textSecondary,
    },
    confirmedTime: {
        fontSize: 12,
        color: colors.textSecondary,
    },
});