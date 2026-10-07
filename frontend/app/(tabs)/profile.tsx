import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card } from "@/src/components/Card";
import { Icon } from "@/src/components/Icon";
import { PremiumBadge } from "@/src/components/PremiumBadge";
import { usesNativeTabs } from "@/src/navigation";
import { loadMyProfile } from "@/src/lib/profile";
import { OFFICER, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const MENU = [
  { label: "প্রোগ্রেস অ্যানালিটিক্স", icon: "chart-line", route: "/analytics", testId: "profile-menu-analytics" },
  { label: "বুকমার্ক", icon: "bookmark-outline", route: "/bookmarks", testId: "profile-menu-bookmarks" },
  { label: "ভুল প্রশ্ন", icon: "close-circle-outline", route: "/wrong-answers", testId: "profile-menu-wrong" },
  { label: "নোটিফিকেশন", icon: "bell-outline", route: "/notifications", testId: "profile-menu-notifications" },
  { label: "সেটিংস", icon: "cog-outline", route: "/settings", testId: "profile-menu-settings" },
];

export default function Profile() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const styles = useStyles();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;

  const { data: profile } = useQuery({ queryKey: ["my-profile"], queryFn: loadMyProfile });
  const name = profile?.full_name || OFFICER.name;
  const rank = profile?.current_rank || OFFICER.rank;
  const unit = profile?.unit || OFFICER.unit;
  const avatarLetter = (name || "অ").trim().charAt(0);

  return (
    <View testID="profile-screen" style={styles.container}>
      <View style={[styles.list, { paddingTop: insets.top, paddingBottom: bottomChrome + spacing.xxl }]}>
        {/* Cover + avatar */}
        <LinearGradient colors={["#1A2740", colors.surfaceSecondary]} style={styles.cover}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarLetter}</Text>
            </View>
            <View style={styles.insignia}>
              <Icon name="shield-half-full" size={16} color={colors.onBrandPrimary} />
            </View>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.rank}>{rank} · {unit}</Text>
          <View style={styles.idRow}>
            <Text style={styles.idText}>{profile?.email || OFFICER.serviceId}</Text>
            <PremiumBadge label={profile?.premium ? "ভিআইপি" : "ফ্রি প্ল্যান"} style={{ backgroundColor: profile?.premium ? colors.brandPrimary : colors.surfaceTertiary }} />
          </View>
        </LinearGradient>

        {/* Exam countdown */}
        <Card variant="gold" style={styles.countdownCard} testID="profile-countdown-card">
          <Icon name="calendar-clock" size={28} color={colors.brandPrimary} />
          <View style={styles.countdownText}>
            <Text style={styles.countdownTitle}>প্রমোশন বোর্ড পরীক্ষা</Text>
            <Text style={styles.countdownSub}>{OFFICER.examDate} — আর মাত্র {bn(OFFICER.examCountdownDays)} দিন</Text>
          </View>
          <Icon name="chevron-right" size={22} color={colors.brandPrimary} />
        </Card>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Icon name="fire" size={22} color={colors.warning} />
            <Text style={styles.statValue}>{bn(OFFICER.streakDays)}</Text>
            <Text style={styles.statLabel}>দিনের স্ট্রিক</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="star" size={22} color={colors.brandPrimary} />
            <Text style={styles.statValue}>{bn("8,450")}</Text>
            <Text style={styles.statLabel}>পয়েন্ট</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="clipboard-check-outline" size={22} color={colors.success} />
            <Text style={styles.statValue}>{bn(OFFICER.testsTaken)}</Text>
            <Text style={styles.statLabel}>টেস্ট দিয়েছেন</Text>
          </View>
        </View>

        {/* Premium upsell */}
        <Pressable testID="profile-premium-button" style={styles.premiumRow} onPress={() => router.push("/premium")}>
          <Icon name="crown" size={22} color={colors.brandPrimary} />
          <Text style={styles.premiumText}>প্রিমিয়াম সাবস্ক্রিপশন</Text>
          <Icon name="chevron-right" size={22} color={colors.muted} />
        </Pressable>

        {/* Menu */}
        <Card padding={spacing.sm} style={styles.menuCard}>
          {MENU.map((item, i) => (
            <Pressable
              key={item.route}
              testID={item.testId}
              onPress={() => router.push(item.route as never)}
              style={({ pressed }) => [styles.menuRow, pressed && { opacity: 0.7 }, i > 0 && styles.menuDivider]}
            >
              <View style={styles.menuIconWrap}>
                <Icon name={item.icon} size={20} color={colors.brandSecondary} />
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
              <Icon name="chevron-right" size={22} color={colors.muted} />
            </Pressable>
          ))}
        </Card>

        <Text style={styles.version}>Police Promotion Academy · সংস্করণ ১.০.০</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  cover: {
    borderRadius: radius.lg,
    alignItems: "center",
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  avatarWrap: {
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.brandTertiary,
    borderWidth: 2,
    borderColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: fonts.bold,
    fontSize: 34,
    color: colors.brandPrimary,
  },
  insignia: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.surfaceSecondary,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onSurface,
  },
  rank: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  idRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  idText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  countdownCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  countdownText: {
    flex: 1,
    gap: 2,
  },
  countdownTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  countdownSub: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: "center",
    gap: 2,
    paddingVertical: spacing.lg,
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  premiumRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.brandTertiary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.35)",
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  premiumText: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.brandPrimary,
  },
  menuCard: {
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
  },
  menuDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.infoTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  version: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    textAlign: "center",
    paddingVertical: spacing.sm,
  },
}));