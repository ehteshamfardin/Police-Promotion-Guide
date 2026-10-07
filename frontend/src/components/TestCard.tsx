import { Pressable, Text, View } from "react-native";

import { Button } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { PremiumBadge } from "./PremiumBadge";
import { MockTest, bn } from "@/src/data/demo";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type TestCardProps = {
  test: MockTest;
  onPress?: () => void;
  ctaLabel?: string;
  testID?: string;
};

export function TestCard({ test, onPress, ctaLabel = "অংশগ্রহণ করুন", testID }: TestCardProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  const diffColor = test.difficulty === "সহজ" ? colors.success : test.difficulty === "মাধ্যম" ? colors.warning : colors.error;

  return (
    <Card testID={testID} style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.iconWrap, { backgroundColor: colors.infoTertiary }]}>
          <Icon name="clipboard-text-outline" size={24} color={colors.brandSecondary} />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={2}>
            {test.title}
          </Text>
          <Text style={styles.participants}>{bn(test.participants)} জন অংশ নিয়েছে</Text>
        </View>
        {test.isPremium ? <PremiumBadge /> : null}
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="help-circle-outline" size={16} color={colors.muted} />
          <Text style={styles.metaText}>{bn(test.questions)} প্রশ্ন</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="clock-outline" size={16} color={colors.muted} />
          <Text style={styles.metaText}>{bn(test.durationMin)} মিনিট</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="star-outline" size={16} color={colors.muted} />
          <Text style={styles.metaText}>{bn(test.marks)} নম্বর</Text>
        </View>
        <View style={[styles.diffChip, { backgroundColor: `${diffColor}22` }]}>
          <Text style={[styles.diffText, { color: diffColor }]}>{test.difficulty}</Text>
        </View>
      </View>

      <Button
        title={ctaLabel}
        size="sm"
        variant={test.isPremium ? "primary" : "secondary"}
        icon={test.isPremium ? "lock-open-variant" : "play-circle-outline"}
        fullWidth
        onPress={onPress}
        testID={testID ? `${testID}-cta` : "test-card-cta"}
      />
    </Card>
  );
}

const useStyles = makeStyles((colors) => ({
  card: {
    gap: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  participants: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  diffChip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    marginLeft: "auto",
  },
  diffText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
  },
}));