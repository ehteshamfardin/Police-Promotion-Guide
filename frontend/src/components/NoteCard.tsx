import { Pressable, Text, View } from "react-native";

import { Card } from "./Card";
import { Icon } from "./Icon";
import { Note, bn } from "@/src/data/demo";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type NoteCardProps = {
  note: Note;
  onPress?: () => void;
  onToggleBookmark?: () => void;
  testID?: string;
};

export function NoteCard({ note, onPress, onToggleBookmark, testID }: NoteCardProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <Card onPress={onPress} testID={testID} style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.categoryChip, { backgroundColor: colors.infoTertiary }]}>
          <Text style={[styles.categoryText, { color: colors.brandSecondary }]}>{note.category}</Text>
        </View>
        <Pressable
          testID={testID ? `${testID}-bookmark` : "note-card-bookmark"}
          onPress={onToggleBookmark}
          style={styles.bookmarkBtn}
          hitSlop={8}
        >
          <Icon
            name={note.bookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={note.bookmarked ? colors.brandPrimary : colors.muted}
          />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {note.title}
      </Text>
      <Text style={styles.excerpt} numberOfLines={2}>
        {note.excerpt}
      </Text>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="clock-outline" size={14} color={colors.muted} />
          <Text style={styles.metaText}>{bn(note.readTime)} মিনিট পাঠ</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="account-outline" size={14} color={colors.muted} />
          <Text style={styles.metaText}>{note.author}</Text>
        </View>
      </View>
    </Card>
  );
}

const useStyles = makeStyles((colors) => ({
  card: {
    gap: spacing.md,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryChip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
  },
  bookmarkBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -spacing.lg,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  excerpt: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
}));