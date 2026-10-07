import { Pressable, View, ViewStyle, StyleSheet } from "react-native";
import { ReactNode } from "react";

import { radius, spacing, makeStyles, useTheme } from "@/src/theme";

type CardVariant = "default" | "elevated" | "gold";

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  variant?: CardVariant;
  padding?: number;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
};

export function Card({ children, onPress, variant = "default", padding = spacing.lg, style, testID }: CardProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  const base = [
    styles.card,
    { padding },
    variant === "gold" && { backgroundColor: colors.brandTertiary, borderColor: "rgba(212, 175, 55, 0.35)" },
    variant === "elevated" && styles.elevated,
    style,
  ];

  if (onPress) {
    return (
      <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [...base, pressed && { opacity: 0.9 }]}>
        {children}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={base}>
      {children}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  card: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  elevated: {
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
}));