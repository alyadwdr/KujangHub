import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import{ colors, spacing, typography } from "../theme";

export default function ConfirmModal({ visible, type, onCancel, onConfirm }) {
    const [note, setNote] = useState("");

    const config = {
        approve: {
            title: "Setujui request ini",
            descrription: "Status akan diperbarui dan pemohon akan mendapat notifikasi",
            confirmLabel: "Setujui",
            confirmColor: colors.primary,
            showNoteInput: true,
        },
        reject: {
            title: "Tolak request ini",
            descrription: "Status akan diperbarui dan pemohon akan mendapat notifikasi",
            confirmLabel: "Tolak",
            confirmColor: colors.danger,
            showNoteInput: true,
        },
        logout: {
            title: "Keluar dari akun?",
            descrription: "Anda perlu login lagi lewat Kujang ID untuk masuk ke aplikasi",
            confirmLabel: "Ya, Keluar",
            confirmColor: colors.danger,
            showNoteInput: false,
        }
    }

    const current = config[type] || config.approve;

    const handleConfirm = () => {
        onConfirm(note);
        setNote("");
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.backdrop}>
                <View style={styles.card}>
                    <Text style={typography.h2}>{current.title}</Text>
                    <Text style={styles.description}>{current.description}
                        Status akan diperbarui dan pemohon akan mendapat notifikasi
                    </Text>

                    {current.showNoteInput && (
                        <TextInput
                            style={styles.noteInput}
                            placeholder="Tambahkan catatan..."
                            value={note}
                            onChangeText={setNote}
                            multiline
                        />
                    )}

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={{ fontWeight: "700"}}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: current.confirmColor }]}
                            onPress={handleConfirm}
                        >
                            <Text style={{ color: colors.white, fontWeight: "700" }}>{current.confirmLabel}</Text>
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