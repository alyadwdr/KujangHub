import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { colors, spacing, typography } from "../theme";
import dummyUser from "../data/dummyUser"
import ConfirmModal from "../components/ConfirmModal";
import { divide } from "react-native/types_generated/Libraries/Animated/AnimatedExports";

export default function ProfileScreen({ navigation }) {
    const [notifEnabled, setNotifEnabled] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(false);
        navigation.reset({
            index:0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
            <Text style={[typography.h1, { color: colors.primary }]}>Profile</Text>

            <View style={styles.profileCard}>
                <View style={styles.avatar} />
                <Text style={[typography.h2, { marginTop: spacing.sm }]}>{dummyUser.name}</Text>
            </View>

            <Text style={styles.sectionLabel}>Informasi Profil</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>NIP</Text>
                    <Text style={typography.body}>{dummyUser.nip}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Departemen</Text>
                    <Text style={typography.body}>{dummyUser.dept}</Text>
                </View>
            </View>

            <Text style={styles.sectionLabel}>Pengaturan</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={typography.body}>Notifikasi</Text>
                    <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
                <Text style={{ color: colors.danger, fontWeight: "700" }}>Keluar</Text>
            </TouchableOpacity>

            <ConfirmModal
                visible={showLogoutModal}
                type="logout"
                onCancel={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    profileCard:  {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.lg,
        alignItems: "center",
        marginTop: spacing.md,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primary,
    },
    sectionLabel: {
        color: colors.textSecondary,
        marginTop: spacing.lg,
        marginBottom: spacing.xs,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        paddingHorizontal: spacing.md,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.md,
    },
    rowLabel: {
        color: colors.textSecondary,
    },
    divider: {
        height: 1, 
        backgroundColor: "#E5E7EB",
    },
    logoutButton: {
        backgroundColor: "#FBE7E7",
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
        marginTop: spacing.lg,
    },
});