import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useToast } from "@/src/components/Toast";
import { OFFICER } from "@/src/data/demo";
import { fonts, lh, makeStyles, spacing, typeScale, useTheme } from "@/src/theme";

export default function Login() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const toast = useToast();
  const styles = useStyles();

  const [serviceId, setServiceId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!serviceId.trim() || !password.trim()) {
      toast.show("সার্ভিস আইডি ও পাসওয়ার্ড দিন", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/home");
    }, 700);
  };

  return (
    <View testID="login-screen" style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        bottomOffset={16}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.logo}>
          <Text style={styles.logoText}>★</Text>
        </LinearGradient>

        <Text style={styles.title}>স্বাগতম</Text>
        <Text style={styles.subtitle}>অফিসার, চলুন আপনার প্রস্তুতি চালিয়ে যাই</Text>

        <View style={styles.form}>
          <Input
            label="সার্ভিস আইডি"
            icon="badge-account-outline"
            placeholder="যেমন: SI-4782"
            value={serviceId}
            onChangeText={setServiceId}
            testID="login-service-id-input"
            autoCapitalize="none"
          />
          <Input
            label="পাসওয়ার্ড"
            icon="lock-outline"
            placeholder="আপনার পাসওয়ার্ড"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            testID="login-password-input"
          />
          <Pressable testID="login-forgot-password-link" onPress={() => toast.show("পাসওয়ার্ড রিসেট শীঘ্রই আসছে")}>
            <Text style={styles.forgot}>পাসওয়ার্ড ভুলে গেছেন?</Text>
          </Pressable>
        </View>

        <Button
          title="লগ ইন করুন"
          size="lg"
          loading={loading}
          onPress={submit}
          testID="login-submit-button"
        />

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>অ্যাকাউন্ট নেই?</Text>
          <Pressable testID="login-register-link" onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}>নিবন্ধন করুন</Text>
          </Pressable>
        </View>

        <Text style={styles.hint}>ডেমো মোড — যেকোনো তথ্য দিয়ে লগ ইন করা যাবে</Text>
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.xl,
    alignItems: "center",
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  logoText: {
    fontSize: 36,
    color: colors.onBrandPrimary,
    fontFamily: fonts.bold,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onSurface,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.muted,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  form: {
    alignSelf: "stretch",
    gap: spacing.lg,
    marginVertical: spacing.xxl,
  },
  forgot: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.brandSecondary,
  },
  registerRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  registerText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  registerLink: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.brandPrimary,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    marginTop: spacing.lg,
  },
}));

void OFFICER;