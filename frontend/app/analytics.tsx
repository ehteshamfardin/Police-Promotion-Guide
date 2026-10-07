import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card } from "@/src/components/Card";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { OFFICER, SUBJECT_ACCURACY, WEEKLY_ANALYTICS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function Analytics() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const totalQuestions = WEEKLY_ANALYTICS.reduce((a, d) => a + d.questions, 0);
  const avgAccuracy = Math.round(WEEKLY_ANALYTICS.reduce((a, d) => a + d.accuracy, 0) / WEEKLY_ANALYTICS.length);
  const best = Math.max(...WEEKLY_ANALYTICS.map((d) => d.accuracy));

  return (
    <View testID="analytics-screen" style={styles.container}>
      <Header title="প্রোগ্রেস অ্যানালিটিক্স" subtitle="আপনার প্রস্তুতির বিস্তারিত বিশ্লেষণ" />
      <Screen bottomPad={insets.bottom + 24}>
        {/* Streak hero */}
        <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.streakCard}>
          <Icon name="fire" size={40} color={colors.onBrandPrimary} />
          <View style={styles.streakText}>
            <Text style={styles.streakValue}>{bn(OFFICER.streakDays)} দিনের স্ট্রিক!</Text>
            <Text style={styles.streakSub}>সর্বোচ্চ স্ট্রিক: {bn(18)} দিন · চালিয়ে যান!</Text>
          </View>
        </LinearGradient>

        {/* Weekly chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>সাপ্তাহিক নির্ভুলতা</Text>
          <Card style={styles.chartCard}>
            <View style={styles.chart}>
              {WEEKLY_ANALYTICS.map((d) => (
                <View key={d.day} style={styles.barCol}>
                  <Text style={styles.barValue}>{bn(d.accuracy)}</Text>
                  <View style={styles.barTrack}>
                    <View
                      testID={`analytics-bar-${d.day}`}
                      style={[
                        styles.bar,
                        { height: Math.max(8, Math.round((d.accuracy / 100) * 120)) },
                        d.accuracy === best && { backgroundColor: colors.brandPrimary },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{d.day}</Text>
                </View>
              ))}
            </View>
          </Card>
          <View style={styles.weekStats}>
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{bn(totalQuestions)}</Text>
              <Text style={styles.weekStatLabel}>মোট প্রশ্ন</Text>
            </View>
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{bn(avgAccuracy)}%</Text>
              <Text style={styles.weekStatLabel}>গড় নির্ভুলতা</Text>
            </View>
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{bn(OFFICER.testsTaken)}</Text>
              <Text style={styles.weekStatLabel}>মোট টেস্ট</Text>
            </View>
          </View>
        </View>

        {/* Subject accuracy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>বিষয়ভিত্তিক শক্তি-দুর্বলতা</Text>
          <Card style={styles.barsCard}>
            {SUBJECT_ACCURACY.map((row) => {
              const weak = row.pct < 50;
              return (
                <View key={row.subject} style={styles.barRow}>
                  <Text style={styles.barRowLabel} numberOfLines={1}>
                    {row.subject}
                  </Text>
                  <View style={styles.barTrackH}>
                    <View
                      style={[
                        styles.barH,
                        {
                          width: `${row.pct}%`,
                          backgroundColor: weak ? colors.error : row.pct < 70 ? colors.warning : colors.success,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.barRowPct, { color: weak ? colors.error : colors.onSurfaceTertiary }]}>
                    {bn(row.pct)}%
                  </Text>
                </View>
              );
            })}
          </Card>
        </View>

        {/* Recommendation */}
        <View style={styles.recommendation} testID="analytics-recommendation">
          <Icon name="lightbulb-on-outline" size={22} color={colors.brandPrimary} />
          <View style={styles.recommendationText}>
            <Text style={styles.recommendationTitle}>স্টাডি পরামর্শ</Text>
            <Text style={styles.recommendationBody}>
              সাক্ষ্য আইন আপনার দুর্বলতম বিষয় ({bn(41)}%)। আগামী সপ্তাহে প্রতিদিন ২০টি সাক্ষ্য আইনের এমসিকিউ অনুশীলন করুন — লক্ষ্য ৬০%+ নির্ভুলতা।
            </Text>
          </View>
        </View>
      </Screen>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  streakCard: {
    borderRadius: radius.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginHorizontal: spacing.lg,
    padding: spacing.xl,
  },
  streakText: {
    flex: 1,
    gap: 2,
  },
  streakValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onBrandPrimary,
  },
  streakSub: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onBrandPrimary,
    opacity: 0.85,
  },
  section: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  chartCard: {
    paddingVertical: spacing.xl,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  barValue: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  barTrack: {
    height: 120,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  bar: {
    width: "60%",
    borderRadius: radius.sm,
    backgroundColor: colors.brandSecondary,
  },
  barLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  weekStats: {
    flexDirection: "row",
    gap: spacing.md,
  },
  weekStat: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: "center",
    gap: 2,
    paddingVertical: spacing.md,
  },
  weekStatValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  weekStatLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  barsCard: {
    gap: spacing.lg,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  barRowLabel: {
    width: 110,
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
    flexShrink: 0,
  },
  barTrackH: {
    flex: 1,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
    overflow: "hidden",
  },
  barH: {
    height: 10,
    borderRadius: radius.pill,
  },
  barRowPct: {
    width: 40,
    textAlign: "right",
    fontFamily: fonts.semiBold,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
  },
  recommendation: {
    flexDirection: "row",
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.brandTertiary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.35)",
    padding: spacing.lg,
  },
  recommendationText: {
    flex: 1,
    gap: spacing.xs,
  },
  recommendationTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.brandPrimary,
  },
  recommendationBody: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
}));