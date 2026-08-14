import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { colors, typography, spacing } from "../theme";
import { useRequests } from "../context/RequestsContext";
import ConfirmModal from "../components/ConfirmModal";
import { WebView } from "react-native-webview";

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
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 18 }}>‹</Text>
                </TouchableOpacity>
                <Text style={[typography.h2, styles.headerTitle]}>Detail Request</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>

                <View style={styles.requesterCard}>
                    <Image
                        source={require("../assets/images/person-icon.png")}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                        <Text style={[typography.body, { fontFamily: "Inter-Bold" }]}>{request.requester.name}</Text>
                        <Text style={styles.small}>{request.requester.nip}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: `${request.badgeColor}22` }]}>
                        <Text style={[styles.badgeText, { color: request.badgeColor }]}>{request.sourceApp}</Text>
                    </View>
                </View>

                <View style={styles.webviewCard}>
                    <View style={styles.urlBar}>
                        <Text style={styles.urlText} numberOfLines={1}>
                            🔒 {request.webviewUrl}
                        </Text>
                    </View>
                    <View style={styles.webviewContainer}>
                        <WebView
                            source={{ uri: request.webviewUrl }} 
                            style={styles.webview} 
                            nestedScrollEnabled={true}
                        />
                    </View>
                </View>

                {request.attachments?.length > 0 && (
                    <View style={styles.attachmentCard}>
                        <Text style={styles.attachmentTitle}>Lampiran</Text>
                        {request.attachments.map((att) => (
                            <View key={att.name} style={styles.attachmentRow}>
                                <Text style={styles.attachmentText}>📎 {att.name}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
            
            <View style={styles.footer}>
                {request.actionType === "approve_reject" ? (
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.rejectButton} onPress={() => setModalType("reject")}>
                            <Text style={{ color: colors.danger }}>Tolak</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.approveButton} onPress={() => setModalType("approve")}>
                            <Text style={{ color: colors.white }}>Setujui</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.redirectButton}>
                        <Text style={{ color: colors.kujangIdBlue }}>
                            Proses di {request.sourceApp}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

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
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: colors.surface,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        color: colors.primary,
        flex: 1,
        marginLeft: spacing.sm,
    },
    bellIcon: {
        width: 28,
        height: 28,
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
        fontFamily: "Inter-Bold",
    },
    webviewCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        marginBottom: spacing.lg,
        overflow: "hidden",
    },
    urlBar: {
        padding: spacing.sm,
        backgroundColor: "#F3F4F6",
    },
    urlText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    webviewContainer: {
        height: 320,
    },
    webview: {
        flex: 1,
    },
    attachmentCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
    },
    attachmentTitle: {
        fontFamily: "Inter-Bold",
        marginBottom: spacing.sm,
    },
    attachmentRow: {
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: spacing.md,
    },
    attachmentText: {
        fontFamily: "Inter-Bold",
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
    footer: {
        padding: spacing.lg,
        marginTop: spacing.sm,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderColor: "#E5E7EB"
    },
});