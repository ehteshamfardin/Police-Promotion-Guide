import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { storage } from "@/src/utils/storage";
import { useAuth } from "@/src/providers/AuthProvider";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function Splash() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const styles = useStyles();
  const { session, loading } = useAuth();

  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, bounciness: 9 }),
      Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(async () => {
      const onboarded = await storage.getItem("ppa_onboarded", false);
      if (!onboarded) {
        router.replace("/onboarding");
        return;
      }
      router.replace(session ? "/home" : "/login");
    }, 1500);
    return () => clearTimeout(timer);
  }, [loading, session, router]);

  return (
    <View testID="splash-screen" style={[styles.container, { paddingBottom: insets.bottom + spacing.xl }]}>
      <Animated.View style={[styles.center, { opacity, transform: [{ scale }] }]}>
        <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.emblem}>
          <Text style={styles.emblemIcon}>★</Text>
        </LinearGradient>
        <Text style={styles.title}>পুলিশ প্রমোশন একাডেমি</Text>
        <Text style={styles.subtitle}>প্রমোশন পরীক্ষার সেরা প্রস্তুতি সঙ্গী</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity }]}>
        <View style={styles.dotsRow}>
          {[0, 1, 2].map((i) => (
            <PulseDot key={i} delay={i * 220} color={colors.brandPrimary} />
          ))}
        </View>
        <Pressable testID="splash-skip-button" onPress={() => router.replace("/login")}>
          <Text style={styles.skipText}>এডিয়ে যান</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function PulseDot({ delay, color }: { delay: number; color: string }) {
  const styles = useStyles();
  const dot = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dot, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(dot, { toValue: 0.4, duration: 350, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [delay, dot]);
  return <Animated.View style={[styles.dot, { backgroundColor: color, opacity: dot }]} />;
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    gap: spacing.lg,
  },
  emblem: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  emblemIcon: {
    fontSize: 44,
    color: colors.onBrandPrimary,
    fontFamily: fonts.bold,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onSurface,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.muted,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    gap: spacing.lg,
    alignSelf: "stretch",
  },
  dotsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  skipText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
    padding: spacing.sm,
  },
}));