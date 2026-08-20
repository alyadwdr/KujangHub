import React, { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, Animated, Dimensions, Easing } from "react-native";
import{ colors, spacing, typography } from "../theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function ConfirmModal({ visible, type, onCancel, onConfirm }) {
    const [note, setNote] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    useEffect(() => {
        if (visible) {
            setModalVisible(true);
        }
    }, [visible]);

    useEffect(() => {
        if (modalVisible) {
            translateY.setValue(SCREEN_HEIGHT);
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                damping: 18,
                stiffness: 160,
                mass: 0.9,
            }).start();
        }
    }, [modalVisible]);

    const animateClose = (callback) => {
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 260,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            callback && callback();
        });
    };

    const config = {
        approve: {
            icon: require("../assets/images/check-icon2.png"),
            title: "Setujui request ini",
            description: "Status akan diperbarui dan pemohon akan mendapat notifikasi",
            confirmLabel: "Setujui",
            confirmColor: colors.primary,
            showNoteInput: true,
        },
        reject: {
            icon: require("../assets/images/x-icon2.png"),
            title: "Tolak request ini",
            description: "Status akan diperbarui dan pemohon akan mendapat notifikasi",
            confirmLabel: "Tolak",
            confirmColor: colors.danger,
            showNoteInput: true,
        },
        logout: {
            icon: null,
            title: "Keluar dari akun?",
            description: "Anda perlu login lagi lewat Kujang ID untuk masuk ke aplikasi",
            confirmLabel: "Ya, Keluar",
            confirmColor: colors.danger,
            showNoteInput: false,
        }
    }

    const current = config[type] || config.approve;

    const handleCancel = () => {
        animateClose(() => {
            onCancel && onCancel();
        });
    };

    const handleConfirm = () => {
        const currentNote = note;
        setNote("");
        animateClose(() => {
            onConfirm && onConfirm(currentNote);
        });
    };

    return (
        <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={handleCancel}>
            <View style={styles.backdrop}>
                <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
                    <View style={styles.titleRow}>
                        {current.icon && (
                            <Image
                                source={current.icon}
                                style={[styles.titleIcon, { tintColor: current.iconColor }]}
                                resizeMode="contain"
                            />
                        )}
                        <Text style={typography.h2}>{current.title}</Text>
                    </View>
                    <Text style={styles.description}>{current.description}</Text>

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
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: current.confirmColor }]}
                            onPress={handleConfirm}
                        >
                            <Text style={{ color: colors.white }}>{current.confirmLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
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
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    titleIcon: {
        width: 20,
        height: 20,
    },
    description: {
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