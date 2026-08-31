import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated, Dimensions, Easing, LayoutAnimation, Platform, UIManager, Linking } from "react-native";
import { colors, spacing, typography } from "../theme";
import { useRequests } from "../context/RequestsContext";
import ConfirmModal from "../components/ConfirmModal";
import { formatTimeInbox } from "../utils/formatDate";
import Toast from "react-native-toast-message";
import FilterModal from "../components/FilterModal";
import DateRangeModal from "../components/DateRangeModal";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

const SCREEN_WIDTH = Dimensions.get("window").width;
const FILTERS = ["Aplikasi", "Departemen", "Waktu"];

export default function InboxScreen({ navigation }) {
    const { pendingRequests, updateRequestStatus, isLoading, error, retry } = useRequests();
    const [search, setSearch] = useState("");
    const [modalRequest, setModalRequest] = useState(null);

    const [appFilter, setAppFilter] = useState([]);
    const [deptFilter, setDeptFilter] =useState([]);
    const [dateFilter, setDateFilter] = useState(null); 
    const [activeFilterModal, setActiveFilterModal] = useState(null);

    const appOptions = [...new Set(pendingRequests.map((item) => item.sourceApp))];
    const deptOptions = [...new Set (pendingRequests.map((item) => item.requester.dept))];

    const itemAnims = useRef({}).current;
    const getItemAnim = (id) => {
        if (!itemAnims[id]) {
            itemAnims[id] = {
                translateX: new Animated.Value(0),
                opacity: new Animated.Value(1),
            };
        }
        return itemAnims[id];
    };

    const filteredRequests = pendingRequests
        .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
        .filter((item) => appFilter.length === 0 || appFilter.includes(item.sourceApp))
        .filter((item) => deptFilter.length === 0 || deptFilter.includes(item.requester.dept))
        .filter((item) => {
            if (!dateFilter) return true;
            const itemDate = item.date.slice(0, 10);
            return itemDate >= dateFilter.start && itemDate <= dateFilter.end;
        });

    const openModal = (id, type) => setModalRequest({ id, type });
    const closeModal = () => setModalRequest(null);

    const animateAndUpdate = (id, status, note) => {
        const anim = getItemAnim(id);
        
        Animated.timing(anim.translateX, {
            toValue: SCREEN_WIDTH,
            duration: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();

        Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start(async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            delete itemAnims[id];
            
            try {
                await updateRequestStatus(id, status, note);
            } catch (err) {
                Toast.show({ type: "error", text1: err.message || "Gagal memperbarui status" });
                retry();
            }
        });
    };

    const handleConfirm = (note) => {
        if (!modalRequest) return;

        const newStatus = modalRequest.type === "approve" ? "approved" : "rejected";
        animateAndUpdate(modalRequest.id, newStatus, note);
        setModalRequest(null);

        Toast.show({
            type: newStatus === "approved" ? "success" : "error",
            text1: newStatus === "approved" ? "Request disetujui" : "Request ditolak",
        });
    };

    const handleRedirect = (item) => {
        Linking.openURL(item.webviewUrl);
        animateAndUpdate(item.id, "redirected");

        Toast.show({
            type: "info",
            text1: `Diproses di ${item.sourceApp}`,
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[typography.h1, styles.title]}>Inbox</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
            </View>

            {/* Search & Filter */}
            <View style={styles.searchRow}>
                <Image
                    source={require("../assets/images/search-icon.png")}
                    style={styles.searchIcon}
                    resizeMode="contain"
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={search}
                    onChangeText={setSearch}
                />
                
            </View>

            <View style={styles.filterRow}>
                <TouchableOpacity
                    style={[styles.filterChip, appFilter.length > 0 && styles.filterChipActive]}
                    onPress={() => setActiveFilterModal("Aplikasi")}
                >
                    <Text style={[styles.filterText, appFilter.length > 0 && styles.filterTextActive]}>
                        + Aplikasi{appFilter.length > 0 ? ` (${appFilter.length})` : ""}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterChip,deptFilter.length > 0 && styles.filterChipActive]}
                    onPress={() => setActiveFilterModal("Departemen")}
                >
                    <Text style={[styles.filterText, deptFilter.length > 0 && styles.filterTextActive]}>
                        + Departemen{deptFilter.length > 0 ? ` (${deptFilter.length})` : ""}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterChip, dateFilter && styles.filterChipActive]}
                    onPress={() => setActiveFilterModal("Waktu")}
                >
                    <Text style={[styles.filterText, dateFilter && styles.filterTextActive]}>
                        + Waktu
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Request List */}
            {error ? (
                <ErrorState message={error} onRetry={retry} />
            ) : isLoading ? (
                <LoadingState message="Loading..." />
            ) : (
            <FlatList
                data={filteredRequests}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.empty}>Tidak ada request</Text>}
                renderItem={({ item }) => {
                    const anim = getItemAnim(item.id);
                    return (
                        <Animated.View
                            style={{
                                opacity: anim.opacity,
                                transform: [{ translateX: anim.translateX }],
                            }}
                        >
                            <TouchableOpacity
                                style={styles.card}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                            >
                                <View style={styles.cardTopRow}>
                                    <View style={[styles.badge, { backgroundColor: `${item.badgeColor}22` }]}>
                                        <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.sourceApp}</Text>
                                    </View>
                                    <Text style={styles.date}>{formatTimeInbox(item.date)}</Text>
                                </View>

                                <Text style={[typography.body, styles.itemTitle]}>{item.title}</Text>
                                <Text style={styles.itemNote}>{item.note}</Text>

                                <View style={styles.requesterRow}>
                                    <Image
                                        source={require("../assets/images/person-icon.png")}
                                        style={styles.avatar}
                                        resizeMode="cover"
                                    />
                                    <Text style={styles.requesterText}>
                                        {item.requester.name} - Dept. {item.requester.dept}
                                    </Text>
                                </View>

                                {/* Approval Actions */}
                                {item.actionType === "approve_reject" ? (
                                    <View style={styles.actionRow}>
                                        <TouchableOpacity
                                            style={styles.rejectButton}
                                            onPress={() => openModal(item.id, "reject")}
                                        >
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6}}>
                                                <Image
                                                    source={require("../assets/images/x-icon.png")}
                                                    style={{ width: 14, height: 14, tintColor: colors.danger }}
                                                    resizeMode="contain"
                                                />
                                                <Text style={styles.rejectText}>Tolak</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.approveButton}
                                            onPress={() => openModal(item.id, "approve")}
                                        >
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                                <Image
                                                    source={require("../assets/images/check-icon.png")}
                                                    style={{ width: 14, height: 14, tintColor: colors.white }}
                                                    resizeMode="contain"
                                                />
                                                <Text style={styles.approveText}>Setujui</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.redirectButton}
                                        onPress={() => handleRedirect(item)}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                            <Image
                                                source={require("../assets/images/redirect-icon.png")}
                                                style={{ width: 14, height: 14, tintColor: colors.kujangIdBlue }}
                                                resizeMode="contain"
                                            />
                                            <Text style={styles.redirectText}>Proses di {item.sourceApp}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    );
                }}
            />
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                visible={!!modalRequest}
                type={modalRequest?.type}
                onCancel={closeModal}
                onConfirm={handleConfirm}
            />

            <FilterModal
                visible={activeFilterModal === "Aplikasi"}
                title="Filter Aplikasi"
                options={appOptions}
                selected={appFilter}
                onApply={setAppFilter}
                onClose={() => setActiveFilterModal(null)}
            />
            <FilterModal
                visible={activeFilterModal === "Departemen"}
                title="Filter Departemen"
                options={deptOptions}
                selected={deptFilter}
                onApply={setDeptFilter}
                onClose={() =>setActiveFilterModal(null)}
            />
            <DateRangeModal
                visible={activeFilterModal === "Waktu"}
                selectedRange={dateFilter}
                onApply={setDateFilter}
                onClose={() => setActiveFilterModal(null)}
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
    },
    title: {
        color: colors.primary,
    },
    bellIcon: {
        width: 28,
        height: 28,
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        marginHorizontal: spacing.lg,
        marginTop: spacing.lg,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
    },
    searchIcon: { 
        width: 16,
        height: 16,
        marginRight: spacing.sm,
        tintColor: colors.textSecondary
    },
    searchInput: {
        flex: 1,
        paddingVertical: spacing.md,
    },
    filterRow: {
        flexDirection: "row",
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.md,
        marginBottom: spacing.md,
    },
    filterChip: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderStyle: "dashed",
        borderRadius: 8,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
    },
    filterText: {
        fontSize: 12,
        color: colors.primary,
    },
    filterChipActive: {
        backgroundColor: colors.primary,
        borderStyle: "solid",
    },
    filterTextActive: {
        color: colors.white,
    },
    list: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.md,
        gap: spacing.md,
    },
    empty: {
        textAlign: "center",
        color: colors.textSecondary,
        marginTop: spacing.xl,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    cardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: "Inter-Bold",
    },
    date: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    itemTitle: {
        marginTop: spacing.sm,
        fontFamily: "Inter-Bold",
    },
    itemNote: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 5,
    },
    requesterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.sm,
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 999,
        backgroundColor: colors.primary,
    },
    requesterText: {
        fontSize: 14,
        fontFamily: "Inter-Bold",
        marginLeft: spacing.xs,
    },
    actionRow: {
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    rejectButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.danger,
        borderRadius: 8,
        paddingVertical: spacing.sm,
        alignItems: "center",
    },
    rejectText: {
        color: colors.danger,
    },
    approveButton: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: spacing.sm,
        alignItems: "center",
    },
    approveText: {
        color: colors.white,
    },
    redirectButton: {
        borderWidth: 1,
        borderColor: colors.kujangIdBlue,
        backgroundColor: `${colors.kujangIdBlue}15`,
        borderRadius: 8,
        paddingVertical: spacing.sm,
        alignItems: "center",
        marginTop: spacing.md,
    },
    redirectText: {
        color: colors.kujangIdBlue,
    },
});