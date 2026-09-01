import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from "react-native";
import { colors, spacing, typography } from "../theme";
import dummyUser from "../data/dummyUser";
import ConfirmModal from "../components/ConfirmModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
    const [notifEnabled, setNotifEnabled] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("isLoggedIn");
        setShowLogoutModal(false);
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[typography.h1, { color: colors.primary }]}>Profile</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Card */}
                <View style={styles.profileCardWrapper}>
                    <View style={styles.profileCard}>
                        <Text style={typography.h2}>{dummyUser.name}</Text>
                    </View>
                    <Image
                        source={require("../assets/images/person-icon.png")}
                        style={styles.avatar}
                        resizeMode="contain"
                    />
                </View>

                {/* User Info */}
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

                {/* Settings */}
                <Text style={styles.sectionLabel}>Pengaturan</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={typography.body}>Notifikasi</Text>
                        <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
                    </View>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.row}>
                        <Text style={typography.body}>Bantuan & Panduan</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.row}>
                        <Text style={typography.body}>Kebijakan Privasi & Ketentuan Layanan</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={typography.body}>Tentang Aplikasi</Text>
                        <Text style={styles.rowLabel}>v1.0.0</Text>
                    </View>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
                    <Text style={{ color: colors.danger }}>Keluar</Text>
                </TouchableOpacity>
            </ScrollView>

            <ConfirmModal
                visible={showLogoutModal}
                type="logout"
                onCancel={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
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
        paddingBottom: spacing.md,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    bellIcon: {
        width: 28,
        height: 28
    },
    profileCardWrapper: {
        marginTop: 50,
    },
    profileCard:  {
        backgroundColor: colors.surface,
        borderRadius: 16,
        paddingTop: 72,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    avatar: {
        position: "absolute",
        top: -36,
        alignSelf: "center",
        width: 92,
        height: 92,
        borderRadius: 999,
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
        borderWidth: 1,
        borderColor: "#E5E7EB",
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
    chevron: {
        color: colors.textSecondary,
    },
    divider: {
        height: 1, 
        backgroundColor: "#E5E7EB",
    },
    logoutButton: {
        backgroundColor: "#FBE7E7",
        borderWidth: 1,
        borderColor: colors.danger,
        borderRadius: 8,
        paddingVertical: spacing.md,
        alignItems: "center",
        marginTop: spacing.lg,
    },
});