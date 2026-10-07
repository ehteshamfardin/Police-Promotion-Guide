import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { ProgressBar } from "@/src/components/ProgressBar";
import { Screen } from "@/src/components/Screen";
import { SUBJECT_ACCURACY, bn, formatTime } from "@/src/data/demo";
import { getMockTestResult } from "@/src/data/session";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function MockResult() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const result = getMockTestResult();

  if (!result) {
    return (
      <View style={styles.container}>
        <Header title="স্কোরকার্ড" />
        <EmptyState
          icon="chart-bar"
          title="কোনো ফলাফল নেই"
          subtitle="প্রথমে একটি মক টেস্ট সম্পন্ন করুন"
          actionTitle="মক টেস্ট দিন"
          onAction={() => router.replace("/mock-tests")}
          testID="mock-result-empty-state"
        />
      </View>
    );
  }

  const total = result.questions.length;
  const correct = result.answers.filter((a, i) => a !== null && a === result.questions[i].correctIndex).length;
  const pct = Math.round((correct / total) * 100);
  const percentile = Math.max(5, 100 - Math.round(pct / 5));

  return (
    <View testID="mock-result-screen" style={styles.container}>
      <Header title="স্কোরকার্ড" subtitle={result.testTitle} />
      <Screen bottomPad={insets.bottom + 16}>
        {/* Score */}
        <Card style={styles.scoreCard} testID="mock-result-score-card">
          <View style={[styles.scoreBadge, { backgroundColor: pct >= 60 ? colors.successTertiary : colors.errorTertiary }]}>
            <Text style={[styles.scoreValue, { color: pct >= 60 ? colors.success : colors.error }]}>{bn(pct)}%</Text>
          </View>
          <Text style={styles.scoreMeta}>
            {bn(correct)}/{bn(total)} প্রশ্নে সঠিক · সময় নেওয়া হয়েছে {formatTime(result.timeSpentSec)}
          </Text>
        </Card>

        {/* Rank analysis */}
        <Card style={styles.rankCard} testID="mock-result-rank-card">
          <View style={styles.rankHead}>
            <Icon name="trophy-outline" size={22} color={colors.brandPrimary} />
            <Text style={styles.rankTitle}>র‍্যাংক বিশ্লেষণ</Text>
          </View>
          <Text style={styles.rankValue}>
            আপনার অবস্থান {bn(42)}/{bn("1,248")}
          </Text>
          <ProgressBar progress={percentile / 100} color={colors.brandPrimary} style={styles.rankBar} />
          <Text style={styles.rankSub}>আপনি {bn(percentile)}তম শতকরা অংশীদারের চেয়ে এগিয়ে</Text>
        </Card>

        {/* Subject accuracy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>বিষয়ভিত্তিক নির্ভুলতা</Text>
          <Card style={styles.barsCard}>
            {SUBJECT_ACCURACY.slice(0, 3).map((row) => (
              <View key={row.subject} style={styles.barRow}>
                <Text style={styles.barLabel} numberOfLines={1}>
                  {row.subject}
                </Text>
                <ProgressBar progress={row.pct / 100} showPercent style={styles.bar} />
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.actions}>
          <Button title="ভুল উত্তর দেখুন" icon="close-circle-outline" variant="secondary" onPress={() => router.push("/wrong-answers")} testID="mock-result-wrong-button" />
          <Button title="হোমে ফিরুন" variant="outline" icon="home-outline" onPress={() => router.replace("/home")} testID="mock-result-home-button" />
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
  scoreCard: {
    marginHorizontal: spacing.lg,
    alignItems: "center",
    gap: spacing.md,
  },
  scoreBadge: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
  },
  scoreMeta: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
    textAlign: "center",
  },
  rankCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  rankHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rankTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  rankValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.brandPrimary,
  },
  rankBar: {},
  rankSub: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
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
  barsCard: {
    gap: spacing.lg,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  barLabel: {
    width: 110,
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
    flexShrink: 0,
  },
  bar: {
    flex: 1,
  },
  actions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.xl,
  },
}));