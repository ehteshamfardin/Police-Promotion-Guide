import { Pressable, Text, TextInput, View, TextStyle, TextInputProps, ViewStyle } from "react-native";
import { useState } from "react";

import { Icon } from "./Icon";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  icon?: string;
  testID?: string;
};

export function Input({ label, error, icon, testID, style, ...rest }: InputProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = rest.secureTextEntry === true;

  return (
    <View style={[styles.wrap, style as ViewStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          { borderColor: focused ? colors.brandPrimary : colors.border },
          !!error && { borderColor: colors.error },
        ]}
      >
        {icon ? <Icon name={icon} size={20} color={focused ? colors.brandPrimary : colors.muted} /> : null}
        <TextInput
          testID={testID}
          style={styles.input}
          placeholderTextColor={colors.muted}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />
        {isPassword ? (
          <Pressable
            testID={testID ? `${testID}-visibility-toggle` : "input-password-toggle"}
            onPress={() => setShowPassword((v) => !v)}
            style={styles.eye}
            hitSlop={8}
          >
            <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  wrap: {
    gap: spacing.sm,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  } as TextStyle,
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
  } as ViewStyle,
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
    paddingVertical: 0,
  } as TextStyle,
  eye: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -spacing.md,
  } as ViewStyle,
  error: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.error,
  } as TextStyle,
}));