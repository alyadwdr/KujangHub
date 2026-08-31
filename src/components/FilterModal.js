import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function FilterModal({ visible, title, options, selected, onApply, onClose }) {
    const [tempSelected, setTempSelected] = useState(selected);

    useEffect(() => {
        setTempSelected(selected);
    }, [visible]);

    const toggleOption = (option) => {
        setTempSelected((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.sheet}>
                            
                            <Text style={typography.h2}>{title}</Text>

                            <ScrollView style={styles.optionList}>
                                {options.map((option) => {
                                    const isChecked = tempSelected.includes(option);
                                    return (
                                        <TouchableOpacity
                                            key={option}
                                            style={styles.optionRow}
                                            onPress={() => toggleOption(option)}
                                        >
                                            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                                                {isChecked && <Text style={styles.checkmark}>✓</Text>}
                                            </View>
                                            <Text style={typography.body}>{option}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={() => setTempSelected([])}
                                >
                                    <Text style={{ color: colors.textPrimary, fontFamily: "Inter-Bold" }}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.applyButton}
                                    onPress={() => {
                                        onApply(tempSelected);
                                        onClose();
                                    }}
                                >
                                    <Text style={{ color: colors.white, fontFamily: "Inter-Bold" }}>Apply</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end"
    },
    sheet: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: spacing.lg,
        maxHeight: "70%",
    },
    optionList: {
        marginTop: spacing.md,
        marginBottom: spacing.md,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkmark: {
        color: colors.white,
        fontSize: 12,
        fontFamily: "Inter-Bold"
    },
    buttonRow: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    resetButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    },
    applyButton: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
    },
});