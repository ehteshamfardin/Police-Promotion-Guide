import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { WRONG_ANSWERS } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function WrongAnswers() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  if (WRONG_ANSWERS.length === 0) {
    return (
      <View style={styles.container}>
        <Header title="ভুল প্রশ্ন" />
        <EmptyState
          icon="emoticon-happy-outline"
          title="দারুণ! কোনো ভুল উত্তর নেই"
          subtitle="অনুশীলন চালিয়ে যান — ভুল উত্তর এখানে জমা হবে"
          actionTitle="অনুশীলন শুরু করুন"
          onAction={() => router.push("/mcq-practice")}
          testID="wrong-answers-empty-state"
        />
      </View>
    );
  }

  return (
    <View testID="wrong-answers-screen" style={styles.container}>
      <Header title="ভুল প্রশ্ন" subtitle={`${WRONG_ANSWERS.length}টি ভুল উত্তরের রিভিউ লগ`} />
      <Screen bottomPad={insets.bottom + 24}>
        <View style={styles.list}>
          {WRONG_ANSWERS.map((w) => (
            <Card key={w.id} testID={`wrong-answer-card-${w.id}`} style={styles.card}>
              <View style={styles.subjectRow}>
                <View style={styles.subjectChip}>
                  <Text style={styles.subjectText}>{w.subject}</Text>
                </View>
                <Text style={styles.date}>{w.date}</Text>
              </View>
              <Text style={styles.question}>{w.question}</Text>

              <View style={styles.answerRow}>
                <Icon name="close-circle" size={18} color={colors.error} />
                <Text style={styles.answerText}>
                  আপনার উত্তর: <Text style={styles.wrongText}>{w.yourAnswer}</Text>
                </Text>
              </View>
              <View style={styles.answerRow}>
                <Icon name="check-circle" size={18} color={colors.success} />
                <Text style={styles.answerText}>
                  সঠিক উত্তর: <Text style={styles.correctText}>{w.correctAnswer}</Text>
                </Text>
              </View>

              <View style={styles.explanation}>
                <Icon name="lightbulb-on-outline" size={16} color={colors.brandPrimary} />
                <Text style={styles.explanationText}>{w.explanation}</Text>
              </View>
            </Card>
          ))}
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
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  card: {
    gap: spacing.md,
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subjectChip: {
    backgroundColor: colors.errorTertiary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  subjectText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.error,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  question: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  answerText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
  wrongText: {
    fontFamily: fonts.semiBold,
    color: colors.error,
  },
  correctText: {
    fontFamily: fonts.semiBold,
    color: colors.success,
  },
  explanation: {
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: colors.brandTertiary,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  explanationText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
}));