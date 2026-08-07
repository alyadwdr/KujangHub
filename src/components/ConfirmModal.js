import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import{ colors, spacing, typography } from "../theme";

export default function ConfirmModal({ visible, type, onCancel, onConfirm }) {
    const [note, setNote] = useState("");

    const isApprove = type === "approve";
    const title = isApprove ? "Setujui request ini?" : "Tolak request ini?";
    const confirmLabel = isApprove ? "Setujui" : "Tolak";
    const confirmColor = isApprove ? colors.primary : colors.danger;

    const handleConfirm = () => {
        onConfirm(note);
        setNote("");
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.backdrop}>
                <View style={styles.card}>
                    <Text style={typography.h2}>{title}</Text>
                    <Text style={styles.descrription}>
                        Status akan diperbarui dan pemohon akan mendapat notifikasi
                    </Text>

                    <TextInput
                        style={styles.noteInput}
                        placeholder="Tambahkan catatan..."
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={{ fontWeight: "700"}}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: confirmColor }]}
                            onPress={handleConfirm}
                        >
                            <Text style={{ color: colors.white, fontWeight: "700" }}>{confirmLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.lg,
    },
    card: {
        width: "100%",
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.lg,
    },
    descrription: {
        color: colors.textSecondary,
        marginTop: spacing.xs,
        marginBottom: spacing.md,
    },
    noteInput: {
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: spacing.md,
        minHeight: 70,
        textAlignVertical: "top",
        marginBottom: spacing.md,
    },
    buttonRow: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    cancelButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    },
    confirmButton: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    },
});