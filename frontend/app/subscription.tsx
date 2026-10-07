import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { Icon } from "@/src/components/Icon";
import { Input } from "@/src/components/Input";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { useToast } from "@/src/components/Toast";
import { PAYMENT_METHODS, PLANS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function Subscription() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const toast = useToast();
  const styles = useStyles();

  const [planId, setPlanId] = useState("quarterly");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [method, setMethod] = useState("bkash");
  const [loading, setLoading] = useState(false);

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const total = promoApplied ? Math.round(plan.price * 0.9) : plan.price;

  const applyPromo = () => {
    if (!promo.trim()) {
      toast.show("প্রোমো কোড লিখুন", "error");
      return;
    }
    setPromoApplied(true);
    toast.show("প্রোমো কোড প্রয়োগ হয়েছে — ১০% ছাড় (ডেমো)", "success");
  };

  const subscribe = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.show("ডেমো: পেমেন্ট গেটওয়ে শীঘ্রই যুক্ত হবে", "success");
    }, 1200);
  };

  return (
    <View testID="subscription-screen" style={styles.container}>
      <Header title="সাবস্ক্রিপশন" subtitle="পরিকল্পনা নির্বাচন করে ভিআইপি হয়ে যান" />
      <Screen bottomPad={insets.bottom + 24}>
        {/* Plans */}
        <View style={styles.plansList}>
          {PLANS.map((p) => {
            const selected = p.id === planId;
            return (
              <Pressable
                key={p.id}
                testID={`subscription-plan-${p.id}`}
                onPress={() => setPlanId(p.id)}
                style={[
                  styles.planCard,
                  { borderColor: selected ? colors.brandPrimary : colors.border },
                  selected && { backgroundColor: colors.brandTertiary },
                ]}
              >
                <View style={styles.planRadio}>{selected ? <View style={styles.planRadioInner} /> : null}</View>
                <View style={styles.planInfo}>
                  <Text style={styles.planTitle}>
                    {p.title} · {p.period}
                  </Text>
                  <Text style={styles.planPerMonth}>{p.perMonth}</Text>
                </View>
                <View style={styles.planRight}>
                  <Text style={styles.planPrice}>৳{bn(p.price)}</Text>
                  {p.save ? <Text style={styles.planSave}>{p.save}</Text> : null}
                </View>
                {p.popular ? (
                  <View style={styles.popularChip}>
                    <Text style={styles.popularText}>জনপ্রিয়</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* Promo */}
        <View style={styles.promoRow}>
          <Input
            placeholder="প্রোমো কোড"
            icon="ticket-percent-outline"
            value={promo}
            onChangeText={setPromo}
            testID="subscription-promo-input"
            style={styles.promoInput}
          />
          <Button title="প্রয়োগ" size="md" variant="outline" onPress={applyPromo} testID="subscription-promo-apply" />
        </View>

        {/* Payment methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>পেমেন্ট পদ্ধতি</Text>
          <View style={styles.methodsRow}>
            {PAYMENT_METHODS.map((m) => {
              const selected = m.id === method;
              return (
                <Pressable
                  key={m.id}
                  testID={`subscription-method-${m.id}`}
                  onPress={() => setMethod(m.id)}
                  style={[
                    styles.methodChip,
                    { borderColor: selected ? colors.brandPrimary : colors.border },
                    selected && { backgroundColor: colors.brandTertiary },
                  ]}
                >
                  <Icon name={m.icon} size={20} color={selected ? colors.brandPrimary : colors.onSurfaceTertiary} />
                  <Text style={[styles.methodText, selected && { color: colors.brandPrimary }]}>{m.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Summary */}
        <Card style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{plan.title} প্ল্যান</Text>
            <Text style={styles.summaryValue}>৳{bn(plan.price)}</Text>
          </View>
          {promoApplied ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>প্রোমো ছাড় (১০%)</Text>
              <Text style={[styles.summaryValue, { color: colors.success }]}>-৳{bn(plan.price - total)}</Text>
            </View>
          ) : null}
          <View style={[styles.summaryRow, styles.summaryTotalRow]}>
            <Text style={styles.summaryTotalLabel}>মোট</Text>
            <Text style={styles.summaryTotalValue}>৳{bn(total)}</Text>
          </View>
        </Card>

        <Button
          title="সাবস্ক্রিপশন নিশ্চিত করুন"
          size="lg"
          icon="crown"
          loading={loading}
          onPress={subscribe}
          testID="subscription-confirm-button"
        />
        <Text style={styles.terms}>নিশ্চিত করলে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন (ডেমো — কোনো পেমেন্ট নেওয়া হবে না)</Text>
      </Screen>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  plansList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  planCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 1.5,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.lg,
  },
  planRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  planRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.brandPrimary,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  planPerMonth: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    marginTop: 2,
  },
  planRight: {
    alignItems: "flex-end",
  },
  planPrice: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.brandPrimary,
  },
  planSave: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.success,
  },
  popularChip: {
    position: "absolute",
    top: -10,
    right: spacing.lg,
    backgroundColor: colors.error,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
  },
  popularText: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    lineHeight: 16,
    color: colors.onError,
  },
  promoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  promoInput: {
    flex: 1,
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
  methodsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  methodChip: {
    flex: 1,
    height: 60,
    borderRadius: radius.md,
    borderWidth: 1.5,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  methodText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  summary: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  summaryValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurface,
  },
  summaryTotalRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingTop: spacing.md,
  },
  summaryTotalLabel: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  summaryTotalValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.brandPrimary,
  },
  terms: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
  },
}));