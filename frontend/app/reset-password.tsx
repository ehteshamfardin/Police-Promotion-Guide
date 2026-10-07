import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { Input } from "@/src/components/Input";
import { Header } from "@/src/components/Header";
import { useToast } from "@/src/components/Toast";
import { resetPassword } from "@/src/lib/auth";
import { supabase } from "@/src/lib/supabase";
import { fonts, lh, makeStyles, spacing, typeScale, useTheme } from "@/src/theme";

export default function ResetPassword() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const toast = useToast();
  const styles = useStyles();
  const params = useLocalSearchParams<{ code?: string; access_token?: string; refresh_token?: string }>();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // Establish a recovery session from the deep-link params (PKCE code or tokens).
  useEffect(() => {
    (async () => {
      try {
        const url = await Linking.getInitialURL();
        const code = params.code ?? (url ? new URL(url).searchParams.get("code") : null);
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        } else if (params.access_token && params.refresh_token) {
          await supabase.auth.setSession({
            access_token: String(params.access_token),
            refresh_token: String(params.refresh_token),
          });
        }
      } catch {
        // ignore — user can still try; updateUser will fail if no session
      } finally {
        setReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    if (password.length < 6) {
      toast.show("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে", "error");
      return;
    }
    if (password !== confirm) {
      toast.show("পাসওয়ার্ড দুটি মিলছে না", "error");
      return;
    }
    setLoading(true);
    const { error } = await resetPassword(password);
    setLoading(false);
    if (error) {
      toast.show("লিংকটি মেয়াদোত্তীর্ণ — আবার রিসেট লিংক নিন", "error");
      return;
    }
    toast.show("পাসওয়ার্ড পরিবর্তন হয়েছে", "success");
    router.replace("/login");
  };

  return (
    <View testID="reset-password-screen" style={styles.container}>
      <Header title="নতুন পাসওয়ার্ড" back={false} />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        bottomOffset={16}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrap}>
          <Icon name="lock-reset" size={32} color={colors.brandPrimary} />
        </View>
        <Text style={styles.title}>নতুন পাসওয়ার্ড সেট করুন</Text>
        <Text style={styles.subtitle}>আপনার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড লিখুন।</Text>

        <Input
          label="নতুন পাসওয়ার্ড"
          icon="lock-outline"
          placeholder="কমপক্ষে ৬ অক্ষর"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          testID="reset-password-input"
          style={styles.input}
        />
        <Input
          label="পাসওয়ার্ড নিশ্চিত করুন"
          icon="lock-check-outline"
          placeholder="আবার লিখুন"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          testID="reset-confirm-input"
          style={styles.input}
        />
        <Button
          title="পাসওয়ার্ড পরিবর্তন করুন"
          size="lg"
          loading={loading}
          disabled={!ready}
          onPress={submit}
          testID="reset-submit-button"
        />
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
  input: { alignSelf: "stretch", marginBottom: spacing.lg },
}));