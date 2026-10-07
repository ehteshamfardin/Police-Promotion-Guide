import { Pressable, Text, View } from "react-native";

import { Icon } from "./Icon";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

export type OptionState = "idle" | "selected" | "correct" | "wrong";

type OptionButtonProps = {
  label: string;
  letter: string; // ক খ গ ঘ
  state?: OptionState;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
};

export function OptionButton({ label, letter, state = "idle", onPress, disabled, testID }: OptionButtonProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  const scheme = {
    idle: { bg: colors.surfaceTertiary, border: colors.border, text: colors.onSurface, chipBg: colors.surface, chipText: colors.muted },
    selected: { bg: colors.infoTertiary, border: colors.brandSecondary, text: colors.onSurface, chipBg: colors.brandSecondary, chipText: colors.onInfo },
    correct: { bg: colors.successTertiary, border: colors.success, text: colors.success, chipBg: colors.success, chipText: colors.onSuccess },
    wrong: { bg: colors.errorTertiary, border: colors.error, text: colors.error, chipBg: colors.error, chipText: colors.onError },
  }[state];

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.option,
        { backgroundColor: scheme.bg, borderColor: scheme.border },
        pressed && !disabled && { opacity: 0.85 },
      ]}
    >
      <View style={[styles.letter, { backgroundColor: scheme.chipBg }]}>
        <Text style={[styles.letterText, { color: scheme.chipText }]}>{letter}</Text>
      </View>
      <Text style={[styles.label, { color: scheme.text }]}>{label}</Text>
      {state === "correct" ? <Icon name="check-circle" size={22} color={colors.success} /> : null}
      {state === "wrong" ? <Icon name="close-circle" size={22} color={colors.error} /> : null}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) => ({
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 56,
  },
  letter: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
  },
  label: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
  },
}));