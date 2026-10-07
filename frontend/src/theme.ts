// Design tokens for Police Promotion Academy — DARK-ONLY luxe navy theme.
// Values come from /app/design_guidelines.json (Glass / Luxe DARK personality).
// The app is intentionally dark-only: both scheme slots map to the same palette.
//
//   <View style={{ backgroundColor: colors.brandPrimary }}>
//     <Text style={{ color: colors.onBrandPrimary }}>Continue</Text>
//   </View>
//
// Styling: build sheets with makeStyles so colors follow the theme:
//   const useStyles = makeStyles((colors) => ({
//     card: { backgroundColor: colors.surfaceSecondary, padding: 16 },
//   }));
// For color props (icon color, placeholderTextColor) read useTheme().colors.

import { useMemo } from "react";
import { Appearance, StyleSheet, useColorScheme } from "react-native";

export type ColorScheme = "light" | "dark";

const dark = {
  // Surfaces: backgrounds, from the screen down to small fills.
  surface: "#0F141C", // primary canvas — dark navy
  onSurface: "#F4F6F9", // text and icons on the canvas
  surfaceSecondary: "#1A2230", // cards, sheets, list rows
  onSurfaceSecondary: "#FFFFFF",
  surfaceTertiary: "#242E42", // inputs, chips, deepest nesting
  onSurfaceTertiary: "#D0D7DE",
  surfaceInverse: "#FFFFFF",
  onSurfaceInverse: "#0F141C",
  muted: "#94A3B8", // captions, timestamps, placeholders

  // Brand: premium gold identity + professional blue secondary.
  brand: "#D4AF37",
  onBrand: "#0F141C",
  brandPrimary: "#D4AF37", // primary CTA, active tab, selected states
  onBrandPrimary: "#0F141C",
  brandSecondary: "#3B82F6", // professional blue — secondary accents
  onBrandSecondary: "#FFFFFF",
  brandTertiary: "rgba(212, 175, 55, 0.15)", // subtle gold moments, badges
  onBrandTertiary: "#F4F6F9",

  // Status: semantic only.
  success: "#10B981",
  onSuccess: "#FFFFFF",
  warning: "#F59E0B",
  onWarning: "#0F141C",
  error: "#EF4444",
  onError: "#FFFFFF",
  info: "#3B82F6",
  onInfo: "#FFFFFF",

  // Lines
  border: "rgba(255, 255, 255, 0.08)",
  borderStrong: "#D4AF37",
  divider: "rgba(255, 255, 255, 0.06)",

  // Extras used across the app (derived tones from the same palette).
  overlay: "rgba(5, 8, 14, 0.85)", // modal backdrops
  infoTertiary: "rgba(59, 130, 246, 0.16)",
  successTertiary: "rgba(16, 185, 129, 0.16)",
  errorTertiary: "rgba(239, 68, 68, 0.16)",
  goldDeep: "#9C7E1F", // darker gold for gradients
  shadow: "rgba(0, 0, 0, 0.5)",
};

export type ThemeColors = typeof dark;

export const defaultScheme: ColorScheme = "dark";

export const themes: { light: ThemeColors; dark: ThemeColors } = {
  light: dark, // dark-only app: both slots share the navy palette
  dark,
};

export function setColorScheme(_scheme: ColorScheme | null) {
  // Dark-only app — kept for API parity.
}

setColorScheme?.(defaultScheme);

export function useTheme(): { scheme: ColorScheme; colors: ThemeColors } {
  const system = useColorScheme();
  const scheme: ColorScheme = system === "light" || system === "dark" ? system : defaultScheme;
  return { scheme, colors: themes[scheme] ?? themes.light };
}

// Themed StyleSheet: returns a hook that builds the sheet from the active
// scheme's colors and memoizes it until the scheme changes.
export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  factory: (colors: ThemeColors) => T & StyleSheet.NamedStyles<any>,
): () => T {
  return function useStyles(): T {
    const { colors } = useTheme();
    return useMemo(() => StyleSheet.create(factory(colors)), [colors]);
  };
}

// ---------------------------------------------------------------------------
// Noto Sans Bengali — loaded in app/_layout.tsx via expo-font.
// ---------------------------------------------------------------------------
export const fonts = {
  regular: "NotoSansBengali-Regular",
  medium: "NotoSansBengali-Medium",
  semiBold: "NotoSansBengali-SemiBold",
  bold: "NotoSansBengali-Bold",
} as const;

// 8pt spacing scale from design guidelines.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Radius tokens from design guidelines.
export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

// Typography scale (Bengali) — generous line height for script clarity.
export const typeScale = {
  xs: 11,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  display: 28,
} as const;

export function lh(size: number): number {
  return Math.round(size * 1.7);
}