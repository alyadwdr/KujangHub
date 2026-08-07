import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { colors, typography, spacing } from "../theme";
import { useRequests } from "../context/RequestsContext";
import ConfirmModal from "../components/ConfirmModal";

export default function DetailRequestScreen({ route, navigation }) {
    const { requestId } = route.params;
    const { requests, updateRequestStatus } = useRequests();
    const request = requests.find((item) => item.id === requestId);

    const [modalType, setModalType] = useState(null);

    if (!request) {
        return (
            <View style={styles.container}>
                <Text>Request tidak ditemukan</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
            <Text style={[typography.h2, { color: colors.primary, marginBottom: spacing.md }]}>
                Detail Request
            </Text>

            <View style={styles.requesterCard}>
                <View style={styles.avatar} />
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <Text style={typography.body}>{request.requester.name}</Text>
                    <Text style={styles.small}>{request.requester.nip}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: `${request.badgeColor}22` }]}>
                    <Text style={[styles.badgeText, { color: request.badgeColor }]}>{request.sourceApp}</Text>
                </View>
            </View>

            <View style={styles.detailCard}>
                <Text style={[typography.body, { fontWeight: "700", marginBottom: spacing.sm }]}>
                    {request.title}
                </Text>
                {Object.entries(request.detail).map(([key, value]) => (
                    <Text key={key} style={styles.detailRow}>
                        <Text style={{ fontWeight: "700" }}>{key}: </Text>
                        {value}
                    </Text>
                ))}
                <Text style={styles.noteText}>Catatan: {request.note}</Text>
            </View>

            {request.actionType === "approve_reject" ? (
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.rejectButton} onPress={() => setModalType("reject")}>
                        <Text style={{ color: colors.danger, fontWeight: "700" }}>Tolak</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.approveButton} onPress={() => setModalType("approve")}>
                        <Text style={{ color: colors.white, fontWeight: "700" }}>Setujui</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.redirectButton}>
                    <Text style={{ color: colors.kujangIdBlue, fontWeight: "700" }}>
                        Proses di {request.sourceApp}
                    </Text>
                </TouchableOpacity>
            )}
            <ConfirmModal
                visible={modalType !== null}
                type={modalType}
                onCancel={() => setModalType(null)}
                onConfirm={(note) => {
                    const newStatus = modalType === "approve" ? "approved" : "rejected";
                    updateRequestStatus(request.id, newStatus); 
                    setModalType(null);
                    navigation.goBack();
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    requesterCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
    },
    small: {
        fontSize:12,
        color: colors.textSecondary,
    },
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4, 
        borderRadius: 6,
    },
    badgeText:{
        fontSize: 12,
        fontWeight: "700",
    },
    detailCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.lg,
    },
    detailRow: {
        marginTop:spacing.xs,
    },
    noteText: {
        marginTop:spacing.sm,
        fontStyle: "italic",
        color: colors.textSecondary,
    },
    actionRow: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    rejectButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.danger,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    },
    approveButton: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    },
    redirectButton: {
        borderWidth: 1,
        borderColor: colors.kujangIdBlue,
        backgroundColor: `${colors.kujangIdBlue}15`,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    },
});