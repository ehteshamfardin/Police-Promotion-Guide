import { Text, View, ViewStyle, TextStyle } from "react-native";

import { Icon } from "./Icon";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type PremiumBadgeProps = {
  label?: string;
  style?: ViewStyle;
  testID?: string;
};

export function PremiumBadge({ label = "প্রিমিয়াম", style, testID }: PremiumBadgeProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View testID={testID} style={[styles.badge, style]}>
      <Icon name="crown" size={12} color={colors.onBrandPrimary} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.brandPrimary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    alignSelf: "flex-start",
  } as ViewStyle,
  text: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onBrandPrimary,
  } as TextStyle,
}));