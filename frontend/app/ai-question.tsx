import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { useToast } from "@/src/components/Toast";
import { SUBJECTS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const DIFFICULTIES = ["সহজ", "মাধ্যম", "কঠিন"];

export default function AiQuestion() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const toast = useToast();
  const styles = useStyles();

  const [topics, setTopics] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState("মাধ্যম");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggleTopic = (t: string) =>
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const generate = () => {
    if (topics.length === 0) {
      toast.show("অন্তত একটি বিষয় নির্বাচন করুন", "error");
      return;
    }
    setGenerating(true);
    toast.show("এআই প্রশ্ন তৈরি করছে... (ডেমো)");
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  return (
    <View testID="ai-question-screen" style={styles.container}>
      <Header title="এআই প্রশ্ন জেনারেটর" subtitle="নিজের পছন্দমতো কাস্টম কুইজ তৈরি করুন" />
      <Screen bottomPad={insets.bottom + 24}>
        {generated ? (
          <EmptyState
            icon="robot-outline"
            title="এআই ফিচার শীঘ্রই আসছে!"
            subtitle={`${topics.length}টি বিষয়ে ${bn(count)}টি ${difficulty} প্রশ্নের সেট প্রিমিয়াম লঞ্চের পর পাওয়া যাবে।`}
            actionTitle="নতুন সেট তৈরি করুন"
            onAction={() => setGenerated(false)}
            testID="ai-question-generated-state"
          />
        ) : (
          <>
            {/* Topics */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>বিষয় নির্বাচন করুন</Text>
              <View style={styles.chipWrap}>
                {SUBJECTS.map((s) => {
                  const selected = topics.includes(s.title);
                  return (
                    <Pressable
                      key={s.id}
                      testID={`ai-question-topic-${s.id}`}
                      onPress={() => toggleTopic(s.title)}
                      style={[styles.chip, selected && { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary }]}
                    >
                      <Text style={[styles.chipText, selected && { color: colors.onBrandPrimary }]}>{s.title}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Count stepper */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>প্রশ্ন সংখ্যা</Text>
              <Card style={styles.stepperCard}>
                <Pressable
                  testID="ai-question-count-decrease"
                  onPress={() => setCount((c) => Math.max(5, c - 5))}
                  style={styles.stepperBtn}
                >
                  <Icon name="minus" size={22} color={colors.onSurface} />
                </Pressable>
                <Text style={styles.stepperValue} testID="ai-question-count-value">
                  {bn(count)}টি প্রশ্ন
                </Text>
                <Pressable
                  testID="ai-question-count-increase"
                  onPress={() => setCount((c) => Math.min(50, c + 5))}
                  style={styles.stepperBtn}
                >
                  <Icon name="plus" size={22} color={colors.onSurface} />
                </Pressable>
              </Card>
            </View>

            {/* Difficulty */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>কাঠামো</Text>
              <View style={styles.chipWrap}>
                {DIFFICULTIES.map((d) => {
                  const selected = d === difficulty;
                  return (
                    <Pressable
                      key={d}
                      testID={`ai-question-difficulty-${d}`}
                      onPress={() => setDifficulty(d)}
                      style={[styles.chip, selected && { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary }]}
                    >
                      <Text style={[styles.chipText, selected && { color: colors.onBrandPrimary }]}>{d}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <Button
              title="এআই প্রশ্ন তৈরি করুন"
              size="lg"
              icon="robot-outline"
              loading={generating}
              onPress={generate}
              testID="ai-question-generate-button"
            />
          </>
        )}
      </Screen>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  section: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    flexShrink: 0,
    height: 40,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
  stepperCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },
  stepperBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
}));