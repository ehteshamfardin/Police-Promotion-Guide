import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { storage } from "@/src/utils/storage";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const SLIDES = [
  {
    icon: "shield-half-full",
    title: "পুলিশ প্রমোশন পরীক্ষার সেরা সঙ্গী",
    desc: "পুলিশ রেগুলেশন, দণ্ডবিধি, ফৌজদারি কার্যবিধি ও সংবিধান — সব বিষয়ের ব্যাপক প্রস্তুতি এক অ্যাপেই।",
  },
  {
    icon: "timer-outline",
    title: "রিয়েল-টাইম মক টেস্ট",
    desc: "প্রমোশন বোর্ডের স্ট্যান্ডার্ডে টাইমারসহ পূর্ণাঙ্গ পরীক্ষা অনুশীলন করুন এবং ফলাফল বিশ্লেষণ করুন।",
  },
  {
    icon: "robot-outline",
    title: "এআই স্টাডি সহকারী",
    desc: "আপনার দুর্বল অধ্যায় বিশ্লেষণ করে নিজের মতো প্রশ্ন তৈরি করুন এবং স্মার্টভাবে প্রস্তুতি নিন।",
  },
];

export default function Onboarding() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const finish = async () => {
    await storage.setItem("ppa_onboarded", true);
    router.replace("/login");
  };

  const next = () => {
    if (index >= SLIDES.length - 1) {
      finish();
      return;
    }
    scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
    setIndex(index + 1);
  };

  const onMomentumEnd = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const page = Math.min(SLIDES.length - 1, Math.max(0, Math.round(e.nativeEvent.contentOffset.x / width)));
    setIndex(page);
  };

  return (
    <View testID="onboarding-screen" style={styles.container}>
      <Pressable
        testID="onboarding-skip-button"
        onPress={finish}
        style={[styles.skipBtn, { top: insets.top + spacing.sm }]}
      >
        <Text style={styles.skipText}>এড়িয়ে যান</Text>
      </Pressable>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        style={styles.slides}
      >
        {SLIDES.map((slide, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.slideIconWrap}>
              <Icon name={slide.icon} size={56} color={colors.onBrandPrimary} />
            </LinearGradient>
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideDesc}>{slide.desc}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && { backgroundColor: colors.brandPrimary, width: 24 }]}
            />
          ))}
        </View>
        <Button
          title={index === SLIDES.length - 1 ? "শুরু করুন" : "পরবর্তী"}
          size="lg"
          onPress={next}
          testID="onboarding-next-button"
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
  skipBtn: {
    position: "absolute",
    right: spacing.xl,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.muted,
  },
  slides: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    gap: spacing.xl,
  },
  slideIconWrap: {
    width: 148,
    height: 148,
    borderRadius: 74,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  slideTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onSurface,
    textAlign: "center",
  },
  slideDesc: {
    fontFamily: fonts.regular,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.muted,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
  },
}));