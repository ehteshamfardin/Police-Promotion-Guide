import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { useToast } from "@/src/components/Toast";
import { Header } from "@/src/components/Header";
import { usesNativeTabs } from "@/src/navigation";
import { PAPERS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function Papers() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const toast = useToast();
  const styles = useStyles();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;

  const [expanded, setExpanded] = useState<string | null>(PAPERS[0]?.id ?? null);

  return (
    <View testID="papers-screen" style={styles.container}>
      <Header title="প্রশ্নপত্র" subtitle="পূর্ববর্তী ১০ বছরের প্রমোশন বোর্ড প্রশ্ন" />
      {PAPERS.length === 0 ? (
        <EmptyState
          icon="file-document-outline"
          title="কোনো প্রশ্নপত্র পাওয়া যায়নি"
          subtitle="পূর্ববর্তী বছরের প্রশ্নপত্র শীঘ্রই যুক্ত হবে"
          testID="papers-empty-state"
        />
      ) : (
        <View style={[styles.list, { paddingBottom: bottomChrome + spacing.xxl }]}>
          {PAPERS.map((paper) => {
            const open = expanded === paper.id;
            return (
              <Card key={paper.id} testID={`paper-card-${paper.id}`} style={styles.paperCard}>
                <Pressable
                  testID={`paper-toggle-${paper.id}`}
                  onPress={() => setExpanded(open ? null : paper.id)}
                  style={styles.paperRow}
                >
                  <View style={styles.yearBadge}>
                    <Text style={styles.yearText}>{bn(paper.year)}</Text>
                  </View>
                  <View style={styles.paperInfo}>
                    <Text style={styles.paperTitle} numberOfLines={2}>
                      {paper.title}
                    </Text>
                    <View style={styles.paperMeta}>
                      <Text style={styles.metaText}>{bn(paper.questions)} প্রশ্ন</Text>
                      {paper.solved ? (
                        <View style={styles.solvedChip}>
                          <Icon name="check-decagram" size={12} color={colors.success} />
                          <Text style={styles.solvedText}>সমাধানসহ</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <Icon name={open ? "chevron-up" : "chevron-down"} size={22} color={colors.muted} />
                </Pressable>
                {open ? (
                  <View style={styles.actions}>
                    <Pressable
                      testID={`paper-view-${paper.id}`}
                      style={[styles.actionBtn, { backgroundColor: colors.brandSecondary }]}
                      onPress={() => toast.show("ডেমো: প্রশ্নপত্র ভিউয়ার শীঘ্রই আসছে")}
                    >
                      <Icon name="eye-outline" size={18} color={colors.onInfo} />
                      <Text style={[styles.actionText, { color: colors.onInfo }]}>অনলাইনে দেখুন</Text>
                    </Pressable>
                    <Pressable
                      testID={`paper-download-${paper.id}`}
                      style={[styles.actionBtn, { backgroundColor: colors.surfaceTertiary }]}
                      onPress={() => toast.show(`পিডিএফ ডাউনলোড হচ্ছে (${bn(paper.sizeMb)} এমবি) — ডেমো`)}
                    >
                      <Icon name="download-outline" size={18} color={colors.onSurfaceTertiary} />
                      <Text style={[styles.actionText, { color: colors.onSurfaceTertiary }]}>ডাউনলোড</Text>
                    </Pressable>
                  </View>
                ) : null}
              </Card>
            );
          })}
        </View>
      )}
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
    gap: spacing.md,
  },
  paperCard: {
    gap: 0,
  },
  paperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  yearBadge: {
    width: 64,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  yearText: {
    fontFamily: fonts.bold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.brandPrimary,
  },
  paperInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  paperTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  paperMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  metaText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  solvedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  solvedText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.success,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    height: 44,
    borderRadius: radius.md,
  },
  actionText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
  },
}));