import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { colors, typography, spacing } from "../theme";
import { dummyApps } from "../data/dummyApps";
import { useRequests } from "../context/RequestsContext";

export default function PendingPerAppScreen({ navigation }) {
    const { pendingRequests } = useRequests();

    const appsWithCount = dummyApps.map((app) => {
        const count = pendingRequests.filter((item) => item.sourceApp === app.matchKey).length;
        return {...app, pendingCount: count };
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 18 }}>‹</Text>
                </TouchableOpacity>
                <Text style={[typography.h2, styles.headerTitle]}>Pending per Aplikasi</Text>
                <Image 
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.subtitle}>Aplikasi yang terhubung ke Kujang Hub</Text>

            <FlatList
                data={appsWithCount}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.iconBox}>
                            <Image source={item.logo} style={styles.iconImage} resizeMode="contain" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={typography.body}>{item.name}</Text>
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                        </View>
                        <View
                            style={[
                                styles.pendingBadge,
                                { backgroundColor: item.pendingCount > 0 ? `${colors.warning}33` : `${colors.textSecondary}22` },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.pendingText,
                                    { color: item.pendingCount > 0 ? colors.warning : colors.textSecondary },
                                ]}
                            >
                                {item.pendingCount > 0 ? `${item.pendingCount} pending` : "Tidak ada pending"}
                            </Text>
                        </View>
                    </View>
                )}
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
    subtitle: {
        color: colors.textSecondary,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.lg,
        marginBottom: spacing.lg,
    },
    list: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
        paddingBottom: spacing.xl,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    iconImage: {
        width: 36,
        height: 36,
    },
    textContainer: {
        flex: 1,
        marginLeft: spacing.md,
    },
    itemSubtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    pendingBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: 999,
    },
    pendingText: {
        fontSize: 12,
        fontFamily: "Inter-Bold",
    },
});