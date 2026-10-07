import { Text, View, ViewStyle } from "react-native";

import { Button } from "./Button";
import { Icon } from "./Icon";
import { fonts, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type EmptyStateProps = {
  icon: string;
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
  testID?: string;
};

export function EmptyState({ icon, title, subtitle, actionTitle, onAction, style, testID }: EmptyStateProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View testID={testID} style={[styles.wrap, style]}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={32} color={colors.brandPrimary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {actionTitle && onAction ? (
        <Button title={actionTitle} size="sm" onPress={onAction} testID={testID ? `${testID}-action` : "empty-state-action"} />
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: {
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
    textAlign: "center",
    maxWidth: 280,
  },
}));