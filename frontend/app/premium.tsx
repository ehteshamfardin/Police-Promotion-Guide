import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { PREMIUM_FEATURES, PLANS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const COMPARISON = [
  { feature: "মক টেস্ট", free: "মাসে ১টি", vip: "আনলিমিটেড" },
  { feature: "নোটস", free: "নির্বাচিত", vip: "মাস্টার নোটস" },
  { feature: "এআই সহকারী", free: "✕", vip: "✓" },
  { feature: "বিজ্ঞাপন", free: "আছে", vip: "নেই" },
];

export default function Premium() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View testID="premium-screen" style={styles.container}>
      <Header title="প্রিমিয়াম" />
      <Screen bottomPad={insets.bottom + 24}>
        {/* Hero */}
        <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.hero}>
          <View style={styles.heroIcon}>
            <Icon name="crown" size={40} color={colors.onBrandPrimary} />
          </View>
          <Text style={styles.heroTitle}>ভিআইপি প্রিমিয়াম</Text>
          <Text style={styles.heroSub}>প্রমোশন পরীক্ষার ১০০% প্রস্তুতি — সব ফিচার আনলক করুন</Text>
        </LinearGradient>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>প্রিমিয়াম সুবিধাসমূহ</Text>
          <Card style={styles.featureCard}>
            {PREMIUM_FEATURES.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Icon name="check-circle" size={20} color={colors.brandPrimary} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ফ্রি বনাম ভিআইপি</Text>
          <Card padding={spacing.md} style={styles.compareCard}>
            <View style={styles.compareHead}>
              <View style={styles.compareFeatureCell} />
              <Text style={styles.compareHeadText}>ফ্রি</Text>
              <Text style={[styles.compareHeadText, { color: colors.brandPrimary }]}>ভিআইপি</Text>
            </View>
            {COMPARISON.map((row) => (
              <View key={row.feature} style={styles.compareRow}>
                <Text style={styles.compareFeature} numberOfLines={1}>
                  {row.feature}
                </Text>
                <Text style={styles.compareCell}>{row.free}</Text>
                <Text style={[styles.compareCell, { color: colors.brandPrimary, fontFamily: fonts.semiBold }]}>
                  {row.vip}
                </Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Plans teaser */}
        <View style={styles.plansRow}>
          {PLANS.map((p) => (
            <View key={p.id} style={styles.planTeaser}>
              <Text style={styles.planTeaserTitle}>{p.title}</Text>
              <Text style={styles.planTeaserPrice}>৳{bn(p.price)}</Text>
              <Text style={styles.planTeaserPeriod}>{p.period}</Text>
            </View>
          ))}
        </View>

        <Button
          title="এখনই আপগ্রেড করুন"
          size="lg"
          icon="crown"
          onPress={() => router.push("/subscription")}
          testID="premium-upgrade-cta"
        />
      </Screen>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  hero: {
    borderRadius: radius.lg,
    alignItems: "center",
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    padding: spacing.xxl,
  },
  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.onBrandPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  heroTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onBrandPrimary,
  },
  heroSub: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onBrandPrimary,
    opacity: 0.9,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  featureCard: {
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  featureText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurface,
  },
  compareCard: {
    gap: 0,
  },
  compareHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  compareFeatureCell: {
    flex: 1,
  },
  compareHeadText: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  compareRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  compareFeature: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurface,
  },
  compareCell: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  plansRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  planTeaser: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: 2,
    paddingVertical: spacing.lg,
  },
  planTeaserTitle: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  planTeaserPrice: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.brandPrimary,
  },
  planTeaserPeriod: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
}));