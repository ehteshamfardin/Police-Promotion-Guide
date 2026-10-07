import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EmptyState } from "@/src/components/EmptyState";
import { NoteCard } from "@/src/components/NoteCard";
import { usesNativeTabs } from "@/src/navigation";
import { NOTE_CATEGORIES, NOTES } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function Notes() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const styles = useStyles();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;

  const [category, setCategory] = useState("সব");
  const [bookmarks, setBookmarks] = useState<string[]>(NOTES.filter((n) => n.bookmarked).map((n) => n.id));

  const filtered = NOTES.filter((n) => category === "সব" || n.category === category);

  const toggle = (id: string) =>
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));

  return (
    <View testID="notes-screen" style={styles.container}>
      <View style={[styles.headerWrap, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.title}>নোটস</Text>
        <Text style={styles.subtitle}>মাস্টার নোটস, কেস সামারি ও আইনি ব্যাখ্যা</Text>
        <View style={styles.chipRow}>
          {NOTE_CATEGORIES.map((c) => {
            const selected = c === category;
            return (
              <Pressable
                key={c}
                testID={`notes-category-chip-${c}`}
                onPress={() => setCategory(c)}
                style={[styles.chip, selected && { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary }]}
              >
                <Text style={[styles.chipText, selected && { color: colors.onBrandPrimary }]}>{c}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          icon="notebook-outline"
          title="এই বিভাগে নোট নেই"
          subtitle="অন্য বিভাগ দেখে নিন"
          testID="notes-empty-state"
        />
      ) : (
        <View style={[styles.list, { paddingBottom: bottomChrome + spacing.xxl }]}>
          {filtered.map((note) => (
            <NoteCard
              key={note.id}
              note={{ ...note, bookmarked: bookmarks.includes(note.id) }}
              onPress={() => router.push(`/note-details?id=${note.id}`)}
              onToggleBookmark={() => toggle(note.id)}
              testID={`notes-card-${note.id}`}
            />
          ))}
        </View>
      )}
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
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  chip: {
    flexShrink: 0,
    height: 36,
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
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
}));