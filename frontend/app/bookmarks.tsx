import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { MCQ_QUESTIONS, NOTES } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const TABS = [
  { id: "questions", label: "প্রশ্ন" },
  { id: "notes", label: "নোট" },
] as const;

export default function Bookmarks() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("questions");
  const [questionMarks, setQuestionMarks] = useState<string[]>(["q2", "q8"]);
  const [noteMarks, setNoteMarks] = useState<string[]>(NOTES.filter((n) => n.bookmarked).map((n) => n.id));

  const questions = MCQ_QUESTIONS.filter((q) => questionMarks.includes(q.id));
  const notes = NOTES.filter((n) => noteMarks.includes(n.id));

  const unmarkQuestion = (id: string) => setQuestionMarks((prev) => prev.filter((q) => q !== id));
  const unmarkNote = (id: string) => setNoteMarks((prev) => prev.filter((n) => n !== id));

  const empty = tab === "questions" ? questions.length === 0 : notes.length === 0;

  return (
    <View testID="bookmarks-screen" style={styles.container}>
      <Header title="বুকমার্ক" subtitle="সংরক্ষিত প্রশ্ন ও নোট দ্রুত রিভিউ করুন" />
      {/* Segmented control */}
      <View style={[styles.segmentWrap, { paddingHorizontal: spacing.lg }]}>
        <View style={styles.segment}>
          {TABS.map((t) => {
            const selected = t.id === tab;
            return (
              <Pressable
                key={t.id}
                testID={`bookmarks-tab-${t.id}`}
                onPress={() => setTab(t.id)}
                style={[styles.segmentBtn, selected && { backgroundColor: colors.brandPrimary }]}
              >
                <Text style={[styles.segmentText, selected && { color: colors.onBrandPrimary }]}>{t.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {empty ? (
        <EmptyState
          icon="bookmark-outline"
          title="কোনো বুকমার্ক নেই"
          subtitle="যেকোনো প্রশ্ন বা নোটে বুকমার্ক আইকনে চাপ দিয়ে সংরক্ষণ করুন"
          actionTitle="প্রশ্ন ব্যাংক দেখুন"
          onAction={() => router.push("/bank")}
          testID="bookmarks-empty-state"
        />
      ) : (
        <Screen bottomPad={insets.bottom + 24}>
          <View style={styles.list}>
            {tab === "questions"
              ? questions.map((q) => (
                  <Card key={q.id} testID={`bookmarks-question-${q.id}`} style={styles.rowCard}>
                    <Text style={styles.questionText} numberOfLines={3}>
                      {q.question}
                    </Text>
                    <View style={styles.metaRow}>
                      <View style={styles.chip}>
                        <Text style={[styles.chipText, { color: colors.brandSecondary }]}>{q.subject}</Text>
                      </View>
                      <Pressable
                        testID={`bookmarks-unmark-question-${q.id}`}
                        onPress={() => unmarkQuestion(q.id)}
                        style={styles.unmarkBtn}
                        hitSlop={8}
                      >
                        <Icon name="bookmark-remove-outline" size={22} color={colors.error} />
                      </Pressable>
                    </View>
                  </Card>
                ))
              : notes.map((n) => (
                  <Card key={n.id} testID={`bookmarks-note-${n.id}`} style={styles.rowCard}>
                    <Pressable onPress={() => router.push(`/note-details?id=${n.id}`)}>
                      <Text style={styles.questionText} numberOfLines={2}>
                        {n.title}
                      </Text>
                    </Pressable>
                    <View style={styles.metaRow}>
                      <View style={styles.chip}>
                        <Text style={[styles.chipText, { color: colors.brandSecondary }]}>{n.category}</Text>
                      </View>
                      <Pressable
                        testID={`bookmarks-unmark-note-${n.id}`}
                        onPress={() => unmarkNote(n.id)}
                        style={styles.unmarkBtn}
                        hitSlop={8}
                      >
                        <Icon name="bookmark-remove-outline" size={22} color={colors.error} />
                      </Pressable>
                    </View>
                  </Card>
                ))}
          </View>
        </Screen>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  segmentWrap: {
    paddingBottom: spacing.md,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  segmentBtn: {
    flex: 1,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  rowCard: {
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
    justifyContent: "space-between",
  },
  chip: {
    backgroundColor: colors.infoTertiary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
  },
  unmarkBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -spacing.lg,
  },
}));