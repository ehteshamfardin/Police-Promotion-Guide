import { Pressable, Text, View } from "react-native";

import { Card } from "./Card";
import { Icon } from "./Icon";
import { ProgressBar } from "./ProgressBar";
import { Subject, bn } from "@/src/data/demo";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type SubjectCardProps = {
  subject: Subject;
  onPress?: () => void;
  testID?: string;
};

export function SubjectCard({ subject, onPress, testID }: SubjectCardProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const tint = (colors as Record<string, string>)[subject.color] ?? colors.brandSecondary;

  return (
    <Card onPress={onPress} testID={testID} style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: `${tint}22` }]}>
          <Icon name={subject.icon} size={24} color={tint} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {subject.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subject.subtitle}
          </Text>
        </View>
        <Icon name="chevron-right" size={22} color={colors.muted} />
      </View>
      <View style={styles.bottomRow}>
        <ProgressBar progress={subject.progress} color={tint} showPercent style={styles.progress} />
        <Text style={styles.count}>{bn(subject.questions)} প্রশ্ন</Text>
      </View>
    </Card>
  );
}

const useStyles = makeStyles((colors) => ({
  card: {
    gap: spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  progress: {
    flex: 1,
  },
  count: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
}));