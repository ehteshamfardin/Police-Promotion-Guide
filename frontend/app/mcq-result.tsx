import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { bn, formatTime } from "@/src/data/demo";
import { getPracticeResult } from "@/src/data/session";
import { fonts, lh, makeStyles, spacing, typeScale, useTheme } from "@/src/theme";

export default function McqResult() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const result = getPracticeResult();

  if (!result) {
    return (
      <View style={styles.container}>
        <Header title="ফলাফল" />
        <EmptyState
          icon="chart-bar"
          title="কোনো ফলাফল নেই"
          subtitle="প্রথমে একটি অনুশীলন সম্পন্ন করুন"
          actionTitle="অনুশীলন শুরু করুন"
          onAction={() => router.replace("/mcq-practice")}
          testID="mcq-result-empty-state"
        />
      </View>
    );
  }

  const total = result.questions.length;
  const correct = result.answers.filter((a, i) => a !== null && a === result.questions[i].correctIndex).length;
  const wrong = result.answers.filter((a, i) => a !== null && a !== result.questions[i].correctIndex).length;
  const skipped = total - correct - wrong;
  const pct = Math.round((correct / total) * 100);
  const R = 52;
  const CIRC = 2 * Math.PI * R;

  return (
    <View testID="mcq-result-screen" style={styles.container}>
      <Header title="অনুশীলনের ফলাফল" subtitle={result.title} />
      <Screen bottomPad={insets.bottom + 16}>
        {/* Score gauge */}
        <Card style={styles.gaugeCard} testID="mcq-result-score-card">
          <View style={styles.gaugeWrap}>
            <Svg width={132} height={132}>
              <Circle cx={66} cy={66} r={R} stroke={colors.surfaceTertiary} strokeWidth={12} fill="none" />
              <Circle
                cx={66}
                cy={66}
                r={R}
                stroke={pct >= 60 ? colors.success : pct >= 40 ? colors.warning : colors.error}
                strokeWidth={12}
                fill="none"
                strokeDasharray={`${(CIRC * pct) / 100} ${CIRC}`}
                strokeLinecap="round"
                transform="rotate(-90 66 66)"
              />
            </Svg>
            <View style={styles.gaugeCenter}>
              <Text style={styles.gaugeValue}>{bn(pct)}%</Text>
              <Text style={styles.gaugeLabel}>স্কোর</Text>
            </View>
          </View>
          <View style={styles.metricRow}>
            <View style={styles.metric}>
              <Icon name="check-circle" size={20} color={colors.success} />
              <Text style={styles.metricValue}>{bn(correct)}</Text>
              <Text style={styles.metricLabel}>সঠিক</Text>
            </View>
            <View style={styles.metric}>
              <Icon name="close-circle" size={20} color={colors.error} />
              <Text style={styles.metricValue}>{bn(wrong)}</Text>
              <Text style={styles.metricLabel}>ভুল</Text>
            </View>
            <View style={styles.metric}>
              <Icon name="minus-circle-outline" size={20} color={colors.muted} />
              <Text style={styles.metricValue}>{bn(Math.max(0, skipped))}</Text>
              <Text style={styles.metricLabel}>বাদ</Text>
            </View>
            <View style={styles.metric}>
              <Icon name="clock-outline" size={20} color={colors.brandSecondary} />
              <Text style={styles.metricValue}>{formatTime(result.timeSpentSec)}</Text>
              <Text style={styles.metricLabel}>সময়</Text>
            </View>
          </View>
        </Card>

        {/* Review */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>উত্তর পর্যালোচনা</Text>
          {result.questions.map((q, i) => {
            const userAns = result.answers[i];
            const ok = userAns !== null && userAns === q.correctIndex;
            return (
              <Card key={q.id} testID={`mcq-result-review-${q.id}`} style={styles.reviewCard}>
                <View style={styles.reviewHead}>
                  <View
                    style={[
                      styles.reviewIcon,
                      { backgroundColor: ok ? colors.successTertiary : colors.errorTertiary },
                    ]}
                  >
                    <Icon name={ok ? "check" : "close"} size={16} color={ok ? colors.success : colors.error} />
                  </View>
                  <Text style={styles.reviewQuestion} numberOfLines={2}>
                    {bn(i + 1)}. {q.question}
                  </Text>
                </View>
                <Text style={styles.reviewAnswer}>
                  সঠিক উত্তর: <Text style={styles.reviewCorrect}>{q.options[q.correctIndex]}</Text>
                </Text>
              </Card>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Button title="পুনরায় চেষ্টা করুন" icon="refresh" onPress={() => router.replace("/mcq-practice")} testID="mcq-result-retry-button" />
          <Button title="হোমে ফিরুন" variant="outline" icon="home-outline" onPress={() => router.replace("/home")} testID="mcq-result-home-button" />
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
  gaugeCard: {
    marginHorizontal: spacing.lg,
    alignItems: "center",
    gap: spacing.xl,
  },
  gaugeWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeCenter: {
    position: "absolute",
    alignItems: "center",
  },
  gaugeValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onSurface,
  },
  gaugeLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  metricRow: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  metric: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  metricValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  metricLabel: {
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
  reviewCard: {
    gap: spacing.sm,
  },
  reviewHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  reviewIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewQuestion: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurface,
  },
  reviewAnswer: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  reviewCorrect: {
    fontFamily: fonts.semiBold,
    color: colors.success,
  },
  actions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.xl,
  },
}));