import { ReactNode } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "./Icon";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type HeaderProps = {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
  style?: ViewStyle;
  testID?: string;
};

// Safe-area aware sticky stack header.
export function Header({ title, subtitle, back = true, right, style, testID }: HeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const styles = useStyles();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/home");
  };

  return (
    <View testID={testID} style={[styles.header, { paddingTop: insets.top + spacing.sm }, style]}>
      <View style={styles.row}>
        {back ? (
          <Pressable testID="header-back-button" onPress={goBack} style={styles.backBtn} hitSlop={8}>
            <Icon name="chevron-left" size={26} color={colors.onSurface} />
          </Pressable>
        ) : (
          <View style={styles.backBtn} />
        )}
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onSurface,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
}));