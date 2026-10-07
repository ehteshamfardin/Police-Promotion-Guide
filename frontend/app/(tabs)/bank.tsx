import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Input } from "@/src/components/Input";
import { Modal } from "@/src/components/Modal";
import { OptionButton } from "@/src/components/OptionButton";
import { QuestionCard } from "@/src/components/QuestionCard";
import { usesNativeTabs } from "@/src/navigation";
import { BANK_YEARS, MCQ_QUESTIONS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const LETTERS = ["ক", "খ", "গ", "ঘ"];

export default function QuestionBank() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;

  const [query, setQuery] = useState("");
  const [year, setYear] = useState("সব");
  const [bookmarked, setBookmarked] = useState<string[]>(["q2", "q8"]);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      MCQ_QUESTIONS.filter(
        (q) =>
          (year === "সব" || q.year === year) &&
          (query.trim() === "" || q.question.includes(query.trim()) || q.subject.includes(query.trim())),
      ),
    [query, year],
  );

  const active = MCQ_QUESTIONS.find((q) => q.id === openQuestion);

  return (
    <View testID="bank-screen" style={styles.container}>
      <View style={[styles.headerWrap, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.title}>প্রশ্ন ব্যাংক</Text>
        <Text style={styles.subtitle}>সাজানো প্রশ্নাবলী থেকে নির্দিষ্ট প্রশ্ন খুঁজুন</Text>
        <View style={styles.searchWrap}>
          <Input
            icon="magnify"
            placeholder="প্রশ্ন বা বিষয় লিখে খুঁজুন..."
            value={query}
            onChangeText={setQuery}
            testID="bank-search-input"
          />
        </View>
        <View style={styles.chipRow}>
          {BANK_YEARS.map((y) => {
            const selected = y === year;
            return (
              <Pressable
                key={y}
                testID={`bank-year-chip-${y}`}
                onPress={() => setYear(y)}
                style={[styles.chip, selected && { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary }]}
              >
                <Text style={[styles.chipText, selected && { color: colors.onBrandPrimary }]}>{y}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          icon="database-remove-outline"
          title="কোনো প্রশ্ন মেলেনি"
          subtitle="অন্য শব্দ দিয়ে আবার খুঁজে দেখুন"
          testID="bank-empty-state"
        />
      ) : (
        <View style={[styles.list, { paddingBottom: bottomChrome + spacing.xxl }]}>
          {filtered.map((q) => {
            const marked = bookmarked.includes(q.id);
            return (
              <Card key={q.id} testID={`bank-question-card-${q.id}`} style={styles.questionCard} onPress={() => setOpenQuestion(q.id)}>
                <Text style={styles.questionText} numberOfLines={2}>
                  {q.question}
                </Text>
                <View style={styles.metaRow}>
                  <View style={styles.subjectChip}>
                    <Text style={styles.subjectText}>{q.subject}</Text>
                  </View>
                  {q.year ? (
                    <View style={[styles.subjectChip, { backgroundColor: colors.surfaceTertiary }]}>
                      <Text style={[styles.subjectText, { color: colors.onSurfaceTertiary }]}>{q.year}</Text>
                    </View>
                  ) : null}
                  <Pressable
                    testID={`bank-bookmark-${q.id}`}
                    onPress={() =>
                      setBookmarked((prev) => (marked ? prev.filter((id) => id !== q.id) : [...prev, q.id]))
                    }
                    style={styles.bookmarkBtn}
                    hitSlop={8}
                  >
                    <Icon
                      name={marked ? "bookmark" : "bookmark-outline"}
                      size={22}
                      color={marked ? colors.brandPrimary : colors.muted}
                    />
                  </Pressable>
                </View>
              </Card>
            );
          })}
          <Text style={styles.countText}>{bn(filtered.length)}টি প্রশ্ন দেখানো হচ্ছে</Text>
        </View>
      )}

      <Modal
        visible={!!active}
        onClose={() => setOpenQuestion(null)}
        title="প্রশ্ন প্রিভিউ"
        testID="bank-question-modal"
      >
        {active ? (
          <View style={styles.modalBody}>
            <QuestionCard index={0} total={1} question={active.question} subject={active.subject} />
            <View style={styles.options}>
              {active.options.map((opt, i) => (
                <OptionButton
                  key={i}
                  label={opt}
                  letter={LETTERS[i]}
                  state={i === active.correctIndex ? "correct" : "idle"}
                  disabled
                  testID={`bank-modal-option-${i}`}
                />
              ))}
            </View>
            <View style={styles.explanation}>
              <Icon name="lightbulb-on-outline" size={18} color={colors.brandPrimary} />
              <Text style={styles.explanationText}>{active.explanation}</Text>
            </View>
          </View>
        ) : null}
      </Modal>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerWrap: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onSurface,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
    marginTop: -spacing.sm,
  },
  searchWrap: {
    marginTop: spacing.xs,
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "nowrap",
  },
  chip: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSecondary,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  questionCard: {
    gap: spacing.md,
  },
  questionText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  subjectChip: {
    backgroundColor: colors.infoTertiary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  subjectText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.brandSecondary,
  },
  bookmarkBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -spacing.lg,
    marginLeft: "auto",
  },
  countText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    textAlign: "center",
    paddingVertical: spacing.sm,
  },
  modalBody: {
    gap: spacing.lg,
  },
  options: {
    gap: spacing.md,
  },
  explanation: {
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: colors.brandTertiary,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  explanationText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
}));