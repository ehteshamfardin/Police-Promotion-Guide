import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { OptionButton } from "@/src/components/OptionButton";
import { ProgressBar } from "@/src/components/ProgressBar";
import { QuestionCard } from "@/src/components/QuestionCard";
import { Screen } from "@/src/components/Screen";
import { MCQ_QUESTIONS, SUBJECTS, bn, formatTime } from "@/src/data/demo";
import { setPracticeResult } from "@/src/data/session";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const LETTERS = ["ক", "খ", "গ", "ঘ"];

export default function McqPractice() {
  const { subject: subjectId } = useLocalSearchParams<{ subject?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const title = subject ? subject.title : "এমসিকিউ অনুশীলন";

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(MCQ_QUESTIONS.length).fill(null));
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const question = MCQ_QUESTIONS[index];
  const correctCount = useMemo(
    () => answers.filter((a, i) => a !== null && a === MCQ_QUESTIONS[i].correctIndex).length,
    [answers],
  );

  const choose = (option: number) => {
    if (selected !== null) return;
    setSelected(option);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = option;
      return next;
    });
  };

  const next = () => {
    if (index >= MCQ_QUESTIONS.length - 1) {
      setPracticeResult({ title, questions: MCQ_QUESTIONS, answers, timeSpentSec: elapsed });
      router.replace("/mcq-result");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const stateFor = (i: number) => {
    if (selected === null) return "idle" as const;
    if (i === question.correctIndex) return "correct" as const;
    if (i === selected) return "wrong" as const;
    return "idle" as const;
  };

  return (
    <View testID="mcq-practice-screen" style={styles.container}>
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable testID="mcq-practice-close-button" onPress={() => router.back()} style={styles.iconBtn}>
          <Icon name="close" size={24} color={colors.onSurface} />
        </Pressable>
        <View style={styles.topCenter}>
          <ProgressBar
            progress={(index + 1) / MCQ_QUESTIONS.length}
            testID="mcq-practice-progress-bar"
          />
          <Text style={styles.progressText}>
            প্রশ্ন {bn(index + 1)}/{bn(MCQ_QUESTIONS.length)} · সঠিক {bn(correctCount)}
          </Text>
        </View>
        <View style={styles.timerChip}>
          <Icon name="clock-outline" size={16} color={colors.brandSecondary} />
          <Text style={styles.timerText}>{formatTime(elapsed)}</Text>
        </View>
      </View>

      <Screen bottomPad={16}>
        <QuestionCard
          index={index}
          total={MCQ_QUESTIONS.length}
          question={question.question}
          subject={question.subject}
          testID="mcq-practice-question-card"
        />
        <View style={styles.options}>
          {question.options.map((opt, i) => (
            <OptionButton
              key={i}
              label={opt}
              letter={LETTERS[i]}
              state={stateFor(i)}
              onPress={() => choose(i)}
              disabled={selected !== null}
              testID={`mcq-practice-option-${i}`}
            />
          ))}
        </View>
        {selected !== null ? (
          <View style={styles.explanation}>
            <Icon name="lightbulb-on-outline" size={18} color={colors.brandPrimary} />
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        ) : null}
      </Screen>

      {/* Bottom controls */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Button
          title={index === MCQ_QUESTIONS.length - 1 ? "ফলাফল দেখুন" : "পরবর্তী প্রশ্ন"}
          size="lg"
          icon={index === MCQ_QUESTIONS.length - 1 ? "check" : "arrow-right"}
          disabled={selected === null}
          onPress={next}
          testID="mcq-practice-next-button"
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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
    gap: spacing.xs,
  },
  progressText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  timerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.infoTertiary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    height: 36,
  },
  timerText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.brandSecondary,
  },
  options: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  explanation: {
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: colors.brandTertiary,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  explanationText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
}));