import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { SUBJECTS, bn } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function SubjectDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const subject = SUBJECTS.find((s) => s.id === id);

  if (!subject) {
    return (
      <View style={styles.container}>
        <Header title="বিষয়" />
        <EmptyState
          icon="alert-circle-outline"
          title="বিষয়টি পাওয়া যায়নি"
          actionTitle="তালিকায় ফিরুন"
          onAction={() => router.replace("/subjects")}
          testID="subject-details-not-found"
        />
      </View>
    );
  }

  const tint = (colors as Record<string, string>)[subject.color] ?? colors.brandSecondary;
  const doneChapters = subject.chapters.filter((c) => c.completed).length;

  return (
    <View testID="subject-details-screen" style={styles.container}>
      <Header title={subject.title} subtitle={subject.subtitle} />
      <Screen bottomPad={112}>
        {/* Hero banner */}
        <LinearGradient colors={["#1A2740", colors.surfaceSecondary]} style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: `${tint}22` }]}>
            <Icon name={subject.icon} size={30} color={tint} />
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{bn(subject.questions)}</Text>
              <Text style={styles.heroStatLabel}>প্রশ্ন</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{bn(subject.chapters.length)}</Text>
              <Text style={styles.heroStatLabel}>অধ্যায়</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{bn(Math.round(subject.progress * 100))}%</Text>
              <Text style={styles.heroStatLabel}>সম্পন্ন</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Chapters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>অধ্যায়সমূহ</Text>
          <Text style={styles.sectionSub}>{bn(doneChapters)}/{bn(subject.chapters.length)} অধ্যায় সম্পন্ন</Text>
          <View style={styles.chapterList}>
            {subject.chapters.map((chapter) => (
              <Card key={chapter.id} testID={`chapter-card-${chapter.id}`} style={styles.chapterCard}>
                <View
                  style={[
                    styles.chapterIcon,
                    { backgroundColor: chapter.completed ? colors.successTertiary : colors.surfaceTertiary },
                  ]}
                >
                  <Icon
                    name={chapter.completed ? "check" : "play-outline"}
                    size={20}
                    color={chapter.completed ? colors.success : colors.muted}
                  />
                </View>
                <View style={styles.chapterInfo}>
                  <Text style={styles.chapterTitle} numberOfLines={2}>
                    {chapter.title}
                  </Text>
                  <Text style={styles.chapterMeta}>
                    {bn(chapter.lessons)} পাঠ · {bn(chapter.questions)} প্রশ্ন
                  </Text>
                </View>
                <Icon name="chevron-right" size={20} color={colors.muted} />
              </Card>
            ))}
          </View>
        </View>
      </Screen>

      {/* Sticky practice CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Button
          title="MCQ অনুশীলন শুরু করুন"
          size="lg"
          icon="play-circle-outline"
          onPress={() => router.push(`/mcq-practice?subject=${subject.id}`)}
          testID="subject-details-practice-cta"
        />
      </View>
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
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    gap: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  heroStats: {
    flexDirection: "row",
  },
  heroStat: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  heroStatValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onSurface,
  },
  heroStatLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
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
  sectionSub: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    marginTop: -spacing.sm,
  },
  chapterList: {
    gap: spacing.md,
  },
  chapterCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  chapterIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  chapterInfo: {
    flex: 1,
    gap: 2,
  },
  chapterTitle: {
    fontFamily: fonts.medium,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  chapterMeta: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
  ctaWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
}));