import { Text, View, ViewStyle } from "react-native";

import { Card } from "./Card";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type QuestionCardProps = {
  index: number;
  total: number;
  question: string;
  subject?: string;
  style?: ViewStyle;
  testID?: string;
};

export function QuestionCard({ index, total, question, subject, style, testID }: QuestionCardProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <Card padding={spacing.xl} style={style} testID={testID}>
      <View style={styles.metaRow}>
        <View style={[styles.indexChip, { backgroundColor: colors.infoTertiary }]}>
          <Text style={[styles.indexText, { color: colors.brandSecondary }]}>
            প্রশ্ন {index + 1}/{total}
          </Text>
        </View>
        {subject ? (
          <View style={[styles.indexChip, { backgroundColor: colors.brandTertiary }]}>
            <Text style={[styles.indexText, { color: colors.brand }]}>{subject}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.question}>{question}</Text>
    </Card>
  );
}

const useStyles = makeStyles((colors) => ({
  metaRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  indexChip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    alignSelf: "flex-start",
  },
  indexText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
  },
  question: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onSurface,
  },
}));