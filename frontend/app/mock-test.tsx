import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { Modal } from "@/src/components/Modal";
import { OptionButton } from "@/src/components/OptionButton";
import { QuestionCard } from "@/src/components/QuestionCard";
import { MCQ_QUESTIONS, MOCK_TESTS, bn, formatTime } from "@/src/data/demo";
import { setMockTestResult } from "@/src/data/session";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const LETTERS = ["ক", "খ", "গ", "ঘ"];

export default function MockTest() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const test = MOCK_TESTS.find((t) => t.id === id) ?? MOCK_TESTS[0];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(MCQ_QUESTIONS.length).fill(null));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [remaining, setRemaining] = useState(test.durationMin * 60);

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          submit();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = useMemo(() => answers.filter((a) => a !== null).length, [answers]);
  const question = MCQ_QUESTIONS[index];
  const lowTime = remaining <= 300;

  const choose = (option: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = next[index] === option ? null : option;
      return next;
    });
  };

  const submit = () => {
    setConfirmOpen(false);
    setPaletteOpen(false);
    setMockTestResult({
      testId: test.id,
      testTitle: test.title,
      questions: MCQ_QUESTIONS,
      answers,
      timeSpentSec: test.durationMin * 60 - remaining,
    });
    router.replace("/mock-result");
  };

  return (
    <View testID="mock-test-screen" style={styles.container}>
      {/* Exam header */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable testID="mock-test-close-button" onPress={() => setConfirmOpen(true)} style={styles.iconBtn}>
          <Icon name="close" size={24} color={colors.onSurface} />
        </Pressable>
        <View style={styles.topCenter}>
          <Text style={styles.topTitle} numberOfLines={1}>
            {test.title}
          </Text>
          <Text style={styles.topSub}>
            প্রশ্ন {bn(index + 1)}/{bn(MCQ_QUESTIONS.length)} · উত্তরদান {bn(answeredCount)}
          </Text>
        </View>
        <View
          style={[styles.timerChip, { backgroundColor: lowTime ? colors.errorTertiary : colors.infoTertiary }]}
          testID="mock-test-timer"
        >
          <Icon name="clock-outline" size={16} color={lowTime ? colors.error : colors.brandSecondary} />
          <Text style={[styles.timerText, { color: lowTime ? colors.error : colors.brandSecondary }]}>
            {formatTime(remaining)}
          </Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.body}>
        <QuestionCard
          index={index}
          total={MCQ_QUESTIONS.length}
          question={question.question}
          subject={question.subject}
          testID="mock-test-question-card"
        />
        <View style={styles.options}>
          {question.options.map((opt, i) => (
            <OptionButton
              key={i}
              label={opt}
              letter={LETTERS[i]}
              state={answers[index] === i ? "selected" : "idle"}
              onPress={() => choose(i)}
              testID={`mock-test-option-${i}`}
            />
          ))}
        </View>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable
          testID="mock-test-palette-button"
          onPress={() => setPaletteOpen(true)}
          style={styles.paletteBtn}
        >
          <Icon name="view-grid-outline" size={22} color={colors.onSurface} />
          <Text style={styles.paletteText}>প্যালেট</Text>
        </Pressable>
        <View style={styles.navBtns}>
          <Button
            title="পূর্ববর্তী"
            variant="outline"
            onPress={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            testID="mock-test-prev-button"
          />
          {index < MCQ_QUESTIONS.length - 1 ? (
            <Button
              title="পরবর্তী"
              icon="arrow-right"
              onPress={() => setIndex((i) => i + 1)}
              testID="mock-test-next-button"
            />
          ) : (
            <Button title="জমা দিন" icon="check" onPress={() => setConfirmOpen(true)} testID="mock-test-submit-button" />
          )}
        </View>
      </View>

      {/* Question palette */}
      <Modal visible={paletteOpen} onClose={() => setPaletteOpen(false)} title="প্রশ্ন প্যালেট" testID="mock-test-palette-modal">
        <View style={styles.paletteGrid}>
          {MCQ_QUESTIONS.map((_, i) => {
            const answered = answers[i] !== null;
            const current = i === index;
            return (
              <Pressable
                key={i}
                testID={`mock-test-palette-item-${i}`}
                onPress={() => {
                  setIndex(i);
                  setPaletteOpen(false);
                }}
                style={[
                  styles.paletteItem,
                  answered && { backgroundColor: colors.brandSecondary },
                  current && { borderColor: colors.brandPrimary, borderWidth: 2 },
                ]}
              >
                <Text
                  style={[
                    styles.paletteItemText,
                    answered && { color: colors.onInfo },
                  ]}
                >
                  {bn(i + 1)}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.brandSecondary }]} />
            <Text style={styles.legendText}>উত্তরদান</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.surfaceTertiary }]} />
            <Text style={styles.legendText}>বাকি</Text>
          </View>
        </View>
        <Button title="পরীক্ষা জমা দিন" icon="check" onPress={() => setConfirmOpen(true)} testID="mock-test-palette-submit" />
      </Modal>

      {/* Submit confirmation */}
      <Modal visible={confirmOpen} onClose={() => setConfirmOpen(false)} title="জমা দিতে চান?" testID="mock-test-confirm-modal">
        <Text style={styles.confirmText}>
          আপনি {bn(answeredCount)}টি প্রশ্নের উত্তর দিয়েছেন।{" "}
          {MCQ_QUESTIONS.length - answeredCount > 0
            ? `${bn(MCQ_QUESTIONS.length - answeredCount)}টি প্রশ্ন অনুত্তরিত আছে।`
            : "সবগুলো প্রশ্নের উত্তর দেওয়া হয়েছে।"}
        </Text>
        <View style={styles.confirmActions}>
          <Button title="ফিরে যান" variant="outline" onPress={() => setConfirmOpen(false)} testID="mock-test-cancel-submit" />
          <Button title="জমা দিন" icon="check" onPress={submit} testID="mock-test-confirm-submit" />
        </View>
      </Modal>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  topCenter: {
    flex: 1,
  },
  topTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  topSub: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  timerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    height: 36,
  },
  timerText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
  },
  body: {
    flex: 1,
  },
  options: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  paletteBtn: {
    width: 56,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  paletteText: {
    fontFamily: fonts.medium,
    fontSize: 9,
    lineHeight: 14,
    color: colors.onSurfaceTertiary,
  },
  navBtns: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.md,
  },
  paletteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  paletteItem: {
    width: 60,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  paletteItemText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  legendRow: {
    flexDirection: "row",
    gap: spacing.xl,
    marginBottom: spacing.xl,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  confirmText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurfaceTertiary,
    marginBottom: spacing.xl,
  },
  confirmActions: {
    gap: spacing.md,
  },
}));