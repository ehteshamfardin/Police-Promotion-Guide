import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { MOCK_TESTS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const RULES = (durationMin: number, questions: number) => [
  `পরীক্ষার মোট সময় ${bn(durationMin)} মিনিট — টাইমার স্বয়ংক্রিয়ভাবে চলবে`,
  `মোট ${bn(questions)}টি প্রশ্নের উত্তর দিতে হবে`,
  "প্রতিটি সঠিক উত্তরে ১ নম্বর — নেগেটিভ মার্কিং নেই",
  "প্রশ্ন প্যালেট থেকে যেকোনো প্রশ্নে যাওয়া যাবে",
  "সময় শেষ হলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হয়ে যাবে",
];

export default function MockInstructions() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const test = MOCK_TESTS.find((t) => t.id === id);
  const [agreed, setAgreed] = useState(false);

  if (!test) {
    return (
      <View style={styles.container}>
        <Header title="নির্দেশনা" />
        <EmptyState
          icon="alert-circle-outline"
          title="টেস্টটি পাওয়া যায়নি"
          actionTitle="তালিকায় ফিরুন"
          onAction={() => router.replace("/mock-tests")}
          testID="mock-instructions-not-found"
        />
      </View>
    );
  }

  return (
    <View testID="mock-instructions-screen" style={styles.container}>
      <Header title="পরীক্ষার নির্দেশনা" subtitle={test.title} />
      <Screen bottomPad={116}>
        {/* Test summary */}
        <Card style={styles.summaryCard} testID="mock-instructions-summary">
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Icon name="help-circle-outline" size={20} color={colors.brandSecondary} />
              <Text style={styles.summaryValue}>{bn(test.questions)}</Text>
              <Text style={styles.summaryLabel}>প্রশ্ন</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="clock-outline" size={20} color={colors.brandSecondary} />
              <Text style={styles.summaryValue}>{bn(test.durationMin)}</Text>
              <Text style={styles.summaryLabel}>মিনিট</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="star-outline" size={20} color={colors.brandSecondary} />
              <Text style={styles.summaryValue}>{bn(test.marks)}</Text>
              <Text style={styles.summaryLabel}>নম্বর</Text>
            </View>
          </View>
        </Card>

        {/* Rules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>নিয়মাবলী</Text>
          {RULES(test.durationMin, test.questions).map((rule, i) => (
            <View key={i} style={styles.ruleRow}>
              <Icon name="check-decagram-outline" size={20} color={colors.success} />
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>

        {/* Warning */}
        <View style={styles.warning} testID="mock-instructions-warning">
          <Icon name="alert-outline" size={22} color={colors.warning} />
          <Text style={styles.warningText}>
            সতর্কতা: পরীক্ষা চলাকালীন অ্যাপ থেকে বেরিয়ে গেলে সময় চলতে থাকবে। পরীক্ষা একবারেই সম্পন্ন করুন।
          </Text>
        </View>

        {/* Agreement */}
        <Pressable
          testID="mock-instructions-agree-checkbox"
          onPress={() => setAgreed((v) => !v)}
          style={styles.agreeRow}
        >
          <View
            style={[
              styles.checkbox,
              { borderColor: agreed ? colors.brandPrimary : colors.border, backgroundColor: agreed ? colors.brandPrimary : "transparent" },
            ]}
          >
            {agreed ? <Icon name="check" size={18} color={colors.onBrandPrimary} /> : null}
          </View>
          <Text style={styles.agreeText}>আমি সব নিয়মাবলী পড়ে বুঝেছি এবং সম্মত হচ্ছি</Text>
        </Pressable>
      </Screen>

      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Button
          title="পরীক্ষা শুরু করুন"
          size="lg"
          icon="play-circle-outline"
          disabled={!agreed}
          onPress={() => router.replace(`/mock-test?id=${test.id}`)}
          testID="mock-instructions-start-cta"
        />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  summaryCard: {
    marginHorizontal: spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  summaryValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onSurface,
  },
  summaryLabel: {
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
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  ruleText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
  warning: {
    flexDirection: "row",
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.4)",
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  warningText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.warning,
  },
  agreeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  agreeText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurface,
  },
  ctaWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
}));