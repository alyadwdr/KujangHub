import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from "react-native";
import { colors, typography, spacing } from "../theme";
import { useRequests } from "../context/RequestsContext";
import ConfirmModal from "../components/ConfirmModal";
import { WebView } from "react-native-webview";
import Toast from "react-native-toast-message";

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
                    <Text style={{ fontSize: 24 }}>‹</Text>
                </TouchableOpacity>
                <Text style={[typography.h2, styles.headerTitle]}>Detail Request</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.xs, paddingBottom: 100 }}>

                {/* Requester Info */}
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

                {request.decisionNote && (
                    <View style={styles.decisionNoteCard}>
                        <Text style={styles.decisionNoteLabel}>Catatan Anda:</Text>
                        <Text style={styles.decisionNoteText}>{request.decisionNote}</Text>
                    </View>
                )}

                {/* WebView Detail */}
                <View style={styles.webviewCard}>
                    <View style={styles.urlBar}>
                        <Image
                            source={require("../assets/images/lock-icon.png")}
                            style={styles.lockIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.urlText} numberOfLines={1}>
                            {request.webviewUrl}
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

                {/* Attachments */}
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
            
            {/* Footer Actions */}
            <View style={styles.footer}>
                {request.status === "approved" || request.status === "rejected" || request.status === "redirected" ? (
                    <TouchableOpacity style={styles.backToListButton} onPress={() => navigation.goBack()}>
                        <Text style={{ color: colors.textPrimary, fontFamily: "Inter-Bold" }}>Kembali</Text>
                    </TouchableOpacity>
                ) : request.actionType === "approve_reject" ? (
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.rejectButton} onPress={() => setModalType("reject")}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                <Image
                                    source={require("../assets/images/x-icon.png")}
                                    style={{ width: 14, height: 14, tintColor: colors.danger }}
                                    resizeMode="contain"
                                />
                                <Text style={{ color: colors.danger }}>Tolak</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.approveButton} onPress={() => setModalType("approve")}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                <Image
                                    source={require("../assets/images/check-icon.png")}
                                    style={{ width: 14, height: 14, tintColor: colors.white }}
                                    resizeMode="contain"
                                />
                                <Text style={{ color: colors.white }}>Setujui</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.redirectButton}
                        onPress={() => {
                            Linking.openURL(request.webviewUrl);
                            updateRequestStatus(request.id, "redirected");
                            navigation.goBack();

                            Toast.show({
                                type: "info",
                                text1: `Diproses di ${request.sourceApp}`,
                            });
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                            <Image
                                source={require("../assets/images/redirect-icon.png")}
                                style={{ width: 14, height: 14, tintColor: colors.kujangIdBlue }}
                                resizeMode="contain"
                            />
                            <Text style={{ color: colors.kujangIdBlue }}>
                                Proses di {request.sourceApp}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            {/* Confirmation Modal */}
            <ConfirmModal
                visible={modalType !== null}
                type={modalType}
                onCancel={() => setModalType(null)}
                onConfirm={(note) => {
                    const newStatus = modalType === "approve" ? "approved" : "rejected";
                    updateRequestStatus(request.id, newStatus, note); 
                    setModalType(null);
                    navigation.goBack();

                    Toast.show({
                        type: newStatus === "approved" ? "success" : "error",
                        text1: newStatus === "approved" ? "Request disetujui" : "Request ditolak",
                    });
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
        paddingBottom: spacing.md,
    },
    backButton: {
        width: 32,
        height: 32,
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
        borderWidth: 1,
        borderColor: "#E5E7EB",
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
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    urlBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.sm,
        backgroundColor: "#F3F4F6",
    },
    lockIcon: {
        width: 12,
        height: 12,
        marginRight: 6,
        tintColor: colors.textSecondary,
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
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    attachmentTitle: {
        fontFamily: "Inter-Bold",
        marginBottom: spacing.sm,
    },
    attachmentRow: {
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        padding: spacing.md,
    },
    attachmentText: {
        fontFamily: "Inter-Bold",
    },
    decisionNoteCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: "#E5E7EB"
    },
    decisionNoteLabel: {
        fontFamily: "Inter-Bold",
        marginBottom: spacing.xs,
        fontSize: 14,
        color: colors.textSecondary,
    },
    decisionNoteText: {
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
    footer: {
        padding: spacing.lg,
        marginTop: spacing.sm,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderColor: "#E5E7EB"
    },
    backToListButton: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    }
});