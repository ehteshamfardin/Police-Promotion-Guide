import { useEffect, useMemo, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { Icon } from "@/src/components/Icon";
import { LoadingSkeleton } from "@/src/components/LoadingSkeleton";
import { ProgressBar } from "@/src/components/ProgressBar";
import { SubjectCard } from "@/src/components/SubjectCard";
import { TestCard } from "@/src/components/TestCard";
import { usesNativeTabs } from "@/src/navigation";
import { MOCK_TESTS, NOTIFICATIONS, OFFICER, SUBJECTS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const QUICK_ACTIONS = [
  { label: "MCQ অনুশীলন", icon: "help-circle-outline", tint: "info", route: "/mcq-practice" },
  { label: "মডেল টেস্ট", icon: "timer-outline", tint: "brandPrimary", route: "/mock-tests" },
  { label: "প্রশ্ন ব্যাংক", icon: "database-outline", tint: "success", route: "/bank" },
  { label: "গুরুত্বপূর্ণ নোট", icon: "notebook-outline", tint: "warning", route: "/notes" },
  { label: "পূর্ববর্তী প্রশ্ন", icon: "history", tint: "info", route: "/papers" },
  { label: "AI প্রশ্ন", icon: "robot-outline", tint: "brandPrimary", route: "/ai-question" },
  { label: "ভুল প্রশ্ন", icon: "close-circle-outline", tint: "error", route: "/wrong-answers" },
  { label: "বুকমার্ক", icon: "bookmark-outline", tint: "success", route: "/bookmarks" },
];

export default function Home() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const styles = useStyles();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  };

  const unread = useMemo(() => NOTIFICATIONS.filter((n) => n.unread).length, []);

  const rows: (typeof QUICK_ACTIONS)[] = [
    QUICK_ACTIONS.slice(0, 4),
    QUICK_ACTIONS.slice(4, 8),
  ];

  return (
    <View testID="home-screen" style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.logoSmall}>
          <Icon name="shield-half-full" size={22} color={colors.onBrandPrimary} />
        </LinearGradient>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>আসসালামু আলাইকুম</Text>
          <Text style={styles.name} numberOfLines={1}>
            {OFFICER.name}
          </Text>
        </View>
        <Pressable
          testID="home-notifications-button"
          onPress={() => router.push("/notifications")}
          style={styles.bellBtn}
          hitSlop={4}
        >
          <Icon name="bell-outline" size={24} color={colors.onSurface} />
          {unread > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{bn(unread)}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomChrome + spacing.xxl }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.brandPrimary}
            colors={[colors.brandPrimary]}
            progressBackgroundColor={colors.surfaceSecondary}
          />
        }
      >
        {/* Welcome / exam countdown card */}
        <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.welcomeCard}>
          <View style={styles.welcomeTextWrap}>
            <Text style={styles.welcomeBadge}>প্রমোশন পরীক্ষা</Text>
            <Text style={styles.welcomeTitle}>আর মাত্র {bn(OFFICER.examCountdownDays)} দিন বাকি!</Text>
            <Text style={styles.welcomeSub}>পরীক্ষার তারিখ: {OFFICER.examDate}</Text>
          </View>
          <Pressable
            testID="home-exam-review-button"
            style={styles.welcomeCta}
            onPress={() => router.push("/analytics")}
          >
            <Text style={styles.welcomeCtaText}>প্রস্তুতি দেখুন</Text>
            <Icon name="arrow-right" size={16} color={colors.onBrandPrimary} />
          </Pressable>
        </LinearGradient>

        {loading ? (
          <View style={styles.section}>
            <LoadingSkeleton rows={4} testID="home-loading-skeleton" />
          </View>
        ) : (
          <>
            {/* Daily progress */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>আজকের প্রগতি</Text>
                <Text style={styles.sectionAction}>লক্ষ্য: {bn(50)} প্রশ্ন</Text>
              </View>
              <Card>
                <ProgressBar progress={0.65} showPercent style={styles.goalBar} testID="home-daily-progress-bar" />
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <Icon name="fire" size={18} color={colors.warning} />
                    <Text style={styles.statValue}>{bn(OFFICER.streakDays)} দিন</Text>
                    <Text style={styles.statLabel}>স্ট্রিক</Text>
                  </View>
                  <View style={[styles.statItem, styles.statDivider]}>
                    <Icon name="star" size={18} color={colors.brandPrimary} />
                    <Text style={styles.statValue}>{bn("8,450")}</Text>
                    <Text style={styles.statLabel}>পয়েন্ট</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Icon name="clipboard-check-outline" size={18} color={colors.success} />
                    <Text style={styles.statValue}>{bn(OFFICER.testsTaken)}</Text>
                    <Text style={styles.statLabel}>টেস্ট</Text>
                  </View>
                </View>
              </Card>
            </View>

            {/* Quick actions */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>কুইক অ্যাকশন</Text>
              </View>
              <View style={styles.grid}>
                {rows.map((row, ri) => (
                  <View key={ri} style={styles.gridRow}>
                    {row.map((action) => {
                      const tint = (colors as Record<string, string>)[action.tint];
                      return (
                        <Pressable
                          key={action.route + action.label}
                          testID={`quick-action-${action.route.replace("/", "")}`}
                          style={({ pressed }) => [styles.quickItem, pressed && { opacity: 0.7 }]}
                          onPress={() => router.push(action.route as never)}
                        >
                          <View style={[styles.quickIcon, { backgroundColor: `${tint}1F` }]}>
                            <Icon name={action.icon} size={22} color={tint} />
                          </View>
                          <Text style={styles.quickLabel} numberOfLines={2}>
                            {action.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            {/* Subjects */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>বিষয়সমূহ</Text>
                <Pressable testID="home-subjects-see-all" onPress={() => router.push("/subjects")}>
                  <Text style={styles.sectionAction}>সব দেখুন</Text>
                </Pressable>
              </View>
              <View style={styles.subjectList}>
                {SUBJECTS.slice(0, 3).map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onPress={() => router.push(`/subject-details?id=${subject.id}`)}
                    testID={`home-subject-card-${subject.id}`}
                  />
                ))}
              </View>
            </View>

            {/* Continue learning */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>চালিয়ে যান</Text>
              </View>
              <Card style={styles.continueCard}>
                <View style={[styles.continueIcon, { backgroundColor: `${colors.brand}22` }]}>
                  <Icon name="gavel" size={24} color={colors.brand} />
                </View>
                <View style={styles.continueText}>
                  <Text style={styles.continueTitle}>দণ্ডবিধি — অধ্যায় ৩</Text>
                  <Text style={styles.continueSub}>মানবদেহ সংক্রান্ত অপরাধ</Text>
                  <ProgressBar progress={0.58} color={colors.brand} showPercent style={styles.continueBar} />
                </View>
                <Button
                  title="চালিয়ে যান"
                  size="sm"
                  onPress={() => router.push("/mcq-practice?subject=penal-code")}
                  testID="home-continue-learning-button"
                />
              </Card>
            </View>

            {/* Recommended tests */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>প্রস্তাবিত টেস্ট</Text>
                <Pressable testID="home-tests-see-all" onPress={() => router.push("/mock-tests")}>
                  <Text style={styles.sectionAction}>সব দেখুন</Text>
                </Pressable>
              </View>
              <View style={styles.subjectList}>
                <TestCard test={MOCK_TESTS[0]} onPress={() => router.push("/mock-instructions?id=mt-1")} testID="home-test-card-0" />
                <TestCard test={MOCK_TESTS[4]} onPress={() => router.push("/mock-instructions?id=mt-5")} testID="home-test-card-4" />
              </View>
            </View>

            {/* Premium promotion */}
            <Pressable testID="home-premium-banner" onPress={() => router.push("/premium")} style={styles.premiumWrap}>
              <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.premiumCard}>
                <View style={styles.premiumIconWrap}>
                  <Icon name="crown" size={28} color={colors.onBrandPrimary} />
                </View>
                <View style={styles.premiumText}>
                  <Text style={styles.premiumTitle}>প্রিমিয়াম আনলক করুন</Text>
                  <Text style={styles.premiumSub}>আনলিমিটেড মক টেস্ট, মাস্টার নোটস ও এআই সহকারী</Text>
                </View>
                <Icon name="chevron-right" size={24} color={colors.onBrandPrimary} />
              </LinearGradient>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  logoSmall: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    color: colors.onError,
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xl,
  },
  welcomeCard: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  welcomeTextWrap: {
    gap: spacing.xs,
  },
  welcomeBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.onBrandPrimary,
    color: colors.brandPrimary,
    fontFamily: fonts.semiBold,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    borderRadius: radius.pill,
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  welcomeTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onBrandPrimary,
  },
  welcomeSub: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onBrandPrimary,
    opacity: 0.85,
  },
  welcomeCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.onBrandPrimary,
    borderRadius: radius.md,
    height: 48,
  },
  welcomeCtaText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.brandPrimary,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  sectionAction: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.brandSecondary,
  },
  goalBar: {
    marginBottom: spacing.lg,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.divider,
  },
  statValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurface,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  grid: {
    gap: spacing.md,
  },
  gridRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  quickItem: {
    flex: 1,
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    minHeight: 92,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
    textAlign: "center",
  },
  subjectList: {
    gap: spacing.md,
  },
  continueCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  continueIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    flex: 1,
    gap: spacing.xs,
  },
  continueTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  continueSub: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  continueBar: {
    marginTop: spacing.xs,
  },
  premiumWrap: {
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  premiumCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.xl,
  },
  premiumIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.onBrandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  premiumText: {
    flex: 1,
    gap: 2,
  },
  premiumTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onBrandPrimary,
  },
  premiumSub: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onBrandPrimary,
    opacity: 0.85,
  },
}));