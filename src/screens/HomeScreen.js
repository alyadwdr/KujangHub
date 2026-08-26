import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Easing, Dimensions } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { useRequests } from '../context/RequestsContext';
import dummyApps from '../data/dummyApps';
import dummyUser from '../data/dummyUser';
import { formatTimeHome } from '../utils/formatDate';
import LoadingState from '../components/LoadingState';

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation, route }) {
    const { pendingRequests, isLoading } = useRequests();
    
    const appCountsMap = {};
    pendingRequests.forEach((item) => {
        if (!appCountsMap[item.sourceApp]) {
            appCountsMap[item.sourceApp]= { name: item.sourceApp, color: item.badgeColor, count: 0 };
        }
        appCountsMap[item.sourceApp].count += 1;
    });
    const appCounts = Object.values(appCountsMap).sort((a, b) => b.count - a.count);

    const topApps = appCounts.slice(0, 3);
    const restApps = appCounts.slice(3);
    const restCount = restApps.reduce((sum, app) => sum + app.count, 0);

    const segmentBarScale = useRef(new Animated.Value(0)).current;
    const [segmentBarWidth, setSegmentBarWidth] = useState(0);
    const hasAnimatedBar = useRef(false);

    const handleSegmentBarLayout = (e) => {
        const width = e.nativeEvent.layout.width;
        setSegmentBarWidth(width);

        if (!hasAnimatedBar.current && width > 0) {
            hasAnimatedBar.current = true;
            segmentBarScale.setValue(0);
            Animated.timing(segmentBarScale, {
                toValue: 1,
                duration: 1400,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start();
        }
    };

    const [showBellIntro, setShowBellIntro] = useState(route.params?.playBellIntro === true);

    const introX =useRef(new Animated.Value(-(width / 2 - 40))).current;
    const introY = useRef(new Animated.Value(height / 2 - 60)).current;
    const introScale = useRef(new Animated.Value(3.2)).current;

    useEffect(() => {
        if (!showBellIntro) return;

        Animated.parallel([
            Animated.timing(introX, {
                toValue: 0,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(introY, {
                toValue: 0,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(introScale, {
                toValue: 1,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowBellIntro(false);
            navigation.setParams({ playBellIntro: undefined });
        });
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[typography.h1, { color: colors.primary }]}>Kujang Hub</Text>
                <Image
                    source={require("../assets/images/bell-icon.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                />
                {showBellIntro && (
                    <Animated.Image
                        source={require("../assets/images/bell-icon.png")}
                        style={[
                            styles.bellIntroOverlay,
                            {
                                transform: [
                                    {translateX: introX },
                                    { translateY: introY },
                                    { scale: introScale },
                                ],
                            },
                        ]}
                        resizeMode="contain"
                    />
                )}
            </View>

            {/* Greeting */}
            <Text style={styles.greeting}>
                Halo, <Text style={{ fontFamily: "Inter-Bold" }}>{dummyUser.name}</Text>
            </Text>
            <View style={styles.divider} />

            {isLoading ? (
                <LoadingState message="Loading..." />
            ) : (
                <>
                {/* Aplikasi Terintegrasi */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={typography.h2}>Aplikasi Terintegrasi</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("PendingPerApp")}>
                            <Text style={styles.lihatSemua}>Lihat Semua &gt;</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Animated.View
                        onLayout={handleSegmentBarLayout}
                        style={[
                            styles.segmentBar,
                            segmentBarWidth > 0 && {
                                transform: [
                                    { translateX: -segmentBarWidth / 2 },
                                    { scaleX: segmentBarScale },
                                    { translateX: segmentBarWidth / 2},
                                ],
                            },
                        ]}
                    >
                        {topApps.map((app) => (
                            <View
                                key={app.name}
                                style={[styles.segment, { flex: app.count, backgroundColor: app.color}]}
                            />
                        ))}
                        {restCount > 0 && (
                            <View style={[styles.segment, { flex: restCount, backgroundColor: colors.textSecondary }]} />
                        )}
                    </Animated.View>

                    <View style={styles.dotsRow}>
                        {topApps.map((app) => (
                            <View key={app.name} style={styles.dotItem}>
                                <View style={[styles.dot, { backgroundColor: app.color }]} />
                                <Text style={typography.small}>{app.name}</Text>
                                <Text style={[typography.small, { fontFamily: "Inter-Bold" }]}> {app.count}</Text>
                            </View>
                        ))}
                        {restCount > 0 && (
                            <View style={styles.dotItem}>
                                <View style={[styles.dot, { backgroundColor: colors.textSecondary }]} />
                                <Text style={typography.small}>DLL</Text>
                                <Text style={[typography.small, { fontFamily: "Inter-Bold" }]}> {restCount}</Text>
                            </View>
                        )}
                </View>
            </View>

            {/* Request Terbaru */}
            <View style={styles.card}>
                <Text style={[typography.h2, { marginBottom: spacing.sm }]}>
                    {pendingRequests.length} request terbaru
                </Text>
                {pendingRequests.length === 0 ? (
                    <Text style={styles.emptyText}>Tidak ada request</Text>
                ) : (
                    pendingRequests.slice(0, 5).map((item, index) => (
                    <View
                        key={item.id}
                        style={[styles.requestRow, index > 0 && styles.requestRowDivider]}
                    >
                        <View style={styles.avatar}>
                            <Image
                                source={dummyApps.find((app) => app.matchKey === item.sourceApp)?.logo}
                                style={styles.avatarLogo}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: spacing.sm }}>
                            <Text style={typography.body} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text style={[typography.small, { color: colors.textSecondary }]}>
                                {item.sourceApp} | {formatTimeHome(item.date)}
                            </Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.prosesButton}
                            onPress={() => navigation.navigate("DetailRequest", { requestId: item.id })}
                        >
                            <Text style={{ color: colors.primary, fontFamily: "Inter-Bold" }}>Proses</Text>
                        </TouchableOpacity>
                    </View>
                    ))
                )}
            </View>
            </>
            )}
        </ScrollView>
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
        zIndex: 99,
        elevation: 99,
    },
    bellIcon: {
        width: 28,
        height: 28,
    },
    bellIntroOverlay: {
        position: "absolute",
        top: 5,
        right: 0,
        width: 28,
        height: 28,
        zIndex: 999,
        elevation: 999,
    },
    greeting: {
        color: colors.textSecondary, 
        marginTop: spacing.sm,
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginTop: spacing.md,
        marginBottom: spacing.md,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    cardHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    lihatSemua: {
        color: colors.primary,
        fontFamily: "Inter-Bold",
        fontSize: 12,
    },
    segmentBar: {
        flexDirection: "row",
        height: 4,
        borderRadius: 2,
        overflow: "hidden",
        marginTop: spacing.sm,
    },
    segment: {
        height: 4,
    },
    dotsRow: {
        flexDirection: 'row',
        marginTop: spacing.sm,
        gap: spacing.md,
        flexWrap: "wrap",
    },
    dotItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    requestRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    requestRowDivider: {
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
    },
    avatar: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarLogo: {
        width: 32,
        height: 32,
    },
    avatarText: {
        color: colors.white,
        fontFamily: "Inter-Bold",
    },
    prosesButton: {
        backgroundColor: `${colors.primary}22`,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: 8,
    },
    emptyText: {
        textAlign: "center",
        color: colors.textSecondary,
        paddingVertical: spacing.md,
    },
});