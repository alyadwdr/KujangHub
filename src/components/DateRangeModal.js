import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Calendar } from "react-native-calendars";
import { colors, spacing, typography } from "../theme";

function toDateString(date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function DateRangeModal({ visible, selectedRange, onApply, onClose }) {
    const [startDate, setStartDate] = useState(selectedRange?.start || null);
    const [endDate, setEndDate] = useState(selectedRange?.end || null);

    useEffect(() => {
        setStartDate(selectedRange?.start || null);
        setEndDate(selectedRange?.end || null);
    }, [visible]);

    const handleDayPress = (day) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
        } else if (day.dateString < startDate) {
            setStartDate(day.dateString);
        } else {
            setEndDate(day.dateString);
        }
    };

    const buildMarkedDates = () => {
        if (!startDate) return {};
        if (!endDate) {
            return {
                [startDate]: { startingDay: true, endingDay: true, color: colors.primary, textColor: colors.white },
            };
        }

        const marks = {};
        let current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
            const key = toDateString(current);
            marks[key] = {
                color: colors.primary,
                textColor: colors.white,
                startingDay: key === startDate,
                endingDay: key === endDate,
            };
            current.setDate(current.getDate() + 1);
        }
        return marks;
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.sheet}>
                            
                            <Text style={typography.h2}>Filter Tanggal</Text>

                            <Calendar
                                markingType="period"
                                markedDates={buildMarkedDates()}
                                onDayPress={handleDayPress}
                                maxDate={toDateString(new Date())}
                                theme={{
                                    todayTextColor: colors.primary,
                                    arrowColor: colors.primary,
                                    textDayFontFamily: "Inter-Regular",
                                    textMonthFontFamily: "Inter-Bold",
                                }}
                                style={styles.calendar}
                            />

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={() => {
                                        setStartDate(null);
                                        setEndDate(null);
                                    }}
                                >
                                    <Text style={{ color: colors.textPrimary, fontFamily: "Inter-Bold" }}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.applyButton}
                                    onPress={() => {
                                        onApply({ start: startDate, end: endDate || startDate });
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
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: spacing.lg,
    },
    calendar: {
        marginTop: spacing.md,
        marginBottom: spacing.md,
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