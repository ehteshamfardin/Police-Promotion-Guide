import { Pressable, Text, ActivityIndicator, View, ViewStyle, TextStyle } from "react-native";

import { Icon } from "./Icon";
import { fonts, makeStyles, radius, spacing, typeScale, lh, useTheme } from "@/src/theme";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
  testID?: string;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  testID,
}: ButtonProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  const fg: Record<Variant, string> = {
    primary: colors.onBrandPrimary,
    secondary: colors.onBrandSecondary,
    outline: colors.onSurface,
    ghost: colors.brandPrimary,
    danger: colors.error,
  };
  const bg: Record<Variant, ViewStyle["backgroundColor"]> = {
    primary: colors.brandPrimary,
    secondary: colors.brandSecondary,
    outline: "transparent",
    ghost: "transparent",
    danger: colors.errorTertiary,
  };

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        { backgroundColor: bg[variant] },
        variant === "outline" && { borderWidth: 1.5, borderColor: colors.border },
        !fullWidth && { alignSelf: "center" },
        (disabled || loading) && { opacity: 0.55 },
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg[variant]} size="small" />
      ) : (
        <View style={styles.row}>
          {icon ? <Icon name={icon} size={size === "sm" ? 16 : 18} color={fg[variant]} /> : null}
          <Text style={[styles[`${size}Text` as "smText" | "mdText" | "lgText"], { color: fg[variant] }]}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) => ({
  base: {
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  } as ViewStyle,
  sm: {
    height: 40,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,
  md: {
    height: 48,
    paddingHorizontal: spacing.xl,
  } as ViewStyle,
  lg: {
    height: 56,
    paddingHorizontal: spacing.xxl,
  } as ViewStyle,
  smText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
  } as TextStyle,
  mdText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
  } as TextStyle,
  lgText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
  } as TextStyle,
}));