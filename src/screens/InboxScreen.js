import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from "react-native";
import { colors, spacing, typography } from "../theme";
import { useRequests } from "../context/RequestsContext";
import ConfirmModal from "../components/ConfirmModal";

const FILTERS = ["Aplikasi", "Departemen", "Waktu"];

export default function InboxScreen({ navigation }) {
    const { pendingRequests, updateRequestStatus } = useRequests();
    const [search, setSearch] = useState("");
    const [modalRequest, setModalRequest] = useState(null);

    const filteredRequests = pendingRequests.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const openModal = (id, type) => setModalRequest({ id, type });
    const closeModal = () => setModalRequest(null);

    const handleConfirm = () => {
        const newStatus = modalRequest.type === "approve" ? "approved" : "rejected";
        updateRequestStatus(modalRequest.id.newStatus);
        closeModal();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[typography.h1, styles.title]}>Inbox</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
            </View>

            <TextInput
                style={styles.search}
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
            />

            <View style={styles.filterRow}>
                {FILTERS.map((label) => (
                    <TouchableOpacity key ={label} style={styles.filterChip}>
                        <Text style={styles.filterText}>+ {label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredRequests}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                    >
                        <View style={styles.cardTopRow}>
                            <View style={[styles.badge, { backgroundColor: `${item.badgeColor}22` }]}>
                                <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.sourceApp}</Text>
                            </View>
                            <Text style={styles.date}>{item.date}</Text>
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

                        {item.actionType === "approve_reject" ? (
                            <View style={styles.actionRow}>
                                <TouchableOpacity
                                    style={styles.rejectButton}
                                    onPress={() => openModal(item.id, "reject")}
                                >
                                    <Text style={styles.rejectText}>✕ Tolak</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.approveButton}
                                    onPress={() => openModal(item.id, "approve")}
                                >
                                    <Text style={styles.approveText}>✓ Setujui</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.redirectButton}
                                onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                            >
                                <Text style={styles.redirectText}>Proses di {item.sourceApp}</Text>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                )}
            />

            <ConfirmModal
                visible={!!modalRequest}
                type={modalRequest?.type}
                onCancel={closeModal}
                onConfirm={handleConfirm}
            />
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
    search: {
        backgroundColor: colors.surface,
        marginHorizontal: spacing.lg,
        marginTop: spacing.lg,
        borderRadius: 8,
        padding: spacing.md,
    },
    filterRow: {
        flexDirection: "row",
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.md,
    },
    filterChip: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderStyle: "dashed",
        borderRadius: 8,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
    },
    filterText: {
        fontSize: 12,
        color: colors.primary,
    },
    list: {
        padding: spacing.lg,
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
        fontFamily: "Inter-Bold",
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
        backgroundColor: colors.primary,
    },
    requesterText: {
        fontSize: 12,
        fontFamily: "Inter-Bold",
        marginLeft: spacing.xs,
    },
    actionRow: {
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    rejectButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.danger,
        borderRadius: 8,
        paddingVertical: spacing.sm,
        alignItems: "center",
    },
    rejectText: {
        color: colors.danger,
    },
    approveButton: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: spacing.sm,
        alignItems: "center",
    },
    approveText: {
        color: colors.white,
    },
    redirectButton: {
        borderWidth: 1,
        borderColor: colors.kujangIdBlue,
        backgroundColor: `${colors.kujangIdBlue}15`,
        borderRadius: 8,
        paddingVertical: spacing.sm,
        alignItems: "center",
        marginTop: spacing.md,
    },
    redirectText: {
        color: colors.kujangIdBlue,
    },
});