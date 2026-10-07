import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { NOTES, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const FONT_SIZES = [13, 16, 19];

export default function NoteDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const note = NOTES.find((n) => n.id === id);

  const [fontIdx, setFontIdx] = useState(1);
  const [bookmarked, setBookmarked] = useState(note?.bookmarked ?? false);

  if (!note) {
    return (
      <View style={styles.container}>
        <Header title="নোট" />
        <EmptyState
          icon="notebook-outline"
          title="নোটটি পাওয়া যায়নি"
          actionTitle="নোটসে ফিরুন"
          onAction={() => router.replace("/notes")}
          testID="note-details-not-found"
        />
      </View>
    );
  }

  const fontSize = FONT_SIZES[fontIdx];

  return (
    <View testID="note-details-screen" style={styles.container}>
      <Header
        title="নোট"
        right={
          <View style={styles.headerActions}>
            <Pressable
              testID="note-details-font-decrease"
              onPress={() => setFontIdx((i) => Math.max(0, i - 1))}
              style={styles.toolBtn}
              disabled={fontIdx === 0}
            >
              <Icon name="format-font-size-decrease" size={20} color={colors.onSurface} />
            </Pressable>
            <Pressable
              testID="note-details-font-increase"
              onPress={() => setFontIdx((i) => Math.min(FONT_SIZES.length - 1, i + 1))}
              style={styles.toolBtn}
              disabled={fontIdx === FONT_SIZES.length - 1}
            >
              <Icon name="format-font-size-increase" size={20} color={colors.onSurface} />
            </Pressable>
            <Pressable
              testID="note-details-bookmark-button"
              onPress={() => setBookmarked((v) => !v)}
              style={styles.toolBtn}
            >
              <Icon
                name={bookmarked ? "bookmark" : "bookmark-outline"}
                size={22}
                color={bookmarked ? colors.brandPrimary : colors.onSurface}
              />
            </Pressable>
          </View>
        }
      />
      <Screen bottomPad={insets.bottom + 24}>
        <View style={styles.metaRow}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{note.category}</Text>
          </View>
          <Text style={styles.metaText}>{bn(note.readTime)} মিনিট পাঠ</Text>
        </View>

        <Text style={styles.title}>{note.title}</Text>

        <View style={styles.authorRow}>
          <View style={styles.authorIcon}>
            <Icon name="account-outline" size={16} color={colors.brandSecondary} />
          </View>
          <Text style={styles.authorText}>
            {note.author} · {note.date}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.body}>
          {note.content.map((para, i) => (
            <Text key={i} style={[styles.para, { fontSize, lineHeight: Math.round(fontSize * 1.8) }]}>
              {para}
            </Text>
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
  headerActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  toolBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  categoryChip: {
    backgroundColor: colors.infoTertiary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  categoryText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.brandSecondary,
  },
  metaText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onSurface,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  authorIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.infoTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  authorText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  body: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  para: {
    fontFamily: fonts.regular,
    color: colors.onSurfaceTertiary,
  },
}));