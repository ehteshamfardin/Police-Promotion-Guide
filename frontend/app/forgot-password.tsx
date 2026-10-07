import { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { Input } from "@/src/components/Input";
import { Header } from "@/src/components/Header";
import { useToast } from "@/src/components/Toast";
import { forgotPassword, isEmail } from "@/src/lib/auth";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function ForgotPassword() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const toast = useToast();
  const styles = useStyles();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!isEmail(email)) {
      toast.show("সঠিক ইমেইল ঠিকানা দিন", "error");
      return;
    }
    setLoading(true);
    const { error } = await forgotPassword(email);
    setLoading(false);
    // Do not reveal whether the email exists (avoid user enumeration).
    if (error && !/rate/i.test(error.message)) {
      toast.show("একটি সমস্যা হয়েছে, আবার চেষ্টা করুন", "error");
      return;
    }
    setSent(true);
  };

  return (
    <View testID="forgot-password-screen" style={styles.container}>
      <Header title="পাসওয়ার্ড রিসেট" />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        bottomOffset={16}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrap}>
          <Icon name={sent ? "email-check-outline" : "lock-reset"} size={32} color={colors.brandPrimary} />
        </View>

        {sent ? (
          <>
            <Text style={styles.title}>ইমেইল পাঠানো হয়েছে</Text>
            <Text style={styles.subtitle}>
              {email} ঠিকানায় একটি রিসেট লিংক পাঠানো হয়েছে। ইমেইল চেক করে লিংকে চাপ দিয়ে নতুন পাসওয়ার্ড সেট করুন।
            </Text>
            <Button title="লগ ইনে ফিরুন" size="lg" onPress={() => router.replace("/login")} testID="forgot-back-to-login" />
          </>
        ) : (
          <>
            <Text style={styles.title}>পাসওয়ার্ড ভুলে গেছেন?</Text>
            <Text style={styles.subtitle}>আপনার নিবন্ধিত ইমেইল দিন — রিসেট লিংক পাঠানো হবে।</Text>
            <Input
              label="ইমেইল"
              icon="email-outline"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              testID="forgot-email-input"
              style={styles.input}
            />
            <Button title="রিসেট লিংক পাঠান" size="lg" loading={loading} onPress={submit} testID="forgot-submit-button" />
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: spacing.xl, alignItems: "center", paddingTop: spacing.xl },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xl,
    lineHeight: lh(typeScale.xl),
    color: colors.onSurface,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  input: { alignSelf: "stretch", marginBottom: spacing.xl },
}));